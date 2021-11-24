import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cliente',
    name: 'Cliente',
    component: ()=>import('../views/Cliente.vue')
  },
 {
    path: '/cpu',
    name: 'CPU',
    component: ()=>import('../views/CPU.vue')
  },
  {
    path: '/drive',
    name: 'Drive',
    component: ()=>import('../views/Drive.vue')
  },
  {
    path: '/memoria',
    name: 'Memoria',
    component: ()=>import('../views/Memoria.vue')
  },
  {
    path: '/netstat',
    name: 'Netstat',
    component: ()=>import('../views/Netstat.vue')
  },
  {
    path: '/os',
    name: 'OS',
    component: ()=>import('../views/OS.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
