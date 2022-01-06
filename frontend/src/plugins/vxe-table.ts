import { App } from '@vue/runtime-core'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import 'xe-utils'

export default (app: App) => {
  VXETable.setup({
    version: 1,
    zIndex: 100,
    table: {
      autoResize: true
    }
  })
  
  app.use(VXETable)
}
