import React from "react";
import { HealthState, ServiceCardProps } from "../../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { getDurationColor, getDurationWidth, getStatusColor } from "./utils";
import styles from "./ServiceCard.module.css";

//Returns a FontAwesome icon based on the service health status.
const getStatusIcon = (status: HealthState): JSX.Element => (
    <FontAwesomeIcon
        icon={status === HealthState.Healthy ? faCheckCircle : faTimesCircle}
        className={`status-icon ${status === HealthState.Healthy ? "healthy" : "unhealthy"}`}
    />
);

/**
* A functional component that renders a service card with its status, duration, and optional error details.
*
* @param {ServiceCardProps} props - The props object for the service card.
* @param {string} props.entryKey - The key representing the service (e.g., "DbConnection").
* @param {string} props.status - The status of the service (e.g., "Healthy" or "Unhealthy").
* @param {string} props.duration - The response duration of the service.
* @param {string | null} [props.description] - An optional description in case of an unhealthy status.
* @param {boolean} props.isExpanded - A boolean indicating whether the error details should be shown.
* @param {() => void} props.toggleExpand - A callback function to toggle the expansion of the error details.
* @returns {JSX.Element} A React component representing a service card with expandable error details.
*/
const ServiceCard: React.FC<ServiceCardProps> = ({
    entryKey,
    status,
    duration,
    description,
    isExpanded,
    toggleExpand,
}: ServiceCardProps): JSX.Element => (
    <div
        className={
            `${styles.serviceCard}
            ${status === HealthState.Unhealthy && isExpanded ? styles.errorExpanded : ""}`
        }
    >
        <h4 className={styles.serviceCardTitle}>{entryKey}</h4>
        <p className={styles.serviceCardParagraph}>
            Status:{" "}
            <span
                className={styles.serviceCardSpan}
                style={{ color: getStatusColor(status) }}
            >
                {status} {getStatusIcon(status as HealthState)}
            </span>
        </p>
        <p className={styles.serviceCardParagraph}>Duration: {duration}</p>

        {/* Only show the button if there's an error description available */}
        {status === HealthState.Unhealthy && description && (
            <button
                className={styles.expandButton}
                onClick={toggleExpand}
            >
                {isExpanded ? "Hide details" : "Show details"}
            </button>
        )}

        {/* Show error details only when expanded and when the service is unhealthy */}
        {isExpanded && status === HealthState.Unhealthy && description && (
            <div className={styles.errorDetails}>
                <p className={styles.errorDetailsParagraph}>
                    <strong>Error Description: </strong>
                    {description}
                </p>
            </div>
        )}

        <div className={styles.durationContainer}>
            <div
                className={styles.durationBar}
                style={{
                    width: `${getDurationWidth(duration)}px`,
                    backgroundColor: getDurationColor(duration),
                }}
            />
        </div>
    </div>
);

export default ServiceCard;
