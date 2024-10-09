import { Config } from "../config";
import { HealthStatus } from "../interfaces/interfaces";

export const fetchHealthData = async (): Promise<HealthStatus> => {
    const API_URL = Config.API_URL_HEALTH;

    if (!API_URL) {
        throw new Error('API URL is not defined');
    }

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch health data');

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching health data:', error);
        throw error;
    }
};
