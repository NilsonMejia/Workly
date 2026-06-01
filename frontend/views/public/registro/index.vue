<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- ========== NAVBAR MEJORADO (mismo estilo que homepage/login) ========== -->
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
            <a class="navbar-brand d-flex align-items-center text-decoration-none" href="index.vue">
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
                    <a href="../login/index.vue" class="btn btn-outline-light px-4 py-2 fw-semibold" style="border-color: rgba(255,255,255,0.5); color: white;">
                        <i class="bi bi-box-arrow-in-right me-1"></i> Iniciar sesión
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- ========== MAIN: REGISTRO ========== -->
    <main class="flex-grow-1 d-flex align-items-center justify-content-center py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-lg-10 col-xl-9">
                    <!-- Tarjeta con glassmorphism -->
                    <div class="register-card p-4 p-md-5">

                        <div class="text-center mb-4">
                            <div class="d-inline-flex bg-white p-3 rounded-4 shadow-sm mb-3">
                                <i class="bi bi-person-plus-fill fs-1" style="color: var(--primary-deep);"></i>
                            </div>
                            <h1 class="display-6 fw-bold" style="color: #121826;">Crear cuenta</h1>
                            <p class="text-secondary">Únete a Workly y descubre miles de oportunidades</p>

                            <!-- Pestañas (IDs y estructura conservada) -->
                            <ul class="nav nav-pills justify-content-center bg-light p-1 rounded-pill d-inline-flex mx-auto mt-3" id="registroTabs" style="background: #f2f4f8 !important;">
                                <li class="nav-item">
                                    <button class="nav-link active rounded-pill px-4 py-2 fw-semibold" id="tabUsuario" type="button">
                                        <i class="bi bi-person me-1"></i> Usuario
                                    </button>
                                </li>
                                <li class="nav-item">
                                    <button class="nav-link rounded-pill px-4 py-2 fw-semibold" id="tabEmpresa" type="button">
                                        <i class="bi bi-building me-1"></i> Empresa
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <!-- Contenedor de alertas (id original) -->
                        <div id="alertContainer"></div>

                        <!-- FORMULARIO (id formRegistro conservado) -->
                        <form id="formRegistro">

                            <!-- CAMPOS USUARIO (id 'camposUsuario' conservado) -->
                            <div id="camposUsuario">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-person"></i> Nombres</div>
                                        <input type="text" id="nombreUsuario" class="form-control-custom w-100" placeholder="ej. Juan Carlos">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-person"></i> Apellidos</div>
                                        <input type="text" id="apellidosUsuario" class="form-control-custom w-100" placeholder="ej. Pérez López">
                                    </div>
                                </div>
                                <div class="row g-3 mt-2">
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-envelope"></i> Correo Electrónico</div>
                                        <input type="email" id="emailUsuario" class="form-control-custom w-100" placeholder="tu@email.com">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-telephone"></i> Teléfono</div>
                                        <input type="text" id="telefonoUsuario" class="form-control-custom w-100" placeholder="+503 1234 5678">
                                    </div>
                                </div>
                                <div class="row g-3 mt-2">
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-lock"></i> Contraseña</div>
                                        <input type="password" id="passUsuario" class="form-control-custom w-100" placeholder="••••••••">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-lock-fill"></i> Confirmar Contraseña</div>
                                        <input type="password" id="passConfUsuario" class="form-control-custom w-100" placeholder="••••••••">
                                    </div>
                                </div>
                                <div class="row g-3 mt-2">
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-geo-alt"></i> Municipio</div>
                                        <select id="municipioUsuario" class="form-select-custom w-100">
                                            <option value="" disabled selected>Selecciona tu municipio</option>
                                            <!-- Opciones se llenan vía JS -->
                                        </select>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <div class="input-label"><i class="bi bi-file-text"></i> Resumen Profesional</div>
                                    <textarea id="resumenProfesional" class="form-control-custom w-100" rows="3" placeholder="Cuéntanos sobre tu experiencia..."></textarea>
                                </div>
                            </div>

                            <!-- CAMPOS EMPRESA (id 'camposEmpresa' conservado, inicialmente d-none) -->
                            <div id="camposEmpresa" class="d-none">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-shop"></i> Nombre Comercial</div>
                                        <input type="text" id="nombreComercial" class="form-control-custom w-100" placeholder="ej. TechNova S.A.">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-building"></i> Razón Social</div>
                                        <input type="text" id="razonSocial" class="form-control-custom w-100" placeholder="Razón social legal">
                                    </div>
                                </div>
                                <div class="row g-3 mt-2">
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-envelope"></i> Correo Corporativo</div>
                                        <input type="email" id="emailEmpresa" class="form-control-custom w-100" placeholder="contacto@empresa.com">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-telephone"></i> Teléfono Empresa</div>
                                        <input type="text" id="telefonoEmpresa" class="form-control-custom w-100" placeholder="+503 2222 3333">
                                    </div>
                                </div>
                                <div class="row g-3 mt-2">
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-lock"></i> Contraseña</div>
                                        <input type="password" id="passEmpresa" class="form-control-custom w-100" placeholder="••••••••">
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-lock-fill"></i> Confirmar Contraseña</div>
                                        <input type="password" id="passConfEmpresa" class="form-control-custom w-100" placeholder="••••••••">
                                    </div>
                                </div>
                                <div class="row g-3 mt-2">
                                    <div class="col-md-6">
                                        <div class="input-label"><i class="bi bi-geo-alt"></i> Municipio</div>
                                        <select id="municipioEmpresa" class="form-select-custom w-100">
                                            <option value="" disabled selected>Selecciona municipio</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <div class="input-label"><i class="bi bi-info-circle"></i> Descripción de la Empresa</div>
                                    <textarea id="descEmpresa" class="form-control-custom w-100" rows="3" placeholder="Describe tu empresa, sector, etc."></textarea>
                                </div>
                            </div>

                            <!-- Botón de envío -->
                            <button type="submit" class="btn btn-primary-deep w-100 py-3 rounded-pill shadow-sm mt-4 fw-bold fs-5">
                                <i class="bi bi-check2-circle me-2"></i> REGISTRARSE
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
                            <a href="../login/index.vue" class="fw-bold text-decoration-none" style="color: var(--primary-deep);">
                                Inicia sesión <i class="bi bi-arrow-right"></i>
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- ========== FOOTER (mismo color #011671) ========== -->
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

    <!-- Bootstrap JS -->


    <!-- SCRIPT DE CAMBIO DE PESTAÑAS (compatible con IDs originales) -->


    <!-- Nota: El archivo app.js se carga después y debe manejar la lógica de envío -->


    <!-- Estilo adicional para navbar toggler -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, buildPendingVerificationPath, normalizeAppRedirect } from "../../../assets/js/shared/config.js";

onMounted(async () => {
  const tabUsuario = document.getElementById("tabUsuario");
  const tabEmpresa = document.getElementById("tabEmpresa");
  const camposUsuario = document.getElementById("camposUsuario");
  const camposEmpresa = document.getElementById("camposEmpresa");
  const formRegistro = document.getElementById("formRegistro");
  const alertContainer = document.getElementById("alertContainer");

  let tipoRegistro = "usuario";

  const showAlert = (message, type = "danger") => {
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  };

  const activarTab = (tipo) => {
    tipoRegistro = tipo;
    camposUsuario.classList.toggle("d-none", tipo !== "usuario");
    camposEmpresa.classList.toggle("d-none", tipo !== "empresa");
    tabUsuario.classList.toggle("active", tipo === "usuario");
    tabEmpresa.classList.toggle("active", tipo === "empresa");
  };

  tabUsuario?.addEventListener("click", () => activarTab("usuario"));
  tabEmpresa?.addEventListener("click", () => activarTab("empresa"));

  const cargarMunicipios = async () => {
    try {
      const response = await fetch(`${API_URL}/catalogos/municipios-agrupados`);
      const data = await response.json();

      let optionsHtml = `<option value="">Selecciona un municipio</option>`;
      let departamentoActual = "";

      data.forEach((item) => {
        if (item.nombre_departamento !== departamentoActual) {
          if (departamentoActual) {
            optionsHtml += "</optgroup>";
          }
          optionsHtml += `<optgroup label="${item.nombre_departamento}">`;
          departamentoActual = item.nombre_departamento;
        }

        optionsHtml += `<option value="${item.id_municipio}">${item.nombre_municipio}</option>`;
      });

      if (departamentoActual) {
        optionsHtml += "</optgroup>";
      }

      document.getElementById("municipioUsuario").innerHTML = optionsHtml;
      document.getElementById("municipioEmpresa").innerHTML = optionsHtml;
    } catch (error) {
      console.error(error);
      showAlert("No se pudo conectar con el servidor para cargar municipios.");
    }
  };

  const obtenerPayload = () => {
    if (tipoRegistro === "usuario") {
      const pass = document.getElementById("passUsuario").value;
      const conf = document.getElementById("passConfUsuario").value;

      if (pass !== conf) {
        throw new Error("Las contraseñas de usuario no coinciden.");
      }

      return {
        url: `${API_URL}/api/auth/register-user`,
        tipo: "usuario",
        email: document.getElementById("emailUsuario").value.trim().toLowerCase(),
        body: {
          nombres: document.getElementById("nombreUsuario").value.trim(),
          apellidos: document.getElementById("apellidosUsuario").value.trim(),
          correo_electronico: document.getElementById("emailUsuario").value.trim().toLowerCase(),
          telefono: document.getElementById("telefonoUsuario").value.trim(),
          contrasena: pass,
          id_municipio_fk: Number(document.getElementById("municipioUsuario").value),
          resumen_profesional: document.getElementById("resumenProfesional").value.trim()
        }
      };
    }

    const pass = document.getElementById("passEmpresa").value;
    const conf = document.getElementById("passConfEmpresa").value;

    if (pass !== conf) {
      throw new Error("Las contraseñas de empresa no coinciden.");
    }

    return {
      url: `${API_URL}/api/auth/register-company`,
      tipo: "empresa",
      email: document.getElementById("emailEmpresa").value.trim().toLowerCase(),
      body: {
        nombre_comercial: document.getElementById("nombreComercial").value.trim(),
        razon_social: document.getElementById("razonSocial").value.trim(),
        correo_electronico: document.getElementById("emailEmpresa").value.trim().toLowerCase(),
        telefono: document.getElementById("telefonoEmpresa").value.trim(),
        contrasena: pass,
        id_municipio_fk: Number(document.getElementById("municipioEmpresa").value),
        descripcion_empresa: document.getElementById("descEmpresa").value.trim()
      }
    };
  };

  formRegistro?.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const payload = obtenerPayload();

      const response = await fetch(payload.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload.body)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "No se pudo completar el registro.");
      }

      const mensaje = data.advertencia
        ? `${data.mensaje}<br><small>${data.advertencia}</small>`
        : data.mensaje;

      showAlert(mensaje, data.advertencia ? "warning" : "success");

      const fallbackPath = buildPendingVerificationPath({
        email: data.email || payload.email,
        tipo: data.tipo || payload.tipo
      });
      const redirectPath = normalizeAppRedirect(data.redirect, fallbackPath);

      setTimeout(() => {
        window.location.href = redirectPath;
      }, 1800);
    } catch (error) {
      showAlert(error.message);
    }
  });

  cargarMunicipios();
});
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

@import url("https://fonts.googleapis.com/css2?family=Inter:opsz@14..32&display=swap");

* { font-family: 'Inter', sans-serif; }
        :root {
            --primary-deep: #3f51b5;
            --nav-bg: #011671;
            --soft-accent: #f1ebd9;
            --light-text: #e2e4e8;
        }
        body {
            background: linear-gradient(145deg, #f4f7fc 0%, #eef1f9 100%);
        }
        /* Navbar personalizado */
        .navbar-custom {
            background-color: var(--nav-bg) !important;
            box-shadow: 0 6px 12px rgba(0,0,0,0.05);
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
            color: var(--light-text);
            font-size: 0.95rem;
        }
        .btn-primary-deep {
            background-color: var(--primary-deep);
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
        /* tarjeta de registro */
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
        /* Pestañas personalizadas */
        .nav-pills .nav-link {
            color: #1e1f22 !important;
            background-color: transparent;
            border-radius: 40px !important;
            padding: 0.6rem 1.8rem;
            font-weight: 600;
            transition: all 0.2s;
        }
        .nav-pills .nav-link.active {
            background-color: var(--primary-deep) !important;
            color: white !important;
            box-shadow: 0 6px 12px rgba(63, 81, 181, 0.2);
        }
        .nav-pills .nav-link:not(.active):hover {
            background-color: rgba(63, 81, 181, 0.08);
        }
        /* Estilos de formulario */
        .form-control-custom, .form-select-custom {
            border: 1.5px solid #e0e4eb;
            border-radius: 16px;
            padding: 0.75rem 1.2rem;
            font-size: 1rem;
            background-color: white;
            transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-control-custom:focus, .form-select-custom:focus {
            border-color: var(--primary-deep);
            box-shadow: 0 0 0 4px rgba(63, 81, 181, 0.1);
            outline: none;
        }
        .input-label {
            font-weight: 600;
            color: #1e1f22;
            margin-bottom: 0.4rem;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .footer-custom {
            background-color: var(--nav-bg);
            color: var(--light-text);
        }
        .footer-custom a {
            color: var(--light-text) !important;
            text-decoration: none;
        }
        .footer-custom a:hover {
            color: white !important;
            text-decoration: underline;
        }
        /* separador visual */
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

.navbar-toggler-icon {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.9)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
    }
    /* Ajuste para selects */
    .form-select-custom {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%233f51b5' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 1.2rem center;
        background-size: 16px 12px;
        appearance: none;
    }
    .btn-outline-light:hover {
        background-color: rgba(255,255,255,0.15) !important;
    }

.registro-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f4f8ff 0%, #f8f9fa 100%);
}
</style>
