import { Config } from "../config";
import { FileContentLine, FileDetailsResponse, FileResponse } from "../interfaces/interfaces";
import { fetchFilesForFondoTest } from "../Mock/apiFileForFondoTest";

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

/**
 * Fetches the files for a given fondo on a specific date and optionally by file name.
 * Constructs the API URL dynamically based on the parameters provided.
 * Handles errors gracefully and logs them for debugging purposes.
 *
 * @param {string} date - The date for which files are being requested.
 * @param {string} identifyingFond - The identifier of the fondo to fetch files for.
 * @param {string} [fileName] - (Optional) The name of the file to search for.
 * @returns {Promise<FileResponse>} A promise that resolves with the list of files if the request is successful.
 */
export const fetchFilesForFondo = async (
    date: string,
    identifyingFond: string,
    page: number,
    fileName?: string
): Promise<FileResponse> => {

    const isTesting = false;
    if (isTesting) {
        return fetchFilesForFondoTest(identifyingFond, page);
    }

    try {
        if (!Config.API_BASE_URL) {
            throw new Error("API_BASE_URL is not defined");
        }

        const queryParams = new URLSearchParams({
            Fecha: date,
            IdentificadorFondo: identifyingFond,
            Sort: 'ordenDesc',
            PageSize: Config.DEFAULT_PAGE_SIZE.toString(),
            PageIndex: page.toString(),
        });

        if (fileName) {
            queryParams.append("Nombre", fileName);
        }

        // Fetch the data from the constructed URL
        const response = await fetch(
            `${Config.API_BASE_URL}/api/${Config.API_VERSION}/Archivo/GetAllPage?${queryParams.toString()}`
        );

        if (!response.ok) {
            throw new Error(`Error fetching files: ${response.statusText}`);
        }

        return await response.json();
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
        if (!Config.API_BASE_URL) {
            throw new Error("API_BASE_URL is not defined");
        }

        const response = await fetch(
            `${Config.API_BASE_URL}/api/${Config.API_VERSION}/Archivo/GetByIdArchivo?Id=${fileId}`
        );

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
 *
 * @param {string} fileId - The ID of the file.
 * @param {string} [date] - Optional date to filter the file content.
 * @param {number} [pageSize=DEFAULT_PAGE_SIZE] - The number of records per page.
 * @param {number} [pageIndex=1] - The page index (starting from 1).
 * @returns {Promise<string[]>} - A promise that resolves with the file content if successful.
 */
export const fetchFileContentById = async (
    fileId: string,
    date?: string,
    pageSize: number = Config.DEFAULT_PAGE_SIZE,
    pageIndex: number = 1
): Promise<string[]> => {
    try {
        if (!Config.API_BASE_URL) {
            throw new Error("API_BASE_URL is not defined");
        }

        // Construct URL with optional date parameter
        let url =
            `${Config.API_BASE_URL}/api/${Config.API_VERSION}/ContenidoArchivo/GetAllPage?IdArchivo=${fileId}&PageSize=${pageSize}&PageIndex=${pageIndex}`;

        // Add date to URL if provided
        if (date) {
            url += `&Fecha=${date}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error fetching file content");
        }

        const data = await response.json();
        return data.data.map((item: FileContentLine) => item.linea);
    } catch (error) {
        console.error("Error fetching file content:", error);
        throw error;
    }
};

/**
 * This function fetches the details of a file based on its unique identifier.
 *
 * @param {string} idArchivo - The ID of the file to fetch details for.
 * @returns {Promise<FileDetailsResponse>} - The response containing file details.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchFileDetailsService = async (idArchivo: string): Promise<FileDetailsResponse> => {
    try {
        if (!Config.API_BASE_URL) {
            throw new Error("API_BASE_URL is not defined");
        }

        const response = await fetch(
            `${Config.API_BASE_URL}/api/${Config.API_VERSION}/Archivo/GetByIdArchivo?Id=${encodeURIComponent(idArchivo)}`
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching file details:", error);
        throw error;
    }
};

/**
 Fetches the content of a file by its ID from the specified API endpoint.
 * This function retrieves the file content as an array of strings, where each string represents a line in the file.
 *
 * @param {string} fileId - The unique identifier of the file to be fetched.
 * @returns {Promise<string[]>} - A promise that resolves to an array of strings representing the file content.
 * @throws {Error} - Throws an error if the request fails.
 */
export const fetchDownloadFileContentD = async (fileId: string): Promise<string[]> => {
    try {
        if (!Config.API_BASE_URL) {
            throw new Error("API_BASE_URL is not defined");
        }

        const response = await fetch(
            `${Config.API_BASE_URL}/api/${Config.API_VERSION}/ContenidoArchivo/GetAll?IdArchivo=${fileId}`
        );

        if (!response.ok) {
            throw new Error("Error al obtener el contenido del archivo");
        }

        const responseData = await response.json();

        return responseData.map((item: FileContentLine) => item.linea);
    } catch (error) {
        console.error("Error fetching file content:", error);
        throw error;
    }
};
