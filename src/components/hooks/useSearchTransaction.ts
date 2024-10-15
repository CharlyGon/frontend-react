import { useState, useCallback } from "react";
import { searchTransactionService } from "../../services/searchTransactionService";
import { Transaction, UseSearchTransactionResponse } from "../../interfaces/interfaces";

/**
 * Custom hook for searching transactions.
 * Manages the state and provides functions to handle transaction search.
 *
 * @returns {UseSearchTransactionResponse} - Search state, search function, loading state, and error state.
 */
export const useSearchTransaction = (): UseSearchTransactionResponse => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const searchTransactions = useCallback(async (searchTerm: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await searchTransactionService(searchTerm);
            setTransactions(response.data ?? []);

        } catch (err) {
            setError("An error occurred while searching for transactions.");
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        transactions,
        searchTransactions,
        loading,
        error,
    };
};
