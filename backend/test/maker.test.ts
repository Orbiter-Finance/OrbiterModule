import { makerList as makerList } from "../src/util/maker/maker_list_80c";
import { makerList as newMakerList } from "../src/util/maker/maker_list";

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
});