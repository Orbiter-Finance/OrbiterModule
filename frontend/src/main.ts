import { createApp } from 'vue'
import App from './App.vue'
import './main.scss'
import installElementPlus from './plugins/element'
import installVxeTale from './plugins/vxe-table'
import router from './router'
import store from './store'

import SvgIcon from './components/SvgIcon/SvgIcon.vue'
// Vue.component('svg-icon', SvgIcon)


// import './icons'
// beforeEach
router.beforeEach((to, from, next) => {
    if (to.matched.length !== 0) {
        next()
    } else {
        next({path: '/'})
    }
})
const app = createApp(App).use(store).use(router)
installElementPlus(app)
installVxeTale(app)
app.component('svg-icon', SvgIcon)

const req = require.context('./icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)

const req2 = require.context('./icons/v2', false, /\.svg$/)
requireAll(req2)

const req3 = require.context('./icons/tokenlogos', false, /\.svg$/)
requireAll(req3)

app.mount('#app')
