import { useState, useEffect, useCallback } from "react";
import { fetchFileContentById } from "../../services/fileService";
import { UseFileContentResult } from "../../interfaces/interfaces";

/**
 * Custom hook to manage file content fetching and pagination.
 *
 * This hook handles the state and logic for fetching the content of a file
 * in pages, and provides an infinite scroll mechanism. It fetches more data
 * when needed and resets the content when a new file is selected.
 *
 * @param {string | undefined} selectedFile - The ID of the selected file to fetch content for.
 * @param {number} pageSize - The number of lines to fetch per page.
 * @returns {UseFileContentResult} - Returns the file content, loading state, and pagination controls.
 */
export const useFileContent = (selectedFile: string | undefined, pageSize: number): UseFileContentResult => {
    const [fileContent, setFileContent] = useState<string[]>([]);
    const [loadingFileContent, setLoadingFileContent] = useState(false);
    const [filePage, setFilePage] = useState(1);
    const [hasMoreFileContent, setHasMoreFileContent] = useState(true);

    const loadFileContent = useCallback(async (page: number) => {
        if (!selectedFile) return;

        setLoadingFileContent(true);

        try {
            const fileContentData = await fetchFileContentById(selectedFile, pageSize, page);
            if (fileContentData.length > 0) {
                setFileContent((prevContent) => [...prevContent, ...fileContentData]);
            } else {
                setHasMoreFileContent(false);
            }
        } catch (error) {
            console.error("Error fetching file content:", error);
        } finally {
            setLoadingFileContent(false);
        }
    }, [selectedFile, pageSize]);

    useEffect(() => {
        if (selectedFile) {
            setFileContent([]);
            setFilePage(1);
            loadFileContent(1);
        }
    }, [selectedFile, loadFileContent]);

    useEffect(() => {
        if (filePage > 1) {
            loadFileContent(filePage);
        }
    }, [filePage, loadFileContent]);

    return { fileContent, loadingFileContent, hasMoreFileContent, setFilePage };
};
