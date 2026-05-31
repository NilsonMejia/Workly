import { createRouter, createWebHistory } from 'vue-router'
import PaisesView from '../views/PaisesView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/paises',
      name: 'paises',
      component: PaisesView,
      meta: { requiresAuth: true } 
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login'
    }
  ]
})

// Guardián de Navegación (Autorización)
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
