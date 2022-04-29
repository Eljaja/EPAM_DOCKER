FROM node:16-alpine AS builder_site
WORKDIR /usr/src/app
COPY ./frontend/ ./

RUN npm install && npm run build


FROM nginx:alpine
COPY --from=builder_site /usr/src/app/build /usr/share/nginx/html
RUN sed -i '/index.html index.htm;/a \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf
HEALTHCHECK --interval=10s --timeout=10s --start-period=5s --retries=3 CMD  "curl --fail http://localhost || kill 1" 
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]