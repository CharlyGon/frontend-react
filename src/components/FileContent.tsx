import React from "react";

interface FileContentProps {
    fileContent: string | null;
    selectedFile: string | undefined;
    loading: boolean;
    onDownload: () => void;
}

const FileContent: React.FC<FileContentProps> = ({ fileContent, selectedFile, loading, onDownload }) => {
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
