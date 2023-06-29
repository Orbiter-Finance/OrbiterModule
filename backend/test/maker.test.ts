// import { makerList as makerList } from "../src/util/maker/maker_list_80c";
import { IMakerDataCfg } from "../src/util/maker/maker_list";
import mk from "../src/util/maker/maker_list";
import maker from "../src/util/maker/maker.json";
import chains from "../src/config/testnet.json";

const makerList: any[] = [];
const newMakerList = mk.makerList;

describe('maker', () => {
    it('config compare', async () => {
        console.log('old maker count', makerList.length);
        console.log('new maker count', newMakerList.length);
        for (const maker of newMakerList) {
            if (!makerList.find(item =>
                item.makerAddress.toLowerCase() === maker.makerAddress.toLowerCase() &&
                ((item.c1ID === maker.c1ID && item.c2ID === maker.c2ID &&
                        item.c1Name === maker.c1Name && item.c2Name === maker.c2Name &&
                        item.tName === maker.tName &&
                        item.t1Address.toLowerCase() === maker.t1Address.toLowerCase() && item.t2Address.toLowerCase() === maker.t2Address.toLowerCase() &&
                        item.c1GasFee === maker.c1GasFee && item.c2GasFee === maker.c2GasFee &&
                        item.c1TradingFee === maker.c1TradingFee && item.c2TradingFee === maker.c2TradingFee)
                    ||
                    (item.c1ID === maker.c2ID && item.c2ID === maker.c1ID &&
                        item.c1Name === maker.c2Name && item.c2Name === maker.c1Name &&
                        item.tName === maker.tName &&
                        item.t1Address.toLowerCase() === maker.t2Address.toLowerCase() && item.t2Address.toLowerCase() === maker.t1Address.toLowerCase() &&
                        item.c1GasFee === maker.c2GasFee && item.c2GasFee === maker.c1GasFee &&
                        item.c1TradingFee === maker.c2TradingFee && item.c2TradingFee === maker.c1TradingFee)
                ))) {
                console.log(`can't find newMaker`, maker);
            }
        }

        for (const maker of makerList) {
            if (!newMakerList.find(item =>
                item.makerAddress.toLowerCase() === maker.makerAddress.toLowerCase() &&
                ((item.c1ID === maker.c1ID && item.c2ID === maker.c2ID &&
                        item.c1Name === maker.c1Name && item.c2Name === maker.c2Name &&
                        item.tName === maker.tName &&
                        item.t1Address.toLowerCase() === maker.t1Address.toLowerCase() && item.t2Address.toLowerCase() === maker.t2Address.toLowerCase() &&
                        item.c1GasFee === maker.c1GasFee && item.c2GasFee === maker.c2GasFee &&
                        item.c1TradingFee === maker.c1TradingFee && item.c2TradingFee === maker.c2TradingFee)
                    ||
                    (item.c1ID === maker.c2ID && item.c2ID === maker.c1ID &&
                        item.c1Name === maker.c2Name && item.c2Name === maker.c1Name &&
                        item.tName === maker.tName &&
                        item.t1Address.toLowerCase() === maker.t2Address.toLowerCase() && item.t2Address.toLowerCase() === maker.t1Address.toLowerCase() &&
                        item.c1GasFee === maker.c2GasFee && item.c2GasFee === maker.c1GasFee &&
                        item.c1TradingFee === maker.c2TradingFee && item.c2TradingFee === maker.c1TradingFee)
                ))) {
                console.log(`can't find oldMaker`, maker);
            }
        }

        console.log('-------------------- end --------------------');

    });
    it('config group by maker', async () => {
        const makerList: any[] = maker;
        const chainList: any = chains;
        const v3MakerMap: any = {};
        const convertV3Maker = (makerData: IMakerDataCfg, chainIdPair, symbolPair) => {
            const makerAddress = makerData.makerAddress.toLowerCase();
            const v3MakerData = JSON.parse(JSON.stringify(makerData));
            delete v3MakerData.makerAddress;
            v3MakerMap[makerAddress] = v3MakerMap[makerAddress] || {};
            v3MakerMap[makerAddress][chainIdPair] = v3MakerMap[makerAddress][chainIdPair] || {};
            v3MakerMap[makerAddress][chainIdPair][symbolPair] = v3MakerData;
        };
        for (const makerMap of makerList) {
            for (const chainIdPair in makerMap) {
                if (!makerMap.hasOwnProperty(chainIdPair)) continue;
                const symbolPairMap = makerMap[chainIdPair];
                const [fromChainId, toChainId] = chainIdPair.split("-");
                const c1Chain = chainList.find(item => +item.internalId === +fromChainId);
                const c2Chain = chainList.find(item => +item.internalId === +toChainId);
                if (!c1Chain) {
                    continue;
                }
                if (!c2Chain) {
                    continue;
                }
                for (const symbolPair in symbolPairMap) {
                    if (!symbolPairMap.hasOwnProperty(symbolPair)) continue;
                    const makerData: IMakerDataCfg = symbolPairMap[symbolPair];
                    // handle v3maker
                    convertV3Maker(makerData, chainIdPair, symbolPair);
                }
            }
        }


        console.log(Object.keys(v3MakerMap));
        console.log('-------------------- end --------------------');
    });
});