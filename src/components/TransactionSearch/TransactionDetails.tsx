import React from "react";
import { Transaction } from "../../interfaces/interfaces";

import styles from "./styles/DetailsTransaction.module.css";
/**
 * Component to display the details of the selected transaction.
 *
 * @param {Transaction} selectedTransaction - The selected transaction details.
 * @returns {JSX.Element | null} Transaction details component.
 */
export const TransactionDetails: React.FC<{ selectedTransaction: Transaction | null }> = ({
    selectedTransaction,
}): JSX.Element | null => {
    if (!selectedTransaction) {
        return null;
    }

    return (
        <div className={styles.detailsContainer}>
            <h4>Detalles del Fondo</h4>
            <p>Entidad Acreditar:</p>
            <p>Sucursal Acreditar:</p>
            <p>Digito CBU:</p>
            <p>Bloque CBU Cuenta Acreditar:</p>
            <p>Importe:</p>
            <p>Referencia Univoca:</p>
            <p>Identificador Cliente:</p>
            <p>Clase Documento:</p>
            <p>Tipo Documento:</p>
            <p>Numero Documento:</p>
            <p>Estado:</p>
            <p>Identificador Prestamo:</p>
            <p>Numero Operacion Link:</p>
            <p>Filler:</p>
            <p>Observaciones:</p>
        </div>
    );
};
