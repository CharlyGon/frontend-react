import React, { useState, useEffect, useRef } from "react";
import FondoSelector from "./FondoSelector";
import FondoDetails from "./FondoDetails";
import FileSelector from "./FileSelector";
import FileContent from "./FileContent";
import {
    fetchFilesForFondo,
    fetchFileContentById,
    downloadFile,
} from "../../services/fileService";
import "./FondoManager.css";
import { Fondo } from "../../interfaces/interfaces";
import { fetchFondos } from "../../services/fondoService";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import dayjs from "dayjs";

const DEFAULT_PAGE_SIZE = parseInt(process.env.DEFAULT_PAGE_SIZE ?? "50", 10);

const FondoManager: React.FC = (): JSX.Element => {
    const [fondos, setFondos] = useState<Fondo[]>([]);
    const [selectedFondo, setSelectedFondo] = useState<Fondo | null>(null);
    const [files, setFiles] = useState<Array<{ id: string; nombre: string }>>([]);
    const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
    const [fileContent, setFileContent] = useState<string[]>([]);

    const [loadingFondos, setLoadingFondos] = useState(false);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [loadingFileContent, setLoadingFileContent] = useState(false);

    const [page, setPage] = useState(1);
    const [filePage, setFilePage] = useState(1);
    const [hasMoreFondos, setHasMoreFondos] = useState(true);
    const [hasMoreFileContent, setHasMoreFileContent] = useState(true);

    const fileContentRef = useRef<HTMLPreElement>(null);

    const isFondoDuplicate = (existingFondos: Fondo[], newFondo: Fondo): boolean => {
        return existingFondos.some((fondo) => fondo.id === newFondo.id);
    };

    // Load funds
    const fetchAndSetFondos = async (page: number) => {
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
            console.error("Error fetching fondos:", error);
        } finally {
            setLoadingFondos(false);
        }
    };

    // Load the file contents
    const fetchAndSetFileContent = async (page: number) => {
        if (!selectedFile) return;

        setLoadingFileContent(true);
        try {
            const fileContentData = await fetchFileContentById(selectedFile, DEFAULT_PAGE_SIZE, page);
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
    };

    // Effect to load the first page of funds
    useEffect(() => {
        if (page > 1 || fondos.length === 0) {
            fetchAndSetFondos(page);
        }
    }, [page]);

    // Load related files to the selected background
    useEffect(() => {
        if (!selectedFondo) return;

        const fetchFiles = async () => {
            setLoadingFiles(true);
            //const currentDate = dayjs().format("YYYY-MM-DD"); // !usar fecha actual!!
            const currentDate = "2024-10-04"; // Fecha de ejemplo
            try {
                const filesData = await fetchFilesForFondo(currentDate, selectedFondo.identificadorFondo);
                setFiles(filesData.map(({ id, nombre }: { id: string; nombre: string }) => ({ id, nombre })));
            } catch (error) {
                console.error("Error fetching files:", error);
            } finally {
                setLoadingFiles(false);
            }
        };

        fetchFiles();
    }, [selectedFondo]);

    // Load file contents when changing selected file
    useEffect(() => {
        if (selectedFile) {
            setFileContent([]);
            setFilePage(1);
            fetchAndSetFileContent(1);
        }
    }, [selectedFile]);

    // Hook to handle infinite scroll in file content
    useInfiniteScroll({
        containerRef: fileContentRef,
        loadMore: () => setFilePage((prevPage) => prevPage + 1),
        hasMore: hasMoreFileContent,
        loading: loadingFileContent,
    });

    // Cargar más contenido cuando cambie la página de archivos
    useEffect(() => {
        if (filePage > 1) {
            fetchAndSetFileContent(filePage);
        }
    }, [filePage]);

    // Handle the file download
    const handleDownload = () => {
        if (selectedFile && fileContent.length > 0) {
            downloadFile(fileContent.join("\n"), `${selectedFile}.txt`, "text/plain");
        }
    };

    return (
        <div className="fondo-manager-container">
            <h2 className="fondo-manager-title">Gestión de Fondos</h2>

            {/* Fund selector section */}
            <div className="card">
                <h4 className="card-title">Selecciona un fondo</h4>
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
                    {/* background details */}
                    <div className="card">
                        <h4 className="card-title">Detalles del Fondo</h4>
                        <FondoDetails
                            fondoDetails={selectedFondo}
                            loading={false}
                        />
                    </div>

                    {/* file selector */}
                    <div className="card">
                        <h4 className="card-title">Selecciona un Archivo</h4>
                        <FileSelector
                            files={files}
                            onSelect={setSelectedFile}
                            loading={loadingFiles}
                            selectedFile={selectedFile}
                        />
                    </div>

                    {/* file contents */}
                    {selectedFile && (
                        <div className="card">
                            <h4 className="file-content-title">Contenido del Archivo</h4>
                            <FileContent
                                fileContent={fileContent ? fileContent.join("\n") : null}
                                selectedFile={selectedFile}
                                loading={loadingFileContent}
                                onDownload={handleDownload}
                                fileContentRef={fileContentRef}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default FondoManager;
