export const Config = {
    DEFAULT_PAGE_SIZE: parseInt(process.env.REACT_APP_DEFAULT_PAGE_SIZE ?? '50', 10),
    DEFAULT_FONDOS_PAGE_SIZE: parseInt(process.env.REACT_APP_DEFAULT_FONDOS_PAGE_SIZE ?? '5', 10),
    API_URL_HEALTH: process.env.REACT_APP_HEALTH_API_URL,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
};
