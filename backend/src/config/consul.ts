import Consul, { KvPair } from 'consul';
import { chains } from "orbiter-chaincore/src/utils";
import { errorLogger, accessLogger } from "../util/logger";
import { IChainCfg, IMaker, IMakerCfg, IMakerDataCfg } from "../util/maker/maker_list";
import mk from "../util/maker/maker_list";
import makerConfig from './maker';
import { consulConfig } from "./consul_store";
import { batchTxSend } from "../schedule/jobs";

export const consul = process.env["CONSUL_HOST"]
    ? new Consul({
        host: process.env["CONSUL_HOST"],
        port: process.env["CONSUL_PORT"],
        secure: false,
        defaults: {
            token: process.env["CONSUL_TOKEN"],
        },
    })
    : null;

export async function watchConsulConfig() {
    console.log("======== consul config init begin ========");
    const keys = [
        ...(await consul.kv.keys("maker/rule/config/common")),
        ...(await consul.kv.keys("maker/rule/config/maker")),
    ];
    for (const key of keys) {
        try {
            await watchMakerConfig(key);
        } catch (e) {
            // TODO TG
            errorLogger.error(e);
        }
    }
    console.log("======== consul config init end ========");
}

async function watchMakerConfig(key: string) {
    return new Promise((resolve, reject) => {
        const watcher = consul.watch({ method: consul.kv.get, options: { key } });
        watcher.on("change", (data: any) => {
            if (!data?.Key) {
                errorLogger.error(`Consul can't find key ${key}`, data);
                return;
            }
            accessLogger.info(`Configuration updated: ${data.Key}`);
            if (data.Value) {
                try {
                    const config = JSON.parse(data.Value);
                    if (key === "maker/rule/config/common/chain.json") {
                        updateChain(config);
                    }
                    if (key.indexOf("maker/rule/config/common/trading-pairs") !== -1) {
                        updateTradingPairs(key.split("maker/rule/config/common/trading-pairs/")[1], config);
                    }
                    if (key === "maker/rule/config/maker/maker.json") {
                        updateMaker(config);
                    }
                    if (key === "maker/rule/config/maker/starknet.json") {
                        updateStarknet(config);
                    }
                    resolve(config);
                } catch (e) {
                    errorLogger.error(`Consul watch refresh config error: ${e.message} dataValue: ${data.Value}`);
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        });
        watcher.on("error", (err: Error) => {
            errorLogger.error(`Consul watch ${key} error: `, err);
            resolve(null);
        });
    });
}

function updateMaker(config: any) {
    if (config && Object.keys(config).length) {
        if (consulConfig.maker && Object.keys(consulConfig.maker).length) {
            compare(consulConfig.maker, config, function (msg) {
                accessLogger.info(msg);
            });
        }
        consulConfig.maker = config;
        Object.assign(makerConfig, config);
        accessLogger.info(`update maker config success`);
    } else {
        errorLogger.error(`update maker config fail`);
    }
}

function updateChain(config: any) {
    if (config && config.length && config.find(item => +item.internalId === 1 || +item.internalId === 5)) {
        const configs = <any>convertChainConfig("NODE_APP", config);
        if (consulConfig.chain && consulConfig.chain.length) {
            compare(consulConfig.chain, config, function (msg) {
                accessLogger.info(msg);
            });
        }
        consulConfig.chain = config;
        chains.fill(configs);
        refreshConfig();
        accessLogger.info(`update chain config success`);
    } else {
        errorLogger.error(`update chain config fail`);
    }
}

function updateTradingPairs(makerAddress: string, config: any) {
    if (config && Object.keys(config).length) {
        if (consulConfig.tradingPairs[makerAddress]) {
            compare(consulConfig.tradingPairs[makerAddress], config, function (msg) {
                accessLogger.info(msg);
            });
        }
        consulConfig.tradingPairs[makerAddress] = config;
        refreshConfig();
        accessLogger.info(`update ${makerAddress} trading pairs success`);
    } else {
        errorLogger.error(`update trading pairs fail, format error`);
    }
}

function refreshConfig() {
    try {
        const res = convertMakerList(consulConfig.chain, consulConfig.tradingPairs);
        if (res.code === 0) {
            mk.makerList = res.makerList;
        } else {
            errorLogger.error(res.msg);
        }
    } catch (e) {
        errorLogger.error(e.message);
    }
}

function updateStarknet(config: any) {
    if (config && Object.keys(config).length) {
        if (consulConfig.starknet && Object.keys(consulConfig.starknet).length) {
            compare(consulConfig.starknet, config, function (msg) {
                accessLogger.info(msg);
            });
        }
        consulConfig.starknet = config;
        accessLogger.info(`update starknet config success`);
        batchTxSend();
    } else {
        errorLogger.error(`update starknet config fail`);
    }
}

function compare(obj1: any, obj2: any, cb: Function, superKey?: string) {
    if (obj1 instanceof Array && obj2 instanceof Array) {
        compareList(obj1, obj2, cb, superKey);
    } else if (typeof obj1 === "object" && typeof obj2 === "object") {
        compareObj(obj1, obj2, cb, superKey);
    }
}

function compareObj(obj1: any, obj2: any, cb: Function, superKey?: string) {
    for (const key in obj1) {
        if (obj1[key] instanceof Array) {
            compareList(obj1[key], obj2[key], cb, superKey ? `${superKey} ${key}` : key);
        } else if (typeof obj1[key] === "object") {
            compareObj(obj1[key], obj2[key], cb, superKey ? `${superKey} ${key}` : key);
        } else if (obj1[key] !== obj2[key]) {
            cb(`${superKey ? (superKey + " ") : ""}${key}:${obj1[key]} ==> ${obj2[key]}`);
        }
    }
}

function compareList(arr1: any[], arr2: any[], cb: Function, superKey?: string) {
    if (arr1.length !== arr2.length) {
        cb(`${superKey ? (superKey + " ") : ""}count:${arr1.length} ==> ${arr2.length}`);
        return;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (typeof arr1[i] === "object") {
            compareObj(arr1[i], arr2[i], cb, superKey);
        } else if (arr1[i] !== arr2[i]) {
            cb(`${superKey ? (superKey + " ") : ""}${arr1[i]} ==> ${arr2[i]}`);
        }
    }
}

export function convertChainConfig(env_prefix: string, chainList: any[]): any[] {
    for (const chain of chainList) {
        chain.rpc = chain.rpc || [];
        const apiKey =
            process.env[`${env_prefix}_CHAIN_API_KEY_${chain.internalId}`];
        const wpRpc = process.env[`${env_prefix}_WP_${chain.internalId}`];
        const hpRpc = process.env[`${env_prefix}_HP_${chain.internalId}`];
        if (chain.api && apiKey) {
            chain.api.key = apiKey;
        }
        if (wpRpc) {
            chain.rpc.unshift(wpRpc);
        }
        if (hpRpc) {
            chain.rpc.unshift(hpRpc);
        }
    }
    return JSON.parse(JSON.stringify(chainList));
}

export function convertMakerList(chainList: IChainCfg[], makerCfg: IMakerCfg): { code: number, msg: string, makerList: IMaker[] } {
    const v1makerList: any[] = [];
    const noMatchMap: any = {};

    for (const chain of chainList) {
        if (chain.tokens && chain.nativeCurrency) {
            chain.tokens.push(chain.nativeCurrency);
        }
    }
    for (const makerAddress in makerCfg) {
        const makerMap = makerCfg[makerAddress];
        for (const chainIdPair in makerMap) {
            if (!makerMap.hasOwnProperty(chainIdPair)) continue;
            const symbolPairMap = makerMap[chainIdPair];
            const [fromChainId, toChainId] = chainIdPair.split("-");
            const c1Chain = chainList.find(item => +item.internalId === +fromChainId);
            const c2Chain = chainList.find(item => +item.internalId === +toChainId);
            if (!c1Chain) {
                noMatchMap[fromChainId] = {};
                continue;
            }
            if (!c2Chain) {
                noMatchMap[toChainId] = {};
                continue;
            }
            for (const symbolPair in symbolPairMap) {
                if (!symbolPairMap.hasOwnProperty(symbolPair)) continue;
                const makerData: IMakerDataCfg = symbolPairMap[symbolPair];
                const [fromChainSymbol, toChainSymbol] = symbolPair.split("-");
                // handle v1makerList
                if (fromChainSymbol === toChainSymbol) {
                    makerData.makerAddress = makerAddress;
                    handleV1MakerList(makerMap, symbolPair, fromChainSymbol, toChainId, fromChainId, c1Chain, c2Chain, makerData);
                }
            }
        }
    }

    function handleV1MakerList(
        makerMap: any,
        symbolPair: string,
        symbol: string,
        toChainId: string,
        fromChainId: string,
        c1Chain: IChainCfg,
        c2Chain: IChainCfg,
        c1MakerData: IMakerDataCfg,
    ) {
        // duplicate removal
        if (v1makerList.find(item => item.c1ID === +toChainId && item.c2ID === +fromChainId && item.tName === symbol)) {
            return;
        }
        const c1Token = c1Chain.tokens.find(item => item.symbol === symbol);
        const c2Token = c2Chain.tokens.find(item => item.symbol === symbol);
        if (!c1Token) {
            noMatchMap[fromChainId] = noMatchMap[fromChainId] || {};
            noMatchMap[fromChainId][symbol] = 1;
            return;
        }
        if (!c2Token) {
            noMatchMap[toChainId] = noMatchMap[toChainId] || {};
            noMatchMap[toChainId][symbol] = 1;
            return;
        }
        // single
        const singleList = [4, 44];

        // reverse chain data
        const reverseChainIdPair = `${toChainId}-${fromChainId}`;
        if (!makerMap.hasOwnProperty(reverseChainIdPair)) {
            if (singleList.find(item => +item === +toChainId || +item === +fromChainId)) {
                makerMap[reverseChainIdPair] = makerMap[reverseChainIdPair] || {};
                makerMap[reverseChainIdPair][symbolPair] = JSON.parse(JSON.stringify(c1MakerData));
                // console.log("single --->", reverseChainIdPair, symbolPair);
            } else {
                return;
            }
        }
        const reverseSymbolPairMap = makerMap[reverseChainIdPair];
        if (!reverseSymbolPairMap.hasOwnProperty(symbolPair)) {
            if (singleList.find(item => +item === +toChainId || +item === +fromChainId)) {
                makerMap[reverseChainIdPair] = makerMap[reverseChainIdPair] || {};
                makerMap[reverseChainIdPair][symbolPair] = JSON.parse(JSON.stringify(c1MakerData));
                // console.log("single --->", reverseChainIdPair, symbolPair);
            } else {
                return;
            }
        }
        const c2MakerData: IMakerDataCfg = reverseSymbolPairMap[symbolPair];
        const chainNameMap = {
            5: "goerli",
            44: "starknet_test",


            1: "mainnet",
            2: "arbitrum",
            3: "zksync",
            4: "starknet",
            6: "polygon",
            7: "optimism",
            8: "immutableX",
            9: "loopring",
            10: "metis",
            11: "dydx",
            12: "zkspace",
            13: "boba",
            14: "zksync2",
            15: "bnbchain",
            16: "arbitrum_nova",
            17: "polygon_evm",
        };
        if (!chainNameMap[+fromChainId]) {
            // console.log(`FromChainId error ${fromChainId}`)
            // throw new Error(`FromChainId error ${fromChainId}`);
            return
        }
        if (!chainNameMap[+toChainId]) {
            // throw new Error(`ToChainId error ${toChainId}`);
            return
        }
        if (c1MakerData.sender === c2MakerData.sender || Number(fromChainId) == 4 || Number(fromChainId) == 44) {
            v1makerList.push({
                makerAddress: c1MakerData.sender.toLowerCase(),
                c1ID: +fromChainId,
                c2ID: +toChainId,
                c1Name: chainNameMap[+fromChainId],
                c2Name: chainNameMap[+toChainId],
                // c1Name: c1Chain.name,
                // c2Name: c2Chain.name,
                t1Address: c1Token.address.toLowerCase(),
                t2Address: c2Token.address.toLowerCase(),
                tName: symbol,
                c1MinPrice: c1MakerData.minPrice,
                c1MaxPrice: c1MakerData.maxPrice,
                c2MinPrice: c2MakerData.minPrice,
                c2MaxPrice: c2MakerData.maxPrice,
                precision: c1Token.decimals,
                c1TradingFee: c1MakerData.tradingFee,
                c2TradingFee: c2MakerData.tradingFee,
                c1GasFee: c1MakerData.gasFee,
                c2GasFee: c2MakerData.gasFee,
                c1AvalibleDeposit: 1000,
                c2AvalibleDeposit: 1000,
                c1AvalibleTimes: [
                    {
                        startTime: c1MakerData.startTime,
                        endTime: c1MakerData.endTime,
                    },
                ],
                c2AvalibleTimes: [
                    {
                        startTime: c2MakerData.startTime,
                        endTime: c2MakerData.endTime,
                    },
                ],
            });
        }
    }

    if (Object.keys(noMatchMap).length) {
        console.log(`Maker list convert match error ${JSON.stringify(noMatchMap)}`)
        // return { code: 1, msg: `Maker list convert match error ${JSON.stringify(noMatchMap)}`, makerList: [] };
    }

    return { code: 0, msg: 'success', makerList: v1makerList };
}