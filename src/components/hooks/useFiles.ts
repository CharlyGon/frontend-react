import { useState, useEffect } from 'react';
import { fetchFilesForFondo } from '../../services/fileService';
import dayjs from 'dayjs';

export const useFiles = (selectedFondo: string | null) => {
    const [files, setFiles] = useState<Array<{ id: string; nombre: string }>>([]);
    const [loadingFiles, setLoadingFiles] = useState(false);

    useEffect(() => {
        if (!selectedFondo) return;

        const loadFiles = async () => {
            setLoadingFiles(true);
            //const currentDate = dayjs().format("YYYY-MM-DD");
            const currentDate = '2024-10-04';  // Example date
            try {
                const filesData = await fetchFilesForFondo(currentDate, selectedFondo);
                setFiles(filesData.map(({ id, nombre }: { id: string; nombre: string }) => ({ id, nombre })));
            } catch (error) {
                console.error('Error fetching files:', error);
            } finally {
                setLoadingFiles(false);
            }
        };

        loadFiles();
    }, [selectedFondo]);

    return { files, loadingFiles };
};
