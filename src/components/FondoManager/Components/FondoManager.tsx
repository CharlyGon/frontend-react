import React, { useState, useRef, useCallback, useMemo } from "react";
import FondoSelector from "./FondoSelector";
import FondoDetails from "./FondoDetails";
import FileSelector from "./FileSelector";
import FileContent from "./FileContent";
import { useFondos } from "../Hooks/useFondos";
import { useFiles } from "../Hooks/useFiles";
import { useFileContent } from "../Hooks/useFileContent";
import { Fondo } from "../../../interfaces/interfaces";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { Config } from "../../../config";
import { useInitialLoading } from "../Hooks/useInitialLoading";
import dayjs from "dayjs";
import { fetchDownloadFileContentD } from "../../../services/fileService";
import { downloadFileContent } from "../downloadUtils";

import styles from "../styles/FondoManager.module.css";
import cardStyles from "../styles/Card.module.css";
import { FondoSkeletonLoader } from "../Skeletons/FondoSelectorSkeleton";

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
    const [selectedFile, setSelectedFile] = useState<{ id: string; nombre: string } | undefined>(undefined);
    const [selectedDate, setSelectedDate] = useState<string | null>(dayjs().format("YYYY-MM-DD"));

    const {
        files,
        loadingFiles,
        hasMoreFiles,
        loadMoreFiles,
    } = useFiles(selectedFondo ? selectedFondo.identificadorFondo : null, selectedDate);

    const {
        fileContent,
        loadingFileContent,
        hasMoreFileContent,
        setFilePage,
    } = useFileContent(selectedFile?.id, selectedDate, Config.DEFAULT_PAGE_SIZE);
    const fileContentRef = useRef<HTMLPreElement>(null);

    const { initialLoading, showError } = useInitialLoading(loadingFondos, fondos, errorFondos);

    useInfiniteScroll({
        containerRef: fileContentRef,
        loadMore: useCallback(() => setFilePage((prevPage) => prevPage + 1), [setFilePage]),
        hasMore: hasMoreFileContent,
        loading: loadingFileContent,
    });

    //Fuction for handling the download of the complete file using fetch
    const handleDownload = useCallback(async () => {
        if (!selectedFile) {
            console.error("No se ha seleccionado ningún archivo para descargar.");
            return;
        }

        try {
            const lines = await fetchDownloadFileContentD(selectedFile.id);

            downloadFileContent(lines, selectedFile.nombre);
        } catch (error) {
            console.error("Error descargando el archivo:", error);
        }
    }, [selectedFile]);

    //Memoize selectedFondo based on fondos.
    const currentSelectedFondo = useMemo(
        () => fondos.find((f) => f.id === selectedFondo?.id) || null,
        [fondos, selectedFondo]
    );

    const renderInitialLoading = () => (
        initialLoading && <FondoSkeletonLoader />
    );

    const renderError = () => (
        showError && (
            <div className={styles.errorMessage}>
                {showError}
            </div>
        )
    );

    const renderFondoSelector = () => (
        !initialLoading && !showError && (
            <div className={cardStyles.card}>
                <h4 className={cardStyles.cardTitle}>Selecciona un fondo</h4>
                <FondoSelector
                    fondos={fondos}
                    onSelect={(fondoId: number) => {
                        const fondo = fondos.find((f) => f.id === fondoId) || null;
                        setSelectedFondo(fondo);
                        setSelectedFile(undefined);
                    }}
                    selectedFondo={selectedFondo ? selectedFondo.id : undefined}
                    loadMoreFondos={() => setPage((prevPage) => prevPage + 1)}
                    hasMoreFondos={hasMoreFondos}
                    loadingFondos={loadingFondos}
                />
            </div>
        )
    );

    const renderFondoDetails = () => (
        currentSelectedFondo && (
            <div className={cardStyles.card}>
                <h4 className={cardStyles.cardTitle}>Detalles del Fondo</h4>
                <FondoDetails fondoDetails={currentSelectedFondo} loading={false} />
            </div>
        )
    );

    const renderFileSelector = () => (
        currentSelectedFondo && (
            <div className={cardStyles.card}>
                <h4 className={cardStyles.cardTitle}>Selecciona un Archivo</h4>
                <FileSelector
                    files={files}
                    onSelect={setSelectedFile}
                    loading={loadingFiles}
                    selectedFile={selectedFile?.id}
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    loadMoreFiles={loadMoreFiles}
                    hasMoreFiles={hasMoreFiles}

                />
            </div>
        )
    );

    const renderFileContent = () => (
        selectedFile && (
            <div className={cardStyles.card}>
                <h4 className={cardStyles.cardTitle}>Contenido del Archivo</h4>
                <FileContent
                    fileContent={fileContent ? fileContent.join("\n") : null}
                    selectedFile={selectedFile?.id}
                    loading={loadingFileContent}
                    onDownload={handleDownload}
                    fileContentRef={fileContentRef}
                />
            </div>
        )
    );

    return (
        <div className={styles.fondoManagerContainer}>
            <h2 className={styles.fondoManagerTitle}>Gestión de Fondos</h2>
            {renderInitialLoading()}
            {renderError()}
            {renderFondoSelector()}
            {renderFondoDetails()}
            {renderFileSelector()}
            {renderFileContent()}
        </div>
    );
};

export default FondoManager;
