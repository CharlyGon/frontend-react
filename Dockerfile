# 1. Construction stage
FROM node:21 AS build

ARG API_BASE_URL
ARG HEALTH_API_URL
ARG DEFAULT_PAGE_SIZE
ARG DEFAULT_FONDOS_PAGE_SIZE

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN REACT_APP_API_BASE_URL=${API_BASE_URL} \
    REACT_APP_HEALTH_API_URL=${HEALTH_API_URL} \
    REACT_APP_DEFAULT_PAGE_SIZE=${DEFAULT_PAGE_SIZE} \
    REACT_APP_DEFAULT_FONDOS_PAGE_SIZE=${DEFAULT_FONDOS_PAGE_SIZE} \
    npm run build

# 2. Production stage with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
