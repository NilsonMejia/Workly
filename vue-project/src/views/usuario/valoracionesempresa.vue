<template>
  <div class="d-flex flex-column min-vh-100 body-ratings">
    <nav class="navbar navbar-expand-lg navbar-custom py-3">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="/usuario/principal">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Tu búsqueda de trabajo profesional</span>
          </div>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
            <a href="/usuario/buscar-empleo" class="nav-link-custom"><i class="bi bi-search me-1"></i> Buscar empleo</a>
            <a href="/usuario/recursos" class="nav-link-custom"><i class="bi bi-journal-bookmark-fill me-1"></i> Recursos</a>
            <a href="/usuario/valoraciones-empresa" class="nav-link-custom active"><i class="bi bi-star-fill me-1"></i> Valoraciones</a>
            <a href="/usuario/mi-perfil" class="nav-link-custom"><i class="bi bi-person-badge me-1"></i> Mi Perfil</a>
          </div>
          <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <a href="/usuario/notificaciones" class="text-white position-relative text-decoration-none">
              <i class="bi bi-bell-fill fs-3"></i>
              <span class="notification-badge">0</span>
            </a>
            <a href="/usuario/mi-perfil" class="text-white text-decoration-none">
              <i class="bi bi-person-circle fs-2"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-4">
      <div class="container px-4 px-lg-5">
        <div class="surface-card p-4 p-lg-5">
          
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
            <div>
              <h1 class="h3 fw-bold mb-1">Valoraciones de empresas</h1>
              <p class="text-muted mb-0">Consulta opiniones reales y comparte tu experiencia si ya postulaste.</p>
            </div>
            <select 
              id="selectorEmpresa" 
              class="form-select form-select-lg rounded-4" 
              style="max-width: 340px;"
              :value="empresaSeleccionada?.id_empresa || ''"
              @change="handleSelectChange"
            >
              <option v-for="empresa in empresas" :key="empresa.id_empresa" :value="empresa.id_empresa">
                {{ empresa.nombre_comercial }}
              </option>
            </select>
          </div>

          <div v-if="alerta.mensaje" :class="['alert', `alert-${alerta.tipo}`, 'alert-dismissible', 'fade', 'show', 'rounded-4']" role="alert">
            {{ alerta.mensaje }}
            <button type="button" class="btn-close" @click="alerta.mensaje = ''"></button>
          </div>

          <div class="row g-4">
            <div class="col-12 col-xl-4">
              <div class="surface-card p-4 h-100">
                <h2 class="h5 fw-bold mb-3">Empresas disponibles</h2>
                <div class="d-flex flex-column gap-3 max-height-scroll" id="listaEmpresas">
                  <article 
                    v-for="empresa in empresas" 
                    :key="empresa.id_empresa"
                    :class="['empresa-card p-3', Number(empresaSeleccionada?.id_empresa) === Number(empresa.id_empresa) ? 'active' : '']"
                    @click="seleccionarEmpresa(empresa.id_empresa)"
                  >
                    <div class="d-flex justify-content-between gap-3">
                      <div>
                        <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
                          <h3 class="h6 fw-bold mb-0">{{ empresa.nombre_comercial }}</h3>
                          <span v-if="Number(empresa.puede_valorar) === 1" class="badge text-bg-success">Valorable</span>
                          <span v-if="Number(empresa.ya_valoro) === 1" class="badge text-bg-info">Ya valorada</span>
                        </div>
                        <p class="text-muted small mb-2">
                          {{ [empresa.nombre_municipio, empresa.nombre_departamento].filter(Boolean).join(", ") || "El Salvador" }}
                        </p>
                        <div class="small text-muted text-truncate-custom">{{ empresa.descripcion_empresa || "Empresa activa en Workly." }}</div>
                      </div>
                      <div class="text-end flex-shrink-0">
                        <div class="fw-bold">{{ empresa.promedio || "0.0" }}</div>
                        <small class="text-muted d-block">{{ empresa.total_valoraciones || 0 }} reseñas</small>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>

            <div class="col-12 col-xl-8">
              <div v-if="empresaSeleccionada" class="surface-card p-4 mb-4" id="resumenEmpresa">
                <div class="d-flex flex-column flex-lg-row justify-content-between gap-4">
                  <div>
                    <h2 class="h4 fw-bold mb-1">{{ empresaSeleccionada.nombre_comercial }}</h2>
                    <p class="text-muted mb-2">{{ empresaSeleccionada.descripcion_empresa || "Empresa sin descripción registrada." }}</p>
                    <div class="text-muted small">
                      {{ [empresaSeleccionada.nombre_municipio, empresaSeleccionada.nombre_departamento].filter(Boolean).join(", ") || "El Salvador" }}
                    </div>
                  </div>
                  <div class="text-lg-end flex-shrink-0">
                    <div class="display-6 fw-bold mb-1">{{ resumenInfo?.promedio || empresaSeleccionada.promedio || "0.0" }}</div>
                    <div class="mb-2" v-html="renderStars(resumenInfo?.promedio || empresaSeleccionada.promedio)"></div>
                    <span class="badge text-bg-light border rounded-pill">
                      {{ resumenInfo?.total_valoraciones || empresaSeleccionada.total_valoraciones || 0 }} valoraciones
                    </span>
                  </div>
                </div>
              </div>

              <div class="surface-card p-4 mb-4">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <h2 class="h5 fw-bold mb-0">Escribe tu valoración</h2>
                  <span :class="badgeClass" id="estadoPermiso">{{ badgeText }}</span>
                </div>
                
                <form id="formValoracion" class="row g-3" @submit.prevent="guardarValoracion">
                  <div class="col-12">
                    <label class="form-label fw-semibold">Puntuación</label>
                    <div class="d-flex gap-1" id="starRating">
                      <button 
                        v-for="star in 5" 
                        :key="star"
                        :class="['star-option', star <= form.puntuacion ? 'active' : '']" 
                        type="button" 
                        :disabled="isFormDisabled"
                        @click="form.puntuacion = star"
                      >
                        <i class="bi bi-star-fill"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-12">
                    <label class="form-label fw-semibold" for="comentario">Comentario</label>
                    <textarea 
                      id="comentario" 
                      v-model="form.comentario"
                      class="form-control form-control-lg rounded-4" 
                      rows="4" 
                      maxlength="600" 
                      placeholder="Cuéntale a otros candidatos cómo fue tu experiencia."
                      :disabled="isFormDisabled"
                    ></textarea>
                  </div>
                  <div class="col-12 d-grid d-md-flex justify-content-md-end">
                    <button class="btn btn-primary btn-lg rounded-pill px-4" type="submit" :disabled="isFormDisabled && !yaValoro" id="btnEnviarValoracion">
                      <i :class="['bi', yaValoro ? 'bi-pencil-square' : isFormDisabled ? 'bi-lock' : 'bi-send', 'me-2']"></i>
                      {{ buttonText }}
                    </button>
                  </div>
                </form>
              </div>

              <div class="surface-card p-4">
                <h2 class="h5 fw-bold mb-3">Comentarios recientes</h2>
                <div class="d-flex flex-column gap-3" id="listaValoraciones">
                  <template v-if="valoraciones.length">
                    <article v-for="item in valoraciones" :key="item.id_valoracion" class="border rounded-4 p-4 bg-white valoracion-item">
                      <div class="d-flex justify-content-between flex-wrap gap-2 mb-2">
                        <div>
                          <h3 class="h6 fw-bold mb-1 valoracion-usuario">{{ item.nombre_usuario }}</h3>
                          <div v-html="renderStars(item.puntuacion)"></div>
                        </div>
                        <small class="text-muted valoracion-meta">{{ formatDate(item.fecha_valoracion) }}</small>
                      </div>
                      <p class="text-muted mb-0">{{ item.comentario || "Sin comentario adicional." }}</p>
                    </article>
                  </template>
                  <template v-else>
                    <div class="text-center py-4 text-muted border rounded-4 bg-light">
                      Esta empresa todavía no tiene comentarios publicados.
                    </div>
                  </template>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>

    <footer class="footer-custom py-4 mt-auto text-center text-white-50">
      <div class="container">
        <span>Workly 2026 · Opiniones transparentes para tomar mejores decisiones</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { API_URL, getToken } from "../../services/api.js";
import { requireAuth } from "../../services/api.js";

// Ejecución del guard de autenticación
requireAuth(["usuario"]);

// Estados Reactivos
const empresas = ref([]);
const empresaSeleccionada = ref(null);
const miValoracion = ref(null);
const resumenInfo = ref(null);
const valoraciones = ref([]);

const alerta = reactive({
  mensaje: "",
  tipo: "danger"
});

const form = reactive({
  puntuacion: 0,
  comentario: ""
});

// Headers estáticos
const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});

// Lanzador de alertas
const showAlert = (message, type = "danger") => {
  alerta.mensaje = message;
  alerta.tipo = type;
};

// Formateadores y creadores de vista
const formatDate = (fecha) => {
  if (!fecha) return "Reciente";
  const date = new Date(fecha);
  return Number.isNaN(date.getTime())
    ? "Reciente"
    : date.toLocaleDateString("es-SV", { dateStyle: "medium" });
};

const renderStars = (value) => {
  const rating = Math.round(Number(value || 0));
  return Array.from({ length: 5 }, (_, index) =>
    `<i class="bi ${index < rating ? "bi-star-fill text-warning" : "bi-star text-secondary"}"></i>`
  ).join("");
};

// Computeds para la gestión de permisos en la UI
const puedeValorar = computed(() => Number(empresaSeleccionada.value?.puede_valorar || 0) === 1);
const yaValoro = computed(() => Number(empresaSeleccionada.value?.ya_valoro || 0) === 1);

const isFormDisabled = computed(() => {
  if (yaValoro.value) return false;
  return !puedeValorar.value;
});

const badgeClass = computed(() => {
  if (yaValoro.value) return "badge rounded-pill text-bg-info";
  if (puedeValorar.value) return "badge rounded-pill text-bg-success";
  return "badge rounded-pill text-bg-warning";
});

const badgeText = computed(() => {
  if (yaValoro.value) return "Ya valoraste esta empresa. Puedes editar tu comentario.";
  if (puedeValorar.value) return "Puedes valorar esta empresa";
  return "Solo puedes valorar si postulaste o trabajaste aquí";
});

const buttonText = computed(() => {
  if (yaValoro.value) return "Actualizar valoración";
  if (isFormDisabled.value) return "Valoración bloqueada";
  return "Enviar valoración";
});

// Sincronización del formulario reactivo
const hydrateForm = () => {
  if (miValoracion.value) {
    form.puntuacion = Number(miValoracion.value.puntuacion || 0);
    form.comentario = miValoracion.value.comentario || "";
  } else {
    form.puntuacion = 0;
    form.comentario = "";
  }
};

// Selección inteligente inicial
const getPreferredEmpresaId = () => {
  const urlId = Number(new URLSearchParams(window.location.search).get("id_empresa"));
  if (urlId) return urlId;

  const editable = empresas.value.find((emp) => Number(emp.puede_valorar) === 1 && Number(emp.ya_valoro) === 0);
  if (editable) return Number(editable.id_empresa);

  const alreadyRated = empresas.value.find((emp) => Number(emp.ya_valoro) === 1);
  if (alreadyRated) return Number(alreadyRated.id_empresa);

  return Number(empresas.value[0]?.id_empresa);
};

// Peticiones HTTP
const cargarEmpresas = async () => {
  const response = await fetch(`${API_URL}/valoraciones/empresas`, {
    headers: authHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || "No se pudieron cargar las empresas");
  
  empresas.value = data;
};

const seleccionarEmpresa = async (idEmpresa) => {
  const response = await fetch(`${API_URL}/valoraciones/empresa/${idEmpresa}`, {
    headers: authHeaders()
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.mensaje || "No se pudo cargar el detalle de la empresa");

  empresaSeleccionada.value = data.empresa;
  resumenInfo.value = data.resumen || null;
  miValoracion.value = data.mi_valoracion || null;
  valoraciones.value = data.valoraciones || [];

  hydrateForm();

  // Actualización de Query Params sin recargar la pestaña
  const url = new URL(window.location.href);
  url.searchParams.set("id_empresa", idEmpresa);
  window.history.replaceState({}, "", url);
};

const handleSelectChange = async (event) => {
  try {
    await seleccionarEmpresa(Number(event.target.value));
  } catch (error) {
    showAlert(error.message);
  }
};

const guardarValoracion = async () => {
  try {
    if (!empresaSeleccionada.value) throw new Error("Selecciona una empresa para valorar.");
    if (isFormDisabled.value && !yaValoro.value) throw new Error("No tienes permiso para valorar esta empresa.");
    if (form.puntuacion < 1) throw new Error("Selecciona una puntuación de 1 a 5 estrellas.");
    if (!form.comentario.trim()) throw new Error("Escribe un comentario antes de enviar.");

    const isEditing = Boolean(miValoracion.value?.id_valoracion);
    const endpoint = isEditing
      ? `${API_URL}/valoraciones/empresa/${empresaSeleccionada.value.id_empresa}`
      : `${API_URL}/valoraciones`;

    const response = await fetch(endpoint, {
      method: isEditing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders()
      },
      body: JSON.stringify({
        id_empresa_fk: Number(empresaSeleccionada.value.id_empresa),
        puntuacion: Number(form.puntuacion),
        comentario: form.comentario.trim()
      })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.mensaje || "No se pudo guardar la valoración");

    showAlert(data.mensaje, "success");
    await cargarEmpresas();
    await seleccionarEmpresa(Number(empresaSeleccionada.value.id_empresa));
  } catch (error) {
    console.error(error);
    showAlert(error.message || "No se pudo enviar la valoración");
  }
};

// Ciclo de vida inicial
onMounted(async () => {
  try {
    await cargarEmpresas();
    const initialId = getPreferredEmpresaId();
    if (initialId) {
      await seleccionarEmpresa(initialId);
    }
  } catch (error) {
    console.error(error);
    showAlert(error.message || "No se pudo inicializar la vista de valoraciones");
  }
});
</script>

<style scoped>
.body-ratings {
  font-family: "Inter", sans-serif;
  background: linear-gradient(180deg, #eef4ff 0%, #f8faff 100%);
}

.navbar-custom,
.footer-custom {
  background-color: #011671;
}

.nav-link-custom {
  color: white !important;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 30px;
  font-weight: 500;
  transition: background 0.2s;
}

.nav-link-custom:hover,
.nav-link-custom.active {
  background: rgba(255, 255, 255, 0.12);
}

.navbar-brand .brand-icon {
  font-size: 3.5rem;
  color: white;
  margin-right: 0.75rem;
}

.navbar-brand .brand-text {
  color: white;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
}

.navbar-brand .brand-sub {
  color: #e2e4e8;
  font-size: 0.95rem;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff4757;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.4rem;
  font-size: 0.65rem;
  font-weight: bold;
  border: 2px solid white;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.surface-card {
  background: rgba(255, 255, 255, 0.96);
  border-radius: 28px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 35px -12px rgba(1, 22, 113, 0.08);
}

.max-height-scroll {
  max-height: 65vh;
  overflow-y: auto;
  padding-right: 4px;
}

.empresa-card {
  background: white;
  border-radius: 24px;
  border: 1px solid #e8edf6;
  transition: 0.2s ease;
  cursor: pointer;
}

.empresa-card.active,
.empresa-card:hover {
  background-color: #fcfdfe;
  border-color: #3f51b5;
  box-shadow: 0 12px 24px -10px rgba(63, 81, 181, 0.18);
}

.text-truncate-custom {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.star-option {
  border: none;
  background: transparent;
  color: #d0d4dd;
  font-size: 1.7rem;
  padding: 0;
  transition: transform 0.15s ease;
}

.star-option:not(:disabled):hover {
  transform: scale(1.15);
}

.star-option.active {
  color: #f4b400;
}

/* Clases CSS adicionales unificadas */
.valoracion-item {
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
  background: #fff;
}

.valoracion-usuario {
  font-weight: 700;
}

.valoracion-meta {
  font-size: 0.9rem;
  color: #6c757d;
}
</style>