import React from "react";

interface FileSelectorProps {
    files: string[];
    onSelect: (fileName: string) => void;
    loading: boolean;
    selectedFile?: string;
}

/**
 * Component for selecting a file from a list of files.
 * Displays a dropdown menu allowing the user to select a file associated with the selected fondo.
 * Handles loading state and shows a fallback message if no files are available.
 *
 * @param {FileSelectorProps} props - The props for the file selector component:
 *   - files: Array of file names associated with the selected fondo.
 *   - onSelect: Callback function to handle file selection.
 *   - loading: Boolean indicating whether the file data is being loaded.
 *   - selectedFile: The currently selected file (optional).
 * @returns {JSX.Element} The file selector component.
 */
const FileSelector: React.FC<FileSelectorProps> = (
    {
        files,
        onSelect,
        loading,
        selectedFile
    }: FileSelectorProps): JSX.Element => {

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
            <select
                onChange={handleChange}
                value={selectedFile}
            >
                <option value="">
                    -- Selecciona un archivo --
                </option>

                {files.map((file, index) => (
                    <option key={file} value={file}>
                        {file}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FileSelector;
