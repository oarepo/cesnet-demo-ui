# build stage
FROM node:alpine as build-stage
WORKDIR /app
RUN yarn global add @quasar/cli
COPY package*.json ./
RUN yarn install
COPY . .
RUN quasar build

# production stage
FROM iamfreee/docker-nginx-static-spa:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
