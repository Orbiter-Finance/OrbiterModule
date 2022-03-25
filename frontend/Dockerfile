FROM node:lts-alpine
COPY ./ /app
WORKDIR /app
RUN yarn install --network-timeout 600000 && yarn run build

FROM nginx:alpine
RUN mkdir /app
COPY --from=0 /app/dist /app