import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./styles/Global.css";
import "./styles/variables.css";

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  console.log("Variables de entorno en desarrollo:", {
    API_BASE_URL: process.env.REACT_APP_API_BASE_URL,
  });
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
