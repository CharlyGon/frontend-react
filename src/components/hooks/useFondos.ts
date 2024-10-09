import { useState, useEffect } from 'react';
import { Fondo } from '../../interfaces/interfaces';
import { fetchFondos } from '../../services/fondoService';

export const useFondos = () => {
    const [fondos, setFondos] = useState<Fondo[]>([]);
    const [loadingFondos, setLoadingFondos] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMoreFondos, setHasMoreFondos] = useState(true);

    const isFondoDuplicate = (existingFondos: Fondo[], newFondo: Fondo): boolean => {
        return existingFondos.some((fondo) => fondo.id === newFondo.id);
    };

    const loadFondos = async () => {
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

    useEffect(() => {
        loadFondos();
    }, [page]);

    return { fondos, loadingFondos, hasMoreFondos, setPage };
};
