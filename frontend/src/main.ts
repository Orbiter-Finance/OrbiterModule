import { Chart, registerables } from 'chart.js'
import { createApp } from 'vue'
import App from './App.vue'
import './main.scss'
import installElementPlus from './plugins/element'
import installVxeTale from './plugins/vxe-table'
import router from './router'
import store from './store'

// Chart register
Chart.register(...registerables)

const app = createApp(App).use(store).use(router)
installElementPlus(app)
installVxeTale(app)
app.mount('#app')
