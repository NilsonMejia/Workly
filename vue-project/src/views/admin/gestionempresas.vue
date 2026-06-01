<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg py-3 sticky-top">
      <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold text-white fs-3 d-flex align-items-center" href="/admin/principal">
          <i class="bi bi-briefcase-fill me-2"></i> Workly
        </a>

        <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/principal">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/usuarios">Usuarios</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom active" href="/admin/empresas">Empresas</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/vacantes">Vacantes</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/estadisticas">Estadísticas</a></li>
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
            <h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">Menú Admin</h6>
            <div class="d-flex flex-column">
              <a href="/admin/principal" class="btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
              <a href="/admin/usuarios" class="btn-menu-side"><i class="bi bi-people-fill me-2"></i> Gestión de Usuarios</a>
              <a href="/admin/empresas" class="btn-menu-side active"><i class="bi bi-building me-2"></i> Gestión de Empresas</a>
              <a href="/admin/vacantes" class="btn-menu-side"><i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes</a>
              <a href="/admin/estadisticas" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema</a>
              <a href="/admin/moderacion" class="btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> Moderación de Contenido</a>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="col-12 col-lg-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">Gestión de Empresas</h4>
          </div>

          <!-- Alert Container -->
          <div v-if="alertMessage" class="mb-3">
            <div :class="`alert alert-${alertType} rounded-4`" role="alert">
              {{ alertMessage }}
            </div>
          </div>

          <!-- Filter Bar -->
          <div class="bento-card p-2 mb-4">
            <div class="row g-2 align-items-center">
              <div class="col">
                <div class="input-group">
                  <span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span>
                  <input 
                    type="text" 
                    id="filtroEmpresa" 
                    v-model="filtroTexto"
                    @keydown.enter="aplicarFiltro"
                    class="form-control bg-light border-0" 
                    placeholder="Buscar empresa o correo...">
                </div>
              </div>
              <div class="col-auto">
                <button class="btn btn-primary px-4" @click="aplicarFiltro" style="background-color: var(--azul); border-radius: 10px;">Filtrar</button>
              </div>
              <div class="col-auto">
                <button class="btn btn-primary px-4" @click="abrirModalNuevaEmpresa" style="background-color: var(--azul-oscuro); border-radius: 10px;">Nueva empresa</button>
              </div>
            </div>
          </div>

          <!-- Companies Table -->
          <div class="bento-card p-4 mb-4">
            <h6 class="fw-bold mb-4">Lista de empresas</h6>
            <div class="table-responsive">
              <table class="table align-middle">
                <thead class="text-muted border-bottom">
                  <tr>
                    <th>Empresa</th>
                    <th>Correo</th>
                    <th>Sitio web</th>
                    <th>Municipio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaEmpresas">
                  <tr v-if="loading">
                    <td colspan="5" class="text-muted text-center">Cargando empresas...</td>
                  </tr>
                  <tr v-else-if="filteredEmpresas.length === 0">
                    <td colspan="5" class="text-muted text-center">No hay empresas registradas.</td>
                  </tr>
                  <tr v-else v-for="empresa in filteredEmpresas" :key="empresa.id_empresa">
                    <td>
                      <div class="d-flex align-items-center">
                        <i class="bi bi-building empresa-row-icon me-2"></i>
                        <div>
                          <div class="fw-bold">{{ empresa.nombre_comercial || 'N/D' }}</div>
                          <div class="small text-muted">{{ empresa.razon_social || '' }}</div>
                        </div>
                      </div>
                    </td>
                    <td>{{ empresa.correo_electronico || 'N/D' }}</td>
                    <td>{{ empresa.sitio_web || 'N/D' }}</td>
                    <td>{{ empresa.nombre_municipio || empresa.id_municipio_fk || 'N/D' }}</td>
                    <td>
                      <button class="btn btn-sm fw-bold px-3 text-white" @click="eliminarEmpresa(empresa.id_empresa)" style="background-color:#dc3545; border-radius: 6px;">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Summary and Activity -->
          <div class="row g-4">
            <div class="col-12 col-md-4">
              <div class="bento-card p-4 h-100">
                <h6 class="fw-bold mb-4">Resumen</h6>
                <div class="vstack gap-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Total empresas</span>
                    <span class="fw-bold fs-5">{{ filteredEmpresas.length }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Con sitio web</span>
                    <span class="fw-bold fs-5">{{ empresasConWeb }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Sin sitio web</span>
                    <span class="fw-bold fs-5">{{ empresasSinWeb }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-8">
              <div class="bento-card p-4">
                <h6 class="fw-bold mb-4">
                  <i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente
                </h6>
                <div class="vstack gap-3" id="actividadEmpresas">
                  <div v-if="filteredEmpresas.length === 0" class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
                    No hay actividad disponible.
                  </div>
                  <div v-for="(empresa, index) in filteredEmpresas.slice(0, 3)" :key="empresa.id_empresa" 
                    class="p-3 rounded-4 bg-light border-start border-4" 
                    :class="index === 0 ? 'border-primary' : index === 1 ? 'border-success' : 'border-warning'">
                    <div class="d-flex justify-content-between align-items-center">
                      <h6 class="fw-bold mb-1">{{ empresa.nombre_comercial || 'Empresa' }}</h6>
                      <small class="text-muted">Registro reciente</small>
                    </div>
                    <p class="small mb-0 text-muted">
                      {{ empresa.correo_electronico || 'Sin correo' }}
                      {{ empresa.sitio_web ? ' · ' + empresa.sitio_web : '' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="py-4">
      <div class="container text-center">
        <div class="d-flex justify-content-center gap-4 small opacity-75">
          <a href="#" class="text-white text-decoration-none">Ayuda</a>
          <a href="#" class="text-white text-decoration-none">Privacidad</a>
          <span class="fw-semibold">Workly 2026</span>
        </div>
      </div>
    </footer>

    <!-- Modal Nueva Empresa -->
    <div class="modal fade" id="modalEmpresa" tabindex="-1" ref="modalRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header" style="background-color: var(--azul-oscuro); color: white;">
            <h5 class="modal-title">Nueva empresa</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="formEmpresa">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label fw-bold">Nombre comercial *</label>
                  <input type="text" class="form-control" v-model="nuevaEmpresa.nombre_comercial">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Razón social</label>
                  <input type="text" class="form-control" v-model="nuevaEmpresa.razon_social">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Correo *</label>
                  <input type="email" class="form-control" v-model="nuevaEmpresa.correo_electronico">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Contraseña *</label>
                  <input type="password" class="form-control" v-model="nuevaEmpresa.contrasena">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Sitio web</label>
                  <input type="text" class="form-control" v-model="nuevaEmpresa.sitio_web">
                </div>
                <div class="col-md-6">
                  <label class="form-label fw-bold">Municipio</label>
                  <select class="form-select" v-model="nuevaEmpresa.id_municipio_fk">
                    <option value="">Selecciona un municipio</option>
                    <option v-for="municipio in municipios" :key="municipio.id_municipio" :value="municipio.id_municipio">
                      {{ municipio.nombre_departamento }} - {{ municipio.nombre_municipio }}
                    </option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label fw-bold">Descripción</label>
                  <textarea class="form-control" v-model="nuevaEmpresa.descripcion_empresa" rows="4"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="guardarEmpresa" style="background-color: var(--azul);">Guardar empresa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken, clearSession, requireAuth } from '../../services/api.js'

// ========== Estado reactivo ==========
const loading = ref(true)
const alertMessage = ref('')
const alertType = ref('danger')
const empresas = ref([])
const filtroTexto = ref('')
const municipios = ref([])

// Datos del formulario modal
const nuevaEmpresa = ref({
  nombre_comercial: '',
  razon_social: '',
  correo_electronico: '',
  sitio_web: '',
  descripcion_empresa: '',
  id_municipio_fk: '',
  contrasena: ''
})

// Referencia al modal
const modalRef = ref(null)
let modalInstance = null

// ========== Computed ==========
const filteredEmpresas = computed(() => {
  const texto = filtroTexto.value.trim().toLowerCase()
  if (!texto) return empresas.value
  
  return empresas.value.filter(item =>
    (item.nombre_comercial || '').toLowerCase().includes(texto) ||
    (item.correo_electronico || '').toLowerCase().includes(texto) ||
    (item.razon_social || '').toLowerCase().includes(texto)
  )
})

const empresasConWeb = computed(() => {
  return filteredEmpresas.value.filter(item => (item.sitio_web || '').trim() !== '').length
})

const empresasSinWeb = computed(() => {
  return filteredEmpresas.value.filter(item => !(item.sitio_web || '').trim()).length
})

// ========== Funciones auxiliares ==========
const showAlert = (message, type = 'danger') => {
  alertMessage.value = message
  alertType.value = type
  setTimeout(() => {
    alertMessage.value = ''
  }, 5000)
}

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
})

const redirectToLogin = () => {
  clearSession()
  window.location.href = '/login'
}

// ========== API Calls ==========
const cargarMunicipios = async () => {
  try {
    const response = await fetch(`${API_URL}/catalogos/municipios-agrupados`)
    if (response.ok) {
      municipios.value = await response.json()
    }
  } catch (error) {
    console.error('Error cargando municipios:', error)
  }
}

const cargarEmpresas = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/admin/empresas`, {
      headers: authHeaders()
    })

    let data = []
    try {
      data = await response.json()
    } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudieron cargar las empresas.')
      return
    }

    empresas.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('Error cargando empresas:', error)
    showAlert('Error de conexión con el servidor.')
  } finally {
    loading.value = false
  }
}

const eliminarEmpresa = async (id) => {
  if (!confirm('¿Seguro que deseas eliminar esta empresa?')) return

  try {
    const response = await fetch(`${API_URL}/admin/empresas/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })

    let data = {}
    try {
      data = await response.json()
    } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudo eliminar la empresa.')
      return
    }

    showAlert('Empresa eliminada correctamente.', 'success')
    await cargarEmpresas()
  } catch (error) {
    console.error('Error eliminando empresa:', error)
    showAlert('Error de conexión con el servidor.')
  }
}

const guardarEmpresa = async () => {
  // Validaciones básicas
  if (!nuevaEmpresa.value.nombre_comercial || !nuevaEmpresa.value.correo_electronico || !nuevaEmpresa.value.contrasena) {
    showAlert('Completa nombre comercial, correo y contraseña.', 'warning')
    return
  }

  try {
    const response = await fetch(`${API_URL}/admin/empresas`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(nuevaEmpresa.value)
    })

    let data = {}
    try {
      data = await response.json()
    } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudo crear la empresa.')
      return
    }

    showAlert('Empresa creada correctamente.', 'success')
    modalInstance?.hide()
    limpiarFormulario()
    await cargarEmpresas()
  } catch (error) {
    console.error('Error creando empresa:', error)
    showAlert('Error de conexión con el servidor.')
  }
}

// ========== Funciones UI ==========
const aplicarFiltro = () => {
  // El filtro ya es reactivo gracias a v-model, esta función es redundante pero se mantiene por compatibilidad
  // Forzamos actualización del computed (ya se actualiza automáticamente)
}

const limpiarFormulario = () => {
  nuevaEmpresa.value = {
    nombre_comercial: '',
    razon_social: '',
    correo_electronico: '',
    sitio_web: '',
    descripcion_empresa: '',
    id_municipio_fk: '',
    contrasena: ''
  }
}

const abrirModalNuevaEmpresa = () => {
  limpiarFormulario()
  modalInstance?.show()
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

onMounted(async () => {
  // Inicializar modal de Bootstrap
  if (modalRef.value) {
    modalInstance = new window.bootstrap.Modal(modalRef.value)
  }

  await cargarMunicipios()
  await cargarEmpresas()
})
</script>

<style scoped>
:root {
  --azul-oscuro: #001670;
  --azul: #2C48D4;
  --celeste: #84ACF0;
  --amarillo-mostaza: #F8BD00;
  --fondo: #E9F0FF;
  --success-btn: #28a745;
  --danger-btn: #dc3545;
  --suspend-btn: #b23b3b;
  --gris-claro: #E9ECEF;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--fondo);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

.nav-link-custom.active {
  background: rgba(255,255,255,0.2);
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

.btn-action-top {
  background-color: var(--azul);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  padding: 10px 20px;
}

.table thead th {
  border: none;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.empresa-row-icon {
  font-size: 2rem;
  color: #6c757d;
}

footer {
  background-color: var(--azul-oscuro);
  color: white;
  margin-top: auto;
}
</style>