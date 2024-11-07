interface CustomWindow extends Window {
    _env_: {
        REACT_APP_DEFAULT_PAGE_SIZE?: string;
        REACT_APP_DEFAULT_FONDOS_PAGE_SIZE?: string;
        REACT_APP_HEALTH_API_URL?: string;
        REACT_APP_API_BASE_URL?: string;
    };
}

declare let window: CustomWindow;

// Determina si está en modo de desarrollo
const isDev = process.env.NODE_ENV === 'development';

// Verifica si las variables de entorno están cargadas
window.onload = () => {
    if (window._env_) {
        console.log("Variables de entorno cargadas:", window._env_);
    } else {
        console.error("No se pudieron cargar las variables de entorno");
    }
};

if (!isDev && !window._env_?.REACT_APP_API_BASE_URL) {
    throw new Error("REACT_APP_API_BASE_URL is not defined in environment variables.");
}

export const Config = {
    DEFAULT_PAGE_SIZE: isDev
        ? parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE ?? '50', 10)
        : parseInt(window._env_.REACT_APP_DEFAULT_PAGE_SIZE ?? '50', 10),
    DEFAULT_FONDOS_PAGE_SIZE: isDev
        ? parseInt(process.env.REACT_APP_DEFAULT_FONDOS_PAGE_SIZE ?? '5', 10)
        : parseInt(window._env_.REACT_APP_DEFAULT_FONDOS_PAGE_SIZE ?? '5', 10),
    API_URL_HEALTH: isDev
        ? process.env.REACT_APP_HEALTH_API_URL
        : window._env_.REACT_APP_HEALTH_API_URL,
    API_BASE_URL: isDev
        ? process.env.REACT_APP_API_BASE_URL
        : window._env_.REACT_APP_API_BASE_URL,
};



















































// // dev
// // export const Config = {
// //     DEFAULT_PAGE_SIZE: parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE ?? '50', 10),
// //     DEFAULT_FONDOS_PAGE_SIZE: parseInt(process.env.REACT_APP_DEFAULT_FONDOS_PAGE_SIZE ?? '5', 10),
// //     API_URL_HEALTH: process.env.REACT_APP_HEALTH_API_URL,
// //     API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
// // };

// interface CustomWindow extends Window {
//     _env_: {
//         REACT_APP_DEFAULT_PAGE_SIZE?: string;
//         REACT_APP_DEFAULT_FONDOS_PAGE_SIZE?: string;
//         REACT_APP_HEALTH_API_URL?: string;
//         REACT_APP_API_BASE_URL?: string;
//     };
// }

// declare let window: CustomWindow;

// // Verifica si las variables de entorno están cargadas
// window.onload = () => {
//     if (window._env_) {
//         console.log("Variables de entorno cargadas:", window._env_);
//     } else {
//         console.error("No se pudieron cargar las variables de entorno");
//     }
// };

// // Asegúrate de que las variables de entorno existen
// if (!window._env_.REACT_APP_API_BASE_URL) {
//     throw new Error("REACT_APP_API_BASE_URL is not defined in environment variables.");
// }

// export const Config = {
//     DEFAULT_PAGE_SIZE: parseInt(window._env_.REACT_APP_DEFAULT_PAGE_SIZE ?? '50', 10),
//     DEFAULT_FONDOS_PAGE_SIZE: parseInt(window._env_.REACT_APP_DEFAULT_FONDOS_PAGE_SIZE ?? '5', 10),
//     API_URL_HEALTH: window._env_.REACT_APP_HEALTH_API_URL,
//     API_BASE_URL: window._env_.REACT_APP_API_BASE_URL,
// };


