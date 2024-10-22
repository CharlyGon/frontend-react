import React, { useCallback, useState } from "react";
import { useSearchTransaction } from "../hooks/useSearchTransaction";
import { Transaction, TransactionDetailsProps } from "../../interfaces/interfaces";
import { TransactionDetails } from "./TransactionDetails";
import { FileInfo } from "./TransactionFile";
import { useFileDetails } from "../hooks/useFileDetails";
import TransactionList from "./TransactionList";

import styles from "./styles/SearchTransaction.module.css";
import { ListSkeletonOperation } from "./Skeletons/ListSkeletonLoader";

/**
 * Mock transaction details for testing purposes.
 * !DO NOT USE IN PRODUCTION!
 */
const selectedTransactionDetailsMock = {
    entidadAcreditar: "Banco de la Nación Argentina",
    sucursalAcreditar: "Sucursal 1",
    digitoCBU: "1",
    bloqueCBU: "1234567890123456789012",
    importe: "1000",
    referenciaUnivoca: "123456",
    identificadorCliente: "123456",
    claseDocumento: "DNI",
    tipoDocumento: "Documento Nacional de Identidad",
    numeroDocumento: "12345678",
    estado: "Aprobado",
    identificadorPrestamo: "123456",
    numeroOperacionLink: "123456",
    filler: "123456",
    observaciones: "Observaciones especiales relacionadas con la transacción.",
};

/**
 * Component to search for transactions.
 * This component allows the user to search for transactions by entering an identifier.
 *
 * @returns {JSX.Element} Transaction search component.
 */
const TransactionSearch: React.FC = (): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { transactions, searchTransactions, loading, error } = useSearchTransaction();
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const { fileDetails, getFileDetails, fileLoading: fileloading } = useFileDetails();
    const [searchAttempted, setSearchAttempted] = useState<boolean>(false);
    const [transactionDetailsLoading, setTransactionDetailsLoading] = useState<boolean>(false);
    const [selectedTransactionDetails, setSelectedTransactionDetails] = useState<TransactionDetailsProps | null>(null);


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
        mockGetTransactionDetails(transaction.idArchivo);
    }, [getFileDetails]);

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

    //! Mock function to simulate fetching file details.
    const mockGetTransactionDetails = (transactionId: string) => {
        setTransactionDetailsLoading(true);
        setTimeout(() => {
            setSelectedTransactionDetails(selectedTransactionDetailsMock);
            setTransactionDetailsLoading(false);
        }, 2000);
    };


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
                        {/* Mostrar el título solo cuando no está cargando */}
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
                                selectedTransactionDetails={selectedTransactionDetails}
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
