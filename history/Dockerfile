# For @imtbl/imx-sdk, lts-alpine to 14-alpine
FROM node:14-alpine

WORKDIR /app
COPY package.json yarn-lock.json ./
RUN yarn install --network-timeout 600000
COPY . .
RUN yarn run build && rm -fr src
