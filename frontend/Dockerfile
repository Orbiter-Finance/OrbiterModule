# For @imtbl/imx-sdk, lts-alpine to 14-alpine
FROM node:14-alpine

# For @dydxprotocol/starkex-lib
RUN apk add g++ make python3 git

COPY ./ /app
WORKDIR /app
RUN yarn install --production --network-timeout 600000 && yarn run build

# Nginx
FROM nginx:alpine
RUN mkdir /app
COPY --from=0 /app/dist /app