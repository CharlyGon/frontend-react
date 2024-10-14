import React from "react";
import { FondoDetailsProps } from "../../interfaces/interfaces";

import styles from "./styles/FondoDetails.module.css";

/**
 * Component for displaying the details of a selected fondo.
 * It shows information such as the fondo's identifier, rescue type,
 * and interface code. Displays a loading message while fetching data
 * and a fallback message if no details are found.
 *
 * @param {FondoDetailsProps} props - The props for the fondo details component:
 *   - fondoDetails: Object containing the fondo's details (identifier, rescue type, interface code).
 *   - loading: Boolean indicating whether the data is being loaded.
 * @returns {JSX.Element} The fondo details component.
 */
const FondoDetails: React.FC<FondoDetailsProps> = (
    { fondoDetails,
        loading
    }: FondoDetailsProps): JSX.Element => {

    if (loading) {
        return <p className={styles.loadingMessage}>Cargando detalles del fondo...</p>;
    }

    if (!fondoDetails) {
        return <p className={styles.fallbackMessage}>No se encontraron detalles para este fondo.</p>;
    }

    return (
        <div className={styles.fundDetailsContainer}>
            <div className={styles.fundDetailItem}>
                <span className={styles.fundDetailLabel}>Identificador Fondo:</span>
                <span className={styles.fundDetailValue}>{fondoDetails.identificadorFondo}</span>
            </div>
            <div className={styles.fundDetailItem}>
                <span className={styles.fundDetailLabel}>Tipo de Rescate:</span>
                <span className={styles.fundDetailValue}>{fondoDetails.tipoRescate}</span>
            </div>
            <div className={styles.fundDetailItem}>
                <span className={styles.fundDetailLabel}>Código de Interfaz:</span>
                <span className={styles.fundDetailValue}>{fondoDetails.codigoInterfaz}</span>
            </div>
        </div>
    );
};

export default FondoDetails;
