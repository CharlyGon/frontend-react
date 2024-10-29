import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FetchLogsParams } from "../../interfaces/interfaces";
import { useLogs } from "./Hook/useLogData";
import LogsControls from "./LogsControls";

import "./styles/Logs.css";
import LogsSkeletonLoader from "./skeleton/LogSkeleton";

const ErrorMessage: React.FC = () => (
  <div className="no-logs-container">
    <FontAwesomeIcon icon={faExclamationCircle} className="no-logs-icon" />
    <p>Intenta más tarde.</p>
  </div>
);

/**
  * Logs component.
 * This component is responsible for displaying log messages fetched from an API.
 *
 * @returns {JSX.Element} - The rendered logs component.
 */
const Logs: React.FC = (): JSX.Element => {
  const [params, setParams] = useState<FetchLogsParams | null>({
    Fecha: "",
    Search: "",
  });

  const [searchActive, setSearchActive] = useState(false);
  const { logs, loading, error, resetLogs } = useLogs(searchActive ? params : null);

  const logsEndRef = useRef<HTMLDivElement | null>(null);
  const logsContainerRef = useRef<HTMLDivElement | null>(null);

  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [inputAnimation, setInputAnimation] = useState<boolean>(false);

  const getLogClass = (log: { tipoLog: string; mensaje: string }): string => {
    const message = log.mensaje.toLowerCase();
    if (message.includes("error")) return "log-entry log-error";
    if (message.includes("warning")) return "log-entry log-warning";
    return "log-entry log-info";
  };

  const scrollToBottom = (forceScroll = false): void => {
    if (logsEndRef.current && logsContainerRef.current) {
      const shouldScroll = !isUserScrolling || forceScroll;
      if (shouldScroll) {
        logsEndRef.current.scrollIntoView({ behavior: "smooth" });
        logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
      }
    }
  };

  useEffect(() => {
    const container = logsContainerRef.current;

    const handleScroll = (): void => {
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      setIsUserScrolling(!isAtBottom);
      setShowScrollButton(!isAtBottom);
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [logs]);

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedLogType, setSelectedLogType] = useState<string>("");

  const handleFechaChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedDate(event.target.value);
  };

  const handleTipoLogChange = (value: string): void => {
    setSelectedLogType(value);
  };

  const triggerDateInputAnimation = (): void => {
    setInputAnimation(true);

    setTimeout(() => {
      setInputAnimation(false);
    }, 2000);
  };

  const handleSearch = (): void => {
    if (!selectedDate) {
      triggerDateInputAnimation();
      return;
    }

    resetLogs();

    setParams({
      Fecha: selectedDate,
      Search: selectedLogType,
    });

    setSearchActive(true);
  };

  return (
    <div className="logs-wrapper">
      <h2 className="logs-title">Logs</h2>

      <div className="logs-container-wrapper">

        {/* Logs controls */}
        <div className="logs-controls">
          <LogsControls
            selectedDate={selectedDate}
            selectedLogType={selectedLogType}
            handleFechaChange={handleFechaChange}
            handleTipoLogChange={handleTipoLogChange}
            handleSearch={handleSearch}
            inputAnimation={inputAnimation}
          />
        </div>

        {/* Logs output container */}
        {(loading || logs || error) && (
          <div
            className="logs-output"
            ref={logsContainerRef}
          >
            {loading && <LogsSkeletonLoader />}

            {error && (
              <ErrorMessage />
            )}

            {logs && logs.data.length === 0 && !loading && (
              <div className="no-logs-container">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="no-logs-icon"
                />
                <p>No se encontraron logs.</p>
              </div>
            )}

            {logs?.data.map((log) => (
              <div
                key={log.fecha}
                className={getLogClass(log)}
              >
                {log.mensaje}
              </div>
            ))}
            <div ref={logsEndRef} />
          </div>
        )}

        {/* Scroll to bottom button */}
        {logs && logs.data.length > 0 && showScrollButton && (
          <button
            className="scroll-to-bottom-btn"
            onClick={() => scrollToBottom(true)}
          >
            <FontAwesomeIcon icon={faArrowDown} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Logs;
