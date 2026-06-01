<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-custom py-3">
        <div class="container-fluid px-4 px-lg-5">
          <a class="navbar-brand text-white fw-bold fs-3 d-flex align-items-center gap-2" href="../principal">
            <i class="bi bi-briefcase-fill"></i>
            <span>Workly</span>
          </a>

          <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarContent">
            <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
              <a href="../principal" class="nav-link-custom">Dashboard</a>
              <a href="../publicarvacante" class="nav-link-custom">Publicar</a>
              <a href="../misvacantes" class="nav-link-custom">Vacantes</a>
              <a href="../postulaciones" class="nav-link-custom">Postulaciones</a>
              <a href="../foro" class="nav-link-custom">Foro</a>
            </div>
            <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <a href="../notificaciones" class="text-white position-relative text-decoration-none">
                <i class="bi bi-bell-fill fs-4"></i>
                <span class="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
              </a>
              <a href="../perfil" class="text-white text-decoration-none">
                <i class="bi bi-building fs-4"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main class="flex-grow-1 py-4 py-lg-5">
        <div class="container px-4 px-lg-5">
          <section class="surface-card hero-card p-4 p-lg-5 mb-4">
            <div class="row g-4 align-items-center position-relative">
              <div class="col-12 col-xl-7">
                <span class="badge rounded-pill text-bg-light text-primary fw-semibold mb-3">Centro de alertas</span>
                <h1 class="display-6 fw-bold mb-2">Notificaciones listas para accion</h1>
                <p class="mb-0 text-white-50">Controla nuevas postulaciones, cambios del proceso y avisos importantes desde un solo panel.</p>
              </div>
              <div class="col-12 col-xl-5">
                <div class="row g-3">
                  <div class="col-6">
                    <div class="metric-pill">
                      <div class="small text-white-50 mb-1">Sin leer</div>
                      <div class="fs-3 fw-bold" id="resumenNoLeidas">0</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="metric-pill">
                      <div class="small text-white-50 mb-1">Total</div>
                      <div class="fs-3 fw-bold" id="resumenTotal">0</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="metric-pill">
                      <div class="small text-white-50 mb-1">Postulaciones</div>
                      <div class="fs-5 fw-bold" id="resumenPostulaciones">0</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="metric-pill">
                      <div class="small text-white-50 mb-1">Sistema</div>
                      <div class="fs-5 fw-bold" id="resumenSistema">0</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="surface-card p-4 p-lg-5">
            <div class="d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3 mb-4">
              <div>
                <h2 class="h3 fw-bold mb-1">Bandeja de empresa</h2>
                <p class="text-muted mb-0">Filtra rapido y mantente al dia con cada candidato y movimiento.</p>
              </div>
              <button class="btn btn-primary rounded-pill px-4" id="btnMarcarTodas">
                <i class="bi bi-check2-all me-2"></i>Marcar todas como leidas
              </button>
            </div>

            <div id="alertContainer" class="mb-3"></div>

            <div class="row g-3 align-items-end mb-4">
              <div class="col-12 col-lg-5">
                <label for="inputBuscar" class="form-label fw-semibold">Buscar</label>
                <input id="inputBuscar" type="search" class="form-control form-control-lg rounded-4" placeholder="Titulo o mensaje">
              </div>
              <div class="col-12 col-md-6 col-lg-3">
                <label for="filtroTipo" class="form-label fw-semibold">Tipo</label>
                <select id="filtroTipo" class="form-select form-select-lg rounded-4">
                  <option value="">Todas</option>
                  <option value="postulacion">Postulaciones</option>
                  <option value="estado">Estados</option>
                  <option value="sistema">Sistema</option>
                  <option value="comentario">Comentarios</option>
                </select>
              </div>
              <div class="col-12 col-md-6 col-lg-2">
                <label for="filtroLeida" class="form-label fw-semibold">Estado</label>
                <select id="filtroLeida" class="form-select form-select-lg rounded-4">
                  <option value="">Todas</option>
                  <option value="0">No leidas</option>
                  <option value="1">Leidas</option>
                </select>
              </div>
              <div class="col-12 col-lg-2 d-grid">
                <button class="btn btn-outline-primary btn-lg rounded-4" id="btnFiltrar">
                  <i class="bi bi-funnel me-2"></i>Filtrar
                </button>
              </div>
            </div>

            <div class="row g-4">
              <div class="col-12 col-xl-8">
                <div class="d-grid gap-3" id="listaNotificaciones"></div>
              </div>
              <div class="col-12 col-xl-4">
                <div class="summary-card p-4 mb-3">
                  <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="summary-icon"><i class="bi bi-person-workspace"></i></div>
                    <div>
                      <h3 class="h5 fw-bold mb-0">Postulaciones</h3>
                      <p class="text-muted small mb-0">Lo que mas necesita seguimiento</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="text-muted">Cambios de estado</span>
                    <strong id="resumenEstado">0</strong>
                  </div>
                </div>

                <div class="summary-card p-4 mb-3">
                  <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="summary-icon"><i class="bi bi-lightning-charge-fill"></i></div>
                    <div>
                      <h3 class="h5 fw-bold mb-0">Acciones rapidas</h3>
                      <p class="text-muted small mb-0">Atajos para seguir trabajando</p>
                    </div>
                  </div>
                  <div class="d-grid gap-2">
                    <a href="../postulaciones" class="btn btn-light border rounded-4 text-start">
                      <i class="bi bi-people me-2"></i>Revisar candidatos
                    </a>
                    <a href="../misvacantes" class="btn btn-light border rounded-4 text-start">
                      <i class="bi bi-briefcase me-2"></i>Ver vacantes activas
                    </a>
                    <a href="../publicarvacante" class="btn btn-light border rounded-4 text-start">
                      <i class="bi bi-plus-circle me-2"></i>Publicar nueva vacante
                    </a>
                  </div>
                </div>

                <div class="summary-card p-4">
                  <h3 class="h5 fw-bold mb-3">Buenas practicas</h3>
                  <ul class="list-unstyled text-muted small mb-0 d-grid gap-2">
                    <li><i class="bi bi-check2-circle text-primary me-2"></i>Marca como leidas las alertas resueltas.</li>
                    <li><i class="bi bi-check2-circle text-primary me-2"></i>Entra rapido al detalle de cada candidato.</li>
                    <li><i class="bi bi-check2-circle text-primary me-2"></i>Mantiene el proceso claro para el equipo.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer class="footer-custom py-4 mt-auto text-center text-white-50">
        <div class="container">
          <span>Workly 2026 | Gestiona tu reclutamiento con orden y velocidad</span>
        </div>
      </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["empresa"]);

  const alertContainer = document.getElementById("alertContainer");
  const listaNotificaciones = document.getElementById("listaNotificaciones");
  const btnMarcarTodas = document.getElementById("btnMarcarTodas");
  const btnFiltrar = document.getElementById("btnFiltrar");
  const filtroTipo = document.getElementById("filtroTipo");
  const filtroLeida = document.getElementById("filtroLeida");
  const inputBuscar = document.getElementById("inputBuscar");

  const resumenNoLeidas = document.getElementById("resumenNoLeidas");
  const resumenPostulaciones = document.getElementById("resumenPostulaciones");
  const resumenEstado = document.getElementById("resumenEstado");
  const resumenSistema = document.getElementById("resumenSistema");
  const resumenTotal = document.getElementById("resumenTotal");

  const ICONOS = {
    postulacion: "bi-person-workspace",
    estado: "bi-arrow-repeat",
    sistema: "bi-bell-fill",
    comentario: "bi-chat-left-text-fill"
  };

  const resolveNotificationLink = (value) => {
    if (!value) {
      return null;
    }

    try {
      return new URL(value, API_URL).toString();
    } catch {
      return value;
    }
  };

  const authHeaders = {
    Authorization: `Bearer ${getToken()}`
  };

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) {
      return;
    }

    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show rounded-4 shadow-sm" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
  };

  const formatDate = (value) => {
    if (!value) {
      return "Reciente";
    }

    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? "Reciente"
      : date.toLocaleString("es-SV", { dateStyle: "medium", timeStyle: "short" });
  };

  const getFilterQuery = () => {
    const params = new URLSearchParams();

    if (filtroTipo.value) {
      params.set("tipo_notificacion", filtroTipo.value);
    }

    if (filtroLeida.value) {
      params.set("leida", filtroLeida.value);
    }

    if (inputBuscar.value.trim()) {
      params.set("search", inputBuscar.value.trim());
    }

    return params.toString();
  };

  const renderResumen = (data) => {
    resumenNoLeidas.textContent = data.no_leidas ?? 0;
    resumenPostulaciones.textContent = data.postulaciones ?? 0;
    resumenEstado.textContent = data.cambios_estado ?? 0;
    resumenSistema.textContent = data.sistema ?? 0;
    resumenTotal.textContent = data.total ?? 0;
    document.querySelectorAll(".notification-badge").forEach((badge) => {
      const count = Number(data.no_leidas || 0);
      badge.textContent = count > 99 ? "99+" : String(count);
      badge.style.display = count > 0 ? "inline-flex" : "none";
    });
  };

  const getTypeLabel = (value) => {
    const labels = {
      postulacion: "Postulacion",
      estado: "Estado",
      sistema: "Sistema",
      comentario: "Comentario"
    };

    return labels[value] || "Sistema";
  };

  const renderNotificaciones = (items) => {
    if (!items.length) {
      listaNotificaciones.innerHTML = `
        <div class="empty-state text-center p-5 rounded-4">
          <div class="empty-state-icon mx-auto mb-3">
            <i class="bi bi-bell-slash fs-2"></i>
          </div>
          <h3 class="h5 fw-bold mb-2">No hay notificaciones para mostrar</h3>
          <p class="text-muted mb-0">Prueba otro filtro o espera nuevas acciones en tus vacantes.</p>
        </div>
      `;
      return;
    }

    listaNotificaciones.innerHTML = items.map((item) => `
      <article class="notification-card ${Number(item.leida) === 0 ? "is-unread" : ""}">
        <div class="d-flex gap-3">
          <div class="notification-icon flex-shrink-0">
            <i class="bi ${ICONOS[item.tipo_notificacion] || ICONOS.sistema}"></i>
          </div>
          <div class="flex-grow-1">
            <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
              <div>
                <div class="d-flex flex-wrap align-items-center gap-2 mb-2">
                  <h3 class="h6 fw-bold mb-0">${item.titulo}</h3>
                  <span class="badge rounded-pill text-bg-light border text-uppercase">${getTypeLabel(item.tipo_notificacion)}</span>
                  ${Number(item.leida) === 0 ? '<span class="badge rounded-pill text-bg-primary">Nuevo</span>' : ""}
                </div>
                <p class="text-muted mb-0">${item.mensaje}</p>
              </div>
              <small class="text-muted text-lg-end">${formatDate(item.fecha_creacion)}</small>
            </div>
            <div class="d-flex flex-wrap gap-2 mt-3">
              <button type="button" class="btn btn-sm ${Number(item.leida) === 0 ? "btn-outline-primary" : "btn-outline-secondary"} rounded-pill" data-action="toggle" data-id="${item.id_notificacion}" data-leida="${item.leida}">
                <i class="bi ${Number(item.leida) === 0 ? "bi-check2" : "bi-envelope"} me-1"></i>
                ${Number(item.leida) === 0 ? "Marcar leida" : "Marcar no leida"}
              </button>
              ${item.enlace ? `
                <a class="btn btn-sm btn-light rounded-pill border" href="${resolveNotificationLink(item.enlace)}">
                  <i class="bi bi-box-arrow-up-right me-1"></i>Ver detalle
                </a>
              ` : ""}
              <button type="button" class="btn btn-sm btn-outline-danger rounded-pill" data-action="delete" data-id="${item.id_notificacion}">
                <i class="bi bi-trash3 me-1"></i>Eliminar
              </button>
            </div>
          </div>
        </div>
      </article>
    `).join("");

    document.querySelectorAll("[data-action='toggle']").forEach((button) => {
      button.addEventListener("click", async () => {
        await toggleLeida(button.dataset.id, button.dataset.leida);
      });
    });

    document.querySelectorAll("[data-action='delete']").forEach((button) => {
      button.addEventListener("click", async () => {
        await eliminarNotificacion(button.dataset.id);
      });
    });
  };

  const actualizarResumen = async () => {
    const response = await fetch(`${API_URL}/notificaciones/resumen`, {
      headers: authHeaders
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo cargar el resumen");
    }

    renderResumen(data);
  };

  const cargarNotificaciones = async () => {
    const query = getFilterQuery();
    const response = await fetch(`${API_URL}/notificaciones${query ? `?${query}` : ""}`, {
      headers: authHeaders
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudieron cargar las notificaciones");
    }

    renderNotificaciones(data);
  };

  const toggleLeida = async (id, leida) => {
    const path = Number(leida) === 0 ? "leer" : "no-leida";
    const response = await fetch(`${API_URL}/notificaciones/${id}/${path}`, {
      method: "PUT",
      headers: authHeaders
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo actualizar la notificacion");
    }

    showAlert(data.mensaje, "success");
    await init();
  };

  const eliminarNotificacion = async (id) => {
    const response = await fetch(`${API_URL}/notificaciones/${id}`, {
      method: "DELETE",
      headers: authHeaders
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo eliminar la notificacion");
    }

    showAlert(data.mensaje, "success");
    await init();
  };

  btnMarcarTodas.addEventListener("click", async () => {
    try {
      const response = await fetch(`${API_URL}/notificaciones/marcar-todas/leidas`, {
        method: "PUT",
        headers: authHeaders
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "No se pudieron marcar todas las notificaciones");
      }

      showAlert(data.mensaje, "success");
      await init();
    } catch (error) {
      showAlert(error.message);
    }
  });

  btnFiltrar.addEventListener("click", async () => {
    try {
      await init();
    } catch (error) {
      showAlert(error.message);
    }
  });

  inputBuscar.addEventListener("keydown", async (event) => {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();

    try {
      await init();
    } catch (error) {
      showAlert(error.message);
    }
  });

  const init = async () => {
    await Promise.all([actualizarResumen(), cargarNotificaciones()]);
  };

  init().catch((error) => {
    console.error(error);
    showAlert(error.message || "No se pudo cargar la vista de notificaciones");
  });
});
</script>

<style>

:root {
      --nav-bg: #011671;
      --page-bg: linear-gradient(180deg, #edf3ff 0%, #f7faff 100%);
      --primary-deep: #3f51b5;
      --card-shadow: 0 24px 45px -18px rgba(1, 22, 113, 0.18);
    }

    body {
      font-family: "Inter", sans-serif;
      background: var(--page-bg);
      color: #182033;
    }

    .navbar-custom,
    .footer-custom {
      background: var(--nav-bg);
    }

    .nav-link-custom {
      color: #fff;
      text-decoration: none;
      padding: 0.7rem 1.1rem;
      border-radius: 999px;
      transition: 0.2s ease;
    }

    .nav-link-custom:hover,
    .nav-link-custom.active {
      background: rgba(255, 255, 255, 0.12);
    }

    .surface-card {
      background: rgba(255, 255, 255, 0.96);
      border: 1px solid rgba(255, 255, 255, 0.72);
      border-radius: 30px;
      box-shadow: var(--card-shadow);
    }

    .hero-card {
      background: linear-gradient(140deg, #0c1d85 0%, #465bca 55%, #8da0ff 100%);
      color: #fff;
      overflow: hidden;
      position: relative;
    }

    .hero-card::after {
      content: "";
      position: absolute;
      inset: auto -30px -60px auto;
      width: 220px;
      height: 220px;
      background: rgba(255, 255, 255, 0.14);
      border-radius: 50%;
    }

    .metric-pill {
      background: rgba(255, 255, 255, 0.16);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 24px;
      padding: 1rem 1.1rem;
      backdrop-filter: blur(10px);
    }

    .summary-card {
      border-radius: 24px;
      border: 1px solid #e6ebf5;
      background: #fff;
      box-shadow: 0 18px 30px -24px rgba(15, 23, 42, 0.35);
    }

    .summary-icon {
      width: 50px;
      height: 50px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      background: #eef2ff;
      color: var(--primary-deep);
    }

    .notification-card {
      background: #fff;
      border-radius: 24px;
      border: 1px solid #e7edf7;
      padding: 1.4rem;
      box-shadow: 0 20px 32px -26px rgba(15, 23, 42, 0.45);
      transition: 0.2s ease;
    }

    .notification-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 24px 38px -24px rgba(1, 22, 113, 0.28);
    }

    .notification-card.is-unread {
      border-left: 6px solid var(--primary-deep);
      background: linear-gradient(90deg, #ffffff 0%, #f8faff 100%);
    }

    .notification-icon {
      width: 54px;
      height: 54px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      background: #eef2ff;
      color: var(--primary-deep);
      font-size: 1.25rem;
    }

    .empty-state {
      background: #f8fafc;
      border: 1px dashed #cfd8ea;
    }

    .empty-state-icon {
      width: 68px;
      height: 68px;
      display: grid;
      place-items: center;
      border-radius: 22px;
      background: #eef2ff;
      color: var(--primary-deep);
    }

    .notification-badge {
      min-width: 1.4rem;
    }
</style>
