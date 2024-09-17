import React, { useState } from "react";
import FondoSelector from "./FondoSelector";
import FondoDetails from "./FondoDetails";
import FileSelector from "./FileSelector";
import FileContent from "./FileContent";
import { mockFondos } from "../data/mockData";
import {
    fetchFilesForFondo,
    fetchFondoDetails,
    fetchFileContent,
    downloadFile
} from "../services/fileService";

interface FondoDetails {
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
const List: React.FC = (): JSX.Element => {
    const [selectedFondo, setSelectedFondo] = useState<number | undefined>(undefined);
    const [files, setFiles] = useState<string[]>([]);
    const [fondoDetails, setFondoDetails] = useState<FondoDetails | null>(null);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [loadingFondoDetails, setLoadingFondoDetails] = useState(false);
    const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);
    const [fileContent, setFileContent] = useState<string | null>(null);
    const [loadingFileContent, setLoadingFileContent] = useState(false);

    const handleFondoSelect = async (codFondo: number) => {
        setSelectedFondo(codFondo);
        setLoadingFiles(true);
        setLoadingFondoDetails(true);

        const [files, fondoDetails] = await Promise.all([
            fetchFilesForFondo(codFondo),
            fetchFondoDetails(codFondo),
        ]);

        setFiles(files);
        setFondoDetails(fondoDetails);

        setLoadingFiles(false);
        setLoadingFondoDetails(false);
    };

    const handleFileSelect = async (fileName: string) => {
        setSelectedFile(fileName);
        setLoadingFileContent(true);

        const content = await fetchFileContent(fileName);
        setFileContent(content);
        setLoadingFileContent(false);
    };

    const handleDownload = () => {
        if (selectedFile && fileContent) {
            downloadFile(fileContent, `${selectedFile}.txt`, 'text/plain');
        }
    };

    return (
        <div>
            <FondoSelector
                fondos={mockFondos.data}
                onSelect={handleFondoSelect}
                selectedFondo={selectedFondo}
            />
            {selectedFondo && fondoDetails && (
                <>
                    <FondoDetails
                        fondoDetails={fondoDetails}
                        loading={loadingFondoDetails}
                    />

                    <FileSelector
                        files={files}
                        onSelect={handleFileSelect}
                        loading={loadingFiles}
                        selectedFile={selectedFile}
                    />

                    <FileContent
                        fileContent={fileContent}
                        selectedFile={selectedFile}
                        loading={loadingFileContent}
                        onDownload={handleDownload}
                    />
                </>
            )}
        </div>
    );
};

export default List;
