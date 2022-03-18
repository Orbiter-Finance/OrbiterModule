FROM node:lts-alpine

# For @dydxprotocol/starkex-lib
RUN apk add g++ make python3

WORKDIR /app
COPY . .
RUN apk update && apk add git
RUN yarn && yarn run build