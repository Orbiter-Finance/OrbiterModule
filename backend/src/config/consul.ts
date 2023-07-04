import Consul, { KvPair } from 'consul';
import { chains } from "orbiter-chaincore/src/utils";
import { errorLogger, accessLogger } from "../util/logger";
import makerConfig from './maker';
import { consulConfig } from "./consul_store";
import { batchTxSend } from "../schedule/jobs";
import { validateAndParseAddress } from "starknet";
import { IMarket } from "../util/maker/new_maker";
import { IChainCfg, IMakerCfg, IMakerDataCfg } from "../util/interface";

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

export let makerConfigs: IMarket[] = [];

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
                    if (key.indexOf("maker/rule/config/maker/nonce") !== -1) {
                        const makerAddress_chain = key.split("maker/rule/config/maker/nonce/")[1];
                        const arr = makerAddress_chain.split('/');
                        if (arr.length !== 2) {
                            errorLogger.error(`watch maker length error, length: ${arr.length} ${makerAddress_chain}`);
                            resolve(null);
                        }
                        const makerAddress = arr[0];
                        const chainId: any = arr[1];
                        const nonce: any = data.Value;
                        const isStarknetAddress = (address) => {
                            try {
                                validateAndParseAddress(address);
                                return true;
                            } catch (e) {
                                return false;
                            }
                        };
                        if (!new RegExp(/^0x[a-fA-F0-9]{40}$/).test(makerAddress) && !isStarknetAddress(makerAddress)) {
                            errorLogger.error(`maker address is not evm address or starknet address ${makerAddress}`);
                            resolve(null);
                        }
                        if (!isNaN(parseFloat(chainId)) && isFinite(chainId)) {
                            errorLogger.error(`chainId is not number, chainId: ${nonce} ${makerAddress_chain}`);
                            resolve(null);
                        }
                        if (!isNaN(parseFloat(nonce)) && isFinite(nonce)) {
                            errorLogger.error(`nonce is not number, nonce: ${nonce} ${makerAddress_chain}`);
                            resolve(null);
                        }
                        updateNonce(makerAddress.toLowerCase(), Number(nonce), data.Value);
                    }
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
        } else {
            accessLogger.info(`add maker address ${makerAddress}`);
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
        makerConfigs = convertMakerConfig(consulConfig.chain, consulConfig.tradingPairs);
    } catch (e) {
        errorLogger.error(`refreshConfig error ${e.message}`);
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

const bootTime = new Date().valueOf();

function updateNonce(makerAddress: string, chainId: number, nonce: number) {
    consulConfig.nonce[makerAddress] = consulConfig.nonce[makerAddress] || {};
    // ignore boot first update
    const now = new Date().valueOf();
    const openTime = bootTime + 1000 * 60;
    if (now < openTime) {
        accessLogger.info(`not yet reached updateable time ${new Date(bootTime).toTimeString()} < ${new Date(openTime).toTimeString()}`);
        return;
    }
    consulConfig.nonce[makerAddress][chainId] = nonce;
    if (chainId === 4 || chainId === 44) {

        accessLogger.info(`update ${makerAddress} starknet nonce`);
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

export function convertMakerConfig(list: IChainCfg[], makerCfgMap: IMakerCfg): IMarket[] {
    const chainList: IChainCfg[] = JSON.parse(JSON.stringify(list));
    const configs: IMarket[] = [];
    for (const makerAddress in makerCfgMap) {
        const makerMap = makerCfgMap[makerAddress];
        for (const chainIdPair in makerMap) {
            if (!makerMap.hasOwnProperty(chainIdPair)) continue;
            const symbolPairMap = makerMap[chainIdPair];
            const [fromChainId, toChainId] = chainIdPair.split("-");
            const c1Chain = chainList.find(item => +item.internalId === +fromChainId);
            const c2Chain = chainList.find(item => +item.internalId === +toChainId);
            if (!c1Chain || !c2Chain) continue;
            for (const symbolPair in symbolPairMap) {
                if (!symbolPairMap.hasOwnProperty(symbolPair)) continue;
                const makerData: IMakerDataCfg = symbolPairMap[symbolPair];
                const [fromChainSymbol, toChainSymbol] = symbolPair.split("-");
                const fromTokenList = c1Chain.nativeCurrency ? [c1Chain.nativeCurrency, ...c1Chain.tokens] : [...c1Chain.tokens];
                const toTokenList = c2Chain.nativeCurrency ? [c2Chain.nativeCurrency, ...c2Chain.tokens] : [...c2Chain.tokens];
                const fromToken = fromTokenList.find(item => item.symbol === fromChainSymbol);
                const toToken = toTokenList.find(item => item.symbol === toChainSymbol);
                if (!fromToken || !toToken) continue;
                // verify xvm
                if (fromToken.symbol !== toToken.symbol && (!c1Chain.xvmList || !c1Chain.xvmList.length)) {
                    console.log(
                        `${c1Chain.internalId}-${fromToken.symbol}:${c2Chain.internalId}-${toToken.symbol} not support xvm`,
                    );
                }
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
                if (!chainNameMap[+fromChainId] || !chainNameMap[+toChainId]) {
                    console.log(`convertMakerConfig chainId error ${fromChainId} ${toChainId}`)
                    // throw new Error(`FromChainId error ${fromChainId}`);
                    continue
                }
                // handle makerConfigs
                configs.push({
                    id: "",
                    makerId: "",
                    ebcId: "",
                    slippage: makerData.slippage || 0,
                    recipient: makerData.makerAddress,
                    sender: makerData.sender,
                    tradingFee: makerData.tradingFee,
                    gasFee: makerData.gasFee,
                    fromChain: {
                        id: +fromChainId,
                        name: chainNameMap[+fromChainId],
                        tokenAddress: fromToken.address,
                        symbol: fromChainSymbol,
                        decimals: fromToken.decimals,
                        minPrice: makerData.minPrice,
                        maxPrice: makerData.maxPrice,
                    },
                    toChain: {
                        id: +toChainId,
                        name: chainNameMap[+toChainId],
                        tokenAddress: toToken.address,
                        symbol: toChainSymbol,
                        decimals: toToken.decimals,
                    },
                    times: [makerData.startTime, makerData.endTime]
                });
            }
        }
    }
    return configs;
}