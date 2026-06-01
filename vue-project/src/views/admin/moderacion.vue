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
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/empresas">Empresas</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/vacantes">Vacantes</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/estadisticas">EstadÃ­sticas</a></li>
          </ul>
          <div class="profile-wrapper ms-lg-3">
            <i class="bi bi-person-circle fs-2 text-white" style="cursor: pointer"></i>
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
              <a href="/admin/principal" class="btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
              <a href="/admin/usuarios" class="btn-menu-side"><i class="bi bi-people-fill me-2"></i> GestiÃ³n de Usuarios</a>
              <a href="/admin/empresas" class="btn-menu-side"><i class="bi bi-building me-2"></i> GestiÃ³n de Empresas</a>
              <a href="/admin/vacantes" class="btn-menu-side"><i class="bi bi-file-earmark-text me-2"></i> GestiÃ³n de Vacantes</a>
              <a href="/admin/estadisticas" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> EstadÃ­sticas del Sistema</a>
              <a href="/admin/moderacion" class="btn-menu-side active"><i class="bi bi-shield-lock-fill me-2"></i> ModeraciÃ³n de Contenido</a>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="col-12 col-lg-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">ModeraciÃ³n de Contenido</h4>
          </div>

          <!-- Alert Container -->
          <div v-if="alertMessage" class="mb-3">
            <div :class="`alert alert-${alertType} alert-dismissible fade show rounded-4`" role="alert">
              <i :class="`bi bi-${alertIcon} me-2`"></i>
              {{ alertMessage }}
              <button type="button" class="btn-close" @click="alertMessage = ''"></button>
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
                    v-model="filtroTexto"
                    @keydown.enter="aplicarFiltro"
                    class="form-control bg-light border-0"
                    placeholder="Buscar en usuarios, empresas o vacantes..."
                  />
                </div>
              </div>
              <div class="col-auto">
                <button class="btn btn-primary px-4" @click="aplicarFiltro" style="background-color: var(--azul); border-radius: 10px">
                  Filtrar
                </button>
              </div>
            </div>
          </div>

          <!-- Moderation Table -->
          <div class="bento-card p-4 mb-4">
            <h6 class="fw-bold mb-4">Elementos para revisiÃ³n</h6>
            <div class="table-responsive">
              <table class="table align-middle">
                <thead class="text-muted border-bottom">
                  <tr>
                    <th>Contenido</th>
                    <th>Tipo</th>
                    <th>Origen</th>
                    <th>Detalle</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaModeracion">
                  <tr v-if="loading">
                    <td colspan="6" class="text-center text-muted py-5">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="filteredItems.length === 0">
                    <td colspan="6" class="text-center text-muted py-5">
                      <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                      No hay elementos para mostrar
                    </td>
                  </tr>
                  <tr v-else v-for="item in filteredItems" :key="`${item.tipo}-${item.id}`">
                    <td>
                      <div class="fw-bold">{{ item.titulo }}</div>
                      <div class="small text-muted">ID: {{ item.id || 'N/D' }}</div>
                    </td>
                    <td>
                      <span class="badge bg-secondary px-3 py-2">
                        <i :class="`bi bi-${item.tipo === 'Usuario' ? 'person' : item.tipo === 'Empresa' ? 'building' : 'file-text'} me-1`"></i>
                        {{ item.tipo }}
                      </span>
                    </td>
                    <td>{{ item.origen }}</td>
                    <td>{{ item.detalle }}</td>
                    <td v-html="getEstadoBadge(item.estado)"></td>
                    <td>
                      <div class="d-flex gap-2">
                        <button
                          v-if="item.estado !== 'Suspendido'"
                          class="btn btn-sm btn-outline-warning"
                          @click="abrirConfirmacion(item, 'suspend')"
                          title="Suspender"
                        >
                          <i class="bi bi-exclamation-triangle"></i>
                        </button>
                        <button
                          v-else
                          class="btn btn-sm btn-outline-success"
                          @click="abrirConfirmacion(item, 'activate')"
                          title="Activar"
                        >
                          <i class="bi bi-check-circle"></i>
                        </button>
                        <button
                          class="btn btn-sm btn-outline-danger"
                          @click="abrirConfirmacion(item, 'delete')"
                          title="Eliminar"
                        >
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Summary and Recent Activity -->
          <div class="row g-4">
            <div class="col-12 col-md-4">
              <div class="bento-card p-4 h-100">
                <h6 class="fw-bold mb-4">Resumen</h6>
                <div class="vstack gap-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Usuarios</span>
                    <span class="fw-bold fs-5">{{ usuarios.length }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Empresas</span>
                    <span class="fw-bold fs-5">{{ empresas.length }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Vacantes</span>
                    <span class="fw-bold fs-5">{{ vacantes.length }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Total items</span>
                    <span class="fw-bold fs-5">{{ totalItems }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-8">
              <div class="bento-card p-4">
                <h6 class="fw-bold mb-4">
                  <i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente
                </h6>
                <div class="vstack gap-3" id="actividadModeracion">
                  <div v-if="loading" class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
                    Cargando actividad...
                  </div>
                  <div v-else-if="recientes.length === 0" class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
                    <i class="bi bi-info-circle me-2"></i>No hay actividad disponible.
                  </div>
                  <div
                    v-for="(item, index) in recientes"
                    :key="`recent-${item.tipo}-${item.id}`"
                    class="p-3 rounded-4 bg-light border-start border-4"
                    :class="{
                      'border-primary': index === 0,
                      'border-danger': index === 1,
                      'border-success': index === 2
                    }"
                  >
                    <div class="d-flex justify-content-between align-items-center">
                      <h6 class="fw-bold mb-1">
                        <i :class="`bi bi-${index === 0 ? 'plus-circle' : index === 1 ? 'exclamation-triangle' : 'check-circle'} me-2 text-${index === 0 ? 'primary' : index === 1 ? 'danger' : 'success'}`"></i>
                        {{ item.titulo }}
                      </h6>
                      <small class="text-muted">{{ item.tipo }} Â· {{ formatearFecha(item.fecha) }}</small>
                    </div>
                    <p class="small mb-0 text-muted">{{ item.origen }} Â· {{ item.detalle }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal de ConfirmaciÃ³n -->
    <div class="modal fade" id="modalConfirmacion" tabindex="-1" ref="modalConfirmacionRef">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirmar acciÃ³n</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" v-html="confirmacionMensaje"></div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-danger" @click="ejecutarAccionConfirmada">Confirmar</button>
          </div>
        </div>
      </div>
    </div>

    <footer class="py-4">
      <div class="container text-center">
        <div class="d-flex justify-content-center gap-4 small opacity-75">
          <a href="#" class="text-white text-decoration-none">Ayuda</a>
          <a href="#" class="text-white text-decoration-none">Privacidad</a>
          <span class="fw-semibold">Workly 2026</span>
        </div>
      </div>
    </footer>

    <!-- Loading Overlay (opcional, pero mantenemos el div en el DOM) -->
    <div class="loading-spinner" v-show="loading">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken, clearSession, requireAuth } from '../../services/api.js'

// ========== Estado reactivo ==========
const loading = ref(false)
const alertMessage = ref('')
const alertType = ref('danger')
const alertIcon = ref('x-circle')
const filtroTexto = ref('')

const usuarios = ref([])
const empresas = ref([])
const vacantes = ref([])

// Modal de confirmaciÃ³n
const modalConfirmacionRef = ref(null)
let modalConfirmacionInstance = null
const confirmacionMensaje = ref('')
let pendingAction = null  // { tipo: 'suspend'|'activate'|'delete', item: object }

// ========== Computed ==========
// Construir lista unificada de items (usuarios, empresas, vacantes)
const itemsModeracion = computed(() => {
  const itemsUsuarios = usuarios.value.map(item => ({
    id: item.id_usuario || item.id,
    titulo: `${item.nombres || ''} ${item.apellidos || ''}`.trim() || 'Usuario',
    tipo: 'Usuario',
    origen: item.correo_electronico || 'Sin correo',
    detalle: item.telefono || item.nombre_municipio || 'Sin detalle',
    estado: item.estado || 'Activo',
    fecha: item.fecha_registro || new Date().toISOString()
  }))

  const itemsEmpresas = empresas.value.map(item => ({
    id: item.id_empresa || item.id,
    titulo: item.nombre_comercial || 'Empresa',
    tipo: 'Empresa',
    origen: item.correo_electronico || 'Sin correo',
    detalle: item.sitio_web || 'Sin sitio web',
    estado: item.estado || 'RevisiÃ³n general',
    fecha: item.fecha_registro || new Date().toISOString()
  }))

  const itemsVacantes = vacantes.value.map(item => ({
    id: item.id_vacante || item.id,
    titulo: item.titulo_puesto || 'Vacante',
    tipo: 'Vacante',
    origen: item.nombre_comercial || 'Sin empresa',
    detalle: `${item.nombre_categoria || 'Sin categorÃ­a'} Â· ${item.modalidad || 'N/D'}`,
    estado: item.estado || 'Activo',
    fecha: item.fecha_publicacion || new Date().toISOString()
  }))

  return [...itemsUsuarios, ...itemsEmpresas, ...itemsVacantes].sort(
    (a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0)
  )
})

// Items filtrados por texto
const filteredItems = computed(() => {
  const texto = filtroTexto.value.trim().toLowerCase()
  if (!texto) return itemsModeracion.value

  return itemsModeracion.value.filter(item =>
    (item.titulo || '').toLowerCase().includes(texto) ||
    (item.tipo || '').toLowerCase().includes(texto) ||
    (item.origen || '').toLowerCase().includes(texto) ||
    (item.detalle || '').toLowerCase().includes(texto)
  )
})

// Items recientes para actividad (primeros 3 del listado filtrado)
const recientes = computed(() => filteredItems.value.slice(0, 3))

// Totales de resumen (sin filtrar)
const totalItems = computed(() => usuarios.value.length + empresas.value.length + vacantes.value.length)

// ========== Funciones auxiliares ==========
const showAlert = (message, type = 'danger') => {
  alertMessage.value = message
  alertType.value = type
  if (type === 'success') alertIcon.value = 'check-circle'
  else if (type === 'warning') alertIcon.value = 'exclamation-triangle'
  else if (type === 'info') alertIcon.value = 'info-circle'
  else alertIcon.value = 'x-circle'

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

const formatearFecha = (fecha) => {
  if (!fecha) return 'N/D'
  const d = new Date(fecha)
  if (isNaN(d.getTime())) return 'N/D'
  return d.toLocaleDateString('es-SV')
}

const getEstadoBadge = (estado) => {
  const estados = {
    Activo: { class: 'success', icon: 'check-circle', text: 'Activo' },
    Pendiente: { class: 'warning text-dark', icon: 'clock', text: 'Pendiente' },
    Suspendido: { class: 'danger', icon: 'exclamation-triangle', text: 'Suspendido' },
    Rechazado: { class: 'danger', icon: 'x-circle', text: 'Rechazado' },
    'RevisiÃ³n general': { class: 'info', icon: 'eye', text: 'En revisiÃ³n' },
    Publicada: { class: 'success', icon: 'check-circle', text: 'Publicada' },
    Reportada: { class: 'danger', icon: 'exclamation-triangle', text: 'Reportada' }
  }

  const estadoInfo = estados[estado] || {
    class: 'secondary',
    icon: 'question-circle',
    text: estado || 'N/D'
  }

  return `<span class="badge bg-${estadoInfo.class} px-3 py-2">
            <i class="bi bi-${estadoInfo.icon} me-1"></i>${estadoInfo.text}
          </span>`
}

// ========== API Calls ==========
const cargarModeracion = async () => {
  loading.value = true
  try {
    const headers = { Authorization: `Bearer ${getToken()}` }

    const [usuariosRes, empresasRes, vacantesRes] = await Promise.all([
      fetch(`${API_URL}/admin/usuarios`, { headers }),
      fetch(`${API_URL}/admin/empresas`, { headers }),
      fetch(`${API_URL}/admin/vacantes`, { headers })
    ])

    if (
      usuariosRes.status === 401 || usuariosRes.status === 403 ||
      empresasRes.status === 401 || empresasRes.status === 403 ||
      vacantesRes.status === 401 || vacantesRes.status === 403
    ) {
      redirectToLogin()
      return
    }

    let usuariosData = [], empresasData = [], vacantesData = []
    try { usuariosData = await usuariosRes.json() } catch {}
    try { empresasData = await empresasRes.json() } catch {}
    try { vacantesData = await vacantesRes.json() } catch {}

    if (!usuariosRes.ok || !empresasRes.ok || !vacantesRes.ok) {
      showAlert('No se pudieron cargar los datos de moderaciÃ³n.')
      usuarios.value = []
      empresas.value = []
      vacantes.value = []
      return
    }

    usuarios.value = Array.isArray(usuariosData) ? usuariosData : []
    empresas.value = Array.isArray(empresasData) ? empresasData : []
    vacantes.value = Array.isArray(vacantesData) ? vacantesData : []
  } catch (error) {
    console.error(error)
    showAlert('Error de conexiÃ³n con el servidor.')
    usuarios.value = []
    empresas.value = []
    vacantes.value = []
  } finally {
    loading.value = false
  }
}

const actualizarEstadoItem = async (item, nuevoEstado) => {
  try {
    loading.value = true
    const tipoPath = item.tipo === 'Usuario' ? 'usuarios' : item.tipo === 'Empresa' ? 'empresas' : 'vacantes'
    const response = await fetch(`${API_URL}/admin/${tipoPath}/${item.id}/estado`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ estado: nuevoEstado })
    })

    let data = {}
    try { data = await response.json() } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || `No se pudo actualizar el estado de ${item.tipo}.`)
      return
    }

    showAlert(`${item.tipo} "${item.titulo}" actualizado correctamente.`, 'success')
    await cargarModeracion()
  } catch (error) {
    console.error(error)
    showAlert(`Error de conexiÃ³n al actualizar ${item.tipo}.`)
  } finally {
    loading.value = false
  }
}

const eliminarItem = async (item) => {
  try {
    loading.value = true
    const tipoPath = item.tipo === 'Usuario' ? 'usuarios' : item.tipo === 'Empresa' ? 'empresas' : 'vacantes'
    const response = await fetch(`${API_URL}/admin/${tipoPath}/${item.id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })

    let data = {}
    try { data = await response.json() } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || `No se pudo eliminar ${item.tipo}.`)
      return
    }

    showAlert(`${item.tipo} "${item.titulo}" eliminado correctamente.`, 'success')
    await cargarModeracion()
  } catch (error) {
    console.error(error)
    showAlert(`Error de conexiÃ³n al eliminar ${item.tipo}.`)
  } finally {
    loading.value = false
  }
}

// ========== LÃ³gica de confirmaciÃ³n modal ==========
const abrirConfirmacion = (item, accion) => {
  if (accion === 'suspend') {
    confirmacionMensaje.value = `Â¿EstÃ¡s seguro de que deseas <strong>SUSPENDER</strong> ${item.tipo} "${item.titulo}"?`
    pendingAction = { tipo: 'suspend', item }
  } else if (accion === 'activate') {
    confirmacionMensaje.value = `Â¿EstÃ¡s seguro de que deseas <strong>ACTIVAR</strong> ${item.tipo} "${item.titulo}"?`
    pendingAction = { tipo: 'activate', item }
  } else if (accion === 'delete') {
    confirmacionMensaje.value = `Â¿EstÃ¡s seguro de que deseas <strong>ELIMINAR</strong> ${item.tipo} "${item.titulo}"? Esta acciÃ³n no se puede deshacer.`
    pendingAction = { tipo: 'delete', item }
  }
  modalConfirmacionInstance?.show()
}

const ejecutarAccionConfirmada = async () => {
  if (!pendingAction) return
  const { tipo, item } = pendingAction

  if (tipo === 'suspend') {
    await actualizarEstadoItem(item, 'Suspendido')
  } else if (tipo === 'activate') {
    await actualizarEstadoItem(item, 'Activo')
  } else if (tipo === 'delete') {
    await eliminarItem(item)
  }

  modalConfirmacionInstance?.hide()
  pendingAction = null
}

// ========== Filtro ==========
const aplicarFiltro = () => {
  // El filtro se actualiza automÃ¡ticamente vÃ­a computed (filteredItems)
  // Esta funciÃ³n solo existe para mantener coherencia con el diseÃ±o original
}

// ========== Ciclo de vida ==========
onBeforeMount(() => {
  try {
    requireAuth(['admin'])
  } catch (error) {
    console.error('Error de autenticaciÃ³n:', error)
    redirectToLogin()
  }
})

onMounted(() => {
  if (modalConfirmacionRef.value) {
    modalConfirmacionInstance = new window.bootstrap.Modal(modalConfirmacionRef.value)
  }
  cargarModeracion()
})
</script>

<style scoped>
:root {
  --azul-oscuro: #001670;
  --azul: #2c48d4;
  --celeste: #84acf0;
  --amarillo-mostaza: #f8bd00;
  --fondo: #e9f0ff;
  --success-btn: #28a745;
  --danger-btn: #dc3545;
  --gris-claro: #e9ecef;
}

body {
  font-family: "Inter", sans-serif;
  background-color: var(--fondo);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: var(--azul-oscuro) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-link-custom {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s;
  border-radius: 8px;
  padding: 8px 15px !important;
}

.nav-link-custom:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link-custom.active {
  background: rgba(255, 255, 255, 0.2);
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
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.table thead th {
  border: none;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

footer {
  background-color: var(--azul-oscuro);
  color: white;
  margin-top: auto;
}

.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  background: rgba(0,0,0,0.5);
  border-radius: 12px;
  padding: 20px;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.table tbody tr {
  animation: fadeIn 0.3s ease-out;
}
</style>
