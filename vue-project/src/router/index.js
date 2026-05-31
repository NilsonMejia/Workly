import { createRouter, createWebHistory } from 'vue-router'

import PaginaInicial from '../views/public/paginainicial.vue'
import Login from '../views/public/login.vue'
import Registro from '../views/public/registro.vue'
import SesionDashboard from '../views/public/sesiondashboard.vue'
import VerificacionPendiente from '../views/public/verficacion-pendiente.vue'
import AdminPrincipal from '../views/admin/principal.vue'
import AdminGestionUsuarios from '../views/admin/gestionusuarios.vue'
import AdminGestionEmpresas from '../views/admin/gestionempresas.vue'
import AdminGestionVacantes from '../views/admin/gestionvacantes.vue'
import AdminEstadisticas from '../views/admin/estadisticas.vue'
import AdminModeracion from '../views/admin/moderacion.vue'

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
      path: '/admin',
      redirect: '/admin/principal'
    },
    {
      path: '/admin/principal',
      name: 'admin-principal',
      component: AdminPrincipal
    },
    {
      path: '/admin/usuarios',
      name: 'admin-usuarios',
      component: AdminGestionUsuarios
    },
    {
      path: '/admin/empresas',
      name: 'admin-empresas',
      component: AdminGestionEmpresas
    },
    {
      path: '/admin/vacantes',
      name: 'admin-vacantes',
      component: AdminGestionVacantes
    },
    {
      path: '/admin/estadisticas',
      name: 'admin-estadisticas',
      component: AdminEstadisticas
    },
    {
      path: '/admin/moderacion',
      name: 'admin-moderacion',
      component: AdminModeracion
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
      path: '/views/admin/principal/index.html',
      redirect: '/admin/principal'
    },
    {
      path: '/views/admin/gestionusuarios/index.html',
      redirect: '/admin/usuarios'
    },
    {
      path: '/views/admin/gestionempresas/index.html',
      redirect: '/admin/empresas'
    },
    {
      path: '/views/admin/gestionvacantes/index.html',
      redirect: '/admin/vacantes'
    },
    {
      path: '/views/admin/estadisticas/index.html',
      redirect: '/admin/estadisticas'
    },
    {
      path: '/views/admin/moderacion/index.html',
      redirect: '/admin/moderacion'
    },
    {
      path: '/admin/index.html',
      redirect: '/admin/principal'
    },
    {
      path: '/principal/index.html',
      redirect: '/admin/principal'
    },
    {
      path: '/gestionusuarios/index.html',
      redirect: '/admin/usuarios'
    },
    {
      path: '/gestionempresas/index.html',
      redirect: '/admin/empresas'
    },
    {
      path: '/gestionvacantes/index.html',
      redirect: '/admin/vacantes'
    },
    {
      path: '/estadisticas/index.html',
      redirect: '/admin/estadisticas'
    },
    {
      path: '/moderacion/index.html',
      redirect: '/admin/moderacion'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
