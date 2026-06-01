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
import UsuarioPrincipal from '../views/usuario/principal.vue'
import UsuarioBuscarEmpleo from '../views/usuario/buscarempleo.vue'
import UsuarioDetalleEmpleo from '../views/usuario/detalleempleo.vue'
import UsuarioMiPerfil from '../views/usuario/miperfil.vue'
import UsuarioNotificaciones from '../views/usuario/notificaciones.vue'
import UsuarioRecursos from '../views/usuario/recursos.vue'
import UsuarioValoracionesEmpresa from '../views/usuario/valoracionesempresa.vue'
import EmpresaPrincipal from '../views/empresa/empresa-Principal.vue'
import EmpresaMisVacantes from '../views/empresa/empresa-MisVacantes.vue'
import EmpresaPublicarVacante from '../views/empresa/empresa-PublicarVacante.vue'
import EmpresaPostulaciones from '../views/empresa/empresa-Postulaciones.vue'
import EmpresaDetallePostulacion from '../views/empresa/empresa-DetallePostulacion.vue'
import EmpresaPerfil from '../views/empresa/empresa-Perfil.vue'
import EmpresaNotificaciones from '../views/empresa/empresa-Notificaciones.vue'
import EmpresaRecursos from '../views/empresa/empresa-Recursos.vue'
import EmpresaForo from '../views/empresa/empresa-Foro.vue'
import EmpresaResenaEmpresa from '../views/empresa/empresa-ResenaEmpresa.vue'

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
      path: '/usuario',
      redirect: '/usuario/principal'
    },
    {
      path: '/usuario/principal',
      name: 'usuario-principal',
      component: UsuarioPrincipal
    },
    {
      path: '/usuario/buscar-empleo',
      name: 'usuario-buscar-empleo',
      component: UsuarioBuscarEmpleo
    },
    {
      path: '/usuario/detalle-empleo',
      name: 'usuario-detalle-empleo',
      component: UsuarioDetalleEmpleo
    },
    {
      path: '/usuario/mi-perfil',
      name: 'usuario-mi-perfil',
      component: UsuarioMiPerfil
    },
    {
      path: '/usuario/notificaciones',
      name: 'usuario-notificaciones',
      component: UsuarioNotificaciones
    },
    {
      path: '/usuario/recursos',
      name: 'usuario-recursos',
      component: UsuarioRecursos
    },
    {
      path: '/usuario/valoraciones-empresa',
      name: 'usuario-valoraciones-empresa',
      component: UsuarioValoracionesEmpresa
    },
    {
      path: '/empresa',
      redirect: '/empresa/principal'
    },
    {
      path: '/empresa/principal',
      name: 'empresa-principal',
      component: EmpresaPrincipal
    },
    {
      path: '/empresa/mis-vacantes',
      name: 'empresa-mis-vacantes',
      component: EmpresaMisVacantes
    },
    {
      path: '/empresa/publicar-vacante',
      name: 'empresa-publicar-vacante',
      component: EmpresaPublicarVacante
    },
    {
      path: '/empresa/postulaciones',
      name: 'empresa-postulaciones',
      component: EmpresaPostulaciones
    },
    {
      path: '/empresa/detalle-postulacion',
      name: 'empresa-detalle-postulacion',
      component: EmpresaDetallePostulacion
    },
    {
      path: '/empresa/perfil',
      name: 'empresa-perfil',
      component: EmpresaPerfil
    },
    {
      path: '/empresa/notificaciones',
      name: 'empresa-notificaciones',
      component: EmpresaNotificaciones
    },
    {
      path: '/empresa/recursos',
      name: 'empresa-recursos',
      component: EmpresaRecursos
    },
    {
      path: '/empresa/foro',
      name: 'empresa-foro',
      component: EmpresaForo
    },
    {
      path: '/empresa/resena-empresa',
      name: 'empresa-resena-empresa',
      component: EmpresaResenaEmpresa
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
      path: '/views/usuario/principal/index.html',
      redirect: '/usuario/principal'
    },
    {
      path: '/views/usuario/buscarempleo/index.html',
      redirect: to => ({ path: '/usuario/buscar-empleo', query: to.query })
    },
    {
      path: '/views/usuario/detalleempleo/index.html',
      redirect: to => ({ path: '/usuario/detalle-empleo', query: to.query })
    },
    {
      path: '/views/usuario/miperfil/index.html',
      redirect: '/usuario/mi-perfil'
    },
    {
      path: '/views/usuario/notificaciones/index.html',
      redirect: '/usuario/notificaciones'
    },
    {
      path: '/views/usuario/recursos/index.html',
      redirect: '/usuario/recursos'
    },
    {
      path: '/views/usuario/valoracionempresa/index.html',
      redirect: to => ({ path: '/usuario/valoraciones-empresa', query: to.query })
    },
    {
      path: '/views/usuario/valoracionesempresa/index.html',
      redirect: to => ({ path: '/usuario/valoraciones-empresa', query: to.query })
    },
    {
      path: '/views/empresa/principal/index.html',
      redirect: '/empresa/principal'
    },
    {
      path: '/views/empresa/misvacantes/index.html',
      redirect: '/empresa/mis-vacantes'
    },
    {
      path: '/views/empresa/publicarvacante/index.html',
      redirect: '/empresa/publicar-vacante'
    },
    {
      path: '/views/empresa/postulaciones/index.html',
      redirect: '/empresa/postulaciones'
    },
    {
      path: '/views/empresa/detallepostulacion/index.html',
      redirect: to => ({ path: '/empresa/detalle-postulacion', query: to.query })
    },
    {
      path: '/views/empresa/perfil/index.html',
      redirect: '/empresa/perfil'
    },
    {
      path: '/views/empresa/notificaciones/index.html',
      redirect: '/empresa/notificaciones'
    },
    {
      path: '/views/empresa/recursos/index.html',
      redirect: '/empresa/recursos'
    },
    {
      path: '/views/empresa/foro/index.html',
      redirect: '/empresa/foro'
    },
    {
      path: '/views/empresa/resenaempresa/index.html',
      redirect: '/empresa/resena-empresa'
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

export default router
