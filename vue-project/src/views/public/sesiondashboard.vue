<template>
  <div class="sesion-wrapper d-flex flex-column min-vh-100">
    
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="/">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Dashboard administrativo</span>
          </div>
        </a>
        <button class="btn border-0 text-white fs-1 ms-auto p-0 d-lg-none">
          <i class="bi bi-list"></i>
        </button>
      </div>
    </nav>

    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">
            <div class="login-card p-4 p-md-5 mx-2">
              
              <div class="text-center mb-4">
                <div class="d-inline-flex bg-white p-3 rounded-4 shadow-sm mb-3">
                  <i class="bi bi-shield-lock-fill fs-1 text-primary-deep"></i>
                </div>
                <h1 class="display-6 fw-bold text-dark-custom">Acceso al Dashboard</h1>
                <p class="text-secondary">Gestión y administración del sistema</p>
              </div>

              <div v-if="sessionActive" class="text-center">
                <div class="alert alert-success mb-4 text-start">
                  <div><strong>Tipo de acceso:</strong> {{ sessionInfo.tipo }}</div>
                  <div><strong>Estado de sesión:</strong> Activa</div>
                  <div><strong>Usuario:</strong> {{ sessionInfo.identificador }}</div>
                </div>
                <button @click="redirigir" class="btn btn-primary-deep py-3 px-5 rounded-pill shadow-sm fs-5 fw-semibold w-100">
                  Ir a mi panel <i class="bi bi-arrow-right ms-2"></i>
                </button>
              </div>

              <div v-else class="row justify-content-center">
                <div class="col-12 col-md-9 col-lg-8">
                  <form @submit.prevent="handleLogin">
                    
                    <div class="mb-4">
                      <label class="form-label fw-semibold text-dark">
                        <i class="bi bi-envelope me-1"></i> Correo electrónico
                      </label>
                      <div :class="['input-group-custom', 'd-flex', 'align-items-center', { 'border-danger': emailError }]">
                        <input 
                          type="email" 
                          v-model="email" 
                          :class="['form-control-custom', { 'is-invalid': emailError }]"
                          placeholder="admin@workly.com" 
                        >
                        <span class="input-icon ps-2"><i class="bi bi-chevron-right"></i></span>
                      </div>
                      <div v-if="emailError" class="text-danger small mt-1 fw-semibold">
                        <i class="bi bi-exclamation-circle"></i> Este campo es obligatorio.
                      </div>
                    </div>

                    <div class="mb-5">
                      <label class="form-label fw-semibold text-dark">
                        <i class="bi bi-lock me-1"></i> Contraseña
                      </label>
                      <div :class="['input-group-custom', 'd-flex', 'align-items-center', { 'border-danger': passError }]">
                        <input 
                          type="password" 
                          v-model="password" 
                          :class="['form-control-custom', { 'is-invalid': passError }]"
                          placeholder="********" 
                        >
                        <span class="input-icon ps-2"><i class="bi bi-eye-slash"></i></span>
                      </div>
                      <div v-if="passError" class="text-danger small mt-1 fw-semibold">
                        <i class="bi bi-exclamation-circle"></i> Este campo es obligatorio.
                      </div>
                    </div>

                    <div class="d-flex justify-content-center mb-4">
                      <button 
                        type="submit" 
                        class="btn btn-primary-deep py-3 px-5 rounded-pill shadow-sm fs-5 fw-semibold w-100"
                        :disabled="isLoading"
                      >
                        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        <i v-else class="bi bi-box-arrow-in-right me-2"></i>
                        {{ isLoading ? 'Verificando...' : 'Iniciar Sesión' }}
                      </button>
                    </div>

                    <p class="text-center text-secondary small">
                      <i class="bi bi-question-circle"></i> ¿Problemas para acceder? Contacta a soporte
                    </p>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div :class="['toast', 'align-items-center', 'text-white', 'bg-danger', 'border-0', 'rounded-4', 'shadow', 'mb-2', { 'show': toast.show && toast.type === 'error' }]" role="alert">
        <div class="d-flex">
          <div class="toast-body fs-6 py-3 fw-semibold">
            <i class="bi bi-exclamation-triangle-fill me-2 fs-5"></i> {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="toast.show = false"></button>
        </div>
      </div>
      
      <div :class="['toast', 'align-items-center', 'text-white', 'bg-success', 'border-0', 'rounded-4', 'shadow', { 'show': toast.show && toast.type === 'success' }]" role="alert">
        <div class="d-flex">
          <div class="toast-body fs-6 py-3 fw-semibold">
            <i class="bi bi-check-circle-fill me-2 fs-5"></i> {{ toast.message }}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="toast.show = false"></button>
        </div>
      </div>
    </div>

    <footer class="py-4 mt-auto footer-custom">
      <div class="container text-center">
        <div class="d-flex flex-wrap justify-content-center gap-4 gap-md-5">
          <a href="#"><i class="bi bi-question-circle me-1"></i>Ayuda</a>
          <a href="#"><i class="bi bi-shield-lock me-1"></i>Privacidad</a>
          <a href="#">Términos</a>
          <span class="text-white opacity-75">Workly 2026 · Panel administrativo</span>
        </div>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// IMPORTANTE: Asegúrate de que esta ruta apunte correctamente a tu archivo config.js
import { API_URL, saveSession, getToken, getTipo, getUsuario } from "../../services/api.js";

// --- Estados Reactivos ---
const email = ref('');
const password = ref('');
const isLoading = ref(false);
const emailError = ref(false);
const passError = ref(false);

const sessionActive = ref(false);
const sessionInfo = ref({
  tipo: '',
  identificador: ''
});

const toast = ref({
  show: false,
  type: '', // 'error' o 'success'
  message: ''
});

// --- Métodos ---
const showToast = (type, message) => {
  toast.value = { show: true, type, message };
  setTimeout(() => { toast.value.show = false; }, 4000);
};

const verificarSesion = () => {
  const token = getToken();
  const tipo = getTipo();
  const usuario = getUsuario();

  if (token && tipo) {
    sessionActive.value = true;
    sessionInfo.value = {
      tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1),
      identificador: usuario?.correo_electronico || usuario?.nombre_comercial || "Usuario Identificado"
    };
  }
};

const redirigir = () => {
  const token = getToken();
  const tipo = getTipo();

  if (!token || !tipo) {
    window.location.href = "/login";
    return;
  }

  const destinos = {
    usuario: "/dashboard",
    empresa: "/dashboard",
    admin: "/admin/principal"
  };

  window.location.href = destinos[tipo] || "/login";
};

const handleLogin = async () => {
  const emailValue = email.value.trim();
  const passValue = password.value.trim();

  // Resetear errores previos
  emailError.value = emailValue === "";
  passError.value = passValue === "";

  if (emailError.value || passError.value) {
    showToast('error', '¡Error! Por favor, completa todos los campos obligatorios.');
    return;
  }

  isLoading.value = true;

  try {
    const response = await fetch(`${API_URL}/admin-auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario: emailValue,
        clave: passValue
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo iniciar sesión.");
    }

    saveSession(data.token, data.tipo, data.data);
    showToast('success', '¡Inicio de sesión exitoso! Redirigiendo...');

    setTimeout(() => {
      redirigir();
    }, 1200);

  } catch (error) {
    showToast('error', error.message);
  } finally {
    isLoading.value = false;
  }
};

// --- Ciclo de Vida ---
onMounted(() => {
  verificarSesion();
});
</script>

<style scoped>
.sesion-wrapper {
  background: linear-gradient(135deg, #eef5ff 0%, #ffffff 100%);
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

.login-card {
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.7);
  border-radius: 2.5rem;
  box-shadow: 0 30px 40px -15px rgba(1, 22, 113, 0.15);
  transition: transform 0.25s ease;
}

.login-card:hover {
  transform: translateY(-4px);
}

.input-group-custom {
  border-bottom: 2px solid #cdd2dc;
  transition: border-color 0.2s;
}

.input-group-custom:focus-within {
  border-bottom-color: #3f51b5;
}

.input-group-custom.border-danger {
  border-bottom-color: #dc3545 !important;
}

.form-control-custom {
  border: none;
  background: transparent;
  padding: 0.75rem 0.5rem;
  font-size: 1rem;
  width: 100%;
}

.form-control-custom:focus {
  box-shadow: none;
  background: transparent;
  outline: none;
}

.input-icon {
  color: #5a6275;
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

.toast-container {
  z-index: 1055;
}

.toast {
  display: none;
  transition: opacity 0.3s ease;
}

.toast.show {
  display: block;
}
</style>
