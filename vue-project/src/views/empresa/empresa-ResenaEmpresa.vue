<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal/index.html">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Panel de empresa</span>
          </div>
        </a>
        <div class="collapse navbar-collapse show">
          <div class="navbar-nav mx-auto mt-3 mt-lg-0 gap-1">
            <a href="/empresa/publicar-vacante" class="nav-link-custom"><i class="bi bi-plus-circle me-1"></i> Publicar</a>
            <a href="/empresa/mis-vacantes" class="nav-link-custom"><i class="bi bi-briefcase me-1"></i> Mis vacantes</a>
            <a href="/empresa/postulaciones" class="nav-link-custom"><i class="bi bi-people me-1"></i> Postulaciones</a>
            <a href="/empresa/foro" class="nav-link-custom"><i class="bi bi-chat-dots me-1"></i> Foro</a>
            <a href="/empresa/resena-empresa" class="nav-link-custom active"><i class="bi bi-star me-1"></i> ReseÃ±as</a>
          </div>
          <div class="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
            <a href="/empresa/notificaciones" class="text-white position-relative d-inline-block">
              <i class="bi bi-bell-fill fs-3"></i>
              <span class="notification-badge">0</span>
            </a>
            <a href="/empresa/perfil" class="text-white d-inline-block">
              <i class="bi bi-person-circle fs-2"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-4 py-lg-5">
      <div class="container-fluid px-4 px-lg-5">
        <!-- Hero -->
        <section class="surface-card hero-card p-4 p-lg-5 mb-4">
          <div class="row g-4 align-items-center position-relative">
            <div class="col-12 col-xl-7">
              <span class="badge rounded-pill text-bg-light text-primary fw-semibold mb-3">Reputacion y referencias</span>
              <h1 class="display-6 fw-bold mb-2">Gestiona lo que opinan de tu empresa y de tus candidatos</h1>
              <p class="mb-0 text-white-50">Revisa comentarios de usuarios, deja evaluaciones internas y consulta referencias externas antes de decidir.</p>
            </div>
            <div class="col-12 col-xl-5">
              <div class="row g-3">
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Promedio empresa</div>
                    <div class="fs-4 fw-bold">{{ (resumenEmpresa.promedio || 0).toFixed(1) }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">ReseÃ±as empresa</div>
                    <div class="fs-4 fw-bold">{{ resumenEmpresa.total_valoraciones || 0 }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Mis reseÃ±as</div>
                    <div class="fs-4 fw-bold">{{ resenas.length }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Referencias externas</div>
                    <div class="fs-4 fw-bold">{{ resenasExternas.length }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div v-if="alertMessage" class="mb-3">
          <div :class="`alert alert-${alertType} alert-dismissible fade show rounded-4 shadow-sm`" role="alert">
            {{ alertMessage }}
            <button type="button" class="btn-close" @click="alertMessage = ''"></button>
          </div>
        </div>

        <div class="row g-4">
          <!-- SecciÃ³n izquierda: reseÃ±as de empresa y referencias externas -->
          <section class="col-12 col-xl-7">
            <div class="section-card mb-4">
              <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
                <div>
                  <h2 class="h4 fw-bold mb-1">ReseÃ±as sobre tu empresa</h2>
                  <p class="text-muted mb-0">Lo que los usuarios que postularon quieren destacar de tu proceso.</p>
                </div>
                <div class="text-lg-end">
                  <div class="fw-bold fs-4">{{ (resumenEmpresa.promedio || 0).toFixed(1) }}</div>
                  <div class="text-muted small">{{ resumenEmpresa.total_valoraciones || 0 }} reseÃ±as</div>
                </div>
              </div>
              <div class="d-grid gap-3">
                <div v-if="valoracionesEmpresa.length === 0" class="empty-state text-center p-4">
                  <div class="mb-2"><i class="bi bi-chat-square-heart fs-2 text-primary"></i></div>
                  <p class="text-muted mb-0">Tu empresa aÃºn no tiene comentarios publicados por usuarios.</p>
                </div>
                <article v-for="v in valoracionesEmpresa" :key="v.id_valoracion" class="review-card">
                  <div class="d-flex gap-3">
                    <div class="avatar-circle flex-shrink-0">{{ getInitials(v.nombre_usuario) }}</div>
                    <div class="flex-grow-1">
                      <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
                        <div>
                          <h3 class="h6 fw-bold mb-1">{{ v.nombre_usuario }}</h3>
                          <div class="stars" v-html="renderStars(v.puntuacion)"></div>
                        </div>
                        <small class="text-muted">{{ formatearFecha(v.fecha_valoracion) }}</small>
                      </div>
                      <p class="text-muted mb-0">{{ v.comentario || 'Sin comentario adicional.' }}</p>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div class="section-card">
              <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
                <div>
                  <h2 class="h4 fw-bold mb-1">Referencias externas de tus postulantes</h2>
                  <p class="text-muted mb-0">Opiniones que otras empresas dejaron sobre candidatos que tambiÃ©n aplicaron contigo.</p>
                </div>
                <span class="badge text-bg-light rounded-pill align-self-lg-start">{{ resenasExternas.length }} referencias</span>
              </div>
              <div class="d-grid gap-3">
                <div v-if="resenasExternas.length === 0" class="empty-state text-center p-4">
                  <div class="mb-2"><i class="bi bi-diagram-3 fs-2 text-primary"></i></div>
                  <p class="text-muted mb-0">TodavÃ­a no hay referencias externas para tus postulantes actuales.</p>
                </div>
                <article v-for="r in resenasExternas" :key="r.id_resena" class="review-card">
                  <div class="d-flex gap-3">
                    <div class="avatar-circle flex-shrink-0">{{ getInitials(r.nombres + ' ' + r.apellidos) }}</div>
                    <div class="flex-grow-1">
                      <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
                        <div>
                          <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
                            <h3 class="h6 fw-bold mb-0">{{ r.nombres }} {{ r.apellidos }}</h3>
                            <span class="badge text-bg-light rounded-pill">{{ r.nombre_comercial }}</span>
                          </div>
                          <p class="text-muted small mb-0">Referenciado por {{ r.nombre_comercial }} para {{ r.titulo_puesto }}</p>
                        </div>
                        <small class="text-muted">{{ formatearFecha(r.fecha_resena) }}</small>
                      </div>
                      <div class="stars mb-2" v-html="renderStars(r.puntuacion)"></div>
                      <p class="text-muted mb-3">{{ r.comentario || 'Sin comentario adicional.' }}</p>
                      <div class="d-flex gap-2 flex-wrap" v-html="renderTags(r.etiquetas || [])"></div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <!-- Columna derecha: formulario y resÃºmenes -->
          <aside class="col-12 col-xl-5">
            <!-- Formulario para crear/actualizar reseÃ±a -->
            <div class="form-card mb-4">
              <h2 class="h4 fw-bold mb-3">Crear o actualizar reseÃ±a de postulante</h2>
              <p class="text-muted mb-4">Documenta tu experiencia con cada candidato para dar seguimiento mÃ¡s claro al proceso.</p>
              <div class="mb-3">
                <label class="form-label fw-semibold small">PostulaciÃ³n</label>
                <select class="form-select rounded-4" v-model="selectedPostulacionId">
                  <option value="">Selecciona una postulaciÃ³n</option>
                  <option v-for="p in postulaciones" :key="p.id_postulacion" :value="p.id_postulacion">
                    {{ p.nombres }} {{ p.apellidos }} | {{ p.titulo_puesto }} {{ p.id_resena ? '(con reseÃ±a)' : '' }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold small">PuntuaciÃ³n</label>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <i v-for="i in 5" :key="i" class="bi star-interactive"
                     :class="i <= puntuacionTemporal ? 'bi-star-fill active' : 'bi-star'"
                     @click="puntuacionTemporal = i"></i>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold small">Comentario</label>
                <textarea class="form-control rounded-4" rows="4" placeholder="Describe fortalezas, comunicaciÃ³n, ajuste al perfil y nivel de seguimiento" v-model="comentarioTemporal"></textarea>
              </div>
              <div class="mb-4">
                <label class="form-label fw-semibold small">Etiquetas</label>
                <input class="form-control rounded-4" placeholder="Ej: puntual, buena comunicaciÃ³n, perfil tÃ©cnico" v-model="etiquetasStr">
                <div class="form-text">SepÃ¡ralas con comas.</div>
              </div>
              <button type="button" class="btn btn-primary w-100 rounded-pill py-3" @click="guardarResena" :disabled="cargando">Guardar reseÃ±a</button>
            </div>

            <!-- Resumen de evaluaciÃ³n -->
            <div class="summary-card mb-4">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h3 class="h5 fw-bold mb-0">Resumen de evaluaciÃ³n</h3>
                <span class="badge text-bg-light rounded-pill">{{ cobertura }}%</span>
              </div>
              <div class="d-flex justify-content-between py-2 border-bottom">
                <span class="text-muted">Promedio otorgado</span>
                <strong>{{ promedioMisResenas }}</strong>
              </div>
              <div class="d-flex justify-content-between py-2 border-bottom">
                <span class="text-muted">Total reseÃ±as</span>
                <strong>{{ resenas.length }}</strong>
              </div>
              <div class="d-flex justify-content-between py-2">
                <span class="text-muted">Postulaciones cubiertas</span>
                <strong>{{ postulacionesResenables }}</strong>
              </div>
            </div>

            <!-- Ãšltimas reseÃ±as propias -->
            <div class="section-card">
              <div class="d-flex align-items-center justify-content-between mb-3">
                <h3 class="h5 fw-bold mb-0">Tus Ãºltimas reseÃ±as</h3>
                <span class="badge text-bg-light rounded-pill">{{ resenas.length }} reseÃ±as</span>
              </div>
              <div class="d-grid gap-3">
                <div v-if="resenas.length === 0" class="empty-state text-center p-4">
                  <div class="mb-2"><i class="bi bi-stars fs-2 text-primary"></i></div>
                  <p class="text-muted mb-0">TodavÃ­a no has creado reseÃ±as para tus postulantes.</p>
                </div>
                <article v-for="r in resenas" :key="r.id_resena" class="review-card">
                  <div class="d-flex gap-3">
                    <div class="avatar-circle flex-shrink-0">{{ getInitials(r.nombres + ' ' + r.apellidos) }}</div>
                    <div class="flex-grow-1">
                      <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
                        <div>
                          <h3 class="h6 fw-bold mb-1">{{ r.nombres }} {{ r.apellidos }}</h3>
                          <p class="text-muted small mb-0">Postulante a {{ r.titulo_puesto }}</p>
                        </div>
                        <small class="text-muted">{{ formatearFecha(r.fecha_resena) }}</small>
                      </div>
                      <div class="stars mb-2" v-html="renderStars(r.puntuacion)"></div>
                      <p class="text-muted mb-3">{{ r.comentario || 'Sin comentario adicional.' }}</p>
                      <div class="d-flex gap-2 flex-wrap" v-html="renderTags(r.etiquetas || [])"></div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <footer class="py-4 mt-auto footer-custom text-center text-white-50">
      <div class="container">Workly 2026 | Seguimiento real del talento y tu reputaciÃ³n</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount, watch } from 'vue'
import { API_URL, getToken } from '../../services/api.js'
import { requireAuth } from '../../services/api.js'

onBeforeMount(() => {
  requireAuth(['empresa'])
})

// ========== Datos reactivos ==========
const postulaciones = ref([])
const resenas = ref([])
const resenasExternas = ref([])
const valoracionesEmpresa = ref([])
const resumenEmpresa = ref({ promedio: 0, total_valoraciones: 0 })
const alertMessage = ref('')
const alertType = ref('danger')
const cargando = ref(false)

// Formulario de reseÃ±a
const selectedPostulacionId = ref('')
const puntuacionTemporal = ref(0)
const comentarioTemporal = ref('')
const etiquetasStr = ref('')

// ========== Computed ==========
const postulacionesResenables = computed(() => postulaciones.value.length)
const promedioMisResenas = computed(() => {
  if (resenas.value.length === 0) return '0.0'
  const total = resenas.value.reduce((acc, r) => acc + (Number(r.puntuacion) || 0), 0)
  return (total / resenas.value.length).toFixed(1)
})
const cobertura = computed(() => {
  if (postulacionesResenables.value === 0) return 0
  return Math.round((resenas.value.length / postulacionesResenables.value) * 100)
})

// Watch para cargar datos de postulaciÃ³n seleccionada
watch(selectedPostulacionId, (newId) => {
  if (!newId) {
    puntuacionTemporal.value = 0
    comentarioTemporal.value = ''
    etiquetasStr.value = ''
    return
  }
  const post = postulaciones.value.find(p => p.id_postulacion === Number(newId))
  if (post) {
    puntuacionTemporal.value = post.puntuacion || 0
    comentarioTemporal.value = post.comentario || ''
    etiquetasStr.value = Array.isArray(post.etiquetas) ? post.etiquetas.join(', ') : ''
  } else {
    puntuacionTemporal.value = 0
    comentarioTemporal.value = ''
    etiquetasStr.value = ''
  }
})

// ========== Funciones auxiliares ==========
const authHeaders = (withJson = false) => ({
  ...(withJson ? { 'Content-Type': 'application/json' } : {}),
  Authorization: `Bearer ${getToken()}`
})

const showAlert = (message, type = 'danger') => {
  alertMessage.value = message
  alertType.value = type
  setTimeout(() => { alertMessage.value = '' }, 5000)
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'Reciente'
  const d = new Date(fecha)
  return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleDateString('es-SV', { dateStyle: 'medium' })
}

const renderStars = (puntuacion) => {
  const full = Math.round(Number(puntuacion) || 0)
  return Array.from({ length: 5 }, (_, i) =>
    `<i class="bi ${i < full ? 'bi-star-fill' : 'bi-star'}" style="color: #ffb347;"></i>`
  ).join(' ')
}

const getInitials = (nombreCompleto) => {
  const partes = String(nombreCompleto || '').trim().split(' ')
  const primera = partes[0]?.[0] || ''
  const segunda = partes[1]?.[0] || ''
  return (primera + segunda).toUpperCase()
}

const renderTags = (tags) => {
  if (!tags.length) return '<span class="text-muted small">Sin etiquetas registradas</span>'
  return tags.map(tag => `<span class="tag-chip">${tag}</span>`).join('')
}

// ========== Cargar datos desde API ==========
const cargarPanel = async () => {
  try {
    const res = await fetch(`${API_URL}/empresa/resenas-postulantes`, {
      headers: authHeaders()
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.mensaje || 'No se pudieron cargar las reseÃ±as.')

    postulaciones.value = Array.isArray(data.postulaciones) ? data.postulaciones : []
    resenas.value = Array.isArray(data.resenas) ? data.resenas : []
    resenasExternas.value = Array.isArray(data.resenas_externas) ? data.resenas_externas : []
    valoracionesEmpresa.value = Array.isArray(data.valoraciones_empresa) ? data.valoraciones_empresa : []
    resumenEmpresa.value = data.resumen_empresa || { promedio: 0, total_valoraciones: 0 }
  } catch (err) {
    console.error(err)
    showAlert(err.message || 'No se pudo cargar la vista.')
  }
}

// ========== Guardar reseÃ±a ==========
const guardarResena = async () => {
  if (!selectedPostulacionId.value) {
    showAlert('Selecciona una postulaciÃ³n.')
    return
  }
  if (puntuacionTemporal.value === 0) {
    showAlert('Selecciona una puntuaciÃ³n.')
    return
  }
  if (!comentarioTemporal.value.trim()) {
    showAlert('Escribe una reseÃ±a.')
    return
  }

  cargando.value = true
  try {
    const etiquetas = etiquetasStr.value.split(',').map(t => t.trim()).filter(Boolean)
    const res = await fetch(`${API_URL}/empresa/resenas-postulantes`, {
      method: 'POST',
      headers: authHeaders(true),
      body: JSON.stringify({
        id_postulacion_fk: Number(selectedPostulacionId.value),
        puntuacion: puntuacionTemporal.value,
        comentario: comentarioTemporal.value.trim(),
        etiquetas
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.mensaje || 'No se pudo guardar la reseÃ±a.')

    showAlert('ReseÃ±a guardada correctamente.', 'success')
    await cargarPanel()
    // Limpiar formulario
    selectedPostulacionId.value = ''
    puntuacionTemporal.value = 0
    comentarioTemporal.value = ''
    etiquetasStr.value = ''
  } catch (err) {
    showAlert(err.message)
  } finally {
    cargando.value = false
  }
}

// ========== Inicializar ==========
onMounted(() => {
  cargarPanel()
})
</script>

<style scoped>
* { font-family: "Inter", sans-serif; }
:root {
  --nav-bg: #011671;
  --page-bg: linear-gradient(180deg, #eef4ff 0%, #f9fbff 100%);
  --primary-deep: #3f51b5;
  --surface-shadow: 0 24px 42px -24px rgba(1, 22, 113, 0.28);
}
body { background: var(--page-bg); color: #182033; }
.navbar-custom, .footer-custom { background-color: var(--nav-bg) !important; }
.nav-link-custom {
  color: white !important;
  font-weight: 500;
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  text-decoration: none;
  transition: 0.2s ease;
}
.nav-link-custom.active, .nav-link-custom:hover { background: rgba(255,255,255,0.16); }
.brand-icon { font-size: 3.5rem; color: white; margin-right: 0.75rem; }
.brand-text { color: white; font-weight: 700; font-size: 2rem; line-height: 1.2; }
.brand-sub { color: #e2e4e8; font-size: 0.95rem; }
.surface-card {
  background: rgba(255,255,255,0.96);
  border: 1px solid rgba(255,255,255,0.74);
  border-radius: 30px;
  box-shadow: var(--surface-shadow);
}
.hero-card {
  background: linear-gradient(135deg, #071a88 0%, #3d56c3 58%, #89a0ff 100%);
  color: white;
  overflow: hidden;
  position: relative;
}
.hero-card::after {
  content: "";
  position: absolute;
  width: 260px;
  height: 260px;
  right: -70px;
  bottom: -90px;
  border-radius: 50%;
  background: rgba(255,255,255,0.14);
}
.metric-pill {
  background: rgba(255,255,255,0.14);
  border: 1px solid rgba(255,255,255,0.22);
  border-radius: 22px;
  padding: 1rem 1.1rem;
  backdrop-filter: blur(12px);
}
.section-card, .review-card, .form-card, .summary-card {
  background: #fff;
  border-radius: 26px;
  border: 1px solid #e7edf7;
  box-shadow: 0 18px 30px -24px rgba(15, 23, 42, 0.35);
}
.section-card, .form-card, .summary-card { padding: 1.5rem; }
.review-card { padding: 1.25rem; }
.avatar-circle {
  width: 52px;
  height: 52px;
  background: #eef2ff;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-deep);
  font-weight: 700;
  font-size: 1.1rem;
}
.stars { color: #ffb347; letter-spacing: 2px; }
.star-interactive {
  cursor: pointer;
  font-size: 1.8rem;
  color: #cdd2dc;
  transition: color 0.15s ease, transform 0.15s ease;
}
.star-interactive:hover,
.star-interactive.active {
  color: #ffb347;
  transform: translateY(-1px);
}
.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 0.25rem 0.45rem;
  font-size: 0.7rem;
  font-weight: bold;
  border: 2px solid white;
}
.tag-chip {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 0.45rem 0.8rem;
  background: #f3f6fb;
  color: #42506b;
  font-size: 0.84rem;
  font-weight: 600;
}
.empty-state {
  border: 1px dashed #cdd8ea;
  background: #f8fafc;
  border-radius: 24px;
}
</style>