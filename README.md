# Orbiter Module

## Statement

- Orbiter Module is still under production, If you find an error, please submit an [issue](https://github.com/OrbiterCross/OrbitalModule/issues/new) report and we'll fix it.

- The risk of using this piece of software will be borne sorely by the User. The author (Orbiter Module) does not bear any responsibility for the losses incurred while running this program, be that financial or material.

- The author of the software (Orbiter Module) does not bear any responsibility for service interruption or other defects caused by black swan events such as malicious attacks, communication line interruption, etc., which cause a disruption to the service,  but will try to minimize either the chances of something like that happening or the resulting damage to users.

- For issues not covered by this statement, please refer to the relevant national laws and regulations. If there's a conflict with the relevant national laws and regulations, the national laws and regulations shall prevail.

## Project

- OrbitalModule has been deployed on chain and the code will be made open-source.
- The Docker project is written in js, deployed in the EC2 server, and has no external port.
- It responds to the Sender’s needs via RPC data. It is a tool provided to Navigator.

## Functional

- Running this project requires setting the necessary parameters, such as localProvider and localWSProvider, which support each rollup node.

- By adjusting the parameters, the project can optimize the economic and time savings that users can achieve with Orbiter when configuring the rollup dynamics.

- Once the user initiates payment through the front-end wallet, real-time monitoring of transaction data for each rollup will be enabled, providing timely feedback on the status of the user's cross-rollup transfer.

## Design

**[backend](./backend)** - Navigator's auto script and Dashboard's api services.

**[frontend](./frontend)** - Dashboard's frontend. Based on Vue3 + Element Plus

## Project setup

### Change config

#### 1. Set backend/src/config/maker.ts

- Copy [backend/src/config/maker_backend.ts](./backend/src/config/maker_backup.ts) as maker.ts
- Replace [Your Key] with your key
- replace `makerAddress` value

#### 2. Set trade maker address and token address at this file

**[./backend/src/util/maker/maker_list.ts](./backend/src/util/maker/maker_list.ts)**

### Install docker and docker-compose

- [Install docker](https://docs.docker.com/get-docker/)
- [Install docker-compose](https://docs.docker.com/compose/install/)

### Build docker image and run docker

#### Set backend's ORBITER_SCENE

- If you intend on using Maker services only, set `ORBITER_SCENE=maker`
- If you intend on using dashboard service only, set `ORBITER_SCENE=dashboard`
- If you intend on using all services, set `ORBITER_SCENE=all` (default)
- <font color="yellow"><b>Warnning:</b></font> if you run maker service, please do not expose your ip or port on the public network

```
# When you need run at daemon, add -d
docker-compose up [-d]
```

#### Set maker privateKey 

Note : This is only applicable if you're running the maker serv
And, when you run maker service, also need to s
```
curl -i -X POST -H 'Content-type':'application/json' -d '{"privatekey":"your privatekey"}' http://localhost:[port(default:3002)]/maker/privatekey
```

#### Clear shell history

```
# Editor ~/.bash_history, clear shell's privatekey info
vim ~/.bash_history

# Clear cache
history -r
```

####  Set privatekey

Run `privatekey_input.py`
```
./privatekey_input.py
```

##### Use `screen` to run it on the backend

```
screen -S privatekey_input
```

```
./privatekey_input.py
```

##### Enter Input keys

```
screen -ls # Show all screen
screen -x [screenId] # Into screen by id
exit # Quit sreen
```

## Licence

Orbiter Module comes under the 
[MIT](./LICENSE) license. 
