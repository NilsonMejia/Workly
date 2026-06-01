<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
            <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../paginainicial/index.vue">
                <i class="bi bi-briefcase-fill brand-icon"></i>
                <div class="lh-sm ms-2">
                    <span class="brand-text">Workly</span>
                    <span class="brand-sub">Tu búsqueda de trabajo profesional</span>
                </div>
            </a>
            <div class="d-flex gap-3 mt-3 mt-lg-0 align-items-center">
                <a href="../registro/index.vue" class="btn btn-light fw-semibold px-4">Registrarse</a>
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
                                <i class="bi bi-box-arrow-in-right fs-1" style="color: var(--primary-deep);"></i>
                            </div>
                            <h1 class="display-6 fw-bold mb-2" style="color: #121826;">Bienvenido de vuelta</h1>
                            <p class="text-secondary mb-0">Ingresa a tu cuenta y continúa con tu proceso.</p>
                        </div>

                        <div id="alertContainer" class="mb-3"></div>

                        <form id="formLogin">
                            <div class="mb-3">
                                <label class="form-label fw-semibold" for="correo">Correo electrónico</label>
                                <input type="email" id="correo" class="form-control form-control-custom" placeholder="tu@email.com" required>
                            </div>

                            <div class="mb-3">
                                <label class="form-label fw-semibold" for="password">Contraseña</label>
                                <input type="password" id="password" class="form-control form-control-custom" placeholder="••••••••" required>
                            </div>

                            <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="recordarme" checked>
                                    <label class="form-check-label" for="recordarme">Recordarme</label>
                                </div>
                                <a href="#" class="text-decoration-none fw-medium" style="color: var(--primary-deep);">¿Olvidaste tu contraseña?</a>
                            </div>

                            <div class="d-grid gap-3">
                                <button type="submit" class="btn btn-primary-deep py-3 rounded-pill fs-5">
                                    <i class="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión
                                </button>
                                <button type="button" class="btn btn-link text-decoration-none fw-semibold" id="btnReenviarVerificacion" style="color: var(--primary-deep);">
                                    ¿No recibiste el enlace? Reenviar verificación
                                </button>
                            </div>
                        </form>

                        <div class="text-center mt-4">
                            <span class="text-secondary">¿Aún no tienes cuenta?</span>
                            <a href="../registro/index.vue" class="fw-bold text-decoration-none ms-1" style="color: var(--primary-deep);" id="linkRegistro">
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
import { onMounted } from "vue";
import { API_URL, saveSession, clearSession, buildPendingVerificationPath, normalizeAppRedirect } from "../../../assets/js/shared/config.js";

onMounted(async () => {
  const formLogin = document.getElementById("formLogin");
  const alertContainer = document.getElementById("alertContainer");
  const btnReenviarVerificacion = document.getElementById("btnReenviarVerificacion");
  const enlaceRegistro = document.getElementById("linkRegistro");

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;

    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  };

  const obtenerCorreoInput = () => document.getElementById("correo")?.value.trim().toLowerCase();

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

  const reenviarVerificacion = async (correoManual = "") => {
    const correo = (correoManual || obtenerCorreoInput() || "").trim().toLowerCase();

    if (!correo) {
      showAlert("Escribe tu correo para reenviar la verificación.", "warning");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/reenviar-verificacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_electronico: correo })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "No se pudo reenviar la verificación.");
      }

      showAlert(data.mensaje, "success");

      const fallbackPath = buildPendingVerificationPath({ email: correo });
      setTimeout(() => {
        window.location.href = normalizeAppRedirect(data.redirect, fallbackPath);
      }, 1200);
    } catch (error) {
      showAlert(error.message);
    }
  };

  formLogin?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const correoInput = document.getElementById("correo");
    const passwordInput = document.getElementById("password");

    if (!correoInput || !passwordInput) return;

    const correo_electronico = correoInput.value.trim().toLowerCase();
    const contrasena = passwordInput.value.trim();

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo_electronico,
          contrasena
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403 && data.code === "EMAIL_NO_VERIFICADO") {
          showAlert(`${data.mensaje}. Redirigiéndote a la pantalla de verificación...`, "warning");

          const fallbackPath = buildPendingVerificationPath({
            email: data.correo_electronico || correo_electronico,
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

      const destinos = {
        usuario: "../../usuario/principal/index.vue",
        empresa: "../../empresa/principal/index.vue",
        admin: "../../admin/principal/index.vue"
      };

      window.location.href = destinos[data.tipo] || "../../public/paginainicial/index.vue";
    } catch (error) {
      showAlert(error.message);
    }
  });

  btnReenviarVerificacion?.addEventListener("click", async (event) => {
    event.preventDefault();
    await reenviarVerificacion();
  });

  enlaceRegistro?.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipo");
    localStorage.removeItem("usuario");
  });

  manejarMensajesUrl();
});
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

* { font-family: "Inter", sans-serif; }
        :root {
            --primary-deep: #3f51b5;
            --nav-bg: #011671;
            --light-text: #e2e4e8;
        }
        body { background: linear-gradient(145deg, #f4f7fc 0%, #eef1f9 100%); }
        .navbar-custom, .footer-custom { background-color: var(--nav-bg); }
        .brand-icon { font-size: 3rem; color: white; }
        .brand-text { color: white; font-weight: 800; font-size: 1.9rem; display: block; }
        .brand-sub { color: var(--light-text); font-size: 0.92rem; }
        .login-card {
            background: rgba(255,255,255,0.92);
            border: 1px solid rgba(255,255,255,0.8);
            border-radius: 2rem;
            box-shadow: 0 30px 40px -15px rgba(1, 22, 113, 0.15);
        }
        .btn-primary-deep {
            background-color: var(--primary-deep);
            border: none;
            color: white;
            font-weight: 700;
        }
        .btn-primary-deep:hover { background-color: #2c3e8f; color: white; }
        .form-control-custom {
            border: 1px solid #d9dfeb;
            border-radius: 16px;
            padding: 0.95rem 1rem;
        }
        .form-control-custom:focus {
            border-color: var(--primary-deep);
            box-shadow: 0 0 0 4px rgba(63, 81, 181, 0.1);
        }
        .footer-custom { color: var(--light-text); }
        .footer-custom a { color: var(--light-text); text-decoration: none; }

.login-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #e9f2ff 0%, #f8f9fa 100%);
}
</style>
