import { useState, useEffect } from "react";
import { fetchLogs } from "../../../services/logService";
import { FetchLogsParams, FetchLogsResponse, UseLogsResult } from "../../../interfaces/interfaces";

/**
 * Custom hook to fetch logs data.
 *
 * @param {FetchLogsParams | null} params - Parameters for the API request.
 * @returns {UseLogsResult} - The logs data, loading state and error message.
 */
export const useLogs = (params: FetchLogsParams | null): UseLogsResult => {
  const [logs, setLogs] = useState<FetchLogsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params) {
      const fetchLogsData = async () => {
        try {
          setLoading(true);

          setLogs(await fetchLogs(params));
        } catch (err) {
          setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
          setLoading(false);
        }
      };

      fetchLogsData();
    }
  }, [params]);

  const resetLogs = () => {
    setLogs(null);
  };

  return { logs, loading, error, resetLogs };
};
