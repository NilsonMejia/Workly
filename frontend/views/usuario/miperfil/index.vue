<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-custom py-3">
            <div class="container-fluid px-4 px-lg-5">
                <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal">
                    <i class="bi bi-briefcase-fill brand-icon"></i>
                    <div class="lh-sm ms-2">
                        <span class="brand-text">Workly</span>
                        <span class="brand-sub">Tu busqueda de trabajo profesional</span>
                    </div>
                </a>
                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarContent">
                    <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
                        <a href="../buscarempleo" class="nav-link-custom"><i class="bi bi-search me-1"></i> Buscar empleo</a>
                        <a href="../recursos" class="nav-link-custom"><i class="bi bi-journal-bookmark-fill me-1"></i> Recursos</a>
                        <a href="../valoracionempresa" class="nav-link-custom"><i class="bi bi-star-fill me-1"></i> Valoraciones</a>
                        <a href="../miperfil" class="nav-link-custom active"><i class="bi bi-person-badge me-1"></i> Mi Perfil</a>
                    </div>
                    <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                        <a href="../notificaciones" class="text-white position-relative text-decoration-none">
                            <i class="bi bi-bell-fill fs-3"></i>
                            <span class="notification-badge">0</span>
                        </a>
                        <a href="../miperfil" class="text-white text-decoration-none">
                            <i class="bi bi-person-circle fs-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <main class="flex-grow-1 py-4">
            <div class="container px-4 px-lg-5">
                <div class="row g-4">
                    <div class="col-12 col-xl-4">
                        <div class="surface-card p-4 h-100">
                            <div class="text-center">
                                <img id="previewFoto" class="profile-avatar mb-3" alt="Foto de perfil" src="https://placehold.co/240x240/eef2ff/3f51b5?text=Perfil">
                                <h1 class="h4 fw-bold mb-1" id="cardNombre">Mi perfil</h1>
                                <p class="text-muted mb-3" id="cardTitulo">Actualiza tu información profesional</p>
                                <label for="foto_perfil_input" class="btn btn-outline-primary rounded-pill px-4">
                                    <i class="bi bi-camera me-2"></i>Cambiar foto
                                </label>
                                <input id="foto_perfil_input" type="file" accept="image/*" class="d-none">
                            </div>
                            <hr class="my-4">
                            <div class="d-grid gap-3">
                                <div>
                                    <div class="section-title mb-1">Correo</div>
                                    <div id="cardCorreo" class="text-muted">--</div>
                                </div>
                                <div>
                                    <div class="section-title mb-1">Teléfono</div>
                                    <div id="cardTelefono" class="text-muted">--</div>
                                </div>
                                <div>
                                    <div class="section-title mb-1">Ubicación</div>
                                    <div id="cardUbicacion" class="text-muted">--</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-xl-8">
                        <div class="surface-card p-4 p-lg-5">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h2 class="h3 fw-bold mb-1">Mi perfil profesional</h2>
                                    <p class="text-muted mb-0">Edita tus datos y mantén tu perfil listo para postular.</p>
                                </div>
                                <button class="btn btn-primary rounded-pill px-4" id="btnGuardarPerfil">
                                    <i class="bi bi-floppy me-2"></i>Guardar cambios
                                </button>
                            </div>

                            <div id="alertContainer" class="mb-3"></div>

                            <form id="formPerfil" class="row g-4" novalidate>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-semibold" for="nombres">Nombres</label>
                                    <input id="nombres" class="form-control form-control-lg rounded-4" required>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-semibold" for="apellidos">Apellidos</label>
                                    <input id="apellidos" class="form-control form-control-lg rounded-4" required>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-semibold" for="correo_electronico">Correo</label>
                                    <input id="correo_electronico" class="form-control form-control-lg rounded-4" type="email" disabled>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-semibold" for="telefono">Teléfono</label>
                                    <input id="telefono" class="form-control form-control-lg rounded-4" placeholder="Ej. 7777-8888" required>
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-semibold" for="titulo_profesional">Título profesional</label>
                                    <input id="titulo_profesional" class="form-control form-control-lg rounded-4" placeholder="Ej. Desarrollador Full Stack">
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-semibold" for="id_municipio_fk">Municipio</label>
                                    <select id="id_municipio_fk" class="form-select form-select-lg rounded-4" required></select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-semibold" for="direccion">Dirección</label>
                                    <input id="direccion" class="form-control form-control-lg rounded-4" placeholder="Dirección completa">
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-semibold" for="sitio_web">Sitio web / Portafolio</label>
                                    <input id="sitio_web" class="form-control form-control-lg rounded-4" placeholder="https://">
                                </div>
                                <div class="col-12 col-md-6">
                                    <label class="form-label fw-semibold" for="resumen_profesional">Resumen breve</label>
                                    <textarea id="resumen_profesional" class="form-control form-control-lg rounded-4" rows="1" placeholder="Resumen profesional"></textarea>
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-semibold" for="habilidades_input">Habilidades</label>
                                    <input id="habilidades_input" class="form-control form-control-lg rounded-4" placeholder="Separadas por coma. Ej. JavaScript, Node.js, SQL">
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-semibold" for="experiencia_input">Experiencia laboral</label>
                                    <textarea id="experiencia_input" class="form-control form-control-lg rounded-4" rows="5" placeholder="Una línea por experiencia. Ej. Desarrollador Frontend | TechSolutions | 2022-2024 | React y APIs"></textarea>
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-semibold" for="educacion_input">Educación</label>
                                    <textarea id="educacion_input" class="form-control form-control-lg rounded-4" rows="4" placeholder="Una línea por estudio. Ej. Ingeniería en Sistemas | UES | 2018-2023"></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="footer-custom py-4 mt-auto text-center text-white-50">
            <div class="container">
                <span>Workly 2026 · Tu perfil es tu mejor vitrina profesional</span>
            </div>
        </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import {
  API_URL,
  getToken,
  clearSession,
  resolveViewPath,
  buildPendingVerificationPath,
  normalizeAppRedirect
} from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["usuario"]);

  const btnGuardarPerfil = document.getElementById("btnGuardarPerfil");
  const alertContainer = document.getElementById("alertContainer");
  const selectMunicipio = document.getElementById("id_municipio_fk");
  const inputFoto = document.getElementById("foto_perfil_input");
  const previewFoto = document.getElementById("previewFoto");
  const cardRoot = document.querySelector(".surface-card.p-4.h-100");
  const panelRoot = document.querySelector(".surface-card.p-4.p-lg-5");

  let fotoPerfilBase64 = "";
  let municipiosCache = [];

  const LOGIN_PATH = resolveViewPath("public/login");
  const DEFAULT_PROFILE_IMAGE = "https://placehold.co/240x240/eef2ff/3f51b5?text=Perfil";

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`
  });

  const syncUsuarioStorage = (perfil) => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuario") || "{}");
    localStorage.setItem("usuario", JSON.stringify({
      ...usuarioActual,
      ...perfil,
      nombre: perfil.nombre_completo || usuarioActual.nombre,
      nombres: perfil.nombres,
      apellidos: perfil.apellidos,
      correo_electronico: perfil.correo_electronico || usuarioActual.correo_electronico
    }));
  };

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;

    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show rounded-4" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  };

  const splitLines = (value) =>
    String(value || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const parseExperiencias = (value) =>
    splitLines(value).map((linea) => {
      const [cargo, empresa, periodo, descripcion] = linea.split("|").map((item) => item?.trim() || "");
      return { cargo, empresa, periodo, descripcion };
    });

  const parseEducacion = (value) =>
    splitLines(value).map((linea) => {
      const [titulo, institucion, periodo] = linea.split("|").map((item) => item?.trim() || "");
      return { titulo, institucion, periodo };
    });

  const serializeExperiencias = (items = []) =>
    items.map((item) => [item.cargo, item.empresa, item.periodo, item.descripcion].filter(Boolean).join(" | ")).join("\n");

  const serializeEducacion = (items = []) =>
    items.map((item) => [item.titulo, item.institucion, item.periodo].filter(Boolean).join(" | ")).join("\n");

  const formatearSalario = (salario) => {
    if (salario === null || salario === undefined || salario === "") {
      return "A convenir";
    }

    return `$${Number(salario).toFixed(2)}`;
  };

  const normalizarImagen = (value) =>
    typeof value === "string" && /^data:image\/[a-zA-Z0-9.+-]+;base64,/.test(value)
      ? value
      : "";

  const redirigirPorAuth = (data = {}, status = 401) => {
    if (status === 403 && data?.code === "EMAIL_NO_VERIFICADO") {
      const fallback = buildPendingVerificationPath({
        email: data?.correo_electronico,
        tipo: data?.tipo
      });
      window.location.href = normalizeAppRedirect(data?.redirect, fallback);
      return;
    }

    clearSession();
    window.location.href = LOGIN_PATH;
  };

  const fetchJson = async (url, options = {}) => {
    const response = await fetch(url, options);
    let data = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (response.status === 401 || response.status === 403) {
      redirigirPorAuth(data, response.status);
      throw new Error(data?.mensaje || "Tu sesion ya no es valida.");
    }

    if (!response.ok) {
      throw new Error(data?.mensaje || "No se pudo completar la solicitud.");
    }

    return data;
  };

  const setCardData = (perfil) => {
    document.getElementById("cardNombre").textContent = perfil.nombre_completo || "Mi perfil";
    document.getElementById("cardTitulo").textContent = perfil.titulo_profesional || "Completa tu perfil profesional";
    document.getElementById("cardCorreo").textContent = perfil.correo_electronico || "--";
    document.getElementById("cardTelefono").textContent = perfil.telefono || "--";
    document.getElementById("cardUbicacion").textContent =
      [perfil.nombre_municipio, perfil.nombre_departamento].filter(Boolean).join(", ") || perfil.direccion || "--";
    previewFoto.src = normalizarImagen(perfil.foto_perfil) || DEFAULT_PROFILE_IMAGE;
  };

  const ensureExtrasLayout = () => {
    if (cardRoot && !document.getElementById("quickActionsPerfil")) {
      const hr = cardRoot.querySelector("hr");
      hr?.insertAdjacentHTML("afterend", `
        <div class="d-grid gap-3 mb-4" id="quickActionsPerfil">
          <a class="text-decoration-none text-dark border rounded-4 p-3" href="../notificaciones">
            <div class="d-flex align-items-center justify-content-between gap-3">
              <div>
                <div class="text-uppercase small fw-bold text-secondary">Acceso rapido</div>
                <div class="fw-semibold">Ver notificaciones</div>
              </div>
              <i class="bi bi-bell fs-4 text-primary"></i>
            </div>
          </a>
          <a class="text-decoration-none text-dark border rounded-4 p-3" href="../buscarempleo">
            <div class="d-flex align-items-center justify-content-between gap-3">
              <div>
                <div class="text-uppercase small fw-bold text-secondary">Acceso rapido</div>
                <div class="fw-semibold">Buscar nuevas vacantes</div>
              </div>
              <i class="bi bi-search fs-4 text-primary"></i>
            </div>
          </a>
        </div>
      `);
    }

    if (panelRoot && !document.getElementById("listaGuardadosPerfil")) {
      const form = document.getElementById("formPerfil");
      form?.insertAdjacentHTML("afterend", `
        <hr class="my-5">
        <div class="row g-4">
          <div class="col-12 col-lg-6">
            <div class="border rounded-4 p-4 h-100">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 class="h5 fw-bold mb-1">Empleos guardados</h3>
                  <p class="text-muted small mb-0">Vacantes que apartaste para revisar despues.</p>
                </div>
                <span class="badge text-bg-light rounded-pill" id="contadorGuardados">0</span>
              </div>
              <div class="d-grid gap-3" id="listaGuardadosPerfil"></div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div class="border rounded-4 p-4 h-100">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h3 class="h5 fw-bold mb-1">Mis postulaciones</h3>
                  <p class="text-muted small mb-0">Seguimiento rapido de tu actividad reciente.</p>
                </div>
                <span class="badge text-bg-light rounded-pill" id="contadorPostulaciones">0</span>
              </div>
              <div class="d-grid gap-3" id="listaPostulacionesPerfil"></div>
            </div>
          </div>
        </div>
      `);
    }
  };

  const renderGuardados = (items = []) => {
    const root = document.getElementById("listaGuardadosPerfil");
    const contador = document.getElementById("contadorGuardados");
    if (!root || !contador) return;

    contador.textContent = String(items.length);

    if (!items.length) {
      root.innerHTML = `<p class="text-muted mb-0">Todavia no has guardado vacantes.</p>`;
      return;
    }

    root.innerHTML = items.slice(0, 4).map((item) => `
      <a class="text-decoration-none text-dark border rounded-4 p-3" href="../detalleempleo?id=${item.id_vacante}">
        <div class="fw-semibold">${item.titulo_puesto}</div>
        <div class="small text-muted">${item.nombre_comercial || "Empresa"} · ${item.nombre_municipio || "El Salvador"}</div>
        <div class="small text-primary mt-1">${formatearSalario(item.salario_offrecido)}</div>
      </a>
    `).join("");
  };

  const renderPostulaciones = (items = []) => {
    const root = document.getElementById("listaPostulacionesPerfil");
    const contador = document.getElementById("contadorPostulaciones");
    if (!root || !contador) return;

    contador.textContent = String(items.length);

    if (!items.length) {
      root.innerHTML = `<p class="text-muted mb-0">Aun no tienes postulaciones registradas.</p>`;
      return;
    }

    root.innerHTML = items.slice(0, 4).map((item) => `
      <a class="text-decoration-none text-dark border rounded-4 p-3" href="../detalleempleo?id=${item.id_vacante}">
        <div class="fw-semibold">${item.titulo_puesto}</div>
        <div class="small text-muted">${item.nombre_comercial || "Empresa"}</div>
        <div class="small mt-1"><span class="badge text-bg-light">${item.nombre_estado || "En proceso"}</span></div>
      </a>
    `).join("");
  };

  const renderMunicipios = (municipios = [], selectedId = "") => {
    const selected = String(selectedId || "");
    const options = municipios.map((item) => `
      <option value="${item.id_municipio}">${item.nombre_municipio}${item.nombre_departamento ? ` - ${item.nombre_departamento}` : ""}</option>
    `).join("");

    selectMunicipio.innerHTML = `<option value="">Selecciona un municipio</option>${options}`;

    if (selected && municipios.some((item) => String(item.id_municipio) === selected)) {
      selectMunicipio.value = selected;
      return;
    }

    if (selected) {
      selectMunicipio.insertAdjacentHTML(
        "beforeend",
        `<option value="${selected}">Municipio actual no disponible en catalogo</option>`
      );
      selectMunicipio.value = selected;
    }
  };

  const cargarMunicipios = async () => {
    const data = await fetchJson(`${API_URL}/catalogos/municipios-agrupados`);
    municipiosCache = Array.isArray(data) ? data : [];
    renderMunicipios(municipiosCache);
  };

  const aplicarPerfilAlFormulario = (data) => {
    document.getElementById("nombres").value = data.nombres || "";
    document.getElementById("apellidos").value = data.apellidos || "";
    document.getElementById("correo_electronico").value = data.correo_electronico || "";
    document.getElementById("telefono").value = data.telefono || "";
    document.getElementById("titulo_profesional").value = data.titulo_profesional || "";
    document.getElementById("direccion").value = data.direccion || "";
    document.getElementById("sitio_web").value = data.sitio_web || "";
    document.getElementById("resumen_profesional").value = data.resumen_profesional || "";
    document.getElementById("habilidades_input").value = (data.habilidades || []).join(", ");
    document.getElementById("experiencia_input").value = serializeExperiencias(data.experiencia || []);
    document.getElementById("educacion_input").value = serializeEducacion(data.educacion || []);

    fotoPerfilBase64 = normalizarImagen(data.foto_perfil);
    renderMunicipios(municipiosCache, data.id_municipio_fk || "");
    setCardData(data);
  };

  const cargarPerfil = async () => {
    const data = await fetchJson(`${API_URL}/api/usuarios/perfil`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });

    aplicarPerfilAlFormulario(data);
  };

  const cargarActividadPerfil = async () => {
    const headers = { Authorization: `Bearer ${getToken()}` };
    const [guardadosData, postulacionesData] = await Promise.allSettled([
      fetchJson(`${API_URL}/guardados`, { headers }),
      fetchJson(`${API_URL}/usuario/postulaciones`, { headers })
    ]);

    renderGuardados(guardadosData.status === "fulfilled" && Array.isArray(guardadosData.value) ? guardadosData.value : []);
    renderPostulaciones(postulacionesData.status === "fulfilled" && Array.isArray(postulacionesData.value) ? postulacionesData.value : []);
  };

  const validarUrl = (value) => {
    if (!value) {
      return true;
    }

    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol);
    } catch {
      return false;
    }
  };

  const validarFormulario = () => {
    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const municipio = document.getElementById("id_municipio_fk").value;
    const sitioWeb = document.getElementById("sitio_web").value.trim();

    if (!nombres || !apellidos) {
      throw new Error("Los nombres y apellidos son obligatorios.");
    }

    if (!/^[0-9+\-\s]{8,20}$/.test(telefono)) {
      throw new Error("Ingresa un numero de telefono valido.");
    }

    if (!municipio || Number.isNaN(Number(municipio))) {
      throw new Error("Selecciona un municipio valido.");
    }

    if (!validarUrl(sitioWeb)) {
      throw new Error("Ingresa un sitio web valido que comience con http:// o https://.");
    }
  };

  const guardarPerfil = async () => {
    validarFormulario();

    const body = {
      nombres: document.getElementById("nombres").value.trim(),
      apellidos: document.getElementById("apellidos").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      id_municipio_fk: Number(document.getElementById("id_municipio_fk").value),
      direccion: document.getElementById("direccion").value.trim(),
      titulo_profesional: document.getElementById("titulo_profesional").value.trim(),
      sitio_web: document.getElementById("sitio_web").value.trim(),
      resumen_profesional: document.getElementById("resumen_profesional").value.trim(),
      foto_perfil: fotoPerfilBase64 || null,
      habilidades: document.getElementById("habilidades_input").value.split(",").map((item) => item.trim()).filter(Boolean),
      experiencia: parseExperiencias(document.getElementById("experiencia_input").value),
      educacion: parseEducacion(document.getElementById("educacion_input").value)
    };

    btnGuardarPerfil.disabled = true;
    btnGuardarPerfil.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span>Guardando...`;

    try {
      const data = await fetchJson(`${API_URL}/api/usuarios/perfil`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify(body)
      });

      aplicarPerfilAlFormulario(data.data);
      syncUsuarioStorage(data.data);
      showAlert(data.mensaje, "success");
    } finally {
      btnGuardarPerfil.disabled = false;
      btnGuardarPerfil.innerHTML = `<i class="bi bi-floppy me-2"></i>Guardar cambios`;
    }
  };

  inputFoto?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showAlert("Selecciona una imagen valida.");
      inputFoto.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      showAlert("La imagen debe pesar menos de 3MB.");
      inputFoto.value = "";
      return;
    }

    try {
      fotoPerfilBase64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
        reader.readAsDataURL(file);
      });

      previewFoto.src = fotoPerfilBase64;
    } catch (error) {
      showAlert(error.message || "No se pudo procesar la imagen.");
      inputFoto.value = "";
    }
  });

  btnGuardarPerfil?.addEventListener("click", async () => {
    try {
      await guardarPerfil();
    } catch (error) {
      console.error(error);
      showAlert(error.message || "No se pudo guardar el perfil");
    }
  });

  const init = async () => {
    ensureExtrasLayout();
    await cargarMunicipios();
    await cargarPerfil();
    await cargarActividadPerfil();
  };

  init().catch((error) => {
    console.error(error);
    showAlert(error.message || "No se pudo cargar el perfil");
  });
});
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");

:root {
            --primary-deep: #3f51b5;
            --nav-bg: #011671;
            --body-bg: #f5f7fc;
        }

        body {
            font-family: "Inter", sans-serif;
            background: linear-gradient(180deg, #eef4ff 0%, #f8faff 100%);
        }

        .navbar-custom,
        .footer-custom {
            background-color: var(--nav-bg);
        }

        .nav-link-custom {
            color: white !important;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 30px;
            transition: background 0.2s;
        }

        .nav-link-custom:hover,
        .nav-link-custom.active {
            background: rgba(255, 255, 255, 0.12);
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
            color: #e2e4e8;
            font-size: 0.95rem;
        }

        .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: #ff4757;
            color: white;
            border-radius: 50%;
            padding: 0.2rem 0.4rem;
            font-size: 0.65rem;
            font-weight: bold;
            border: 2px solid white;
        }

        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        .surface-card {
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 28px;
            box-shadow: 0 20px 35px -12px rgba(1, 22, 113, 0.08);
        }

        .profile-avatar {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 28px;
            border: 4px solid #eef2ff;
        }

        .section-title {
            font-size: 0.95rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #5b6475;
        }

.habilidad-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 10px 12px;
  margin-bottom: 10px;
  background: #fff;
}
</style>
