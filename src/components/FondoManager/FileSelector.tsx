import { faCalendarAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useCallback, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { FileSelectorProps } from "../../interfaces/interfaces";

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
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value);
    }, [onSelect]);

    const toggleCalendar = useCallback(() => {
        setShowCalendar(prev => !prev);
    }, []);

    const handleSearchByDate = () => {
        console.log("Buscando archivos para la fecha:", selectedDate?.format('YYYY-MM-DD'));
    };

    const filteredFiles = files
        .map(file => (typeof file === 'string' ? file : file.nombre))
        .filter(file => file.toLowerCase().includes(searchTerm.toLowerCase()));


    const formattedDate = selectedDate?.format('YYYY-MM-DD') ?? '';

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
                    {files.map((file) => (
                        <option
                            key={file.id} // Aquí estamos usando el 'id'
                            value={file.id} // El valor será el 'id'
                        >
                            {file.nombre} {/* Aquí mostramos el nombre */}
                        </option>
                    ))}
                </select>

                {/* Search button */}
                <button
                    className="search-button"
                    onClick={() => setShowSearch(!showSearch)}
                    aria-label="Search file"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>

                {/* Calendar button */}
                <button
                    className="calendar-button"
                    onClick={toggleCalendar}
                    aria-label="open calendar"
                >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </button>

                {/* Calendar */}
                {showCalendar && (
                    <div className="calendar-container">
                        <LocalizationProvider
                            dateAdapter={AdapterDayjs}
                        >
                            <DateCalendar
                                value={selectedDate}
                                onChange={(newValue) => setSelectedDate(newValue)}
                                showDaysOutsideCurrentMonth
                                fixedWeekNumber={6}
                            />
                        </LocalizationProvider>
                        <div className="calendar-actions">
                            <input
                                type="text"
                                value={formattedDate}
                                readOnly
                                className="selected-date-input"
                            />
                            <button
                                className="search-by-date-button"
                                onClick={handleSearchByDate}
                            >
                                Buscar por fecha
                            </button>
                        </div>
                    </div>
                )}
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
