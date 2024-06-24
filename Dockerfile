FROM node:18.16.0 as build-stage
#### build stage
RUN mkdir -p /app 
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build

#### production stage
FROM nginx:stable-alpine as production-stage
EXPOSE 80
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
