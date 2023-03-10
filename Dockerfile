FROM node:14
WORKDIR /app

COPY package.json ./
RUN yarn

COPY ./ /app
RUN curl -o /app/src/config/chain.json http://openapi.orbiter.finance/mainnet/public/chain.json
RUN curl -o /app/src/config/maker.json http://openapi.orbiter.finance/mainnet/public/maker.json
RUN curl -o /app/src/config/chainTest.json http://ec2-54-238-20-18.ap-northeast-1.compute.amazonaws.com:9095/public/chainTest.json
RUN curl -o /app/src/config/makerTest.json http://ec2-54-238-20-18.ap-northeast-1.compute.amazonaws.com:9095/public/makerTest.json
RUN npm run build

FROM nginx:alpine
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY docker.nginx.conf /etc/nginx/nginx.conf