import { Fondo } from '../interfaces/interfaces';
import { Config } from '../config';

/**
 * Fetches a paginated list of fondos from the server.
 *
 * This function retrieves a list of fondos (investment funds) based on the provided page index and page size.
 * If no page size is provided, a default size is used. The function handles HTTP errors and logs any issues
 * to the console, rethrowing them for higher-level error handling.
 *
 * @param {number} page - The current page index for paginated results.
 * @param {number} pageSize - The number of fondos to fetch per page (default is set in Config).
 * @returns {Promise<Fondo[]>} - A promise that resolves to an array of Fondo objects.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export const fetchFondos = async (page: number, pageSize: number = Config.DEFAULT_FONDOS_PAGE_SIZE): Promise<Fondo[]> => {
    try {
        if (!Config.API_BASE_URL) {
            throw new Error("API_BASE_URL is not defined");
        }

        const response = await fetch(
            `${Config.API_BASE_URL}:${Config.API_PORT}/api/${Config.API_VERSION}/Fondo/pagination?pageIndex=${page}&pageSize=${pageSize}`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch fondos. Server returned an error.");
        }

        const { data } = await response.json();

        return data;
    } catch (error) {
        console.error("Failed to fetch fondos", error);
        throw new Error("Unable to fetch fondos at this time. Please try again later.");
    }
};
