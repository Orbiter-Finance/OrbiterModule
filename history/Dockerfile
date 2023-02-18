FROM node:14
WORKDIR /app
RUN apt-get update
COPY package.json .
RUN yarn install --network-timeout 600000

COPY . .
RUN curl -o /app/src/shared/configs/maker.json http://openapi.orbiter.finance/mainnet/public/maker.json
RUN curl -o /app/src/shared/configs/chain.json http://openapi.orbiter.finance/mainnet/public/chain.json
