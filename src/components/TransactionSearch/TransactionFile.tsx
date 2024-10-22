import React from "react";
import { FileInfoProps } from "../../interfaces/interfaces";

import styles from "./styles/FileTransaction.module.css";
import { SkeletonLoader } from "./Skeletons/FileSkeletonLoader";

/**
 * Component to display basic information about the selected file.
 *
 * @param {FileInfoProps} props - File information containing name, day, fund, and loading/error states.
 * @returns {JSX.Element} File info component.
 */
export const FileInfo: React.FC<FileInfoProps> = ({
    fileDetails,
    fileLoading,
}: FileInfoProps): JSX.Element => {
    if (fileLoading) {
        return <SkeletonLoader />;
    }

    if (!fileDetails) {
        return <p className={styles.noDetailsMessage}>
            No hay detalles disponibles para el archivo seleccionado.
        </p>;
    }

    return (
        <div className={styles.fileInfoContainer}>
            <h3 className={styles.fileInfoTitle}>Detalles del Archivo</h3>
            <div className={styles.fileInfoDetails}>
                <p><span className={styles.infoLabel}>Nombre:</span> {fileDetails.nombre}</p>
                <p><span className={styles.infoLabel}>Día:</span> {new Date(fileDetails.fecha).toLocaleDateString()}</p>
                <p><span className={styles.infoLabel}>Fondo:</span> {fileDetails.identificadorFondo}</p>
                <p><span className={styles.infoLabel}>Orden:</span> {fileDetails.orden}</p>
            </div>
        </div>
    );
};
