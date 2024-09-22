import React, { useState, useEffect } from "react";
import FondoSelector from "./FondoSelector";
import FondoDetails from "./FondoDetails";
import FileSelector from "./FileSelector";
import FileContent from "./FileContent";
import { mockFondos } from "../../data/mockData";
import {
    fetchFilesForFondo,
    fetchFondoDetails,
    fetchFileContent,
    downloadFile
} from "../../services/fileService";
import "./FondoManager.css";

interface FondoDetailss {
    identificadorFondo: string;
    tipoRescate: string;
    codigoInterfaz: string;
}

/**
 * Component for managing and displaying a list of fondos, their associated files,
 * and the content of a selected file. Allows users to select a fondo, view its details,
 * select related files, and download the content of a file.
 *
 * @returns {JSX.Element} The fondo management component.
 */
const FondoManager: React.FC = (): JSX.Element => {
    const [selectedFondo, setSelectedFondo] = useState<number | undefined>(undefined);
    const [fondoDetails, setFondoDetails] = useState<FondoDetailss | null>(null);
    const [files, setFiles] = useState<string[]>([]);
    const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
    const [fileContent, setFileContent] = useState<string | null>(null);

    const [loadingFiles, setLoadingFiles] = useState(false);
    const [loadingFondoDetails, setLoadingFondoDetails] = useState(false);
    const [loadingFileContent, setLoadingFileContent] = useState(false);

    // Load background details and files when selecting a background
    useEffect(() => {
        if (selectedFondo !== undefined) {
            setLoadingFiles(true);
            setLoadingFondoDetails(true);
            Promise.all([
                fetchFilesForFondo(selectedFondo),
                fetchFondoDetails(selectedFondo),
            ]).then(([filesData, fondoDetailsData]) => {
                setFiles(filesData);
                setFondoDetails(fondoDetailsData);
                setLoadingFiles(false);
                setLoadingFondoDetails(false);
            });
        }
    }, [selectedFondo]);

    // Load contents of selected file
    useEffect(() => {
        if (selectedFile) {
            setLoadingFileContent(true);
            fetchFileContent(selectedFile).then((content) => {
                setFileContent(content);
                setLoadingFileContent(false);
            });
        }
    }, [selectedFile]);

    // Handle file download
    const handleDownload = () => {
        if (selectedFile && fileContent) {
            downloadFile(fileContent, `${selectedFile}.txt`, "text/plain");
        }
    };

    return (
        <div className="fondo-manager-container">
            <h2 className="fondo-manager-title">Gestión de Fondos</h2>

            {/* Sección del selector de fondo */}
            <div className="card">
                <h4 className="card-title">Selecciona un fondo</h4>
                <FondoSelector
                    fondos={mockFondos.data}
                    onSelect={setSelectedFondo}
                    selectedFondo={selectedFondo}
                />
            </div>

            {selectedFondo && fondoDetails && (
                <>
                    {/* Detalles del fondo */}
                    <div className="card">
                        <h4 className="card-title">Detalles del Fondo</h4>
                        <FondoDetails
                            fondoDetails={fondoDetails}
                            loading={loadingFondoDetails}
                        />
                    </div>

                    {/* Sección del selector de archivo */}
                    <div className="card">
                        <h4 className="card-title">Selecciona un Archivo</h4>
                        <FileSelector
                            files={files}
                            onSelect={setSelectedFile}
                            loading={loadingFiles}
                            selectedFile={selectedFile}
                        />
                    </div>

                    {/* Contenido del archivo */}
                    {selectedFile && (
                        <div className="card">
                            <h4 className="file-content-title">Contenido del Archivo</h4>
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
