import chains from "./chain.json";
import { IMakerDataCfg } from "../src/util/interface";
import { v2MakerList } from "./makerList";

describe('maker', () => {
    it('config group by maker', async () => {
        const makerList: any[] = v2MakerList;
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