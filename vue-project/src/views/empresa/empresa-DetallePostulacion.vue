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
            <a href="/empresa/postulaciones" class="nav-link-custom active">Postulaciones</a>
            <a href="/empresa/mis-vacantes" class="nav-link-custom">Vacantes</a>
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
            <button class="btn btn-light btn-sm rounded-pill px-3 fw-semibold" @click="handleLogout">Cerrar sesión</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-4 py-lg-5">
      <div class="container px-4 px-lg-5">
        <!-- Botón volver -->
        <div class="mb-3">
          <a href="/empresa/postulaciones" class="btn btn-outline-secondary rounded-pill px-4">
            <i class="bi bi-arrow-left me-2"></i>Volver a postulaciones
          </a>
        </div>

        <!-- Hero Card -->
        <section class="surface-card hero-card p-4 p-lg-5 mb-4">
          <div class="row g-4 align-items-center position-relative">
            <div class="col-12 col-xl-8">
              <span class="badge rounded-pill text-bg-light text-primary fw-semibold mb-3">Revisión de candidato</span>
              <h1 class="display-6 fw-bold mb-2">{{ nombreCompleto }}</h1>
              <p class="mb-3 text-white-50">{{ resumenProfesional || 'Estamos preparando la información completa del postulante y la vacante.' }}</p>
              <div class="d-flex flex-wrap gap-2">
                <span class="badge rounded-pill bg-light text-dark">{{ tituloVacante || 'Vacante' }}</span>
                <span class="badge rounded-pill bg-light text-dark">{{ fechaPostulacionFormateada }}</span>
                <span class="badge rounded-pill bg-light text-dark" v-html="estadoBadge"></span>
              </div>
            </div>
            <div class="col-12 col-xl-4">
              <div class="row g-3">
                <div class="col-6">
                  <div class="metric-card">
                    <div class="metric-icon mb-3"><i class="bi bi-person-lines-fill"></i></div>
                    <div class="small text-muted">Contacto</div>
                    <div class="fw-bold" id="metricContacto">{{ correoPostulante || 'Sin datos' }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-card">
                    <div class="metric-icon mb-3"><i class="bi bi-laptop"></i></div>
                    <div class="small text-muted">Modalidad</div>
                    <div class="fw-bold">{{ modalidadVacante || 'No definida' }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-card">
                    <div class="metric-icon mb-3"><i class="bi bi-cash-stack"></i></div>
                    <div class="small text-muted">Salario</div>
                    <div class="fw-bold">{{ salarioFormateado }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-card">
                    <div class="metric-icon mb-3"><i class="bi bi-building"></i></div>
                    <div class="small text-muted">Empresa</div>
                    <div class="fw-bold">{{ nombreEmpresa || 'Sin datos' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Alertas -->
        <div v-if="alertMessage" class="mb-3">
          <div :class="`alert alert-${alertType} alert-dismissible fade show rounded-4 shadow-sm`" role="alert">
            {{ alertMessage }}
            <button type="button" class="btn-close" @click="alertMessage = ''"></button>
          </div>
        </div>

        <div class="row g-4">
          <!-- Columna izquierda: Postulante y Vacante -->
          <div class="col-12 col-xl-8">
            <section class="detail-card mb-4">
              <div class="d-flex align-items-center gap-3 mb-4">
                <div class="detail-icon"><i class="bi bi-person-vcard"></i></div>
                <div>
                  <h2 class="h4 fw-bold mb-0">Perfil del postulante</h2>
                  <p class="text-muted mb-0">Información base para decidir el siguiente paso.</p>
                </div>
              </div>
              <div class="info-grid">
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <div class="info-item">
                      <div class="info-label">Nombre completo</div>
                      <div class="info-value">{{ nombreCompleto }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="info-item">
                      <div class="info-label">Correo electrónico</div>
                      <div class="info-value">{{ correoPostulante || 'No definido' }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="info-item">
                      <div class="info-label">Teléfono</div>
                      <div class="info-value">{{ telefonoPostulante || 'No definido' }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="info-item">
                      <div class="info-label">Municipio</div>
                      <div class="info-value">{{ municipioPostulante || 'No definido' }}</div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="info-label mb-2">Resumen profesional</div>
                    <div class="text-box">{{ resumenProfesional || 'Sin resumen profesional por ahora.' }}</div>
                  </div>
                </div>
              </div>
            </section>

            <section class="detail-card">
              <div class="d-flex align-items-center gap-3 mb-4">
                <div class="detail-icon"><i class="bi bi-briefcase"></i></div>
                <div>
                  <h2 class="h4 fw-bold mb-0">Vacante asociada</h2>
                  <p class="text-muted mb-0">Contexto de la oportunidad a la que aplicó.</p>
                </div>
              </div>
              <div class="info-grid">
                <div class="row g-3">
                  <div class="col-12 col-md-6">
                    <div class="info-item">
                      <div class="info-label">Puesto</div>
                      <div class="info-value">{{ tituloVacante || 'No definido' }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="info-item">
                      <div class="info-label">Modalidad</div>
                      <div class="info-value">{{ modalidadVacante || 'No definida' }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="info-item">
                      <div class="info-label">Salario ofrecido</div>
                      <div class="info-value">{{ salarioFormateado }}</div>
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <div class="info-item">
                      <div class="info-label">Empresa</div>
                      <div class="info-value">{{ nombreEmpresa || 'No definida' }}</div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="info-label mb-2">Descripción del puesto</div>
                    <div class="text-box">{{ descripcionVacante || 'La vacante no tiene descripción disponible.' }}</div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Columna derecha: Estado, Acciones y Timeline -->
          <div class="col-12 col-xl-4">
            <section class="detail-card mb-4">
              <div class="d-flex align-items-center gap-3 mb-4">
                <div class="detail-icon"><i class="bi bi-diagram-3"></i></div>
                <div>
                  <h2 class="h4 fw-bold mb-0">Estado del proceso</h2>
                  <p class="text-muted mb-0">Actualiza el seguimiento desde esta misma pantalla.</p>
                </div>
              </div>
              <div>
                <div class="info-item mb-3">
                  <div class="info-label">Estado actual</div>
                  <div class="info-value" v-html="estadoBadge"></div>
                </div>
                <div class="info-item mb-3">
                  <div class="info-label">Fecha de postulación</div>
                  <div class="info-value">{{ fechaPostulacionFormateada }}</div>
                </div>
                <div class="info-label mb-2">Actualizar proceso</div>
                <select v-model="nuevoEstadoId" class="form-select form-select-lg rounded-4 mb-3">
                  <option value="1">Recibida</option>
                  <option value="2">En revisión</option>
                  <option value="3">Entrevista</option>
                  <option value="4">Rechazada</option>
                  <option value="5">Contratado</option>
                </select>
                <button class="btn btn-primary w-100 rounded-4" @click="actualizarEstado" :disabled="loading">
                  <i class="bi bi-check2-square me-2"></i>Guardar nuevo estado
                </button>
              </div>
            </section>

            <section class="detail-card mb-4">
              <h3 class="h5 fw-bold mb-3">Acciones rápidas</h3>
              <div class="d-grid gap-2">
                <button class="btn btn-primary rounded-4" @click="copiarCorreo">
                  <i class="bi bi-envelope me-2"></i>Copiar correo
                </button>
                <button class="btn btn-outline-primary rounded-4" @click="prepararContacto">
                  <i class="bi bi-send me-2"></i>Preparar contacto
                </button>
              </div>
            </section>

            <section class="status-panel">
              <h3 class="h5 fw-bold mb-3">Ruta sugerida</h3>
              <ul class="timeline-list">
                <li v-for="step in timelineSteps" :key="step.label" class="timeline-item">
                  <div class="timeline-dot"><i :class="step.icon"></i></div>
                  <div>
                    <div class="fw-semibold">{{ step.label }}</div>
                    <div class="text-muted small">{{ step.detail }}</div>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>

    <!-- Toast -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="toastAccion" class="toast align-items-center text-bg-dark border-0 rounded-4 shadow" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">{{ toastMessage }}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken } from '../../services/api.js'
import { requireAuth, logout } from '../../services/api.js'

// ========== Autenticación ==========
onBeforeMount(() => {
  requireAuth(['empresa'])
})

// ========== Estados reactivos ==========
const loading = ref(false)
const alertMessage = ref('')
const alertType = ref('danger')
const toastMessage = ref('')
let toastInstance = null

// Datos de la postulación
const postulacion = ref(null)
const nuevoEstadoId = ref('1')

// ========== Mapeos de estados ==========
const statusMap = {
  1: { label: 'Recibida', className: 'text-bg-secondary', icon: 'bi-inbox-fill' },
  2: { label: 'En revision', className: 'text-bg-info', icon: 'bi-search' },
  3: { label: 'Entrevista', className: 'text-bg-warning', icon: 'bi-camera-video-fill' },
  4: { label: 'Rechazada', className: 'text-bg-danger', icon: 'bi-x-circle-fill' },
  5: { label: 'Contratado', className: 'text-bg-success', icon: 'bi-check-circle-fill' }
}

const processSteps = [
  { id: 1, label: 'Recibida', detail: 'La empresa ya recibió la postulación.', icon: 'bi-inbox-fill' },
  { id: 2, label: 'En revision', detail: 'El perfil está siendo evaluado.', icon: 'bi-search' },
  { id: 3, label: 'Entrevista', detail: 'El candidato pasó a una conversación formal.', icon: 'bi-camera-video-fill' },
  { id: 5, label: 'Contratado', detail: 'El proceso terminó de forma exitosa.', icon: 'bi-check-circle-fill' }
]

// ========== Computed: datos derivados ==========
const nombreCompleto = computed(() => {
  if (!postulacion.value) return 'Cargando...'
  return `${postulacion.value.nombres || ''} ${postulacion.value.apellidos || ''}`.trim() || 'Sin nombre'
})

const resumenProfesional = computed(() => postulacion.value?.resumen_profesional || null)
const correoPostulante = computed(() => postulacion.value?.correo_electronico || null)
const telefonoPostulante = computed(() => postulacion.value?.telefono || null)
const municipioPostulante = computed(() => postulacion.value?.id_municipio_fk || null)
const tituloVacante = computed(() => postulacion.value?.titulo_puesto || null)
const modalidadVacante = computed(() => postulacion.value?.modalidad || null)
const nombreEmpresa = computed(() => postulacion.value?.nombre_comercial || null)
const descripcionVacante = computed(() => postulacion.value?.descripcion_puesto || null)
const estadoId = computed(() => Number(postulacion.value?.id_estado_fk) || 1)
const estadoNombre = computed(() => postulacion.value?.nombre_estado || 'Recibida')

const salarioFormateado = computed(() => {
  const amount = Number(postulacion.value?.salario_offrecido)
  if (isNaN(amount)) return 'No definido'
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
})

const fechaPostulacionFormateada = computed(() => {
  const fecha = postulacion.value?.fecha_postulacion
  if (!fecha) return 'Sin fecha'
  const date = new Date(fecha)
  return isNaN(date.getTime()) ? 'Sin fecha' : date.toLocaleDateString('es-SV', { dateStyle: 'long' })
})

const estadoBadge = computed(() => {
  const config = statusMap[estadoId.value] || {
    className: 'text-bg-secondary',
    icon: 'bi-dot',
    label: estadoNombre.value
  }
  return `<span class="badge ${config.className} rounded-pill px-3 py-2"><i class="bi ${config.icon} me-2"></i>${config.label}</span>`
})

const timelineSteps = computed(() => {
  const isRejected = estadoId.value === 4
  if (isRejected) {
    return [
      { label: 'Recibida', detail: 'La empresa recibió la postulación.', icon: 'bi-inbox-fill' },
      { label: 'Revisión', detail: 'El perfil fue revisado por el equipo.', icon: 'bi-search' },
      { label: 'Cierre', detail: 'Se definió un rechazo para esta vacante.', icon: 'bi-x-circle-fill' }
    ]
  }
  return processSteps.map(step => ({
    ...step,
    icon: statusMap[step.id]?.icon || 'bi-dot'
  }))
})

// ========== Funciones auxiliares ==========
const showAlert = (message, type = 'danger') => {
  alertMessage.value = message
  alertType.value = type
  setTimeout(() => {
    alertMessage.value = ''
  }, 5000)
}

const showToast = (message) => {
  toastMessage.value = message
  if (toastInstance) toastInstance.show()
}

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
})

const getPostulacionId = () => {
  const params = new URLSearchParams(window.location.search)
  return params.get('id')
}

// ========== Carga de datos ==========
const cargarDetalle = async () => {
  const id = getPostulacionId()
  if (!id) {
    showAlert('No se encontró el ID de la postulación.')
    return
  }

  loading.value = true
  try {
    const response = await fetch(`${API_URL}/empresa/postulaciones/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    const data = await response.json()

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudo cargar el detalle.')
      return
    }

    postulacion.value = data
    nuevoEstadoId.value = String(data.id_estado_fk || 1)
  } catch (error) {
    console.error(error)
    showAlert('Error de conexión con el servidor.')
  } finally {
    loading.value = false
  }
}

// ========== Actualizar estado ==========
const actualizarEstado = async () => {
  if (!postulacion.value) return

  try {
    const response = await fetch(`${API_URL}/postulaciones/${postulacion.value.id_postulacion}/estado`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify({ id_estado_fk: Number(nuevoEstadoId.value) })
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.mensaje || 'No se pudo actualizar el estado.')

    // Actualizar localmente
    postulacion.value.id_estado_fk = Number(nuevoEstadoId.value)
    postulacion.value.nombre_estado = statusMap[nuevoEstadoId.value]?.label || 'Actualizado'

    showAlert('Estado actualizado correctamente.', 'success')
    showToast('Estado del proceso actualizado.')
  } catch (error) {
    console.error(error)
    showAlert(error.message || 'No se pudo actualizar el estado.')
  }
}

// ========== Acciones rápidas ==========
const copiarCorreo = async () => {
  const email = postulacion.value?.correo_electronico
  if (!email) {
    showAlert('No hay correo disponible para copiar.')
    return
  }
  try {
    await navigator.clipboard.writeText(email)
    showToast('Correo copiado al portapapeles.')
  } catch {
    showAlert('No se pudo copiar el correo.')
  }
}

const prepararContacto = () => {
  const email = postulacion.value?.correo_electronico
  if (!email) {
    showAlert('No hay correo disponible para este postulante.')
    return
  }
  const subject = encodeURIComponent(`Seguimiento de postulación - ${postulacion.value.titulo_puesto || 'Vacante'}`)
  const body = encodeURIComponent(`Hola ${postulacion.value.nombres || ''},%0D%0A%0D%0ATe contactamos para dar seguimiento a tu postulación.%0D%0A%0D%0ASaludos.`)
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
}

const handleLogout = () => {
  logout()
}

// ========== Ciclo de vida ==========
onMounted(() => {
  const toastEl = document.getElementById('toastAccion')
  if (toastEl) toastInstance = new window.bootstrap.Toast(toastEl)
  cargarDetalle()
})
</script>

<style scoped>
:root {
  --nav-bg: #011671;
  --page-bg: linear-gradient(180deg, #eef4ff 0%, #f8fbff 100%);
  --primary-deep: #3f51b5;
  --card-shadow: 0 24px 40px -18px rgba(1, 22, 113, 0.16);
}

body {
  font-family: "Inter", sans-serif;
  background: var(--page-bg);
  color: #172033;
}

.navbar-custom {
  background: var(--nav-bg);
}

.nav-link-custom {
  color: #fff;
  text-decoration: none;
  padding: 0.65rem 1rem;
  border-radius: 999px;
  transition: 0.2s ease;
}

.nav-link-custom:hover,
.nav-link-custom.active {
  background: rgba(255, 255, 255, 0.12);
}

.surface-card {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.72);
  box-shadow: var(--card-shadow);
}

.hero-card {
  background: linear-gradient(140deg, #0d1d85 0%, #4b61cb 60%, #95a6ff 100%);
  color: #fff;
  overflow: hidden;
  position: relative;
}

.hero-card::after {
  content: "";
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  right: -80px;
  top: -60px;
  background: rgba(255, 255, 255, 0.12);
}

.metric-card,
.detail-card {
  border-radius: 24px;
  border: 1px solid #e7edf8;
  background: #fff;
  box-shadow: 0 20px 34px -26px rgba(15, 23, 42, 0.38);
}

.metric-card {
  padding: 1.2rem;
}

.metric-icon,
.detail-icon {
  width: 52px;
  height: 52px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: #eef2ff;
  color: var(--primary-deep);
}

.detail-card {
  padding: 1.5rem;
}

.info-grid {
  display: grid;
  gap: 1rem;
}

.info-item {
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: #f8faff;
  border: 1px solid #e7edf8;
}

.info-label {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
  margin-bottom: 0.35rem;
  font-weight: 700;
}

.info-value {
  font-weight: 600;
  color: #172033;
}

.text-box {
  background: linear-gradient(180deg, #f8faff 0%, #f2f6fd 100%);
  border: 1px solid #e6ecf7;
  border-radius: 20px;
  padding: 1rem 1.1rem;
  min-height: 120px;
  color: #4b5563;
  white-space: pre-line;
}

.status-panel {
  background: linear-gradient(180deg, #f9fbff 0%, #eff4ff 100%);
  border-radius: 24px;
  border: 1px solid #dfE7f6;
  padding: 1.2rem;
}

.timeline-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.timeline-item {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
}

.timeline-dot {
  width: 38px;
  height: 38px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #eef2ff;
  color: var(--primary-deep);
  flex-shrink: 0;
}

.notification-badge {
  min-width: 1.4rem;
}
</style>