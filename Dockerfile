FROM node:14-alpine as build

WORKDIR /app
ADD ./ /app
RUN ls && npm install && npm run build && ls

FROM nginx:latest
WORKDIR /var/www/html
COPY --from=build /app/build .
RUN ls && rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80
