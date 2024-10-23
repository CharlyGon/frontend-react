import React, { useCallback, useState } from "react";
import { useSearchTransaction } from "../Hooks/useSearchTransaction";
import { Transaction } from "../../../interfaces/interfaces";
import { TransactionDetails } from "./TransactionDetails";
import { FileInfo } from "./TransactionFile";
import { useFileDetails } from "../Hooks/useFileDetails";
import TransactionList from "./TransactionList";

import styles from "../styles/SearchTransaction.module.css";
import { ListSkeletonOperation } from "../Skeletons/ListSkeletonLoader/ListSkeletonLoader";
import { useOperationDetails } from "../Hooks/useOperationDetails";

/**
 * Component to search for transactions.
 * This component allows the user to search for transactions by entering an identifier.
 *
 * @returns {JSX.Element} Transaction search component.
 */
const TransactionSearch: React.FC = (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { transactions, searchTransactions, loading } = useSearchTransaction();
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const { fileDetails, getFileDetails, fileLoading: fileloading } = useFileDetails();
    const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
    const { transactionDetails, loading: transactionDetailsLoading, getOperationDetails, } = useOperationDetails();

    // Handle input change
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    // Handle search button click
    const handleSearch = useCallback(() => {
        if (searchTerm.trim() !== "") {
            searchTransactions(searchTerm);
            setSearchAttempted(true);
        } else {
            console.log("Ingrese un término de búsqueda válido.");
        }
    }, [searchTerm, searchTransactions]);

    // Handle transaction selection
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
                        className={styles.transactionSearchInput}
                        type="text"
                        placeholder="Ingrese el ID de la transacción"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
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

                        {/* Use the TransactionList or TransactionListSkeleton component */}
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
