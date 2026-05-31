import { createRouter, createWebHistory } from 'vue-router'

import PaginaInicial from '../views/public/paginainicial.vue'
import Login from '../views/public/login.vue'
import Registro from '../views/public/registro.vue'
import SesionDashboard from '../views/public/sesiondashboard.vue'
import VerificacionPendiente from '../views/public/verficacion-pendiente.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'inicio',
      component: PaginaInicial
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registro',
      name: 'registro',
      component: Registro
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: SesionDashboard
    },
    {
      path: '/verificacion-pendiente',
      name: 'verificacion',
      component: VerificacionPendiente
    },
    {
      path: '/views/public/paginainicial/index.html',
      redirect: '/'
    },
    {
      path: '/views/public/login/index.html',
      redirect: to => ({ path: '/login', query: to.query })
    },
    {
      path: '/views/public/registro/index.html',
      redirect: '/registro'
    },
    {
      path: '/views/public/verificacion-pendiente/index.html',
      redirect: to => ({ path: '/verificacion-pendiente', query: to.query })
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
