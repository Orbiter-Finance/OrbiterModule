import { Context, DefaultState } from 'koa'
import KoaRouter from 'koa-router'
import { getMakerAddresses } from '../service/maker'

export default function (router: KoaRouter<DefaultState, Context>) {
  router.get('global', async ({ restful }) => {
    const makerAddresses = await getMakerAddresses()

    restful.json({ makerAddresses })
  })
}
