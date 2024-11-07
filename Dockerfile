# 1. Construction stage
FROM node:21 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# 2. Production stage with Nginx
FROM nginx:alpine

RUN apk add --no-cache bash

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
COPY start.sh /usr/local/bin/start.sh

RUN chmod +x /usr/local/bin/start.sh

EXPOSE 80

ENV NODE_ENV=production

CMD ["/usr/local/bin/start.sh"]
#CMD ["nginx", "-g", "daemon off;"]

