import { faCalendarAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FileSelectorProps } from "../../interfaces/interfaces";
import dayjs from "dayjs";

import styles from "./styles/FileSelector.module.css";

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
 *   - selectedDate: The currently selected date.
 *   - setSelectedDate: Function to update the selected date.
 * @returns {JSX.Element} The file selector component.
 */
const FileSelector: React.FC<FileSelectorProps> = (
    {
        files,
        onSelect,
        loading,
        selectedFile,
        selectedDate,
        setSelectedDate,
    }: FileSelectorProps): JSX.Element => {

    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const formattedDate = selectedDate ?? dayjs().format("YYYY-MM-DD");

    const toggleCalendar = () => {
        setShowCalendar(prev => !prev);
    };

    return (
        <div className={styles.fileSelectorContainer}>

            {/* Search button and input together */}
            <div className={styles.searchWrapper}>
                <button
                    className={styles.searchButton}
                    onClick={() => setShowSearch(!showSearch)}
                    aria-label="Search file"
                >
                    <FontAwesomeIcon icon={faSearch} />
                </button>

                {showSearch && (
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Buscar archivo..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                )}
            </div>

            {/* Calendar icon and date input together */}
            <div className={styles.calendarDateWrapper}>
                <button
                    className={`${styles.calendarButton} ${showSearch ? styles.highlightCalendar : ""}`}
                    onClick={toggleCalendar}
                    aria-label="open calendar"
                >
                    <FontAwesomeIcon icon={faCalendarAlt} />
                </button>

                <input
                    type="text"
                    value={formattedDate}
                    readOnly
                    className={styles.selectedDateInput}
                    aria-label="Selected date"
                />
            </div>

            {/* Calendar component that appears when clicking the calendar button */}
            {showCalendar && (
                <div className={`
                    ${styles.calendarContainer}
                    ${showCalendar ? styles.showCalendar : ""}`}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            value={dayjs(selectedDate)}
                            onChange={(newValue) => {
                                if (newValue) {
                                    setSelectedDate(newValue.format("YYYY-MM-DD"));
                                    setShowCalendar(false);
                                }
                            }}
                            showDaysOutsideCurrentMonth
                            fixedWeekNumber={6}
                        />
                    </LocalizationProvider>
                </div>
            )}

            {/* File selection dropdown */}
            <select
                onChange={(e) => onSelect(e.target.value)}
                value={selectedFile}
                className={styles.customDropdown}
            >
                <option
                    value=""
                    className={styles.defaultOption}
                >
                    --- Selecciona un archivo ---
                </option>
                {files.map((file) => (
                    <option key={file.id} value={file.id}>
                        {file.nombre}
                    </option>
                ))}
            </select>

            {/* Display message when no files are found */}
            <div className={styles.noFilesMessageWrapper}>
                {!loading && files.length === 0 && (
                    <p className={styles.noFilesMessage}>
                        No se encontraron archivos para este fondo.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FileSelector;
