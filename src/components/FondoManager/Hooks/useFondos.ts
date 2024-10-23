import { useState, useEffect, useCallback } from "react";
import { Fondo, UseFondosResult } from "../../../interfaces/interfaces";
import { fetchFondos } from "../../../services/fondoService";

const isFondoDuplicate = (existingFondos: Fondo[], newFondo: Fondo): boolean => {
    return existingFondos.some((fondo) => fondo.id === newFondo.id);
};

/**
 * Custom hook to manage fetching, loading state, and pagination of fondos.
 *
 * This hook handles fetching fondo data with pagination and avoids duplicate entries.
 * It also manages the loading state and tracks whether more fondos can be loaded.
 *
 * @returns {UseFondosResult} - fondos, loadingFondos, hasMoreFondos, setPage, errorFondos
 */
export const useFondos = (): UseFondosResult => {
    const [fondos, setFondos] = useState<Fondo[]>([]);
    const [loadingFondos, setLoadingFondos] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMoreFondos, setHasMoreFondos] = useState(true);
    const [errorFondos, setErrorFondos] = useState<string | null>(null);

    const loadFondos = useCallback(async () => {
        setLoadingFondos(true);
        try {
            const newFondos = await fetchFondos(page);

            if (!newFondos || newFondos.length === 0) {
                setHasMoreFondos(false);
                return;
            }

            setFondos((prevFondos) => {
                const uniqueFondos = newFondos.filter(
                    (newFondo) => !isFondoDuplicate(prevFondos, newFondo)
                );
                return [...prevFondos, ...uniqueFondos];
            });

            setHasMoreFondos(newFondos.length > 0);
        } catch (error) {
            setErrorFondos("Error loading funds. Please try again later.");
        } finally {
            setLoadingFondos(false);
        }
    }, [page]);

    useEffect(() => {
        loadFondos();
    }, [page, loadFondos]);

    return { fondos, loadingFondos, hasMoreFondos, setPage, errorFondos };
};
