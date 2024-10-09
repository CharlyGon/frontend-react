import { StatusColor, HealthState } from "../../interfaces/interfaces";

// Constantes para la configuración de las barras de duración
const SCALE_FACTOR = 200;
const MIN_WIDTH = 5;
const MAX_WIDTH = 300;
const FAST_THRESHOLD_MS = 100;
const MODERATE_THRESHOLD_MS = 500;

/**
 * Helper function to determine the color of the status text based on the health status.
 *
 * @param {string} status - The current health status of the service.
 * @returns {StatusColor} The color (either green for healthy or red for unhealthy).
 */
export const getStatusColor = (status: string): string => {
    return status === HealthState.Healthy ? StatusColor.Healthy : StatusColor.Unhealthy;
};

/**
 * Helper function to determine the width of the duration bar based on the service response time.
 *
 * @param {string} duration - The response duration of the service in the format "HH:MM:SS.sss".
 * @returns {number} The calculated width for the duration bar.
 */
export const getDurationWidth = (duration: string): number => {
    const ms = parseFloat(duration.split(":")[2]);
    return Math.max(Math.min(ms * SCALE_FACTOR, MAX_WIDTH), MIN_WIDTH);
};

/**
 * Helper function to determine the background color of the duration bar based on the response time.
 *
 * @param {string} duration - The response duration of the service in the format "HH:MM:SS.sss".
 * @returns {StatusColor} The background color of the duration bar (green for fast, yellow for moderate, red for slow).
 */
export const getDurationColor = (duration: string): StatusColor => {
    const ms = parseFloat(duration.split(":")[2]);

    if (ms < FAST_THRESHOLD_MS) return StatusColor.Healthy;
    if (ms < MODERATE_THRESHOLD_MS) return StatusColor.Warning;
    return StatusColor.Unhealthy;
};