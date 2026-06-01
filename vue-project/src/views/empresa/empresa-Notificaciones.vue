<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-custom py-3">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand text-white fw-bold fs-3 d-flex align-items-center gap-2" href="/empresa/principal">
          <i class="bi bi-briefcase-fill"></i>
          <span>Workly</span>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
            <a href="/empresa/principal" class="nav-link-custom">Dashboard</a>
            <a href="/empresa/publicar-vacante" class="nav-link-custom">Publicar</a>
            <a href="/empresa/mis-vacantes" class="nav-link-custom">Vacantes</a>
            <a href="/empresa/postulaciones" class="nav-link-custom">Postulaciones</a>
            <a href="/empresa/foro" class="nav-link-custom">Foro</a>
          </div>
          <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <a href="/empresa/notificaciones" class="text-white position-relative text-decoration-none">
              <i class="bi bi-bell-fill fs-4"></i>
              <span class="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
            </a>
            <a href="/empresa/perfil" class="text-white text-decoration-none">
              <i class="bi bi-building fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-4 py-lg-5">
      <div class="container px-4 px-lg-5">
        <!-- Hero / Metric cards -->
        <section class="surface-card hero-card p-4 p-lg-5 mb-4">
          <div class="row g-4 align-items-center position-relative">
            <div class="col-12 col-xl-7">
              <span class="badge rounded-pill text-bg-light text-primary fw-semibold mb-3">Centro de alertas</span>
              <h1 class="display-6 fw-bold mb-2">Notificaciones listas para accion</h1>
              <p class="mb-0 text-white-50">Controla nuevas postulaciones, cambios del proceso y avisos importantes desde un solo panel.</p>
            </div>
            <div class="col-12 col-xl-5">
              <div class="row g-3">
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Sin leer</div>
                    <div class="fs-3 fw-bold">{{ resumen.no_leidas || 0 }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Total</div>
                    <div class="fs-3 fw-bold">{{ resumen.total || 0 }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Postulaciones</div>
                    <div class="fs-5 fw-bold">{{ resumen.postulaciones || 0 }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Sistema</div>
                    <div class="fs-5 fw-bold">{{ resumen.sistema || 0 }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="surface-card p-4 p-lg-5">
          <div class="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">
            <div>
              <h2 class="h3 fw-bold mb-1">Bandeja de empresa</h2>
              <p class="text-muted mb-0">Filtra rapido y mantente al dia con cada candidato y movimiento.</p>
            </div>
            <button class="btn btn-primary rounded-pill px-4" @click="marcarTodasLeidas">
              <i class="bi bi-check2-all me-2"></i>Marcar todas como leidas
            </button>
          </div>

          <div v-if="alertMessage" class="mb-3">
            <div :class="`alert alert-${alertType} alert-dismissible fade show rounded-4 shadow-sm`" role="alert">
              {{ alertMessage }}
              <button type="button" class="btn-close" @click="alertMessage = ''"></button>
            </div>
          </div>

          <div class="row g-3 align-items-end mb-4">
            <div class="col-12 col-lg-5">
              <label class="form-label fw-semibold">Buscar</label>
              <input type="search" class="form-control form-control-lg rounded-4" placeholder="Titulo o mensaje" v-model="filtros.search" @keydown.enter="cargarNotificaciones">
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <label class="form-label fw-semibold">Tipo</label>
              <select class="form-select form-select-lg rounded-4" v-model="filtros.tipo">
                <option value="">Todas</option>
                <option value="postulacion">Postulaciones</option>
                <option value="estado">Estados</option>
                <option value="sistema">Sistema</option>
                <option value="comentario">Comentarios</option>
              </select>
            </div>
            <div class="col-12 col-md-6 col-lg-2">
              <label class="form-label fw-semibold">Estado</label>
              <select class="form-select form-select-lg rounded-4" v-model="filtros.leida">
                <option value="">Todas</option>
                <option value="0">No leidas</option>
                <option value="1">Leidas</option>
              </select>
            </div>
            <div class="col-12 col-lg-2 d-grid">
              <button class="btn btn-outline-primary btn-lg rounded-4" @click="cargarNotificaciones">
                <i class="bi bi-funnel me-2"></i>Filtrar
              </button>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-12 col-xl-8">
              <div class="d-grid gap-3">
                <div v-if="notificaciones.length === 0" class="empty-state text-center p-5 rounded-4">
                  <div class="empty-state-icon mx-auto mb-3"><i class="bi bi-bell-slash fs-2"></i></div>
                  <h3 class="h5 fw-bold mb-2">No hay notificaciones para mostrar</h3>
                  <p class="text-muted mb-0">Prueba otro filtro o espera nuevas acciones en tus vacantes.</p>
                </div>
                <article v-for="n in notificaciones" :key="n.id_notificacion" class="notification-card" :class="{ 'is-unread': n.leida === 0 }">
                  <div class="d-flex gap-3">
                    <div class="notification-icon flex-shrink-0"><i :class="iconoPorTipo(n.tipo_notificacion)"></i></div>
                    <div class="flex-grow-1">
                      <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
                        <div>
                          <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                            <h3 class="h6 fw-bold mb-0">{{ n.titulo }}</h3>
                            <span class="badge rounded-pill text-bg-light border text-uppercase">{{ tipoLabel(n.tipo_notificacion) }}</span>
                            <span v-if="n.leida === 0" class="badge rounded-pill text-bg-primary">Nuevo</span>
                          </div>
                          <p class="text-muted mb-0">{{ n.mensaje }}</p>
                        </div>
                        <small class="text-muted text-lg-end">{{ formatDate(n.fecha_creacion) }}</small>
                      </div>
                      <div class="d-flex flex-wrap gap-2 mt-3">
                        <button type="button" class="btn btn-sm" :class="n.leida === 0 ? 'btn-outline-primary' : 'btn-outline-secondary'" rounded-pill @click="toggleLeida(n.id_notificacion, n.leida)">
                          <i :class="n.leida === 0 ? 'bi-check2' : 'bi-envelope'" class="me-1"></i>
                          {{ n.leida === 0 ? 'Marcar leida' : 'Marcar no leida' }}
                        </button>
                        <a v-if="n.enlace" class="btn btn-sm btn-light rounded-pill border" :href="resolverEnlace(n.enlace)">
                          <i class="bi bi-box-arrow-up-right me-1"></i>Ver detalle
                        </a>
                        <button type="button" class="btn btn-sm btn-outline-danger rounded-pill" @click="eliminarNotificacion(n.id_notificacion)">
                          <i class="bi bi-trash3 me-1"></i>Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div class="col-12 col-xl-4">
              <div class="summary-card p-4 mb-3">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="summary-icon"><i class="bi bi-person-workspace"></i></div>
                  <div><h3 class="h5 fw-bold mb-0">Postulaciones</h3><p class="text-muted small mb-0">Lo que mas necesita seguimiento</p></div>
                </div>
                <div class="d-flex justify-content-between"><span class="text-muted">Cambios de estado</span><strong>{{ resumen.cambios_estado || 0 }}</strong></div>
              </div>

              <div class="summary-card p-4 mb-3">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="summary-icon"><i class="bi bi-lightning-charge-fill"></i></div>
                  <div><h3 class="h5 fw-bold mb-0">Acciones rapidas</h3><p class="text-muted small mb-0">Atajos para seguir trabajando</p></div>
                </div>
                <div class="d-grid gap-2">
                  <a href="/empresa/postulaciones" class="btn btn-light border rounded-4 text-start"><i class="bi bi-people me-2"></i>Revisar candidatos</a>
                  <a href="/empresa/mis-vacantes" class="btn btn-light border rounded-4 text-start"><i class="bi bi-briefcase me-2"></i>Ver vacantes activas</a>
                  <a href="/empresa/publicar-vacante" class="btn btn-light border rounded-4 text-start"><i class="bi bi-plus-circle me-2"></i>Publicar nueva vacante</a>
                </div>
              </div>

              <div class="summary-card p-4">
                <h3 class="h5 fw-bold mb-3">Buenas practicas</h3>
                <ul class="list-unstyled text-muted small mb-0 d-grid gap-2">
                  <li><i class="bi bi-check2-circle text-primary me-2"></i>Marca como leidas las alertas resueltas.</li>
                  <li><i class="bi bi-check2-circle text-primary me-2"></i>Entra rapido al detalle de cada candidato.</li>
                  <li><i class="bi bi-check2-circle text-primary me-2"></i>Mantiene el proceso claro para el equipo.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="footer-custom py-4 mt-auto text-center text-white-50">
      <div class="container"><span>Workly 2026 | Gestiona tu reclutamiento con orden y velocidad</span></div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken } from '../../services/api.js'
import { requireAuth } from '../../services/api.js'

onBeforeMount(() => {
  requireAuth(['empresa'])
})

// Estado
const notificaciones = ref([])
const resumen = reactive({
  no_leidas: 0,
  total: 0,
  postulaciones: 0,
  sistema: 0,
  cambios_estado: 0
})
const filtros = reactive({
  search: '',
  tipo: '',
  leida: ''
})
const alertMessage = ref('')
const alertType = ref('danger')

// Mapeo de iconos
const iconoPorTipo = (tipo) => {
  const map = {
    postulacion: 'bi-person-workspace',
    estado: 'bi-arrow-repeat',
    sistema: 'bi-bell-fill',
    comentario: 'bi-chat-left-text-fill'
  }
  return map[tipo] || 'bi-bell-fill'
}

const tipoLabel = (tipo) => {
  const map = {
    postulacion: 'Postulacion',
    estado: 'Estado',
    sistema: 'Sistema',
    comentario: 'Comentario'
  }
  return map[tipo] || 'Sistema'
}

const formatDate = (value) => {
  if (!value) return 'Reciente'
  const d = new Date(value)
  return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleString('es-SV', { dateStyle: 'medium', timeStyle: 'short' })
}

const resolverEnlace = (enlace) => {
  if (!enlace) return '#'
  try { return new URL(enlace, API_URL).toString() } catch { return enlace }
}

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
})

const showAlert = (msg, type = 'danger') => {
  alertMessage.value = msg
  alertType.value = type
  setTimeout(() => { alertMessage.value = '' }, 5000)
}

const cargarResumen = async () => {
  const res = await fetch(`${API_URL}/notificaciones/resumen`, { headers: authHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.mensaje || 'Error al cargar resumen')
  Object.assign(resumen, data)
}

const cargarNotificaciones = async () => {
  const params = new URLSearchParams()
  if (filtros.tipo) params.set('tipo_notificacion', filtros.tipo)
  if (filtros.leida !== '') params.set('leida', filtros.leida)
  if (filtros.search.trim()) params.set('search', filtros.search.trim())
  const url = `${API_URL}/notificaciones${params.toString() ? `?${params}` : ''}`
  const res = await fetch(url, { headers: authHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.mensaje || 'Error al cargar notificaciones')
  notificaciones.value = data
}

const toggleLeida = async (id, leida) => {
  const path = leida === 0 ? 'leer' : 'no-leida'
  const res = await fetch(`${API_URL}/notificaciones/${id}/${path}`, { method: 'PUT', headers: authHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.mensaje || 'Error al actualizar')
  showAlert(data.mensaje, 'success')
  await cargarResumen()
  await cargarNotificaciones()
}

const eliminarNotificacion = async (id) => {
  const res = await fetch(`${API_URL}/notificaciones/${id}`, { method: 'DELETE', headers: authHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.mensaje || 'Error al eliminar')
  showAlert(data.mensaje, 'success')
  await cargarResumen()
  await cargarNotificaciones()
}

const marcarTodasLeidas = async () => {
  const res = await fetch(`${API_URL}/notificaciones/marcar-todas/leidas`, { method: 'PUT', headers: authHeaders() })
  const data = await res.json()
  if (!res.ok) throw new Error(data.mensaje || 'Error al marcar todas')
  showAlert(data.mensaje, 'success')
  await cargarResumen()
  await cargarNotificaciones()
}

onMounted(async () => {
  try {
    await cargarResumen()
    await cargarNotificaciones()
  } catch (err) {
    showAlert(err.message)
  }
})
</script>

<style scoped>
:root {
  --nav-bg: #011671;
  --page-bg: linear-gradient(180deg, #edf3ff 0%, #f7faff 100%);
  --primary-deep: #3f51b5;
  --card-shadow: 0 24px 45px -18px rgba(1, 22, 113, 0.18);
}
body {
  font-family: "Inter", sans-serif;
  background: var(--page-bg);
  color: #182033;
}
.navbar-custom,
.footer-custom {
  background: var(--nav-bg);
}
.nav-link-custom {
  color: #fff;
  text-decoration: none;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  transition: 0.2s ease;
}
.nav-link-custom:hover,
.nav-link-custom.active {
  background: rgba(255, 255, 255, 0.12);
}
.surface-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 30px;
  box-shadow: var(--card-shadow);
}
.hero-card {
  background: linear-gradient(140deg, #0c1d85 0%, #465bca 55%, #8da0ff 100%);
  color: #fff;
  overflow: hidden;
  position: relative;
}
.hero-card::after {
  content: "";
  position: absolute;
  inset: auto -30px -60px auto;
  width: 220px;
  height: 220px;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 50%;
}
.metric-pill {
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  padding: 1rem 1.1rem;
  backdrop-filter: blur(10px);
}
.summary-card {
  border-radius: 24px;
  border: 1px solid #e6ebf5;
  background: #fff;
  box-shadow: 0 18px 30px -24px rgba(15, 23, 42, 0.35);
}
.summary-icon {
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: #eef2ff;
  color: var(--primary-deep);
}
.notification-card {
  background: #fff;
  border-radius: 24px;
  border: 1px solid #e7edf7;
  padding: 1.4rem;
  box-shadow: 0 20px 32px -26px rgba(15, 23, 42, 0.45);
  transition: 0.2s ease;
}
.notification-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 38px -24px rgba(1, 22, 113, 0.28);
}
.notification-card.is-unread {
  border-left: 6px solid var(--primary-deep);
  background: linear-gradient(90deg, #ffffff 0%, #f8faff 100%);
}
.notification-icon {
  width: 54px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: #eef2ff;
  color: var(--primary-deep);
  font-size: 1.25rem;
}
.empty-state {
  background: #f8fafc;
  border: 1px dashed #cfd8ea;
}
.empty-state-icon {
  width: 68px;
  height: 68px;
  display: grid;
  place-items: center;
  border-radius: 22px;
  background: #eef2ff;
  color: var(--primary-deep);
}
.notification-badge {
  min-width: 1.4rem;
}
</style>