<template>
  <div>
    <!-- NAVBAR -->
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
            <a href="/empresa/publicar-vacante" class="nav-link-custom"><i class="bi bi-plus-circle me-1"></i> Publicar</a>
            <a href="/empresa/mis-vacantes" class="nav-link-custom"><i class="bi bi-briefcase me-1"></i> Mis vacantes</a>
            <a href="/empresa/postulaciones" class="nav-link-custom"><i class="bi bi-people me-1"></i> Postulaciones</a>
            <a href="/empresa/foro" class="nav-link-custom"><i class="bi bi-chat-dots me-1"></i> Foro</a>
            <a href="/empresa/resena-empresa" class="nav-link-custom"><i class="bi bi-star me-1"></i> Reseñas</a>
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
        <!-- Barra de búsqueda -->
        <div class="filter-bar mb-5 d-flex align-items-center flex-wrap">
          <div class="d-flex align-items-center me-auto">
            <i class="bi bi-speedometer2 fs-3 me-3" style="color: var(--primary-deep);"></i>
            <h4 class="fw-bold mb-0 glow-text">Panel de Control</h4>
          </div>
          <div class="d-flex gap-2 align-items-center mt-2 mt-sm-0">
            <div class="input-group" style="max-width: 280px;">
              <span class="input-group-text bg-transparent border-0 text-muted"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control bg-transparent border-0 shadow-none" v-model="searchTerm" placeholder="Buscar vacantes o postulantes...">
            </div>
            <button class="btn btn-outline-primary-deep px-4" @click="searchDashboard">Buscar</button>
            <button class="btn btn-primary-deep px-4" @click="goToPublicarVacante"><i class="bi bi-plus-lg me-1"></i> Publicar Vacante</button>
          </div>
        </div>

        <!-- Alertas -->
        <div v-if="alertMessage" class="mb-4">
          <div :class="`alert alert-${alertType} alert-dismissible fade show rounded-4 shadow-sm`" role="alert">
            <span v-html="alertMessage"></span>
            <button type="button" class="btn-close" @click="alertMessage = ''"></button>
          </div>
        </div>

        <!-- Métricas rápidas -->
        <div class="row g-4 mb-5">
          <div class="col-6 col-md-3">
            <div class="metric-card text-center">
              <div class="bg-light rounded-4 p-3 d-inline-flex mb-3"><i class="bi bi-eye-fill fs-1" style="color: var(--primary-deep);"></i></div>
              <h2 class="fw-bold mb-1 counter">1,850</h2>
              <p class="text-secondary small fw-medium mb-0">Vistas totales</p>
              <small class="text-success"><i class="bi bi-arrow-up-short"></i> +12% esta semana</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="metric-card text-center">
              <div class="bg-light rounded-4 p-3 d-inline-flex mb-3"><i class="bi bi-people-fill fs-1" style="color: var(--primary-deep);"></i></div>
              <h2 class="fw-bold mb-1">{{ metricas.total_postulaciones || 0 }}</h2>
              <p class="text-secondary small fw-medium mb-0">Postulantes</p>
              <small class="text-success" v-html="textoPostulacionesResumen"></small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="metric-card text-center">
              <div class="bg-light rounded-4 p-3 d-inline-flex mb-3"><i class="bi bi-briefcase-fill fs-1" style="color: var(--primary-deep);"></i></div>
              <h2 class="fw-bold mb-1">{{ metricas.total_vacantes || 0 }}</h2>
              <p class="text-secondary small fw-medium mb-0">Vacantes activas</p>
              <small class="text-warning" v-html="textoVacantesResumen"></small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="metric-card text-center">
              <div class="bg-light rounded-4 p-3 d-inline-flex mb-3"><i class="bi bi-star-fill fs-1" style="color: #ffb347;"></i></div>
              <h2 class="fw-bold mb-1">4.8</h2>
              <p class="text-secondary small fw-medium mb-0">Calificación</p>
              <small><i class="bi bi-star-fill text-warning"></i> +45 reseñas</small>
            </div>
          </div>
        </div>

        <div class="row g-4">
          <!-- Columna principal -->
          <section class="col-12 col-lg-8">
            <!-- Caja de publicación rápida -->
            <div class="main-card">
              <div class="d-flex align-items-center gap-3 mb-4">
                <div class="bg-light p-3 rounded-4"><i class="bi bi-megaphone fs-3" style="color: var(--primary-deep);"></i></div>
                <div><h5 class="fw-bold mb-0">Crear publicación</h5><p class="text-secondary small mb-0">Comparte novedades, vacantes o cultura empresarial</p></div>
              </div>
              <textarea class="form-control border-0 shadow-none px-0 mb-4" rows="3" placeholder="¿Qué quieres compartir hoy?" v-model="newPostContent" style="font-size: 1.1rem; resize: none;"></textarea>
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="cat in categories" :key="cat" class="badge-category" :class="{ active: selectedCategory === cat }" @click="selectedCategory = cat">
                    <i :class="getCategoryIcon(cat)" class="me-1"></i>{{ cat }}
                  </span>
                </div>
                <div class="d-flex gap-2 mt-3 mt-sm-0">
                  <button class="btn btn-outline-primary-deep px-4 fw-semibold" @click="saveDraft"><i class="bi bi-bookmark me-1"></i> Borrador</button>
                  <button class="btn btn-primary-deep px-4 fw-semibold" @click="publishPost"><i class="bi bi-send me-1"></i> Publicar</button>
                </div>
              </div>
            </div>

            <!-- Feed de publicaciones del foro -->
            <div v-if="forumPosts.length === 0" class="post-card text-center">
              <p class="text-muted mb-0">Todavía no hay publicaciones en el foro.</p>
            </div>
            <div v-for="post in forumPosts" :key="post.id" class="post-card">
              <div class="d-flex gap-3 mb-4">
                <div class="flex-shrink-0">
                  <div class="bg-light p-3 rounded-4 shadow-sm"><i class="bi bi-building fs-2" style="color: var(--primary-deep);"></i></div>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="fw-bold mb-0">{{ post.companyName }} <span class="badge bg-info bg-opacity-10 text-info ms-2 px-3 py-1 rounded-pill">Verificada</span></h6>
                      <span class="text-secondary small"><i class="bi bi-clock me-1"></i>{{ formatDateTime(post.createdAt) }}</span>
                    </div>
                    <i class="bi bi-three-dots-vertical text-secondary"></i>
                  </div>
                </div>
              </div>
              <h5 class="fw-bold mb-2">{{ post.title }}</h5>
              <p class="text-secondary mb-4">{{ post.content }}</p>
              <div class="bg-light p-4 rounded-4 mb-4 border-start border-4" style="border-color: var(--primary-deep) !important;">
                <div class="d-flex align-items-center gap-2 mb-3"><i class="bi bi-briefcase-fill fs-5" style="color: var(--primary-deep);"></i><span class="fw-bold fs-5">{{ post.category }}</span></div>
                <div class="row g-2 text-secondary small">
                  <div class="col-md-4"><i class="bi bi-clock me-1"></i>Tiempo completo</div>
                  <div class="col-md-4"><i class="bi bi-laptop me-1"></i>Híbrido</div>
                  <div class="col-md-4"><i class="bi bi-geo-alt me-1"></i>San Salvador</div>
                </div>
              </div>
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <div class="d-flex gap-3">
                  <span class="stat-badge"><i class="bi bi-people me-1"></i>{{ post.likes }} postulantes</span>
                  <span class="stat-badge"><i class="bi bi-eye me-1"></i>{{ post.shares }} vistas</span>
                  <span class="stat-badge"><i class="bi bi-bookmark me-1"></i>{{ post.saved ? 1 : 0 }} guardados</span>
                </div>
                <div class="d-flex gap-2 mt-3 mt-sm-0">
                  <button class="btn btn-sm btn-light rounded-pill px-4" @click="handleLike(post.id)"><i class="bi bi-hand-thumbs-up"></i> {{ post.likes }}</button>
                  <button class="btn btn-sm btn-light rounded-pill px-4" @click="promptComment(post)"><i class="bi bi-chat"></i> {{ post.comments.length }}</button>
                  <button class="btn btn-sm btn-light rounded-pill px-4" @click="handleShare(post.id)"><i class="bi bi-share"></i></button>
                </div>
              </div>
              <div class="bg-light rounded-4 p-3 mt-3">
                <div class="small fw-semibold mb-2">Comentarios recientes</div>
                <div v-if="post.comments.length === 0" class="text-muted small">Todavía no hay comentarios en esta publicación.</div>
                <div v-for="c in post.comments.slice(-2).reverse()" :key="c.createdAt + c.content" class="border rounded-4 bg-white p-3 mb-2">
                  <div class="fw-semibold small">{{ c.author }}</div>
                  <div class="text-muted small mb-1">{{ formatDateTime(c.createdAt) }}</div>
                  <div>{{ c.content }}</div>
                </div>
              </div>
            </div>

            <!-- Gráfico de actividad (estático decorativo) -->
            <div class="main-card">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold mb-0"><i class="bi bi-bar-chart-line me-2" style="color: var(--primary-deep);"></i>Actividad semanal</h6>
                <span class="text-secondary small">Últimos 7 días</span>
              </div>
              <div class="row align-items-end g-3" style="min-height: 140px;">
                <div class="col text-center"><div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;"><div style="width: 30px; background: var(--primary-deep); height: 35px; border-radius: 12px 12px 4px 4px; opacity: 0.7;"></div></div><small>Lun</small></div>
                <div class="col text-center"><div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;"><div style="width: 30px; background: var(--primary-deep); height: 48px; border-radius: 12px 12px 4px 4px; opacity: 0.8;"></div></div><small>Mar</small></div>
                <div class="col text-center"><div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;"><div style="width: 30px; background: var(--primary-deep); height: 60px; border-radius: 12px 12px 4px 4px;"></div></div><small>Mié</small></div>
                <div class="col text-center"><div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;"><div style="width: 30px; background: var(--primary-deep); height: 42px; border-radius: 12px 12px 4px 4px; opacity: 0.8;"></div></div><small>Jue</small></div>
                <div class="col text-center"><div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;"><div style="width: 30px; background: var(--primary-deep); height: 55px; border-radius: 12px 12px 4px 4px; opacity: 0.9;"></div></div><small>Vie</small></div>
                <div class="col text-center"><div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;"><div style="width: 30px; background: var(--primary-deep); height: 30px; border-radius: 12px 12px 4px 4px; opacity: 0.6;"></div></div><small>Sáb</small></div>
                <div class="col text-center"><div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;"><div style="width: 30px; background: var(--primary-deep); height: 20px; border-radius: 12px 12px 4px 4px; opacity: 0.5;"></div></div><small>Dom</small></div>
              </div>
            </div>
          </section>

          <!-- Sidebar -->
          <aside class="col-12 col-lg-4">
            <!-- Vacantes activas -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-briefcase-fill me-2" style="color: var(--primary-deep);"></i>Vacantes activas</h6>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="fw-bold fs-4">{{ metricas.total_vacantes || 0 }}</span>
                <span class="badge bg-success bg-opacity-10 text-success px-3 py-1 rounded-pill">+2 esta semana</span>
              </div>
              <div class="activity-bar mb-3"><div class="activity-fill" :style="{ width: `${Math.min(100, (metricas.total_vacantes || 0) * 6)}%` }"></div></div>
              <p class="text-secondary small">75% de ocupación · 3 vacantes críticas</p>
              <button class="btn btn-outline-primary-deep w-100 mt-3" @click="goToMisVacantes">Gestionar vacantes <i class="bi bi-arrow-right ms-1"></i></button>
            </div>

            <!-- Postulantes recientes -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-person-plus me-2" style="color: var(--primary-deep);"></i>Postulantes recientes</h6>
              <ul class="list-unstyled mb-0">
                <li v-for="(p, idx) in ultimasPostulaciones" :key="idx" class="d-flex align-items-center gap-3 mb-3">
                  <div class="position-relative">
                    <i class="bi bi-person-circle fs-2" :style="{ color: idx === 0 ? 'var(--primary-deep)' : '#5a6ab0' }"></i>
                    <span v-if="idx === 0" class="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-white" style="width: 10px; height: 10px;"></span>
                  </div>
                  <div class="flex-grow-1"><span class="fw-semibold">{{ p.nombre_usuario }}</span><p class="small text-secondary mb-0">{{ p.titulo_puesto }} · {{ formatDate(p.fecha_postulacion) }}</p></div>
                  <span class="badge bg-warning bg-opacity-15 text-warning" v-if="idx === 0">Nuevo</span>
                </li>
                <li v-if="ultimasPostulaciones.length === 0" class="text-muted">No hay postulantes recientes todavía.</li>
              </ul>
              <button class="btn btn-outline-primary-deep w-100 mt-2" @click="goToPostulaciones">Ver todos ({{ metricas.total_postulaciones || 0 }}) <i class="bi bi-arrow-right ms-1"></i></button>
            </div>

            <!-- Recursos destacados -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-journal-text me-2" style="color: var(--primary-deep);"></i>Recursos destacados</h6>
              <div class="d-flex flex-column gap-3">
                <div class="d-flex align-items-center gap-3"><div class="bg-light p-3 rounded-4"><i class="bi bi-file-earmark-text fs-5" style="color: var(--primary-deep);"></i></div><div><span class="fw-medium">Guía para redactar vacantes</span><br><small class="text-secondary">12 min lectura</small></div></div>
                <div class="d-flex align-items-center gap-3"><div class="bg-light p-3 rounded-4"><i class="bi bi-people fs-5" style="color: var(--primary-deep);"></i></div><div><span class="fw-medium">Plantilla de entrevista técnica</span><br><small class="text-secondary">Descargable</small></div></div>
              </div>
            </div>

            <!-- Accesos rápidos -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-lightning-charge me-2" style="color: var(--primary-deep);"></i>Accesos rápidos</h6>
              <div class="d-grid gap-2">
                <a href="/empresa/foro" class="btn btn-light text-start rounded-4 py-3"><i class="bi bi-chat-dots-fill me-3 fs-5" style="color: var(--primary-deep);"></i> Foro de empresas</a>
                <a href="/empresa/resena-empresa" class="btn btn-light text-start rounded-4 py-3"><i class="bi bi-star-fill me-3 fs-5" style="color: #ffb347;"></i> Reseñas recibidas</a>
                <a href="/empresa/perfil" class="btn btn-light text-start rounded-4 py-3"><i class="bi bi-building me-3 fs-5" style="color: var(--primary-deep);"></i> Editar perfil empresa</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <footer class="py-4 mt-auto footer-custom">
      <div class="container text-center">
        <div class="d-flex flex-wrap justify-content-center gap-4 gap-md-5">
          <a href="#"><i class="bi bi-question-circle me-1"></i>Ayuda</a>
          <a href="#"><i class="bi bi-shield-lock me-1"></i>Privacidad</a>
          <a href="#">Términos</a>
          <span class="text-white opacity-75">💼 Workly 2026 · Conectando talento</span>
        </div>
      </div>
    </footer>

    <!-- Toasts -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="toastGuardado" class="toast align-items-center text-white border-0 rounded-4 shadow mb-2" role="alert" style="background-color: #2ecc71;">
        <div class="d-flex"><div class="toast-body fs-6 py-3 fw-semibold"><i class="bi bi-floppy-fill me-2 fs-5"></i> Borrador guardado correctamente.</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>
      </div>
      <div id="toastPublicado" class="toast align-items-center text-white border-0 rounded-4 shadow" role="alert" style="background-color: var(--primary-deep);">
        <div class="d-flex"><div class="toast-body fs-6 py-3 fw-semibold"><i class="bi bi-send-check-fill me-2 fs-5"></i> ¡Publicación realizada con éxito!</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken, getUsuario } from '../../services/api.js'
import { requireAuth } from '../../services/api.js'
import {
  getCompanyForumPosts,
  createCompanyForumPost,
  addCompanyForumComment,
  incrementCompanyForumMetric,
  toggleCompanyForumSave,
  saveCompanyForumPosts
} from '../../services/empresaForum.js'

// Autenticación
onBeforeMount(() => {
  requireAuth(['empresa'])
})

// Datos reactivos
const alertMessage = ref('')
const alertType = ref('danger')
const searchTerm = ref('')
const newPostContent = ref('')
const selectedCategory = ref('Vacante')
const categories = ['Vacante', 'Noticia', 'Cultura', 'Evento']
const metricas = reactive({ total_vacantes: 0, total_postulaciones: 0 })
const ultimasPostulaciones = ref([])
const ultimasVacantes = ref([])
const forumPosts = ref([])

// Computed para textos de métricas
const textoVacantesResumen = computed(() => {
  const total = metricas.total_vacantes || 0
  return total > 0 ? '<i class="bi bi-clock"></i> Actualizado desde la API' : '<i class="bi bi-clock"></i> Sin vacantes activas'
})
const textoPostulacionesResumen = computed(() => {
  const total = metricas.total_postulaciones || 0
  return total > 0 ? '<i class="bi bi-arrow-up-short"></i> Actualizado desde la API' : '<i class="bi bi-arrow-up-short"></i> Sin postulaciones'
})

// Helpers
const getCompanyDisplayName = () => {
  const usuario = getUsuario()
  return usuario?.nombre_comercial || usuario?.empresa || usuario?.correo_electronico || 'Empresa'
}
const getCompanyInitials = () => {
  const name = getCompanyDisplayName()
  return name.split(' ').map(w => w.trim().charAt(0)).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'EM'
}
const getCategoryIcon = (cat) => {
  const map = { Vacante: 'bi-briefcase', Noticia: 'bi-newspaper', Cultura: 'bi-emoji-smile', Evento: 'bi-calendar-event' }
  return map[cat] || 'bi-tag'
}
const formatDateTime = (value) => {
  if (!value) return 'Reciente'
  const d = new Date(value)
  return isNaN(d.getTime()) ? 'Reciente' : d.toLocaleString('es-SV', { dateStyle: 'medium', timeStyle: 'short' })
}
const formatDate = (value) => {
  if (!value) return 'N/D'
  const d = new Date(value)
  return isNaN(d.getTime()) ? 'N/D' : d.toLocaleDateString('es-SV')
}

// Toasts
let toastGuardado = null, toastPublicado = null
const showAlert = (msg, type = 'danger') => {
  alertMessage.value = msg
  alertType.value = type
  setTimeout(() => { alertMessage.value = '' }, 5000)
}
const showToast = (id) => {
  if (id === 'guardado') toastGuardado?.show()
  else if (id === 'publicado') toastPublicado?.show()
}

// Carga de datos
const fetchDashboard = async () => {
  try {
    const res = await fetch(`${API_URL}/dashboard/empresa`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.mensaje || 'Error al cargar dashboard')
    metricas.total_vacantes = data.metricas?.total_vacantes ?? 0
    metricas.total_postulaciones = data.metricas?.total_postulaciones ?? 0
    ultimasPostulaciones.value = Array.isArray(data.ultimasPostulaciones) ? data.ultimasPostulaciones : []
    ultimasVacantes.value = Array.isArray(data.ultimasVacantes) ? data.ultimasVacantes : []
  } catch (err) {
    console.error(err)
    showAlert(err.message, 'danger')
  }
}

const loadForumPosts = () => {
  forumPosts.value = getCompanyForumPosts()
}

// Interacciones del foro
const handleLike = (postId) => {
  incrementCompanyForumMetric(postId, 'likes')
  loadForumPosts()
  showAlert('Like registrado.', 'success')
}
const handleShare = async (postId) => {
  incrementCompanyForumMetric(postId, 'shares')
  loadForumPosts()
  try {
    await navigator.clipboard.writeText(window.location.href)
  } catch {}
  showAlert('Enlace copiado y publicación marcada como compartida.', 'success')
}
const handleSave = (postId) => {
  toggleCompanyForumSave(postId)
  loadForumPosts()
  showAlert('Guardado actualizado.', 'success')
}
const promptComment = (post) => {
  const respuesta = window.prompt(`Escribe un comentario para "${post.title}"`)
  if (!respuesta?.trim()) return
  addCompanyForumComment(post.id, getCompanyDisplayName(), respuesta.trim())
  loadForumPosts()
  showAlert('Comentario agregado.', 'success')
}

// Publicar nuevo post
const publishPost = () => {
  if (!newPostContent.value.trim()) {
    showAlert('Escribe una publicación antes de enviarla al foro.', 'warning')
    return
  }
  createCompanyForumPost({
    companyName: getCompanyDisplayName(),
    authorInitials: getCompanyInitials(),
    content: newPostContent.value,
    category: selectedCategory.value
  })
  newPostContent.value = ''
  loadForumPosts()
  showToast('publicado')
  showAlert('La publicación ya aparece en el foro de empresas.', 'success')
}
const saveDraft = () => {
  showToast('guardado')
}

// Búsqueda en dashboard
const searchDashboard = () => {
  const term = searchTerm.value.trim().toLowerCase()
  if (!term) {
    showAlert('Escribe un término para buscar vacantes, postulantes o publicaciones.', 'warning')
    return
  }
  const vacantes = ultimasVacantes.value.filter(v =>
    [v.titulo_puesto, v.modalidad].some(s => String(s || '').toLowerCase().includes(term))
  )
  const postulaciones = ultimasPostulaciones.value.filter(p =>
    [p.nombre_usuario, p.titulo_puesto, p.nombre_estado].some(s => String(s || '').toLowerCase().includes(term))
  )
  const posts = forumPosts.value.filter(p =>
    [p.title, p.content, p.category].some(s => String(s || '').toLowerCase().includes(term))
  )
  const total = vacantes.length + postulaciones.length + posts.length
  if (total === 0) {
    showAlert(`No encontramos resultados para "${term}".`, 'warning')
  } else {
    showAlert(`Se encontraron <strong>${total}</strong> coincidencias. Vacantes: ${vacantes.length}, postulantes: ${postulaciones.length}, publicaciones: ${posts.length}.`, 'success')
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Navegación
const goToPublicarVacante = () => { window.location.href = '/empresa/publicar-vacante' }
const goToMisVacantes = () => { window.location.href = '/empresa/mis-vacantes' }
const goToPostulaciones = () => { window.location.href = '/empresa/postulaciones' }

// Inicialización
onMounted(async () => {
  const toastGuardadoEl = document.getElementById('toastGuardado')
  const toastPublicadoEl = document.getElementById('toastPublicado')
  if (toastGuardadoEl) toastGuardado = new window.bootstrap.Toast(toastGuardadoEl)
  if (toastPublicadoEl) toastPublicado = new window.bootstrap.Toast(toastPublicadoEl)

  await fetchDashboard()
  loadForumPosts()
  // Guardar cambios en localStorage cada vez que se modifiquen posts
  // No es necesario llamar a saveCompanyForumPosts explícitamente,
  // las funciones de empresaForum ya lo hacen internamente.
})
</script>

<style scoped>
* { font-family: 'Inter', sans-serif; }
:root {
  --primary-deep: #3f51b5;
  --nav-bg: #011671;
  --light-text: #e2e4e8;
  --body-bg: #f0f4fe;
}
body { background: linear-gradient(145deg, #eef2f9 0%, #f9fafc 100%); }
.navbar-custom { background-color: var(--nav-bg) !important; box-shadow: 0 6px 20px rgba(1, 22, 113, 0.15); }
.navbar-brand .brand-icon { font-size: 3.5rem; color: white; margin-right: 0.75rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
.navbar-brand .brand-text { color: white; font-weight: 700; font-size: 2rem; line-height: 1.2; }
.navbar-brand .brand-sub { color: var(--light-text); font-size: 0.95rem; }
.nav-link-custom { color: white !important; font-weight: 500; padding: 0.5rem 1.2rem; border-radius: 30px; background: rgba(255,255,255,0.05); margin: 0 2px; transition: all 0.2s; }
.nav-link-custom:hover { background: rgba(255,255,255,0.15); transform: translateY(-1px); }
.btn-primary-deep { background: linear-gradient(135deg, var(--primary-deep), #2c3e8f); border: none; color: white; font-weight: 600; border-radius: 40px; padding: 0.6rem 1.8rem; box-shadow: 0 6px 14px rgba(63, 81, 181, 0.25); transition: all 0.25s; }
.btn-primary-deep:hover { background: linear-gradient(135deg, #2c3e8f, var(--primary-deep)); transform: translateY(-3px); box-shadow: 0 12px 20px rgba(63, 81, 181, 0.35); color: white; }
.btn-outline-primary-deep { background: transparent; border: 2px solid var(--primary-deep); color: var(--primary-deep); font-weight: 600; border-radius: 40px; padding: 0.45rem 1.5rem; transition: all 0.2s; }
.btn-outline-primary-deep:hover { background: var(--primary-deep); color: white; transform: translateY(-2px); }
.metric-card { background: white; border-radius: 24px; padding: 1.5rem 1.2rem; box-shadow: 0 15px 30px -8px rgba(0, 20, 60, 0.08); border: 1px solid rgba(63, 81, 181, 0.08); transition: all 0.25s; position: relative; overflow: hidden; }
.metric-card:hover { transform: translateY(-5px); box-shadow: 0 20px 35px -10px rgba(63, 81, 181, 0.15); border-color: var(--primary-deep); }
.metric-card::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: linear-gradient(90deg, var(--primary-deep), #8c9eff); transform: scaleX(0); transition: transform 0.3s; }
.metric-card:hover::after { transform: scaleX(1); }
.main-card { background: white; border-radius: 32px; padding: 2rem; box-shadow: 0 20px 35px -10px rgba(0, 20, 60, 0.06); border: 1px solid rgba(63, 81, 181, 0.06); margin-bottom: 1.8rem; }
.post-card { background: white; border-radius: 28px; padding: 2rem; box-shadow: 0 15px 25px -8px rgba(0,0,0,0.03); border: 1px solid #edf2f9; margin-bottom: 1.8rem; transition: all 0.3s; }
.post-card:hover { box-shadow: 0 22px 35px -12px rgba(63, 81, 181, 0.12); border-color: rgba(63, 81, 181, 0.2); }
.sidebar-card { background: white; border-radius: 28px; padding: 1.8rem; box-shadow: 0 15px 25px -8px rgba(0, 0, 0, 0.04); border: 1px solid #eef2f9; margin-bottom: 1.8rem; transition: all 0.2s; }
.sidebar-card:hover { box-shadow: 0 18px 30px -10px rgba(63, 81, 181, 0.1); }
.filter-bar { background: white; border-radius: 60px; padding: 0.5rem 0.5rem 0.5rem 1.5rem; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
.badge-category { background: #f0f4ff; color: var(--primary-deep); padding: 0.6rem 1.4rem; border-radius: 40px; font-weight: 600; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; border: 1px solid transparent; }
.badge-category:hover { background: var(--primary-deep); color: white; transform: scale(1.02); box-shadow: 0 6px 12px rgba(63, 81, 181, 0.2); }
.badge-category.active { background: var(--primary-deep); color: white; }
.stat-badge { background: #f4f7fd; color: var(--primary-deep); padding: 0.45rem 1.3rem; border-radius: 40px; font-weight: 600; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 6px; border: 1px solid rgba(63,81,181,0.1); }
.activity-bar { height: 8px; background: #e9ecf5; border-radius: 10px; overflow: hidden; }
.activity-fill { height: 100%; background: linear-gradient(90deg, var(--primary-deep), #7b8cde); border-radius: 10px; transition: width 0.5s ease; }
.footer-custom { background-color: var(--nav-bg); color: var(--light-text); }
.footer-custom a { color: var(--light-text) !important; text-decoration: none; }
.footer-custom a:hover { color: white !important; text-decoration: underline; }
.notification-badge { position: absolute; top: -5px; right: -5px; background-color: #ff4757; color: white; border-radius: 50%; padding: 0.25rem 0.45rem; font-size: 0.7rem; font-weight: bold; border: 2px solid white; }
.navbar-toggler-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); }
</style>