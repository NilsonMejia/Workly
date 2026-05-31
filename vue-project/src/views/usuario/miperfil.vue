<template>
  <div class="d-flex flex-column min-vh-100 body-profile">
    <nav class="navbar navbar-expand-lg navbar-custom py-3">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="#">
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
            <a href="#" class="nav-link-custom"><i class="bi bi-search me-1"></i> Buscar empleo</a>
            <a href="#" class="nav-link-custom"><i class="bi bi-journal-bookmark-fill me-1"></i> Recursos</a>
            <a href="#" class="nav-link-custom"><i class="bi bi-star-fill me-1"></i> Valoraciones</a>
            <a href="#" class="nav-link-custom active"><i class="bi bi-person-badge me-1"></i> Mi Perfil</a>
          </div>
          <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <a href="#" class="text-white position-relative text-decoration-none">
              <i class="bi bi-bell-fill fs-3"></i>
              <span class="notification-badge">{{ actividades.notificaciones }}</span>
            </a>
            <a href="#" class="text-white text-decoration-none">
              <i class="bi bi-person-circle fs-2"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-4">
      <div class="container px-4 px-lg-5">
        <div class="row g-4">
          
          <div class="col-12 col-xl-4">
            <div class="surface-card p-4 h-100">
              <div class="text-center">
                <img :src="form.foto_perfil || DEFAULT_PROFILE_IMAGE" class="profile-avatar mb-3" alt="Foto de perfil">
                <h1 class="h4 fw-bold mb-1">{{ nombreCompletoDisplay }}</h1>
                <p class="text-muted mb-3">{{ form.titulo_profesional || 'Actualiza tu información profesional' }}</p>
                <label for="foto_perfil_input" class="btn btn-outline-primary rounded-pill px-4 cursor-pointer">
                  <i class="bi bi-camera me-2"></i>Cambiar foto
                </label>
                <input id="foto_perfil_input" type="file" accept="image/*" class="d-none" @change="procesarImagen">
              </div>
              <hr class="my-4">
              <div class="d-grid gap-3">
                <div>
                  <div class="section-title mb-1">Correo</div>
                  <div class="text-muted">{{ form.correo_electronico || '--' }}</div>
                </div>
                <div>
                  <div class="section-title mb-1">Teléfono</div>
                  <div class="text-muted">{{ form.telefono || '--' }}</div>
                </div>
                <div>
                  <div class="section-title mb-1">Ubicación</div>
                  <div class="text-muted">{{ ubicacionDisplay }}</div>
                </div>
              </div>

              <hr class="my-4">
              <div class="d-grid gap-3 mb-4">
                <a class="text-decoration-none text-dark border rounded-4 p-3" href="#">
                  <div class="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <div class="text-uppercase small fw-bold text-secondary">Acceso rápido</div>
                      <div class="fw-semibold">Ver notificaciones</div>
                    </div>
                    <i class="bi bi-bell fs-4 text-primary"></i>
                  </div>
                </a>
                <a class="text-decoration-none text-dark border rounded-4 p-3" href="#">
                  <div class="d-flex align-items-center justify-content-between gap-3">
                    <div>
                      <div class="text-uppercase small fw-bold text-secondary">Acceso rápido</div>
                      <div class="fw-semibold">Buscar nuevas vacantes</div>
                    </div>
                    <i class="bi bi-search fs-4 text-primary"></i>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div class="col-12 col-xl-8">
            <div class="surface-card p-4 p-lg-5">
              <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
                <div>
                  <h2 class="h3 fw-bold mb-1">Mi perfil profesional</h2>
                  <p class="text-muted mb-0">Edita tus datos y mantén tu perfil listo para postular.</p>
                </div>
                <button class="btn btn-primary rounded-pill px-4" :disabled="guardando" @click="guardarPerfil">
                  <span v-if="guardando" class="spinner-border spinner-border-sm me-2"></span>
                  <i v-else class="bi bi-floppy me-2"></i>
                  {{ guardando ? 'Guardando...' : 'Guardar cambios' }}
                </button>
              </div>

              <div v-if="alerta.mensaje" :class="['alert', `alert-${alerta.tipo}`, 'alert-dismissible', 'fade', 'show', 'rounded-4']" role="alert">
                {{ alerta.mensaje }}
                <button type="button" class="btn-close" @click="alerta.mensaje = ''"></button>
              </div>

              <form id="formPerfil" class="row g-4" @submit.prevent novalidate>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="nombres">Nombres</label>
                  <input id="nombres" v-model="form.nombres" class="form-control form-control-lg rounded-4" required>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="apellidos">Apellidos</label>
                  <input id="apellidos" v-model="form.apellidos" class="form-control form-control-lg rounded-4" required>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="correo_electronico">Correo</label>
                  <input id="correo_electronico" v-model="form.correo_electronico" class="form-control form-control-lg rounded-4" type="email" disabled>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="telefono">Teléfono</label>
                  <input id="telefono" v-model="form.telefono" class="form-control form-control-lg rounded-4" placeholder="Ej. 7777-8888" required>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="titulo_profesional">Título profesional</label>
                  <input id="titulo_profesional" v-model="form.titulo_profesional" class="form-control form-control-lg rounded-4" placeholder="Ej. Desarrollador Full Stack">
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="id_municipio_fk">Municipio</label>
                  <select id="id_municipio_fk" v-model="form.id_municipio_fk" class="form-select form-select-lg rounded-4" required>
                    <option value="">Selecciona un municipio</option>
                    <option v-for="muni in municipiosCache" :key="muni.id_municipio" :value="muni.id_municipio">
                      {{ muni.nombre_municipio }}{{ muni.nombre_departamento ? ` - ${muni.nombre_departamento}` : '' }}
                    </option>
                    <option v-if="municipioNoCatalogo" :value="form.id_municipio_fk">Municipio actual no disponible en catálogo</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold" for="direccion">Dirección</label>
                  <input id="direccion" v-model="form.direccion" class="form-control form-control-lg rounded-4" placeholder="Dirección completa">
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="sitio_web">Sitio web / Portafolio</label>
                  <input id="sitio_web" v-model="form.sitio_web" class="form-control form-control-lg rounded-4" placeholder="https://">
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="resumen_profesional">Resumen breve</label>
                  <textarea id="resumen_profesional" v-model="form.resumen_profesional" class="form-control form-control-lg rounded-4" rows="1" placeholder="Resumen profesional"></textarea>
                </div>
                
                <div class="col-12">
                  <label class="form-label fw-semibold" for="habilidades_input">Habilidades</label>
                  <div class="input-group mb-2">
                    <input id="habilidades_input" v-model="nuevaHabilidad" @keydown.enter.prevent="agregarHabilidad" class="form-control form-control-lg rounded-start-4" placeholder="Ej. JavaScript, Node.js (Presiona Enter o Añadir)">
                    <button class="btn btn-outline-primary rounded-end-4 px-3" type="button" @click="agregarHabilidad">Añadir</button>
                  </div>
                  <div id="contenedorHabilidades" class="mt-2">
                    <div v-for="(hab, index) in form.habilidades" :key="index" class="habilidad-item">
                      <span class="me-2">{{ hab }}</span>
                      <i class="bi bi-x-lg cursor-pointer text-danger label-remove" @click="eliminarHabilidad(index)"></i>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <label class="form-label fw-semibold" for="experiencia_input">Experiencia laboral</label>
                  <textarea id="experiencia_input" v-model="textareaExperiencia" class="form-control form-control-lg rounded-4" rows="5" placeholder="Una línea por experiencia. Ej. Desarrollador Frontend | TechSolutions | 2022-2024 | React y APIs"></textarea>
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold" for="educacion_input">Educación</label>
                  <textarea id="educacion_input" v-model="textareaEducacion" class="form-control form-control-lg rounded-4" rows="4" placeholder="Una línea por estudio. Ej. Ingeniería en Sistemas | UES | 2018-2023"></textarea>
                </div>
              </form>

              <hr class="my-5">
              <div class="row g-4">
                <div class="col-12 col-lg-6">
                  <div class="border rounded-4 p-4 h-100">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h3 class="h5 fw-bold mb-1">Empleos guardados</h3>
                        <p class="text-muted small mb-0">Vacantes que apartaste para revisar después.</p>
                      </div>
                      <span class="badge text-bg-light rounded-pill">{{ actividades.guardados.length }}</span>
                    </div>
                    <div class="d-grid gap-3">
                      <p v-if="!actividades.guardados.length" class="text-muted mb-0">Todavía no has guardado vacantes.</p>
                      <a v-for="item in actividades.guardados.slice(0, 4)" :key="item.id_vacante" class="text-decoration-none text-dark border rounded-4 p-3" href="#">
                        <div class="fw-semibold">{{ item.titulo_puesto }}</div>
                        <div class="small text-muted">{{ item.nombre_comercial || 'Empresa' }} · {{ item.nombre_municipio || 'El Salvador' }}</div>
                        <div class="small text-primary mt-1">{{ formatearSalario(item.salario_offrecido) }}</div>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-6">
                  <div class="border rounded-4 p-4 h-100">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h3 class="h5 fw-bold mb-1">Mis postulaciones</h3>
                        <p class="text-muted small mb-0">Seguimiento rápido de tu actividad reciente.</p>
                      </div>
                      <span class="badge text-bg-light rounded-pill">{{ actividades.postulaciones.length }}</span>
                    </div>
                    <div class="d-grid gap-3">
                      <p v-if="!actividades.postulaciones.length" class="text-muted mb-0">Aún no tienes postulaciones registradas.</p>
                      <a v-for="item in actividades.postulaciones.slice(0, 4)" :key="item.id_vacante" class="text-decoration-none text-dark border rounded-4 p-3" href="#">
                        <div class="fw-semibold">{{ item.titulo_puesto }}</div>
                        <div class="small text-muted">{{ item.nombre_comercial || 'Empresa' }}</div>
                        <div class="small mt-1"><span class="badge text-bg-light">{{ item.nombre_estado || 'En proceso' }}</span></div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>

    <footer class="footer-custom py-4 mt-auto text-center text-white-50">
      <div class="container">
        <span>Workly 2026 · Tu perfil es tu mejor vitrina profesional</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import {
  API_URL,
  getToken,
  clearSession,
  resolveViewPath,
  buildPendingVerificationPath,
  normalizeAppRedirect
} from "../../../assets/js/shared/config.js";

// Constantes estáticas
const LOGIN_PATH = resolveViewPath("public/login/index.html");
const DEFAULT_PROFILE_IMAGE = "https://placehold.co/240x240/eef2ff/3f51b5?text=Perfil";

// Estados Reactivos
const guardando = ref(false);
const nuevaHabilidad = ref('');
const municipiosCache = ref([]);
const textareaExperiencia = ref('');
const textareaEducacion = ref('');

const alerta = reactive({
  mensaje: '',
  tipo: 'danger'
});

const form = reactive({
  nombres: '',
  apellidos: '',
  correo_electronico: '',
  telefono: '',
  id_municipio_fk: '',
  direccion: '',
  titulo_profesional: '',
  sitio_web: '',
  resumen_profesional: '',
  foto_perfil: '',
  habilidades: [],
  experiencia: [],
  educacion: [],
  nombre_municipio: '',
  nombre_departamento: '',
  nombre_completo: ''
});

const actividades = reactive({
  notificaciones: 0,
  guardados: [],
  postulaciones: []
});

// Computeds
const nombreCompletoDisplay = computed(() => {
  if (form.nombres || form.apellidos) {
    return `${form.nombres} ${form.apellidos}`.trim();
  }
  return form.nombre_completo || "Mi perfil";
});

const ubicacionDisplay = computed(() => {
  return [form.nombre_municipio, form.nombre_departamento].filter(Boolean).join(", ") || form.direccion || "--";
});

const municipioNoCatalogo = computed(() => {
  if (!form.id_municipio_fk) return false;
  return !municipiosCache.value.some(m => String(m.id_municipio) === String(form.id_municipio_fk));
});

// Helper HTTP Headers
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
});

// Gestión de Alertas
const showAlert = (message, type = "danger") => {
  alerta.mensaje = message;
  alerta.tipo = type;
};

// Parsers & Serializers
const splitLines = (value) =>
  String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const parseExperiencias = (value) =>
  splitLines(value).map((linea) => {
    const [cargo, empresa, periodo, descripcion] = linea.split("|").map((item) => item?.trim() || "");
    return { cargo, empresa, periodo, descripcion };
  });

const parseEducacion = (value) =>
  splitLines(value).map((linea) => {
    const [titulo, institucion, periodo] = linea.split("|").map((item) => item?.trim() || "");
    return { titulo, institucion, periodo };
  });

const serializeExperiencias = (items = []) =>
  items.map((item) => [item.cargo, item.empresa, item.periodo, item.descripcion].filter(Boolean).join(" | ")).join("\n");

const serializeEducacion = (items = []) =>
  items.map((item) => [item.titulo, item.institucion, item.periodo].filter(Boolean).join(" | ")).join("\n");

const formatearSalario = (salario) => {
  if (salario === null || salario === undefined || salario === "") return "A convenir";
  return `$${Number(salario).toFixed(2)}`;
};

const normalizarImagen = (value) =>
  typeof value === "string" && /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(value) ? value : "";

// Redirección Auth
const redirigirPorAuth = (data = {}, status = 401) => {
  if (status === 403 && data?.code === "EMAIL_NO_VERIFICADO") {
    const fallback = buildPendingVerificationPath({
      email: data?.correo_electronico,
      tipo: data?.tipo
    });
    window.location.href = normalizeAppRedirect(data?.redirect, fallback);
    return;
  }
  clearSession();
  window.location.href = LOGIN_PATH;
};

// Base Fetch wrapper
const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, options);
  let data = null;
  try { data = await response.json(); } catch (e) { /* silent fail if non-json */ }

  if (response.status === 401 || response.status === 403) {
    redirigirPorAuth(data, response.status);
    throw new Error(data?.mensaje || "Tu sesión ya no es válida.");
  }
  if (!response.ok) {
    throw new Error(data?.mensaje || `Error en la solicitud (Código ${response.status}).`);
  }
  return data;
};

// Sincronización con LocalStorage
const syncUsuarioStorage = (perfil) => {
  const usuarioActual = JSON.parse(localStorage.getItem("usuario") || "{}");
  localStorage.setItem("usuario", JSON.stringify({
    ...usuarioActual,
    ...perfil,
    nombre: perfil.nombre_completo || usuarioActual.nombre,
    nombres: perfil.nombres,
    apellidos: perfil.apellidos,
    correo_electronico: perfil.correo_electronico || usuarioActual.correo_electronico
  }));
};

// Acciones del Formulario
const aplicarPerfilAlFormulario = (data) => {
  if (!data) return;
  Object.assign(form, data);
  form.foto_perfil = normalizarImagen(data.foto_perfil);
  textareaExperiencia.value = serializeExperiencias(data.experiencia || []);
  textareaEducacion.value = serializeEducacion(data.educacion || []);
};

const cargarMunicipios = async () => {
  const data = await fetchJson(`${API_URL}/catalogos/municipios-agrupados`);
  municipiosCache.value = Array.isArray(data) ? data : [];
};

const cargarPerfil = async () => {
  return await fetchJson(`${API_URL}/api/usuarios/perfil`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

const cargarActividadPerfil = async () => {
  const headers = { Authorization: `Bearer ${getToken()}` };
  const [guardadosData, postulacionesData] = await Promise.allSettled([
    fetchJson(`${API_URL}/guardados`, { headers }),
    fetchJson(`${API_URL}/usuario/postulaciones`, { headers })
  ]);

  actividades.guardados = guardadosData.status === "fulfilled" && Array.isArray(guardadosData.value) ? guardadosData.value : [];
  actividades.postulaciones = postulacionesData.status === "fulfilled" && Array.isArray(postulacionesData.value) ? postulacionesData.value : [];
};

// Manejo de Tags de Habilidades
const agregarHabilidad = () => {
  const valor = nuevaHabilidad.value.trim();
  if (valor && !form.habilidades.includes(valor)) {
    form.habilidades.push(valor);
  }
  nuevaHabilidad.value = '';
};

const eliminarHabilidad = (index) => {
  form.habilidades.splice(index, 1);
};

// Procesamiento de Imagen Base64
const procesarImagen = async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    showAlert("Selecciona una imagen válida.");
    event.target.value = "";
    return;
  }
  if (file.size > 3 * 1024 * 1024) {
    showAlert("La imagen debe pesar menos de 3MB.");
    event.target.value = "";
    return;
  }

  try {
    form.foto_perfil = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
      reader.readAsDataURL(file);
    });
  } catch (error) {
    showAlert(error.message || "No se pudo procesar la imagen.");
    event.target.value = "";
  }
};

const validarUrl = (value) => {
  if (!value) return true;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol);
  } catch { return false; }
};

const validarFormulario = () => {
  if (!form.nombres?.trim() || !form.apellidos?.trim()) throw new Error("Los nombres y apellidos son obligatorios.");
  if (!/^[0-9+\-\s]{8,20}$/.test(form.telefono?.trim())) throw new Error("Ingresa un número de teléfono válido.");
  if (!form.id_municipio_fk || Number.isNaN(Number(form.id_municipio_fk))) throw new Error("Selecciona un municipio válido.");
  if (!validarUrl(form.sitio_web?.trim())) throw new Error("Ingresa un sitio web válido que comience con http:// o https://.");
};

const guardarPerfil = async () => {
  try {
    validarFormulario();
  } catch (error) {
    showAlert(error.message);
    return;
  }

  const body = {
    nombres: form.nombres.trim(),
    apellidos: form.apellidos.trim(),
    telefono: form.telefono.trim(),
    id_municipio_fk: Number(form.id_municipio_fk),
    direccion: form.direccion?.trim() || "",
    titulo_profesional: form.titulo_profesional?.trim() || "",
    sitio_web: form.sitio_web?.trim() || "",
    resumen_profesional: form.resumen_profesional?.trim() || "",
    foto_perfil: form.foto_perfil || null,
    habilidades: form.habilidades,
    experiencia: parseExperiencias(textareaExperiencia.value),
    educacion: parseEducacion(textareaEducacion.value)
  };

  guardando.value = true;

  try {
    const responseData = await fetchJson(`${API_URL}/api/usuarios/perfil`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(body)
    });

    const perfilActualizado = responseData?.data || responseData;
    aplicarPerfilAlFormulario(perfilActualizado);
    syncUsuarioStorage(perfilActualizado);
    showAlert(responseData?.mensaje || "Perfil actualizado con éxito.", "success");
  } catch (error) {
    showAlert(error.message || "No se pudo guardar el perfil");
  } finally {
    guardando.value = false;
  }
};

// Ciclo de vida (Carga paralela)
onMounted(async () => {
  try {
    const [perfilData] = await Promise.all([
      cargarPerfil(),
      cargarMunicipios(),
      cargarActividadPerfil()
    ]);
    aplicarPerfilAlFormulario(perfilData);
  } catch (error) {
    showAlert(error.message || "No se pudo cargar el perfil");
  }
});
</script>

<style scoped>
:root {
  --primary-deep: #3f51b5;
  --nav-bg: #011671;
  --body-bg: #f5f7fc;
}

.body-profile {
  font-family: "Inter", sans-serif;
  background: linear-gradient(180deg, #eef4ff 0%, #f8faff 100%);
}

.navbar-custom,
.footer-custom {
  background-color: #011671; /* fallback directo del var */
}

.nav-link-custom {
  color: white !important;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 30px;
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
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 28px;
  box-shadow: 0 20px 35px -12px rgba(1, 22, 113, 0.08);
}

.profile-avatar {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 28px;
  border: 4px solid #eef2ff;
}

.section-title {
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #5b6475;
}

.cursor-pointer {
  cursor: pointer;
}

/* Estilo dinámico de habilidades unificado */
.habilidad-item {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 6px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.label-remove {
  font-size: 0.75rem;
  transition: transform 0.2s;
}

.label-remove:hover {
  transform: scale(1.2);
}
</style>