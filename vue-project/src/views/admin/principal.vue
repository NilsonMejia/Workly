<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg py-3 sticky-top">
      <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold text-white fs-3 d-flex align-items-center" href="/admin/principal">
          <i class="bi bi-briefcase-fill me-2"></i> Workly
        </a>
        <div class="collapse navbar-collapse" id="navContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/principal">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/usuarios">Usuarios</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/empresas">Empresas</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/vacantes">Vacantes</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/estadisticas">Estadísticas</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/moderacion">Moderación</a></li>
          </ul>
          <div class="profile-wrapper ms-lg-3 d-flex align-items-center gap-3">
            <a href="/admin/principal" class="text-white position-relative text-decoration-none">
              <i class="bi bi-bell-fill fs-4"></i>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
            </a>
            <i class="bi bi-person-circle fs-2 text-white" style="cursor: pointer;"></i>
          </div>
        </div>
      </div>
    </nav>

    <main class="container-fluid px-4 py-4">
      <div class="row g-4">
        <!-- Sidebar -->
        <aside class="col-12 col-lg-2">
          <div class="bento-card p-3 h-100">
            <h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">Menú Admin</h6>
            <div class="d-flex flex-column">
              <a href="/admin/principal" class="btn-menu-side active"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
              <a href="/admin/usuarios" class="btn-menu-side text-nowrap"><i class="bi bi-people-fill me-2"></i> Gestión de Usuarios</a>
              <a href="/admin/empresas" class="btn-menu-side text-nowrap"><i class="bi bi-building me-2"></i> Gestión de Empresas</a>
              <a href="/admin/vacantes" class="btn-menu-side text-nowrap"><i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes</a>
              <a href="/admin/estadisticas" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema</a>
              <a href="/admin/moderacion" class="btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> Moderación de Contenido</a>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="col-12 col-lg-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">Dashboard Administrativo</h4>
          </div>

          <!-- Alert Container -->
          <div v-if="alertMessage" class="mb-3">
            <div :class="`alert alert-${alertType} rounded-4`" role="alert">
              {{ alertMessage }}
            </div>
          </div>

          <!-- Stats Cards -->
          <div class="row g-3 mb-4">
            <div class="col-md-3">
              <div class="bento-card p-3 text-center">
                <h2 class="fw-bold mb-0">{{ metricas.total_usuarios ?? 0 }}</h2>
                <p class="mb-0 fw-semibold small">Usuarios registrados</p>
                <small class="text-success">Actualizado</small>
              </div>
            </div>
            <div class="col-md-3">
              <div class="bento-card p-3 text-center">
                <h2 class="fw-bold mb-0">{{ metricas.total_empresas ?? 0 }}</h2>
                <p class="mb-0 fw-semibold small">Empresas activas</p>
                <small class="text-success">Actualizado</small>
              </div>
            </div>
            <div class="col-md-3">
              <div class="bento-card p-3 text-center">
                <h2 class="fw-bold mb-0">{{ metricas.total_vacantes ?? 0 }}</h2>
                <p class="mb-0 fw-semibold small">Vacantes publicadas</p>
                <small class="text-success">Actualizado</small>
              </div>
            </div>
            <div class="col-md-3">
              <div class="bento-card p-3 text-center">
                <h2 class="fw-bold mb-0">{{ metricas.total_postulaciones ?? 0 }}</h2>
                <p class="mb-0 fw-semibold small">Postulaciones</p>
                <small class="text-muted">Actividad general</small>
              </div>
            </div>
          </div>

          <!-- Charts and Activity -->
          <div class="row g-4">
            <div class="col-lg-8">
              <!-- Chart Card -->
              <div class="bento-card p-4 mb-4">
                <h6 class="fw-bold mb-4">Crecimiento reciente</h6>
                <div v-if="loading" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
                <div v-else class="d-flex justify-content-around align-items-end" style="height: 180px;" id="chartDashboard">
                  <div class="text-center" v-for="item in chartData" :key="item.label">
                    <div class="bar mx-auto" :style="{ height: getBarHeight(item.value) + 'px' }"></div>
                    <span class="small mt-2 d-block text-muted">{{ item.label }}</span>
                    <strong class="small d-block">{{ item.value }}</strong>
                  </div>
                </div>
              </div>

              <!-- Recent Activity Card -->
              <div class="bento-card p-4">
                <h6 class="fw-bold mb-4"><i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente</h6>
                <div v-if="loading" class="vstack gap-3">
                  <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
                    Cargando actividad...
                  </div>
                </div>
                <div v-else class="vstack gap-3" id="actividadReciente">
                  <div v-if="actividadItems.length === 0" class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
                    No hay actividad disponible.
                  </div>
                  <div v-for="(item, index) in actividadItems" :key="index"
                    class="p-3 rounded-4 bg-light border-start border-4"
                    :class="{
                      'border-primary': index === 0,
                      'border-danger': index === 1,
                      'border-success': index === 2
                    }">
                    <div class="d-flex justify-content-between align-items-center">
                      <h6 class="fw-bold mb-1">{{ item.titulo }}</h6>
                      <small class="text-muted">{{ item.fecha }}</small>
                    </div>
                    <p class="small mb-0 text-muted">{{ item.detalle }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="vstack gap-4">
                <!-- Quick Access -->
                <div class="bento-card p-4">
                  <h6 class="fw-bold text-center mb-3">Accesos rápidos</h6>
                  <a class="btn-quick-access" href="/admin/usuarios">Usuarios</a>
                  <a class="btn-quick-access" href="/admin/empresas">Empresas</a>
                  <a class="btn-quick-access" href="/admin/vacantes">Vacantes</a>
                  <a class="btn-quick-access" href="/admin/moderacion">Moderación</a>
                </div>

                <!-- Operational Summary -->
                <div class="bento-card p-4">
                  <h6 class="fw-bold mb-3">Resumen operativo</h6>
                  <div class="d-flex justify-content-between mb-2 small">
                    <span>Últimos usuarios</span>
                    <strong>{{ ultimosUsuariosCount }}</strong>
                  </div>
                  <div class="d-flex justify-content-between mb-2 small">
                    <span>Últimas empresas</span>
                    <strong>{{ ultimasEmpresasCount }}</strong>
                  </div>
                  <div class="d-flex justify-content-between mb-2 small">
                    <span>Últimas vacantes</span>
                    <strong>{{ ultimasVacantesCount }}</strong>
                  </div>
                  <div class="d-flex justify-content-between small">
                    <span>Postulaciones</span>
                    <strong>{{ metricas.total_postulaciones ?? 0 }}</strong>
                  </div>
                </div>

                <!-- Latest Vacancies -->
                <div class="bento-card p-4">
                  <h6 class="fw-bold mb-3">Últimas vacantes</h6>
                  <div v-if="loading" class="small text-muted">Cargando...</div>
                  <div v-else id="ultimasVacantesBox">
                    <div v-if="!ultimasVacantes.length" class="small text-muted">No hay vacantes.</div>
                    <div v-for="vacante in ultimasVacantes" :key="vacante.id_vacante" class="mb-2">
                      <div class="fw-semibold">{{ vacante.titulo_puesto || 'Vacante' }}</div>
                      <div class="text-muted">{{ vacante.nombre_comercial || 'Empresa' }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="py-4 mt-5">
      <div class="container text-center">
        <div class="d-flex justify-content-center gap-4 small opacity-75">
          <a href="#" class="text-white text-decoration-none">Ayuda</a>
          <a href="#" class="text-white text-decoration-none">Privacidad</a>
          <span>Workly 2026</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { API_URL, clearSession, getToken, requireAuth } from '../../services/api.js'

// ========== Estado reactivo ==========
const loading = ref(true)
const alertMessage = ref('')
const alertType = ref('danger')
const metricas = ref({
  total_usuarios: 0,
  total_empresas: 0,
  total_vacantes: 0,
  total_postulaciones: 0
})
const ultimosUsuarios = ref([])
const ultimasEmpresas = ref([])
const ultimasVacantes = ref([])

// ========== Computed ==========
// Datos para el gráfico de barras (Usuarios, Empresas, Vacantes)
const chartData = computed(() => [
  { label: 'Usuarios', value: Number(metricas.value.total_usuarios || 0) },
  { label: 'Empresas', value: Number(metricas.value.total_empresas || 0) },
  { label: 'Vacantes', value: Number(metricas.value.total_vacantes || 0) }
])

// Altura máxima de la barra (130px) con mínimo 20px
const maxChartValue = computed(() => {
  const values = chartData.value.map(item => item.value)
  return Math.max(...values, 1)
})

const getBarHeight = (value) => {
  const height = (value / maxChartValue.value) * 130
  return Math.max(height, 20)
}

// Actividad reciente: 3 items a partir de los primeros elementos de cada categoría
const actividadItems = computed(() => {
  const items = []
  if (ultimosUsuarios.value?.[0]) {
    items.push({
      titulo: 'Nuevo usuario detectado',
      fecha: formatearFecha(ultimosUsuarios.value[0].fecha_registro),
      detalle: `${ultimosUsuarios.value[0].nombres || ''} ${ultimosUsuarios.value[0].apellidos || ''}`.trim() || 'Usuario'
    })
  }
  if (ultimasEmpresas.value?.[0]) {
    items.push({
      titulo: 'Nueva empresa detectada',
      fecha: formatearFecha(ultimasEmpresas.value[0].fecha_registro),
      detalle: ultimasEmpresas.value[0].nombre_comercial || 'Empresa'
    })
  }
  if (ultimasVacantes.value?.[0]) {
    items.push({
      titulo: 'Nueva vacante detectada',
      fecha: formatearFecha(ultimasVacantes.value[0].fecha_publicacion),
      detalle: ultimasVacantes.value[0].titulo_puesto || 'Vacante'
    })
  }
  return items
})

const ultimosUsuariosCount = computed(() => ultimosUsuarios.value?.length ?? 0)
const ultimasEmpresasCount = computed(() => ultimasEmpresas.value?.length ?? 0)
const ultimasVacantesCount = computed(() => ultimasVacantes.value?.length ?? 0)

// ========== Funciones auxiliares ==========
const showAlert = (message, type = 'danger') => {
  alertMessage.value = message
  alertType.value = type
  setTimeout(() => {
    alertMessage.value = ''
  }, 5000)
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'Reciente'
  const d = new Date(fecha)
  if (isNaN(d.getTime())) return 'Reciente'
  return d.toLocaleDateString('es-SV')
}

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
})

const redirectToLogin = () => {
  if (typeof clearSession === 'function') clearSession()
  window.location.href = '/login'
}

// ========== API Call ==========
const cargarDashboard = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/dashboard/admin`, {
      headers: authHeaders()
    })

    let data = {}
    try { data = await response.json() } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudo cargar el dashboard.')
      return
    }

    // Actualizar todas las métricas
    metricas.value = data.metricas || {
      total_usuarios: 0,
      total_empresas: 0,
      total_vacantes: 0,
      total_postulaciones: 0
    }
    ultimosUsuarios.value = data.ultimosUsuarios || []
    ultimasEmpresas.value = data.ultimasEmpresas || []
    ultimasVacantes.value = data.ultimasVacantes || []
  } catch (error) {
    console.error('Error al cargar dashboard:', error)
    showAlert('Error de conexión con el servidor.')
  } finally {
    loading.value = false
  }
}

// ========== Ciclo de vida ==========
onBeforeMount(() => {
  try {
    requireAuth(['admin'])
  } catch (error) {
    console.error('Error de autenticación:', error)
    redirectToLogin()
  }
})

onMounted(() => {
  cargarDashboard()
})
</script>

<style scoped>
:root {
  --azul-oscuro: #001670;
  --azul: #2C48D4;
  --celeste: #84ACF0;
  --amarillo-mostaza: #DDAE5B;
  --fondo: #E9F0FF;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--fondo);
}

.navbar {
  background-color: var(--azul-oscuro) !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.nav-link-custom {
  color: rgba(255,255,255,0.8);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s;
  border-radius: 8px;
  padding: 8px 15px !important;
}

.nav-link-custom:hover {
  background: rgba(255,255,255,0.1);
  color: white;
}

.profile-wrapper {
  position: relative;
  display: inline-block;
}

.btn-menu-side {
  text-align: left;
  border: none;
  padding: 12px 15px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: 0.3s;
  background-color: var(--azul);
  color: white;
  margin-bottom: 8px;
  width: 100%;
  text-decoration: none;
  display: inline-block;
}

.btn-menu-side:hover {
  background-color: var(--azul-oscuro);
  color: white;
  transform: translateX(5px);
}

.btn-menu-side.active {
  background-color: var(--celeste) !important;
  color: var(--azul-oscuro) !important;
}

.bento-card {
  background: white;
  border-radius: 20px;
  border: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

.bar {
  background-color: var(--amarillo-mostaza);
  width: 80px;
  border-radius: 4px;
  transition: height .3s ease;
}

.btn-action {
  background-color: var(--azul);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  padding: 10px 20px;
}

.btn-quick-access {
  background-color: #F2EBE4;
  color: #333;
  border: none;
  padding: 10px;
  border-radius: 8px;
  width: 100%;
  margin-bottom: 8px;
  font-weight: 500;
  text-decoration: none;
  display: block;
  text-align: center;
  transition: background-color 0.2s;
}

.btn-quick-access:hover {
  background-color: #e6dbd0;
  color: #000;
}

footer {
  background-color: var(--azul-oscuro);
  color: white;
}
</style>