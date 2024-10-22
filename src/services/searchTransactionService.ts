import { Config } from "../config";
import { TransactionSearchResponse } from "../interfaces/interfaces";

const BASE_URL = Config.API_BASE_URL;

/**
 * Service to search transactions based on a given search term.
 * @param {string} searchTerm - The term to search transactions for.
 * @returns {Promise<TransactionSearchResponse>} - The response containing transaction data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const searchTransactionService = async (
    searchTerm: string
): Promise<TransactionSearchResponse> => {
    if (!searchTerm.trim()) {
        throw new Error("Search term is empty or invalid.");
    }

    try {
        const response = await fetch(
            `${BASE_URL}/ContenidoArchivo/GetByOperacion?Search=${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: TransactionSearchResponse = await response.json();

        //!ahora trae id el id   "idRegistroIndividual": 0
        return data;

    } catch (error) {
        console.error("Failed to fetch transactions:", error);
        throw error; // Re-throw the error after logging it
    }
};
