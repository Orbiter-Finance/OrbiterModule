import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Maker from '../views/Maker.vue'
import MakerHistory from '../views/MakerHistory.vue'
import Setting from '../views/Setting/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { navHide: true },
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
