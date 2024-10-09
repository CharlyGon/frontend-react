import { Fondo } from '../interfaces/interfaces';
import { Config } from '../config';

const API_BASE_URL = Config.API_BASE_URL;

export const fetchFondos = async (page: number, pageSize: number = Config.DEFAULT_FONDOS_PAGE_SIZE): Promise<Fondo[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/Fondo/pagination?pageIndex=${page}&pageSize=${pageSize}`);
        if (!response.ok) {
            throw new Error("Error fetching fondos");
        }

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error("Failed to fetch fondos", error);
        throw error;
    }
};
