import React, { useState, useRef } from 'react';
import FondoSelector from './FondoSelector';
import FondoDetails from './FondoDetails';
import FileSelector from './FileSelector';
import FileContent from './FileContent';
import { useFondos } from '../hooks/useFondos';
import { useFiles } from '../hooks/useFiles';
import { useFileContent } from '../hooks/useFileContent';
import './FondoManager.css';
import { Fondo } from '../../interfaces/interfaces';
import { downloadFile } from '../../services/fileService';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { Config } from '../../config';

const FondoManager: React.FC = (): JSX.Element => {
    const { fondos, loadingFondos, hasMoreFondos, setPage } = useFondos();
    const [selectedFondo, setSelectedFondo] = useState<Fondo | null>(null);
    const [selectedFile, setSelectedFile] = useState<string | undefined>(undefined);

    const { files, loadingFiles } = useFiles(selectedFondo ? selectedFondo.identificadorFondo : null);

    const {
        fileContent,
        loadingFileContent,
        hasMoreFileContent,
        setFilePage,
    } = useFileContent(selectedFile,Config.DEFAULT_PAGE_SIZE);

    const fileContentRef = useRef<HTMLPreElement>(null);

    useInfiniteScroll({
        containerRef: fileContentRef,
        loadMore: () => setFilePage((prevPage) => prevPage + 1),
        hasMore: hasMoreFileContent,
        loading: loadingFileContent,
    });

    const handleDownload = () => {
        if (selectedFile && fileContent.length > 0) {
            downloadFile(fileContent.join('\n'), `${selectedFile}.txt`, 'text/plain');
        }
    };

    return (
        <div className="fondo-manager-container">
            <h2 className="fondo-manager-title">Gestión de Fondos</h2>

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

            {selectedFondo && (
                <>
                    <div className="card">
                        <h4 className="card-title">Detalles del Fondo</h4>
                        <FondoDetails fondoDetails={selectedFondo} loading={false} />
                    </div>

                    <div className="card">
                        <h4 className="card-title">Selecciona un Archivo</h4>
                        <FileSelector files={files} onSelect={setSelectedFile} loading={loadingFiles} selectedFile={selectedFile} />
                    </div>

                    {selectedFile && (
                        <div className="card">
                            <h4 className="file-content-title">Contenido del Archivo</h4>
                            <FileContent
                                fileContent={fileContent ? fileContent.join('\n') : null}
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
