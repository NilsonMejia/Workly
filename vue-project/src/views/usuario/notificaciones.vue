<template>
  <div class="d-flex flex-column min-vh-100 body-notifications">
    <nav class="navbar navbar-expand-lg navbar-custom py-3">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="#">
          <i class="bi bi-briefcase-fill text-white fs-2"></i>
          <div class="lh-sm ms-2">
            <span class="text-white fw-bold fs-3">Workly</span>
            <span class="d-block text-white-50 small">Tu búsqueda de trabajo profesional</span>
          </div>
        </a>

        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
          <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
            <a href="#" class="nav-link-custom">Buscar empleo</a>
            <a href="#" class="nav-link-custom">Recursos</a>
            <a href="#" class="nav-link-custom">Valoraciones</a>
            <a href="#" class="nav-link-custom">Mi perfil</a>
          </div>
          <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <a href="#" class="text-white position-relative text-decoration-none">
              <i class="bi bi-bell-fill fs-4"></i>
              <span class="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ resumen.no_leidas }}
              </span>
            </a>
            <a href="#" class="text-white text-decoration-none">
              <i class="bi bi-person-circle fs-4"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-4 py-lg-5">
      <div class="container px-4 px-lg-5">
        
        <section class="surface-card hero-card p-4 p-lg-5 mb-4">
          <div class="row g-4 align-items-center position-relative">
            <div class="col-12 col-xl-7">
              <span class="badge rounded-pill text-bg-light text-primary fw-semibold mb-3">Centro de alertas</span>
              <h1 class="display-6 fw-bold mb-2">Mantente al día con cada movimiento de tus postulaciones</h1>
              <p class="mb-0 text-white-50">Controla respuestas de empresas, cambios de estado y mensajes clave desde un solo panel.</p>
            </div>
            <div class="col-12 col-xl-5">
              <div class="row g-3">
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Sin leer</div>
                    <div class="fs-3 fw-bold">{{ resumen.no_leidas }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Total</div>
                    <div class="fs-3 fw-bold">{{ resumen.total }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Postulaciones</div>
                    <div class="fs-5 fw-bold">{{ resumen.postulaciones }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="metric-pill">
                    <div class="small text-white-50 mb-1">Sistema</div>
                    <div class="fs-5 fw-bold">{{ resumen.sistema }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="surface-card p-4 p-lg-5">
          <div class="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">
            <div>
              <h2 class="h3 fw-bold mb-1">Bandeja personal</h2>
              <p class="text-muted mb-0">Filtra rápido y revisa qué sigue en cada oportunidad.</p>
            </div>
            <button class="btn btn-primary rounded-pill px-4" @click="marcarTodasComoLeidas">
              <i class="bi bi-check2-all me-2"></i>Marcar todas como leídas
            </button>
          </div>

          <div v-if="alerta.mensaje" :class="['alert', `alert-${alerta.tipo}`, 'alert-dismissible', 'fade', 'show', 'rounded-4', 'shadow-sm']" role="alert">
            {{ alerta.mensaje }}
            <button type="button" class="btn-close" @click="alerta.mensaje = ''" aria-label="Cerrar"></button>
          </div>

          <div class="row g-3 align-items-end mb-4">
            <div class="col-12 col-lg-5">
              <label for="inputBuscar" class="form-label fw-semibold">Buscar</label>
              <input id="inputBuscar" v-model="filtros.search" type="search" class="form-control form-control-lg rounded-4" placeholder="Título o mensaje" @keydown.enter="aplicarFiltros">
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <label for="filtroTipo" class="form-label fw-semibold">Tipo</label>
              <select id="filtroTipo" v-model="filtros.tipo" class="form-select form-select-lg rounded-4">
                <option value="">Todas</option>
                <option value="postulacion">Postulaciones</option>
                <option value="estado">Estados</option>
                <option value="sistema">Sistema</option>
                <option value="comentario">Comentarios</option>
              </select>
            </div>
            <div class="col-12 col-md-6 col-lg-2">
              <label for="filtroLeida" class="form-label fw-semibold">Estado</label>
              <select id="filtroLeida" v-model="filtros.leida" class="form-select form-select-lg rounded-4">
                <option value="">Todas</option>
                <option value="0">No leídas</option>
                <option value="1">Leídas</option>
              </select>
            </div>
            <div class="col-12 col-lg-2 d-grid">
              <button class="btn btn-outline-primary btn-lg rounded-4" @click="aplicarFiltros">
                <i class="bi bi-funnel me-2"></i>Filtrar
              </button>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-12 col-xl-8">
              <div v-if="loading" class="text-center p-5">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">Cargando alertas...</span>
                </div>
              </div>

              <div v-else-if="!notificaciones.length" class="empty-state text-center p-5 rounded-4">
                <div class="empty-state-icon mx-auto mb-3">
                  <i class="bi bi-bell-slash fs-2"></i>
                </div>
                <h3 class="h5 fw-bold mb-2">No hay notificaciones para mostrar</h3>
                <p class="text-muted mb-0">Prueba otro filtro o espera nuevas respuestas de empresas.</p>
              </div>

              <div v-else class="d-grid gap-3">
                <article 
                  v-for="item in notificaciones" 
                  :key="item.id_notificacion" 
                  :class="['notification-card', 'notificacion-item', { 'is-unread': Number(item.leida) === 0, 'notificacion-no-leida': Number(item.leida) === 0 }]"
                >
                  <div class="d-flex gap-3">
                    <div class="notification-icon flex-shrink-0">
                      <i :class="['bi', ICONOS[item.tipo_notificacion] || ICONOS.sistema]"></i>
                    </div>
                    <div class="flex-grow-1">
                      <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
                        <div>
                          <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                            <h3 class="h6 fw-bold mb-0 notificacion-titulo">{{ item.titulo }}</h3>
                            <span class="badge rounded-pill text-bg-light border text-uppercase">{{ getTypeLabel(item.tipo_notificacion) }}</span>
                            <span v-if="Number(item.leida) === 0" class="badge rounded-pill text-bg-primary">Nuevo</span>
                          </div>
                          <p class="text-muted mb-0">{{ item.mensaje }}</p>
                        </div>
                        <small class="text-muted text-lg-end notificacion-meta">{{ formatDate(item.fecha_creacion) }}</small>
                      </div>
                      <div class="d-flex flex-wrap gap-2 mt-3">
                        <button type="button" :class="['btn', 'btn-sm', Number(item.leida) === 0 ? 'btn-outline-primary' : 'btn-outline-secondary', 'rounded-pill']" @click="toggleLeida(item.id_notificacion, item.leida)">
                          <i :class="['bi', Number(item.leida) === 0 ? 'bi-check2' : 'bi-envelope', 'me-1']"></i>
                          {{ Number(item.leida) === 0 ? "Marcar leída" : "Marcar no leída" }}
                        </button>
                        <a v-if="item.enlace" class="btn btn-sm btn-light rounded-pill border" :href="resolveNotificationLink(item.enlace)">
                          <i class="bi bi-box-arrow-up-right me-1"></i>Ver detalle
                        </a>
                        <button type="button" class="btn btn-sm btn-outline-danger rounded-pill" @click="eliminarNotificacion(item.id_notificacion)">
                          <i class="bi bi-trash3 me-1"></i>Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div class="col-12 col-xl-4">
              <div class="summary-card p-4 mb-3">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="summary-icon"><i class="bi bi-send-check"></i></div>
                  <div>
                    <h3 class="h5 fw-bold mb-0">Seguimiento</h3>
                    <p class="text-muted small mb-0">Resumen rápido de tu estado actual</p>
                  </div>
                </div>
                <div class="d-flex justify-content-between">
                  <span class="text-muted">Cambios de estado</span>
                  <strong id="resumenEstado">{{ resumen.cambios_estado }}</strong>
                </div>
              </div>

              <div class="summary-card p-4 mb-3">
                <div class="d-flex align-items-center gap-3 mb-3">
                  <div class="summary-icon"><i class="bi bi-lightning-charge-fill"></i></div>
                  <div>
                    <h3 class="h5 fw-bold mb-0">Acciones rápidas</h3>
                    <p class="text-muted small mb-0">Atajos útiles para seguir postulando</p>
                  </div>
                </div>
                <div class="d-grid gap-2">
                  <a href="#" class="btn btn-light border rounded-4 text-start">
                    <i class="bi bi-search me-2"></i>Explorar vacantes
                  </a>
                  <a href="#" class="btn btn-light border rounded-4 text-start">
                    <i class="bi bi-star me-2"></i>Ver valoraciones
                  </a>
                  <a href="#" class="btn btn-light border rounded-4 text-start">
                    <i class="bi bi-person-badge me-2"></i>Actualizar perfil
                  </a>
                </div>
              </div>

              <div class="summary-card p-4">
                <h3 class="h5 fw-bold mb-3">Buenas prácticas</h3>
                <ul class="list-unstyled text-muted small mb-0 d-grid gap-2">
                  <li><i class="bi bi-check2-circle text-primary me-2"></i>Revisa cambios de estado en cuanto aparezcan.</li>
                  <li><i class="bi bi-check2-circle text-primary me-2"></i>Abre el detalle cuando una empresa responda.</li>
                  <li><i class="bi bi-check2-circle text-primary me-2"></i>Mantén tu perfil actualizado para nuevas oportunidades.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>

    <footer class="footer-custom py-4 mt-auto text-center text-white-50">
      <div class="container">
        <span>Workly 2026 | Gestiona tus oportunidades con orden y claridad</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

// Diccionario de Íconos
const ICONOS = {
  postulacion: "bi-send-check",
  estado: "bi-arrow-repeat",
  sistema: "bi-bell-fill",
  comentario: "bi-chat-left-text-fill"
};

// Estados Reactivos
const notificaciones = ref([]);
const loading = ref(false);

const filtros = reactive({
  search: '',
  tipo: '',
  leida: ''
});

const resumen = reactive({
  no_leidas: 0,
  postulaciones: 0,
  cambios_estado: 0,
  sistema: 0,
  total: 0
});

const alerta = reactive({
  mensaje: '',
  tipo: 'danger'
});

// Headers de autenticación estáticos basados en tu config.js
const authHeaders = {
  Authorization: `Bearer ${getToken()}`
};

// Métodos de formato y resolución
const resolveNotificationLink = (value) => {
  if (!value) return null;
  try {
    return new URL(value, API_URL).toString();
  } catch {
    return value;
  }
};

const showAlert = (message, type = "danger") => {
  alerta.mensaje = message;
  alerta.tipo = type;
};

const formatDate = (value) => {
  if (!value) return "Reciente";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Reciente"
    : date.toLocaleString("es-SV", { dateStyle: "medium", timeStyle: "short" });
};

const getTypeLabel = (value) => {
  const labels = {
    postulacion: "Postulación",
    estado: "Estado",
    sistema: "Sistema",
    comentario: "Comentario"
  };
  return labels[value] || "Sistema";
};

// Obtención de Query Params a través del estado de Vue
const getFilterQuery = () => {
  const params = new URLSearchParams();
  if (filtros.tipo) params.set("tipo_notificacion", filtros.tipo);
  if (filtros.leida) params.set("leida", filtros.leida);
  if (filtros.search.trim()) params.set("search", filtros.search.trim());
  return params.toString();
};

// Solicitudes HTTP de la API
const actualizarResumen = async () => {
  const response = await fetch(`${API_URL}/notificaciones/resumen`, {
    headers: authHeaders
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || "No se pudo cargar el resumen");
  
  resumen.no_leidas = data.no_leidas ?? 0;
  resumen.postulaciones = data.postulaciones ?? 0;
  resumen.cambios_estado = data.cambios_estado ?? 0;
  resumen.sistema = data.sistema ?? 0;
  resumen.total = data.total ?? 0;
};

const cargarNotificaciones = async () => {
  const query = getFilterQuery();
  const response = await fetch(`${API_URL}/notificaciones${query ? `?${query}` : ""}`, {
    headers: authHeaders
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || "No se pudieron cargar las notificaciones");
  
  notificaciones.value = Array.isArray(data) ? data : [];
};

const init = async () => {
  loading.value = true;
  try {
    await Promise.all([actualizarResumen(), cargarNotificaciones()]);
  } finally {
    loading.value = false;
  }
};

const aplicarFiltros = async () => {
  try {
    await init();
  } catch (error) {
    showAlert(error.message);
  }
};

const toggleLeida = async (id, leida) => {
  const path = Number(leida) === 0 ? "leer" : "no-leida";
  try {
    const response = await fetch(`${API_URL}/notificaciones/${id}/${path}`, {
      method: "PUT",
      headers: authHeaders
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensaje || "No se pudo actualizar la notificación");

    showAlert(data.mensaje, "success");
    await init();
  } catch (error) {
    showAlert(error.message);
  }
};

const eliminarNotificacion = async (id) => {
  try {
    const response = await fetch(`${API_URL}/notificaciones/${id}`, {
      method: "DELETE",
      headers: authHeaders
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensaje || "No se pudo eliminar la notificación");

    showAlert(data.mensaje, "success");
    await init();
  } catch (error) {
    showAlert(error.message);
  }
};

const marcarTodasComoLeidas = async () => {
  try {
    const response = await fetch(`${API_URL}/notificaciones/marcar-todas/leidas`, {
      method: "PUT",
      headers: authHeaders
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensaje || "No se pudieron marcar todas las notificaciones");

    showAlert(data.mensaje, "success");
    await init();
  } catch (error) {
    showAlert(error.message);
  }
};

// Ciclo de Vida y Middlewares de Ruta
onMounted(() => {
  requireAuth(["usuario"]);
  init().catch((error) => {
    console.error(error);
    showAlert(error.message || "No se pudo cargar la vista de notificaciones");
  });
});
</script>

<style scoped>
:root {
  --nav-bg: #011671;
  --page-bg: linear-gradient(180deg, #edf3ff 0%, #f7faff 100%);
  --primary-deep: #3f51b5;
  --card-shadow: 0 24px 45px -18px rgba(1, 22, 113, 0.18);
}

.body-notifications {
  font-family: "Inter", sans-serif;
  background: linear-gradient(180deg, #edf3ff 0%, #f7faff 100%);
  color: #182033;
}

.navbar-custom,
.footer-custom {
  background: #011671;
}

.nav-link-custom {
  color: #fff;
  text-decoration: none;
  padding: 0.7rem 1.1rem;
  border-radius: 999px;
  transition: 0.2s ease;
}

.nav-link-custom:hover,
.nav-link-custom.active {
  background: rgba(255, 255, 255, 0.12);
}

.surface-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 30px;
  box-shadow: 0 24px 45px -18px rgba(1, 22, 113, 0.18);
}

.hero-card {
  background: linear-gradient(140deg, #0c1d85 0%, #465bca 55%, #8da0ff 100%);
  color: #fff;
  overflow: hidden;
  position: relative;
}

.hero-card::after {
  content: "";
  position: absolute;
  inset: auto -30px -60px auto;
  width: 220px;
  height: 220px;
  background: rgba(255, 255, 255, 0.14);
  border-radius: 50%;
}

.metric-pill {
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  padding: 1rem 1.1rem;
  backdrop-filter: blur(10px);
}

.summary-card {
  border-radius: 24px;
  border: 1px solid #e6ebf5;
  background: #fff;
  box-shadow: 0 18px 30px -24px rgba(15, 23, 42, 0.35);
}

.summary-icon {
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: #eef2ff;
  color: #3f51b5;
}

.notification-card {
  background: #fff;
  border-radius: 24px;
  border: 1px solid #e7edf7;
  padding: 1.4rem;
  box-shadow: 0 20px 32px -26px rgba(15, 23, 42, 0.45);
  transition: 0.2s ease;
}

.notification-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 38px -24px rgba(1, 22, 113, 0.28);
}

.notification-card.is-unread {
  border-left: 6px solid #3f51b5;
  background: linear-gradient(90deg, #ffffff 0%, #f8faff 100%);
}

.notification-icon {
  width: 54px;
  height: 54px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  background: #eef2ff;
  color: #3f51b5;
  font-size: 1.25rem;
}

.empty-state {
  background: #f8fafc;
  border: 1px dashed #cfd8ea;
}

.empty-state-icon {
  width: 68px;
  height: 68px;
  display: grid;
  place-items: center;
  border-radius: 22px;
  background: #eef2ff;
  color: #3f51b5;
}

.notification-badge {
  min-width: 1.4rem;
}

/* Clases CSS adicionales proporcionadas unificadas */
.notificacion-item {
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
  background: #fff;
}

.notificacion-no-leida {
  border-left: 5px solid #0d6efd;
  background: #f8fbff;
}

.notificacion-titulo {
  font-weight: 700;
}

.notificacion-meta {
  font-size: 0.9rem;
  color: #6c757d;
}
</style>