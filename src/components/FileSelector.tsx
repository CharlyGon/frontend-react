import React from "react";

interface FileSelectorProps {
    files: string[];
    onSelect: (fileName: string) => void;
    loading: boolean;
    selectedFile?: string;
}

const FileSelector: React.FC<FileSelectorProps> = ({ files, onSelect, loading, selectedFile }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value);
    };

    if (loading) {
        return <p>Cargando archivos...</p>;
    }

    if (files.length === 0) {
        return <p>No se encontraron archivos para este fondo.</p>;
    }

    return (
        <div>
            <select onChange={handleChange} value={selectedFile}>
                <option value="">-- Selecciona un archivo --</option>
                {files.map((file, index) => (
                    // Cambiar el key por el nombre del archivo
                    <option key={index} value={file}>
                        {file}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FileSelector;
