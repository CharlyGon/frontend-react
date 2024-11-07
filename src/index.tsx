import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/Global.css";
import "./styles/variables.css";

// Determina si está en modo de desarrollo
const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  console.log("Variables de entorno en desarrollo:", {
    DEFAULT_PAGE_SIZE: process.env.REACT_APP_DEFAULT_PAGE_SIZE,
    DEFAULT_FONDOS_PAGE_SIZE: process.env.REACT_APP_DEFAULT_FONDOS_PAGE_SIZE,
    API_URL_HEALTH: process.env.REACT_APP_HEALTH_API_URL,
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  });
}

// Renderiza la aplicación directamente
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
