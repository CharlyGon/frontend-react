#!/bin/sh

# Verificar que las variables de entorno estén definidas
if [ -z "$REACT_APP_API_BASE_URL" ]; then
    echo "Error: REACT_APP_API_BASE_URL is not set."
    exit 1
fi

# Salida de diagnóstico para las variables de entorno
echo "Configuración de entorno:"
echo "REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}"
echo "REACT_APP_HEALTH_API_URL=${REACT_APP_HEALTH_API_URL}"
echo "REACT_APP_DEFAULT_PAGE_SIZE=${REACT_APP_DEFAULT_PAGE_SIZE}"
echo "REACT_APP_DEFAULT_FONDOS_PAGE_SIZE=${REACT_APP_DEFAULT_FONDOS_PAGE_SIZE}"

# Crea el archivo env-config.js
echo "window._env_ = {
  REACT_APP_API_BASE_URL: '${REACT_APP_API_BASE_URL}',
  REACT_APP_HEALTH_API_URL: '${REACT_APP_HEALTH_API_URL}',
  REACT_APP_DEFAULT_PAGE_SIZE: '${REACT_APP_DEFAULT_PAGE_SIZE}',
  REACT_APP_DEFAULT_FONDOS_PAGE_SIZE: '${REACT_APP_DEFAULT_FONDOS_PAGE_SIZE}'
};" > /usr/share/nginx/html/env-config.js

# Inicia nginx
nginx -g 'daemon off;'
