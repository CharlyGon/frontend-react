import React from "react";
import styles from "./styles/FileTransaction.module.css";
import { FileInfoProps } from "../../interfaces/interfaces";

/**
 * Component to display basic information about the selected file.
 *
 * @param {FileInfoProps} props - File information containing name, day, fund, and loading/error states.
 * @returns {JSX.Element} File info component.
 */
export const FileInfo: React.FC<FileInfoProps> = ({ fileDetails, loading }: FileInfoProps): JSX.Element => {
    if (loading) {
        return <p className={styles.loadingMessage}>Cargando detalles del archivo...</p>;
    }

      if (!fileDetails) {
        return <p className={styles.noDetailsMessage}>No hay detalles disponibles para el archivo seleccionado.</p>;
    }

    return (
        <div className={styles.fileInfoContainer}>
            <h4>Detalles del Archivo</h4>
            <p><strong>Nombre:</strong> {fileDetails.nombre}</p>
            <p><strong>Día:</strong> {new Date(fileDetails.fecha).toLocaleDateString()}</p>
            <p><strong>Fondo:</strong> {fileDetails.identificadorFondo}</p>
            <p><strong>Orden:</strong> {fileDetails.orden}</p>
        </div>
    );
};

export default FileInfo;
