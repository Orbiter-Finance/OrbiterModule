FROM node:14
COPY ./ /app
WORKDIR /app
COPY package.json yarn-lock.json ./
RUN yarn
COPY . .
RUN npm run build
FROM nginx:alpine
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY docker.nginx.conf /etc/nginx/nginx.conf