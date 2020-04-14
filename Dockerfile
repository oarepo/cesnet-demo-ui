# build stage
FROM node:alpine as build-stage
WORKDIR /app
# newer cli breaks compatibility with http-proxy-middleware
RUN yarn global add @quasar/cli@1.0.5
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

ENTRYPOINT [ "/usr/local/bin/quasar" ]
CMD ["serve", "dist/spa/", "--proxy", "proxy.js", "-p 8000"]
