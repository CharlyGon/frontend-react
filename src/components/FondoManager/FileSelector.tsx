import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

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

    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value);
    };

    const filteredFiles = files.filter(file =>
        file.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <p>Cargando archivos...</p>;
    }

    if (files.length === 0) {
        return <p>No se encontraron archivos para este fondo.</p>;
    }

    return (
        <div className="file-selector-container">
            <div className="file-selector-input-wrapper">
                <select
                    onChange={handleChange}
                    value={selectedFile}
                    className="custom-dropdown"
                >
                    <option value="">
                        -- Selecciona un archivo --
                    </option>

                    {filteredFiles.map((file) => (
                        <option key={file} value={file}>
                            {file}
                        </option>
                    ))}
                </select>
                <button
                    className="search-button"
                    onClick={() => setShowSearch(!showSearch)}
                    aria-label="Search file"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            {showSearch && (
                <input
                    type="text"
                    className="search-input"
                    placeholder="Buscar archivo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            )}
        </div>
    );
};

export default FileSelector;
