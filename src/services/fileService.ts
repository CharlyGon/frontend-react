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
const DEFAULT_PAGE_SIZE = parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE ?? "50", 10);

/**
 * Fetches the files for a given fondo on a specific date and optionally by file name.
 * Constructs the API URL dynamically based on the parameters provided.
 * Handles errors gracefully and logs them for debugging purposes.
 *
 * @param {string} date - The date for which files are being requested.
 * @param {string} identifyingFond - The identifier of the fondo to fetch files for.
 * @param {string} [fileName] - (Optional) The name of the file to search for.
 * @returns {Promise<any>} A promise that resolves with the list of files if the request is successful.
 */
export const fetchFilesForFondo = async (
    date: string,
    identifyingFond: string,
    fileName?: string
): Promise<any> => {
    try {
        const queryParams = new URLSearchParams({
            Fecha: date,
            IdentificadorFondo: identifyingFond,
        });

        if (fileName) {
            queryParams.append("Nombre", fileName);
        }

        const url = `${API_BASE_URL}/Archivo/pagination?${queryParams.toString()}`;

        // Fetch the data from the constructed URL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching files: ${response.statusText}`);
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
 * Fetch the content of a file by its ID with pagination, filtered by date.
 * @param {string} fileId - The ID of the file.
 * @param {string} [date] - Optional date to filter the file content.
 * @param {number} [pageSize=DEFAULT_PAGE_SIZE] - The number of records per page.
 * @param {number} [pageIndex=1] - The page index (starting from 1).
 * @returns {Promise<string[]>} - A promise that resolves with the file content if successful.
 */
export const fetchFileContentById = async (
    fileId: string,
    date?: string,
    pageSize: number = DEFAULT_PAGE_SIZE,
    pageIndex: number = 1
): Promise<string[]> => {
    try {
        // Construct URL with optional date parameter
        let url = `${API_BASE_URL}/ContenidoArchivo/pagination?IdArchivo=${fileId}&PageSize=${pageSize}&PageIndex=${pageIndex}`;

        // Add date to URL if provided
        if (date) {
            url += `&Fecha=${date}`;

            console.log("URL: ", url);
        }

        const response = await fetch(url);
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
