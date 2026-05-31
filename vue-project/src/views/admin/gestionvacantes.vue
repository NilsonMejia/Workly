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
            <li class="nav-item"><a class="nav-link nav-link-custom active" href="/admin/vacantes">Vacantes</a></li>
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
      <div id="alertContainer" class="mb-3">
        <div v-if="alertMessage" :class="`alert alert-${alertType} alert-dismissible fade show rounded-4`" role="alert">
          {{ alertMessage }}
          <button type="button" class="btn-close" @click="alertMessage = ''"></button>
        </div>
      </div>

      <div class="row g-4">
        <!-- Sidebar -->
        <aside class="col-12 col-lg-2">
          <div class="bento-card p-3 h-100">
            <h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">MenÃº Admin</h6>
            <div class="d-flex flex-column">
              <a href="/admin/principal" class="btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
              <a href="/admin/usuarios" class="btn-menu-side"><i class="bi bi-people-fill me-2"></i> GestiÃ³n de Usuarios</a>
              <a href="/admin/empresas" class="btn-menu-side"><i class="bi bi-building me-2"></i> GestiÃ³n de Empresas</a>
              <a href="/admin/vacantes" class="btn-menu-side active"><i class="bi bi-file-earmark-text me-2"></i> GestiÃ³n de Vacantes</a>
              <a href="/admin/estadisticas" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> EstadÃ­sticas del Sistema</a>
              <a href="/admin/moderacion" class="btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> ModeraciÃ³n de Contenido</a>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="col-12 col-lg-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">GestiÃ³n de Vacantes</h4>
            <div class="d-flex gap-2">
              <button class="btn btn-action-top" @click="exportarLista">
                <i class="bi bi-download me-2"></i>Exportar lista
              </button>
              <button class="btn btn-action-top" @click="abrirModalNueva">
                <i class="bi bi-plus-circle me-2"></i>Nueva Vacante
              </button>
            </div>
          </div>

          <!-- Filter Bar -->
          <div class="bento-card p-2 mb-4">
            <div class="row g-2 align-items-center">
              <div class="col">
                <div class="input-group">
                  <span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span>
                  <input type="text" class="form-control bg-light border-0" v-model="filtroTexto" @keydown.enter="aplicarFiltro" placeholder="Buscar por tÃ­tulo, empresa o categorÃ­a...">
                </div>
              </div>
              <div class="col-auto">
                <select class="form-select" v-model="estadoFiltro" style="border-radius: 10px;">
                  <option value="">Todos los estados</option>
                  <option value="Activo">Activo</option>
                  <option value="Pausada">Pausada</option>
                  <option value="Reportada">Reportada</option>
                </select>
              </div>
              <div class="col-auto">
                <button class="btn btn-primary px-4" @click="aplicarFiltro" style="background-color: var(--azul); border-radius: 10px;">
                  <i class="bi bi-funnel me-2"></i>Filtrar
                </button>
              </div>
              <div class="col-auto">
                <button class="btn btn-secondary px-4" @click="limpiarFiltros" style="border-radius: 10px;">
                  <i class="bi bi-eraser me-2"></i>Limpiar
                </button>
              </div>
            </div>
          </div>

          <!-- Vacantes Table -->
          <div class="bento-card p-4 mb-4">
            <h6 class="fw-bold mb-4">Lista de vacantes</h6>
            <div class="table-responsive">
              <table class="table align-middle">
                <thead class="text-muted border-bottom">
                  <tr>
                    <th>Vacante</th>
                    <th>Empresa</th>
                    <th>Estado</th>
                    <th>Registro</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaVacantes">
                  <tr v-if="loading">
                    <td colspan="5" class="text-center text-muted py-4">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="filteredVacantes.length === 0">
                    <td colspan="5" class="text-center text-muted py-5">
                      <i class="bi bi-inbox fs-1 d-block mb-2"></i>
                      No hay vacantes registradas
                    </td>
                  </tr>
                  <tr v-else v-for="vacante in filteredVacantes" :key="vacante.id_vacante">
                    <td>
                      <div class="fw-bold">{{ vacante.titulo_puesto || 'N/D' }}</div>
                      <div class="small text-muted">{{ vacante.modalidad || 'N/D' }} Â· {{ vacante.nombre_categoria || 'Sin categorÃ­a' }}</div>
                    </td>
                    <td>{{ vacante.nombre_comercial || 'N/D' }}</td>
                    <td>
                      <span :class="`badge ${getEstadoBadgeClass(vacante.estado)} px-3 py-2`">
                        {{ vacante.estado || 'Activo' }}
                      </span>
                    </td>
                    <td class="text-muted">{{ formatearFecha(vacante.fecha_publicacion) }}</td>
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <button class="btn btn-sm btn-outline-info" @click="verVacante(vacante)"><i class="bi bi-eye"></i></button>
                        <button class="btn btn-sm btn-outline-warning" @click="abrirModalEditar(vacante)"><i class="bi bi-pencil"></i></button>
                        <button class="btn btn-sm btn-outline-secondary" @click="cambiarEstadoVacante(vacante.id_vacante, 'Pausada')"><i class="bi bi-pause-circle"></i></button>
                        <button class="btn btn-sm btn-outline-primary" @click="cambiarEstadoVacante(vacante.id_vacante, 'Activo')"><i class="bi bi-play-circle"></i></button>
                        <button class="btn btn-sm btn-outline-danger" @click="eliminarVacante(vacante.id_vacante)"><i class="bi bi-trash"></i></button>
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
                <h6 class="fw-bold mb-4">
                  <i class="bi bi-pie-chart me-2 text-primary"></i>Resumen
                </h6>
                <div class="vstack gap-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Total vacantes</span>
                    <span class="fw-bold fs-5">{{ filteredVacantes.length }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Activas</span>
                    <span class="fw-bold fs-5 text-success">{{ resumenActivas }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Pausadas</span>
                    <span class="fw-bold fs-5 text-warning">{{ resumenPausadas }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Reportadas</span>
                    <span class="fw-bold fs-5 text-danger">{{ resumenReportadas }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-8">
              <div class="bento-card p-4">
                <h6 class="fw-bold mb-4">
                  <i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente
                </h6>
                <div class="vstack gap-3" id="actividadVacantes">
                  <div v-if="recientes.length === 0" class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
                    No hay actividad disponible.
                  </div>
                  <div v-for="(vacante, index) in recientes" :key="vacante.id_vacante"
                    class="p-3 rounded-4 bg-light border-start border-4"
                    :class="{
                      'border-primary': index === 0,
                      'border-success': index === 1,
                      'border-warning': index === 2
                    }">
                    <div class="d-flex justify-content-between align-items-center">
                      <h6 class="fw-bold mb-1">{{ vacante.titulo_puesto || 'Vacante' }}</h6>
                      <small class="text-muted">{{ formatearFecha(vacante.fecha_publicacion) }}</small>
                    </div>
                    <p class="small mb-0 text-muted">{{ vacante.nombre_comercial || 'Empresa' }} Â· {{ vacante.modalidad || 'N/D' }} Â· {{ vacante.estado || 'Activo' }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Vacante (Nuevo/Editar) -->
    <div class="modal fade" id="modalVacante" tabindex="-1" ref="modalVacanteRef">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header" style="background-color: var(--azul-oscuro); color: white;">
            <h5 class="modal-title">
              <i class="bi bi-file-earmark-plus me-2"></i>
              <span>{{ modalTitle }}</span>
            </h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <form id="formVacante">
              <input type="hidden" v-model="vacanteForm.id_vacante">
              <div class="mb-3">
                <label class="form-label fw-bold">TÃ­tulo del puesto *</label>
                <input type="text" class="form-control" v-model="vacanteForm.titulo_puesto" required>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Empresa</label>
                <select class="form-select" v-model="vacanteForm.id_empresa_fk">
                  <option value="">Selecciona una empresa</option>
                  <option v-for="emp in empresas" :key="emp.id_empresa" :value="emp.id_empresa">{{ emp.nombre_comercial }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">CategorÃ­a</label>
                <select class="form-select" v-model="vacanteForm.id_categoria_fk">
                  <option value="">Selecciona una categorÃ­a</option>
                  <option v-for="cat in categorias" :key="cat.id_categoria" :value="cat.id_categoria">{{ cat.nombre_categoria }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Modalidad</label>
                <select class="form-select" v-model="vacanteForm.modalidad">
                  <option value="Presencial">Presencial</option>
                  <option value="Remoto">Remoto</option>
                  <option value="HÃ­brido">HÃ­brido</option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">DescripciÃ³n</label>
                <textarea class="form-control" v-model="vacanteForm.descripcion_puesto" rows="3"></textarea>
              </div>
              <div class="mb-3">
                <label class="form-label fw-bold">Estado</label>
                <select class="form-select" v-model="vacanteForm.estado">
                  <option value="Activo">Activo</option>
                  <option value="Pausada">Pausada</option>
                  <option value="Reportada">Reportada</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="guardarVacante" style="background-color: var(--azul);">
              <i class="bi bi-save me-2"></i>Guardar
            </button>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken, clearSession, requireAuth } from '../../services/api.js'

// ========== Estado reactivo ==========
const loading = ref(true)
const vacantes = ref([])
const empresas = ref([])
const categorias = ref([])
const filtroTexto = ref('')
const estadoFiltro = ref('')
const alertMessage = ref('')
const alertType = ref('danger')

// Formulario modal
const vacanteForm = ref({
  id_vacante: '',
  id_empresa_fk: '',
  id_categoria_fk: '',
  titulo_puesto: '',
  descripcion_puesto: '',
  modalidad: 'Presencial',
  estado: 'Activo'
})
const modalTitle = ref('Nueva Vacante')
const modalVacanteRef = ref(null)
let modalInstance = null

// ========== Computed ==========
const filteredVacantes = computed(() => {
  let result = vacantes.value
  const texto = filtroTexto.value.trim().toLowerCase()
  const estado = estadoFiltro.value

  if (texto) {
    result = result.filter(v =>
      (v.titulo_puesto || '').toLowerCase().includes(texto) ||
      (v.nombre_comercial || '').toLowerCase().includes(texto) ||
      (v.nombre_categoria || '').toLowerCase().includes(texto)
    )
  }
  if (estado) {
    result = result.filter(v => (v.estado || 'Activo') === estado)
  }
  return result
})

const resumenActivas = computed(() => filteredVacantes.value.filter(v => (v.estado || 'Activo') === 'Activo').length)
const resumenPausadas = computed(() => filteredVacantes.value.filter(v => v.estado === 'Pausada').length)
const resumenReportadas = computed(() => filteredVacantes.value.filter(v => v.estado === 'Reportada').length)

const recientes = computed(() => {
  return [...filteredVacantes.value]
    .sort((a, b) => new Date(b.fecha_publicacion || 0) - new Date(a.fecha_publicacion || 0))
    .slice(0, 3)
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
  window.location.href = '../../public/login/index.html'
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'N/D'
  const parsed = new Date(fecha)
  if (isNaN(parsed.getTime())) return 'N/D'
  return parsed.toLocaleDateString('es-SV')
}

const getEstadoBadgeClass = (estado) => {
  if (estado === 'Pausada') return 'bg-warning text-dark'
  if (estado === 'Reportada') return 'bg-danger'
  return 'bg-success'
}

// ========== API Calls ==========
const cargarCatalogos = async () => {
  try {
    const [empresasRes, categoriasRes] = await Promise.all([
      fetch(`${API_URL}/admin/empresas`, { headers: authHeaders() }),
      fetch(`${API_URL}/catalogos/categorias`)
    ])

    if (empresasRes.status === 401 || empresasRes.status === 403) {
      redirectToLogin()
      return false
    }

    if (!empresasRes.ok || !categoriasRes.ok) throw new Error('Error cargando catÃ¡logos')

    empresas.value = await empresasRes.json()
    categorias.value = await categoriasRes.json()
    return true
  } catch (error) {
    console.error(error)
    showAlert('No se pudieron cargar empresas o categorÃ­as.')
    return false
  }
}

const cargarVacantes = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/admin/vacantes`, { headers: authHeaders() })
    let data = []
    try { data = await response.json() } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudieron cargar las vacantes.')
      vacantes.value = []
      return
    }

    vacantes.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error(error)
    showAlert('Error de conexiÃ³n con el servidor.')
  } finally {
    loading.value = false
  }
}

const guardarVacante = async () => {
  const id = vacanteForm.value.id_vacante
  const payload = {
    id_empresa_fk: vacanteForm.value.id_empresa_fk,
    id_categoria_fk: vacanteForm.value.id_categoria_fk,
    titulo_puesto: vacanteForm.value.titulo_puesto.trim(),
    descripcion_puesto: vacanteForm.value.descripcion_puesto.trim(),
    modalidad: vacanteForm.value.modalidad,
    estado: vacanteForm.value.estado
  }

  if (!payload.id_empresa_fk || !payload.id_categoria_fk || !payload.titulo_puesto || !payload.descripcion_puesto) {
    showAlert('Completa empresa, categorÃ­a, tÃ­tulo y descripciÃ³n.', 'warning')
    return
  }

  const url = id ? `${API_URL}/admin/vacantes/${id}` : `${API_URL}/admin/vacantes`
  const method = id ? 'PUT' : 'POST'

  try {
    const response = await fetch(url, {
      method,
      headers: authHeaders(),
      body: JSON.stringify(payload)
    })

    let data = {}
    try { data = await response.json() } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudo guardar la vacante.')
      return
    }

    showAlert(id ? 'Vacante actualizada correctamente.' : 'Vacante creada correctamente.', 'success')
    modalInstance?.hide()
    limpiarFormularioModal()
    await cargarVacantes()
  } catch (error) {
    console.error(error)
    showAlert('Error de conexiÃ³n con el servidor.')
  }
}

const cambiarEstadoVacante = async (id, nuevoEstado) => {
  try {
    const response = await fetch(`${API_URL}/admin/vacantes/${id}/estado`, {
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
      showAlert(data.mensaje || 'No se pudo cambiar el estado.')
      return
    }

    showAlert('Estado actualizado correctamente.', 'success')
    await cargarVacantes()
  } catch (error) {
    console.error(error)
    showAlert('Error de conexiÃ³n con el servidor.')
  }
}

const eliminarVacante = async (id) => {
  if (!confirm('Â¿Seguro que deseas eliminar esta vacante?')) return

  try {
    const response = await fetch(`${API_URL}/admin/vacantes/${id}`, {
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
      showAlert(data.mensaje || 'No se pudo eliminar la vacante.')
      return
    }

    showAlert('Vacante eliminada correctamente.', 'success')
    await cargarVacantes()
  } catch (error) {
    console.error(error)
    showAlert('Error de conexiÃ³n con el servidor.')
  }
}

// ========== Funciones UI ==========
const aplicarFiltro = () => {
  // Computed se actualiza automÃ¡ticamente por v-model, esta funciÃ³n solo existe por coherencia
}

const limpiarFiltros = () => {
  filtroTexto.value = ''
  estadoFiltro.value = ''
}

const limpiarFormularioModal = () => {
  vacanteForm.value = {
    id_vacante: '',
    id_empresa_fk: '',
    id_categoria_fk: '',
    titulo_puesto: '',
    descripcion_puesto: '',
    modalidad: 'Presencial',
    estado: 'Activo'
  }
  modalTitle.value = 'Nueva Vacante'
}

const abrirModalNueva = () => {
  limpiarFormularioModal()
  modalInstance?.show()
}

const abrirModalEditar = (vacante) => {
  vacanteForm.value = {
    id_vacante: vacante.id_vacante,
    id_empresa_fk: vacante.id_empresa_fk || '',
    id_categoria_fk: vacante.id_categoria_fk || '',
    titulo_puesto: vacante.titulo_puesto || '',
    descripcion_puesto: vacante.descripcion_puesto || '',
    modalidad: vacante.modalidad || 'Presencial',
    estado: vacante.estado || 'Activo'
  }
  modalTitle.value = 'Editar Vacante'
  modalInstance?.show()
}

const verVacante = (vacante) => {
  showAlert(`
    <strong>${vacante.titulo_puesto}</strong><br>
    Empresa: ${vacante.nombre_comercial}<br>
    CategorÃ­a: ${vacante.nombre_categoria}<br>
    Modalidad: ${vacante.modalidad || 'N/D'}<br>
    Estado: ${vacante.estado || 'Activo'}<br>
    DescripciÃ³n: ${vacante.descripcion_puesto || 'Sin descripciÃ³n'}
  `, 'info')
}

const exportarLista = () => {
  if (!vacantes.value.length) {
    showAlert('No hay datos para exportar.', 'warning')
    return
  }

  const rows = [
    ['ID', 'Titulo', 'Empresa', 'Categoria', 'Estado', 'Fecha'],
    ...vacantes.value.map(v => [
      v.id_vacante,
      v.titulo_puesto,
      v.nombre_comercial,
      v.nombre_categoria,
      v.estado || 'Activo',
      formatearFecha(v.fecha_publicacion)
    ])
  ]

  const csv = rows.map(row => row.map(cell => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `vacantes_${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
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

onMounted(async () => {
  if (modalVacanteRef.value) {
    modalInstance = new window.bootstrap.Modal(modalVacanteRef.value)
  }
  await cargarCatalogos()
  await cargarVacantes()
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

footer {
  background-color: var(--azul-oscuro);
  color: white;
  margin-top: auto;
}

.modal-content {
  border-radius: 20px;
}

.form-control:focus, .form-select:focus {
  border-color: var(--azul);
  box-shadow: 0 0 0 0.2rem rgba(44, 72, 212, 0.25);
}
</style>