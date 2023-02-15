# For @imtbl/imx-sdk, lts-alpine to 14-alpine
FROM node:14-alpine

WORKDIR /app
COPY . .
RUN curl -o /app/src/shared/configs/maker.json http://ec2-54-238-20-18.ap-northeast-1.compute.amazonaws.com:9095/public/maker.json
RUN curl -o /app/src/shared/configs/chain.json http://ec2-54-238-20-18.ap-northeast-1.compute.amazonaws.com:9095/public/chain.json
RUN yarn install --network-timeout 600000 && yarn run build && rm -fr src
