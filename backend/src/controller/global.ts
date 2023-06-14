import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { getExchangeRates } from '../service/coinbase'
import { getMakerAddresses } from '../service/maker'

export default function (router: KoaRouter<DefaultState, Context>) {
  router.get('global', async ({ restful }: any) => {
    const makerAddresses = await getMakerAddresses()
    const exchangeRates = (await getExchangeRates()) || {}
    makerAddresses.filter(item => item.toLowerCase() !== "0xE4eDb277e41dc89aB076a1F049f4a3EfA700bCE8".toLowerCase() &&
        item.toLowerCase() !== "0x0a88BC5c32b684D467b43C06D9e0899EfEAF59Df".toLowerCase());
    restful.json({ makerAddresses, exchangeRates });
  })

  router.get('global_all', async ({ restful }: any) => {
    const makerAddresses = await getMakerAddresses()
    const exchangeRates = (await getExchangeRates()) || {}
    restful.json({ makerAddresses, exchangeRates })
  })
}
