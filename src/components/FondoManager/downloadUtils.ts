import { saveAs } from 'file-saver';

/**
 * Downloads the file content as a text file.
 *
 * @param {string[]} lines - The lines of the file content.
 * @param {string} fileName - The name of the file to download.
 * @returns {void} Downloads the file content as a text file.
 */
export const downloadFileContent = (lines: string[], fileName: string): void=> {
    if (lines.length === 0) {
        console.error("No se encontró el contenido del archivo");
        return;
    }

    const fileContent = lines.join("\n");
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const downloadName = fileName.includes('.') ? fileName : `${fileName}.txt`;

    saveAs(blob, downloadName);
};
