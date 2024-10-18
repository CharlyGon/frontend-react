import { useState, useCallback } from "react";
import { fetchFileDetailsService } from "../../services/fileService";
import { FileDetailsResponse, FileDetailsWithFetchProps } from "../../interfaces/interfaces";

/**
 * Custom hook for fetching file details by file ID.
 * Manages the state for file details, loading, and error messages.
 *
 * @returns {FileDetailsWithFetchProps} - File details, loading state, error message, and fetch function.
 */
export const useFileDetails = (): FileDetailsWithFetchProps => {
    const [fileDetails, setFileDetails] = useState<FileDetailsResponse | null>(null);
    const [fileLoading, setFileLoading] = useState(false);

    const getFileDetails = useCallback(async (idArchivo: string) => {
        if (!idArchivo) {
            console.warn("Invalid file ID.");
            return;
        }

        setFileLoading(true);

        try {
            const response = await fetchFileDetailsService(idArchivo);
            setFileDetails(response);
        } catch (err) {
            console.error("Error fetching file details: ", err);
        } finally {
            setFileLoading(false);
        }
    }, []);

    return {
        fileDetails,
        getFileDetails,
        fileLoading,
    };
};
