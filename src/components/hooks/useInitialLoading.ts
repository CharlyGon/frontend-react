import { useState, useEffect } from "react";

export const useInitialLoading = (
    loadingFondos: boolean,
    fondos: any[],
    errorFondos: string | null
) => {
    const [initialLoading, setInitialLoading] = useState(true);
    const [showError, setShowError] = useState<string | null>(null);

    useEffect(() => {
        if (errorFondos) {
            setShowError(errorFondos);
            setInitialLoading(false);
        }
        else if (!loadingFondos && fondos.length > 0) {
            setInitialLoading(false);
        }
    }, [loadingFondos, fondos, errorFondos]);

    return { initialLoading, showError };
};