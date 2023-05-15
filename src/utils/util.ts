import config from '../config/index'
import { $env } from "@/env";

export default {
  starknetFormat(address) {
    if (!address) {
      return "";
    }
    if (address.length < 66) {
      const end = address.substring(2, address.length);
      const add = 64 - end.length;
      let addStr = '';
      for (let i = 0; i < add; i++) {
        addStr += "0";
      }
      address = '0x' + addStr + end;
    }
    return address.toLowerCase();
  },
  getChainInfoByChainId(chainId) {
    const configChainList: any[] = config.chainConfig;
    const info = configChainList.find(item => +item.internalId === +chainId);
    if (!info) return null;
    return JSON.parse(JSON.stringify(info));
  },
  isSupportXVMContract(fromChainId) {
    const chainInfo = this.getChainInfoByChainId(fromChainId);
    return chainInfo?.xvmList && chainInfo.xvmList.length;
  },
  isEthTokenAddress(chainId, tokenAddress) {
    const chainInfo = this.getChainInfoByChainId(chainId);
    if (chainInfo) {
      // main coin
      if (this.equalsIgnoreCase(chainInfo.nativeCurrency?.address, tokenAddress)) {
        return true;
      }
      // ERC20
      if (chainInfo.tokens.find(item => this.equalsIgnoreCase(item.address, tokenAddress))) {
        return false;
      }
    }
    return /^0x0+$/i.test(tokenAddress);
  },
  equalsIgnoreCase(value1: string, value2: string): boolean {
    if (typeof value1 !== 'string' || typeof value2 !== 'string') {
      return false;
    }
    return value1.toUpperCase() == value2.toUpperCase();
  },
  equalsMakerAddress(value1: string, value2: string) {
    if (typeof value1 !== 'string' || typeof value2 !== 'string') {
      return false;
    }
    return this.starknetFormat(value1) === this.starknetFormat(value2) ||
        this.starknetFormat($env.crossAddressTransferMap[value1.toLocaleLowerCase()]) === this.starknetFormat(value2.toLocaleLowerCase()) ||
        this.starknetFormat($env.crossAddressTransferMap[value2.toLocaleLowerCase()]) === this.starknetFormat(value1.toLocaleLowerCase());
  },
  chainName(chainId) {
    return this.getChainInfoByChainId(chainId)?.name || 'unknown';
  },
  toHex(num) {
    return '0x' + num.toString(16)
  },
  transferTimeStampToTime(timestamp) {
    if (!timestamp) {
      return timestamp
    }
    if (timestamp.toString().length === 10) {
      timestamp = timestamp * 1000
    }
    const date = new Date(timestamp)
    const Y = date.getFullYear() + '-'
    const M =
      (date.getMonth() + 1 < 10
        ? '0' + (date.getMonth() + 1)
        : date.getMonth() + 1) + '-'
    const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
    const h =
      (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    const m =
      (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
      ':'
    const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    const result = Y + M + D + h + m + s
    return result
  },
  shortAddress(address) {
    if (address && address.length > 5) {
      const subStr1 = address.substr(0, 4)
      const subStr2 = address.substr(address.length - 4, 4)
      return subStr1 + '...' + subStr2
    }
    return ''
  },
}
