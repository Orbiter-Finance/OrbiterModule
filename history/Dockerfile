# For @imtbl/imx-sdk, lts-alpine to 14-alpine
FROM node:14-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --network-timeout 600000
COPY . .
RUN npm run build && rm -fr src
