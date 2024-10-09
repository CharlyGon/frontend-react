import { useState, useEffect, useCallback } from "react";
import { fetchFilesForFondo } from "../../services/fileService";
import dayjs from "dayjs";
import { UseFilesResult } from "../../interfaces/interfaces";

/**
 * Custom hook to fetch and manage files related to a selected fondo.
 * Handles the loading state and error handling for fetching files.
 *
 * @param {string | null} selectedFondo - The identifier for the selected fondo.
 * @returns {UseFilesResult} - An object containing the list of files and a loading state.
 */
export const useFiles = (selectedFondo: string | null): UseFilesResult => {
    const [files, setFiles] = useState<Array<{ id: string; nombre: string }>>([]);
    const [loadingFiles, setLoadingFiles] = useState(false);

    const loadFiles = useCallback(async () => {
        if (!selectedFondo) return;

        setLoadingFiles(true);
        try {
            //const currentDate = dayjs().format("YYYY-MM-DD");
            const currentDate = "2024-10-04";  // Example date

            const filesData = await fetchFilesForFondo(currentDate, selectedFondo);

            setFiles(filesData.map(({ id, nombre }: { id: string; nombre: string }) => ({ id, nombre })));
        } catch (error) {
            console.error("Error fetching files:", error);
        } finally {
            setLoadingFiles(false);
        }
    }, [selectedFondo]);

    useEffect(() => {
        loadFiles();
    }, [selectedFondo, loadFiles]);

    return { files, loadingFiles };
};
