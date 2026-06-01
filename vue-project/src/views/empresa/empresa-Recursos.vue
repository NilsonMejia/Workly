<template>
  <div>
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg py-3 recursos-nav">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal/index.html">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Panel de empresa</span>
          </div>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
            <a href="/empresa/publicar-vacante" class="nav-link-custom">Publicar</a>
            <a href="/empresa/mis-vacantes" class="nav-link-custom">Mis vacantes</a>
            <a href="/empresa/postulaciones" class="nav-link-custom">Postulaciones</a>
            <a href="/empresa/foro" class="nav-link-custom">Foro</a>
            <a href="/empresa/resena-empresa" class="nav-link-custom">ReseÃ±as</a>
            <a href="/empresa/recursos" class="nav-link-custom active">Recursos</a>
          </div>
          <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <a href="/empresa/notificaciones" class="text-white position-relative text-decoration-none">
              <i class="bi bi-bell-fill fs-4"></i>
              <span class="notification-badge badge rounded-pill bg-danger">0</span>
            </a>
            <a href="/empresa/perfil" class="text-white text-decoration-none">
              <i class="bi bi-person-circle fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-4 py-lg-5">
      <div class="container px-4 px-lg-5">
        <!-- Hero section -->
        <section class="hero-card mb-4">
          <div class="row g-4 align-items-center">
            <div class="col-12 col-xl-7">
              <span class="hero-chip">Biblioteca curada</span>
              <h1 class="hero-title mt-3 mb-3">Recursos listos para reclutar mejor y moverte mÃ¡s rÃ¡pido.</h1>
              <p class="hero-copy mb-0">Encuentra guÃ­as, plantillas y materiales prÃ¡cticos para publicar mejor, entrevistar con mÃ¡s criterio y dar seguimiento profesional a cada candidato.</p>
            </div>
            <div class="col-12 col-xl-5">
              <div class="hero-stats">
                <div class="stat-box">
                  <span class="stat-label">Recursos</span>
                  <strong class="stat-value">{{ totalRecursos }}</strong>
                </div>
                <div class="stat-box">
                  <span class="stat-label">CategorÃ­as</span>
                  <strong class="stat-value">{{ categoriasUnicas.length }}</strong>
                </div>
                <div class="stat-box">
                  <span class="stat-label">Favoritos</span>
                  <strong class="stat-value">3</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Filtros -->
        <section class="panel-card mb-4">
          <div class="row g-3 align-items-end">
            <div class="col-12 col-lg-6">
              <label class="form-label fw-semibold">Buscar recurso</label>
              <div class="search-shell">
                <i class="bi bi-search text-muted"></i>
                <input type="search" class="form-control border-0 shadow-none" placeholder="GuÃ­as, entrevistas, plantillas, onboarding..." v-model="searchTerm" @keydown.enter="aplicarFiltros">
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <label class="form-label fw-semibold">CategorÃ­a</label>
              <select class="form-select form-select-lg rounded-4 border-0 surface-input" v-model="selectedCategory" @change="aplicarFiltros">
                <option value="">Todas las categorÃ­as</option>
                <option v-for="cat in categoriasUnicas" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
            <div class="col-12 col-lg-3 d-grid">
              <button type="button" class="btn btn-primary btn-lg rounded-4" @click="aplicarFiltros">
                <i class="bi bi-funnel me-2"></i>Aplicar bÃºsqueda
              </button>
            </div>
          </div>
        </section>

        <div class="row g-4">
          <!-- Lista de recursos -->
          <section class="col-12 col-xl-8">
            <div class="panel-card">
              <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                <div>
                  <h2 class="h4 fw-bold mb-1">Biblioteca de recursos</h2>
                  <p class="text-muted mb-0">{{ estadoMensaje }}</p>
                </div>
                <span class="badge text-bg-light rounded-pill px-3 py-2">{{ recursosFiltrados.length }} resultados</span>
              </div>

              <div class="row g-4">
                <div v-for="recurso in recursosFiltrados" :key="recurso.id" class="col-12 col-md-6">
                  <article class="resource-card">
                    <span class="resource-format">{{ recurso.formato }}</span>
                    <h3>{{ recurso.titulo }}</h3>
                    <p>{{ recurso.descripcion }}</p>
                    <div class="resource-meta">
                      <span class="tag">{{ recurso.categoria }}</span>
                      <span class="tag soft">{{ recurso.meta }}</span>
                    </div>
                    <div class="resource-actions">
                      <button class="btn btn-outline-primary rounded-pill" @click="mostrarToast(`Abriendo ${recurso.titulo}`)">Ver</button>
                      <button class="btn btn-primary rounded-pill" @click="mostrarToast(`Descargando ${recurso.titulo}`)">Descargar</button>
                    </div>
                  </article>
                </div>
              </div>

              <!-- Empty state -->
              <div v-if="recursosFiltrados.length === 0" class="empty-state">
                <i class="bi bi-journal-x"></i>
                <h3>No encontramos recursos con ese filtro</h3>
                <p>Prueba otra palabra o cambia la categorÃ­a para ver mÃ¡s materiales.</p>
              </div>
            </div>
          </section>

          <!-- Sidebar -->
          <aside class="col-12 col-xl-4">
            <div class="sidebar-card mb-4">
              <h3 class="h5 fw-bold mb-3">Accesos rÃ¡pidos</h3>
              <div class="quick-links">
                <button v-for="link in quickLinks" :key="link.titulo" class="quick-link" @click="mostrarToast(link.accion)">{{ link.titulo }}</button>
              </div>
            </div>

            <div class="sidebar-card mb-4">
              <h3 class="h5 fw-bold mb-3">CategorÃ­as</h3>
              <div class="category-list">
                <button class="category-row" :class="{ active: selectedCategory === '' }" @click="selectedCategory = ''; aplicarFiltros()">
                  Todas <span>{{ totalRecursos }}</span>
                </button>
                <button v-for="cat in categoriasUnicas" :key="cat" class="category-row" :class="{ active: selectedCategory === cat }" @click="selectedCategory = cat; aplicarFiltros()">
                  {{ cat }} <span>{{ contarPorCategoria(cat) }}</span>
                </button>
              </div>
            </div>

            <div class="sidebar-card">
              <h3 class="h5 fw-bold mb-3">Favoritos del equipo</h3>
              <ul class="favorite-list mb-0">
                <li>Formato de evaluaciÃ³n de candidato</li>
                <li>Webinar de reclutamiento moderno</li>
                <li>Checklist para entrevistas</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <!-- Toast -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div id="toastAccion" class="toast align-items-center border-0 rounded-4 shadow" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body" id="toastTexto">{{ toastMensaje }}</div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
        </div>
      </div>
    </div>

    <footer class="footer-custom py-4 mt-auto text-center text-white-50">
      <div class="container">
        <span>Workly 2026 | Recursos para contratar con mÃ¡s orden y criterio</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { requireAuth } from '../../services/api.js'

onBeforeMount(() => {
  requireAuth(['empresa'])
})

// Datos de recursos (extraÃ­dos del HTML estÃ¡tico)
const recursos = ref([
  {
    id: 1,
    titulo: 'GuÃ­a para redactar vacantes efectivas',
    descripcion: 'Aprende a escribir descripciones claras, precisas y atractivas para traer candidatos mÃ¡s alineados desde la primera publicaciÃ³n.',
    categoria: 'Reclutamiento',
    formato: 'PDF',
    meta: '12 min'
  },
  {
    id: 2,
    titulo: 'Plantilla de entrevista tÃ©cnica',
    descripcion: 'Una estructura lista para ordenar preguntas, puntajes y observaciones sin improvisar durante la entrevista.',
    categoria: 'Entrevistas',
    formato: 'DOCX',
    meta: 'Editable'
  },
  {
    id: 3,
    titulo: 'Matriz de evaluaciÃ³n de candidatos',
    descripcion: 'Compara perfiles con criterios uniformes para reducir sesgos y dejar trazabilidad clara de la decisiÃ³n.',
    categoria: 'Evaluacion',
    formato: 'XLSX',
    meta: 'Comparativo'
  },
  {
    id: 4,
    titulo: 'Webinar: marca empleadora',
    descripcion: 'Ideas concretas para mejorar la percepciÃ³n de tu empresa y fortalecer la atracciÃ³n de talento desde tus publicaciones.',
    categoria: 'Capacitaciones',
    formato: 'VIDEO',
    meta: '45 min'
  },
  {
    id: 5,
    titulo: 'Checklist para entrevistas',
    descripcion: 'Una lista breve para asegurar consistencia en agenda, preguntas, cierre y seguimiento posterior al contacto.',
    categoria: 'Entrevistas',
    formato: 'PDF',
    meta: 'Checklist'
  },
  {
    id: 6,
    titulo: 'Manual de onboarding inicial',
    descripcion: 'Recorrido prÃ¡ctico para que la experiencia del nuevo talento empiece con claridad desde el primer dÃ­a.',
    categoria: 'Reclutamiento',
    formato: 'PDF',
    meta: 'Onboarding'
  }
])

// Quick links
const quickLinks = [
  { titulo: 'GuÃ­a de vacantes', accion: 'Abriendo guÃ­a para redactar vacantes efectivas' },
  { titulo: 'Plantilla tÃ©cnica', accion: 'Abriendo plantilla de entrevista tÃ©cnica' },
  { titulo: 'Checklist de entrevistas', accion: 'Abriendo checklist para entrevistas' }
]

// Filtros
const searchTerm = ref('')
const selectedCategory = ref('')

// Computed: categorÃ­as Ãºnicas para el filtro
const categoriasUnicas = computed(() => {
  const cats = recursos.value.map(r => r.categoria)
  return [...new Set(cats)]
})

// Computed: total de recursos
const totalRecursos = computed(() => recursos.value.length)

// Computed: recursos filtrados
const recursosFiltrados = computed(() => {
  let filtered = recursos.value
  const term = searchTerm.value.trim().toLowerCase()
  if (term) {
    filtered = filtered.filter(r => r.titulo.toLowerCase().includes(term))
  }
  if (selectedCategory.value) {
    filtered = filtered.filter(r => r.categoria === selectedCategory.value)
  }
  return filtered
})

// Computed: mensaje de estado para la UI
const estadoMensaje = computed(() => {
  const total = recursosFiltrados.value.length
  if (total === recursos.value.length) return 'Mostrando todos los recursos disponibles.'
  if (total > 0) return 'Mostrando solo los recursos que coinciden con tu bÃºsqueda.'
  return 'No hubo coincidencias con los filtros actuales.'
})

// Contar recursos por categorÃ­a (para sidebar)
const contarPorCategoria = (categoria) => {
  return recursos.value.filter(r => r.categoria === categoria).length
}

// Toast
let toastInstance = null
const toastMensaje = ref('')
const mostrarToast = (mensaje) => {
  toastMensaje.value = `<i class="bi bi-info-circle-fill me-2"></i>${mensaje}`
  toastInstance?.show()
}

// Aplicar filtros (solo fuerza la reactividad, ya estÃ¡ cubierta por computed)
const aplicarFiltros = () => {
  // Los computados se actualizan automÃ¡ticamente por los v-model
  // Esta funciÃ³n es Ãºtil por si se necesita lÃ³gica extra, pero aquÃ­ solo refresca.
}

// Inicializar Toast de Bootstrap
onMounted(() => {
  const toastEl = document.getElementById('toastAccion')
  if (toastEl) toastInstance = new window.bootstrap.Toast(toastEl)
})
</script>

<style scoped>
:root {
  --nav-bg: #04154b;
  --primary: #275df5;
  --primary-soft: #eef3ff;
  --text-main: #182033;
  --text-soft: #6a7488;
  --panel-shadow: 0 24px 45px -20px rgba(4, 21, 75, 0.18);
}

* {
  font-family: "Inter", sans-serif;
}

body {
  background:
    radial-gradient(circle at top right, rgba(39, 93, 245, 0.12), transparent 28%),
    linear-gradient(180deg, #eef4ff 0%, #f8fbff 100%);
  color: var(--text-main);
}

.recursos-nav,
.footer-custom {
  background: var(--nav-bg);
}

.brand-icon {
  color: #fff;
  font-size: 2rem;
}

.brand-text {
  color: #fff;
  display: block;
  font-size: 1.8rem;
  font-weight: 800;
}

.brand-sub {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.9rem;
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
  background: rgba(255, 255, 255, 0.14);
}

.notification-badge {
  min-width: 1.35rem;
}

.hero-card,
.panel-card,
.sidebar-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 32px;
  box-shadow: var(--panel-shadow);
}

.hero-card {
  padding: 2rem;
  background: linear-gradient(135deg, #082070 0%, #275df5 58%, #90adff 100%);
  color: #fff;
  overflow: hidden;
  position: relative;
}

.hero-card::after {
  content: "";
  position: absolute;
  inset: auto -40px -60px auto;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 0.55rem 1rem;
  font-weight: 700;
  font-size: 0.88rem;
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.05;
}

.hero-copy {
  max-width: 58ch;
  color: rgba(255, 255, 255, 0.82);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-box {
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 24px;
  padding: 1rem;
  backdrop-filter: blur(8px);
}

.stat-label {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.82rem;
  margin-bottom: 0.35rem;
}

.stat-value {
  font-size: 1.7rem;
  font-weight: 800;
}

.panel-card,
.sidebar-card {
  padding: 1.6rem;
}

.search-shell {
  align-items: center;
  background: var(--primary-soft);
  border-radius: 22px;
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
}

.search-shell input,
.surface-input {
  background: var(--primary-soft);
}

.search-shell input {
  padding: 0;
}

.resource-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid #e5edff;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.resource-card:hover {
  box-shadow: 0 20px 34px -24px rgba(39, 93, 245, 0.45);
  transform: translateY(-3px);
}

.resource-format {
  align-self: flex-start;
  background: #dfe9ff;
  border-radius: 999px;
  color: var(--primary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.45rem 0.85rem;
  text-transform: uppercase;
}

.resource-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}

.resource-card p {
  color: var(--text-soft);
  margin: 0;
}

.resource-meta,
.resource-actions,
.quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: #eff4ff;
  border-radius: 999px;
  color: var(--primary);
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.45rem 0.8rem;
}

.tag.soft {
  color: #5d6b86;
}

.quick-link,
.category-row {
  background: #fff;
  border: 1px solid #e7edf9;
  border-radius: 18px;
  color: var(--text-main);
  padding: 0.85rem 1rem;
  text-align: left;
  transition: 0.2s ease;
  width: 100%;
}

.quick-link:hover,
.category-row:hover {
  border-color: #cdddff;
  box-shadow: 0 12px 22px -20px rgba(39, 93, 245, 0.6);
}

.category-row.active {
  background: var(--primary-soft);
  border-color: var(--primary);
}

.category-list {
  display: grid;
  gap: 0.75rem;
}

.category-row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.category-row span {
  color: var(--text-soft);
  font-weight: 700;
}

.favorite-list {
  color: var(--text-soft);
  display: grid;
  gap: 0.8rem;
  padding-left: 1.1rem;
}

.empty-state {
  align-items: center;
  background: #f8fbff;
  border: 1px dashed #c8d8ff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 2.5rem 1.5rem;
  text-align: center;
}

.empty-state i {
  color: var(--primary);
  font-size: 2.4rem;
}

#toastAccion {
  background: #102a7a;
  color: #fff;
}

@media (max-width: 991px) {
  .hero-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .hero-card,
  .panel-card,
  .sidebar-card {
    border-radius: 24px;
    padding: 1.25rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .resource-actions .btn {
    width: 100%;
  }
}
</style>