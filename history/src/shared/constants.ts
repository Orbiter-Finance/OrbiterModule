import { isDev } from './env';

export const oldBackendDomain = `http://${isDev() ? 'rinkeby' : 'iris'}_dashboard.orbiter.finance:3002`
export const oldGlobalDataApi = `${oldBackendDomain}/global`
export const orbiterMakerlistApi = 'https://orbiter-makerlist.s3.ap-northeast-1.amazonaws.com'
