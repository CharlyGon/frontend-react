import React, { useEffect, useRef, useState } from 'react';
import useWebSocket from '../hooks/useWebSocket';
import './Logs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

interface Log {
  id: string;
  message: string;
}

/**
 * Logs component that displays real-time log messages.
 * Connects to a WebSocket server to receive log updates.
 * Automatically scrolls to the latest log message.
 * Provides a button to manually scroll to the latest log.
 *
 * @returns {JSX.Element} Logs component with real-time log messages.
 */
const Logs: React.FC = (): JSX.Element => {
  const logs = useWebSocket('ws://localhost:8080') as Log[];
  const logsEndRef = useRef<HTMLDivElement | null>(null);
  const logsContainerRef = useRef<HTMLDivElement | null>(null);

  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  /**
  * Determines the CSS class based on the log message content.
  */
  const getLogClass = (log: Log): string => {
    const message = log.message.toLowerCase();

    if (message.includes('error')) return 'log-entry log-error';
    if (message.includes('warning')) return 'log-entry log-warning';

    return 'log-entry log-info';
  };

  /**
    * Automatically scroll to the latest log.
    * It can be forced when the user clicks the button.
    */
  const scrollToBottom = (forceScroll = false): void => {
    if (logsEndRef.current && logsContainerRef.current) {
      const shouldScroll = !isUserScrolling || forceScroll;

      if (shouldScroll) {
        logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
      }
    }
  };

  /**
   * Handle the scroll event of the container.
   * Detects if the user is manually scrolling.
   */
  const handleScroll = (): void => {
    if (!logsContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = logsContainerRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

    setIsUserScrolling(!isAtBottom);
    setShowScrollButton(!isAtBottom); // Mostrar el botón solo si no está al final
  };

  /**
   * Effect to automatically scroll to the latest log whenever logs are updated.
   */
  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  /**
   * Effect to add and clean up the scroll event when the component is mounted.
   */
  useEffect(() => {
    const container = logsContainerRef.current;

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className="logs-wrapper">
      <h2 className="logs-title">Real-time Logs</h2>
      <div className="logs-container-wrapper">
        <div className="logs-output" ref={logsContainerRef}>
          {logs.length === 0 ? (
            <div className="no-logs-container">
              <FontAwesomeIcon icon={faExclamationCircle} className="no-logs-icon" />
              <p>No logs available.</p>
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className={getLogClass(log)}>
                {log.message}
              </div>
            ))
          )}
          <div ref={logsEndRef} />
        </div>
        {showScrollButton && (
          <button className="scroll-to-bottom-btn" onClick={() => scrollToBottom(true)}>
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Logs;
