<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
            <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal">
                <i class="bi bi-briefcase-fill brand-icon"></i>
                <div class="lh-sm ms-2">
                    <span class="brand-text">Workly</span>
                    <span class="brand-sub">Panel de empresa</span>
                </div>
            </a>
            <div class="collapse navbar-collapse show">
                <div class="navbar-nav mx-auto mt-3 mt-lg-0 gap-1">
                    <a href="../publicarvacante" class="nav-link-custom"><i class="bi bi-plus-circle me-1"></i> Publicar</a>
                    <a href="../misvacantes" class="nav-link-custom"><i class="bi bi-briefcase me-1"></i> Mis vacantes</a>
                    <a href="../postulaciones" class="nav-link-custom"><i class="bi bi-people me-1"></i> Postulaciones</a>
                    <a href="../foro" class="nav-link-custom"><i class="bi bi-chat-dots me-1"></i> Foro</a>
                    <a href="../resenaempresa" class="nav-link-custom active"><i class="bi bi-star me-1"></i> Resenas</a>
                </div>
                <div class="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
                    <a href="../notificaciones" class="text-white position-relative d-inline-block">
                        <i class="bi bi-bell-fill fs-3"></i>
                        <span class="notification-badge">0</span>
                    </a>
                    <a href="../perfil" class="text-white d-inline-block">
                        <i class="bi bi-person-circle fs-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <main class="flex-grow-1 py-4 py-lg-5">
        <div class="container-fluid px-4 px-lg-5">
            <section class="surface-card hero-card p-4 p-lg-5 mb-4">
                <div class="row g-4 align-items-center position-relative">
                    <div class="col-12 col-xl-7">
                        <span class="badge rounded-pill text-bg-light text-primary fw-semibold mb-3">Reputacion y referencias</span>
                        <h1 class="display-6 fw-bold mb-2">Gestiona lo que opinan de tu empresa y de tus candidatos</h1>
                        <p class="mb-0 text-white-50">Revisa comentarios de usuarios, deja evaluaciones internas y consulta referencias externas antes de decidir.</p>
                    </div>
                    <div class="col-12 col-xl-5">
                        <div class="row g-3">
                            <div class="col-6">
                                <div class="metric-pill">
                                    <div class="small text-white-50 mb-1">Promedio empresa</div>
                                    <div class="fs-4 fw-bold" id="metricEmpresaPromedio">0.0</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="metric-pill">
                                    <div class="small text-white-50 mb-1">Resenas empresa</div>
                                    <div class="fs-4 fw-bold" id="metricEmpresaTotal">0</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="metric-pill">
                                    <div class="small text-white-50 mb-1">Mis resenas</div>
                                    <div class="fs-4 fw-bold" id="metricMisResenas">0</div>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="metric-pill">
                                    <div class="small text-white-50 mb-1">Referencias externas</div>
                                    <div class="fs-4 fw-bold" id="metricExternas">0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div id="alertContainer" class="mb-3"></div>

            <div class="row g-4">
                <section class="col-12 col-xl-7">
                    <div class="section-card mb-4">
                        <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
                            <div>
                                <h2 class="h4 fw-bold mb-1">Resenas sobre tu empresa</h2>
                                <p class="text-muted mb-0">Lo que los usuarios que postularon quieren destacar de tu proceso.</p>
                            </div>
                            <div class="text-lg-end">
                                <div class="fw-bold fs-4" id="empresaPromedioDetalle">0.0</div>
                                <div class="text-muted small" id="empresaTotalDetalle">0 resenas</div>
                            </div>
                        </div>
                        <div class="d-grid gap-3" id="listaValoracionesEmpresa"></div>
                    </div>

                    <div class="section-card">
                        <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
                            <div>
                                <h2 class="h4 fw-bold mb-1">Referencias externas de tus postulantes</h2>
                                <p class="text-muted mb-0">Opiniones que otras empresas dejaron sobre candidatos que tambien aplicaron contigo.</p>
                            </div>
                            <span class="badge text-bg-light rounded-pill align-self-lg-start" id="badgeReferenciasExternas">0 referencias</span>
                        </div>
                        <div class="d-grid gap-3" id="listaResenasExternas"></div>
                    </div>
                </section>

                <aside class="col-12 col-xl-5">
                    <div class="form-card mb-4">
                        <h2 class="h4 fw-bold mb-3">Crear o actualizar resena de postulante</h2>
                        <p class="text-muted mb-4">Documenta tu experiencia con cada candidato para dar seguimiento mas claro al proceso.</p>
                        <div class="mb-3">
                            <label class="form-label fw-semibold small">Postulacion</label>
                            <select id="id_postulacion_fk" class="form-select rounded-4"></select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold small">Puntuacion</label>
                            <div class="d-flex align-items-center gap-2 mb-2">
                                <i class="bi bi-star star-interactive" data-value="1"></i>
                                <i class="bi bi-star star-interactive" data-value="2"></i>
                                <i class="bi bi-star star-interactive" data-value="3"></i>
                                <i class="bi bi-star star-interactive" data-value="4"></i>
                                <i class="bi bi-star star-interactive" data-value="5"></i>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold small">Comentario</label>
                            <textarea id="comentarioResena" class="form-control rounded-4" rows="4" placeholder="Describe fortalezas, comunicacion, ajuste al perfil y nivel de seguimiento"></textarea>
                        </div>
                        <div class="mb-4">
                            <label class="form-label fw-semibold small">Etiquetas</label>
                            <input id="etiquetasResena" class="form-control rounded-4" placeholder="Ej: puntual, buena comunicacion, perfil tecnico">
                            <div class="form-text">Separalas con comas.</div>
                        </div>
                        <button type="button" id="btnGuardarResena" class="btn btn-primary w-100 rounded-pill py-3">Guardar resena</button>
                    </div>

                    <div class="summary-card mb-4">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h3 class="h5 fw-bold mb-0">Resumen de evaluacion</h3>
                            <span class="badge text-bg-light rounded-pill" id="resumenCobertura">0%</span>
                        </div>
                        <div class="d-flex justify-content-between py-2 border-bottom">
                            <span class="text-muted">Promedio otorgado</span>
                            <strong id="resumenPromedio">0.0</strong>
                        </div>
                        <div class="d-flex justify-content-between py-2 border-bottom">
                            <span class="text-muted">Total resenas</span>
                            <strong id="resumenTotal">0</strong>
                        </div>
                        <div class="d-flex justify-content-between py-2">
                            <span class="text-muted">Postulaciones cubiertas</span>
                            <strong id="resumenResenables">0</strong>
                        </div>
                    </div>

                    <div class="section-card">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h3 class="h5 fw-bold mb-0">Tus ultimas resenas</h3>
                            <span class="badge text-bg-light rounded-pill" id="badgeMisResenas">0 resenas</span>
                        </div>
                        <div class="d-grid gap-3" id="listaResenas"></div>
                    </div>
                </aside>
            </div>
        </div>
    </main>

    <footer class="py-4 mt-auto footer-custom text-center text-white-50">
        <div class="container">Workly 2026 | Seguimiento real del talento y tu reputacion</div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["empresa"]);

  const listaResenas = document.getElementById("listaResenas");
  const listaResenasExternas = document.getElementById("listaResenasExternas");
  const listaValoracionesEmpresa = document.getElementById("listaValoracionesEmpresa");
  const selectPostulacion = document.getElementById("id_postulacion_fk");
  const comentarioInput = document.getElementById("comentarioResena");
  const etiquetasInput = document.getElementById("etiquetasResena");
  const btnGuardar = document.getElementById("btnGuardarResena");
  const alertContainer = document.getElementById("alertContainer");

  const resumenPromedio = document.getElementById("resumenPromedio");
  const resumenTotal = document.getElementById("resumenTotal");
  const resumenCobertura = document.getElementById("resumenCobertura");
  const resumenResenables = document.getElementById("resumenResenables");
  const badgeMisResenas = document.getElementById("badgeMisResenas");
  const badgeReferenciasExternas = document.getElementById("badgeReferenciasExternas");
  const metricEmpresaPromedio = document.getElementById("metricEmpresaPromedio");
  const metricEmpresaTotal = document.getElementById("metricEmpresaTotal");
  const metricMisResenas = document.getElementById("metricMisResenas");
  const metricExternas = document.getElementById("metricExternas");
  const empresaPromedioDetalle = document.getElementById("empresaPromedioDetalle");
  const empresaTotalDetalle = document.getElementById("empresaTotalDetalle");

  let puntuacionActual = 0;
  let postulaciones = [];
  let resenas = [];
  let resenasExternas = [];
  let valoracionesEmpresa = [];
  let resumenEmpresa = { promedio: 0, total_valoraciones: 0 };

  const authHeaders = (withJson = false) => ({
    ...(withJson ? { "Content-Type": "application/json" } : {}),
    Authorization: `Bearer ${getToken()}`
  });

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;

    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show rounded-4 shadow-sm" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Reciente";
    const date = new Date(fecha);
    return Number.isNaN(date.getTime())
      ? "Reciente"
      : date.toLocaleDateString("es-SV", { dateStyle: "medium" });
  };

  const renderStars = (value) => {
    const full = Math.round(Number(value || 0));
    return Array.from({ length: 5 }, (_, index) =>
      `<i class="bi ${index < full ? "bi-star-fill" : "bi-star"}"></i>`
    ).join("");
  };

  const getInitials = (nombre = "", apellido = "") =>
    `${nombre.trim()[0] || ""}${apellido.trim()[0] || ""}`.toUpperCase();

  const renderTags = (tags = []) => {
    if (!tags.length) {
      return '<span class="text-muted small">Sin etiquetas registradas</span>';
    }

    return tags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("");
  };

  const renderEmptyState = (message, icon = "bi-inbox") => `
    <div class="empty-state text-center p-4">
      <div class="mb-2"><i class="bi ${icon} fs-2 text-primary"></i></div>
      <p class="text-muted mb-0">${message}</p>
    </div>
  `;

  const syncStars = () => {
    document.querySelectorAll(".star-interactive").forEach((item) => {
      const active = Number(item.dataset.value) <= puntuacionActual;
      item.classList.toggle("active", active);
      item.classList.toggle("bi-star-fill", active);
      item.classList.toggle("bi-star", !active);
    });
  };

  const resetForm = () => {
    if (selectPostulacion) selectPostulacion.value = "";
    if (comentarioInput) comentarioInput.value = "";
    if (etiquetasInput) etiquetasInput.value = "";
    puntuacionActual = 0;
    syncStars();
  };

  const hydrateFormFromPostulacion = () => {
    const selected = postulaciones.find((item) => Number(item.id_postulacion) === Number(selectPostulacion?.value));

    if (!selected) {
      resetForm();
      return;
    }

    puntuacionActual = Number(selected.puntuacion || 0);
    if (comentarioInput) comentarioInput.value = selected.comentario || "";
    if (etiquetasInput) etiquetasInput.value = Array.isArray(selected.etiquetas) ? selected.etiquetas.join(", ") : "";
    syncStars();
  };

  const renderPostulaciones = () => {
    if (!selectPostulacion) return;

    selectPostulacion.innerHTML = [
      '<option value="">Selecciona una postulacion</option>',
      ...postulaciones.map((item) => {
        const nombre = `${item.nombres} ${item.apellidos}`;
        const estado = item.id_resena ? " | con resena" : "";
        return `<option value="${item.id_postulacion}">${nombre} | ${item.titulo_puesto}${estado}</option>`;
      })
    ].join("");
  };

  const renderMisResenas = () => {
    if (!listaResenas) return;

    if (!resenas.length) {
      listaResenas.innerHTML = renderEmptyState("Todavia no has creado resenas para tus postulantes.", "bi-stars");
      return;
    }

    listaResenas.innerHTML = resenas.map((item) => `
      <article class="review-card">
        <div class="d-flex gap-3">
          <div class="avatar-circle flex-shrink-0">${getInitials(item.nombres, item.apellidos)}</div>
          <div class="flex-grow-1">
            <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
              <div>
                <h3 class="h6 fw-bold mb-1">${item.nombres} ${item.apellidos}</h3>
                <p class="text-muted small mb-0">Postulante a ${item.titulo_puesto}</p>
              </div>
              <small class="text-muted">${formatearFecha(item.fecha_resena)}</small>
            </div>
            <div class="stars mb-2">${renderStars(item.puntuacion)} <span class="text-muted small ms-2">${item.puntuacion}/5</span></div>
            <p class="text-muted mb-3">${item.comentario || "Sin comentario adicional."}</p>
            <div class="d-flex gap-2 flex-wrap">${renderTags(item.etiquetas || [])}</div>
          </div>
        </div>
      </article>
    `).join("");
  };

  const renderValoracionesEmpresa = () => {
    if (!listaValoracionesEmpresa) return;

    if (!valoracionesEmpresa.length) {
      listaValoracionesEmpresa.innerHTML = renderEmptyState("Tu empresa aun no tiene comentarios publicados por usuarios.", "bi-chat-square-heart");
      return;
    }

    listaValoracionesEmpresa.innerHTML = valoracionesEmpresa.map((item) => `
      <article class="review-card">
        <div class="d-flex gap-3">
          <div class="avatar-circle flex-shrink-0">${getInitials(...String(item.nombre_usuario || " ").split(" "))}</div>
          <div class="flex-grow-1">
            <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
              <div>
                <h3 class="h6 fw-bold mb-1">${item.nombre_usuario}</h3>
                <div class="stars">${renderStars(item.puntuacion)} <span class="text-muted small ms-2">${item.puntuacion}/5</span></div>
              </div>
              <small class="text-muted">${formatearFecha(item.fecha_valoracion)}</small>
            </div>
            <p class="text-muted mb-0">${item.comentario || "Sin comentario adicional."}</p>
          </div>
        </div>
      </article>
    `).join("");
  };

  const renderResenasExternas = () => {
    if (!listaResenasExternas) return;

    if (!resenasExternas.length) {
      listaResenasExternas.innerHTML = renderEmptyState("Todavia no hay referencias externas para tus postulantes actuales.", "bi-diagram-3");
      return;
    }

    listaResenasExternas.innerHTML = resenasExternas.map((item) => `
      <article class="review-card">
        <div class="d-flex gap-3">
          <div class="avatar-circle flex-shrink-0">${getInitials(item.nombres, item.apellidos)}</div>
          <div class="flex-grow-1">
            <div class="d-flex flex-column flex-lg-row justify-content-between gap-2 mb-2">
              <div>
                <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
                  <h3 class="h6 fw-bold mb-0">${item.nombres} ${item.apellidos}</h3>
                  <span class="badge text-bg-light rounded-pill">${item.nombre_comercial}</span>
                </div>
                <p class="text-muted small mb-0">Referenciado por ${item.nombre_comercial} para ${item.titulo_puesto}</p>
              </div>
              <small class="text-muted">${formatearFecha(item.fecha_resena)}</small>
            </div>
            <div class="stars mb-2">${renderStars(item.puntuacion)} <span class="text-muted small ms-2">${item.puntuacion}/5</span></div>
            <p class="text-muted mb-3">${item.comentario || "Sin comentario adicional."}</p>
            <div class="d-flex gap-2 flex-wrap">${renderTags(item.etiquetas || [])}</div>
          </div>
        </div>
      </article>
    `).join("");
  };

  const renderResumen = () => {
    const promedioMisResenas = resenas.length
      ? (resenas.reduce((acc, item) => acc + Number(item.puntuacion || 0), 0) / resenas.length).toFixed(1)
      : "0.0";

    const totalResenables = postulaciones.length;
    const cobertura = totalResenables ? Math.round((resenas.length / totalResenables) * 100) : 0;

    if (resumenPromedio) resumenPromedio.textContent = promedioMisResenas;
    if (resumenTotal) resumenTotal.textContent = String(resenas.length);
    if (resumenCobertura) resumenCobertura.textContent = `${cobertura}%`;
    if (resumenResenables) resumenResenables.textContent = String(totalResenables);
    if (badgeMisResenas) badgeMisResenas.textContent = `${resenas.length} resenas`;
    if (badgeReferenciasExternas) badgeReferenciasExternas.textContent = `${resenasExternas.length} referencias`;

    if (metricEmpresaPromedio) metricEmpresaPromedio.textContent = Number(resumenEmpresa.promedio || 0).toFixed(1);
    if (metricEmpresaTotal) metricEmpresaTotal.textContent = String(resumenEmpresa.total_valoraciones || 0);
    if (metricMisResenas) metricMisResenas.textContent = String(resenas.length);
    if (metricExternas) metricExternas.textContent = String(resenasExternas.length);
    if (empresaPromedioDetalle) empresaPromedioDetalle.textContent = `${Number(resumenEmpresa.promedio || 0).toFixed(1)} / 5`;
    if (empresaTotalDetalle) empresaTotalDetalle.textContent = `${resumenEmpresa.total_valoraciones || 0} resenas recibidas`;
  };

  const bindStars = () => {
    document.querySelectorAll(".star-interactive").forEach((star) => {
      star.addEventListener("click", () => {
        puntuacionActual = Number(star.dataset.value);
        syncStars();
      });
    });
  };

  const cargarPanel = async () => {
    const response = await fetch(`${API_URL}/empresa/resenas-postulantes`, {
      headers: authHeaders()
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudieron cargar las resenas.");
    }

    postulaciones = Array.isArray(data.postulaciones) ? data.postulaciones : [];
    resenas = Array.isArray(data.resenas) ? data.resenas : [];
    resenasExternas = Array.isArray(data.resenas_externas) ? data.resenas_externas : [];
    valoracionesEmpresa = Array.isArray(data.valoraciones_empresa) ? data.valoraciones_empresa : [];
    resumenEmpresa = data.resumen_empresa || { promedio: 0, total_valoraciones: 0 };

    renderPostulaciones();
    renderMisResenas();
    renderValoracionesEmpresa();
    renderResenasExternas();
    renderResumen();
  };

  selectPostulacion?.addEventListener("change", hydrateFormFromPostulacion);

  btnGuardar?.addEventListener("click", async () => {
    try {
      if (!selectPostulacion?.value) {
        throw new Error("Selecciona una postulacion.");
      }

      if (!puntuacionActual) {
        throw new Error("Selecciona una puntuacion.");
      }

      if (!comentarioInput?.value.trim()) {
        throw new Error("Escribe una resena.");
      }

      const response = await fetch(`${API_URL}/empresa/resenas-postulantes`, {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({
          id_postulacion_fk: Number(selectPostulacion.value),
          puntuacion: puntuacionActual,
          comentario: comentarioInput.value.trim(),
          etiquetas: etiquetasInput.value.split(",").map((item) => item.trim()).filter(Boolean)
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.mensaje || "No se pudo guardar la resena.");
      }

      showAlert("Resena guardada correctamente.", "success");
      await cargarPanel();
      hydrateFormFromPostulacion();
    } catch (error) {
      console.error(error);
      showAlert(error.message);
    }
  });

  bindStars();
  syncStars();

  cargarPanel().catch((error) => {
    console.error(error);
    showAlert(error.message || "No se pudo cargar la vista.");
  });
});
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

@import url("https://fonts.googleapis.com/css2?family=Inter:opsz@14..32&display=swap");

* { font-family: "Inter", sans-serif; }
        :root {
            --nav-bg: #011671;
            --page-bg: linear-gradient(180deg, #eef4ff 0%, #f9fbff 100%);
            --primary-deep: #3f51b5;
            --surface-shadow: 0 24px 42px -24px rgba(1, 22, 113, 0.28);
        }

        body { background: var(--page-bg); color: #182033; }
        .navbar-custom, .footer-custom { background-color: var(--nav-bg) !important; }
        .nav-link-custom {
            color: white !important;
            font-weight: 500;
            padding: 0.6rem 1.1rem;
            border-radius: 999px;
            background: rgba(255,255,255,0.06);
            text-decoration: none;
            transition: 0.2s ease;
        }
        .nav-link-custom.active, .nav-link-custom:hover { background: rgba(255,255,255,0.16); }
        .brand-icon { font-size: 3.5rem; color: white; margin-right: 0.75rem; }
        .brand-text { color: white; font-weight: 700; font-size: 2rem; line-height: 1.2; }
        .brand-sub { color: #e2e4e8; font-size: 0.95rem; }
        .surface-card {
            background: rgba(255,255,255,0.96);
            border: 1px solid rgba(255,255,255,0.74);
            border-radius: 30px;
            box-shadow: var(--surface-shadow);
        }
        .hero-card {
            background: linear-gradient(135deg, #071a88 0%, #3d56c3 58%, #89a0ff 100%);
            color: white;
            overflow: hidden;
            position: relative;
        }
        .hero-card::after {
            content: "";
            position: absolute;
            width: 260px;
            height: 260px;
            right: -70px;
            bottom: -90px;
            border-radius: 50%;
            background: rgba(255,255,255,0.14);
        }
        .metric-pill {
            background: rgba(255,255,255,0.14);
            border: 1px solid rgba(255,255,255,0.22);
            border-radius: 22px;
            padding: 1rem 1.1rem;
            backdrop-filter: blur(12px);
        }
        .section-card, .review-card, .form-card, .summary-card {
            background: #fff;
            border-radius: 26px;
            border: 1px solid #e7edf7;
            box-shadow: 0 18px 30px -24px rgba(15, 23, 42, 0.35);
        }
        .section-card, .form-card, .summary-card { padding: 1.5rem; }
        .review-card { padding: 1.25rem; }
        .avatar-circle {
            width: 52px;
            height: 52px;
            background: #eef2ff;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-deep);
            font-weight: 700;
            font-size: 1.1rem;
        }
        .stars { color: #ffb347; letter-spacing: 2px; }
        .star-interactive {
            cursor: pointer;
            font-size: 1.8rem;
            color: #cdd2dc;
            transition: color 0.15s ease, transform 0.15s ease;
        }
        .star-interactive:hover,
        .star-interactive.active {
            color: #ffb347;
            transform: translateY(-1px);
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
        .tag-chip {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            padding: 0.45rem 0.8rem;
            background: #f3f6fb;
            color: #42506b;
            font-size: 0.84rem;
            font-weight: 600;
        }
        .empty-state {
            border: 1px dashed #cdd8ea;
            background: #f8fafc;
            border-radius: 24px;
        }

.valoracion-item {
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
  background: #fff;
}

.valoracion-usuario {
  font-weight: 700;
}

.valoracion-meta {
  font-size: 0.9rem;
  color: #6c757d;
}
</style>
