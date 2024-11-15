import { Config } from "../config";
import { FetchLogsParams, FetchLogsResponse } from "../interfaces/interfaces";

/**
 * Fetches logs from the API.
 *
 * @param {FetchLogsParams} params - Parameters for the API request.
 * @returns {Promise<FetchLogsResponse>} - The response containing log data.
 * @throws {Error} - Throws an error if the fetch operation fails.
 */
export const fetchLogs = async (params: FetchLogsParams): Promise<FetchLogsResponse> => {
    try {

        if (!Config.API_BASE_URL) {
            throw new Error("API_BASE_URL is not defined");
        }

        const queryParams: URLSearchParams = new URLSearchParams();

        if (params.Fecha) {
            queryParams.append("Fecha", params.Fecha);
        }

        if (params.Search) {
            queryParams.append("Search", params.Search ?? "");
        }

        queryParams.append("PageSize", Config.DEFAULT_PAGE_SIZE.toString());
        queryParams.append("PageIndex", "1");

        const response = await fetch(
            `${Config.API_BASE_URL}/api/${Config.API_VERSION}/LogInformation/GetAllPage?${queryParams.toString()}`
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch logs: ${response.status} ${response.statusText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching logs:", error);
        throw error;
    }
};
