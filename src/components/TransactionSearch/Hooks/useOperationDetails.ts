import { useState, useCallback } from "react";
import { TransactionDetailsProps, UseOperationDetailsProps } from "../../../interfaces/interfaces";
import { fetchOperationDetails } from "../../../services/operationService";

/**
 *  Hook to get transaction details, this hook fetches the transaction details based on the transaction ID.
 * @returns {UseOperationDetailsProps} - The response containing transaction details.
 */
export const useOperationDetails = (): UseOperationDetailsProps => {
    const [transactionDetails, setTransactionDetails] = useState<TransactionDetailsProps | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getOperationDetails = useCallback(async (transactionId: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchOperationDetails(transactionId);
            setTransactionDetails(data);
        } catch (err) {
            setError("No se pudo obtener los detalles de la transacción.");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        transactionDetails,
        loading,
        error,
        getOperationDetails,
    };
};
