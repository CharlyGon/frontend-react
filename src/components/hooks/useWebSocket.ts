import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface WebSocketMessage {
  type: string;
  data: any;
}

/**
 * Custom hook to connect to a WebSocket server and receive real-time log messages.
 *
 * @param {string} url - WebSocket server URL.
 * @returns {Object[]} logs - Array of log messages.
 */
export const useWebSocket = (url: string): object[] => {
  const [logs, setLogs] = useState<{ id: string; message: string }[]>([]);

  const handleHistoryLogs = (data: { message: string; }[]) => {
    const historicalLogs = data.map((log: { message: string }) => ({
      id: uuidv4(),
      message: log.message,
    }));
    setLogs((prevLogs) => [...prevLogs, ...historicalLogs]);
  };

  const handleNewLog = (data: any) => {
    const newLog = { id: uuidv4(), message: data.message || data };
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  useEffect(() => {
    const ws = new WebSocket(url);

    // WebSocket message handler
    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);

        switch (message.type) {
          case 'history':
            handleHistoryLogs(message.data);
            break;
          case 'log':
            handleNewLog(message.data);
            break;
          default:
            console.warn('Unknown message type:', message.type);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return logs;
};
