# For @imtbl/imx-sdk, lts-alpine to 14-alpine
FROM node:14-alpine

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
CMD npm run start:prod
