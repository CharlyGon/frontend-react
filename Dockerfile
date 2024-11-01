# 1. Construction stage
FROM node:21 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
	
COPY . .
RUN npm run build

# 2. Production stage with Nginx
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

