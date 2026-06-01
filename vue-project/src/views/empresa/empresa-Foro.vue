<template>
  <div>
    <!-- ========== NAVBAR ========== -->
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="/empresa/principal">
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
            <a href="/empresa/postulaciones" class="nav-link-custom text-decoration-none"><i class="bi bi-people me-1"></i> Postulaciones</a>
            <a href="/empresa/foro" class="nav-link-custom active text-decoration-none"><i class="bi bi-chat-dots me-1"></i> Foro</a>
            <a href="/empresa/resena-empresa" class="nav-link-custom text-decoration-none"><i class="bi bi-star me-1"></i> Reseñas</a>
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

    <!-- ========== MAIN ========== -->
    <main class="flex-grow-1 py-4">
      <div class="container-fluid px-4 px-lg-5">
        
        <!-- Barra de búsqueda y filtros -->
        <div class="filter-bar mb-4 p-3 d-flex align-items-center flex-wrap gap-3">
          <div class="d-flex align-items-center">
            <i class="bi bi-chat-dots-fill fs-2 me-2" style="color: var(--primary-deep);"></i>
            <h4 class="fw-bold mb-0" style="color: #121826;">Foro de Empresas</h4>
          </div>
          <div class="ms-auto d-flex gap-2 flex-wrap">
            <div class="input-group" style="max-width: 260px;">
              <span class="input-group-text bg-transparent border-0 text-muted"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control bg-transparent border-0 shadow-none" placeholder="Buscar tema..." v-model="searchTerm" @keydown.enter="applySearch">
            </div>
            <button class="btn btn-outline-primary-deep" @click="applySearch">Buscar</button>
            <select class="form-select w-auto rounded-pill bg-light border-0 fw-medium" v-model="selectedCategory">
              <option value="">Todas las categorías</option>
              <option>Reclutamiento</option>
              <option>Consejos</option>
              <option>Vacantes</option>
              <option>Cultura</option>
              <option>Networking</option>
            </select>
            <button class="btn btn-primary-deep" @click="scrollToComposer"><i class="bi bi-plus-circle me-1"></i> Nuevo tema</button>
          </div>
        </div>

        <div class="row g-4">
          <!-- Columna principal: Publicaciones -->
          <section class="col-12 col-lg-8">
            <!-- Caja de nueva publicación -->
            <div class="forum-card">
              <div class="d-flex gap-3 mb-3">
                <div class="avatar-circle">{{ companyInitials }}</div>
                <div class="flex-grow-1">
                  <textarea v-model="newPostContent" class="form-control border-0 bg-light p-3 rounded-4" rows="3" placeholder="Comparte una pregunta, consejo o tema con la comunidad..."></textarea>
                </div>
              </div>
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-2">
                <div class="d-flex flex-wrap gap-2">
                  <span v-for="cat in ['Reclutamiento', 'Vacantes', 'Consejos', 'Cultura']" :key="cat"
                    class="category-badge cursor-pointer"
                    :class="{ active: selectedCategoryForNew === cat }"
                    @click="selectedCategoryForNew = cat">
                    {{ cat }}
                  </span>
                </div>
                <div class="d-flex gap-2">
                  <button type="button" class="btn btn-outline-primary-deep" @click="saveDraft"><i class="bi bi-bookmark me-1"></i> Borrador</button>
                  <button type="button" class="btn btn-primary-deep" @click="publishTopic"><i class="bi bi-send me-1"></i> Publicar</button>
                </div>
              </div>
            </div>

            <!-- Listado dinámico de posts -->
            <div v-for="post in filteredPosts" :key="post.id" class="forum-card">
              <div class="d-flex gap-3 mb-3">
                <div class="avatar-circle">{{ post.authorInitials }}</div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="fw-bold mb-1">{{ post.companyName }}</h6>
                      <div class="d-flex align-items-center gap-2 flex-wrap">
                        <span class="text-secondary small"><i class="bi bi-clock me-1"></i>{{ formatRelativeDate(post.createdAt) }}</span>
                        <span class="category-badge">{{ post.category }}</span>
                      </div>
                    </div>
                    <i class="bi bi-three-dots-vertical text-secondary"></i>
                  </div>
                </div>
              </div>
              <h5 class="fw-bold mb-3">{{ post.title }}</h5>
              <p class="text-secondary mb-4">{{ post.content }}</p>
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-3 border-top">
                <div class="d-flex gap-3">
                  <span class="interaction-btn" @click="handleLike(post.id)">
                    <i class="bi bi-hand-thumbs-up me-1"></i> {{ post.likes }}
                  </span>
                  <span class="interaction-btn" @click="openReplyModal(post)">
                    <i class="bi bi-chat-left-text me-1"></i> {{ post.comments.length }}
                  </span>
                  <span class="interaction-btn" @click="handleShare(post.id)">
                    <i class="bi bi-share me-1"></i> {{ post.shares }}
                  </span>
                </div>
                <div class="d-flex gap-2">
                  <button class="btn btn-outline-primary-deep" @click="openReplyModal(post)">
                    <i class="bi bi-reply-fill me-1"></i> Responder
                  </button>
                  <button class="btn btn-outline-primary-deep" @click="handleSave(post.id)">
                    <i :class="post.saved ? 'bi-bookmark-check-fill' : 'bi-bookmark'" class="me-1"></i>
                    {{ post.saved ? 'Guardado' : 'Guardar' }}
                  </button>
                </div>
              </div>
              <!-- Comentarios recientes (últimos 2) -->
              <div class="bg-light rounded-4 p-3 mt-3">
                <div class="small fw-semibold mb-2">Comentarios recientes</div>
                <div v-if="post.comments.length === 0" class="text-muted small">Todavía no hay comentarios en este tema.</div>
                <div v-for="comment in getRecentComments(post.comments)" :key="comment.createdAt + comment.content" class="border rounded-4 bg-white p-3 mb-2">
                  <div class="fw-semibold small">{{ comment.author }}</div>
                  <div class="text-muted small mb-1">{{ formatRelativeDate(comment.createdAt) }}</div>
                  <div>{{ comment.content }}</div>
                </div>
              </div>
            </div>
            <div v-if="filteredPosts.length === 0" class="forum-card text-center">
              <i class="bi bi-search fs-1 text-muted opacity-50"></i>
              <h5 class="fw-bold mt-3">No hay temas para esos filtros</h5>
              <p class="text-muted mb-0">Prueba otra búsqueda o publica un nuevo tema.</p>
            </div>
          </section>

          <!-- Sidebar -->
          <aside class="col-12 col-lg-4">
            <!-- Categorías populares -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-tags me-2" style="color: var(--primary-deep);"></i>Categorías populares</h6>
              <div class="d-flex flex-column gap-2">
                <button v-for="cat in popularCategories" :key="cat.name" class="d-flex justify-content-between text-start text-decoration-none text-dark fw-medium p-2 rounded-3 border-0 bg-transparent"
                  :class="{ 'bg-light': selectedCategory === cat.name }" @click="selectedCategory = cat.name">
                  <span>{{ cat.name }}</span><span class="badge bg-light px-3 py-1">{{ cat.count }}</span>
                </button>
              </div>
            </div>

            <!-- Temas recientes -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-clock-history me-2" style="color: var(--primary-deep);"></i>Temas recientes</h6>
              <div class="d-flex flex-column gap-3">
                <button v-for="post in recentPosts" :key="post.id" class="text-decoration-none text-start text-dark fw-medium d-block border-0 bg-transparent p-0" @click="searchTerm = post.title; applySearch()">
                  {{ post.title }}
                </button>
              </div>
            </div>

            <!-- Actividad del foro -->
            <div class="sidebar-card text-center" style="background: linear-gradient(145deg, var(--primary-deep), #2c3e8f); color: white;">
              <i class="bi bi-chat-quote-fill display-4 mb-2 opacity-50"></i>
              <h6 class="fw-bold mb-3">Actividad del foro</h6>
              <div class="d-flex justify-content-between small fw-semibold border-bottom border-light border-opacity-25 pb-2 mb-2">
                <span>Publicaciones totales</span><span class="badge bg-white text-dark rounded-pill">{{ totalPosts }}</span>
              </div>
              <div class="d-flex justify-content-between small fw-semibold border-bottom border-light border-opacity-25 pb-2 mb-2">
                <span>Comentarios</span><span class="badge bg-white text-dark rounded-pill">{{ totalComments }}</span>
              </div>
              <div class="d-flex justify-content-between small fw-semibold">
                <span>Temas guardados</span><span class="badge bg-white text-dark rounded-pill">{{ totalSaved }}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <!-- MODAL RESPONDER -->
    <div class="modal fade" id="modalResponder" tabindex="-1" aria-hidden="true" ref="modalResponderRef">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content border-0 rounded-4 shadow-lg">
          <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
            <h5 class="modal-title fw-bold">Responder al tema</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body px-4 py-4">
            <div class="bg-light p-3 rounded-4 mb-4">
              <span class="text-secondary small fw-semibold">Respondiendo a:</span>
              <p class="fw-medium mb-0 fst-italic">{{ replyingToTitle }}</p>
            </div>
            <form @submit.prevent="submitReply">
              <div class="mb-4">
                <label class="form-label fw-semibold small">Tu respuesta:</label>
                <div class="border rounded-4 overflow-hidden">
                  <div class="bg-light border-bottom p-2 d-flex gap-3 text-secondary">
                    <i class="bi bi-type-bold cursor-pointer"></i>
                    <i class="bi bi-type-italic cursor-pointer"></i>
                    <i class="bi bi-link-45deg cursor-pointer"></i>
                  </div>
                  <textarea v-model="replyContent" class="form-control border-0 shadow-none p-3" rows="5" placeholder="Comparte tu experiencia o consejo aquí..."></textarea>
                </div>
              </div>
              <div class="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" class="btn btn-primary-deep">Publicar respuesta</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- TOASTS -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="toastAccion" class="toast align-items-center text-white border-0 rounded-4 shadow mb-2" role="alert" style="background-color: var(--primary-deep);">
        <div class="d-flex">
          <div class="toast-body fs-6 py-3 fw-semibold">{{ toastMessage }}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
      <div id="toastExito" class="toast align-items-center text-white bg-success border-0 rounded-4 shadow" role="alert">
        <div class="d-flex">
          <div class="toast-body fs-6 py-3 fw-semibold">{{ successMessage }}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { getUsuario } from '../../services/api.js'
import { requireAuth, logout } from '../../services/api.js'
import {
  getCompanyForumPosts,
  createCompanyForumPost,
  addCompanyForumComment,
  incrementCompanyForumMetric,
  toggleCompanyForumSave,
  saveCompanyForumPosts
} from '../../services/empresaForum.js'

// ========== Autenticación ==========
onBeforeMount(() => {
  requireAuth(['empresa'])
})

// ========== Datos reactivos ==========
const posts = ref([])
const searchTerm = ref('')
const selectedCategory = ref('')
const newPostContent = ref('')
const selectedCategoryForNew = ref('Reclutamiento')
const replyContent = ref('')
const replyingToPostId = ref(null)
const replyingToTitle = ref('')
const modalResponderRef = ref(null)
let modalInstance = null

// Toasts
const toastMessage = ref('')
const successMessage = ref('')
let toastAction = null
let toastSuccess = null

// ========== Funciones auxiliares ==========
const getCompanyName = () => {
  const usuario = getUsuario()
  return usuario?.nombre_comercial || usuario?.empresa || 'Empresa'
}

const getCompanyInitials = () => {
  const name = getCompanyName()
  return name.split(' ')
    .map(word => word.trim().charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'EM'
}

const formatRelativeDate = (value) => {
  const date = new Date(value)
  if (isNaN(date.getTime())) return 'Reciente'
  const diffMs = Date.now() - date.getTime()
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  if (diffHours < 1) return 'Hace unos minutos'
  if (diffHours < 24) return `Hace ${diffHours}h`
  const diffDays = Math.floor(diffHours / 24)
  return diffDays === 1 ? 'Ayer' : `Hace ${diffDays} días`
}

const getRecentComments = (comments) => {
  return [...comments].slice(-2).reverse()
}

const showToast = (kind, msg) => {
  if (kind === 'success') {
    successMessage.value = msg
    toastSuccess?.show()
  } else {
    toastMessage.value = msg
    toastAction?.show()
  }
}

// ========== Cargar datos ==========
const loadPosts = () => {
  posts.value = getCompanyForumPosts()
}

// ========== Filtros computados ==========
const filteredPosts = computed(() => {
  let result = posts.value
  const term = searchTerm.value.trim().toLowerCase()
  if (term) {
    result = result.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.content.toLowerCase().includes(term) ||
      p.companyName.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    )
  }
  if (selectedCategory.value && selectedCategory.value !== 'Todas las categorías') {
    result = result.filter(p => p.category === selectedCategory.value)
  }
  return result
})

const popularCategories = computed(() => {
  const counts = {}
  posts.value.forEach(p => {
    const cat = p.category || 'General'
    counts[cat] = (counts[cat] || 0) + 1
  })
  return [
    { name: 'Todas las categorías', count: posts.value.length },
    ...Object.entries(counts).map(([name, count]) => ({ name, count }))
  ]
})

const recentPosts = computed(() => {
  return [...posts.value].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4)
})

const totalPosts = computed(() => posts.value.length)
const totalComments = computed(() => posts.value.reduce((acc, p) => acc + p.comments.length, 0))
const totalSaved = computed(() => posts.value.filter(p => p.saved).length)

// ========== Acciones ==========
const refreshAndSave = () => {
  loadPosts()
  saveCompanyForumPosts(posts.value)
}

const publishTopic = () => {
  if (!newPostContent.value.trim()) {
    showToast('info', 'Escribe algo antes de publicar.')
    return
  }
  createCompanyForumPost({
    companyName: getCompanyName(),
    authorInitials: getCompanyInitials(),
    content: newPostContent.value,
    category: selectedCategoryForNew.value
  })
  newPostContent.value = ''
  selectedCategoryForNew.value = 'Reclutamiento'
  refreshAndSave()
  showToast('success', 'Tema publicado con éxito en el foro.')
}

const saveDraft = () => {
  showToast('success', 'Borrador guardado correctamente.')
}

const handleLike = (postId) => {
  incrementCompanyForumMetric(postId, 'likes')
  refreshAndSave()
  showToast('success', 'Like registrado.')
}

const handleShare = async (postId) => {
  incrementCompanyForumMetric(postId, 'shares')
  refreshAndSave()
  const url = window.location.href.split('?')[0]
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
    }
  } catch { /* ignore */ }
  showToast('success', 'Enlace copiado y tema marcado como compartido.')
}

const handleSave = (postId) => {
  toggleCompanyForumSave(postId)
  refreshAndSave()
  showToast('success', 'Tema actualizado en tus guardados.')
}

const openReplyModal = (post) => {
  replyingToPostId.value = post.id
  replyingToTitle.value = post.title
  replyContent.value = ''
  modalInstance?.show()
}

const submitReply = () => {
  if (!replyContent.value.trim()) {
    showToast('info', 'Escribe una respuesta antes de publicarla.')
    return
  }
  addCompanyForumComment(replyingToPostId.value, getCompanyName(), replyContent.value)
  replyContent.value = ''
  modalInstance?.hide()
  refreshAndSave()
  showToast('success', 'Respuesta publicada con éxito.')
}

const applySearch = () => {
  // No se necesita lógica extra, los computados se actualizan automáticamente
}

const scrollToComposer = () => {
  const composer = document.querySelector('.forum-card textarea')
  if (composer) {
    composer.scrollIntoView({ behavior: 'smooth', block: 'center' })
    composer.focus()
  }
}

// ========== Ciclo de vida ==========
onMounted(() => {
  loadPosts()
  // Inicializar modales de Bootstrap
  if (modalResponderRef.value) {
    modalInstance = new window.bootstrap.Modal(modalResponderRef.value)
  }
  const toastActionEl = document.getElementById('toastAccion')
  const toastSuccessEl = document.getElementById('toastExito')
  if (toastActionEl) toastAction = new window.bootstrap.Modal(toastActionEl, {}) // Nota: toast, no modal
  if (toastSuccessEl) toastSuccess = new window.bootstrap.Modal(toastSuccessEl, {})
  // Override de los toasts (Bootstrap Toast)
  if (toastActionEl) toastAction = new window.bootstrap.Toast(toastActionEl)
  if (toastSuccessEl) toastSuccess = new window.bootstrap.Toast(toastSuccessEl)
})
</script>

<style scoped>
* { font-family: 'Inter', sans-serif; }
:root {
  --primary-deep: #3f51b5;
  --nav-bg: #011671;
  --soft-accent: #f1ebd9;
  --light-text: #e2e4e8;
  --body-bg: #f5f7fc;
}
body { background: var(--body-bg); }
.navbar-custom { background-color: var(--nav-bg) !important; box-shadow: 0 6px 20px rgba(1, 22, 113, 0.15); }
.navbar-brand .brand-icon { font-size: 3.5rem; color: white; margin-right: 0.75rem; }
.navbar-brand .brand-text { color: white; font-weight: 700; font-size: 2rem; line-height: 1.2; }
.navbar-brand .brand-sub { color: var(--light-text); font-size: 0.95rem; }
.nav-link-custom { color: white !important; font-weight: 500; padding: 0.5rem 1.2rem; border-radius: 30px; transition: all 0.2s; background: rgba(255,255,255,0.05); }
.nav-link-custom:hover { background: rgba(255,255,255,0.15); }
.nav-link-custom.active { background: rgba(255,255,255,0.2); }
.btn-primary-deep { background: linear-gradient(135deg, var(--primary-deep), #2c3e8f); border: none; color: white; font-weight: 600; border-radius: 40px; padding: 0.5rem 1.5rem; box-shadow: 0 6px 14px rgba(63, 81, 181, 0.25); }
.btn-primary-deep:hover { background: linear-gradient(135deg, #2c3e8f, var(--primary-deep)); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(63, 81, 181, 0.35); }
.btn-outline-primary-deep { background: transparent; border: 1.5px solid var(--primary-deep); color: var(--primary-deep); font-weight: 600; border-radius: 40px; padding: 0.4rem 1.2rem; }
.btn-outline-primary-deep:hover { background: var(--primary-deep); color: white; }
.filter-bar { background: white; border-radius: 60px; padding: 0.5rem 1rem; box-shadow: 0 8px 20px rgba(0,0,0,0.02); border: 1px solid #e2e8f0; }
.forum-card { background: white; border-radius: 28px; padding: 1.8rem; box-shadow: 0 12px 24px -8px rgba(0,0,0,0.04); border: 1px solid #edf0f5; margin-bottom: 1.5rem; transition: all 0.2s; }
.forum-card:hover { box-shadow: 0 18px 30px -10px rgba(63,81,181,0.1); border-color: rgba(63,81,181,0.2); }
.sidebar-card { background: white; border-radius: 24px; padding: 1.5rem; box-shadow: 0 12px 24px -8px rgba(0,0,0,0.04); border: 1px solid #edf0f5; margin-bottom: 1.5rem; }
.avatar-circle { width: 52px; height: 52px; background: #eef2f9; border-radius: 18px; display: flex; align-items: center; justify-content: center; color: var(--primary-deep); font-weight: 700; font-size: 1.2rem; }
.category-badge { background: #e9ecf9; color: var(--primary-deep); padding: 0.3rem 1rem; border-radius: 30px; font-size: 0.75rem; font-weight: 600; cursor: pointer; }
.category-badge.active { background: var(--primary-deep); color: white; }
.footer-custom { background-color: var(--nav-bg); color: var(--light-text); }
.footer-custom a { color: var(--light-text) !important; text-decoration: none; }
.footer-custom a:hover { color: white !important; text-decoration: underline; }
.notification-badge { position: absolute; top: -5px; right: -5px; background-color: #ff4757; color: white; border-radius: 50%; padding: 0.25rem 0.45rem; font-size: 0.7rem; font-weight: bold; border: 2px solid white; }
.navbar-toggler-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); }
.interaction-btn { color: #5a6275; transition: all 0.15s; padding: 0.4rem 1rem; border-radius: 30px; background: #f8fafd; cursor: pointer; }
.interaction-btn:hover { background: var(--primary-deep); color: white; }
.cursor-pointer { cursor: pointer; }
</style>