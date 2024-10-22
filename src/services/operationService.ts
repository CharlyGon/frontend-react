import { Config } from "../config";
import { TransactionDetailsProps } from "../interfaces/interfaces";

/**
 *  Fetches a paginated list of transactions from the server.
 * @param {number} operationId  The transaction ID to fetch details for.
 * @returns { Promise<TransactionDetailsProps>} A promise that resolves to an object containing transaction details.
 */
export const fetchOperationDetails = async (operationId: number): Promise<TransactionDetailsProps> => {

    const url = `${Config.API_BASE_URL}/RegistroIndividual/id?Id=${operationId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error al obtener los detalles de la transacción: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching transaction details:", error);
        throw error;
    }
};
