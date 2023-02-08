FROM node:14
COPY ./ /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY . .
RUN npm run build
FROM nginx:alpine
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY docker.nginx.conf /etc/nginx/nginx.conf