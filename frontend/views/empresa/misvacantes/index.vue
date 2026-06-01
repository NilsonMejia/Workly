<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- ========== NAVBAR MEJORADO ========== -->
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
            <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal/index.vue">
                <i class="bi bi-briefcase-fill brand-icon"></i>
                <div class="lh-sm ms-2">
                    <span class="brand-text">Workly</span>
                    <span class="brand-sub">Panel de Empresa</span>
                </div>
            </a>

            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarContent">
                <div class="navbar-nav mx-auto mt-3 mt-lg-0 gap-1">
                    <a href="../publicarvacante/index.vue" class="nav-link-custom text-decoration-none">
                        <i class="bi bi-plus-circle me-1"></i> Publicar
                    </a>
                    <a href="../misvacantes/index.vue" class="nav-link-custom active text-decoration-none">
                        <i class="bi bi-briefcase me-1"></i> Mis vacantes
                    </a>
                    <a href="../postulaciones/index.vue" class="nav-link-custom text-decoration-none">
                        <i class="bi bi-people me-1"></i> Postulaciones
                    </a>
                    <a href="../foro/index.vue" class="nav-link-custom text-decoration-none">
                        <i class="bi bi-chat-dots me-1"></i> Foro
                    </a>
                    <a href="../resenaempresa/index.vue" class="nav-link-custom text-decoration-none">
                        <i class="bi bi-star me-1"></i> Reseñas
                    </a>
                </div>

                <div class="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
                    <a href="../notificaciones/index.vue" class="text-white position-relative d-inline-block">
                        <i class="bi bi-bell-fill fs-3"></i>
                        <span class="notification-badge">2</span>
                    </a>
                    <a href="../perfil/index.vue" class="text-white d-inline-block">
                        <i class="bi bi-person-circle fs-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <!-- ========== MAIN ========== -->
    <main class="flex-grow-1 py-4">
        <div class="container-fluid px-4 px-lg-5">

            <!-- Barra de filtros y búsqueda -->
            <div class="filter-bar mb-4 d-flex align-items-center flex-wrap">
                <div class="d-flex align-items-center me-auto">
                    <i class="bi bi-briefcase-fill fs-3 me-3" style="color: var(--primary-deep);"></i>
                    <h4 class="fw-bold mb-0" style="color: #121826;">Mis Vacantes</h4>
                </div>
                <div class="d-flex gap-2 align-items-center mt-2 mt-sm-0">
                    <div class="input-group" style="max-width: 260px;">
                        <span class="input-group-text bg-transparent border-0 text-muted">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" class="form-control bg-transparent border-0 shadow-none" 
                               placeholder="Buscar por título...">
                    </div>
                    <div class="d-flex gap-2">
                        <span class="status-badge status-active cursor-pointer">Activas</span>
                        <span class="status-badge status-closed cursor-pointer">Cerradas</span>
                    </div>
                </div>
            </div>

            <div class="row g-4">

                <!-- Sidebar -->
                <aside class="col-12 col-lg-3">
                    <div class="sidebar-card">
                        <div class="d-flex align-items-center gap-3 mb-4">
                            <div class="bg-light p-3 rounded-4">
                                <i class="bi bi-bar-chart-line fs-3" style="color: var(--primary-deep);"></i>
                            </div>
                            <div>
                                <h6 class="fw-bold mb-0">Resumen</h6>
                                <span class="text-secondary small">Últimos 30 días</span>
                            </div>
                        </div>

                        <div class="mb-3">
                            <div class="d-flex justify-content-between small fw-medium mb-1">
                                <span>Vistas totales</span>
                                <span class="fw-bold">1,245</span>
                            </div>
                            <div class="progress" style="height: 6px; border-radius: 10px;">
                                <div class="progress-bar" style="width: 75%; background: var(--primary-deep);"></div>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="d-flex justify-content-between small fw-medium mb-1">
                                <span>Postulantes</span>
                                <span class="fw-bold">128</span>
                            </div>
                            <div class="progress" style="height: 6px; border-radius: 10px;">
                                <div class="progress-bar" style="width: 60%; background: #2ecc71;"></div>
                            </div>
                        </div>

                        <hr class="my-3">

                        <div class="list-group list-group-flush">
                            <a href="../principal/index.vue" class="list-group-item border-0 px-0 py-2 d-flex align-items-center gap-2 text-secondary">
                                <i class="bi bi-grid"></i> Vista general
                            </a>
                            <a href="../misvacantes/index.vue" class="list-group-item border-0 px-0 py-2 d-flex align-items-center gap-2 fw-bold" style="color: var(--primary-deep);">
                                <i class="bi bi-briefcase-fill"></i> Mis vacantes
                            </a>
                            <a href="../postulaciones/index.vue" class="list-group-item border-0 px-0 py-2 d-flex align-items-center gap-2 text-secondary">
                                <i class="bi bi-people"></i> Postulantes
                            </a>
                            <a href="#" class="list-group-item border-0 px-0 py-2 d-flex align-items-center gap-2 text-secondary" data-bs-toggle="modal" data-bs-target="#modalEstadisticas">
                                <i class="bi bi-graph-up"></i> Estadísticas
                            </a>
                        </div>

                        <button class="btn btn-outline-primary w-100 mt-4 rounded-pill" @click="window.location.href='../publicarvacante/index.vue'">
                            <i class="bi bi-plus-lg me-1"></i> Nueva vacante
                        </button>
                    </div>
                </aside>

                <!-- Lista de vacantes (contenedor dinámico) -->
                <section class="col-12 col-lg-9">
                    <!-- Cabecera de tabla -->
                    <div class="d-none d-md-grid mb-2 px-3" style="grid-template-columns: 3fr 1fr 1fr 1fr; gap: 1rem;">
                        <span class="fw-semibold text-secondary small">PUESTO</span>
                        <span class="fw-semibold text-secondary small">ESTADO</span>
                        <span class="fw-semibold text-secondary small">POSTULANTES</span>
                        <span class="fw-semibold text-secondary small">FECHA</span>
                    </div>

                    <!-- Contenedor donde app.js renderiza las vacantes -->
                    <div id="contenedorVacantes">
                        <!-- Vacante de ejemplo (se reemplazará dinámicamente) -->
                        <div class="vacancy-card">
                            <div class="row align-items-center g-3">
                                <div class="col-12 col-md-5">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="bg-light p-2 rounded-3">
                                            <i class="bi bi-code-slash fs-5" style="color: var(--primary-deep);"></i>
                                        </div>
                                        <div>
                                            <h6 class="fw-bold mb-0">Desarrollador Frontend React</h6>
                                            <span class="text-secondary small">San Salvador · Remoto</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-2">
                                    <span class="status-badge status-active">Activa</span>
                                </div>
                                <div class="col-6 col-md-2">
                                    <span class="fw-bold">24</span> <span class="text-secondary small">postulantes</span>
                                </div>
                                <div class="col-6 col-md-2">
                                    <span class="text-secondary small">Publicada: 15/04/2026</span>
                                </div>
                                <div class="col-6 col-md-1 text-end">
                                    <div class="dropdown">
                                        <button class="btn btn-light btn-sm rounded-pill px-3" data-bs-toggle="dropdown">
                                            <i class="bi bi-three-dots"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow rounded-3">
                                            <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>Ver detalles</a></li>
                                            <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-archive me-2"></i>Cerrar vacante</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="vacancy-card">
                            <div class="row align-items-center g-3">
                                <div class="col-12 col-md-5">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="bg-light p-2 rounded-3">
                                            <i class="bi bi-palette fs-5" style="color: var(--primary-deep);"></i>
                                        </div>
                                        <div>
                                            <h6 class="fw-bold mb-0">Diseñador UI/UX Senior</h6>
                                            <span class="text-secondary small">Santa Ana · Híbrido</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-2">
                                    <span class="status-badge status-active">Activa</span>
                                </div>
                                <div class="col-6 col-md-2">
                                    <span class="fw-bold">18</span> <span class="text-secondary small">postulantes</span>
                                </div>
                                <div class="col-6 col-md-2">
                                    <span class="text-secondary small">Publicada: 10/04/2026</span>
                                </div>
                                <div class="col-6 col-md-1 text-end">
                                    <div class="dropdown">
                                        <button class="btn btn-light btn-sm rounded-pill px-3" data-bs-toggle="dropdown">
                                            <i class="bi bi-three-dots"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow rounded-3">
                                            <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>Ver detalles</a></li>
                                            <li><a class="dropdown-item" href="#"><i class="bi bi-pencil me-2"></i>Editar</a></li>
                                            <li><hr class="dropdown-divider"></li>
                                            <li><a class="dropdown-item text-danger" href="#"><i class="bi bi-archive me-2"></i>Cerrar vacante</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="vacancy-card">
                            <div class="row align-items-center g-3">
                                <div class="col-12 col-md-5">
                                    <div class="d-flex align-items-center gap-3">
                                        <div class="bg-light p-2 rounded-3">
                                            <i class="bi bi-database fs-5" style="color: var(--primary-deep);"></i>
                                        </div>
                                        <div>
                                            <h6 class="fw-bold mb-0">Backend Developer Node.js</h6>
                                            <span class="text-secondary small">San Miguel · Remoto</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-6 col-md-2">
                                    <span class="status-badge status-closed">Cerrada</span>
                                </div>
                                <div class="col-6 col-md-2">
                                    <span class="fw-bold">32</span> <span class="text-secondary small">postulantes</span>
                                </div>
                                <div class="col-6 col-md-2">
                                    <span class="text-secondary small">Publicada: 01/04/2026</span>
                                </div>
                                <div class="col-6 col-md-1 text-end">
                                    <div class="dropdown">
                                        <button class="btn btn-light btn-sm rounded-pill px-3" data-bs-toggle="dropdown">
                                            <i class="bi bi-three-dots"></i>
                                        </button>
                                        <ul class="dropdown-menu dropdown-menu-end border-0 shadow rounded-3">
                                            <li><a class="dropdown-item" href="#"><i class="bi bi-eye me-2"></i>Ver detalles</a></li>
                                            <li><a class="dropdown-item" href="#"><i class="bi bi-arrow-repeat me-2"></i>Reabrir</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Mensaje cuando no hay vacantes (se mostrará dinámicamente) -->
                    <div id="sinVacantes" class="text-center p-5 d-none">
                        <i class="bi bi-inbox fs-1 text-secondary mb-3"></i>
                        <h6 class="fw-bold">No tienes vacantes publicadas</h6>
                        <p class="text-secondary small">Comienza publicando tu primera oferta de empleo</p>
                        <button class="btn btn-primary-deep mt-2" @click="window.location.href='../publicarvacante/index.vue'">
                            <i class="bi bi-plus-lg me-1"></i> Publicar vacante
                        </button>
                    </div>

                </section>

            </div>
        </div>
    </main>

    <!-- ========== MODAL ESTADÍSTICAS (conservado) ========== -->
    <div class="modal fade" id="modalEstadisticas" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 rounded-4 shadow-lg">
                <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
                    <h4 class="modal-title fw-bold" style="color: #121826;">Estadísticas de Mis Vacantes</h4>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body px-4 py-4">

                    <div class="row g-4 mb-4">
                        <div class="col-12 col-md-4">
                            <div class="bg-light p-4 rounded-4 text-center h-100">
                                <i class="bi bi-eye-fill fs-1 mb-2" style="color: var(--primary-deep);"></i>
                                <h2 class="fw-bold mb-1">1,245</h2>
                                <p class="text-secondary small fw-medium mb-0">Vistas totales este mes</p>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="bg-light p-4 rounded-4 text-center h-100">
                                <i class="bi bi-person-plus-fill fs-1 mb-2" style="color: #2ecc71;"></i>
                                <h2 class="fw-bold mb-1">128</h2>
                                <p class="text-secondary small fw-medium mb-0">Postulantes recibidos</p>
                            </div>
                        </div>
                        <div class="col-12 col-md-4">
                            <div class="bg-light p-4 rounded-4 text-center h-100">
                                <i class="bi bi-lightning-fill fs-1 mb-2" style="color: #f39c12;"></i>
                                <h2 class="fw-bold mb-1">10.2%</h2>
                                <p class="text-secondary small fw-medium mb-0">Tasa de conversión</p>
                            </div>
                        </div>
                    </div>

                    <h6 class="fw-bold mb-3" style="color: #121826;">Rendimiento de vacantes activas</h6>
                    <div class="border rounded-4 overflow-hidden">
                        <div class="p-3 border-bottom bg-light">
                            <div class="row fw-semibold small text-secondary">
                                <div class="col-6">PUESTO</div>
                                <div class="col-3 text-center">POSTULANTES</div>
                                <div class="col-3 text-center">VISTAS</div>
                            </div>
                        </div>
                        <div class="p-3 border-bottom">
                            <div class="row align-items-center">
                                <div class="col-6 fw-medium">Desarrollador Frontend</div>
                                <div class="col-3 text-center"><span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">65</span></div>
                                <div class="col-3 text-center">800</div>
                            </div>
                        </div>
                        <div class="p-3">
                            <div class="row align-items-center">
                                <div class="col-6 fw-medium">UX/UI Designer</div>
                                <div class="col-3 text-center"><span class="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill">42</span></div>
                                <div class="col-3 text-center">310</div>
                            </div>
                        </div>
                    </div>

                </div>
                <div class="modal-footer border-top-0 px-4 pb-4">
                    <button type="button" class="btn btn-primary-deep px-5 py-2 w-100" data-bs-dismiss="modal">Entendido</button>
                </div>
            </div>
        </div>
    </div>

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

    <!-- Bootstrap JS -->

    <!-- Script de la aplicación (conservado) -->


    <!-- Script para filtros interactivos (no interfiere con app.js) -->


    <!-- Ajustes adicionales -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["empresa"]);

  const contenedorVacantes = document.getElementById("contenedorVacantes");
  const sinVacantes = document.getElementById("sinVacantes");
  const searchInput = document.querySelector(".filter-bar input");
  const statusBadges = [...document.querySelectorAll(".status-badge.cursor-pointer")];
  const resumenCard = document.querySelector(".sidebar-card");
  const modalEstadisticas = document.getElementById("modalEstadisticas");

  let vacantes = [];
  let filtroEstado = "Activa";

  const authHeaders = (withJson = false) => ({
    ...(withJson ? { "Content-Type": "application/json" } : {}),
    Authorization: `Bearer ${getToken()}`
  });

  const formatearFecha = (fecha) => {
    if (!fecha) return "Reciente";
    return new Date(fecha).toLocaleDateString("es-SV", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  const filtrarVacantes = () => {
    const texto = (searchInput?.value || "").trim().toLowerCase();
    return vacantes.filter((item) => {
      const coincideTexto =
        !texto ||
        [item.titulo_puesto, item.nombre_categoria, item.nombre_municipio, item.modalidad]
          .some((value) => String(value || "").toLowerCase().includes(texto));

      const coincideEstado = !filtroEstado || item.estado === filtroEstado;
      return coincideTexto && coincideEstado;
    });
  };

  const actualizarResumen = () => {
    if (!resumenCard) return;

    const totalPostulaciones = vacantes.reduce((acc, item) => acc + Number(item.total_postulaciones || 0), 0);
    const activas = vacantes.filter((item) => item.estado === "Activa").length;
    const inactivas = vacantes.filter((item) => item.estado === "Inactiva").length;

    const progressBars = resumenCard.querySelectorAll(".progress-bar");
    const valueNodes = [...resumenCard.querySelectorAll(".d-flex.justify-content-between.small.fw-medium.mb-1 .fw-bold")];

    if (valueNodes[0]) valueNodes[0].textContent = String(vacantes.length);
    if (valueNodes[1]) valueNodes[1].textContent = String(totalPostulaciones);

    if (progressBars[0]) {
      progressBars[0].style.width = `${Math.min(100, activas * 15 || 5)}%`;
    }
    if (progressBars[1]) {
      progressBars[1].style.width = `${Math.min(100, totalPostulaciones * 8 || 5)}%`;
    }

    const modalBody = modalEstadisticas?.querySelector(".modal-body");
    if (modalBody) {
      const statNumbers = modalBody.querySelectorAll("h2.fw-bold.mb-1");
      if (statNumbers[0]) statNumbers[0].textContent = String(vacantes.length);
      if (statNumbers[1]) statNumbers[1].textContent = String(totalPostulaciones);
      if (statNumbers[2]) {
        const tasa = vacantes.length ? ((totalPostulaciones / vacantes.length) * 100).toFixed(1) : "0.0";
        statNumbers[2].textContent = `${tasa}%`;
      }

      const rows = modalBody.querySelectorAll(".border.rounded-4 .p-3:not(.border-bottom.bg-light)");
      const top = [...vacantes]
        .sort((a, b) => Number(b.total_postulaciones || 0) - Number(a.total_postulaciones || 0))
        .slice(0, 2);

      rows.forEach((row, index) => {
        const item = top[index];
        if (!item) return;
        const cols = row.querySelectorAll(".col-6, .col-3");
        if (cols[0]) cols[0].textContent = item.titulo_puesto || "Vacante";
        if (cols[1]) cols[1].querySelector(".badge").textContent = String(item.total_postulaciones || 0);
        if (cols[2]) cols[2].textContent = `${(Number(item.total_postulaciones || 0) * 7) + 10}`;
      });
    }

    const estadoNodes = document.querySelectorAll(".status-badge.cursor-pointer");
    if (estadoNodes[0]) estadoNodes[0].textContent = `Activas (${activas})`;
    if (estadoNodes[1]) estadoNodes[1].textContent = `Inactivas (${inactivas})`;
  };

  const getEstadoBadgeClass = (estado) => estado === "Activa" ? "status-active" : "status-closed";

  const renderVacantes = () => {
    const items = filtrarVacantes();

    if (!items.length) {
      contenedorVacantes.innerHTML = "";
      sinVacantes?.classList.remove("d-none");
      return;
    }

    sinVacantes?.classList.add("d-none");
    contenedorVacantes.innerHTML = items.map((item) => `
      <div class="vacancy-card">
        <div class="row align-items-center g-3">
          <div class="col-12 col-md-5">
            <div class="d-flex align-items-center gap-3">
              <div class="bg-light p-2 rounded-3">
                <i class="bi bi-briefcase fs-5" style="color: var(--primary-deep);"></i>
              </div>
              <div>
                <h6 class="fw-bold mb-0">${item.titulo_puesto}</h6>
                <span class="text-secondary small">${item.nombre_categoria || "Sin categoria"} · ${item.nombre_municipio || "Sin ubicacion"} · ${item.modalidad || "N/D"}</span>
              </div>
            </div>
          </div>
          <div class="col-6 col-md-2">
            <span class="status-badge ${getEstadoBadgeClass(item.estado)}">${item.estado}</span>
          </div>
          <div class="col-6 col-md-2">
            <span class="fw-bold">${Number(item.total_postulaciones || 0)}</span> <span class="text-secondary small">postulantes</span>
          </div>
          <div class="col-6 col-md-2">
            <span class="text-secondary small">Publicada: ${formatearFecha(item.fecha_publicacion)}</span>
          </div>
          <div class="col-6 col-md-1 text-end">
            <div class="dropdown">
              <button class="btn btn-light btn-sm rounded-pill px-3" data-bs-toggle="dropdown">
                <i class="bi bi-three-dots"></i>
              </button>
              <ul class="dropdown-menu dropdown-menu-end border-0 shadow rounded-3">
                <li><a class="dropdown-item" href="../postulaciones/index.vue"><i class="bi bi-people me-2"></i>Ver postulaciones</a></li>
                <li><button class="dropdown-item btn-toggle-estado" data-id="${item.id_vacante}" data-estado="${item.estado === "Activa" ? "Inactiva" : "Activa"}"><i class="bi ${item.estado === "Activa" ? "bi-pause-circle" : "bi-play-circle"} me-2"></i>${item.estado === "Activa" ? "Desactivar" : "Reactivar"}</button></li>
                <li><hr class="dropdown-divider"></li>
                <li><button class="dropdown-item text-danger btn-eliminar" data-id="${item.id_vacante}"><i class="bi bi-trash me-2"></i>Eliminar</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `).join("");

    contenedorVacantes.querySelectorAll(".btn-toggle-estado").forEach((button) => {
      button.addEventListener("click", async () => {
        await cambiarEstadoVacante(button.dataset.id, button.dataset.estado);
      });
    });

    contenedorVacantes.querySelectorAll(".btn-eliminar").forEach((button) => {
      button.addEventListener("click", async () => {
        await eliminarVacante(button.dataset.id);
      });
    });
  };

  const cargarVacantes = async () => {
    const response = await fetch(`${API_URL}/vacantes/mis-vacantes`, {
      headers: authHeaders()
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudieron cargar tus vacantes.");
    }

    vacantes = Array.isArray(data) ? data : [];
    actualizarResumen();
    renderVacantes();
  };

  const cambiarEstadoVacante = async (id, estado) => {
    const response = await fetch(`${API_URL}/vacantes/${id}/estado`, {
      method: "PATCH",
      headers: authHeaders(true),
      body: JSON.stringify({ estado })
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo cambiar el estado.");
    }

    await cargarVacantes();
  };

  const eliminarVacante = async (id) => {
    if (!window.confirm("Seguro que quieres eliminar esta vacante?")) return;

    const response = await fetch(`${API_URL}/vacantes/${id}`, {
      method: "DELETE",
      headers: authHeaders()
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo eliminar la vacante.");
    }

    await cargarVacantes();
  };

  statusBadges.forEach((badge, index) => {
    badge.addEventListener("click", () => {
      statusBadges.forEach((item) => {
        item.style.opacity = "0.6";
      });
      badge.style.opacity = "1";
      filtroEstado = index === 0 ? "Activa" : "Inactiva";
      renderVacantes();
    });
  });

  searchInput?.addEventListener("input", renderVacantes);

  if (statusBadges[0]) {
    statusBadges[0].style.opacity = "1";
  }

  cargarVacantes().catch((error) => {
    console.error(error);
    contenedorVacantes.innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  });
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
            --body-bg: #f0f4fe;
        }
        body {
            background: linear-gradient(145deg, #eef2f9 0%, #f9fafc 100%);
        }
        /* Navbar personalizado */
        .navbar-custom {
            background-color: var(--nav-bg) !important;
            box-shadow: 0 6px 20px rgba(1, 22, 113, 0.15);
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
            padding: 0.5rem 1.2rem;
            border-radius: 30px;
            transition: all 0.2s;
            background: rgba(255,255,255,0.05);
        }
        .nav-link-custom:hover {
            background: rgba(255,255,255,0.15);
        }
        .nav-link-custom.active {
            background: rgba(255,255,255,0.2);
        }
        .btn-primary-deep {
            background: linear-gradient(135deg, var(--primary-deep), #2c3e8f);
            border: none;
            color: white;
            font-weight: 600;
            transition: all 0.25s ease;
            border-radius: 40px;
            padding: 0.6rem 1.8rem;
            box-shadow: 0 6px 14px rgba(63, 81, 181, 0.25);
        }
        .btn-primary-deep:hover {
            background: linear-gradient(135deg, #2c3e8f, var(--primary-deep));
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(63, 81, 181, 0.35);
            color: white;
        }
        /* Tarjetas y filtros */
        .filter-bar {
            background: white;
            border-radius: 60px;
            padding: 0.5rem 0.5rem 0.5rem 1.5rem;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }
        .vacancy-card {
            background: white;
            border-radius: 24px;
            padding: 1.5rem;
            box-shadow: 0 10px 20px -5px rgba(0,0,0,0.03);
            border: 1px solid #eef2f6;
            transition: all 0.2s;
            margin-bottom: 1rem;
        }
        .vacancy-card:hover {
            box-shadow: 0 20px 30px -10px rgba(63,81,181,0.12);
            border-color: var(--primary-deep);
            transform: translateY(-3px);
        }
        .sidebar-card {
            background: white;
            border-radius: 28px;
            padding: 1.5rem;
            box-shadow: 0 15px 25px -8px rgba(0,0,0,0.04);
            border: 1px solid #eef2f9;
        }
        .status-badge {
            padding: 0.4rem 1.2rem;
            border-radius: 40px;
            font-weight: 600;
            font-size: 0.85rem;
            display: inline-block;
        }
        .status-active {
            background: #e3f7e8;
            color: #1e7e34;
        }
        .status-closed {
            background: #fde7e7;
            color: #dc3545;
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
            background-color: #ff4757;
            color: white;
            border-radius: 50%;
            padding: 0.25rem 0.45rem;
            font-size: 0.7rem;
            font-weight: bold;
            border: 2px solid white;
        }
        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

.cursor-pointer { cursor: pointer; }
    .status-badge.cursor-pointer { transition: opacity 0.2s; }
    .vacancy-card { transition: all 0.25s; }
    .dropdown-item:active { background-color: var(--primary-deep); }

.vacante-card {
  height: 100%;
}

.vacante-card .card-body {
  display: flex;
  flex-direction: column;
}

.vacante-meta {
  font-size: 0.92rem;
  color: #6c757d;
}

.vacante-actions {
  margin-top: auto;
}
</style>
