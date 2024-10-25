import { FileResponse } from "../interfaces/interfaces";

const PAGE_SIZE = 20;

export const fetchFilesForFondoTest =  ( identifyingFond: string, page: number): Promise<FileResponse> => {
    // Generar datos simulados para pruebas
    const totalFiles = 100; // Definir la cantidad total de archivos que el mock tiene disponibles
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const mockFiles = Array.from({ length: totalFiles }, (_, index) => ({
        id: `file-${index + 1}`,
        nombre: `Archivo-${index + 1}-${Math.random().toString(36).substring(7)}`,
        fecha: new Date().toISOString(),
        identificadorFondo: `fondo-${identifyingFond}`,
        orden: index + 1,
    }));

    const data = mockFiles.slice(startIndex, endIndex);

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                count: totalFiles,
                pageSize: PAGE_SIZE,
                pageIndex: page,
                data: data,
                pageCount: Math.ceil(totalFiles / PAGE_SIZE),
            });
        }, 1000); // Simular el tiempo de respuesta del servidor con un delay
    });
}