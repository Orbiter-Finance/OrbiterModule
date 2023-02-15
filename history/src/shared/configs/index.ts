import chain from "./chain.json";
import maker from "./maker.json";
import { IMarket } from "../interfaces";

export const makerConfigs: IMarket[] = convertMakerConfig();

function convertMakerConfig() {
    const makerMap = maker;
    const chainList = chain;
    const configs = [];
    const getChainTokenList = (chain) => {
        return chain.nativeCurrency ? [chain.nativeCurrency, ...chain.tokens] : [...chain.tokens];
    };
    for (const chainIdPair in makerMap) {
        if (!makerMap.hasOwnProperty(chainIdPair)) continue;
        const symbolPairMap = makerMap[chainIdPair];
        const [fromChainId, toChainId] = chainIdPair.split("-");
        const c1Chain = chainList.find(item => +item.internalId === +fromChainId);
        const c2Chain = chainList.find(item => +item.internalId === +toChainId);
        if (!c1Chain || !c2Chain) continue;
        for (const symbolPair in symbolPairMap) {
            if (!symbolPairMap.hasOwnProperty(symbolPair)) continue;
            const makerData = symbolPairMap[symbolPair];
            const [fromChainSymbol, toChainSymbol] = symbolPair.split("-");
            const fromTokenList = getChainTokenList(c1Chain);
            const toTokenList = getChainTokenList(c2Chain);
            const fromToken = fromTokenList.find(
                item => item.symbol === fromChainSymbol,
            );
            const toToken = toTokenList.find(
                item => item.symbol === toChainSymbol,
            );
            if (!fromToken || !toToken) continue;
            const config = {
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
                    name: c1Chain.name,
                    tokenAddress: fromToken.address,
                    symbol: fromChainSymbol,
                    decimals: fromToken.decimals,
                    minPrice: makerData.minPrice,
                    maxPrice: makerData.maxPrice,
                },
                toChain: {
                    id: +toChainId,
                    name: c2Chain.name,
                    tokenAddress: toToken.address,
                    symbol: toChainSymbol,
                    decimals: toToken.decimals,
                },
                times: [makerData.startTime, makerData.endTime],
                crossAddress: {
                    recipient: makerData.crossAddress?.makerAddress,
                    sender: makerData.crossAddress?.sender,
                    tradingFee: makerData.crossAddress?.tradingFee,
                    gasFee: makerData.crossAddress?.gasFee
                }
            };
            // handle makerConfigs
            configs.push(config);
        }
    }
    return configs;
}