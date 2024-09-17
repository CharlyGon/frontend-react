import { mockFondos, mockFiles, mockFileContent } from "../data/mockData";

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
 * Get files associated with a background
 * @param {number} codFondo - Background code
 * @returns {Promise<string[]>} - List of files associated with the background
 */
export const fetchFilesForFondo = async (codFondo: number): Promise<string[]> => {
    const fondoData = mockFiles.data.find((f) => f.codFondo === codFondo);
    return fondoData ? fondoData.files : [];
};

/**
 * Get the details of a background
 * @param {number} codFondo - Background code
 * @returns {Promise<any>} - Background details
*/
export const fetchFondoDetails = async (codFondo: number): Promise<any> => {
    const fondoDetails = mockFondos.data.find((f) => f.codFondo === codFondo);
    return fondoDetails || {};
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