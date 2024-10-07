import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FileContentProps } from "../../interfaces/interfaces";

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
 * @returns {JSX.Element | null} The file content display component, or null if no file is selected.
 */
const FileContent: React.FC<FileContentProps> = (
    {
        fileContent,
        selectedFile,
        loading,
        onDownload
    }: FileContentProps): JSX.Element | null => {
    if (loading) {
        return <p>Cargando contenido del archivo...</p>;
    }

    if (!selectedFile || !fileContent) {
        return null;
    }

    return (
        <div className="file-content-container">
            <h4
                className="file-content-title"
            >
                Archivo seleccionado: {selectedFile}
            </h4>
            <pre className="file-content-pre">
                {fileContent}
            </pre>
            <button
                className="download-button"
                onClick={onDownload}
            >
                <FontAwesomeIcon
                    icon={faDownload}
                    className="download-button-icon"
                />
                Descargar archivo
            </button>
        </div>
    );
};


export default FileContent;
