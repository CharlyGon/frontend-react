import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FileContentProps } from "../../../interfaces/interfaces";

import styles from "../styles/FileContent.module.css";

/**
 * Component for displaying the content of a selected file.
 * It shows the file content in a preformatted block and allows the user to download the file.
 * Handles loading state and returns null if no file is selected or no content is available.
 *
 * @param {FileContentProps} props - The props for the file content component:
 *   - fileContent: The content of the selected file (in string format).
 *   - selectedFile: The name of the currently selected file.
 *   - loading: Boolean indicating whether the file content is being loaded.
 *   - onDownload: Callback function to handle file download.
 *   - fileContentRef: Reference to the container for infinite scrolling.
 * @returns {JSX.Element | null} The file content display component, or null if no file is selected.
 */
const FileContent: React.FC<FileContentProps> = (
    {
        fileContent,
        selectedFile,
        loading,
        onDownload,
        fileContentRef
    }: FileContentProps): JSX.Element | null => {

    if (!selectedFile || !fileContent) {
        return null;
    }

    return (
        <div className={styles.fileContentContainer}>
            <pre
                className={styles.fileContentPre}
                ref={fileContentRef}
            >
                {fileContent}
            </pre>

            <div className={styles.fileContentActions}>
                <button
                    className={styles.downloadButton}
                    onClick={onDownload}
                >
                    <FontAwesomeIcon
                        icon={faDownload}
                        className={styles.downloadButtonIcon}
                    />
                    Descargar archivo
                </button>

                {loading && (
                    <p className={styles.loadingIndicator}>
                        Cargando contenido...
                    </p>
                )}
            </div>
        </div>
    );
};

export default FileContent;
