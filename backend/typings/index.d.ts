import { Restful } from '../src/util/restful'


declare module 'koa' {
  interface DefaultContext {
    restful: Restful
  }
}
