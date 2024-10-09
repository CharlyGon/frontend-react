import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { HealthStatus, HealthStatusEnum } from "../../interfaces/interfaces";
import { fetchHealthData } from "../../services/healthService";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Get color based on the state of service
const getStatusColor = (status: string): string => (status === HealthStatusEnum.Healthy ? "green" : "red");

// Calculate bar color based on duration
const getDurationColor = (duration: string): string => {
  const ms = parseFloat(duration.split(":")[2]);
  if (ms < 100) return "green";
  if (ms < 500) return "yellow";
  return "red";
};

// Calculate the width of the bar based on the duration
const getDurationWidth = (duration: string): number => {
  const ms = parseFloat(duration.split(":")[2]);
  const scaleFactor = 200;
  const minWidth = 5;
  const maxWidth = 300;
  return Math.max(Math.min(ms * scaleFactor, maxWidth), minWidth);
};

// Get the status icon based on the service status
const getStatusIcon = (status: HealthStatusEnum): JSX.Element => (
  <FontAwesomeIcon
    icon={status === HealthStatusEnum.Healthy ? faCheckCircle : faTimesCircle}
    className={`status-icon ${status === HealthStatusEnum.Healthy ? 'healthy' : 'unhealthy'}`}
  />
);

/**
 * Dashboard component that displays the health status of various services.
 *
 * This component fetches health data from an API and displays the general system status
 * along with individual statuses for each service (e.g., API, database).
 *
 * @returns {JSX.Element} A React component that renders the system health dashboard.
 */
const Dashboard: React.FC = (): JSX.Element => {
  const [healthData, setHealthData] = useState<HealthStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadHealthData = async () => {
      try {
        const data = await fetchHealthData();
        setHealthData(data);
      } catch (error: any) {
        setError("Unable to retrieve health data. Please try again later.");
      }
    };

    loadHealthData();
  }, []);

  if (error) {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">System Health Dashboard</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className="dashboard-container">
        <h2 className="dashboard-title">System Health Dashboard</h2>
        <div className="loading-message">Loading health data...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">System Health Dashboard</h2>

      {/* General health */}
      <div className={`status-box ${healthData.status.toLowerCase()}`}>
        <h3>General Status: {healthData.status}</h3>
        <p>Total Duration: {healthData.totalDuration}</p>
      </div>

      {/* Services entries */}
      <div className="services-container">
        {Object.keys(healthData.entries).map((entryKey) => {
          const { status, duration } = healthData.entries[entryKey];

          return (
            <div
              key={entryKey}
              className="service-card"
            >
              <h4>{entryKey}</h4>
              <p>Status: <span style={{ color: getStatusColor(status) }}>{status} {getStatusIcon(status as HealthStatusEnum)}</span></p>
              <p>Duration: {duration}</p>
              <div className="duration-container">
                <div
                  className="duration-bar"
                  style={{
                    width: `${getDurationWidth(duration)}px`,
                    backgroundColor: getDurationColor(duration),
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
