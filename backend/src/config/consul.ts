import Consul, { KvPair } from 'consul';
import { chains } from "orbiter-chaincore/src/utils";
import mainnetChains from "./chains.json";
import testnetChains from "./testnet.json";
import { errorLogger } from "../util/logger";

export const consul = process.env['CONSUL_HOST'] ? new Consul({
  host: process.env['CONSUL_HOST'],
  port: process.env['CONSUL_PORT'],
  secure: false,
  defaults: {
    token: process.env['CONSUL_TOKEN'],
  },
}) : null;


export async function watchConfigChanges() {
  console.log("======== consul config init ========");
  const keys = [...await consul.kv.keys("maker/rule/config/common"), ...await consul.kv.keys("maker/rule/config/maker")];
  for (const key of keys) {
    let config;
    try {
      config = await watchMakerConfig(key);
    } catch (e) {
      // TODO TG
      console.error(e);
    }
    switch (key) {
      case "maker/rule/config/common/chain.json": {
        updateChain(config);
        break;
      }
      case "maker/rule/config/common/maker.json": {
        updateMaker(config);
        break;
      }
      case "maker/rule/config/common/chainTest.json": {
        updateChain(config);
        break;
      }
    }
  }
}

async function watchMakerConfig(key: string) {
  return new Promise((resolve, reject) => {
    const watcher = consul.watch({ method: consul.kv.get, options: { key } });
    watcher.on('change', (data: any) => {
      console.log(`Configuration updated: ${data.Key}`);
      if (data.Value) {
        resolve(JSON.parse(data.Value));
      }
    });
    watcher.on('error', (err: Error) => {
      console.error('Consul watch error:', err);
      reject(err);
    });
  });
}

function updateChain(config) {
  if (config && config.length && config.find(item => +item.internalId === 1)) {
    chains.fill(<any>[...config]);
  } else {
    errorLogger.error(`update chain config fail`);
  }
}

function updateMaker(config) {
  if (config && Object.keys(config).length) {
    convertMakerList
  } else {
    errorLogger.error(`update maker config fail`);
  }
}