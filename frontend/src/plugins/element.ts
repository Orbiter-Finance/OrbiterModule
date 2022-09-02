import ElementPlus from 'element-plus'
import '../element-variables.scss'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
import { App } from '@vue/runtime-core'

export default (app: App) => {
  app.use(ElementPlus) //, { locale }
}
