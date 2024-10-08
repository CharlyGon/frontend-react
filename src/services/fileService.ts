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
const DEFAULT_PAGE_SIZE = process.env.DEFAULT_PAGE_SIZE ? parseInt(process.env.DEFAULT_PAGE_SIZE) : 50;

/**
 * Fetch the files for a given fondo on a specific date.
 *
 * @param {string} date - Date of the request
 * @param {string} identifyingFond - The fondo identifier
 * @returns {Promise<any>} - A promise that resolves with the files if successful.
 */
export const fetchFilesForFondo = async (date: string, identifyingFond: string): Promise<any> => {
    try {
        const response = await fetch(`${API_BASE_URL}/Archivo/pagination?Fecha=${date}&IdentificadorFondo=${identifyingFond}`);
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
 * Fetch details of a file by its ID.
 * This function retrieves metadata of a file based on its unique identifier.
 *
 * @param {string} fileId - The unique identifier of the file to fetch.
 * @returns {Promise<any>} - A promise that resolves with the file details if successful.
 * @throws {Error} - Throws an error if the file fetch fails.
*/
export const fetchFileById = async (fileId: string): Promise<any> => {

    try {
        const response = await fetch(`${API_BASE_URL}/Archivo/id?Id=${fileId}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch file by ID: ${fileId}. Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching file by ID: ${fileId}`, error);
        throw error;
    }
};

/**
 * Fetch the content of a file by its ID with pagination.
 * @param {string} fileId - The ID of the file
 * @param {number}pageSize - The number of records per page
 * @param {number}pageIndex - The page index (starting from 1)
 * @returns {Promise<string[]>} - A promise that resolves with the file content if successful.
 */
export const fetchFileContentById = async (fileId: string, pageSize: number = DEFAULT_PAGE_SIZE, pageIndex: number = 1) => {
    try {
        const response = await fetch(`${API_BASE_URL}/ContenidoArchivo/pagination?IdArchivo=${fileId}&PageSize=${pageSize}&PageIndex=${pageIndex}`);
        if (!response.ok) {
            throw new Error("Error fetching file content");
        }
        const data = await response.json();
        return data.data.map((item: { linea: string }) => item.linea);
    } catch (error) {
        console.error("Error fetching file content:", error);
        throw error;
    }
};
