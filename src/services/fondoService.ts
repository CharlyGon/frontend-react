import { Fondo } from '../interfaces/interfaces';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const DEFAULT_FONDOS_PAGE_SIZE = parseInt(process.env.REACT_APP_DEFAULT_FONDOS_PAGE_SIZE ?? "5", 10);

export const fetchFondos = async (page: number, pageSize: number =DEFAULT_FONDOS_PAGE_SIZE): Promise<Fondo[]> => {
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
