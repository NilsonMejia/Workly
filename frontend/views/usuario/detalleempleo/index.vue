<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- ========== NAVBAR MEJORADO ========== -->
        <nav class="navbar navbar-expand-lg py-3 navbar-custom">
            <div class="container-fluid px-4 px-lg-5">
                <a class="navbar-brand d-flex align-items-center text-decoration-none"
                    href="../../public/paginainicial">
                    <i class="bi bi-briefcase-fill brand-icon"></i>
                    <div class="lh-sm ms-2">
                        <span class="brand-text">Workly</span>
                        <span class="brand-sub">Tu búsqueda de trabajo profesional</span>
                    </div>
                </a>

                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarContent">
                    <div class="navbar-nav mx-auto mt-3 mt-lg-0 gap-2">
                        <a href="../buscarempleo" class="nav-link-custom text-decoration-none px-3 py-2">
                            <i class="bi bi-search me-1"></i> Búsqueda
                        </a>
                        <a href="../recursos" class="nav-link-custom text-decoration-none px-3 py-2">
                            <i class="bi bi-journal-bookmark-fill me-1"></i> Recursos
                        </a>
                        <a href="../valoracionempresa" class="nav-link-custom text-decoration-none px-3 py-2">
                            <i class="bi bi-star-fill me-1"></i> Valoraciones
                        </a>
                        <a href="../miperfil" class="nav-link-custom text-decoration-none px-3 py-2">
                            <i class="bi bi-person-badge me-1"></i> Mi Perfil
                        </a>
                    </div>

                    <div class="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
                        <a href="../notificaciones" class="text-white position-relative d-inline-block">
                            <i class="bi bi-bell-fill fs-3"></i>
                            <span class="notification-badge">5</span>
                        </a>
                        <a href="../miperfil" class="text-white d-inline-block">
                            <i class="bi bi-person-circle fs-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- ========== MAIN ========== -->
        <main class="flex-grow-1 py-4">
            <div class="container-fluid px-4 px-lg-5">

                <div id="alertContainer"></div>

                <!-- Tarjeta principal con detalles -->
                <div class="detail-card mb-5">

                    <!-- Encabezado: título, empresa, ubicación, salario y acciones -->
                    <div
                        class="d-flex flex-column flex-md-row justify-content-between align-items-md-start mb-4 pb-4 border-bottom">
                        <div>
                            <div class="d-flex align-items-center gap-3 mb-3">
                                <div class="bg-light p-3 rounded-4">
                                    <i class="bi bi-briefcase-fill fs-3" style="color: var(--primary-deep);"></i>
                                </div>
                                <h2 class="fw-bold mb-0" style="color: #121826;" id="vacanteTitulo">Cargando...</h2>
                            </div>
                            <ul class="list-unstyled text-secondary fs-6 mb-3">
                                <li class="mb-2"><i class="bi bi-building me-2"
                                        style="color: var(--primary-deep);"></i><span id="empresaNombre">---</span></li>
                                <li class="mb-2"><i class="bi bi-geo-alt me-2" style="color: var(--primary-deep);"></i><span
                                        id="vacanteUbicacion">---</span></li>
                                <li class="fw-bold" style="color: #1e1f22;"><i class="bi bi-cash me-2"
                                        style="color: var(--primary-deep);"></i><span id="vacanteSalario">---</span></li>
                            </ul>
                            <div class="d-flex flex-wrap gap-2" id="badgesContenedor">
                                <!-- Badges dinámicos se insertan aquí -->
                            </div>
                        </div>

                        <div class="mt-4 mt-md-0 d-flex flex-column align-items-md-end">
                            <div id="contenedorAccionPrincipal">
                                <button class="btn btn-primary-deep px-5 py-3 fw-bold shadow-sm">
                                    <i class="bi bi-send me-2"></i>Aplicar ahora
                                </button>
                            </div>
                            <div class="d-flex gap-4 mt-3">
                                <a href="#" id="btnGuardar"
                                    class="text-decoration-none fw-semibold d-flex align-items-center gap-1 action-icon">
                                    <i class="bi bi-bookmark" id="iconoGuardar"></i> Guardar
                                </a>
                                <a href="#"
                                    class="text-decoration-none fw-semibold d-flex align-items-center gap-1 action-icon"
                                    data-bs-toggle="modal" data-bs-target="#modalCompartir">
                                    <i class="bi bi-share-fill"></i> Compartir
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Contenido en dos columnas -->
                    <div class="row g-5">

                        <!-- Columna izquierda: descripción, responsabilidades, requisitos, empleos similares -->
                        <div class="col-12 col-lg-8">
                            <h5 class="fw-bold mb-3" style="color: #121826;">📋 Descripción del puesto</h5>
                            <p id="vacanteDescripcion" class="text-secondary mb-5 lh-lg" style="text-align: justify;"></p>

                            <h5 class="fw-bold mb-3" style="color: #121826;">✅ Responsabilidades</h5>
                            <ul id="listaResponsabilidades" class="text-secondary mb-5 lh-lg"
                                style="list-style-type: none; padding-left: 0;">
                                <li class="mb-2"><i class="bi bi-check-circle-fill me-2"
                                        style="color: var(--primary-deep);"></i>Cargando responsabilidades...</li>
                            </ul>

                            <h5 class="fw-bold mb-3" style="color: #121826;">🎓 Requisitos</h5>
                            <ul id="listaRequisitos" class="text-secondary mb-5 lh-lg"
                                style="list-style-type: none; padding-left: 0;">
                                <li class="mb-2"><i class="bi bi-check-circle-fill me-2"
                                        style="color: var(--primary-deep);"></i>Cargando requisitos...</li>
                            </ul>

                            <!-- Empleos similares (sección estática/dinámica) -->
                            <h5 class="fw-bold mb-4 mt-5" style="color: #121826;">🔍 Empleos similares</h5>
                            <div class="row g-4">
                                <div class="col-12 col-md-4">
                                    <div class="similar-job-card d-flex flex-column">
                                        <h6 class="fw-bold mb-3">Desarrollador Full Stack</h6>
                                        <ul class="list-unstyled text-secondary small mb-4">
                                            <li class="mb-1"><i class="bi bi-building me-2"></i>CodeCrafters</li>
                                            <li class="mb-1"><i class="bi bi-geo-alt me-2"></i>San Salvador</li>
                                            <li class="fw-bold"><i class="bi bi-cash me-2"></i>$800 - $900</li>
                                        </ul>
                                        <button class="btn btn-outline-primary w-100 mt-auto rounded-pill py-2 fw-semibold"
                                            style="border-color: var(--primary-deep); color: var(--primary-deep);">
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div class="similar-job-card d-flex flex-column">
                                        <h6 class="fw-bold mb-3">Lead Developer</h6>
                                        <ul class="list-unstyled text-secondary small mb-4">
                                            <li class="mb-1"><i class="bi bi-building me-2"></i>SoftwareHouse</li>
                                            <li class="mb-1"><i class="bi bi-geo-alt me-2"></i>Santa Ana</li>
                                            <li class="fw-bold"><i class="bi bi-cash me-2"></i>$500 - $700</li>
                                        </ul>
                                        <button class="btn btn-outline-primary w-100 mt-auto rounded-pill py-2 fw-semibold"
                                            style="border-color: var(--primary-deep); color: var(--primary-deep);">
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div class="similar-job-card d-flex flex-column">
                                        <h6 class="fw-bold mb-3">Arquitecto de Software</h6>
                                        <ul class="list-unstyled text-secondary small mb-4">
                                            <li class="mb-1"><i class="bi bi-building me-2"></i>TechInnovate</li>
                                            <li class="mb-1"><i class="bi bi-geo-alt me-2"></i>La Libertad</li>
                                            <li class="fw-bold"><i class="bi bi-cash me-2"></i>$1,000 - $2,000</li>
                                        </ul>
                                        <button class="btn btn-outline-primary w-100 mt-auto rounded-pill py-2 fw-semibold"
                                            style="border-color: var(--primary-deep); color: var(--primary-deep);">
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Columna derecha: sidebar con info de empresa y detalles -->
                        <div class="col-12 col-lg-4">

                            <!-- Sobre la empresa -->
                            <div class="sidebar-card mb-4">
                                <h6 class="fw-bold mb-3 d-flex align-items-center" style="color: #121826;">
                                    <i class="bi bi-building me-2" style="color: var(--primary-deep);"></i>Sobre la empresa
                                </h6>
                                <p class="text-secondary small mb-4" id="empresaDescripcion">---</p>

                                <div class="d-flex align-items-center mb-2">
                                    <i class="bi bi-star-fill me-1 small" style="color: #ffb347;"></i>
                                    <i class="bi bi-star-fill me-1 small" style="color: #ffb347;"></i>
                                    <i class="bi bi-star-fill me-1 small" style="color: #ffb347;"></i>
                                    <i class="bi bi-star-fill me-1 small" style="color: #ffb347;"></i>
                                    <i class="bi bi-star me-2 small" style="color: #ffb347;"></i>
                                    <span class="text-secondary small">4.0 (125 valoraciones)</span>
                                </div>
                                <div class="d-flex align-items-center mb-4">
                                    <i class="bi bi-people-fill text-secondary me-2"></i>
                                    <span class="text-secondary small">50-200 empleados</span>
                                </div>

                                <button class="btn btn-outline-primary w-100 rounded-pill py-2 fw-semibold"
                                    style="border-color: var(--primary-deep); color: var(--primary-deep);">
                                    Ver perfil de empresa <i class="bi bi-arrow-right ms-1"></i>
                                </button>
                            </div>

                            <!-- Detalles del empleo -->
                            <div class="card shadow-sm border-0 rounded-4 sidebar-card mb-4">
                                <div class="card-body p-4">
                                    <h6 class="fw-bold mb-4"><i class="bi bi-info-circle me-2"
                                            style="color: var(--primary-deep);"></i> Detalles del empleo</h6>

                                    <div class="mb-3">
                                        <span class="d-block small fw-bold text-dark">Tipo de contrato</span>
                                        <span id="detalle-contrato" class="text-secondary small">Cargando...</span>
                                    </div>

                                    <div class="mb-3">
                                        <span class="d-block small fw-bold text-dark">Experiencia</span>
                                        <span id="detalle-experiencia" class="text-secondary small">Cargando...</span>
                                    </div>

                                    <div class="mb-3">
                                        <span class="d-block small fw-bold text-dark">Educación</span>
                                        <span id="detalle-educacion" class="text-secondary small">Cargando...</span>
                                    </div>

                                    <div class="mb-3">
                                        <span class="d-block small fw-bold text-dark">Idiomas</span>
                                        <span id="detalle-idiomas" class="text-secondary small">Cargando...</span>
                                    </div>

                                    <div class="mb-3">
                                        <span class="d-block small fw-bold text-dark">Modalidad</span>
                                        <span id="detalle-modalidad" class="text-secondary small">Cargando...</span>
                                    </div>

                                    <div class="mb-0">
                                        <span class="d-block small fw-bold text-dark">Fecha de publicación</span>
                                        <span id="detalle-fecha" class="text-secondary small">Cargando...</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>

        <!-- ========== FOOTER ========== -->
        <footer class="py-4 mt-auto footer-custom">
            <div class="container text-center">
                <div class="d-flex flex-wrap justify-content-center gap-4 gap-md-5">
                    <a href="#"><i class="bi bi-question-circle me-1"></i>Ayuda</a>
                    <a href="#"><i class="bi bi-shield-lock me-1"></i>Privacidad</a>
                    <a href="#">Términos</a>
                    <span class="text-white opacity-75">💼 Workly 2026 · Conectando talento</span>
                </div>
            </div>
        </footer>

        <!-- ========== MODAL COMPARTIR ========== -->
        <div class="modal fade" id="modalCompartir" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 rounded-4 shadow-lg">
                    <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
                        <h5 class="modal-title fw-bold">Compartir esta vacante</h5>
                        <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body px-4 py-4 text-center">
                        <p class="text-secondary small mb-4">Envía esta oportunidad a un amigo o colega.</p>
                        <div class="d-flex justify-content-center gap-3 mb-4">
                            <button class="btn btn-light rounded-circle p-3 shadow-sm" style="width: 50px; height: 50px;"><i
                                    class="bi bi-linkedin fs-4" style="color: #0077b5;"></i></button>
                            <button class="btn btn-light rounded-circle p-3 shadow-sm" style="width: 50px; height: 50px;"><i
                                    class="bi bi-whatsapp fs-4" style="color: #25d366;"></i></button>
                            <button class="btn btn-light rounded-circle p-3 shadow-sm" style="width: 50px; height: 50px;"><i
                                    class="bi bi-twitter-x fs-4"></i></button>
                        </div>
                        <div class="input-group mb-3 shadow-sm rounded-3 overflow-hidden">
                            <input type="text" class="form-control bg-light border-0 text-muted small py-2"
                                value="https://workly.com/empleo/detalle" id="linkCompartir" readonly>
                            <button class="btn btn-primary-deep px-3" type="button" id="btnCopiarEnlace">Copiar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ========== TOASTS ========== -->
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="toastGuardado" class="toast align-items-center text-white border-0 rounded-4 shadow mb-2" role="alert"
                style="background-color: #2e3b4e;">
                <div class="d-flex">
                    <div class="toast-body fs-6 py-3 fw-semibold">
                        <i class="bi bi-bookmark-check-fill me-2 fs-5" style="color: #ffd966;"></i> Empleo guardado en tu
                        perfil.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
            <div id="toastCopiado" class="toast align-items-center text-white bg-success border-0 rounded-4 shadow mb-2"
                role="alert">
                <div class="d-flex">
                    <div class="toast-body fs-6 py-3 fw-semibold">
                        <i class="bi bi-clipboard-check me-2 fs-5"></i> Enlace copiado al portapapeles.
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
            <div id="toastPostulado" class="toast align-items-center text-white border-0 rounded-4 shadow" role="alert"
                style="background-color: var(--primary-deep);">
                <div class="d-flex">
                    <div class="toast-body fs-6 py-3 fw-semibold">
                        <i class="bi bi-send-check-fill me-2 fs-5"></i> ¡Tu postulación fue enviada con éxito!
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
                </div>
            </div>
        </div>

        <!-- Bootstrap JS -->


        <!-- Script de la API (conservado) -->


        <!-- Ajustes adicionales para conservar funcionalidad -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, getToken, getUsuario, navigateTo } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["usuario"]);

  const alertContainer = document.getElementById("alertContainer");
  const contenedorAccion = document.getElementById("contenedorAccionPrincipal");

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  };

  const getVacanteId = () => new URLSearchParams(window.location.search).get("id");

  const authHeaders = () => {
    const token = getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const formatLista = (texto) => {
    if (!texto || texto.trim() === "") {
      return "<li><i class='bi bi-check-circle-fill me-2' style='color: var(--primary-deep);'></i>Información no detallada.</li>";
    }
    return texto
      .split(/\n|[.;]\s+/)
      .map((item) => item.trim())
      .filter((item) => item.length > 2)
      .map((item) => `<li class="mb-2"><i class="bi bi-check-circle-fill me-2" style="color: var(--primary-deep);"></i>${item.replace(/[.;]$/, "")}</li>`)
      .join("");
  };

  const formatSalary = (value) => {
    if (value === null || value === undefined || value === "") return "A convenir";
    return `$${Number(value).toLocaleString("es-SV", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // -------------------------------------------------------------
  // FUNCIONES DE INFERENCIA (Si la BD no tiene datos, adivinamos)
  // -------------------------------------------------------------
  const inferirContrato = (vacante) => {
    const texto = `${vacante.titulo_puesto || ""} ${vacante.descripcion_puesto || ""} ${vacante.requisitos || ""}`.toLowerCase();
    if (texto.includes("medio tiempo") || texto.includes("part time")) return "Medio tiempo";
    if (texto.includes("freelance") || texto.includes("por proyecto")) return "Freelance";
    if (texto.includes("practica") || texto.includes("pasantia") || texto.includes("becario")) return "Prácticas";
    return vacante.modalidad ? `Tiempo completo · ${vacante.modalidad}` : "Tiempo completo";
  };

  const inferirEducacion = (vacante) => {
    const texto = `${vacante.requisitos || ""} ${vacante.descripcion_puesto || ""}`.toLowerCase();
    const coincidencia = texto.match(/(bachiller|tecnico|licenciatura|ingenieria|maestria)[^.|\n]*/i);
    return coincidencia ? coincidencia[0].trim() : "No especificada";
  };

  const inferirIdiomas = (vacante) => {
    const texto = `${vacante.requisitos || ""} ${vacante.descripcion_puesto || ""}`.toLowerCase();
    const idiomas = [];
    if (texto.includes("ingles") || texto.includes("inglés")) idiomas.push("Inglés");
    if (texto.includes("espanol") || texto.includes("español")) idiomas.push("Español");
    return idiomas.length ? idiomas.join(", ") : "No especificados";
  };

  const obtenerSeccionSimilares = () => {
    const headings = [...document.querySelectorAll("h5")];
    const heading = headings.find((item) => item.textContent.toLowerCase().includes("empleos similares"));
    return heading?.nextElementSibling || null;
  };

  // -------------------------------------------------------------
  // RENDERIZADO DE COMPONENTES
  // -------------------------------------------------------------
  const renderBotonAccion = (yaPostulado, idVacante) => {
    if (yaPostulado) {
      contenedorAccion.innerHTML = `
        <button class="btn btn-success px-4 py-2 fw-bold shadow-sm" style="border-radius: 8px;" disabled>
          Ya te postulaste <i class="bi bi-check-all ms-1"></i>
        </button>
      `;
      return;
    }
    contenedorAccion.innerHTML = `
      <button class="btn btn-primary px-4 py-2 fw-bold shadow-sm" style="border-radius: 8px;" id="btnPostularme">
        Aplicar ahora <i class="bi bi-send ms-1"></i>
      </button>
    `;
    document.getElementById("btnPostularme")?.addEventListener("click", () => realizarPostulacion(idVacante));
  };

  const renderSimilares = async (idVacante) => {
    const contenedor = obtenerSeccionSimilares();
    if (!contenedor) return;

    try {
      const response = await fetch(`${API_URL}/vacantes/${idVacante}/similares?limit=3`);
      if (!response.ok) throw new Error("No se pudieron cargar vacantes similares");
      const items = await response.json();

      if (!Array.isArray(items) || !items.length) {
        contenedor.innerHTML = `
          <div class="col-12">
            <div class="similar-job-card">
              <p class="text-secondary mb-0">No encontramos vacantes similares por el momento.</p>
            </div>
          </div>
        `;
        return;
      }

      contenedor.innerHTML = items.map((item) => `
        <div class="col-12 col-md-4">
          <div class="similar-job-card d-flex flex-column">
            <h6 class="fw-bold mb-3">${item.titulo_puesto || "Vacante similar"}</h6>
            <ul class="list-unstyled text-secondary small mb-4">
              <li class="mb-1"><i class="bi bi-building me-2"></i>${item.nombre_empresa || item.nombre_comercial || "Empresa"}</li>
              <li class="mb-1"><i class="bi bi-geo-alt me-2"></i>${item.nombre_municipio || "El Salvador"}</li>
              <li class="mb-1"><i class="bi bi-bar-chart-steps me-2"></i>${item.experiencia_nivel || "No especificado"}</li>
              <li class="fw-bold"><i class="bi bi-cash me-2"></i>${formatSalary(item.salario_offrecido)}</li>
            </ul>
            <a class="btn btn-outline-primary w-100 mt-auto rounded-pill py-2 fw-semibold" style="border-color: var(--primary-deep); color: var(--primary-deep);" href="../detalleempleo?id=${item.id_vacante}">
              Ver detalles
            </a>
          </div>
        </div>
      `).join("");
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarEstadoGuardado = (guardado) => {
    const icono = document.getElementById("iconoGuardar");
    const texto = document.querySelector("#btnGuardar");
    if (!icono || !texto) return;

    if (guardado) {
      icono.classList.remove("bi-bookmark");
      icono.classList.add("bi-bookmark-fill");
      texto.lastChild.textContent = " Guardado";
      return;
    }
    icono.classList.remove("bi-bookmark-fill");
    icono.classList.add("bi-bookmark");
    texto.lastChild.textContent = " Guardar";
  };

  // -------------------------------------------------------------
  // FUNCIÓN PRINCIPAL DE CARGA
  // -------------------------------------------------------------
  const cargarDetalle = async () => {
    const idVacante = getVacanteId();

    if (!idVacante) {
      showAlert("Agrega ?id=1 a la URL para ver un empleo real.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/vacantes/detalle/${idVacante}`, {
        headers: authHeaders()
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || "No se pudo cargar la vacante");

      const vacante = data.vacante;

      // Buscar el botón de ver perfil de empresa
      const empresaButton = [...document.querySelectorAll(".sidebar-card .btn-outline-primary")]
        .find((item) => item.textContent.toLowerCase().includes("ver perfil"));

      // Llenar títulos principales
      const elemTitulo = document.getElementById("vacanteTitulo");
      if (elemTitulo) elemTitulo.textContent = vacante.titulo_puesto || "Vacante";

      const elemEmpresa = document.getElementById("empresaNombre");
      if (elemEmpresa) elemEmpresa.textContent = vacante.nombre_comercial || "Empresa";

      const elemUbic = document.getElementById("vacanteUbicacion");
      if (elemUbic) elemUbic.textContent = vacante.nombre_municipio ? `${vacante.nombre_municipio}, ${vacante.nombre_departamento || ""}`.replace(/, $/, "") : "El Salvador";

      const elemSalario = document.getElementById("vacanteSalario");
      if (elemSalario) elemSalario.textContent = formatSalary(vacante.salario_offrecido);

      const elemDesc = document.getElementById("vacanteDescripcion");
      if (elemDesc) elemDesc.textContent = vacante.descripcion_puesto || "Sin descripción disponible.";

      // Llenar listas dinámicas (Responsabilidades y Requisitos)
      const elemResp = document.getElementById("listaResponsabilidades");
      if (elemResp) elemResp.innerHTML = formatLista(vacante.responsabilidades || vacante.descripcion_puesto);

      const elemReq = document.getElementById("listaRequisitos");
      if (elemReq) elemReq.innerHTML = formatLista(vacante.requisitos || vacante.descripcion_puesto);

      // Requisitos alternativos (Si tienes este ID)
      const contenedorRequisitos = document.getElementById("detalle-requisitos");
      if (contenedorRequisitos) {
          contenedorRequisitos.innerHTML = `<p><i class="bi bi-check-circle-fill text-primary me-2"></i> ${vacante.descripcion_puesto || "Información no detallada."}</p>`;
      }

      // Fecha principal
      const elemFecha = document.getElementById("vacanteFecha");
      let fechaFormateada = "Fecha no disponible";
      if (vacante.fecha_publicacion) {
          fechaFormateada = new Date(vacante.fecha_publicacion).toLocaleDateString("es-SV", { year: "numeric", month: "long", day: "numeric" });
      }
      if (elemFecha) elemFecha.textContent = fechaFormateada;

      // Badges
      const elemBadges = document.getElementById("badgesContenedor");
      if (elemBadges) {
          elemBadges.innerHTML = `
            <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 fw-semibold">${vacante.modalidad || "Presencial"}</span>
            <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 fw-semibold">${vacante.nombre_categoria || "Categoría general"}</span>
            <span class="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 fw-semibold">ID: #VAC-${vacante.id_vacante}</span>
          `;
      }

      // -------------------------------------------------------------
      // LLENAR LA TARJETA "DETALLES DEL EMPLEO" DIRECTO POR ID
      // -------------------------------------------------------------
      const elemContrato = document.getElementById("detalle-contrato");
      if (elemContrato) elemContrato.textContent = vacante.tipo_contrato || inferirContrato(vacante);

      const elemEducacion = document.getElementById("detalle-educacion");
      if (elemEducacion) elemEducacion.textContent = vacante.educacion || inferirEducacion(vacante);

      const elemIdiomas = document.getElementById("detalle-idiomas");
      if (elemIdiomas) elemIdiomas.textContent = vacante.idiomas || inferirIdiomas(vacante);

      const elemExperienciaExtra = document.getElementById("detalle-experiencia");
      if (elemExperienciaExtra) elemExperienciaExtra.textContent = vacante.experiencia_nivel || "No especificado";

      const elemModalidadExtra = document.getElementById("detalle-modalidad");
      if (elemModalidadExtra) elemModalidadExtra.textContent = vacante.modalidad || "No especificada";

      const elemFechaExtra = document.getElementById("detalle-fecha");
      if (elemFechaExtra) elemFechaExtra.textContent = fechaFormateada;

      // -------------------------------------------------------------
      // ACTUALIZAR BOTÓN DE PERFIL DE EMPRESA
      // -------------------------------------------------------------
      if (empresaButton && vacante.id_empresa) {
        const nombreEmpresa = vacante.nombre_comercial || "la empresa";
        empresaButton.innerHTML = `Ver perfil de ${nombreEmpresa}`;

        empresaButton.addEventListener("click", () => {
          navigateTo(`../valoracionempresa?id_empresa=${vacante.id_empresa}`);
        }, { once: true });
      }

      document.getElementById("linkCompartir").value = window.location.href;
      actualizarEstadoGuardado(Boolean(data.yaGuardado));
      renderBotonAccion(data.yaPostulado, vacante.id_vacante);
      await renderSimilares(vacante.id_vacante);

    } catch (error) {
      console.error(error);
      showAlert(error.message || "Error de conexión al cargar la vacante.");
    }
  };

  const realizarPostulacion = async (idVacante) => {
    try {
      const usuario = getUsuario();
      if (!usuario?.id_usuario) throw new Error("No se encontró una sesión válida para postular.");

      const response = await fetch(`${API_URL}/postulaciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ id_usuario_fk: usuario.id_usuario, id_vacante_fk: Number(idVacante), id_estado_fk: 1 })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || "Error al postularse.");

      new bootstrap.Toast(document.getElementById("toastPostulado")).show();
      setTimeout(cargarDetalle, 800);
    } catch (error) {
      console.error(error);
      showAlert(error.message || "No se pudo registrar la postulación.");
    }
  };

  const toggleGuardado = async () => {
    const usuario = getUsuario();
    const idVacante = getVacanteId();
    const icono = document.getElementById("iconoGuardar");

    if (!usuario?.id_usuario || !idVacante || !icono) {
      showAlert("No se pudo identificar la vacante que deseas guardar.");
      return;
    }

    const yaGuardado = icono.classList.contains("bi-bookmark-fill");

    try {
      const response = await fetch(`${API_URL}/guardados/${idVacante}`, {
        method: yaGuardado ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: yaGuardado ? undefined : JSON.stringify({ id_vacante_fk: Number(idVacante) })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.mensaje || "No se pudo actualizar el guardado");

      actualizarEstadoGuardado(!yaGuardado);
      if (!yaGuardado) new bootstrap.Toast(document.getElementById("toastGuardado")).show();
    } catch (error) {
      console.error(error);
      showAlert(error.message || "No se pudo actualizar la vacante guardada.");
    }
  };

  document.getElementById("btnGuardar")?.addEventListener("click", (event) => {
    event.preventDefault();
    toggleGuardado();
  });

  document.getElementById("btnCopiarEnlace")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      const modal = bootstrap.Modal.getInstance(document.getElementById("modalCompartir"));
      modal?.hide();
      new bootstrap.Toast(document.getElementById("toastCopiado")).show();
    } catch (error) {
      console.error(error);
      showAlert("No se pudo copiar el enlace.");
    }
  });

  cargarDetalle();
});
</script>

<style>

* {
            font-family: 'Inter', sans-serif;
        }

        :root {
            --primary-deep: #3f51b5;
            --nav-bg: #011671;
            --soft-accent: #f1ebd9;
            --light-text: #e2e4e8;
            --body-bg: #f5f7fc;
        }

        body {
            background-color: var(--body-bg);
        }

        /* Navbar personalizado */
        .navbar-custom {
            background-color: var(--nav-bg) !important;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
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

        .nav-link-custom {
            color: white !important;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 30px;
            transition: background 0.2s;
        }

        .nav-link-custom:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .btn-primary-deep {
            background-color: var(--primary-deep);
            border: none;
            color: white;
            font-weight: 600;
            transition: all 0.2s ease;
            border-radius: 40px;
            padding: 0.6rem 1.5rem;
        }

        .btn-primary-deep:hover {
            background-color: #2c3e8f;
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(63, 81, 181, 0.25);
            color: white;
        }

        .btn-outline-light-custom {
            border: 1.5px solid rgba(255, 255, 255, 0.5);
            color: white;
            background: transparent;
            font-weight: 500;
            border-radius: 40px;
            padding: 0.5rem 1.2rem;
        }

        .btn-outline-light-custom:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: white;
            color: white;
        }

        /* Tarjeta principal */
        .detail-card {
            background: white;
            border: none;
            border-radius: 32px;
            box-shadow: 0 25px 35px -12px rgba(1, 22, 113, 0.08);
            padding: 2rem 2.5rem;
        }

        /* Sidebar cards */
        .sidebar-card {
            background: white;
            border-radius: 24px;
            padding: 1.8rem;
            box-shadow: 0 15px 25px -8px rgba(0, 0, 0, 0.04);
            border: 1px solid #edf0f5;
            transition: transform 0.2s;
        }

        .sidebar-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 20px 30px -10px rgba(63, 81, 181, 0.1);
        }

        /* Empleos similares */
        .similar-job-card {
            background: white;
            border-radius: 20px;
            padding: 1.5rem;
            box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.03);
            border: 1px solid #eef2f6;
            transition: all 0.2s;
            height: 100%;
        }

        .similar-job-card:hover {
            border-color: var(--primary-deep);
            box-shadow: 0 15px 25px -8px rgba(63, 81, 181, 0.12);
        }

        /* Badges */
        .badge-soft {
            background: #e9ecf9;
            color: #2c3e8f;
            font-weight: 500;
            padding: 0.35rem 1rem;
            border-radius: 40px;
            font-size: 0.8rem;
        }

        /* Footer */
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

        .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: #dc3545;
            color: white;
            border-radius: 50%;
            padding: 0.2rem 0.4rem;
            font-size: 0.65rem;
            font-weight: bold;
            border: 2px solid white;
        }

        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.9)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        /* Estilo para los íconos de acción */
        .action-icon {
            color: #5f6b7a;
            transition: color 0.2s;
        }

        .action-icon:hover {
            color: var(--primary-deep);
        }

/* Mejora de listas para los items cargados dinámicamente */
        #listaResponsabilidades li,
        #listaRequisitos li {
            display: flex;
            align-items: flex-start;
        }

        #listaResponsabilidades li i,
        #listaRequisitos li i {
            margin-top: 0.2rem;
        }

        .hover-primary:hover {
            color: var(--primary-deep) !important;
        }

        /* Badges contenedor */
        #badgesContenedor .badge {
            background-color: #eef2f9;
            color: #2c3e8f;
            font-weight: 500;
            padding: 0.4rem 1rem;
            border-radius: 40px;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        }

        /* Para que los botones outline se vean bien */
        .btn-outline-primary {
            --bs-btn-color: var(--primary-deep);
            --bs-btn-border-color: var(--primary-deep);
            --bs-btn-hover-bg: var(--primary-deep);
            --bs-btn-hover-border-color: var(--primary-deep);
            --bs-btn-hover-color: white;
            --bs-btn-active-bg: #2c3e8f;
        }

.detalle-label {
  font-size: 0.95rem;
  color: #6c757d;
}

.detalle-value {
  font-weight: 600;
  color: #212529;
}

.descripcion-box {
  white-space: pre-line;
  line-height: 1.6;
}
</style>
