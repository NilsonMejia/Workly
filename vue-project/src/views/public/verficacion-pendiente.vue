<template>
  <div class="d-flex flex-column min-vh-100 bg-light-gradient">
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="/">
          <i class="bi bi-briefcase-fill text-white fs-2"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Tu búsqueda de trabajo profesional</span>
          </div>
        </a>
      </div>
    </nav>

    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-9 col-xl-7">
            <div class="pending-card p-4 p-lg-5">
              
              <div class="text-center mb-4">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-3 icon-container">
                  <i class="bi bi-envelope-check fs-1"></i>
                </div>
                <h1 class="display-6 fw-bold mb-2 text-dark-custom">Verifica tu email</h1>
                <p class="text-secondary mb-0">Te hemos enviado un código de verificación a tu correo.</p>
                <p class="fw-semibold mt-2 mb-0 text-primary-deep">{{ email || '--' }}</p>
              </div>

              <div v-if="alert.message" :class="['alert', `alert-${alert.type}`, 'alert-dismissible', 'fade', 'show', 'mb-4']" role="alert">
                {{ alert.message }}
                <button type="button" class="btn-close" @click="alert.message = ''"></button>
              </div>

              <div class="action-card mb-4">
                <h2 class="h5 fw-bold mb-2 text-dark-custom">Ingresa tu código</h2>
                <p class="text-secondary mb-3">Escribe el código de 6 dígitos que recibiste para activar tu cuenta.</p>
                <div class="mb-3">
                  <label class="form-label fw-semibold" for="codigoVerificacion">Código de verificación</label>
                  <input 
                    type="text" 
                    id="codigoVerificacion" 
                    v-model="codigo" 
                    @input="formatCodigo"
                    class="form-control form-control-lg rounded-4 text-center code-input" 
                    inputmode="numeric" 
                    maxlength="6" 
                    placeholder="123456"
                    :disabled="isLoading"
                  >
                </div>
                <button class="btn btn-success btn-lg rounded-pill px-4" @click="verificarCodigo" :disabled="isLoading">
                  <span v-if="isLoadingAction === 'verificar'" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  Verificar código
                </button>
              </div>

              <div class="action-card mb-4">
                <h2 class="h5 fw-bold mb-2 text-dark-custom">Reenviar código de verificación</h2>
                <p class="text-secondary mb-3">Si no recibiste el mensaje, podemos enviarte uno nuevo.</p>
                <button class="btn btn-primary-deep btn-lg rounded-pill px-4" @click="reenviarCorreo" :disabled="isLoading">
                  <span v-if="isLoadingAction === 'reenviar'" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  Reenviar código
                </button>
              </div>

              <div class="action-card">
                <h2 class="h5 fw-bold mb-2 text-dark-custom">Cambiar correo electrónico</h2>
                <p class="text-secondary mb-3">Si escribiste mal tu correo, actualízalo y te enviaremos un nuevo código.</p>
                <div class="mb-3">
                  <label class="form-label fw-semibold" for="nuevoCorreo">Nuevo correo</label>
                  <input 
                    type="email" 
                    id="nuevoCorreo" 
                    v-model="nuevoCorreoInput" 
                    class="form-control form-control-lg rounded-4" 
                    placeholder="nuevo@email.com"
                    :disabled="isLoading"
                  >
                </div>
                <button class="btn btn-outline-primary-deep btn-lg rounded-pill px-4" @click="cambiarCorreo" :disabled="isLoading">
                  <span v-if="isLoadingAction === 'cambiar'" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  Cambiar correo
                </button>
              </div>

              <div class="text-center mt-4">
                <a href="/login" class="text-decoration-none fw-semibold text-primary-deep">
                  Volver a iniciar sesión
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer-custom py-4 mt-auto text-center text-white-50">
      <div class="container">Workly 2026 | Revisa también spam o promociones</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// IMPORTANTE: Ajusta esta ruta a donde realmente se encuentre tu archivo config.js
import { API_URL, buildPendingVerificationPath, normalizeAppRedirect, resolveViewPath } from "../../services/api.js";

// --- Estados Reactivos ---
const email = ref("");
const tipo = ref("");
const status = ref("");

const codigo = ref("");
const nuevoCorreoInput = ref("");

const alert = ref({ message: "", type: "danger" });

// 'verificar', 'reenviar', 'cambiar' o null
const isLoadingAction = ref(null);
const isLoading = ref(false);

// --- Métodos ---
const showAlert = (message, type = "danger") => {
  alert.value = { message, type };
};

const formatCodigo = () => {
  // Elimina todo lo que no sea número y lo limita a 6 caracteres
  codigo.value = codigo.value.replace(/\D/g, "").slice(0, 6);
};

const verificarCodigo = async () => {
  if (codigo.value.length !== 6) {
    showAlert("Escribe el código completo de 6 dígitos.", "warning");
    return;
  }

  isLoading.value = true;
  isLoadingAction.value = 'verificar';
  alert.value.message = '';

  try {
    const response = await fetch(`${API_URL}/api/auth/verificar-codigo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correo_electronico: email.value,
        tipo_usuario: tipo.value,
        codigo: codigo.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo verificar el código.");
    }

    showAlert(data.mensaje, "success");

    setTimeout(() => {
      window.location.href = normalizeAppRedirect(
        data.redirect,
        resolveViewPath("public/login/index.html?verified=1")
      );
    }, 1200);
  } catch (error) {
    showAlert(error.message);
  } finally {
    isLoading.value = false;
    isLoadingAction.value = null;
  }
};

const reenviarCorreo = async () => {
  isLoading.value = true;
  isLoadingAction.value = 'reenviar';
  alert.value.message = '';

  try {
    const response = await fetch(`${API_URL}/api/auth/reenviar-verificacion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo_electronico: email.value })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo reenviar el código.");
    }

    showAlert(data.mensaje, "success");
    codigo.value = ""; // Limpiar input
  } catch (error) {
    showAlert(error.message);
  } finally {
    isLoading.value = false;
    isLoadingAction.value = null;
  }
};

const cambiarCorreo = async () => {
  const nuevo = nuevoCorreoInput.value.trim().toLowerCase();

  if (!nuevo) {
    showAlert("Escribe el nuevo correo electrónico.", "warning");
    return;
  }

  isLoading.value = true;
  isLoadingAction.value = 'cambiar';
  alert.value.message = '';

  try {
    const response = await fetch(`${API_URL}/api/auth/cambiar-email-pendiente`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correo_actual: email.value,
        nuevo_correo: nuevo,
        tipo_usuario: tipo.value
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo cambiar el correo.");
    }

    showAlert(data.mensaje, "success");
    const fallbackPath = buildPendingVerificationPath({ email: data.email, tipo: data.tipo });
    
    setTimeout(() => {
      window.location.href = normalizeAppRedirect(data.redirect, fallbackPath);
    }, 1200);
  } catch (error) {
    showAlert(error.message);
  } finally {
    isLoading.value = false;
    isLoadingAction.value = null;
  }
};

// --- Ciclo de Vida ---
onMounted(() => {
  // Leer parámetros de la URL
  const searchParams = new URLSearchParams(window.location.search);
  email.value = searchParams.get("email") || "";
  tipo.value = searchParams.get("tipo") || "";
  status.value = searchParams.get("status") || "";

  if (!email.value || !tipo.value) {
    showAlert("Faltan datos para continuar con la verificación. Vuelve a iniciar sesión.", "warning");
    setTimeout(() => {
      window.location.href = resolveViewPath("public/login/index.html");
    }, 1800);
  } else {
    // Si la URL indica que el código expiró
    if (status.value === "expired") {
      showAlert("El código anterior expiró. Puedes reenviar uno nuevo para continuar.", "warning");
    }
  }
});
</script>

<style scoped>
.bg-light-gradient {
  background: linear-gradient(180deg, #edf3ff 0%, #f7faff 100%);
  font-family: "Inter", sans-serif;
}

.text-dark-custom {
  color: #121826;
}

.text-primary-deep {
  color: #3f51b5 !important;
}

.navbar-custom, .footer-custom {
  background: #011671;
}

.brand-text {
  color: #fff;
  font-weight: 800;
  font-size: 1.8rem;
}

.brand-sub {
  color: #e2e4e8;
  font-size: 0.9rem;
  display: block;
}

.pending-card {
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(255,255,255,0.8);
  border-radius: 2rem;
  box-shadow: 0 24px 45px -18px rgba(1, 22, 113, 0.18);
}

.icon-container {
  width: 96px;
  height: 96px;
  background: #eef2ff;
  color: #3f51b5;
}

.action-card {
  border: 1px solid #e7edf9;
  border-radius: 1.5rem;
  background: #fff;
  padding: 1.2rem;
}

.code-input {
  letter-spacing: 0.3em;
  font-weight: 800;
  font-size: 1.35rem;
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
  color: white;
}

.btn-outline-primary-deep {
  color: #3f51b5;
  border: 1px solid #3f51b5;
  background-color: transparent;
  font-weight: 600;
  transition: all 0.2s ease;
}

.btn-outline-primary-deep:hover {
  background-color: #3f51b5;
  color: white;
}
</style>
