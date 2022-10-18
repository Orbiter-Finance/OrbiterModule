import { createApp } from 'vue'
import App from './App.vue'
import './main.scss'
import installElementPlus from './plugins/element'
import installVxeTale from './plugins/vxe-table'
import router from './router'
import store from './store'
import urql from '@urql/vue';
import SvgIcon from './components/SvgIcon/SvgIcon.vue'
import Web3 from 'web3'
import { contract_obj, defaultRpc } from './contracts'
// Vue.component('svg-icon', SvgIcon)

// import './icons'
// beforeEach
router.beforeEach(async (to, from, next) => {
    console.log(to, from)
    if (to.fullPath == '/makerNode' && to.matched.length == 0) {
        router.addRoute({
            path: '/makerNode',
            name: 'MakerNode',
            component: () => import('./views/MakerNode/MakerNode.vue'),
        })
        next({path: '/makerNode'})
    } 
    if (to.matched.length !== 0) {
        next()
    } else {
        next({path: '/'})
    }
})
const app = createApp(App)
app.config.globalProperties.$web3 = new Web3(defaultRpc())
app.use(store).use(router)
app.use(urql, {
    url: process.env.VUE_APP_GRAPHQL_URL,
});
installElementPlus(app)
installVxeTale(app)
app.component('svg-icon', SvgIcon)

app.provide('$web3', app.config.globalProperties.$web3)
const req = require.context('./icons/svg', false, /\.svg$/)
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)

const req2 = require.context('./icons/v2', false, /\.svg$/)
requireAll(req2)

const req3 = require.context('./icons/tokenlogos', false, /\.svg$/)
requireAll(req3)

app.mount('#app')
