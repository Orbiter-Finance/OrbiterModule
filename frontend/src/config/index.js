import testnet from './testnet.json'
import mainnet from './mainnet.json'

const chainConfig = [...process.env.NODE_ENV !== 'production' ? testnet : mainnet].map(item => {
  if (process.env[`VUE_APP_CHAIN_API_KEY_${ item.internalId }`]) {
    item.api = item.api || {};
    item.api.key = process.env[`VUE_APP_CHAIN_API_KEY_${ item.internalId }`];
  }
  return item;
});

console.log('NODE_ENV', process.env.NODE_ENV);

export default { chainConfig };
