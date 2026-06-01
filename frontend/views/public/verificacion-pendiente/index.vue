<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
            <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../paginainicial">
                <i class="bi bi-briefcase-fill text-white fs-2"></i>
                <div class="lh-sm ms-2">
                    <span class="brand-text">Workly</span>
                    <span class="brand-sub">Tu busqueda de trabajo profesional</span>
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
                            <div class="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style="width:96px;height:96px;background:#eef2ff;color:#3f51b5;">
                                <i class="bi bi-envelope-check fs-1"></i>
                            </div>
                            <h1 class="display-6 fw-bold mb-2">Verifica tu email</h1>
                            <p class="text-secondary mb-0">Te hemos enviado un codigo de verificacion a tu correo.</p>
                            <p class="fw-semibold mt-2 mb-0" id="correoDestino">--</p>
                        </div>

                        <div id="alertContainer" class="mb-4"></div>

                        <div class="action-card mb-4">
                            <h2 class="h5 fw-bold mb-2">Ingresa tu codigo</h2>
                            <p class="text-secondary mb-3">Escribe el codigo de 6 digitos que recibiste para activar tu cuenta.</p>
                            <div class="mb-3">
                                <label class="form-label fw-semibold" for="codigoVerificacion">Codigo de verificacion</label>
                                <input type="text" id="codigoVerificacion" class="form-control form-control-lg rounded-4 text-center code-input" inputmode="numeric" maxlength="6" placeholder="123456">
                            </div>
                            <button class="btn btn-success btn-lg rounded-pill px-4" id="btnVerificarCodigo">Verificar codigo</button>
                        </div>

                        <div class="action-card mb-4">
                            <h2 class="h5 fw-bold mb-2">Reenviar codigo de verificacion</h2>
                            <p class="text-secondary mb-3">Si no recibiste el mensaje, podemos enviarte uno nuevo.</p>
                            <button class="btn btn-primary btn-lg rounded-pill px-4" id="btnReenviarCorreo">Reenviar codigo</button>
                        </div>

                        <div class="action-card">
                            <h2 class="h5 fw-bold mb-2">Cambiar correo electronico</h2>
                            <p class="text-secondary mb-3">Si escribiste mal tu correo, actualizalo y te enviaremos un nuevo codigo.</p>
                            <div class="mb-3">
                                <label class="form-label fw-semibold" for="nuevoCorreo">Nuevo correo</label>
                                <input type="email" id="nuevoCorreo" class="form-control form-control-lg rounded-4" placeholder="nuevo@email.com">
                            </div>
                            <button class="btn btn-outline-primary btn-lg rounded-pill px-4" id="btnCambiarCorreo">Cambiar correo</button>
                        </div>

                        <div class="text-center mt-4">
                            <a href="../login" class="text-decoration-none fw-semibold">Volver a iniciar sesion</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer-custom py-4 mt-auto text-center text-white-50">
        <div class="container">Workly 2026 | Revisa tambien spam o promociones</div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, buildPendingVerificationPath, normalizeAppRedirect, resolveViewPath } from "../../../assets/js/shared/config.js";

onMounted(async () => {
  const alertContainer = document.getElementById("alertContainer");
  const correoDestino = document.getElementById("correoDestino");
  const codigoVerificacion = document.getElementById("codigoVerificacion");
  const btnVerificarCodigo = document.getElementById("btnVerificarCodigo");
  const btnReenviarCorreo = document.getElementById("btnReenviarCorreo");
  const btnCambiarCorreo = document.getElementById("btnCambiarCorreo");
  const nuevoCorreo = document.getElementById("nuevoCorreo");

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email") || "";
  const tipo = params.get("tipo") || "";
  const status = params.get("status") || "";

  const showAlert = (message, type = "danger") => {
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  };

  const actualizarVista = () => {
    correoDestino.textContent = email || "Sin correo disponible";

    if (status === "expired") {
      showAlert("El codigo anterior expiro. Puedes reenviar uno nuevo para continuar.", "warning");
    }
  };

  const verificarCodigo = async () => {
    const codigo = String(codigoVerificacion?.value || "").replace(/\D/g, "").slice(0, 6);

    if (codigo.length !== 6) {
      showAlert("Escribe el codigo completo de 6 digitos.", "warning");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/verificar-codigo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo_electronico: email,
          tipo_usuario: tipo,
          codigo
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "No se pudo verificar el codigo.");
      }

      showAlert(data.mensaje, "success");

      setTimeout(() => {
        window.location.href = normalizeAppRedirect(
          data.redirect,
          resolveViewPath("public/login?verified=1")
        );
      }, 1200);
    } catch (error) {
      showAlert(error.message);
    }
  };

  const reenviarCorreo = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/reenviar-verificacion`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_electronico: email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "No se pudo reenviar el codigo.");
      }

      showAlert(data.mensaje, "success");
      if (codigoVerificacion) {
        codigoVerificacion.value = "";
      }
    } catch (error) {
      showAlert(error.message);
    }
  };

  const cambiarCorreo = async () => {
    const nuevo = nuevoCorreo.value.trim().toLowerCase();

    if (!nuevo) {
      showAlert("Escribe el nuevo correo electronico.", "warning");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/cambiar-email-pendiente`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo_actual: email,
          nuevo_correo: nuevo,
          tipo_usuario: tipo
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
    }
  };

  btnReenviarCorreo?.addEventListener("click", reenviarCorreo);
  btnCambiarCorreo?.addEventListener("click", cambiarCorreo);
  btnVerificarCodigo?.addEventListener("click", verificarCodigo);
  codigoVerificacion?.addEventListener("input", () => {
    codigoVerificacion.value = String(codigoVerificacion.value || "").replace(/\D/g, "").slice(0, 6);
  });

  if (!email || !tipo) {
    showAlert("Faltan datos para continuar con la verificacion. Vuelve a iniciar sesion.", "warning");
    setTimeout(() => {
      window.location.href = resolveViewPath("public/login");
    }, 1800);
  } else {
    actualizarVista();
  }
});
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

* { font-family: "Inter", sans-serif; }
        :root {
            --nav-bg: #011671;
            --primary-deep: #3f51b5;
            --light-text: #e2e4e8;
        }
        body {
            background: linear-gradient(180deg, #edf3ff 0%, #f7faff 100%);
        }
        .navbar-custom, .footer-custom { background: var(--nav-bg); }
        .brand-text { color: #fff; font-weight: 800; font-size: 1.8rem; }
        .brand-sub { color: var(--light-text); font-size: 0.9rem; display:block; }
        .pending-card {
            background: rgba(255,255,255,0.95);
            border: 1px solid rgba(255,255,255,0.8);
            border-radius: 2rem;
            box-shadow: 0 24px 45px -18px rgba(1, 22, 113, 0.18);
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
</style>
