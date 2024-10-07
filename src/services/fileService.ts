import { mockFileContent } from "../data/mockData";

/**
 * Download a file
 * @param {string} content - File content
 * @param {string} fileName - File name
 * @param {string} fileType - File type
 */
export const downloadFile = (content: string, fileName: string, fileType: string) => {
    const blob = new Blob([content], { type: fileType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

/**
 * Fetch the files for a given fondo on a specific date.
 * @param fecha - Date of the request
 * @param identificadorFondo - The fondo identifier
 */
export const fetchFilesForFondo = async (fecha: string, identificadorFondo: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Archivo/pagination?Fecha=${fecha}&IdentificadorFondo=${identificadorFondo}`);
        if (!response.ok) {
            throw new Error("Error fetching files");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching files for fondo:", error);
        throw error;
    }
};

/**
 * Fetch a file by its ID to get more details.
 * @param id - The ID of the file
 */
export const fetchFileById = async (id: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Archivo/id?Id=${id}`);
        if (!response.ok) {
            throw new Error("Error fetching file by ID");
        }
        const data = await response.json();
        return data; // Return file details
    } catch (error) {
        console.error("Error fetching file by ID:", error);
        throw error;
    }
};

/**
 * Returns the content of a file
 * @param {string} fileName - File name
 * @returns {Promise<string>} - File content
 */
export const fetchFileContent = async (fileName: string): Promise<string> => {
    const content = mockFileContent[fileName];
    return content || "Contenido no disponible";
};
