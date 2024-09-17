import { mockFondos, mockFiles, mockFileContent } from "../data/mockData";

export const downloadFile = (content: string, fileName: string, fileType: string) => {
    const blob = new Blob([content], { type: fileType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
};

// Función para obtener los archivos asociados a un fondo
export const fetchFilesForFondo = async (codFondo: number): Promise<string[]> => {
    const fondoData = mockFiles.data.find((f) => f.codFondo === codFondo);
    return fondoData ? fondoData.files : [];
};

// Función para obtener los detalles de un fondo
export const fetchFondoDetails = async (codFondo: number): Promise<any> => {
    const fondoDetails = mockFondos.data.find((f) => f.codFondo === codFondo);
    return fondoDetails || {};
};

// Función para obtener el contenido de un archivo
export const fetchFileContent = async (fileName: string): Promise<string> => {
    const content = mockFileContent[fileName];
    return content || "Contenido no disponible";
};