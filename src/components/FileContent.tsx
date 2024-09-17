import React from "react";

interface FileContentProps {
    fileContent: string | null;
    selectedFile: string | undefined;
    loading: boolean;
    onDownload: () => void;
}

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
    }) => {
    if (loading) {
        return <p>Cargando contenido del archivo...</p>;
    }

    if (!selectedFile || !fileContent) {
        return null;
    }

    return (
        <div style={{ marginTop: "20px" }}>
            <h4>Archivo seleccionado: {selectedFile}</h4>
            <pre style={{ backgroundColor: "#f4f4f4", padding: "10px", borderRadius: "5px", overflowX: "auto" }}>
                {fileContent}
            </pre>
            <button onClick={onDownload}>Descargar archivo</button>
        </div>
    );
};

export default FileContent;
