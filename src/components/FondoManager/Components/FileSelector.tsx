import { faCalendarAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useRef, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FileSelectorProps } from "../../../interfaces/interfaces";
import dayjs from "dayjs";
import Select, { SingleValue } from 'react-select';


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

    const formattedDate = selectedDate ?? dayjs().format("YYYY-MM-DD");
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options = files.map(file => ({
        value: file.id,
        label: file.nombre,
    }));

    const toggleCalendar = () => {
        setShowCalendar(prev => !prev);
    };

    const handleSelect = (
        newValue: SingleValue<{ value: string; label: string }>,
    ) => {
        if (newValue) {
            onSelect(newValue.value);
        }
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

    // Load additional files when scrolling to the bottom of the menu
    const handleMenuScrollToBottom = () => {
        if (hasMoreFiles && !loading) {
            loadMoreFiles();
        }
    };

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

            {/* Botón del selector file list */}
            <Select
                options={options}
                onChange={handleSelect}
                value={options.find(option => option.value === selectedFile) ?? null}
                placeholder={options.length > 0 ? "--- Selecciona un archivo ---" : "No se encontraron archivos"}
                isLoading={loading}
                className={`${styles.selectButton}`}
                classNamePrefix="react-select"
                onMenuScrollToBottom={handleMenuScrollToBottom}
                menuPortalTarget={document.body}  // to render the dropdown above all other elements
                menuPlacement="auto"
                styles={{
                    control: (base) => ({
                        ...base,
                        width: "100%", // Take the full width like the button
                        minHeight: "40px", // Keep the height similar to button height
                        textAlign: "center", // Align the text to the left
                    }),
                    placeholder: (base) => ({
                        ...base,
                        textAlign: "center", // Align the placeholder text to the center
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 1000, // Make sure the dropdown menu appears above other elements
                    }),
                }}
            />
            {loading && (
                <div className={styles.loadingMessage}>Cargando archivos...</div>
            )}
        </div >
    );
};

export default FileSelector;
