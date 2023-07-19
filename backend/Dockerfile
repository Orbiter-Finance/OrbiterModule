# For @imtbl/imx-sdk, lts-alpine to 14-alpine
FROM node:16-alpine

# For @dydxprotocol/starkex-lib
RUN apk add g++ make python3

WORKDIR /app
RUN apk update && apk add git

COPY package.json .
COPY yarn.lock .
RUN yarn install --network-timeout 600000
COPY ./ .
RUN yarn run build
RUN yarn run postinstall
