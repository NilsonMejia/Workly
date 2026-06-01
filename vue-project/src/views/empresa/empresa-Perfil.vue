<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-custom py-3">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal/index.html">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Panel de empresa</span>
          </div>
        </a>
        <div class="collapse navbar-collapse show">
          <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
            <a href="/empresa/publicar-vacante" class="nav-link-custom"><i class="bi bi-plus-circle me-1"></i> Publicar</a>
            <a href="/empresa/mis-vacantes" class="nav-link-custom"><i class="bi bi-briefcase me-1"></i> Mis vacantes</a>
            <a href="/empresa/postulaciones" class="nav-link-custom"><i class="bi bi-people me-1"></i> Postulaciones</a>
            <a href="/empresa/resena-empresa" class="nav-link-custom"><i class="bi bi-star me-1"></i> ReseÃ±as</a>
            <a href="/empresa/perfil" class="nav-link-custom active"><i class="bi bi-building me-1"></i> Perfil empresa</a>
          </div>
          <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
            <a href="/empresa/notificaciones" class="text-white position-relative text-decoration-none">
              <i class="bi bi-bell-fill fs-3"></i>
              <span class="notification-badge">0</span>
            </a>
            <a href="/empresa/perfil" class="text-white text-decoration-none">
              <i class="bi bi-person-circle fs-2"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 py-4">
      <div class="container px-4 px-lg-5">
        <div class="row g-4">
          <!-- Tarjeta lateral -->
          <div class="col-12 col-xl-4">
            <div class="surface-card p-4 h-100">
              <div class="text-center">
                <img id="previewLogo" class="profile-avatar mb-3" :src="logoPreview" alt="Logo de empresa">
                <h1 class="h4 fw-bold mb-1" id="cardNombre">{{ perfil.nombre_comercial || 'Empresa' }}</h1>
                <p class="text-muted mb-3" id="cardTitulo">{{ perfil.razon_social || 'Perfil corporativo' }}</p>
                <label for="logo_empresa_input" class="btn btn-outline-primary rounded-pill px-4">
                  <i class="bi bi-camera me-2"></i>Cambiar logo
                </label>
                <input id="logo_empresa_input" type="file" accept="image/*" class="d-none" @change="handleLogoChange">
              </div>
              <hr class="my-4">
              <div class="d-grid gap-3">
                <div>
                  <div class="section-title mb-1">Correo</div>
                  <div id="cardCorreo" class="text-muted">{{ perfil.correo_electronico || '--' }}</div>
                </div>
                <div>
                  <div class="section-title mb-1">TelÃ©fono</div>
                  <div id="cardTelefono" class="text-muted">{{ perfil.telefono || '--' }}</div>
                </div>
                <div>
                  <div class="section-title mb-1">UbicaciÃ³n</div>
                  <div id="cardUbicacion" class="text-muted">{{ ubicacionDisplay || '--' }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Formulario principal -->
          <div class="col-12 col-xl-8">
            <div class="surface-card p-4 p-lg-5">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 class="h3 fw-bold mb-1">Perfil de empresa</h2>
                  <p class="text-muted mb-0">MantÃ©n tu informaciÃ³n empresarial lista para atraer mejor talento.</p>
                </div>
                <button class="btn btn-primary rounded-pill px-4" @click="guardarPerfil">
                  <i class="bi bi-floppy me-2"></i>Guardar cambios
                </button>
              </div>

              <!-- Alertas -->
              <div v-if="alertMessage" class="mb-3">
                <div :class="`alert alert-${alertType} alert-dismissible fade show rounded-4`" role="alert">
                  {{ alertMessage }}
                  <button type="button" class="btn-close" @click="alertMessage = ''"></button>
                </div>
              </div>

              <form class="row g-4" novalidate @submit.prevent="guardarPerfil">
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="nombre_comercial">Nombre comercial *</label>
                  <input id="nombre_comercial" class="form-control form-control-lg rounded-4" v-model="perfil.nombre_comercial" required>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="razon_social">RazÃ³n social *</label>
                  <input id="razon_social" class="form-control form-control-lg rounded-4" v-model="perfil.razon_social" required>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="correo_electronico">Correo</label>
                  <input id="correo_electronico" class="form-control form-control-lg rounded-4" type="email" v-model="perfil.correo_electronico" disabled>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="telefono">TelÃ©fono *</label>
                  <input id="telefono" class="form-control form-control-lg rounded-4" v-model="perfil.telefono" required>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="id_municipio_fk">Municipio *</label>
                  <select id="id_municipio_fk" class="form-select form-select-lg rounded-4" v-model="perfil.id_municipio_fk" required>
                    <option value="">Selecciona un municipio</option>
                    <option v-for="m in municipios" :key="m.id_municipio" :value="m.id_municipio">{{ m.nombre_municipio }} - {{ m.nombre_departamento }}</option>
                  </select>
                </div>
                <div class="col-12 col-md-6">
                  <label class="form-label fw-semibold" for="sitio_web">Sitio web</label>
                  <input id="sitio_web" class="form-control form-control-lg rounded-4" placeholder="https://" v-model="perfil.sitio_web">
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold" for="direccion">DirecciÃ³n</label>
                  <input id="direccion" class="form-control form-control-lg rounded-4" placeholder="DirecciÃ³n corporativa" v-model="perfil.direccion">
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold" for="descripcion_empresa">DescripciÃ³n de empresa</label>
                  <textarea id="descripcion_empresa" class="form-control form-control-lg rounded-4" rows="4" placeholder="Describe la empresa, su enfoque y lo que ofrece al talento." v-model="perfil.descripcion_empresa"></textarea>
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold" for="especialidades_input">Especialidades y perfiles que contratas</label>
                  <input id="especialidades_input" class="form-control form-control-lg rounded-4" placeholder="Ej. Backend, Frontend, QA, Ventas" v-model="especialidadesStr">
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold" for="cultura_input">Cultura de empresa</label>
                  <textarea id="cultura_input" class="form-control form-control-lg rounded-4" rows="4" placeholder="Una lÃ­nea por elemento. Ej. Trabajo en equipo" v-model="culturaStr"></textarea>
                </div>
                <div class="col-12">
                  <label class="form-label fw-semibold" for="beneficios_input">Beneficios para el talento</label>
                  <textarea id="beneficios_input" class="form-control form-control-lg rounded-4" rows="4" placeholder="Una lÃ­nea por beneficio. Ej. Modalidad hÃ­brida" v-model="beneficiosStr"></textarea>
                </div>
              </form>

              <hr class="my-5">
              <div class="row g-4">
                <div class="col-12 col-lg-4">
                  <div class="border rounded-4 p-4 h-100">
                    <h3 class="h5 fw-bold mb-3">Especialidades</h3>
                    <div class="d-flex flex-wrap gap-2" id="listaEspecialidades">
                      <span v-for="esp in perfil.especialidades" :key="esp" class="badge text-bg-light rounded-pill px-3 py-2">{{ esp }}</span>
                      <span v-if="!perfil.especialidades?.length" class="text-muted">AÃºn no has definido especialidades.</span>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-4">
                  <div class="border rounded-4 p-4 h-100">
                    <h3 class="h5 fw-bold mb-3">Cultura</h3>
                    <div class="d-grid gap-3" id="listaCultura">
                      <div v-for="cult in perfil.cultura" :key="cult" class="border rounded-4 p-3">{{ cult }}</div>
                      <p v-if="!perfil.cultura?.length" class="text-muted mb-0">AÃºn no has definido cultura de empresa.</p>
                    </div>
                  </div>
                </div>
                <div class="col-12 col-lg-4">
                  <div class="border rounded-4 p-4 h-100">
                    <h3 class="h5 fw-bold mb-3">Beneficios</h3>
                    <div class="d-grid gap-3" id="listaBeneficios">
                      <div v-for="ben in perfil.beneficios" :key="ben" class="border rounded-4 p-3">{{ ben }}</div>
                      <p v-if="!perfil.beneficios?.length" class="text-muted mb-0">AÃºn no has definido beneficios.</p>
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
        <span>Workly 2026 Â· Tu empresa tambiÃ©n necesita una gran vitrina</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken } from '../../services/api.js'
import { requireAuth } from '../../services/api.js'

// AutenticaciÃ³n
onBeforeMount(() => {
  requireAuth(['empresa'])
})

// Estado reactivo
const alertMessage = ref('')
const alertType = ref('danger')
const municipios = ref([])
const logoBase64 = ref('')

// Perfil (datos principales)
const perfil = reactive({
  id_empresa: null,
  nombre_comercial: '',
  razon_social: '',
  correo_electronico: '',
  telefono: '',
  id_municipio_fk: '',
  direccion: '',
  sitio_web: '',
  descripcion_empresa: '',
  especialidades: [],
  cultura: [],
  beneficios: [],
  nombre_municipio: '',
  nombre_departamento: '',
  logo_empresa: ''
})

// Strings auxiliares para inputs de arrays
const especialidadesStr = ref('')
const culturaStr = ref('')
const beneficiosStr = ref('')

// Computed para vista previa del logo
const logoPreview = computed(() => logoBase64.value || perfil.logo_empresa || 'https://placehold.co/240x240/eef2ff/3f51b5?text=Empresa')

// Computed para mostrar ubicaciÃ³n en tarjeta lateral
const ubicacionDisplay = computed(() => {
  const parts = []
  if (perfil.nombre_municipio) parts.push(perfil.nombre_municipio)
  if (perfil.nombre_departamento) parts.push(perfil.nombre_departamento)
  if (parts.length) return parts.join(', ')
  return perfil.direccion || '--'
})

// Funciones auxiliares
const showAlert = (message, type = 'danger') => {
  alertMessage.value = message
  alertType.value = type
  setTimeout(() => {
    alertMessage.value = ''
  }, 5000)
}

const splitLines = (value) =>
  value
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`
})

const syncEmpresaStorage = () => {
  const usuarioActual = JSON.parse(localStorage.getItem('usuario') || '{}')
  localStorage.setItem('usuario', JSON.stringify({
    ...usuarioActual,
    ...perfil,
    empresa: perfil.nombre_comercial,
    nombre_comercial: perfil.nombre_comercial
  }))
}

// Cargar municipios
const cargarMunicipios = async () => {
  const res = await fetch(`${API_URL}/catalogos/municipios-agrupados`)
  if (res.ok) {
    municipios.value = await res.json()
  }
}

// Cargar perfil de empresa
const cargarPerfilEmpresa = async () => {
  const res = await fetch(`${API_URL}/perfil/empresa`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.mensaje || 'No se pudo cargar el perfil')

  Object.assign(perfil, {
    id_empresa: data.id_empresa,
    nombre_comercial: data.nombre_comercial || '',
    razon_social: data.razon_social || '',
    correo_electronico: data.correo_electronico || '',
    telefono: data.telefono || '',
    id_municipio_fk: data.id_municipio_fk || '',
    direccion: data.direccion || '',
    sitio_web: data.sitio_web || '',
    descripcion_empresa: data.descripcion_empresa || '',
    especialidades: data.especialidades || [],
    cultura: data.cultura || [],
    beneficios: data.beneficios || [],
    nombre_municipio: data.nombre_municipio || '',
    nombre_departamento: data.nombre_departamento || '',
    logo_empresa: data.logo_empresa || ''
  })
  logoBase64.value = perfil.logo_empresa

  // Inicializar strings de entrada
  especialidadesStr.value = (perfil.especialidades || []).join(', ')
  culturaStr.value = (perfil.cultura || []).join('\n')
  beneficiosStr.value = (perfil.beneficios || []).join('\n')
}

// ValidaciÃ³n del formulario
const validarFormulario = () => {
  if (!perfil.nombre_comercial?.trim()) throw new Error('El nombre comercial es obligatorio.')
  if (!perfil.razon_social?.trim()) throw new Error('La razÃ³n social es obligatoria.')
  if (!perfil.telefono?.trim()) throw new Error('El telÃ©fono es obligatorio.')
  if (!perfil.id_municipio_fk) throw new Error('Selecciona un municipio.')
}

// Guardar perfil
const guardarPerfil = async () => {
  try {
    validarFormulario()

    // Convertir strings a arrays
    const especialidadesArray = especialidadesStr.value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean)

    const culturaArray = splitLines(culturaStr.value)
    const beneficiosArray = splitLines(beneficiosStr.value)

    const payload = {
      nombre_comercial: perfil.nombre_comercial.trim(),
      razon_social: perfil.razon_social.trim(),
      sitio_web: perfil.sitio_web?.trim() || '',
      descripcion_empresa: perfil.descripcion_empresa?.trim() || '',
      id_municipio_fk: Number(perfil.id_municipio_fk),
      telefono: perfil.telefono.trim(),
      direccion: perfil.direccion?.trim() || '',
      logo_empresa: logoBase64.value || null,
      especialidades: especialidadesArray,
      cultura: culturaArray,
      beneficios: beneficiosArray
    }

    const res = await fetch(`${API_URL}/perfil/empresa`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.mensaje || 'No se pudo guardar el perfil.')

    // Actualizar perfil local con los datos devueltos
    const nuevoPerfil = data.data
    Object.assign(perfil, {
      nombre_comercial: nuevoPerfil.nombre_comercial,
      razon_social: nuevoPerfil.razon_social,
      correo_electronico: nuevoPerfil.correo_electronico,
      telefono: nuevoPerfil.telefono,
      id_municipio_fk: nuevoPerfil.id_municipio_fk,
      direccion: nuevoPerfil.direccion,
      sitio_web: nuevoPerfil.sitio_web,
      descripcion_empresa: nuevoPerfil.descripcion_empresa,
      especialidades: nuevoPerfil.especialidades,
      cultura: nuevoPerfil.cultura,
      beneficios: nuevoPerfil.beneficios,
      nombre_municipio: nuevoPerfil.nombre_municipio,
      nombre_departamento: nuevoPerfil.nombre_departamento,
      logo_empresa: nuevoPerfil.logo_empresa
    })
    logoBase64.value = nuevoPerfil.logo_empresa || ''
    especialidadesStr.value = (nuevoPerfil.especialidades || []).join(', ')
    culturaStr.value = (nuevoPerfil.cultura || []).join('\n')
    beneficiosStr.value = (nuevoPerfil.beneficios || []).join('\n')

    syncEmpresaStorage()
    showAlert('Perfil de empresa actualizado correctamente.', 'success')
  } catch (err) {
    showAlert(err.message || 'No se pudo guardar el perfil.')
  }
}

// Manejo de cambio de logo
const handleLogoChange = async (event) => {
  const file = event.target.files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    showAlert('Selecciona una imagen vÃ¡lida.')
    event.target.value = ''
    return
  }
  if (file.size > 3 * 1024 * 1024) {
    showAlert('La imagen debe pesar menos de 3MB.')
    event.target.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    logoBase64.value = reader.result
  }
  reader.onerror = () => {
    showAlert('No se pudo leer la imagen.')
  }
  reader.readAsDataURL(file)
}

// InicializaciÃ³n
onMounted(async () => {
  try {
    await cargarMunicipios()
    await cargarPerfilEmpresa()
  } catch (err) {
    showAlert(err.message || 'No se pudo cargar el perfil de empresa.')
  }
})
</script>

<style scoped>
:root { --primary-deep: #3f51b5; --nav-bg: #011671; }
body { font-family: "Inter", sans-serif; background: linear-gradient(180deg, #eef4ff 0%, #f8faff 100%); }
.navbar-custom, .footer-custom { background-color: var(--nav-bg); }
.nav-link-custom { color: white !important; text-decoration: none; font-weight: 500; padding: 0.5rem 1rem; border-radius: 30px; transition: background 0.2s; }
.nav-link-custom:hover, .nav-link-custom.active { background: rgba(255, 255, 255, 0.12); }
.brand-icon { font-size: 3.5rem; color: white; margin-right: 0.75rem; }
.brand-text { color: white; font-weight: 700; font-size: 2rem; line-height: 1.2; }
.brand-sub { color: #e2e4e8; font-size: 0.95rem; }
.notification-badge { position: absolute; top: -5px; right: -5px; background-color: #ff4757; color: white; border-radius: 50%; padding: 0.2rem 0.4rem; font-size: 0.65rem; font-weight: bold; border: 2px solid white; }
.surface-card { background: rgba(255, 255, 255, 0.95); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 28px; box-shadow: 0 20px 35px -12px rgba(1, 22, 113, 0.08); }
.profile-avatar { width: 120px; height: 120px; object-fit: cover; border-radius: 28px; border: 4px solid #eef2ff; }
.section-title { font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #5b6475; }
textarea.form-control { resize: vertical; min-height: 180px; }
</style>