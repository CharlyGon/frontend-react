import { faCalendarAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useCallback, useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FileSelectorProps } from "../../../interfaces/interfaces";
import dayjs from "dayjs";

import styles from "../styles/FileSelector.module.css";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

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
 *   - loadMoreFiles: Function to load more files.
 *   - hasMoreFiles: Boolean indicating if more files are available.
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
        loadMoreFiles,
        hasMoreFiles,
    }: FileSelectorProps): JSX.Element => {

    const [searchTerm, setSearchTerm] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const formattedDate = selectedDate ?? dayjs().format("YYYY-MM-DD");
    const dropdownRef = useRef<HTMLSelectElement>(null);

    const toggleCalendar = () => {
        setShowCalendar(prev => !prev);
    };

    const toggleDropdown = useCallback(() => {
        setIsDropdownOpen((prev) => !prev);
    }, []);

    const handleSelect = (fileId: string) => {
        onSelect(fileId);
    };

    // Infinite scroll hook
    useInfiniteScroll({
        containerRef: dropdownRef,
        loadMore: () => {
            if (!loading && hasMoreFiles) {
                loadMoreFiles();
            }
        },
        hasMore: hasMoreFiles,
        loading,
    });

    const noFilesMessage = files.length === 0
        ? "No se encontraron archivos"
        : "--- Selecciona un archivo ---";

    return (
        <div
            className={styles.fileSelectorContainer}>

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

            {/* Dropdown selector button */}
            <div className={styles.selectButtonWrapper}>

                {/* Button to toggle the dropdown list */}
                <button
                    className={styles.selectButton}
                    onClick={toggleDropdown}
                    tabIndex={0}
                    aria-haspopup="listbox"
                    aria-expanded={isDropdownOpen}
                >
                    {selectedFile
                        ? files.find((file) => file.id === selectedFile)?.nombre
                        : noFilesMessage}
                    <span className={styles.arrowDown}>▼</span>
                </button>

                {/* Dropdown list to select a file */}
                {isDropdownOpen && (
                    <select
                        ref={dropdownRef}
                        className={styles.dropdownList}
                        size={files.length}
                        onChange={(e) => handleSelect(e.target.value)}
                        value={selectedFile ?? ""}
                    >
                        {/* List of available files to select */}
                        {files.map((file) => (
                            <option
                                key={file.id}
                                value={file.id}
                                className={styles.dropdownItem}
                            >
                                {file.nombre}
                            </option>
                        ))}

                        {/* Message displayed when there are no files available */}
                        {!loading && files.length === 0 && (
                            <option className={styles.noFilesMessage} disabled>
                                No files available for this fund.
                            </option>
                        )}
                    </select>
                )}
            </div>

            {loading && (
                <div className={styles.loadingMessage}>Cargando archivos...</div>
            )}
        </div>
    );
};

export default FileSelector;
