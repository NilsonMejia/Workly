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
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/estadisticas">EstadÃ­sticas</a></li>
          </ul>
          <div class="profile-wrapper ms-lg-3">
            <i class="bi bi-person-circle fs-2 text-white" style="cursor: pointer;"></i>
            <span class="notif-badge"></span>
          </div>
        </div>
      </div>
    </nav>

    <main class="container-fluid px-4 py-4">
      <div class="row g-4">
        <!-- Sidebar -->
        <aside class="col-12 col-lg-2">
          <div class="bento-card p-3 h-100">
            <h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">MenÃº Admin</h6>
            <div class="d-flex flex-column">
              <a href="/admin/principal" class="btn btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
              <a href="/admin/usuarios" class="btn btn-menu-side text-nowrap"><i class="bi bi-people-fill me-2"></i> GestiÃ³n de Usuarios</a>
              <a href="/admin/empresas" class="btn btn-menu-side text-nowrap"><i class="bi bi-building me-2"></i> GestiÃ³n de Empresas</a>
              <a href="/admin/vacantes" class="btn btn-menu-side text-nowrap"><i class="bi bi-file-earmark-text me-2"></i> GestiÃ³n de Vacantes</a>
              <a href="/admin/estadisticas" class="btn btn-menu-side active"><i class="bi bi-bar-chart-fill me-2"></i> EstadÃ­sticas del Sistema</a>
              <a href="/admin/moderacion" class="btn btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> ModeraciÃ³n</a>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="col-12 col-lg-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">EstadÃ­sticas del Sistema</h4>
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
                <h2 class="stat-number mb-0">{{ categorias.length }}</h2>
                <p class="mb-0 fw-semibold">CategorÃ­as con vacantes</p>
                <small class="text-muted">Datos actuales</small>
              </div>
            </div>
            <div class="col-md-3">
              <div class="bento-card p-3 text-center">
                <h2 class="stat-number mb-0">{{ modalidades.length }}</h2>
                <p class="mb-0 fw-semibold">Modalidades activas</p>
                <small class="text-muted">Datos actuales</small>
              </div>
            </div>
            <div class="col-md-3">
              <div class="bento-card p-3 text-center">
                <h2 class="stat-number mb-0">{{ estados.length }}</h2>
                <p class="mb-0 fw-semibold">Estados de postulaciÃ³n</p>
                <small class="text-muted">Datos actuales</small>
              </div>
            </div>
            <div class="col-md-3">
              <div class="bento-card p-3 text-center">
                <h2 class="stat-number mb-0">{{ empresas.length }}</h2>
                <p class="mb-0 fw-semibold">Empresas en ranking</p>
                <small class="text-muted">Datos actuales</small>
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="row g-4 mb-4">
            <div class="col-lg-8">
              <div class="bento-card p-4 h-100">
                <h6 class="fw-bold mb-4">Vacantes por categorÃ­a</h6>
                <div v-if="loading" class="d-flex justify-content-center py-5">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
                <div v-else-if="!topCategories.length" class="empty-box text-center py-5">
                  No hay datos de categorÃ­as.
                </div>
                <div v-else class="d-flex justify-content-around align-items-end" style="height: 300px; border-bottom: 2px solid #eee;">
                  <div v-for="item in topCategories" :key="item.nombre_categoria" class="text-center bar-wrap">
                    <div class="bar mx-auto" :style="{ height: getBarHeight(item.total) + 'px' }"></div>
                    <span class="small mt-2 d-block text-muted">{{ item.nombre_categoria || 'N/D' }}</span>
                    <strong class="small">{{ item.total || 0 }}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="bento-card p-4 h-100">
                <h6 class="fw-bold mb-4">Vacantes por modalidad</h6>
                <div v-if="loading" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                  </div>
                </div>
                <div v-else-if="!modalidades.length" class="empty-box text-center py-4">
                  No hay modalidades.
                </div>
                <div v-else id="listaModalidades" class="small">
                  <div v-for="item in modalidades" :key="item.modalidad" class="d-flex justify-content-between align-items-center mb-2">
                    <span>{{ item.modalidad || 'N/D' }}</span>
                    <strong>{{ item.total || 0 }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tables Row -->
          <div class="row g-4">
            <div class="col-lg-8">
              <div class="bento-card p-4">
                <h6 class="fw-bold mb-3">Empresas con mÃ¡s vacantes</h6>
                <div class="table-responsive">
                  <table class="table table-borderless align-middle">
                    <thead class="text-muted small">
                      <tr>
                        <th>Empresa</th>
                        <th class="text-end">Total vacantes</th>
                      </tr>
                    </thead>
                    <tbody id="tablaEmpresasVacantes">
                      <tr v-if="loading">
                        <td colspan="2" class="text-muted text-center">Cargando datos...</td>
                      </tr>
                      <tr v-else-if="!empresas.length">
                        <td colspan="2" class="text-muted text-center">No hay datos de empresas.</td>
                      </tr>
                      <tr v-else v-for="item in empresas" :key="item.nombre_comercial" class="border-bottom">
                        <td class="fw-semibold">{{ item.nombre_comercial || 'N/D' }}</td>
                        <td class="text-end">{{ item.total_vacantes || 0 }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-lg-4">
              <div class="vstack gap-4">
                <div class="bento-card p-4">
                  <h6 class="fw-bold mb-3">Postulaciones por estado</h6>
                  <div v-if="loading" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Cargando...</span>
                    </div>
                  </div>
                  <div v-else-if="!estados.length" class="empty-box text-center py-4">
                    No hay estados.
                  </div>
                  <div v-else id="listaEstados" class="small">
                    <div v-for="item in estados" :key="item.nombre_estado" class="d-flex justify-content-between mb-2">
                      <span>{{ item.nombre_estado || 'N/D' }}</span>
                      <strong>{{ item.total || 0 }}</strong>
                    </div>
                  </div>
                </div>

                <div class="bento-card p-4">
                  <h6 class="fw-bold mb-3">Resumen rÃ¡pido</h6>
                  <div class="d-flex justify-content-between mb-2">
                    <span>CategorÃ­as</span>
                    <strong>{{ categorias.length }}</strong>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Modalidades</span>
                    <strong>{{ modalidades.length }}</strong>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <span>Estados</span>
                    <strong>{{ estados.length }}</strong>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span>Empresas rankeadas</span>
                    <strong>{{ empresas.length }}</strong>
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
import { API_URL, getToken, requireAuth } from '../../services/api.js'

// Estados reactivos
const loading = ref(true)
const alertMessage = ref('')
const alertType = ref('danger')

const categorias = ref([])
const modalidades = ref([])
const estados = ref([])
const empresas = ref([])

// Top 6 categorÃ­as para el grÃ¡fico de barras
const topCategories = computed(() => {
  return categorias.value.slice(0, 6)
})

// MÃ¡ximo total de vacantes entre las categorÃ­as top (para calcular altura de barras)
const maxTotal = computed(() => {
  if (!topCategories.value.length) return 1
  return Math.max(...topCategories.value.map(x => Number(x.total || 0)), 1)
})

// FunciÃ³n para mostrar alertas
const showAlert = (message, type = 'danger') => {
  alertMessage.value = message
  alertType.value = type
  // Ocultar alerta despuÃ©s de 5 segundos
  setTimeout(() => {
    alertMessage.value = ''
  }, 5000)
}

// Limpiar sesiÃ³n y redirigir al login
const clearSession = () => {
  localStorage.removeItem('token')
  window.location.href = '../../public/login/index.html'
}

// Calcular altura de barra (mÃ¡ximo 220px, mÃ­nimo 30px)
const getBarHeight = (total) => {
  const totalNum = Number(total || 0)
  const height = (totalNum / maxTotal.value) * 220
  return Math.max(height, 30)
}

// Headers de autenticaciÃ³n
const authHeaders = () => ({
  'Authorization': `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
})

// Cargar estadÃ­sticas desde el API
const cargarEstadisticas = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/admin/estadisticas`, {
      headers: authHeaders()
    })

    let data = {}
    try {
      data = await response.json()
    } catch {
      data = {}
    }

    if (response.status === 401 || response.status === 403) {
      clearSession()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudieron cargar las estadÃ­sticas.')
      return
    }

    // Asignar datos a las variables reactivas
    categorias.value = data.vacantesPorCategoria || []
    modalidades.value = data.vacantesPorModalidad || []
    estados.value = data.postulacionesPorEstado || []
    empresas.value = data.empresasConMasVacantes || []
    
  } catch (error) {
    console.error('Error al cargar estadÃ­sticas:', error)
    showAlert('Error de conexiÃ³n con el servidor.')
  } finally {
    loading.value = false
  }
}

// Verificar autenticaciÃ³n antes de montar el componente
onBeforeMount(() => {
  try {
    requireAuth(['admin'])
  } catch (error) {
    console.error('Error de autenticaciÃ³n:', error)
    clearSession()
  }
})

// Cargar datos al montar el componente
onMounted(() => {
  cargarEstadisticas()
})
</script>

<style scoped>
:root {
  --azul-oscuro: #001670;
  --azul: #2C48D4;
  --celeste: #84ACF0;
  --amarillo-mostaza: #D4AF37;
  --gris-claro: #F0EBE5;
  --fondo: #E9F0FF;
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

.notif-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  background-color: #ff3b3b;
  border: 2px solid var(--azul-oscuro);
  border-radius: 50%;
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
  transition: transform 0.3s ease;
}

.bar-wrap {
  width: 80px;
}

.bar {
  background-color: #DDAE5B;
  width: 80px;
  border-radius: 8px 8px 0 0;
  transition: height 0.4s ease;
}

.btn-action {
  background-color: var(--azul);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  padding: 10px 20px;
}

.stat-number {
  font-weight: 700;
}

.empty-box {
  color: #6c757d;
  font-size: 0.95rem;
}

footer {
  background-color: var(--azul-oscuro);
  color: white;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--fondo);
}
</style>