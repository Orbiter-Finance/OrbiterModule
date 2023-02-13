import chain from './chain.json'

const chainConfig = [...chain].map(item => {
  if (process.env[`VUE_APP_CHAIN_API_KEY_${ item.internalId }`]) {
    item.api = item.api || {};
    item.api.key = process.env[`VUE_APP_CHAIN_API_KEY_${ item.internalId }`];
  }
  return item;
});

export default { chainConfig };
