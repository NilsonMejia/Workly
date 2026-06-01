<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal/index.html">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Panel de Empresa</span>
          </div>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <div class="navbar-nav mx-auto mt-3 mt-lg-0 gap-1">
            <a href="/empresa/publicar-vacante" class="nav-link-custom text-decoration-none"><i class="bi bi-plus-circle me-1"></i> Publicar</a>
            <a href="/empresa/mis-vacantes" class="nav-link-custom text-decoration-none"><i class="bi bi-briefcase me-1"></i> Mis vacantes</a>
            <a href="/empresa/postulaciones" class="nav-link-custom active text-decoration-none"><i class="bi bi-people me-1"></i> Postulaciones</a>
            <a href="/empresa/foro" class="nav-link-custom text-decoration-none"><i class="bi bi-chat-dots me-1"></i> Foro</a>
            <a href="/empresa/resena-empresa" class="nav-link-custom text-decoration-none"><i class="bi bi-star me-1"></i> ReseÃ±as</a>
          </div>
          <div class="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
            <a href="/empresa/notificaciones" class="text-white position-relative d-inline-block">
              <i class="bi bi-bell-fill fs-3"></i>
              <span class="notification-badge">2</span>
            </a>
            <a href="/empresa/perfil" class="text-white d-inline-block">
              <i class="bi bi-person-circle fs-2"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-4">
      <div class="container-fluid px-4 px-lg-5">
        <!-- Filter bar -->
        <div class="filter-bar mb-4 p-3 d-flex align-items-center flex-wrap gap-3">
          <div class="d-flex align-items-center">
            <i class="bi bi-people-fill fs-2 me-2" style="color: var(--primary-deep);"></i>
            <h4 class="fw-bold mb-0" style="color: #121826;">GestiÃ³n de Postulantes</h4>
          </div>
          <div class="ms-auto d-flex gap-2 flex-wrap">
            <div class="input-group" style="max-width: 260px;">
              <span class="input-group-text bg-transparent border-0 text-muted"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control bg-transparent border-0 shadow-none" placeholder="Buscar por nombre o correo..." v-model="searchTerm">
            </div>
            <select class="form-select w-auto rounded-pill bg-light border-0 fw-medium" v-model="filterVacante">
              <option value="Todas las vacantes">Todas las vacantes</option>
              <option v-for="v in vacantesUnicas" :key="v" :value="v">{{ v }}</option>
            </select>
            <select class="form-select w-auto rounded-pill bg-light border-0 fw-medium" v-model="filterEstado">
              <option value="Todos los estados">Todos los estados</option>
              <option v-for="e in estadosUnicos" :key="e" :value="e">{{ e }}</option>
            </select>
          </div>
        </div>

        <div class="row g-4">
          <!-- Lista de candidatos -->
          <section class="col-12 col-xl-8">
            <div id="contenedorPostulaciones">
              <div v-if="filteredPostulaciones.length === 0" class="text-center p-5 fw-bold text-muted">No hay postulantes registrados.</div>
              <div v-for="p in filteredPostulaciones" :key="p.id_postulacion" class="candidate-card">
                <div class="d-flex align-items-center flex-wrap gap-3">
                  <div class="d-flex align-items-center gap-3 flex-grow-1">
                    <div class="avatar-circle">{{ getInitials(p) }}</div>
                    <div>
                      <h6 class="fw-bold mb-1">{{ p.nombres }} {{ p.apellidos }}</h6>
                      <p class="text-secondary small mb-0">{{ p.correo_electronico || 'Sin correo' }} Â· {{ p.titulo_puesto || 'Vacante' }}</p>
                    </div>
                    <div class="ms-md-4">
                      <span class="badge bg-light text-dark px-3 py-2">{{ p.titulo_puesto }}</span>
                    </div>
                    <div class="ms-auto text-end">
                      <select class="form-select form-select-sm rounded-pill fw-bold" :class="getEstadoClass(p.id_estado_fk)" style="border: none;" @change="cambiarEstado(p.id_postulacion, $event.target.value)">
                        <option value="1" :selected="p.id_estado_fk === 1">Recibida</option>
                        <option value="2" :selected="p.id_estado_fk === 2">En RevisiÃ³n</option>
                        <option value="3" :selected="p.id_estado_fk === 3">Entrevista</option>
                        <option value="4" :selected="p.id_estado_fk === 4">Rechazada</option>
                        <option value="5" :selected="p.id_estado_fk === 5">Contratado</option>
                      </select>
                      <p class="text-secondary small mb-0 mt-1">Postulado: {{ formatDate(p.fecha_postulacion) }}</p>
                    </div>
                  </div>
                  <div class="d-flex gap-2">
                    <button class="action-btn" title="Ver perfil" @click="abrirPerfil(p)"><i class="bi bi-eye"></i></button>
                    <button class="action-btn" title="Contactar" @click="abrirContacto(p)"><i class="bi bi-chat-dots"></i></button>
                    <a class="action-btn text-decoration-none" :href="`/empresa/detalle-postulacion?id=${p.id_postulacion}`" title="Abrir detalle"><i class="bi bi-box-arrow-up-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Sidebar -->
          <aside class="col-12 col-xl-4">
            <!-- Resumen -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-pie-chart me-2" style="color: var(--primary-deep);"></i>Resumen de postulaciones</h6>
              <div class="d-flex align-items-center gap-4">
                <div style="width: 100px; height: 100px;">
                  <svg viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#e9ecf9" stroke-width="4"/>
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#3f51b5" stroke-width="4" stroke-dasharray="25 75" stroke-dashoffset="25" stroke-linecap="round" transform="rotate(-90 20 20)"/>
                    <circle cx="20" cy="20" r="16" fill="none" stroke="#28a745" stroke-width="4" stroke-dasharray="15 85" stroke-dashoffset="5" stroke-linecap="round" transform="rotate(-90 20 20)"/>
                  </svg>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between small"><span>En revisiÃ³n</span> <span class="fw-bold">{{ resumen.revision }}</span></div>
                  <div class="d-flex justify-content-between small"><span>Entrevistas</span> <span class="fw-bold">{{ resumen.entrevistas }}</span></div>
                  <div class="d-flex justify-content-between small"><span>Aprobados</span> <span class="fw-bold">{{ resumen.aprobados }}</span></div>
                </div>
              </div>
              <hr class="my-3">
              <div class="d-flex justify-content-between">
                <span class="fw-medium">Total postulantes</span>
                <span class="fw-bold fs-5" style="color: var(--primary-deep);">{{ resumen.total }}</span>
              </div>
            </div>

            <!-- Vacantes mÃ¡s activas -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-bar-chart-line me-2" style="color: var(--primary-deep);"></i>Vacantes mÃ¡s activas</h6>
              <div class="d-flex flex-column gap-3">
                <div v-for="(item, idx) in topVacantes" :key="idx">
                  <div class="d-flex justify-content-between small fw-medium mb-1">
                    <span>{{ item.titulo }}</span>
                    <span>{{ item.total }}</span>
                  </div>
                  <div class="progress" style="height:6px;"><div class="progress-bar" :style="{ width: `${Math.min(100, item.total * 12)}%`, background: 'var(--primary-deep)' }"></div></div>
                </div>
              </div>
            </div>

            <!-- Recientes -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-clock-history me-2" style="color: var(--primary-deep);"></i>Recientes</h6>
              <div class="d-flex flex-column gap-3">
                <div v-for="p in postulaciones.slice(0,3)" :key="p.id_postulacion" class="d-flex align-items-center gap-3">
                  <div class="avatar-circle" style="width:40px; height:40px; font-size:0.9rem;">{{ getInitials(p) }}</div>
                  <div>
                    <span class="fw-semibold d-block">{{ p.nombres }} {{ p.apellidos }}</span>
                    <small class="text-secondary">{{ formatDate(p.fecha_postulacion) }}</small>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <!-- Modal Perfil Candidato -->
    <div class="modal fade" id="modalPerfilCandidato" tabindex="-1" ref="modalPerfilRef">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 rounded-4 shadow-lg">
          <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
            <h5 class="modal-title fw-bold" style="color: #121826;">Perfil del Candidato</h5>
            <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body px-4 py-4">
            <div class="d-flex align-items-center mb-4">
              <div class="bg-light p-4 rounded-4 me-4"><i class="bi bi-person display-4" style="color: var(--primary-deep);"></i></div>
              <div>
                <h4 class="fw-bold mb-1" id="perfilNombre">{{ selectedPostulante?.nombres }} {{ selectedPostulante?.apellidos }}</h4>
                <p class="fw-semibold mb-0" style="color: var(--primary-deep);" id="perfilPuesto">{{ selectedPostulante?.titulo_puesto || 'Postulante' }}</p>
              </div>
            </div>
            <hr>
            <div class="row g-3">
              <div class="col-md-6">
                <label class="text-secondary small">Correo</label>
                <p class="fw-medium">{{ selectedPostulante?.correo_electronico || '---' }}</p>
              </div>
              <div class="col-md-6">
                <label class="text-secondary small">TelÃ©fono</label>
                <p class="fw-medium">{{ selectedPostulante?.telefono || '---' }}</p>
              </div>
              <div class="col-12">
                <label class="text-secondary small">CV / Resumen</label>
                <p class="fw-medium">{{ selectedPostulante?.resumen_profesional || 'Sin resumen profesional.' }}</p>
              </div>
            </div>
          </div>
          <div class="modal-footer border-top-0 px-4 pb-4">
            <button type="button" class="btn btn-primary-deep px-4" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Contactar -->
    <div class="modal fade" id="modalContactar" tabindex="-1" ref="modalContactarRef">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content border-0 rounded-4 shadow-lg">
          <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
            <h5 class="modal-title fw-bold" style="color: #121826;">Contactar Candidato</h5>
            <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body px-4 py-4">
            <div class="mb-3">
              <label class="form-label small fw-semibold">Para:</label>
              <input type="text" class="form-control bg-light border-0 rounded-3 py-2 fw-medium" readonly :value="contactoDestino">
            </div>
            <div class="mb-4">
              <label class="form-label small fw-semibold">Mensaje:</label>
              <textarea class="form-control bg-light border-0 rounded-3 py-2" rows="5" placeholder="Escribe tu mensaje..." v-model="mensajeContacto"></textarea>
            </div>
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-primary-deep px-4" @click="enviarMensaje">Enviar mensaje</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="py-4 mt-auto footer-custom">
      <div class="container text-center">
        <div class="d-flex flex-wrap justify-content-center gap-4 gap-md-5">
          <a href="#"><i class="bi bi-question-circle me-1"></i>Ayuda</a>
          <a href="#"><i class="bi bi-shield-lock me-1"></i>Privacidad</a>
          <a href="#">TÃ©rminos</a>
          <span class="text-white opacity-75">ðŸ’¼ Workly 2026 Â· Conectando talento</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken } from '../../services/api.js'
import { requireAuth } from '../../services/api.js'

onBeforeMount(() => {
  requireAuth(['empresa'])
})

// Estados
const postulaciones = ref([])
const searchTerm = ref('')
const filterVacante = ref('Todas las vacantes')
const filterEstado = ref('Todos los estados')
const selectedPostulante = ref(null)
const contactoDestino = ref('')
const mensajeContacto = ref('')
const modalPerfilRef = ref(null)
const modalContactarRef = ref(null)
let perfilModal = null
let contactarModal = null

// Computed para filtros
const vacantesUnicas = computed(() => {
  const vacantes = postulaciones.value.map(p => p.titulo_puesto).filter(Boolean)
  return [...new Set(vacantes)]
})
const estadosUnicos = computed(() => {
  const estados = postulaciones.value.map(p => p.nombre_estado).filter(Boolean)
  return [...new Set(estados)]
})
const filteredPostulaciones = computed(() => {
  let result = postulaciones.value
  const term = searchTerm.value.trim().toLowerCase()
  if (term) {
    result = result.filter(p =>
      `${p.nombres} ${p.apellidos}`.toLowerCase().includes(term) ||
      (p.correo_electronico || '').toLowerCase().includes(term)
    )
  }
  if (filterVacante.value !== 'Todas las vacantes') {
    result = result.filter(p => p.titulo_puesto === filterVacante.value)
  }
  if (filterEstado.value !== 'Todos los estados') {
    result = result.filter(p => p.nombre_estado === filterEstado.value)
  }
  return result
})

// Resumen sidebar
const resumen = computed(() => {
  const revision = postulaciones.value.filter(p => p.id_estado_fk === 1 || p.id_estado_fk === 2).length
  const entrevistas = postulaciones.value.filter(p => p.id_estado_fk === 3).length
  const aprobados = postulaciones.value.filter(p => p.id_estado_fk === 5).length
  return { revision, entrevistas, aprobados, total: postulaciones.value.length }
})

// Top vacantes
const topVacantes = computed(() => {
  const map = new Map()
  postulaciones.value.forEach(p => {
    const key = p.titulo_puesto || 'Vacante'
    map.set(key, (map.get(key) || 0) + 1)
  })
  return Array.from(map.entries())
    .map(([titulo, total]) => ({ titulo, total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3)
})

// Helpers
const getInitials = (p) => {
  const first = (p.nombres?.[0] || '').toUpperCase()
  const last = (p.apellidos?.[0] || '').toUpperCase()
  return first + last || '??'
}
const formatDate = (fecha) => {
  if (!fecha) return 'N/D'
  return new Date(fecha).toLocaleDateString('es-SV')
}
const getEstadoClass = (estadoId) => {
  if (estadoId === 2) return 'bg-primary-subtle text-primary'
  if (estadoId === 3) return 'bg-success text-white'
  if (estadoId === 4) return 'bg-danger text-white'
  if (estadoId === 5) return 'bg-dark text-white'
  return 'bg-warning text-dark'
}

// Acciones
const abrirPerfil = (p) => {
  selectedPostulante.value = p
  perfilModal?.show()
}
const abrirContacto = (p) => {
  selectedPostulante.value = p
  contactoDestino.value = `${p.nombres} ${p.apellidos} (${p.correo_electronico || 'sin correo'})`
  mensajeContacto.value = `Hola ${p.nombres}, queremos dar seguimiento a tu postulaciÃ³n para ${p.titulo_puesto || 'esta vacante'}.`
  contactarModal?.show()
}

const cambiarEstado = async (idPostulacion, nuevoEstadoId) => {
  try {
    const res = await fetch(`${API_URL}/postulaciones/${idPostulacion}/estado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({ id_estado_fk: Number(nuevoEstadoId) })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.mensaje || 'No se pudo actualizar el estado.')
    await cargarLista()
  } catch (err) {
    alert(err.message)
  }
}

const enviarMensaje = async () => {
  if (!selectedPostulante.value) return
  const msg = mensajeContacto.value.trim()
  if (!msg) {
    alert('Escribe un mensaje antes de enviarlo.')
    return
  }
  try {
    const res = await fetch(`${API_URL}/notificaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        tipo_usuario: 'usuario',
        id_destinatario: Number(selectedPostulante.value.id_usuario),
        titulo: `Mensaje de empresa sobre ${selectedPostulante.value.titulo_puesto || 'tu postulaciÃ³n'}`,
        mensaje: msg,
        tipo_notificacion: 'comentario',
        enlace: `/views/usuario/detalleempleo/index.html?id=${selectedPostulante.value.id_vacante_fk}`
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.mensaje || 'No se pudo enviar el mensaje.')
    mensajeContacto.value = ''
    contactarModal?.hide()
    alert('Mensaje enviado correctamente. El usuario ya lo puede ver en sus notificaciones.')
  } catch (err) {
    alert(err.message)
  }
}

const cargarLista = async () => {
  const res = await fetch(`${API_URL}/empresa/postulaciones`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.mensaje || 'No se pudieron cargar las postulaciones.')
  postulaciones.value = Array.isArray(data) ? data : []
}

// Inicializar modales y cargar datos
onMounted(async () => {
  if (modalPerfilRef.value) perfilModal = new window.bootstrap.Modal(modalPerfilRef.value)
  if (modalContactarRef.value) contactarModal = new window.bootstrap.Modal(modalContactarRef.value)
  await cargarLista().catch(err => {
    console.error(err)
    alert(err.message)
  })
})
</script>

<style scoped>
* { font-family: 'Inter', sans-serif; }
:root {
  --primary-deep: #3f51b5;
  --nav-bg: #011671;
  --light-text: #e2e4e8;
  --body-bg: #f5f7fc;
}
body { background: var(--body-bg); }
.navbar-custom { background-color: var(--nav-bg) !important; box-shadow: 0 6px 20px rgba(1, 22, 113, 0.15); }
.navbar-brand .brand-icon { font-size: 3.5rem; color: white; margin-right: 0.75rem; }
.navbar-brand .brand-text { color: white; font-weight: 700; font-size: 2rem; line-height: 1.2; }
.navbar-brand .brand-sub { color: var(--light-text); font-size: 0.95rem; }
.nav-link-custom { color: white !important; font-weight: 500; padding: 0.5rem 1.2rem; border-radius: 30px; background: rgba(255,255,255,0.05); }
.nav-link-custom:hover { background: rgba(255,255,255,0.15); }
.nav-link-custom.active { background: rgba(255,255,255,0.2); }
.btn-primary-deep { background: linear-gradient(135deg, var(--primary-deep), #2c3e8f); border: none; color: white; font-weight: 600; border-radius: 40px; padding: 0.5rem 1.5rem; box-shadow: 0 6px 14px rgba(63, 81, 181, 0.25); }
.btn-primary-deep:hover { background: linear-gradient(135deg, #2c3e8f, var(--primary-deep)); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(63, 81, 181, 0.35); color: white; }
.filter-bar { background: white; border-radius: 60px; padding: 0.5rem 1rem; box-shadow: 0 8px 20px rgba(0,0,0,0.02); border: 1px solid #e2e8f0; }
.candidate-card { background: white; border-radius: 24px; padding: 1.25rem 1.5rem; box-shadow: 0 8px 18px rgba(0,0,0,0.02); border: 1px solid #edf0f5; transition: all 0.2s; margin-bottom: 1rem; }
.candidate-card:hover { box-shadow: 0 12px 24px -6px rgba(63,81,181,0.08); border-color: rgba(63,81,181,0.2); }
.sidebar-card { background: white; border-radius: 24px; padding: 1.5rem; box-shadow: 0 12px 24px -8px rgba(0,0,0,0.04); border: 1px solid #edf0f5; margin-bottom: 1.5rem; }
.avatar-circle { width: 52px; height: 52px; background: #eef2f9; border-radius: 18px; display: flex; align-items: center; justify-content: center; color: var(--primary-deep); font-weight: 700; font-size: 1.2rem; }
.action-btn { width: 36px; height: 36px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; background: #f8fafd; color: #4a5568; transition: all 0.15s; border: none; }
.action-btn:hover { background: var(--primary-deep); color: white; }
.footer-custom { background-color: var(--nav-bg); color: var(--light-text); }
.footer-custom a { color: var(--light-text) !important; text-decoration: none; }
.footer-custom a:hover { color: white !important; text-decoration: underline; }
.notification-badge { position: absolute; top: -5px; right: -5px; background-color: #ff4757; color: white; border-radius: 50%; padding: 0.25rem 0.45rem; font-size: 0.7rem; font-weight: bold; border: 2px solid white; }
.navbar-toggler-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); }
</style>