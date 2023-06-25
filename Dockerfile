FROM node:14
WORKDIR /app

COPY package.json ./
RUN yarn

COPY ./ /app
RUN npm run build

FROM nginx:alpine
RUN mkdir /app
COPY --from=0 /app/dist /app
# development
COPY docker.nginx.conf /etc/nginx/nginx.conf
# production
# COPY docker.nginx.prod.conf /etc/nginx/nginx.conf