import { useState, useEffect, useCallback, useRef } from "react";
import { fetchFilesForFondo } from "../../../services/fileService";
import { FondoFile, UseFilesResult } from "../../../interfaces/interfaces";

/**
 * Custom hook to fetch and manage files related to a selected fondo and date.
 * Handles the loading state and error handling for fetching files.
 *
 * @param {string | null} selectedFondo - The identifier for the selected fondo.
 * @param {string | null} selectedDate - The selected date to filter files.
 * @returns {UseFilesResult} - An object containing the list of files and a loading state.
 */
export const useFiles = (
    selectedFondo: string | null,
    selectedDate: string | null
): UseFilesResult => {
    const [files, setFiles] = useState<Array<{ id: string; nombre: string }>>([]);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMoreFiles, setHasMoreFiles] = useState(true);

    const activeRequest = useRef<boolean>(false);

    // Function to load files, with currentPage as argument
    const loadFiles = useCallback(
        async (currentPage: number) => {
            if (!selectedFondo || !selectedDate) return;

            setLoadingFiles(true);
            activeRequest.current = true;

            try {
                const filesData = await fetchFilesForFondo(
                    selectedDate,
                    selectedFondo,
                    currentPage
                );

                if (activeRequest.current) {
                    setFiles((prevFiles) => {
                        const newFiles = filesData.data.map((file: FondoFile) => ({
                            id: file.id,
                            nombre: file.nombre,
                        }));

                        // Prevent duplicates by merging only unique items
                        return [...prevFiles, ...newFiles].filter(
                            (file, index, self) =>
                                index === self.findIndex((f) => f.id === file.id)
                        );
                    });

                    // Update hasMoreFiles based on the response length
                    setHasMoreFiles(filesData.data.length === filesData.pageSize);
                }
            } catch (error) {
                console.error("Error fetching files:", error);
            } finally {
                if (activeRequest.current) {
                    setLoadingFiles(false);
                }
            }
        },
        [selectedFondo, selectedDate]
    );

    // Effect to load files when fondo or date changes
    useEffect(() => {
        setPage(1);
        setFiles([]);
        setHasMoreFiles(true);

        if (selectedFondo && selectedDate) {
            loadFiles(1);
        }

        return () => {
            activeRequest.current = false;
        };
    }, [selectedFondo, selectedDate, loadFiles]);

    useEffect(() => {
        if (page > 1) {
            loadFiles(page);
        }
    }, [page, loadFiles]);

    const loadMoreFiles = useCallback(() => {
        if (hasMoreFiles && !loadingFiles) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [hasMoreFiles, loadingFiles]);

    return { files, loadingFiles, hasMoreFiles, loadMoreFiles };
};
