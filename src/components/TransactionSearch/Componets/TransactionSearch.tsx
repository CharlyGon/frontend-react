import React, { useCallback, useEffect, useState } from "react";
import { useSearchTransaction } from "../Hooks/useSearchTransaction";
import { Transaction } from "../../../interfaces/interfaces";
import { TransactionDetails } from "./TransactionDetails";
import { FileInfo } from "./TransactionFile";
import { useFileDetails } from "../Hooks/useFileDetails";
import TransactionList from "./TransactionList";

import styles from "../styles/SearchTransaction.module.css";
import { ListSkeletonOperation } from "../Skeletons/ListSkeletonLoader/ListSkeletonLoader";
import { useOperationDetails } from "../Hooks/useOperationDetails";
import dayjs from "dayjs";

/**
 * Component to search for transactions.
 * This component allows the user to search for transactions by entering an identifier.
 *
 * @returns {JSX.Element} Transaction search component.
 */
const TransactionSearch: React.FC = (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<string>("");
    const { transactions, searchTransactions, loading } = useSearchTransaction();
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const { fileDetails, getFileDetails, fileLoading: fileloading } = useFileDetails();
    const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
    const { transactionDetails, loading: transactionDetailsLoading, getOperationDetails, } = useOperationDetails();
    const [isInputShining, setIsInputShining] = useState<boolean>(false);
    const [isCalendarShining, setIsCalendarShining] = useState<boolean>(false);


    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const handleDateChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    }, []);

    const handleSearch = useCallback(() => {
        const isSearchTermValid = searchTerm.trim() !== "";
        const isDateValid = selectedDate.trim() !== "";

        if (isSearchTermValid && isDateValid) {
            searchTransactions(searchTerm, selectedDate);
            setSearchAttempted(true);
        } else {
            if (!isSearchTermValid) {
                setIsInputShining(true);
            }
            if (!isDateValid) {
                setIsCalendarShining(true);
            }
        }
    }, [searchTerm, selectedDate, searchTransactions]);

    useEffect(() => {
        if (isInputShining || isCalendarShining) {
            const timer = setTimeout(() => {
                setIsInputShining(false);
                setIsCalendarShining(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [isInputShining, isCalendarShining]);


    const handleTransactionSelect = useCallback((transaction: Transaction) => {
        setSelectedTransaction(transaction);
        getFileDetails(transaction.idArchivo);
        getOperationDetails(transaction.idRegistroIndividual);
    }, [getFileDetails, getOperationDetails]);

    let content;

    if (loading) {
        content = <ListSkeletonOperation />;
    } else if (transactions.length > 0) {
        content = (
            <TransactionList
                transactions={transactions}
                selectedTransaction={selectedTransaction}
                onSelectTransaction={handleTransactionSelect}
            />
        );
    } else {
        content = (
            <p className={styles.noTransactionsMessage}>
                No se encontraron transacciones.
            </p>
        );
    }

    return (
        <div className={styles.mainContainerTransactionSearch}>
            <h2 className={styles.transactionSearchTitle}>Buscar Operaciones</h2>

            {/* Wrapper for the operation number input and search button */}
            <div className={styles.operationNumberWrapper}>

                <div className={styles.operationNumberContainer}>
                    <input
                        className={`${styles.transactionSearchInput} ${isInputShining ? styles.bright : ''}`}
                        type="text"
                        placeholder="Ingrese Dato a Buscar"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                    />

                    {/* calendar */}
                    <input
                        className={`${styles.transactionSearchInput} ${isCalendarShining ? styles.bright : ''}`}
                        type="date"
                        value={selectedDate ? dayjs(selectedDate).format('YYYY-MM-DD') : ''}
                        onChange={handleDateChange}
                        placeholder="Selecciona una fecha"
                    />

                    <button
                        onClick={handleSearch}
                        className={styles.transactionSearchButton}
                    >
                        Buscar
                    </button>
                </div>
            </div>

            {/* Wrapper for the search results and additional details containers */}
            {searchAttempted && (
                <div className={`${styles.resultsWrapper} ${selectedTransaction ? styles.resultsWithDetails : styles.resultsOnlyCentered}`}>

                    <div className={styles.resultContainer}>

                        {/* Show title only when not loading */}
                        {!loading && (
                            <h3 className={styles.resultContainerTitle}>Resultado Obtenido</h3>
                        )}

                        {content}
                    </div>

                    {/* Containers displaying additional details on the right side */}
                    <div className={styles.rightContainers}>
                        {selectedTransaction && (
                            <FileInfo
                                fileDetails={fileDetails}
                                fileLoading={fileloading}
                            />
                        )}

                        {selectedTransaction && (
                            <TransactionDetails
                                selectedTransactionDetails={transactionDetails}
                                loading={transactionDetailsLoading}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionSearch;
