import { Config } from "../config";
import { TransactionSearchResponse } from "../interfaces/interfaces";

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
            `${Config.API_BASE_URL}/ContenidoArchivo/GetByOperacion?Search=${encodeURIComponent(searchTerm)}&PageSize=${Config.DEFAULT_PAGE_SIZE}`
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: TransactionSearchResponse = await response.json();

        return data;
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
        throw error; // Re-throw the error after logging it
    }
};
