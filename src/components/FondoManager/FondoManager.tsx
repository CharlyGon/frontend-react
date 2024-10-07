import React, { useState, useEffect } from "react";
import FondoSelector from "./FondoSelector";
import FondoDetails from "./FondoDetails";
import FileSelector from "./FileSelector";
import FileContent from "./FileContent";
import {
    fetchFilesForFondo,
    fetchFileById,
    downloadFile,
} from "../../services/fileService";
import "./FondoManager.css";
import { Fondo } from "../../interfaces/interfaces";
import { fetchFondos } from "../../services/fondoService";
import dayjs from "dayjs";

/**
 * Component for managing and displaying a list of fondos, their associated files,
 * and the content of a selected file. Allows users to select a fondo, view its details,
 * select related files, and download the content of a file.
 *
 * @returns {JSX.Element} The fondo management component.
 */
const FondoManager: React.FC = (): JSX.Element => {
    const [fondos, setFondos] = useState<Fondo[]>([]);
    const [selectedFondo, setSelectedFondo] = useState<Fondo | null>(null);
    const [files, setFiles] = useState<Array<{ id: string; nombre: string }>>([]);
    const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
    const [fileContent, setFileContent] = useState<string | null>(null);

    const [loadingFondos, setLoadingFondos] = useState(false);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [loadingFileContent, setLoadingFileContent] = useState(false);

    const [page, setPage] = useState(1);
    const [hasMoreFondos, setHasMoreFondos] = useState(true);

    const isFondoDuplicate = (existingFondos: Fondo[], newFondo: Fondo): boolean => {
        return existingFondos.some((fondo) => fondo.id === newFondo.id);
    }

    // Load the next page of funds
    const loadFondos = async (page: number) => {
        setLoadingFondos(true);
        try {
            const newFondos = await fetchFondos(page);

            if (!newFondos || newFondos.length === 0) {
                setHasMoreFondos(false);
                return;
            }

            setFondos((prevFondos) => {
                const uniqueFondos = newFondos.filter((newFondo) =>
                    !isFondoDuplicate(prevFondos, newFondo)
                );
                return [...prevFondos, ...uniqueFondos];
            });
            setHasMoreFondos(newFondos.length > 0);

        } catch (error) {
            console.error("Error fetching fondos: ", error);
        } finally {
            setLoadingFondos(false);
        }
    };

    // Effect to load the first page of funds
    useEffect(() => {
        if (page > 1 || fondos.length === 0) {
            loadFondos(page);
        }
    }, [page]);

    // Load files related to the selected background
    useEffect(() => {
        const fetchFiles = async () => {
            if (selectedFondo) {
                setLoadingFiles(true);
                //const fechaActual = dayjs().format('YYYY-MM-DD'); // Fecha actual
                const fechaActual = "2024-10-04"; // Fecha de ejemplo
                try {
                    const filesData = await fetchFilesForFondo(fechaActual, selectedFondo.identificadorFondo);
                    setFiles(filesData.map((file: { id: string; nombre: string }) => ({
                        id: file.id,
                        nombre: file.nombre
                    })));
                } catch (error) {
                    console.error("Error fetching files:", error);
                } finally {
                    setLoadingFiles(false);
                }
            }
        };

        fetchFiles();
    }, [selectedFondo]);

    // Load the contents of the selected file
    useEffect(() => {
        const fetchFileContentById = async () => {
            if (selectedFile) {
                setLoadingFileContent(true);
                try {
                    const fileData = await fetchFileById(selectedFile);
                    setFileContent(fileData.nombre); // Aquí puedes ajustar lo que quieras mostrar
                } catch (error) {
                    console.error("Error fetching file content:", error);
                } finally {
                    setLoadingFileContent(false);
                }
            }
        };

        fetchFileContentById();
    }, [selectedFile]);

    // Handle the file download
    const handleDownload = () => {
        if (selectedFile && fileContent) {
            downloadFile(fileContent, `${selectedFile}.txt`, "text/plain");
        }
    };

    return (
        <div className="fondo-manager-container">
            <h2 className="fondo-manager-title">
                Gestión de Fondos
            </h2>

            {/* Background selector section */}
            <div className="card">
                <h4 className="card-title">
                    Selecciona un fondo
                </h4>
                <FondoSelector
                    fondos={fondos}
                    onSelect={(fondoId: number) => {
                        const fondo = fondos.find(f => f.id === fondoId) || null;
                        setSelectedFondo(fondo);
                    }}
                    selectedFondo={selectedFondo ? selectedFondo.id : undefined}
                    loadMoreFondos={() => {
                        if (hasMoreFondos) {
                            setPage((prevPage) => prevPage + 1);
                        }
                    }}
                    hasMoreFondos={hasMoreFondos}
                    loadingFondos={loadingFondos}
                />
            </div>

            {selectedFondo && (
                <>
                    {/* Details of the fund */}
                    <div className="card">
                        <h4 className="card-title">
                            Detalles del Fondo
                        </h4>
                        <FondoDetails
                            fondoDetails={selectedFondo}
                            loading={false}
                        />
                    </div>

                    {/* File selector section */}
                    <div className="card">
                        <h4 className="card-title">
                            Selecciona un Archivo
                        </h4>
                        <FileSelector
                            files={files}
                            onSelect={setSelectedFile}
                            loading={loadingFiles}
                            selectedFile={selectedFile}
                        />
                    </div>

                    {/* Contents of the file */}
                    {selectedFile && (
                        <div className="card">
                            <h4 className="file-content-title">
                                Contenido del Archivo
                            </h4>
                            <FileContent
                                fileContent={fileContent}
                                selectedFile={selectedFile}
                                loading={loadingFileContent}
                                onDownload={handleDownload}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FondoManager;
