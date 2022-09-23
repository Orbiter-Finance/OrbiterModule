# tradding-history-center

## development

1. change to your local database. configed `.env` file in the root dir. your can copy a example from `.env.example` file.

2. install dependencies.
```bash
cd history
# or npm install 
yarn install
```

3. start the api server.
```bash
yarn start:watch
```

## production

1. change to your local database. configed `.env` file in the root dir. your can copy a example from `.env.example` file.

2. start the api server by `docker-compose`.
```bash
docker-compose up history -d
```

3. restart when you have new stuffs.
```bash
docker-compose up --detach --build history
```
