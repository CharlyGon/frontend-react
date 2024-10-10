import { useState, useEffect } from "react";

export const useInitialLoading = (
    loadingFondos: boolean,
    fondos: any[],
    errorFondos: string | null
) => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [showError, setShowError] = useState<string | null>(null);

    useEffect(() => {
        // Si hay un error, mostrarlo
        if (errorFondos) {
            setShowError(errorFondos);
            setInitialLoading(false);
        }
        // Si se han cargado los fondos, ocultar el mensaje de carga inicial
        else if (!loadingFondos && fondos.length > 0) {
            setInitialLoading(false);
        }
    }, [loadingFondos, fondos, errorFondos]);

    return { initialLoading, showError };
};