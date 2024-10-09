import React from "react";
import { HealthState, ServiceCardProps } from "../../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { getDurationColor, getDurationWidth, getStatusColor } from "./utils";

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
    <div className={`service-card ${status === HealthState.Unhealthy && isExpanded ? "error-expanded" : ""}`}>
        <h4>{entryKey}</h4>
        <p>Status: <span
            style={{ color: getStatusColor(status) }}
        >
            {status} {getStatusIcon(status as HealthState)}
        </span></p>
        <p>Duration: {duration}</p>

        {/* Only show the button if there's an error description available */}
        {status === HealthState.Unhealthy && description && (
            <button
                className="expand-button"
                onClick={toggleExpand}
            >
                {isExpanded ? "Hide details" : "Show details"}
            </button>
        )}

        {/* Show error details only when expanded and when the service is unhealthy */}
        {isExpanded && status === HealthState.Unhealthy && description && (
            <div className="error-details">
                <p>
                    <strong>
                        Error Description:
                    </strong>
                    {description}
                </p>
            </div>
        )}

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

export default ServiceCard;
