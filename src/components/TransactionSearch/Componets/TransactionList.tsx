import React from "react";
import { TransactionListProps } from "../../../interfaces/interfaces";

import styles from "../styles/ListTransaction.module.css";

/**
 * Component to display a list of transactions.
 * It allows selecting a transaction to view its details.
 *
 * @param {TransactionListProps} props - The props for the transaction list component.
 * @returns {JSX.Element} Transaction list component.
 */
const TransactionList: React.FC<TransactionListProps> = ({
    transactions,
    selectedTransaction,
    onSelectTransaction,
}: TransactionListProps): JSX.Element => {
    return (
        <div className={styles.resultContent}>
            {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                    <button
                    key={`${transaction.idArchivo}-${index}`} // Usar transaction.idArchivo combinado con index
                    className={`${styles.transactionItem} ${
                      selectedTransaction?.idArchivo === transaction.idArchivo
                        ? styles.selectedTransaction
                        : ""
                    }`}
                    onClick={() => onSelectTransaction(transaction)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onSelectTransaction(transaction);
                      }
                    }}
                  >
                    <p>Linea: {transaction.linea}</p>
                  </button>
                ))
            ) : (
                <p className={styles.noTransactionsMessage}>
                    No se encontraron transacciones.
                </p>
            )}
        </div>
    );
};

export default TransactionList;
