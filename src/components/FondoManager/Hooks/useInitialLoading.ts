import { useState, useEffect } from "react";
import { Fondo, UseInitialLoadingResult } from "../../../interfaces/interfaces";

/**
 * Custom hook to manage the initial loading state and handle potential errors.
 *
 * This hook handles the state for loading the initial data and managing errors,
 * ensuring that the application displays the correct loading or error message at the beginning.
 *
 * @param {boolean} loadingFondos - Indicates if fondos are currently loading.
 * @param {Array<any>} fondos - The list of fondos fetched.
 * @param {string | null} errorFondos - An error message if the fondos fetch fails.
 * @returns {UseInitialLoadingResult} - Contains the initial loading state and any error message.
 */
export const useInitialLoading = (
  loadingFondos: boolean,
  fondos: Fondo[],
  errorFondos: string | null
): UseInitialLoadingResult => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);
  const [showError, setShowError] = useState<string | null>(null);

  useEffect(() => {
    if (errorFondos) {
      setShowError(errorFondos);
      setInitialLoading(false);
    } else if (!loadingFondos && fondos.length > 0) {
      setShowError(null);
      setInitialLoading(false);
    }
  }, [loadingFondos, fondos, errorFondos]);

  return { initialLoading, showError };
};
