import { CustomWindow } from "./interfaces/interfaces";

declare let window: CustomWindow;

const isDev = process.env.NODE_ENV === 'development';

const verifyEnvVariables = () => {
    if (window._env_) {
        console.log("Variables de entorno cargadas:", window._env_);
    } else {
        console.error("No se pudieron cargar las variables de entorno");
        throw new Error("Las variables de entorno no están definidas.");
    }
};

if (!isDev) {
    window.onload = verifyEnvVariables;

    if (!window._env_?.REACT_APP_API_BASE_URL) {
        throw new Error("REACT_APP_API_BASE_URL is not defined in environment variables.");
    }
}

export const Config = {
    API_BASE_URL: isDev
        ? process.env.REACT_APP_API_BASE_URL
        : window._env_.REACT_APP_API_BASE_URL,
    API_VERSION: 'v1',
    DEFAULT_PAGE_SIZE: 50,
    DEFAULT_FONDOS_PAGE_SIZE: 5,
};
