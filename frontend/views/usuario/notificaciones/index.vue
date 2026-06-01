<template>
  <div class="d-flex flex-column min-vh-100">
    <UserNavbar active="notificaciones" />

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
              <button @click="marcarTodasLeidas" class="btn btn-primary rounded-pill px-4">
                <i class="bi bi-check2-all me-2"></i>Marcar todas como leídas
              </button>
            </div>

            <div v-if="alerta.mostrar" :class="`alert alert-${alerta.tipo} alert-dismissible fade show rounded-4 shadow-sm mb-3`" role="alert">
              {{ alerta.mensaje }}
              <button type="button" class="btn-close" @click="alerta.mostrar = false" aria-label="Cerrar"></button>
            </div>

            <div class="row g-3 align-items-end mb-4">
              <div class="col-12 col-lg-5">
                <label class="form-label fw-semibold">Buscar</label>
                <input v-model="filtros.buscar" @keyup.enter="init" type="search" class="form-control form-control-lg rounded-4" placeholder="Título o mensaje">
              </div>
              <div class="col-12 col-md-6 col-lg-3">
                <label class="form-label fw-semibold">Tipo</label>
                <select v-model="filtros.tipo" class="form-select form-select-lg rounded-4">
                  <option value="">Todas</option>
                  <option value="postulacion">Postulaciones</option>
                  <option value="estado">Estados</option>
                  <option value="sistema">Sistema</option>
                  <option value="comentario">Comentarios</option>
                </select>
              </div>
              <div class="col-12 col-md-6 col-lg-2">
                <label class="form-label fw-semibold">Estado</label>
                <select v-model="filtros.leida" class="form-select form-select-lg rounded-4">
                  <option value="">Todas</option>
                  <option value="0">No leídas</option>
                  <option value="1">Leídas</option>
                </select>
              </div>
              <div class="col-12 col-lg-2 d-grid">
                <button @click="init" class="btn btn-outline-primary btn-lg rounded-4">
                  <i class="bi bi-funnel me-2"></i>Filtrar
                </button>
              </div>
            </div>

            <div class="row g-4">
              <div class="col-12 col-xl-8">
                <div class="d-grid gap-3">
                  
                  <div v-if="notificaciones.length === 0" class="empty-state text-center p-5 rounded-4">
                    <div class="empty-state-icon mx-auto mb-3">
                      <i class="bi bi-bell-slash fs-2"></i>
                    </div>
                    <h3 class="h5 fw-bold mb-2">No hay notificaciones para mostrar</h3>
                    <p class="text-muted mb-0">Prueba otro filtro o espera nuevas respuestas de empresas.</p>
                  </div>

                  <article v-else v-for="item in notificaciones" :key="item.id_notificacion" class="notification-card" :class="{ 'is-unread': Number(item.leida) === 0 }">
                    <div class="d-flex gap-3">
                      <div class="notification-icon flex-shrink-0">
                        <i :class="['bi', ICONOS[item.tipo_notificacion] || ICONOS.sistema]"></i>
                      </div>
                      <div class="flex-grow-1">
                        <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
                          <div>
                            <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                              <h3 class="h6 fw-bold mb-0">{{ item.titulo }}</h3>
                              <span class="badge rounded-pill text-bg-light border text-uppercase">{{ getTypeLabel(item.tipo_notificacion) }}</span>
                              <span v-if="Number(item.leida) === 0" class="badge rounded-pill text-bg-primary">Nuevo</span>
                            </div>
                            <p class="text-muted mb-0">{{ item.mensaje }}</p>
                          </div>
                          <small class="text-muted text-lg-end">{{ formatDate(item.fecha_creacion) }}</small>
                        </div>
                        <div class="d-flex flex-wrap gap-2 mt-3">
                          <button @click="toggleLeida(item.id_notificacion, item.leida)" type="button" :class="['btn btn-sm rounded-pill', Number(item.leida) === 0 ? 'btn-outline-primary' : 'btn-outline-secondary']">
                            <i :class="['bi me-1', Number(item.leida) === 0 ? 'bi-check2' : 'bi-envelope']"></i>
                            {{ Number(item.leida) === 0 ? "Marcar leída" : "Marcar no leída" }}
                          </button>
                          
                          <a v-if="item.enlace" :href="resolveNotificationLink(item.enlace)" class="btn btn-sm btn-light rounded-pill border">
                            <i class="bi bi-box-arrow-up-right me-1"></i>Ver detalle
                          </a>
                          
                          <button @click="eliminarNotificacion(item.id_notificacion)" type="button" class="btn btn-sm btn-outline-danger rounded-pill">
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
                    <strong>{{ resumen.cambios_estado }}</strong>
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
                    <a href="../buscarempleo" class="btn btn-light border rounded-4 text-start">
                      <i class="bi bi-search me-2"></i>Explorar vacantes
                    </a>
                    <a href="../valoracionempresa" class="btn btn-light border rounded-4 text-start">
                      <i class="bi bi-star me-2"></i>Ver valoraciones
                    </a>
                    <a href="../miperfil" class="btn btn-light border rounded-4 text-start">
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
import UserNavbar from "../../../components/UserNavbar.vue";
import { ref, onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

// === VARIABLES REACTIVAS DE VUE ===
const notificaciones = ref([]);
const resumen = ref({
  no_leidas: 0,
  postulaciones: 0,
  cambios_estado: 0,
  sistema: 0,
  total: 0
});

const filtros = ref({
  buscar: "",
  tipo: "",
  leida: ""
});

const alerta = ref({
  mostrar: false,
  mensaje: "",
  tipo: "danger"
});

const ICONOS = {
  postulacion: "bi-send-check",
  estado: "bi-arrow-repeat",
  sistema: "bi-bell-fill",
  comentario: "bi-chat-left-text-fill"
};

const authHeaders = {
  Authorization: `Bearer ${getToken()}`
};

// === FUNCIONES UTILITARIAS ===
const mostrarAlerta = (mensaje, tipo = "danger") => {
  alerta.value = { mostrar: true, mensaje, tipo };
  // Ocultar automáticamente después de 5 segundos
  setTimeout(() => alerta.value.mostrar = false, 5000);
};

const resolveNotificationLink = (value) => {
  if (!value) return null;
  try {
    return new URL(value, API_URL).toString();
  } catch {
    return value;
  }
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

const getFilterQuery = () => {
  const params = new URLSearchParams();
  if (filtros.value.tipo) params.set("tipo_notificacion", filtros.value.tipo);
  if (filtros.value.leida) params.set("leida", filtros.value.leida);
  if (filtros.value.buscar.trim()) params.set("search", filtros.value.buscar.trim());
  return params.toString();
};

// === CONSUMO DE API ===
const actualizarResumen = async () => {
  try {
    const response = await fetch(`${API_URL}/notificaciones/resumen`, { headers: authHeaders });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mensaje || "No se pudo cargar el resumen");
    
    // Actualizamos el objeto reactivo y Vue pinta los números solos
    resumen.value = {
      no_leidas: data.no_leidas ?? 0,
      postulaciones: data.postulaciones ?? 0,
      cambios_estado: data.cambios_estado ?? 0,
      sistema: data.sistema ?? 0,
      total: data.total ?? 0
    };
  } catch (error) {
    console.error("Error resumen:", error);
  }
};

const cargarNotificaciones = async () => {
  try {
    const query = getFilterQuery();
    const response = await fetch(`${API_URL}/notificaciones${query ? `?${query}` : ""}`, { headers: authHeaders });
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.mensaje || "No se pudieron cargar las notificaciones");
    
    notificaciones.value = Array.isArray(data) ? data : [];
  } catch (error) {
    mostrarAlerta(error.message);
  }
};

const toggleLeida = async (id, leida) => {
  try {
    const path = Number(leida) === 0 ? "leer" : "no-leida";
    const response = await fetch(`${API_URL}/notificaciones/${id}/${path}`, {
      method: "PUT",
      headers: authHeaders
    });
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.mensaje || "No se pudo actualizar la notificación");
    
    mostrarAlerta(data.mensaje, "success");
    await init();
  } catch (error) {
    mostrarAlerta(error.message);
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
    
    mostrarAlerta(data.mensaje, "success");
    await init();
  } catch (error) {
    mostrarAlerta(error.message);
  }
};

const marcarTodasLeidas = async () => {
  try {
    const response = await fetch(`${API_URL}/notificaciones/marcar-todas/leidas`, {
      method: "PUT",
      headers: authHeaders
    });
    const data = await response.json();
    
    if (!response.ok) throw new Error(data.mensaje || "No se pudieron marcar todas");
    
    mostrarAlerta(data.mensaje, "success");
    await init();
  } catch (error) {
    mostrarAlerta(error.message);
  }
};

const init = async () => {
  await Promise.all([actualizarResumen(), cargarNotificaciones()]);
};

// === CICLO DE VIDA ===
onMounted(async () => {
  requireAuth(["usuario"]);
  
  try {
    await init();
  } catch (error) {
    mostrarAlerta(error.message || "No se pudo cargar la vista de notificaciones");
  }
});
</script>

<style>
/* SE MANTIENE TU CSS INTACTO */
:root {
      --nav-bg: #011671;
      --page-bg: linear-gradient(180deg, #edf3ff 0%, #f7faff 100%);
      --primary-deep: #3f51b5;
      --card-shadow: 0 24px 45px -18px rgba(1, 22, 113, 0.18);
    }

    body {
      font-family: "Inter", sans-serif;
      background: var(--page-bg);
      color: #182033;
    }

    .navbar-custom,
    .footer-custom {
      background: var(--nav-bg);
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
      box-shadow: var(--card-shadow);
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
      color: var(--primary-deep);
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
      border-left: 6px solid var(--primary-deep);
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
      color: var(--primary-deep);
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
      color: var(--primary-deep);
    }

    .notification-badge {
      min-width: 1.4rem;
    }

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
