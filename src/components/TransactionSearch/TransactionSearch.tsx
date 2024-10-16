import React, { useCallback, useState } from "react";
import { useSearchTransaction } from "../hooks/useSearchTransaction";
import { Transaction } from "../../interfaces/interfaces";
import { TransactionDetails } from "./TransactionDetails";

import styles from "./styles/SearchTransaction.module.css";
import { FileInfo } from "./TransactionFile";
import { useFileDetails } from "../hooks/useFileDetails";

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
    const { fileDetails, getFileDetails, loading: loadingDetails } = useFileDetails();

    // Handle input change
    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    // Handle search button click
    const handleSearch = useCallback(() => {
        if (searchTerm.trim() !== "") {
            searchTransactions(searchTerm);
        } else {
            console.log("Ingrese un término de búsqueda válido.");
        }
    }, [searchTerm, searchTransactions]);

    // Handle transaction selection
    const handleTransactionSelect = useCallback((transaction: Transaction) => {
        setSelectedTransaction(transaction);
        getFileDetails(transaction.idArchivo);
    }, [getFileDetails]);


    return (
        <div className={styles.mainContainerTransactionSearch}>
            <h2 className={styles.transactionSearchTitle}>Buscar Transacciones</h2>

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

            {/* Display loading state */}
            {loading && <p className={styles.loadingMessage}>Cargando transacciones...</p>}

            {/* Display error message */}
            { error && (
                <p className={styles.errorMessage}>No se encontraron transacciones. Por favor, intente nuevamente.</p>
            )}

            {/* Wrapper for the search results and additional details containers */}
            <div className={styles.resultsWrapper}>
                <div className={styles.resultContainer}>
                    <h3>Resultado Obtenido</h3>
                    <div className={styles.resultContent}>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <button
                                    key={transaction.idArchivo}
                                    className={`${styles.transactionItem} ${selectedTransaction?.idArchivo === transaction.idArchivo ? styles.selectedTransaction : ""}`}
                                    onClick={() => handleTransactionSelect(transaction)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleTransactionSelect(transaction);
                                        }
                                    }}
                                >
                                    <p>ID Archivo: {transaction.idArchivo}</p>
                                    <p>Linea: {transaction.linea}</p>
                                </button>
                            ))
                        ) : (
                            <p>No se encontraron transacciones.</p>
                        )}
                    </div>
                </div>

                {/* Containers displaying additional details on the right side */}
                <div className={styles.rightContainers}>
                    {selectedTransaction && (
                        <FileInfo
                            fileDetails={fileDetails}
                            loading={loadingDetails}
                        />
                    )}

                    <TransactionDetails selectedTransaction={selectedTransaction} />

                </div>
            </div>
        </div>
    );
};

export default TransactionSearch;
