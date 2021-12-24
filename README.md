# Orbiter Module

## Project

- OrbitalModule has been deployed and will be open-source soon.
- A Docker project is written in js, deployed in the EC2 server, and has no external exposed port.
- It is always online and responds to the Sender’s needs via RPC data. It is a tool provided to Navigator.

## Functional

- Running this project requires setting the necessary parameters, such as localProvider and localWSProvider, which support each rollup node.

- By configuring the parameters, the project can realize the economic and time savings that users can make by Orbiter when configuring the rollup dynamics. After the user initiates payment through the front-end wallet, it will monitor the transaction data of each rollup in real time and feed back the real-time status of the user's cross-rollup transfer in time.

## Design

**[backend](./backend)** - Navigator's auto script and Dashboard's api services.

**[frontend](./frontend)** - Dashboard's frontend. Based on Vue3 + Element Plus

## Project setup

### Change config

#### 1. Set your main maker address at this file

**[./backend/src/config/maker.ts](./backend/src/config/maker.ts)**, replace `makerAddress` value

#### 2. Set trade maker address and token address at this file

**[./backend/src/util/maker/maker_list.ts](./backend/src/util/maker/maker_list.ts)**

### Install docker and docker-compose

- [Install docker](https://docs.docker.com/get-docker/)
- [Install docker-compose](https://docs.docker.com/compose/install/)

### Build dokcer image and run docker

#### Set backend's ORBITER_SCENE

- When you only maker service, set `ORBITER_SCENE=maker`
- When you only dashboard service, set `ORBITER_SCENE=dashboard`
- When you only all service, set `ORBITER_SCENE=all` (default)

```
# When you need run at daemon, add -d
docker-compose up [-d]
```

#### And, when you run maker service, also need to set maker privateKey

```
curl -i -X POST -H 'Content-type':'application/json' -d '{"privatekey":"your privatekey"}' http://localhost:[port(default:3002)]/maker/privatekey
```

#### Next, you also need to clear shell history

```
# Editor ~/.bash_history, clear shell's privatekey info
vim ~/.bash_history

# Clear cache
history -r
```

## Licence

Orbiter Module is open source software licensed as
[MIT](./LICENSE).
