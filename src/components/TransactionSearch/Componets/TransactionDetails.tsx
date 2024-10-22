import React from "react";
import { TransactionDetailsProps } from "../../../interfaces/interfaces";

import styles from "../styles/DetailsTransaction.module.css";
import TransactionDetailsSkeleton from "../Skeletons/DetailsSkeleton/DetailsSkeletonLoader";

/**
 * Component to display the details of the selected transaction.
 *
 * @param {TransactionDetailsProps | null} selectedTransaction - The selected transaction details.
 * @param {boolean} loading - Flag to indicate if the transaction details are loading.
 * @returns {JSX.Element | null} Transaction details component.
 */
export const TransactionDetails: React.FC<{
    selectedTransactionDetails: TransactionDetailsProps | null,
    loading: boolean
}> = ({ selectedTransactionDetails, loading, }): JSX.Element | null => {

    if (loading) {
        return <TransactionDetailsSkeleton />;
    }

    if (!selectedTransactionDetails) {
        return null;
    }

    return (
        <div className={styles.detailsContainer}>
            <h3 className={styles.detailsTitle}>Detalles de la Operacion</h3>
            <ul className={styles.detailsList}>
                <li><span className={styles.detailLabel}>Entidad Acreditar:</span> {selectedTransactionDetails.entidadAcreditar}</li>
                <li><span className={styles.detailLabel}>Sucursal Acreditar:</span> {selectedTransactionDetails.sucursalAcreditar}</li>
                <li><span className={styles.detailLabel}>Dígito CBU:</span> {selectedTransactionDetails.digitoCBU}</li>
                <li><span className={styles.detailLabel}>Bloque CBU Cuenta Acreditar:</span> {selectedTransactionDetails.bloqueCBU}</li>
                <li><span className={styles.detailLabel}>Importe:</span> {selectedTransactionDetails.importe}</li>
                <li><span className={styles.detailLabel}>Referencia Única:</span> {selectedTransactionDetails.referenciaUnivoca}</li>
                <li><span className={styles.detailLabel}>Identificador Cliente:</span> {selectedTransactionDetails.identificadorCliente}</li>
                <li><span className={styles.detailLabel}>Clase Documento:</span> {selectedTransactionDetails.claseDocumento}</li>
                <li><span className={styles.detailLabel}>Tipo Documento:</span> {selectedTransactionDetails.tipoDocumento}</li>
                <li><span className={styles.detailLabel}>Número Documento:</span> {selectedTransactionDetails.numeroDocumento}</li>
                <li><span className={styles.detailLabel}>Estado:</span> {selectedTransactionDetails.estado}</li>
                <li><span className={styles.detailLabel}>Identificador Préstamo:</span> {selectedTransactionDetails.identificadorPrestamo}</li>
                <li><span className={styles.detailLabel}>Número Operación Link:</span> {selectedTransactionDetails.numeroOperacionLink}</li>
                <li><span className={styles.detailLabel}>Filler:</span> {selectedTransactionDetails.filler}</li>
                <li><span className={styles.detailLabel}>Observaciones:</span> {selectedTransactionDetails.observaciones}</li>
            </ul>
        </div>
    );
};

export default TransactionDetails;
