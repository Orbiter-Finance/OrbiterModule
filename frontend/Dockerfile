FROM node:lts-alpine
COPY ./ /app
WORKDIR /app
RUN yarn && yarn run build

FROM nginx:alpine
RUN mkdir /app
COPY --from=0 /app/dist /app