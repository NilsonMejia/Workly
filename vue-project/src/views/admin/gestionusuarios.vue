<template>
  <div>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg py-3 sticky-top">
      <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold text-white fs-3 d-flex align-items-center" href="/admin/principal">
          <i class="bi bi-briefcase-fill me-2"></i> Workly
        </a>

        <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navContent">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/principal">Dashboard</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom active" href="/admin/usuarios">Usuarios</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/empresas">Empresas</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/vacantes">Vacantes</a></li>
            <li class="nav-item"><a class="nav-link nav-link-custom" href="/admin/estadisticas">EstadÃ­sticas</a></li>
          </ul>
          <div class="profile-wrapper ms-lg-3">
            <i class="bi bi-person-circle fs-2 text-white" style="cursor: pointer;"></i>
            <span class="notif-badge"></span>
          </div>
        </div>
      </div>
    </nav>

    <main class="container-fluid px-4 py-4">
      <div class="row g-4">
        <!-- Sidebar -->
        <aside class="col-12 col-lg-2">
          <div class="bento-card p-3 h-100">
            <h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">MenÃº Admin</h6>
            <div class="d-flex flex-column">
              <a href="/admin/principal" class="btn-menu-side">
                <i class="bi bi-grid-fill me-2"></i> Dashboard
              </a>
              <a href="/admin/usuarios" class="btn-menu-side active">
                <i class="bi bi-people-fill me-2"></i> GestiÃ³n de Usuarios
              </a>
              <a href="/admin/empresas" class="btn-menu-side">
                <i class="bi bi-building me-2"></i> GestiÃ³n de Empresas
              </a>
              <a href="/admin/vacantes" class="btn-menu-side">
                <i class="bi bi-file-earmark-text me-2"></i> GestiÃ³n de Vacantes
              </a>
              <a href="/admin/estadisticas" class="btn-menu-side">
                <i class="bi bi-bar-chart-fill me-2"></i> EstadÃ­sticas del Sistema
              </a>
              <a href="/admin/moderacion" class="btn-menu-side">
                <i class="bi bi-shield-lock-fill me-2"></i> ModeraciÃ³n de Contenido
              </a>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="col-12 col-lg-10">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">GestiÃ³n de Usuarios</h4>
          </div>

          <!-- Alert Container -->
          <div v-if="alertMessage" class="mb-3">
            <div :class="`alert alert-${alertType} rounded-4`" role="alert">
              {{ alertMessage }}
            </div>
          </div>

          <!-- Filter Bar -->
          <div class="bento-card p-2 mb-4">
            <div class="row g-2 align-items-center">
              <div class="col">
                <div class="input-group">
                  <span class="input-group-text bg-light border-0">
                    <i class="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    v-model="filtroTexto"
                    @keydown.enter="aplicarFiltro"
                    class="form-control bg-light border-0"
                    placeholder="Buscar usuario o correo..."
                  >
                </div>
              </div>
              <div class="col-auto">
                <button
                  class="btn btn-primary px-4"
                  @click="aplicarFiltro"
                  style="background-color: var(--azul); border-radius: 10px;"
                >
                  Filtrar
                </button>
              </div>
            </div>
          </div>

          <!-- Users Table -->
          <div class="bento-card p-4 mb-4">
            <h6 class="fw-bold mb-4">Lista de usuarios</h6>
            <div class="table-responsive">
              <table class="table align-middle">
                <thead class="text-muted border-bottom">
                  <tr>
                    <th>Usuario</th>
                    <th>Correo</th>
                    <th>TelÃ©fono</th>
                    <th>Municipio</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="tablaUsuarios">
                  <tr v-if="loading">
                    <td colspan="5" class="text-muted text-center">Cargando usuarios...</td>
                  </tr>
                  <tr v-else-if="filteredUsuarios.length === 0">
                    <td colspan="5" class="text-muted text-center">No hay usuarios registrados.</td>
                  </tr>
                  <tr v-else v-for="usuario in filteredUsuarios" :key="usuario.id_usuario">
                    <td>
                      <div class="d-flex align-items-center">
                        <i class="bi bi-person-circle fs-3 me-2 text-secondary"></i>
                        <div>
                          <div class="fw-bold">{{ usuario.nombres || '' }} {{ usuario.apellidos || '' }}</div>
                          <div class="small text-muted">{{ usuario.resumen_profesional || '' }}</div>
                        </div>
                      </div>
                    </td>
                    <td>{{ usuario.correo_electronico || 'N/D' }}</td>
                    <td>{{ usuario.telefono || 'N/D' }}</td>
                    <td>{{ usuario.nombre_municipio || usuario.id_municipio_fk || 'N/D' }}</td>
                    <td>
                      <div class="d-flex align-items-center gap-2">
                        <button
                          class="btn btn-sm text-white fw-bold px-3"
                          @click="eliminarUsuario(usuario.id_usuario)"
                          style="background-color:#dc3545; border-radius: 6px;"
                        >
                          Eliminar
                        </button>
                      </div>
                     </td>
                   </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Summary and Activity -->
          <div class="row g-4">
            <div class="col-12 col-md-4">
              <div class="bento-card p-4 h-100">
                <h6 class="fw-bold mb-4">Resumen</h6>
                <div class="vstack gap-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Total usuarios</span>
                    <span class="fw-bold fs-5">{{ filteredUsuarios.length }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Con telÃ©fono</span>
                    <span class="fw-bold fs-5">{{ usuariosConTelefono }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted fw-semibold">Sin telÃ©fono</span>
                    <span class="fw-bold fs-5">{{ usuariosSinTelefono }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-8">
              <div class="bento-card p-4">
                <h6 class="fw-bold mb-4">
                  <i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente
                </h6>
                <div class="vstack gap-3" id="actividadUsuarios">
                  <div v-if="filteredUsuarios.length === 0" class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
                    No hay actividad disponible.
                  </div>
                  <div
                    v-for="(usuario, index) in filteredUsuarios.slice(0, 3)"
                    :key="usuario.id_usuario"
                    class="p-3 rounded-4 bg-light border-start border-4"
                    :class="{
                      'border-primary': index === 0,
                      'border-success': index === 1,
                      'border-warning': index === 2
                    }"
                  >
                    <div class="d-flex justify-content-between align-items-center">
                      <h6 class="fw-bold mb-1">{{ usuario.nombres || '' }} {{ usuario.apellidos || '' }}</h6>
                      <small class="text-muted">Registro reciente</small>
                    </div>
                    <p class="small mb-0 text-muted">
                      {{ usuario.correo_electronico || 'Sin correo' }}
                      <span v-if="usuario.telefono"> Â· {{ usuario.telefono }}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="py-4">
      <div class="container text-center">
        <div class="d-flex justify-content-center gap-4 small opacity-75">
          <a href="#" class="text-white text-decoration-none">Ayuda</a>
          <a href="#" class="text-white text-decoration-none">Privacidad</a>
          <span class="fw-semibold">Workly 2026</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue'
import { API_URL, getToken, clearSession, requireAuth } from '../../services/api.js'

// ========== Estado reactivo ==========
const loading = ref(true)
const alertMessage = ref('')
const alertType = ref('danger')
const usuarios = ref([])
const filtroTexto = ref('')

// ========== Computed ==========
const filteredUsuarios = computed(() => {
  const texto = filtroTexto.value.trim().toLowerCase()
  if (!texto) return usuarios.value

  return usuarios.value.filter(item =>
    `${item.nombres || ''} ${item.apellidos || ''}`.toLowerCase().includes(texto) ||
    (item.correo_electronico || '').toLowerCase().includes(texto)
  )
})

const usuariosConTelefono = computed(() => {
  return filteredUsuarios.value.filter(u => (u.telefono || '').trim() !== '').length
})

const usuariosSinTelefono = computed(() => {
  return filteredUsuarios.value.filter(u => !(u.telefono || '').trim()).length
})

// ========== Funciones auxiliares ==========
const showAlert = (message, type = 'danger') => {
  alertMessage.value = message
  alertType.value = type
  setTimeout(() => {
    alertMessage.value = ''
  }, 5000)
}

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json'
})

const redirectToLogin = () => {
  if (typeof clearSession === 'function') clearSession()
  window.location.href = '/login'
}

// ========== API Calls ==========
const cargarUsuarios = async () => {
  loading.value = true
  try {
    const response = await fetch(`${API_URL}/admin/usuarios`, {
      headers: authHeaders()
    })

    let data = []
    try {
      data = await response.json()
    } catch {
      data = []
    }

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudieron cargar los usuarios.')
      return
    }

    usuarios.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error(error)
    showAlert('Error de conexiÃ³n con el servidor.')
  } finally {
    loading.value = false
  }
}

const eliminarUsuario = async (id) => {
  if (!confirm('Â¿Seguro que deseas eliminar este usuario?')) return

  try {
    const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })

    let data = {}
    try {
      data = await response.json()
    } catch {
      data = {}
    }

    if (response.status === 401 || response.status === 403) {
      redirectToLogin()
      return
    }

    if (!response.ok) {
      showAlert(data.mensaje || 'No se pudo eliminar el usuario.')
      return
    }

    showAlert('Usuario eliminado correctamente.', 'success')
    await cargarUsuarios()
  } catch (error) {
    console.error(error)
    showAlert('Error de conexiÃ³n con el servidor.')
  }
}

// ========== Filtro ==========
const aplicarFiltro = () => {
  // El filtro ya es reactivo gracias a v-model y el computed.
  // Esta funciÃ³n existe para mantener coherencia con el diseÃ±o original.
  // No requiere lÃ³gica adicional.
}

// ========== Ciclo de vida ==========
onBeforeMount(() => {
  try {
    requireAuth(['admin'])
  } catch (error) {
    console.error('Error de autenticaciÃ³n:', error)
    redirectToLogin()
  }
})

onMounted(() => {
  cargarUsuarios()
})
</script>

<style scoped>
:root {
  --azul-oscuro: #001670;
  --azul: #2C48D4;
  --celeste: #84ACF0;
  --amarillo-mostaza: #F8BD00;
  --fondo: #E9F0FF;
  --success-btn: #28a745;
  --danger-btn: #dc3545;
  --suspend-btn: #b23b3b;
  --gris-claro: #E9ECEF;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--fondo);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background-color: var(--azul-oscuro) !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.nav-link-custom {
  color: rgba(255,255,255,0.8);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s;
  border-radius: 8px;
  padding: 8px 15px !important;
}

.nav-link-custom:hover {
  background: rgba(255,255,255,0.1);
  color: white;
}

.nav-link-custom.active {
  background: rgba(255,255,255,0.2);
  color: white;
}

.profile-wrapper {
  position: relative;
  display: inline-block;
}

.notif-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 12px;
  height: 12px;
  background-color: #ff3b3b;
  border: 2px solid var(--azul-oscuro);
  border-radius: 50%;
}

.btn-menu-side {
  text-align: left;
  border: none;
  padding: 12px 15px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: 0.3s;
  background-color: var(--azul);
  color: white;
  margin-bottom: 8px;
  width: 100%;
  text-decoration: none;
  display: inline-block;
}

.btn-menu-side:hover {
  background-color: var(--azul-oscuro);
  color: white;
  transform: translateX(5px);
}

.btn-menu-side.active {
  background-color: var(--celeste) !important;
  color: var(--azul-oscuro) !important;
}

.bento-card {
  background: white;
  border-radius: 20px;
  border: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
}

.btn-action-top {
  background-color: var(--azul);
  color: white;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  padding: 10px 20px;
}

.table thead th {
  border: none;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

footer {
  background-color: var(--azul-oscuro);
  color: white;
  margin-top: auto;
}
</style>