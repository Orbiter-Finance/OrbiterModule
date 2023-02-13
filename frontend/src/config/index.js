import testnet from './testnet.json'
import mainnet from './mainnet.json'

export const isDev = () => process.env.VUE_APP_ENV === 'development';

const chainConfig = [...isDev() ? testnet : mainnet].map(item => {
  if (process.env[`VUE_APP_CHAIN_API_KEY_${ item.internalId }`]) {
    item.api = item.api || {};
    item.api.key = process.env[`VUE_APP_CHAIN_API_KEY_${ item.internalId }`];
  }
  return item;
});

console.log('VUE_APP_ENV', process.env.VUE_APP_ENV, chainConfig);

export default { chainConfig };
