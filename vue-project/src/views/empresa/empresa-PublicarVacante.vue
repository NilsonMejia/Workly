<template>
  <div>
    <!-- NAVBAR -->
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
            <a href="/empresa/publicar-vacante" class="nav-link-custom active"><i class="bi bi-plus-circle me-1"></i> Publicar</a>
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
      <div class="container px-4 px-lg-5">
        <div class="form-card">
          <div class="d-flex flex-wrap align-items-center justify-content-between mb-2">
            <h4 class="fw-bold mb-0 d-flex align-items-center gap-2" style="color: #121826;">
              <i class="bi bi-megaphone-fill" style="color: var(--primary-deep);"></i> Publicar Nueva Vacante
            </h4>
            <div class="d-flex align-items-center mt-2 mt-sm-0">
              <span class="step-indicator" :class="{ active: step === 1 }">1</span>
              <div class="progress-bar-custom"><div class="progress-fill" :style="{ width: step === 1 ? '50%' : '100%' }"></div></div>
              <span class="step-indicator" :class="{ active: step === 2 }">2</span>
            </div>
          </div>
          <p class="text-secondary mb-4">Completa la información para que los candidatos encuentren tu oferta fácilmente.</p>

          <!-- Sección: Información Básica -->
          <div class="section-title">
            <i class="bi bi-info-circle-fill"></i>
            <span>Información Básica</span>
          </div>
          <div class="row g-4 mb-5">
            <div class="col-12 col-md-6">
              <label class="form-label fw-semibold small text-secondary">Título del Puesto</label>
              <input type="text" class="form-control-custom w-100" placeholder="Ej: Desarrollador Frontend" v-model="form.titulo_puesto" required>
            </div>
            <div class="col-12 col-md-6">
              <label class="form-label fw-semibold small text-secondary">Categoría</label>
              <select class="form-select-custom w-100" v-model="form.id_categoria_fk" required>
                <option value="" disabled>Selecciona una categoría</option>
                <option v-for="cat in categorias" :key="cat.id_categoria" :value="cat.id_categoria">{{ cat.nombre_categoria }}</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-semibold small text-secondary">Ubicación (Municipio)</label>
              <select class="form-select-custom w-100" v-model="form.id_municipio_fk" required>
                <option value="" disabled>Selecciona municipio</option>
                <option v-for="mun in municipios" :key="mun.id_municipio" :value="mun.id_municipio">{{ mun.nombre_municipio }} - {{ mun.nombre_departamento }}</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-semibold small text-secondary">Modalidad</label>
              <select class="form-select-custom w-100" v-model="form.modalidad" required>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Remoto">Remoto</option>
                <option value="Medio Tiempo">Medio Tiempo</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-semibold small text-secondary">Salario ofrecido ($)</label>
              <input type="number" min="0" step="0.01" class="form-control-custom w-100" placeholder="Ej: 1000" v-model="form.salario_offrecido" required>
            </div>
          </div>

          <!-- Sección: Detalles del Puesto -->
          <div class="section-title mt-4">
            <i class="bi bi-file-text-fill"></i>
            <span>Detalles del Puesto</span>
          </div>
          <div class="mb-4">
            <label class="form-label fw-semibold small text-secondary">Descripción general del puesto</label>
            <textarea class="form-control-custom w-100" rows="4" placeholder="Describe brevemente el rol, el equipo y el impacto del puesto..." v-model="form.descripcion_puesto" required></textarea>
          </div>
          <div class="row g-4">
            <div class="col-md-6">
              <label class="form-label fw-semibold small text-secondary">Responsabilidades</label>
              <textarea class="form-control-custom w-100" rows="4" placeholder="Ej: Diseñar arquitecturas. Mentorizar juniors. Optimizar código." v-model="form.responsabilidades" required></textarea>
            </div>
            <div class="col-md-6">
              <label class="form-label fw-semibold small text-secondary">Requisitos</label>
              <textarea class="form-control-custom w-100" rows="4" placeholder="Ej: 5 años de experiencia. Conocimiento en React. Inglés avanzado." v-model="form.requisitos" required></textarea>
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-semibold small text-secondary">Tipo de contrato</label>
              <select class="form-select-custom w-100" v-model="form.tipo_contrato" required>
                <option value="" disabled>Selecciona el contrato</option>
                <option value="Tiempo completo">Tiempo completo</option>
                <option value="Medio tiempo">Medio tiempo</option>
                <option value="Por proyecto">Por proyecto</option>
                <option value="Pasantía">Pasantía</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-semibold small text-secondary">Educación requerida</label>
              <input type="text" class="form-control-custom w-100" placeholder="Ej: Ingeniería en Sistemas" v-model="form.educacion" required>
            </div>
            <div class="col-12 col-md-4">
              <label class="form-label fw-semibold small text-secondary">Idiomas requeridos</label>
              <input type="text" class="form-control-custom w-100" placeholder="Ej: Español, Inglés" v-model="form.idiomas" required>
            </div>
          </div>
          <div class="form-text mb-4"><i class="bi bi-info-circle"></i> Termina cada frase con un punto para que se vea como lista en el detalle.</div>

          <hr class="my-4">
          <div class="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <button type="button" class="btn btn-outline-primary-deep px-5 py-2 fw-semibold" @click="guardarBorrador">
              <i class="bi bi-bookmark me-2"></i>Guardar Borrador
            </button>
            <button type="button" class="btn btn-primary-deep px-5 py-2 fw-semibold" data-bs-toggle="modal" data-bs-target="#modalPaso2">
              Continuar a Publicar <i class="bi bi-arrow-right ms-2"></i>
            </button>
          </div>
        </div>

        <!-- Modal Confirmación -->
        <div class="modal fade" id="modalPaso2" tabindex="-1" aria-hidden="true" ref="modalConfirmRef">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg">
              <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
                <div class="d-flex align-items-center w-100">
                  <div class="step-indicator active me-3" style="width: 36px; height: 36px;">2</div>
                  <h5 class="modal-title fw-bold" style="color: #121826;">Confirmación</h5>
                  <button type="button" class="btn-close shadow-none ms-auto" data-bs-dismiss="modal"></button>
                </div>
              </div>
              <div class="modal-body px-4 py-4">
                <p class="text-secondary mb-4">Revisa las preferencias finales de tu publicación. Una vez confirmada, la vacante estará visible para todos los candidatos.</p>
                <div class="mb-3 form-check bg-light p-3 rounded-4 d-flex align-items-center gap-3">
                  <input type="checkbox" class="form-check-input shadow-none mt-0" id="checkNotificar" v-model="notificarCandidatos">
                  <label class="form-check-label fw-medium small" for="checkNotificar">Notificar a los candidatos compatibles</label>
                </div>
                <div class="mb-4 form-check bg-light p-3 rounded-4 d-flex align-items-center gap-3">
                  <input type="checkbox" class="form-check-input shadow-none mt-0" id="checkDestacar" v-model="destacarVacante">
                  <label class="form-check-label fw-medium small" for="checkDestacar">Marcar como vacante destacada</label>
                </div>
                <div class="d-flex gap-2 justify-content-end mt-4">
                  <button type="button" class="btn btn-outline-secondary px-4 py-2 rounded-pill" data-bs-dismiss="modal">Volver</button>
                  <button type="button" class="btn btn-primary-deep px-5 py-2" @click="publicarVacante">Confirmar y Publicar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="py-4 mt-auto footer-custom">
      <div class="container text-center">
        <div class="d-flex flex-wrap justify-content-center gap-4 gap-md-5">
          <a href="#"><i class="bi bi-question-circle me-1"></i>Ayuda</a>
          <a href="#"><i class="bi bi-shield-lock me-1"></i>Privacidad</a>
          <a href="#">Términos</a>
          <span class="text-white opacity-75">Workly 2026 · Conectando talento</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken } from '../../services/api.js'
import { requireAuth } from '../../services/api.js'

onBeforeMount(() => {
  requireAuth(['empresa'])
})

// Estados
const step = ref(1)
const categorias = ref([])
const municipios = ref([])
const notificarCandidatos = ref(true)
const destacarVacante = ref(false)
const modalConfirmRef = ref(null)
let modalInstance = null

const form = reactive({
  titulo_puesto: '',
  id_categoria_fk: '',
  id_municipio_fk: '',
  modalidad: 'Remoto',
  salario_offrecido: '',
  descripcion_puesto: '',
  responsabilidades: '',
  requisitos: '',
  tipo_contrato: '',
  educacion: '',
  idiomas: ''
})

// Cargar catálogos
const cargarCategorias = async () => {
  const res = await fetch(`${API_URL}/catalogos/categorias`)
  if (res.ok) categorias.value = await res.json()
}
const cargarMunicipios = async () => {
  const res = await fetch(`${API_URL}/catalogos/municipios-agrupados`)
  if (res.ok) municipios.value = await res.json()
}

// Validar campos obligatorios
const validarFormulario = () => {
  const required = [
    'titulo_puesto', 'id_categoria_fk', 'id_municipio_fk', 'modalidad',
    'salario_offrecido', 'descripcion_puesto', 'responsabilidades',
    'requisitos', 'tipo_contrato', 'educacion', 'idiomas'
  ]
  const vacios = required.filter(campo => !form[campo]?.toString().trim())
  if (vacios.length) {
    throw new Error(`Completa todos los campos obligatorios: ${vacios.join(', ')}`)
  }
  if (!form.id_categoria_fk) throw new Error('Selecciona una categoría válida')
  if (!form.id_municipio_fk) throw new Error('Selecciona un municipio válido')
  if (isNaN(parseFloat(form.salario_offrecido)) || parseFloat(form.salario_offrecido) <= 0)
    throw new Error('Ingresa un salario válido mayor a cero')
}

// Obtener payload para API
const getPayload = () => ({
  id_categoria_fk: Number(form.id_categoria_fk),
  id_municipio_fk: Number(form.id_municipio_fk),
  titulo_puesto: form.titulo_puesto.trim(),
  descripcion_puesto: form.descripcion_puesto.trim(),
  responsabilidades: form.responsabilidades.trim(),
  requisitos: form.requisitos.trim(),
  salario_offrecido: parseFloat(form.salario_offrecido),
  modalidad: form.modalidad.trim(),
  tipo_contrato: form.tipo_contrato.trim(),
  educacion: form.educacion.trim(),
  idiomas: form.idiomas.trim()
})

// Publicar vacante
const publicarVacante = async () => {
  try {
    validarFormulario()
    const payload = getPayload()
    const res = await fetch(`${API_URL}/vacantes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    if (!res.ok) {
      const errores = Array.isArray(data.errores) ? data.errores.map(e => e.msg).join(', ') : null
      throw new Error(errores || data.mensaje || data.error || 'Error al publicar la vacante')
    }
    modalInstance?.hide()
    alert('Vacante publicada con éxito en Workly.')
    window.location.href = '/empresa/mis-vacantes'
  } catch (err) {
    alert(`Ocurrió un error: ${err.message}`)
  }
}

// Guardar borrador (simulado)
const guardarBorrador = () => {
  const btn = document.activeElement
  if (btn) {
    const original = btn.innerHTML
    btn.innerHTML = '<i class="bi bi-check2 me-2"></i> Borrador guardado'
    btn.classList.add('btn-success')
    btn.classList.remove('btn-outline-primary-deep')
    setTimeout(() => {
      btn.innerHTML = original
      btn.classList.remove('btn-success')
      btn.classList.add('btn-outline-primary-deep')
    }, 2000)
  }
  // Opcional: guardar en localStorage o enviar a backend
}

onMounted(async () => {
  await Promise.all([cargarCategorias(), cargarMunicipios()])
  if (modalConfirmRef.value) {
    modalInstance = new window.bootstrap.Modal(modalConfirmRef.value)
  }
})
</script>

<style scoped>
* { font-family: 'Inter', sans-serif; }
:root {
  --primary-deep: #3f51b5;
  --nav-bg: #011671;
  --light-text: #e2e4e8;
}
body { background: linear-gradient(145deg, #eef2f9 0%, #f9fafc 100%); }
.navbar-custom { background-color: var(--nav-bg) !important; box-shadow: 0 6px 20px rgba(1, 22, 113, 0.15); }
.brand-icon { font-size: 3.5rem; color: white; margin-right: 0.75rem; }
.brand-text { color: white; font-weight: 700; font-size: 2rem; line-height: 1.2; }
.brand-sub { color: var(--light-text); font-size: 0.95rem; }
.nav-link-custom {
  color: white !important;
  font-weight: 500;
  padding: 0.5rem 1.2rem;
  border-radius: 30px;
  transition: all 0.2s;
  background: rgba(255,255,255,0.05);
}
.nav-link-custom:hover { background: rgba(255,255,255,0.15); }
.nav-link-custom.active { background: rgba(255,255,255,0.2); }
.btn-primary-deep {
  background: linear-gradient(135deg, var(--primary-deep), #2c3e8f);
  border: none;
  color: white;
  font-weight: 600;
  border-radius: 40px;
  padding: 0.6rem 1.8rem;
  box-shadow: 0 6px 14px rgba(63, 81, 181, 0.25);
}
.btn-outline-primary-deep {
  background: transparent;
  border: 2px solid var(--primary-deep);
  color: var(--primary-deep);
  font-weight: 600;
  border-radius: 40px;
  padding: 0.5rem 1.8rem;
}
.form-card {
  background: white;
  border-radius: 36px;
  box-shadow: 0 25px 40px -12px rgba(1, 22, 113, 0.08);
  border: 1px solid rgba(63, 81, 181, 0.06);
  padding: 2rem 2.5rem;
}
.form-control-custom, .form-select-custom {
  background-color: #f8fafd;
  border: 1.5px solid #e0e6ed;
  border-radius: 20px;
  padding: 0.75rem 1.2rem;
  font-size: 0.95rem;
  width: 100%;
}
textarea.form-control-custom { border-radius: 24px; }
.section-title {
  font-weight: 700;
  color: #121826;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}
.section-title i { color: var(--primary-deep); font-size: 1.6rem; }
.step-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e9ecf9;
  color: var(--primary-deep);
  font-weight: 700;
}
.step-indicator.active { background: var(--primary-deep); color: white; }
.progress-bar-custom {
  height: 8px;
  width: 100px;
  background: #e9ecf5;
  border-radius: 20px;
  overflow: hidden;
  margin: 0 0.75rem;
}
.progress-fill { height: 100%; background: var(--primary-deep); transition: width 0.3s; }
.footer-custom { background-color: var(--nav-bg); color: var(--light-text); }
.footer-custom a { color: var(--light-text) !important; text-decoration: none; }
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
.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
</style>