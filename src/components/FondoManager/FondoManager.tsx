import React, { useState, useRef, useCallback } from "react";
import FondoSelector from "./FondoSelector";
import FondoDetails from "./FondoDetails";
import FileSelector from "./FileSelector";
import FileContent from "./FileContent";
import { useFondos } from "../hooks/useFondos";
import { useFiles } from "../hooks/useFiles";
import { useFileContent } from "../hooks/useFileContent";
import "./FondoManager.css";
import "./FileSelector.css";
import { Fondo } from "../../interfaces/interfaces";
import { downloadFile } from "../../services/fileService";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { Config } from "../../config";
import { useInitialLoading } from "../hooks/useInitialLoading";
import dayjs from "dayjs";

/**
 * FondoManager component
 *
 * This component is responsible for managing the overall workflow for handling investment funds.
 * It displays a selector for funds, fund details, a file selector, and the content of selected files.
 *
 * Main functionalities:
 * - Displays a loading message when the funds are initially loading.
 * - Handles any errors during the loading of funds.
 * - Manages the selection of a fund and updates the displayed information based on the selected fund.
 * - Uses infinite scroll for loading more file content.
 * - Allows the user to download the file content as a text file.
 *
 * The component makes use of several hooks:
 * - `useFondos`: Fetches and manages the list of investment funds.
 * - `useFiles`: Fetches the files related to the selected fund.
 * - `useFileContent`: Fetches and paginates the content of the selected file.
 * - `useInitialLoading`: Manages the display of the initial loading state.
 * - `useInfiniteScroll`: Implements infinite scroll for the file content.
 *
 * @returns {JSX.Element} - The FondoManager component which renders the UI for managing investment funds.
 */
const FondoManager: React.FC = (): JSX.Element => {
    const { fondos, loadingFondos, hasMoreFondos, setPage, errorFondos } = useFondos();
    const [selectedFondo, setSelectedFondo] = useState<Fondo | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
    //const [selectedDate, setSelectedDate] = useState<string | null>(dayjs().format("YYYY-MM-DD"));
    const [selectedDate, setSelectedDate] = useState<string | null>("2024-10-09"); //! Mantener para pruebas

    const { files, loadingFiles } = useFiles(selectedFondo ? selectedFondo.identificadorFondo : null, selectedDate);
    const {
        fileContent,
        loadingFileContent,
        hasMoreFileContent,
        setFilePage,
    } = useFileContent(selectedFile, Config.DEFAULT_PAGE_SIZE);
    const fileContentRef = useRef<HTMLPreElement>(null);

    const { initialLoading, showError } = useInitialLoading(loadingFondos, fondos, errorFondos);

    useInfiniteScroll({
        containerRef: fileContentRef,
        loadMore: useCallback(() => setFilePage((prevPage) => prevPage + 1), [setFilePage]),
        hasMore: hasMoreFileContent,
        loading: loadingFileContent,
    });

    const handleDownload = useCallback(() => {
        if (selectedFile && fileContent.length > 0) {
            downloadFile(fileContent.join("\n"), `${selectedFile}.txt`, "text/plain");
        }
    }, [selectedFile, fileContent]);

    return (
        <div className="fondo-manager-container">
            <h2 className="fondo-manager-title">Gestión de Fondos</h2>

            {/* Initial loading message */}
            {initialLoading && (
                <div className="loading-message">
                    Loading investment funds, please wait...
                </div>
            )}

            {/* Error message */}
            {showError && (
                <div className="error-message">
                    {showError}
                </div>
            )}

            {/* Fondo Selector */}
            {!initialLoading && !showError && (
                <div className="card">
                    <h4 className="card-title">Selecciona un fondo</h4>
                    <FondoSelector
                        fondos={fondos}
                        onSelect={(fondoId: number) => {
                            const fondo = fondos.find((f) => f.id === fondoId) || null;
                            setSelectedFondo(fondo);
                        }}
                        selectedFondo={selectedFondo ? selectedFondo.id : undefined}
                        loadMoreFondos={() => setPage((prevPage) => prevPage + 1)}
                        hasMoreFondos={hasMoreFondos}
                        loadingFondos={loadingFondos}
                    />
                </div>
            )}

            {selectedFondo && (
                <>
                    {/* Fondo Details Card */}
                    <div className="card">
                        <h4 className="card-title">Detalles del Fondo</h4>
                        <FondoDetails fondoDetails={selectedFondo} loading={false} />
                    </div>

                    {/* File Selector */}
                    <div className="card">
                        <h4 className="card-title">Selecciona un Archivo</h4>
                        <FileSelector
                            files={files}
                            onSelect={setSelectedFile}
                            loading={loadingFiles}
                            selectedFile={selectedFile}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                        />
                    </div>

                    {/* File Content */}
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
