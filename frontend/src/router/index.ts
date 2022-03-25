import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Maker from '../views/Maker.vue'
import Setting from '../views/Setting/index.vue'
import Config from '../views/config/index.vue'
import MakerHistory from '../views/MakerHistory.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/maker',
    name: 'Maker',
    component: Maker,
    meta: { navShow: true },
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: { navShow: true },
  },
  {
    path: '/config',
    name: 'Config',
    component: Config,
    meta: { navShow: true },
  },
  {
    path: '/maker/history',
    name: 'MakerHistory',
    component: MakerHistory,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
