FROM node:14
WORKDIR /app
RUN apt-get update
COPY package.json .
RUN yarn install --network-timeout 600000

COPY . .
RUN curl -o /app/src/shared/configs/maker.json http://ec2-54-238-20-18.ap-northeast-1.compute.amazonaws.com:9095/public/maker.json
RUN curl -o /app/src/shared/configs/chain.json http://ec2-54-238-20-18.ap-northeast-1.compute.amazonaws.com:9095/public/chain.json
