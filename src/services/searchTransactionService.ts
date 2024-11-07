import { Config } from "../config";
import { TransactionSearchResponse } from "../interfaces/interfaces";

/**
 * Service to search transactions based on a given search term.
 * @param {string} searchTerm - The term to search transactions for.
 * @param {string} date - The date to search transactions for.
 * @returns {Promise<TransactionSearchResponse>} - The response containing transaction data.
 * @throws {Error} - Throws an error if the request fails.
 */
export const searchTransactionService = async (
    searchTerm: string,
    date: string
): Promise<TransactionSearchResponse> => {
    if (!searchTerm.trim() || !date.trim()) {
        throw new Error("Search term or date is empty or invalid.");
    }

    const params = new URLSearchParams({
        Search: searchTerm,
        Date: date,
        PageSize: Config.DEFAULT_PAGE_SIZE.toString(),
    });

    try {
        const response = await fetch(
            `${Config.API_BASE_URL}:${Config.API_PORT}/api/${Config.API_VERSION}/ContenidoArchivo/GetByOperacion?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data: TransactionSearchResponse = await response.json();

        return data;
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
        throw error;
    }
};
