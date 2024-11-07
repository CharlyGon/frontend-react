#!/bin/sh

# Verify that the environment variables are defined
if [ -z "$REACT_APP_API_BASE_URL" ]; then
    echo "Error: REACT_APP_API_BASE_URL is not set."
    exit 1
fi

# Diagnostic output for environment variables
echo "Configuración de entorno:"
echo "REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL}"

# Create the env-config.js file
echo "window._env_ = {
  REACT_APP_API_BASE_URL: '${REACT_APP_API_BASE_URL}',
};" > /usr/share/nginx/html/env-config.js

# Starts nginx
nginx -g 'daemon off;'
