# For @imtbl/imx-sdk, lts-alpine to 14-alpine
FROM node:16-alpine

# For @dydxprotocol/starkex-lib
RUN apk add g++ make python3

RUN apk update && apk add git

WORKDIR /app

COPY package.json ./
RUN yarn install
COPY ./ .
RUN yarn run postinstall
RUN yarn build
