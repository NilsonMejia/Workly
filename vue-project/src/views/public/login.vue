<template>
  <div class="login-wrapper d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="/">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Tu búsqueda de trabajo profesional</span>
          </div>
        </a>
        <div class="d-flex gap-3 mt-3 mt-lg-0 align-items-center">
          <a href="/registro" class="btn btn-light fw-semibold px-4" @click="limpiarLocalStorage">
            Registrarse
          </a>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-8 col-xl-6">
            <div class="login-card p-4 p-md-5">
              <div class="text-center mb-4">
                <div class="d-inline-flex bg-white p-3 rounded-4 shadow-sm mb-3">
                  <i class="bi bi-box-arrow-in-right fs-1 text-primary-deep"></i>
                </div>
                <h1 class="display-6 fw-bold mb-2 text-dark-custom">Bienvenido de vuelta</h1>
                <p class="text-secondary mb-0">Ingresa a tu cuenta y continúa con tu proceso.</p>
              </div>

              <div v-if="alert.message" :class="['alert', `alert-${alert.type}`, 'alert-dismissible', 'fade', 'show', 'mb-3']" role="alert">
                {{ alert.message }}
                <button type="button" class="btn-close" @click="alert.message = ''"></button>
              </div>

              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label class="form-label fw-semibold" for="correo">Correo electrónico</label>
                  <input 
                    type="email" 
                    id="correo" 
                    v-model="correo" 
                    class="form-control form-control-custom" 
                    placeholder="tu@email.com" 
                    required 
                  >
                </div>

                <div class="mb-3">
                  <label class="form-label fw-semibold" for="password">Contraseña</label>
                  <input 
                    type="password" 
                    id="password" 
                    v-model="password" 
                    class="form-control form-control-custom" 
                    placeholder="••••••••" 
                    required 
                  >
                </div>

                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="recordarme" v-model="recordarme">
                    <label class="form-check-label" for="recordarme">Recordarme</label>
                  </div>
                  <a href="#" class="text-decoration-none fw-medium text-primary-deep">¿Olvidaste tu contraseña?</a>
                </div>

                <div class="d-grid gap-3">
                  <button type="submit" class="btn btn-primary-deep py-3 rounded-pill fs-5" :disabled="isLoading">
                    <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <i v-else class="bi bi-box-arrow-in-right me-2"></i>
                    {{ isLoading ? 'Iniciando...' : 'Iniciar sesión' }}
                  </button>
                  
                  <button 
                    type="button" 
                    class="btn btn-link text-decoration-none fw-semibold text-primary-deep" 
                    @click="reenviarVerificacion"
                  >
                    ¿No recibiste el enlace? Reenviar verificación
                  </button>
                </div>
              </form>

              <div class="text-center mt-4">
                <span class="text-secondary">¿Aún no tienes cuenta?</span>
                <a href="/registro" class="fw-bold text-decoration-none ms-1 text-primary-deep" @click="limpiarLocalStorage">
                  Regístrate ahora <i class="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="py-4 mt-auto footer-custom">
      <div class="container text-center">
        <div class="d-flex flex-wrap justify-content-center gap-4 gap-md-5">
          <a href="#">Ayuda</a>
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <span class="text-white opacity-75">Workly 2026 | Conectando talento</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// IMPORTANTE: Ajusta esta ruta a donde realmente se encuentre tu archivo config.js
import { 
  API_URL, 
  saveSession, 
  clearSession, 
  buildPendingVerificationPath, 
  normalizeAppRedirect 
} from "../../services/api.js";

// --- Estados Reactivos ---
const correo = ref('');
const password = ref('');
const recordarme = ref(true);
const isLoading = ref(false);

const alert = ref({
  message: '',
  type: 'danger'
});

// --- Métodos ---
const showAlert = (message, type = "danger") => {
  alert.value = { message, type };
};

const limpiarLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tipo");
  localStorage.removeItem("usuario");
};

const manejarMensajesUrl = () => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("verified") === "1") {
    clearSession();
    showAlert("¡Email verificado correctamente! Ya puedes iniciar sesión.", "success");
  } else if (params.get("verification") === "invalid") {
    showAlert("El enlace de verificación no es válido o ya no está disponible.", "warning");
  } else if (params.get("verification") === "error") {
    showAlert("Ocurrió un problema al verificar el correo. Inténtalo de nuevo.", "warning");
  }
};

const reenviarVerificacion = async () => {
  const emailVal = correo.value.trim().toLowerCase();

  if (!emailVal) {
    showAlert("Escribe tu correo en el campo superior para reenviar la verificación.", "warning");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/auth/reenviar-verificacion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo_electronico: emailVal })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo reenviar la verificación.");
    }

    showAlert(data.mensaje, "success");

    const fallbackPath = buildPendingVerificationPath({ email: emailVal });
    setTimeout(() => {
      window.location.href = normalizeAppRedirect(data.redirect, fallbackPath);
    }, 1200);
  } catch (error) {
    showAlert(error.message);
  }
};

const handleLogin = async () => {
  const emailVal = correo.value.trim().toLowerCase();
  const passVal = password.value.trim();

  if (!emailVal || !passVal) return;

  isLoading.value = true;
  alert.value.message = ''; // Limpiar alertas previas

  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correo_electronico: emailVal,
        contrasena: passVal
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 403 && data.code === "EMAIL_NO_VERIFICADO") {
        showAlert(`${data.mensaje}. Redirigiéndote a la pantalla de verificación...`, "warning");

        const fallbackPath = buildPendingVerificationPath({
          email: data.correo_electronico || emailVal,
          tipo: data.tipo
        });

        setTimeout(() => {
          window.location.href = normalizeAppRedirect(data.redirect, fallbackPath);
        }, 1200);
        return;
      }
      throw new Error(data.mensaje || "Error de acceso");
    }

    saveSession(data.token, data.tipo, data.data);

    // Mapeo de redirecciones
    const destinos = {
      usuario: "/dashboard",
      empresa: "/dashboard",
      admin: "/dashboard"
    };

    window.location.href = destinos[data.tipo] || "/";
  } catch (error) {
    showAlert(error.message);
  } finally {
    isLoading.value = false;
  }
};

// --- Ciclo de vida ---
onMounted(() => {
  manejarMensajesUrl();
});
</script>

<style scoped>
/* Las variables nativas globales se pueden mantener si las usas en un archivo CSS global, 
   pero si son específicas de la vista, se definen aquí */
.login-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #e9f2ff 0%, #f8f9fa 100%);
  font-family: 'Inter', sans-serif;
}

.text-primary-deep {
  color: #3f51b5 !important;
}

.text-dark-custom {
  color: #121826;
}

.navbar-custom {
  background-color: #011671;
  box-shadow: 0 6px 12px rgba(0,0,0,0.03);
}

.brand-icon {
  font-size: 3rem;
  color: white;
}

.brand-text {
  color: white;
  font-weight: 800;
  font-size: 1.9rem;
  display: block;
}

.brand-sub {
  color: #e2e4e8;
  font-size: 0.92rem;
}

.login-card {
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(255,255,255,0.8);
  border-radius: 2rem;
  box-shadow: 0 30px 40px -15px rgba(1, 22, 113, 0.15);
}

.btn-primary-deep {
  background-color: #3f51b5;
  border: none;
  color: white;
  font-weight: 700;
  transition: all 0.2s ease;
}

.btn-primary-deep:hover {
  background-color: #2c3e8f;
  color: white;
}

.form-control-custom {
  border: 1px solid #d9dfeb;
  border-radius: 16px;
  padding: 0.95rem 1rem;
}

.form-control-custom:focus {
  border-color: #3f51b5;
  box-shadow: 0 0 0 4px rgba(63, 81, 181, 0.1);
}

.footer-custom {
  background-color: #011671;
  color: #e2e4e8;
}

.footer-custom a {
  color: #e2e4e8;
  text-decoration: none;
}

.footer-custom a:hover {
  color: white;
  text-decoration: underline;
}
</style>
