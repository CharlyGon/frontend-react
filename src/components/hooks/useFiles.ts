import { useState, useEffect, useCallback, useRef } from "react";
import { fetchFilesForFondo } from "../../services/fileService";
import { UseFilesResult } from "../../interfaces/interfaces";

/**
 * Custom hook to fetch and manage files related to a selected fondo and date.
 * Handles the loading state and error handling for fetching files.
 *
 * @param {string | null} selectedFondo - The identifier for the selected fondo.
 * @param {string | null} selectedDate - The selected date to filter files.
 * @returns {UseFilesResult} - An object containing the list of files and a loading state.
 */
export const useFiles = (selectedFondo: string | null, selectedDate: string | null): UseFilesResult => {
    const [files, setFiles] = useState<Array<{ id: string; nombre: string }>>([]);
    const [loadingFiles, setLoadingFiles] = useState(false);

    const activeRequest = useRef<boolean>(false);

    const loadFiles = useCallback(async () => {
        if (!selectedFondo || !selectedDate) return;

        setLoadingFiles(true);
        activeRequest.current = true;

        try {
            const filesData = await fetchFilesForFondo(selectedDate, selectedFondo);
            if (activeRequest.current) {
                setFiles(filesData.map(({ id, nombre }: { id: string; nombre: string }) => ({ id, nombre })));
            }
        } catch (error) {
            if (activeRequest.current) {
                console.error("Error fetching files:", error);
            }
        } finally {
            if (activeRequest.current) {
                setLoadingFiles(false);
            }
        }
    }, [selectedFondo, selectedDate]);

    // Effect to load files when fondo or date changes
    useEffect(() => {
        loadFiles();

        // Cleanup function to cancel previous requests if component unmounts or dependencies change
        return () => {
            activeRequest.current = false;
        };
    }, [loadFiles]);

    return { files, loadingFiles };
};
