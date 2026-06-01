<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-custom py-3">
        <div class="container-fluid px-4 px-lg-5">
          <a class="navbar-brand text-white fw-bold fs-3 d-flex align-items-center gap-2" href="../principal/index.html">
            <i class="bi bi-briefcase-fill"></i>
            <span>Workly</span>
          </a>

          <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarContent">
            <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
              <a href="../principal/index.html" class="nav-link-custom">Dashboard</a>
              <a href="../postulaciones/index.html" class="nav-link-custom active">Postulaciones</a>
              <a href="../misvacantes/index.html" class="nav-link-custom">Vacantes</a>
              <a href="../foro/index.html" class="nav-link-custom">Foro</a>
            </div>
            <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
              <a href="../notificaciones/index.html" class="text-white position-relative text-decoration-none">
                <i class="bi bi-bell-fill fs-4"></i>
                <span class="notification-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
              </a>
              <a href="../perfil/index.html" class="text-white text-decoration-none">
                <i class="bi bi-building fs-4"></i>
              </a>
              <button class="btn btn-light btn-sm rounded-pill px-3 fw-semibold" id="btnLogout">Cerrar sesion</button>
            </div>
          </div>
        </div>
      </nav>

      <main class="flex-grow-1 py-4 py-lg-5">
        <div class="container px-4 px-lg-5">
          <div class="mb-3">
            <a href="../postulaciones/index.html" class="btn btn-outline-secondary rounded-pill px-4">
              <i class="bi bi-arrow-left me-2"></i>Volver a postulaciones
            </a>
          </div>

          <section class="surface-card hero-card p-4 p-lg-5 mb-4">
            <div class="row g-4 align-items-center position-relative">
              <div class="col-12 col-xl-8">
                <span class="badge rounded-pill text-bg-light text-primary fw-semibold mb-3">Revision de candidato</span>
                <h1 class="display-6 fw-bold mb-2" id="heroNombre">Cargando postulacion...</h1>
                <p class="mb-3 text-white-50" id="heroResumen">Estamos preparando la informacion completa del postulante y la vacante.</p>
                <div class="d-flex flex-wrap gap-2">
                  <span class="badge rounded-pill bg-light text-dark" id="heroVacante">Vacante</span>
                  <span class="badge rounded-pill bg-light text-dark" id="heroFecha">Fecha</span>
                  <span class="badge rounded-pill bg-light text-dark" id="heroEstado">Estado</span>
                </div>
              </div>
              <div class="col-12 col-xl-4">
                <div class="row g-3">
                  <div class="col-6">
                    <div class="metric-card">
                      <div class="metric-icon mb-3"><i class="bi bi-person-lines-fill"></i></div>
                      <div class="small text-muted">Contacto</div>
                      <div class="fw-bold" id="metricContacto">Sin datos</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="metric-card">
                      <div class="metric-icon mb-3"><i class="bi bi-laptop"></i></div>
                      <div class="small text-muted">Modalidad</div>
                      <div class="fw-bold" id="metricModalidad">Sin datos</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="metric-card">
                      <div class="metric-icon mb-3"><i class="bi bi-cash-stack"></i></div>
                      <div class="small text-muted">Salario</div>
                      <div class="fw-bold" id="metricSalario">Sin datos</div>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="metric-card">
                      <div class="metric-icon mb-3"><i class="bi bi-building"></i></div>
                      <div class="small text-muted">Empresa</div>
                      <div class="fw-bold" id="metricEmpresa">Sin datos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="alertContainer" class="mb-3"></div>

          <div class="row g-4">
            <div class="col-12 col-xl-8">
              <section class="detail-card mb-4">
                <div class="d-flex align-items-center gap-3 mb-4">
                  <div class="detail-icon"><i class="bi bi-person-vcard"></i></div>
                  <div>
                    <h2 class="h4 fw-bold mb-0">Perfil del postulante</h2>
                    <p class="text-muted mb-0">Informacion base para decidir el siguiente paso.</p>
                  </div>
                </div>
                <div id="detallePostulante" class="info-grid">
                  <p class="text-muted mb-0">Cargando informacion del postulante...</p>
                </div>
              </section>

              <section class="detail-card">
                <div class="d-flex align-items-center gap-3 mb-4">
                  <div class="detail-icon"><i class="bi bi-briefcase"></i></div>
                  <div>
                    <h2 class="h4 fw-bold mb-0">Vacante asociada</h2>
                    <p class="text-muted mb-0">Contexto de la oportunidad a la que aplico.</p>
                  </div>
                </div>
                <div id="detalleVacante" class="info-grid">
                  <p class="text-muted mb-0">Cargando informacion de la vacante...</p>
                </div>
              </section>
            </div>

            <div class="col-12 col-xl-4">
              <section class="detail-card mb-4">
                <div class="d-flex align-items-center gap-3 mb-4">
                  <div class="detail-icon"><i class="bi bi-diagram-3"></i></div>
                  <div>
                    <h2 class="h4 fw-bold mb-0">Estado del proceso</h2>
                    <p class="text-muted mb-0">Actualiza el seguimiento desde esta misma pantalla.</p>
                  </div>
                </div>
                <div id="detalleEstado">
                  <p class="text-muted mb-0">Cargando estado del proceso...</p>
                </div>
              </section>

              <section class="detail-card mb-4">
                <h3 class="h5 fw-bold mb-3">Acciones rapidas</h3>
                <div class="d-grid gap-2">
                  <button class="btn btn-primary rounded-4" id="btnCopiarCorreo">
                    <i class="bi bi-envelope me-2"></i>Copiar correo
                  </button>
                  <button class="btn btn-outline-primary rounded-4" id="btnContactar">
                    <i class="bi bi-send me-2"></i>Preparar contacto
                  </button>
                </div>
              </section>

              <section class="status-panel">
                <h3 class="h5 fw-bold mb-3">Ruta sugerida</h3>
                <ul class="timeline-list" id="timelineProceso">
                  <li class="timeline-item">
                    <div class="timeline-dot"><i class="bi bi-hourglass-split"></i></div>
                    <div>
                      <div class="fw-semibold">Recibida</div>
                      <div class="text-muted small">La postulacion acaba de entrar al pipeline.</div>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>

      <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toastAccion" class="toast align-items-center text-bg-dark border-0 rounded-4 shadow" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body" id="toastTexto">Accion completada.</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth, logout } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["empresa"]);

  const btnLogout = document.getElementById("btnLogout");
  const alertContainer = document.getElementById("alertContainer");
  const detallePostulante = document.getElementById("detallePostulante");
  const detalleVacante = document.getElementById("detalleVacante");
  const detalleEstado = document.getElementById("detalleEstado");
  const timelineProceso = document.getElementById("timelineProceso");
  const btnCopiarCorreo = document.getElementById("btnCopiarCorreo");
  const btnContactar = document.getElementById("btnContactar");
  const toastTexto = document.getElementById("toastTexto");
  const toastAccion = new bootstrap.Toast(document.getElementById("toastAccion"));

  let currentPostulacion = null;

  btnLogout.addEventListener("click", logout);

  const authHeaders = {
    Authorization: `Bearer ${getToken()}`
  };

  const statusMap = {
    1: { label: "Recibida", className: "text-bg-secondary", icon: "bi-inbox-fill" },
    2: { label: "En revision", className: "text-bg-info", icon: "bi-search" },
    3: { label: "Entrevista", className: "text-bg-warning", icon: "bi-camera-video-fill" },
    4: { label: "Rechazada", className: "text-bg-danger", icon: "bi-x-circle-fill" },
    5: { label: "Contratado", className: "text-bg-success", icon: "bi-check-circle-fill" }
  };

  const processSteps = [
    { id: 1, label: "Recibida", detail: "La empresa ya recibio la postulacion." },
    { id: 2, label: "En revision", detail: "El perfil esta siendo evaluado." },
    { id: 3, label: "Entrevista", detail: "El candidato paso a una conversacion formal." },
    { id: 5, label: "Contratado", detail: "El proceso termino de forma exitosa." }
  ];

  const showAlert = (message, type = "danger") => {
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show rounded-4 shadow-sm" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
  };

  const showToast = (message) => {
    toastTexto.textContent = message;
    toastAccion.show();
  };

  const getPostulacionId = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  };

  const formatDate = (value) => {
    if (!value) {
      return "Sin fecha";
    }

    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "Sin fecha"
      : date.toLocaleDateString("es-SV", { dateStyle: "long" });
  };

  const formatCurrency = (value) => {
    const amount = Number(value);
    if (Number.isNaN(amount)) {
      return "No definido";
    }

    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2
    });
  };

  const getStatusBadge = (id, fallbackName = "Recibida") => {
    const config = statusMap[id] || {
      label: fallbackName,
      className: "text-bg-secondary",
      icon: "bi-dot"
    };

    return `<span class="badge ${config.className} rounded-pill px-3 py-2"><i class="bi ${config.icon} me-2"></i>${config.label}</span>`;
  };

  const buildInfoItem = (label, value) => `
    <div class="info-item">
      <div class="info-label">${label}</div>
      <div class="info-value">${value}</div>
    </div>
  `;

  const renderTimeline = (estadoId) => {
    const isRejected = Number(estadoId) === 4;
    const steps = isRejected
      ? [
          { label: "Recibida", detail: "La empresa recibio la postulacion.", icon: "bi-inbox-fill" },
          { label: "Revision", detail: "El perfil fue revisado por el equipo.", icon: "bi-search" },
          { label: "Cierre", detail: "Se definio un rechazo para esta vacante.", icon: "bi-x-circle-fill" }
        ]
      : processSteps.map((step) => ({
          ...step,
          icon: statusMap[step.id]?.icon || "bi-dot"
        }));

    timelineProceso.innerHTML = steps.map((step) => `
      <li class="timeline-item">
        <div class="timeline-dot"><i class="bi ${step.icon}"></i></div>
        <div>
          <div class="fw-semibold">${step.label}</div>
          <div class="text-muted small">${step.detail}</div>
        </div>
      </li>
    `).join("");
  };

  const updateHero = (data) => {
    document.getElementById("heroNombre").textContent = `${data.nombres} ${data.apellidos}`;
    document.getElementById("heroResumen").textContent = data.resumen_profesional || "El postulante aun no tiene un resumen profesional registrado.";
    document.getElementById("heroVacante").textContent = data.titulo_puesto || "Vacante";
    document.getElementById("heroFecha").textContent = `Postulo el ${formatDate(data.fecha_postulacion)}`;
    document.getElementById("heroEstado").innerHTML = getStatusBadge(data.id_estado_fk, data.nombre_estado);

    document.getElementById("metricContacto").textContent = data.correo_electronico || "Sin correo";
    document.getElementById("metricModalidad").textContent = data.modalidad || "No definida";
    document.getElementById("metricSalario").textContent = formatCurrency(data.salario_offrecido);
    document.getElementById("metricEmpresa").textContent = data.nombre_comercial || "Sin empresa";
  };

  const renderPostulante = (data) => {
    detallePostulante.innerHTML = `
      <div class="row g-3">
        <div class="col-12 col-md-6">${buildInfoItem("Nombre completo", `${data.nombres} ${data.apellidos}`)}</div>
        <div class="col-12 col-md-6">${buildInfoItem("Correo electronico", data.correo_electronico || "No definido")}</div>
        <div class="col-12 col-md-6">${buildInfoItem("Telefono", data.telefono || "No definido")}</div>
        <div class="col-12 col-md-6">${buildInfoItem("Municipio", data.id_municipio_fk || "No definido")}</div>
        <div class="col-12">
          <div class="info-label mb-2">Resumen profesional</div>
          <div class="text-box">${data.resumen_profesional || "Sin resumen profesional por ahora."}</div>
        </div>
      </div>
    `;
  };

  const renderVacante = (data) => {
    detalleVacante.innerHTML = `
      <div class="row g-3">
        <div class="col-12 col-md-6">${buildInfoItem("Puesto", data.titulo_puesto || "No definido")}</div>
        <div class="col-12 col-md-6">${buildInfoItem("Modalidad", data.modalidad || "No definida")}</div>
        <div class="col-12 col-md-6">${buildInfoItem("Salario", formatCurrency(data.salario_offrecido))}</div>
        <div class="col-12 col-md-6">${buildInfoItem("Empresa", data.nombre_comercial || "No definida")}</div>
        <div class="col-12">
          <div class="info-label mb-2">Descripcion del puesto</div>
          <div class="text-box">${data.descripcion_puesto || "La vacante no tiene descripcion disponible."}</div>
        </div>
      </div>
    `;
  };

  const renderEstado = (data) => {
    detalleEstado.innerHTML = `
      <div class="info-item mb-3">
        <div class="info-label">Estado actual</div>
        <div class="info-value">${getStatusBadge(data.id_estado_fk, data.nombre_estado)}</div>
      </div>
      <div class="info-item mb-3">
        <div class="info-label">Fecha de postulacion</div>
        <div class="info-value">${formatDate(data.fecha_postulacion)}</div>
      </div>
      <div class="info-label mb-2">Actualizar proceso</div>
      <select id="selectEstado" class="form-select form-select-lg rounded-4 mb-3">
        <option value="1" ${Number(data.id_estado_fk) === 1 ? "selected" : ""}>Recibida</option>
        <option value="2" ${Number(data.id_estado_fk) === 2 ? "selected" : ""}>En revision</option>
        <option value="3" ${Number(data.id_estado_fk) === 3 ? "selected" : ""}>Entrevista</option>
        <option value="4" ${Number(data.id_estado_fk) === 4 ? "selected" : ""}>Rechazada</option>
        <option value="5" ${Number(data.id_estado_fk) === 5 ? "selected" : ""}>Contratado</option>
      </select>
      <button class="btn btn-primary w-100 rounded-4" id="btnGuardarEstado">
        <i class="bi bi-check2-square me-2"></i>Guardar nuevo estado
      </button>
    `;

    document.getElementById("btnGuardarEstado").addEventListener("click", async () => {
      await actualizarEstado();
    });
  };

  const renderDetalle = (data) => {
    currentPostulacion = data;
    updateHero(data);
    renderPostulante(data);
    renderVacante(data);
    renderEstado(data);
    renderTimeline(data.id_estado_fk);
  };

  const cargarDetalle = async () => {
    try {
      const id = getPostulacionId();

      if (!id) {
        showAlert("No se encontro el id de la postulacion.");
        return;
      }

      const response = await fetch(`${API_URL}/empresa/postulaciones/${id}`, {
        headers: authHeaders
      });

      const data = await response.json();

      if (!response.ok) {
        showAlert(data.mensaje || "No se pudo cargar el detalle.");
        return;
      }

      renderDetalle(data);
    } catch (error) {
      console.error(error);
      showAlert("Error de conexion con el servidor.");
    }
  };

  const actualizarEstado = async () => {
    try {
      if (!currentPostulacion) {
        return;
      }

      const selectEstado = document.getElementById("selectEstado");
      const nuevoEstado = Number(selectEstado.value);

      const response = await fetch(`${API_URL}/postulaciones/${currentPostulacion.id_postulacion}/estado`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders
        },
        body: JSON.stringify({ id_estado_fk: nuevoEstado })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "No se pudo actualizar el estado.");
      }

      currentPostulacion.id_estado_fk = nuevoEstado;
      currentPostulacion.nombre_estado = statusMap[nuevoEstado]?.label || currentPostulacion.nombre_estado;

      renderDetalle(currentPostulacion);
      showAlert("Estado actualizado correctamente.", "success");
      showToast("Estado del proceso actualizado.");
    } catch (error) {
      console.error(error);
      showAlert(error.message || "No se pudo actualizar el estado.");
    }
  };

  btnCopiarCorreo.addEventListener("click", async () => {
    try {
      if (!currentPostulacion?.correo_electronico) {
        showAlert("No hay correo disponible para copiar.");
        return;
      }

      await navigator.clipboard.writeText(currentPostulacion.correo_electronico);
      showToast("Correo copiado al portapapeles.");
    } catch (error) {
      console.error(error);
      showAlert("No se pudo copiar el correo.");
    }
  });

  btnContactar.addEventListener("click", () => {
    if (!currentPostulacion?.correo_electronico) {
      showAlert("No hay correo disponible para este postulante.");
      return;
    }

    const subject = encodeURIComponent(`Seguimiento de postulacion - ${currentPostulacion.titulo_puesto}`);
    const body = encodeURIComponent(`Hola ${currentPostulacion.nombres},%0D%0A%0D%0ATe contactamos para dar seguimiento a tu postulacion.%0D%0A%0D%0ASaludos.`);
    window.location.href = `mailto:${currentPostulacion.correo_electronico}?subject=${subject}&body=${body}`;
  });

  cargarDetalle();
});
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css");

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css");

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

:root {
      --nav-bg: #011671;
      --page-bg: linear-gradient(180deg, #eef4ff 0%, #f8fbff 100%);
      --primary-deep: #3f51b5;
      --card-shadow: 0 24px 40px -18px rgba(1, 22, 113, 0.16);
    }

    body {
      font-family: "Inter", sans-serif;
      background: var(--page-bg);
      color: #172033;
    }

    .navbar-custom {
      background: var(--nav-bg);
    }

    .nav-link-custom {
      color: #fff;
      text-decoration: none;
      padding: 0.65rem 1rem;
      border-radius: 999px;
      transition: 0.2s ease;
    }

    .nav-link-custom:hover,
    .nav-link-custom.active {
      background: rgba(255, 255, 255, 0.12);
    }

    .surface-card {
      background: rgba(255, 255, 255, 0.96);
      border-radius: 30px;
      border: 1px solid rgba(255, 255, 255, 0.72);
      box-shadow: var(--card-shadow);
    }

    .hero-card {
      background: linear-gradient(140deg, #0d1d85 0%, #4b61cb 60%, #95a6ff 100%);
      color: #fff;
      overflow: hidden;
      position: relative;
    }

    .hero-card::after {
      content: "";
      position: absolute;
      width: 260px;
      height: 260px;
      border-radius: 50%;
      right: -80px;
      top: -60px;
      background: rgba(255, 255, 255, 0.12);
    }

    .metric-card,
    .detail-card {
      border-radius: 24px;
      border: 1px solid #e7edf8;
      background: #fff;
      box-shadow: 0 20px 34px -26px rgba(15, 23, 42, 0.38);
    }

    .metric-card {
      padding: 1.2rem;
    }

    .metric-icon,
    .detail-icon {
      width: 52px;
      height: 52px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      background: #eef2ff;
      color: var(--primary-deep);
    }

    .detail-card {
      padding: 1.5rem;
    }

    .info-grid {
      display: grid;
      gap: 1rem;
    }

    .info-item {
      padding: 1rem 1.1rem;
      border-radius: 18px;
      background: #f8faff;
      border: 1px solid #e7edf8;
    }

    .info-label {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: #6b7280;
      margin-bottom: 0.35rem;
      font-weight: 700;
    }

    .info-value {
      font-weight: 600;
      color: #172033;
    }

    .text-box {
      background: linear-gradient(180deg, #f8faff 0%, #f2f6fd 100%);
      border: 1px solid #e6ecf7;
      border-radius: 20px;
      padding: 1rem 1.1rem;
      min-height: 120px;
      color: #4b5563;
      white-space: pre-line;
    }

    .status-panel {
      background: linear-gradient(180deg, #f9fbff 0%, #eff4ff 100%);
      border-radius: 24px;
      border: 1px solid #dfE7f6;
      padding: 1.2rem;
    }

    .timeline-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: grid;
      gap: 1rem;
    }

    .timeline-item {
      display: flex;
      gap: 0.9rem;
      align-items: flex-start;
    }

    .timeline-dot {
      width: 38px;
      height: 38px;
      border-radius: 14px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: #eef2ff;
      color: var(--primary-deep);
      flex-shrink: 0;
    }

    .notification-badge {
      min-width: 1.4rem;
    }

.info-label {
  font-size: 0.92rem;
  color: #6c757d;
}

.info-value {
  font-weight: 600;
  color: #212529;
}

.box-text {
  white-space: pre-line;
  line-height: 1.6;
}
</style>
