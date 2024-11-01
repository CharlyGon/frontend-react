import React, { useEffect, useState } from "react";
import { HealthStatusService } from "../../interfaces/interfaces";
import { fetchHealthData } from "../../services/healthService";
import ServiceCard from "./ServiceCard";

import styles from "./styles/Dashboard.module.css";

/**
 * Dashboard component for displaying the health status of multiple services.
 *
 * This component fetches health data from an API and shows the general system status
 * as well as individual statuses for each service. It allows expanding service cards
 * to show additional error details when applicable.
 * @returns {JSX.Element} The dashboard component.
 */
const Dashboard: React.FC = (): JSX.Element => {
  const [healthData, setHealthData] = useState<HealthStatusService | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

  // Effect that fetches health data when the component mounts.
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
      <div className={styles.dashboardContainer}>
        <h2 className={styles.dashboardTitle}>Panel de control</h2>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

  if (!healthData) {
    return (
      <div className={styles.dashboardContainer}>
        <h2 className={styles.dashboardTitle}>Panel de control</h2>
        <div className="loading-message">Retrieving system health status, please hold on...</div>
      </div>
    );
  }

  const toggleExpandService = (serviceKey: string) => {
    setExpandedServices((prev) => ({
      ...prev,
      [serviceKey]: !prev[serviceKey],
    }));
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboardTitle}>Panel de control</h2>

      <div className={`${styles.statusBox} ${healthData.status === "Healthy" ? styles.statusBoxHealthy : styles.statusBoxUnhealthy}`}>
        <h3>General Status: {healthData.status}</h3>
        <p>Total Duration: {healthData.totalDuration}</p>
      </div>

      <div className={styles.servicesContainer}>
        {Object.keys(healthData.entries).map((entryKey) => {
          const { status, duration, description } = healthData.entries[entryKey];
          return (
            <ServiceCard
              key={entryKey}
              entryKey={entryKey}
              status={status}
              duration={duration}
              description={description}
              isExpanded={!!expandedServices[entryKey]}
              toggleExpand={() => toggleExpandService(entryKey)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
