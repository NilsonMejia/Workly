<template>
  <div class="registro-wrapper d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="/">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Tu búsqueda de trabajo profesional</span>
          </div>
        </a>
        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false">
          <span class="navbar-toggler-icon" style="filter: invert(1);"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
          <div class="d-flex gap-3 mt-3 mt-lg-0 align-items-center">
            <a href="/login" class="btn btn-outline-light px-4 py-2 fw-semibold" style="border-color: rgba(255,255,255,0.5); color: white;">
              <i class="bi bi-box-arrow-in-right me-1"></i> Iniciar sesión
            </a>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-9">
            <div class="register-card p-4 p-md-5">

              <div class="text-center mb-4">
                <div class="d-inline-flex bg-white p-3 rounded-4 shadow-sm mb-3">
                  <i class="bi bi-person-plus-fill fs-1 text-primary-deep"></i>
                </div>
                <h1 class="display-6 fw-bold text-dark-custom">Crear cuenta</h1>
                <p class="text-secondary">Únete a Workly y descubre miles de oportunidades</p>
                
                <ul class="nav nav-pills justify-content-center p-1 rounded-pill d-inline-flex mx-auto mt-3 tabs-container">
                  <li class="nav-item">
                    <button 
                      :class="['nav-link', 'rounded-pill', 'px-4', 'py-2', 'fw-semibold', { active: tipoRegistro === 'usuario' }]" 
                      @click="tipoRegistro = 'usuario'" 
                      type="button"
                    >
                      <i class="bi bi-person me-1"></i> Usuario
                    </button>
                  </li>
                  <li class="nav-item">
                    <button 
                      :class="['nav-link', 'rounded-pill', 'px-4', 'py-2', 'fw-semibold', { active: tipoRegistro === 'empresa' }]" 
                      @click="tipoRegistro = 'empresa'" 
                      type="button"
                    >
                      <i class="bi bi-building me-1"></i> Empresa
                    </button>
                  </li>
                </ul>
              </div>

              <div v-if="alert.message" :class="['alert', `alert-${alert.type}`, 'alert-dismissible', 'fade', 'show']" role="alert">
                <span v-html="alert.message"></span>
                <button type="button" class="btn-close" @click="alert.message = ''"></button>
              </div>

              <form @submit.prevent="handleRegistro">
                
                <div v-show="tipoRegistro === 'usuario'">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-person"></i> Nombres</div>
                      <input type="text" v-model="formUsuario.nombres" class="form-control-custom w-100" placeholder="ej. Juan Carlos" required>
                    </div>
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-person"></i> Apellidos</div>
                      <input type="text" v-model="formUsuario.apellidos" class="form-control-custom w-100" placeholder="ej. Pérez López" required>
                    </div>
                  </div>
                  <div class="row g-3 mt-2">
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-envelope"></i> Correo Electrónico</div>
                      <input type="email" v-model="formUsuario.correo_electronico" class="form-control-custom w-100" placeholder="tu@email.com" required>
                    </div>
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-telephone"></i> Teléfono</div>
                      <input type="text" v-model="formUsuario.telefono" class="form-control-custom w-100" placeholder="+503 1234 5678" required>
                    </div>
                  </div>
                  <div class="row g-3 mt-2">
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-lock"></i> Contraseña</div>
                      <input type="password" v-model="formUsuario.contrasena" class="form-control-custom w-100" placeholder="••••••••" required>
                    </div>
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-lock-fill"></i> Confirmar Contraseña</div>
                      <input type="password" v-model="formUsuario.confirmacion" class="form-control-custom w-100" placeholder="••••••••" required>
                    </div>
                  </div>
                  <div class="row g-3 mt-2">
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-geo-alt"></i> Municipio</div>
                      <select v-model="formUsuario.id_municipio_fk" class="form-select-custom w-100" required>
                        <option value="" disabled>Selecciona tu municipio</option>
                        <optgroup v-for="(municipios, departamento) in municipiosAgrupados" :key="departamento" :label="departamento">
                          <option v-for="mun in municipios" :key="mun.id_municipio" :value="mun.id_municipio">
                            {{ mun.nombre_municipio }}
                          </option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="input-label"><i class="bi bi-file-text"></i> Resumen Profesional</div>
                    <textarea v-model="formUsuario.resumen_profesional" class="form-control-custom w-100" rows="3" placeholder="Cuéntanos sobre tu experiencia..."></textarea>
                  </div>
                </div>

                <div v-show="tipoRegistro === 'empresa'">
                  <div class="row g-3">
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-shop"></i> Nombre Comercial</div>
                      <input type="text" v-model="formEmpresa.nombre_comercial" class="form-control-custom w-100" placeholder="ej. TechNova S.A." :required="tipoRegistro === 'empresa'">
                    </div>
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-building"></i> Razón Social</div>
                      <input type="text" v-model="formEmpresa.razon_social" class="form-control-custom w-100" placeholder="Razón social legal">
                    </div>
                  </div>
                  <div class="row g-3 mt-2">
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-envelope"></i> Correo Corporativo</div>
                      <input type="email" v-model="formEmpresa.correo_electronico" class="form-control-custom w-100" placeholder="contacto@empresa.com" :required="tipoRegistro === 'empresa'">
                    </div>
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-telephone"></i> Teléfono Empresa</div>
                      <input type="text" v-model="formEmpresa.telefono" class="form-control-custom w-100" placeholder="+503 2222 3333" :required="tipoRegistro === 'empresa'">
                    </div>
                  </div>
                  <div class="row g-3 mt-2">
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-lock"></i> Contraseña</div>
                      <input type="password" v-model="formEmpresa.contrasena" class="form-control-custom w-100" placeholder="••••••••" :required="tipoRegistro === 'empresa'">
                    </div>
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-lock-fill"></i> Confirmar Contraseña</div>
                      <input type="password" v-model="formEmpresa.confirmacion" class="form-control-custom w-100" placeholder="••••••••" :required="tipoRegistro === 'empresa'">
                    </div>
                  </div>
                  <div class="row g-3 mt-2">
                    <div class="col-md-6">
                      <div class="input-label"><i class="bi bi-geo-alt"></i> Municipio</div>
                      <select v-model="formEmpresa.id_municipio_fk" class="form-select-custom w-100" :required="tipoRegistro === 'empresa'">
                        <option value="" disabled>Selecciona municipio</option>
                        <optgroup v-for="(municipios, departamento) in municipiosAgrupados" :key="departamento" :label="departamento">
                          <option v-for="mun in municipios" :key="mun.id_municipio" :value="mun.id_municipio">
                            {{ mun.nombre_municipio }}
                          </option>
                        </optgroup>
                      </select>
                    </div>
                  </div>
                  <div class="mt-3">
                    <div class="input-label"><i class="bi bi-info-circle"></i> Descripción de la Empresa</div>
                    <textarea v-model="formEmpresa.descripcion_empresa" class="form-control-custom w-100" rows="3" placeholder="Describe tu empresa, sector, etc."></textarea>
                  </div>
                </div>

                <button type="submit" class="btn btn-primary-deep w-100 py-3 rounded-pill shadow-sm mt-4 fw-bold fs-5" :disabled="isLoading">
                  <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  <i v-else class="bi bi-check2-circle me-2"></i> 
                  {{ isLoading ? 'PROCESANDO...' : 'REGISTRARSE' }}
                </button>

                <div class="section-divider">
                  <hr>
                  <span>o regístrate con</span>
                  <hr>
                </div>

                <button type="button" class="btn btn-light w-100 py-3 rounded-pill shadow-sm d-flex align-items-center justify-content-center gap-2 border">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="20" height="20">
                  Continuar con Google
                </button>
              </form>

              <p class="text-center mt-4 mb-0 text-secondary">
                ¿Ya tienes una cuenta? 
                <a href="/login" class="fw-bold text-decoration-none text-primary-deep">
                  Inicia sesión <i class="bi bi-arrow-right"></i>
                </a>
              </p>

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
          <span class="text-white opacity-75">💼 Workly 2026 · Conectando talento</span>
        </div>
        <div class="mt-3 small opacity-75">
          <i class="bi bi-geo-alt"></i> Presente en +15 países
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// IMPORTANTE: Ajusta esta ruta a tu estructura de proyecto Vue
import { API_URL, buildPendingVerificationPath, normalizeAppRedirect } from "../../services/api.js";

// --- Estados Reactivos ---
const tipoRegistro = ref('usuario');
const isLoading = ref(false);
const alert = ref({ message: '', type: 'danger' });
const municipiosAgrupados = ref({});

// Formularios separados para mantener limpieza de datos
const formUsuario = ref({
  nombres: '',
  apellidos: '',
  correo_electronico: '',
  telefono: '',
  contrasena: '',
  confirmacion: '',
  id_municipio_fk: '',
  resumen_profesional: ''
});

const formEmpresa = ref({
  nombre_comercial: '',
  razon_social: '',
  correo_electronico: '',
  telefono: '',
  contrasena: '',
  confirmacion: '',
  id_municipio_fk: '',
  descripcion_empresa: ''
});

// --- Métodos ---
const showAlert = (message, type = "danger") => {
  alert.value = { message, type };
};

const cargarMunicipios = async () => {
  try {
    const response = await fetch(`${API_URL}/catalogos/municipios-agrupados`);
    const data = await response.json();

    // Agrupar los municipios por departamento para poblar los <optgroup>
    const agrupados = {};
    data.forEach(item => {
      if (!agrupados[item.nombre_departamento]) {
        agrupados[item.nombre_departamento] = [];
      }
      agrupados[item.nombre_departamento].push(item);
    });
    
    municipiosAgrupados.value = agrupados;
  } catch (error) {
    console.error(error);
    showAlert("No se pudo conectar con el servidor para cargar municipios.");
  }
};

const handleRegistro = async () => {
  isLoading.value = true;
  alert.value.message = '';

  try {
    let url = '';
    let payloadBody = {};
    let emailFallback = '';

    if (tipoRegistro.value === 'usuario') {
      if (formUsuario.value.contrasena !== formUsuario.value.confirmacion) {
        throw new Error("Las contraseñas de usuario no coinciden.");
      }
      url = `${API_URL}/api/auth/register-user`;
      emailFallback = formUsuario.value.correo_electronico.trim().toLowerCase();
      
      payloadBody = {
        nombres: formUsuario.value.nombres.trim(),
        apellidos: formUsuario.value.apellidos.trim(),
        correo_electronico: emailFallback,
        telefono: formUsuario.value.telefono.trim(),
        contrasena: formUsuario.value.contrasena,
        id_municipio_fk: Number(formUsuario.value.id_municipio_fk),
        resumen_profesional: formUsuario.value.resumen_profesional.trim()
      };
    } else {
      if (formEmpresa.value.contrasena !== formEmpresa.value.confirmacion) {
        throw new Error("Las contraseñas de empresa no coinciden.");
      }
      url = `${API_URL}/api/auth/register-company`;
      emailFallback = formEmpresa.value.correo_electronico.trim().toLowerCase();
      
      payloadBody = {
        nombre_comercial: formEmpresa.value.nombre_comercial.trim(),
        razon_social: formEmpresa.value.razon_social.trim(),
        correo_electronico: emailFallback,
        telefono: formEmpresa.value.telefono.trim(),
        contrasena: formEmpresa.value.contrasena,
        id_municipio_fk: Number(formEmpresa.value.id_municipio_fk),
        descripcion_empresa: formEmpresa.value.descripcion_empresa.trim()
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadBody)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo completar el registro.");
    }

    const mensajeExito = data.advertencia
      ? `${data.mensaje}<br><small>${data.advertencia}</small>`
      : data.mensaje;

    showAlert(mensajeExito, data.advertencia ? "warning" : "success");

    const fallbackPath = buildPendingVerificationPath({
      email: data.email || emailFallback,
      tipo: data.tipo || tipoRegistro.value
    });
    
    const redirectPath = normalizeAppRedirect(data.redirect, fallbackPath);

    setTimeout(() => {
      window.location.href = redirectPath;
    }, 1800);

  } catch (error) {
    showAlert(error.message);
  } finally {
    isLoading.value = false;
  }
};

// --- Ciclo de Vida ---
onMounted(() => {
  cargarMunicipios();
});
</script>

<style scoped>
/* Las fuentes y root vars pueden ir en tu CSS global. Aquí solo el scoping del componente */
.registro-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f4f8ff 0%, #f8f9fa 100%);
  font-family: 'Inter', sans-serif;
}

.text-primary-deep {
  color: #3f51b5 !important;
}

.text-dark-custom {
  color: #121826;
}

.navbar-custom {
  background-color: #011671 !important;
  box-shadow: 0 6px 12px rgba(0,0,0,0.05);
}

.brand-icon {
  font-size: 3.5rem;
  color: white;
  margin-right: 0.75rem;
}

.brand-text {
  color: white;
  font-weight: 700;
  font-size: 2rem;
  line-height: 1.2;
}

.brand-sub {
  color: #e2e4e8;
  font-size: 0.95rem;
}

.btn-primary-deep {
  background-color: #3f51b5;
  border: none;
  color: white;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-primary-deep:hover {
  background-color: #2c3e8f;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(63, 81, 181, 0.25);
  color: white;
}

.register-card {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.7);
  border-radius: 2.5rem;
  box-shadow: 0 30px 40px -15px rgba(1, 22, 113, 0.15);
  transition: transform 0.25s ease;
}

.register-card:hover {
  transform: translateY(-4px);
}

.tabs-container {
  background: #f2f4f8 !important;
}

.nav-pills .nav-link {
  color: #1e1f22 !important;
  background-color: transparent;
  border-radius: 40px !important;
  padding: 0.6rem 1.8rem;
  font-weight: 600;
  transition: all 0.2s;
}

.nav-pills .nav-link.active {
  background-color: #3f51b5 !important;
  color: white !important;
  box-shadow: 0 6px 12px rgba(63, 81, 181, 0.2);
}

.nav-pills .nav-link:not(.active):hover {
  background-color: rgba(63, 81, 181, 0.08);
}

.form-control-custom, .form-select-custom {
  border: 1.5px solid #e0e4eb;
  border-radius: 16px;
  padding: 0.75rem 1.2rem;
  font-size: 1rem;
  background-color: white;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-control-custom:focus, .form-select-custom:focus {
  border-color: #3f51b5;
  box-shadow: 0 0 0 4px rgba(63, 81, 181, 0.1);
  outline: none;
}

.form-select-custom {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%233f51b5' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1.2rem center;
  background-size: 16px 12px;
  appearance: none;
}

.input-label {
  font-weight: 600;
  color: #1e1f22;
  margin-bottom: 0.4rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.section-divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.section-divider hr {
  flex: 1;
  border-top: 1px solid #cdd2dc;
}

.section-divider span {
  background: white;
  padding: 0 1rem;
  color: #5a6275;
  font-weight: 500;
}

.footer-custom {
  background-color: #011671;
  color: #e2e4e8;
}

.footer-custom a {
  color: #e2e4e8 !important;
  text-decoration: none;
}

.footer-custom a:hover {
  color: white !important;
  text-decoration: underline;
}

.btn-outline-light:hover {
  background-color: rgba(255,255,255,0.15) !important;
}
</style>
