<template>
  <div class="d-flex flex-column min-vh-100 recursos-body">
    <nav class="navbar navbar-expand-lg py-3 recursos-nav">
            <div class="container-fluid px-4 px-lg-5">
                <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal">
                    <i class="bi bi-briefcase-fill brand-icon"></i>
                    <div class="lh-sm ms-2">
                        <span class="brand-text">Workly</span>
                        <span class="brand-sub">Panel de empresa</span>
                    </div>
                </a>

                <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarContent">
                    <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
                        <a href="../publicarvacante" class="nav-link-custom">Publicar</a>
                        <a href="../misvacantes" class="nav-link-custom">Mis vacantes</a>
                        <a href="../postulaciones" class="nav-link-custom">Postulaciones</a>
                        <a href="../foro" class="nav-link-custom">Foro</a>
                        <a href="../resenaempresa" class="nav-link-custom">Reseñas</a>
                        <a href="../recursos" class="nav-link-custom active">Recursos</a>
                    </div>

                    <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                        <a href="../notificaciones" class="text-white position-relative text-decoration-none">
                            <i class="bi bi-bell-fill fs-4"></i>
                            <span class="notification-badge badge rounded-pill bg-danger">0</span>
                        </a>
                        <a href="../perfil" class="text-white text-decoration-none">
                            <i class="bi bi-person-circle fs-4"></i>
                        </a>
                    </div>
                </div>
            </div>
        </nav>

        <main class="flex-grow-1 py-4 py-lg-5">
            <div class="container px-4 px-lg-5">
                <section class="hero-card mb-4">
                    <div class="row g-4 align-items-center">
                        <div class="col-12 col-xl-7">
                            <span class="hero-chip">Biblioteca curada</span>
                            <h1 class="hero-title mt-3 mb-3">Recursos listos para reclutar mejor y moverte más rápido.</h1>
                            <p class="hero-copy mb-0">Encuentra guías, plantillas y materiales prácticos para publicar mejor, entrevistar con más criterio y dar seguimiento profesional a cada candidato.</p>
                        </div>
                        <div class="col-12 col-xl-5">
                            <div class="hero-stats">
                                <div class="stat-box">
                                    <span class="stat-label">Recursos</span>
                                    <strong class="stat-value" id="contadorRecursos">6</strong>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-label">Categorías</span>
                                    <strong class="stat-value">4</strong>
                                </div>
                                <div class="stat-box">
                                    <span class="stat-label">Favoritos</span>
                                    <strong class="stat-value">3</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="panel-card mb-4">
                    <div class="row g-3 align-items-end">
                        <div class="col-12 col-lg-6">
                            <label class="form-label fw-semibold">Buscar recurso</label>
                            <div class="search-shell">
                                <i class="bi bi-search text-muted"></i>
                                <input id="inputBuscarRecursos" type="search" class="form-control border-0 shadow-none" placeholder="Guías, entrevistas, plantillas, onboarding...">
                            </div>
                        </div>
                        <div class="col-12 col-md-6 col-lg-3">
                            <label class="form-label fw-semibold">Categoría</label>
                            <select id="filtroCategoria" class="form-select form-select-lg rounded-4 border-0 surface-input">
                                <option value="">Todas las categorías</option>
                                <option value="Reclutamiento">Reclutamiento</option>
                                <option value="Entrevistas">Entrevistas</option>
                                <option value="Evaluacion">Evaluación</option>
                                <option value="Capacitaciones">Capacitaciones</option>
                            </select>
                        </div>
                        <div class="col-12 col-lg-3 d-grid">
                            <button type="button" class="btn btn-primary btn-lg rounded-4" id="btnBuscarRecursos">
                                <i class="bi bi-funnel me-2"></i>Aplicar búsqueda
                            </button>
                        </div>
                    </div>
                </section>

                <div class="row g-4">
                    <section class="col-12 col-xl-8">
                        <div class="panel-card">
                            <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                                <div>
                                    <h2 class="h4 fw-bold mb-1">Biblioteca de recursos</h2>
                                    <p class="text-muted mb-0" id="estadoResultados">Mostrando todos los recursos disponibles.</p>
                                </div>
                                <span class="badge text-bg-light rounded-pill px-3 py-2" id="contadorResultados">6 resultados</span>
                            </div>

                            <div class="row g-4" id="gridRecursos">
                                <div class="col-12 col-md-6 recurso-item" data-categoria="Reclutamiento" data-titulo="Guia para redactar vacantes efectivas">
                                    <article class="resource-card">
                                        <span class="resource-format">PDF</span>
                                        <h3>Guía para redactar vacantes efectivas</h3>
                                        <p>Aprende a escribir descripciones claras, precisas y atractivas para traer candidatos más alineados desde la primera publicación.</p>
                                        <div class="resource-meta">
                                            <span class="tag">Reclutamiento</span>
                                            <span class="tag soft">12 min</span>
                                        </div>
                                        <div class="resource-actions">
                                            <button class="btn btn-outline-primary rounded-pill btn-recurso" data-accion="Ver guía para redactar vacantes efectivas">Ver</button>
                                            <button class="btn btn-primary rounded-pill btn-recurso" data-accion="Descargando guía para redactar vacantes efectivas">Descargar</button>
                                        </div>
                                    </article>
                                </div>

                                <div class="col-12 col-md-6 recurso-item" data-categoria="Entrevistas" data-titulo="Plantilla de entrevista tecnica">
                                    <article class="resource-card">
                                        <span class="resource-format">DOCX</span>
                                        <h3>Plantilla de entrevista técnica</h3>
                                        <p>Una estructura lista para ordenar preguntas, puntajes y observaciones sin improvisar durante la entrevista.</p>
                                        <div class="resource-meta">
                                            <span class="tag">Entrevistas</span>
                                            <span class="tag soft">Editable</span>
                                        </div>
                                        <div class="resource-actions">
                                            <button class="btn btn-outline-primary rounded-pill btn-recurso" data-accion="Abriendo plantilla de entrevista tecnica">Ver</button>
                                            <button class="btn btn-primary rounded-pill btn-recurso" data-accion="Descargando plantilla de entrevista tecnica">Descargar</button>
                                        </div>
                                    </article>
                                </div>

                                <div class="col-12 col-md-6 recurso-item" data-categoria="Evaluacion" data-titulo="Matriz de evaluacion de candidatos">
                                    <article class="resource-card">
                                        <span class="resource-format">XLSX</span>
                                        <h3>Matriz de evaluación de candidatos</h3>
                                        <p>Compara perfiles con criterios uniformes para reducir sesgos y dejar trazabilidad clara de la decisión.</p>
                                        <div class="resource-meta">
                                            <span class="tag">Evaluación</span>
                                            <span class="tag soft">Comparativo</span>
                                        </div>
                                        <div class="resource-actions">
                                            <button class="btn btn-outline-primary rounded-pill btn-recurso" data-accion="Abriendo matriz de evaluacion de candidatos">Ver</button>
                                            <button class="btn btn-primary rounded-pill btn-recurso" data-accion="Descargando matriz de evaluacion de candidatos">Descargar</button>
                                        </div>
                                    </article>
                                </div>

                                <div class="col-12 col-md-6 recurso-item" data-categoria="Capacitaciones" data-titulo="Webinar marca empleadora">
                                    <article class="resource-card">
                                        <span class="resource-format">VIDEO</span>
                                        <h3>Webinar: marca empleadora</h3>
                                        <p>Ideas concretas para mejorar la percepción de tu empresa y fortalecer la atracción de talento desde tus publicaciones.</p>
                                        <div class="resource-meta">
                                            <span class="tag">Capacitaciones</span>
                                            <span class="tag soft">45 min</span>
                                        </div>
                                        <div class="resource-actions">
                                            <button class="btn btn-primary rounded-pill btn-recurso" data-accion="Reproduciendo webinar de marca empleadora">Ver</button>
                                        </div>
                                    </article>
                                </div>

                                <div class="col-12 col-md-6 recurso-item" data-categoria="Entrevistas" data-titulo="Checklist para entrevistas">
                                    <article class="resource-card">
                                        <span class="resource-format">PDF</span>
                                        <h3>Checklist para entrevistas</h3>
                                        <p>Una lista breve para asegurar consistencia en agenda, preguntas, cierre y seguimiento posterior al contacto.</p>
                                        <div class="resource-meta">
                                            <span class="tag">Entrevistas</span>
                                            <span class="tag soft">Checklist</span>
                                        </div>
                                        <div class="resource-actions">
                                            <button class="btn btn-outline-primary rounded-pill btn-recurso" data-accion="Abriendo checklist para entrevistas">Ver</button>
                                            <button class="btn btn-primary rounded-pill btn-recurso" data-accion="Descargando checklist para entrevistas">Descargar</button>
                                        </div>
                                    </article>
                                </div>

                                <div class="col-12 col-md-6 recurso-item" data-categoria="Reclutamiento" data-titulo="Manual de onboarding inicial">
                                    <article class="resource-card">
                                        <span class="resource-format">PDF</span>
                                        <h3>Manual de onboarding inicial</h3>
                                        <p>Recorrido práctico para que la experiencia del nuevo talento empiece con claridad desde el primer día.</p>
                                        <div class="resource-meta">
                                            <span class="tag">Reclutamiento</span>
                                            <span class="tag soft">Onboarding</span>
                                        </div>
                                        <div class="resource-actions">
                                            <button class="btn btn-outline-primary rounded-pill btn-recurso" data-accion="Abriendo manual de onboarding inicial">Ver</button>
                                            <button class="btn btn-primary rounded-pill btn-recurso" data-accion="Descargando manual de onboarding inicial">Descargar</button>
                                        </div>
                                    </article>
                                </div>
                            </div>

                            <div class="empty-state d-none" id="emptyRecursos">
                                <i class="bi bi-journal-x"></i>
                                <h3>No encontramos recursos con ese filtro</h3>
                                <p>Prueba otra palabra o cambia la categoría para ver más materiales.</p>
                            </div>
                        </div>
                    </section>

                    <aside class="col-12 col-xl-4">
                        <div class="sidebar-card mb-4">
                            <h3 class="h5 fw-bold mb-3">Accesos rápidos</h3>
                            <div class="quick-links">
                                <button class="quick-link btn-recurso" data-accion="Abriendo guia para redactar vacantes efectivas">Guía de vacantes</button>
                                <button class="quick-link btn-recurso" data-accion="Abriendo plantilla de entrevista tecnica">Plantilla técnica</button>
                                <button class="quick-link btn-recurso" data-accion="Abriendo checklist para entrevistas">Checklist de entrevistas</button>
                            </div>
                        </div>

                        <div class="sidebar-card mb-4">
                            <h3 class="h5 fw-bold mb-3">Categorías</h3>
                            <div class="category-list">
                                <button class="category-row" data-categoria="">Todas <span>6</span></button>
                                <button class="category-row" data-categoria="Reclutamiento">Reclutamiento <span>2</span></button>
                                <button class="category-row" data-categoria="Entrevistas">Entrevistas <span>2</span></button>
                                <button class="category-row" data-categoria="Evaluacion">Evaluación <span>1</span></button>
                                <button class="category-row" data-categoria="Capacitaciones">Capacitaciones <span>1</span></button>
                            </div>
                        </div>

                        <div class="sidebar-card">
                            <h3 class="h5 fw-bold mb-3">Favoritos del equipo</h3>
                            <ul class="favorite-list mb-0">
                                <li>Formato de evaluación de candidato</li>
                                <li>Webinar de reclutamiento moderno</li>
                                <li>Checklist para entrevistas</li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>

        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="toastAccion" class="toast align-items-center border-0 rounded-4 shadow" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body" id="toastTexto"></div>
                    <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
                </div>
            </div>
        </div>

        <footer class="footer-custom py-4 mt-auto text-center text-white-50">
            <div class="container">
                <span>Workly 2026 | Recursos para contratar con más orden y criterio</span>
            </div>
        </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(() => {
  requireAuth(["empresa"]);

  const inputBuscar = document.getElementById("inputBuscarRecursos");
  const filtroCategoria = document.getElementById("filtroCategoria");
  const btnBuscar = document.getElementById("btnBuscarRecursos");
  const gridRecursos = document.getElementById("gridRecursos");
  const emptyRecursos = document.getElementById("emptyRecursos");
  const contadorResultados = document.getElementById("contadorResultados");
  const estadoResultados = document.getElementById("estadoResultados");
  const contadorRecursos = document.getElementById("contadorRecursos");
  const toastElement = document.getElementById("toastAccion");
  const toastTexto = document.getElementById("toastTexto");

  const toast = toastElement ? new bootstrap.Toast(toastElement) : null;

  const normalizar = (valor = "") =>
    valor
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const obtenerRecursos = () => [...document.querySelectorAll(".recurso-item")];

  const actualizarEstado = (visibles) => {
    contadorResultados.textContent = `${visibles} resultado${visibles === 1 ? "" : "s"}`;
    contadorRecursos.textContent = String(obtenerRecursos().length);

    if (visibles === obtenerRecursos().length) {
      estadoResultados.textContent = "Mostrando todos los recursos disponibles.";
      return;
    }

    estadoResultados.textContent = visibles
      ? "Mostrando solo los recursos que coinciden con tu búsqueda."
      : "No hubo coincidencias con los filtros actuales.";
  };

  const aplicarFiltros = () => {
    const termino = normalizar(inputBuscar?.value || "");
    const categoria = normalizar(filtroCategoria?.value || "");

    let visibles = 0;

    obtenerRecursos().forEach((item) => {
      const titulo = normalizar(item.dataset.titulo || "");
      const itemCategoria = normalizar(item.dataset.categoria || "");
      const coincideTexto = !termino || titulo.includes(termino);
      const coincideCategoria = !categoria || itemCategoria === categoria;
      const visible = coincideTexto && coincideCategoria;

      item.classList.toggle("d-none", !visible);
      if (visible) visibles += 1;
    });

    emptyRecursos.classList.toggle("d-none", visibles > 0);
    gridRecursos.classList.toggle("d-none", visibles === 0);
    actualizarEstado(visibles);
  };

  const mostrarToast = (mensaje) => {
    if (!toast || !toastTexto) return;
    toastTexto.innerHTML = `<i class="bi bi-info-circle-fill me-2"></i>${mensaje}`;
    toast.show();
  };

  btnBuscar?.addEventListener("click", aplicarFiltros);
  inputBuscar?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      aplicarFiltros();
    }
  });

  filtroCategoria?.addEventListener("change", aplicarFiltros);

  document.querySelectorAll(".category-row").forEach((button) => {
    button.addEventListener("click", () => {
      filtroCategoria.value = button.dataset.categoria || "";
      aplicarFiltros();
    });
  });

  document.querySelectorAll(".btn-recurso").forEach((button) => {
    button.addEventListener("click", () => {
      mostrarToast(button.dataset.accion || "Accion ejecutada.");
    });
  });

  aplicarFiltros();
});
</script>

<style>

:root {
  --nav-bg: #04154b;
  --primary: #275df5;
  --primary-soft: #eef3ff;
  --text-main: #182033;
  --text-soft: #6a7488;
  --panel-shadow: 0 24px 45px -20px rgba(4, 21, 75, 0.18);
}

* {
  font-family: "Inter", sans-serif;
}

body.recursos-body {
  background:
    radial-gradient(circle at top right, rgba(39, 93, 245, 0.12), transparent 28%),
    linear-gradient(180deg, #eef4ff 0%, #f8fbff 100%);
  color: var(--text-main);
}

.recursos-nav,
.footer-custom {
  background: var(--nav-bg);
}

.brand-icon {
  color: #fff;
  font-size: 2rem;
}

.brand-text {
  color: #fff;
  display: block;
  font-size: 1.8rem;
  font-weight: 800;
}

.brand-sub {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.9rem;
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
  background: rgba(255, 255, 255, 0.14);
}

.notification-badge {
  min-width: 1.35rem;
}

.hero-card,
.panel-card,
.sidebar-card {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.82);
  border-radius: 32px;
  box-shadow: var(--panel-shadow);
}

.hero-card {
  padding: 2rem;
  background:
    linear-gradient(135deg, #082070 0%, #275df5 58%, #90adff 100%);
  color: #fff;
  overflow: hidden;
  position: relative;
}

.hero-card::after {
  content: "";
  position: absolute;
  inset: auto -40px -60px auto;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  padding: 0.55rem 1rem;
  font-weight: 700;
  font-size: 0.88rem;
}

.hero-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.05;
}

.hero-copy {
  max-width: 58ch;
  color: rgba(255, 255, 255, 0.82);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-box {
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 24px;
  padding: 1rem;
  backdrop-filter: blur(8px);
}

.stat-label {
  display: block;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.82rem;
  margin-bottom: 0.35rem;
}

.stat-value {
  font-size: 1.7rem;
  font-weight: 800;
}

.panel-card,
.sidebar-card {
  padding: 1.6rem;
}

.search-shell {
  align-items: center;
  background: var(--primary-soft);
  border-radius: 22px;
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
}

.search-shell input,
.surface-input {
  background: var(--primary-soft);
}

.search-shell input {
  padding: 0;
}

.resource-card {
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border: 1px solid #e5edff;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  padding: 1.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.resource-card:hover {
  box-shadow: 0 20px 34px -24px rgba(39, 93, 245, 0.45);
  transform: translateY(-3px);
}

.resource-format {
  align-self: flex-start;
  background: #dfe9ff;
  border-radius: 999px;
  color: var(--primary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  padding: 0.45rem 0.85rem;
  text-transform: uppercase;
}

.resource-card h3 {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}

.resource-card p {
  color: var(--text-soft);
  margin: 0;
}

.resource-meta,
.resource-actions,
.quick-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  background: #eff4ff;
  border-radius: 999px;
  color: var(--primary);
  font-size: 0.82rem;
  font-weight: 700;
  padding: 0.45rem 0.8rem;
}

.tag.soft {
  color: #5d6b86;
}

.quick-link,
.category-row {
  background: #fff;
  border: 1px solid #e7edf9;
  border-radius: 18px;
  color: var(--text-main);
  padding: 0.85rem 1rem;
  text-align: left;
  transition: 0.2s ease;
  width: 100%;
}

.quick-link:hover,
.category-row:hover {
  border-color: #cdddff;
  box-shadow: 0 12px 22px -20px rgba(39, 93, 245, 0.6);
}

.category-list {
  display: grid;
  gap: 0.75rem;
}

.category-row {
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.category-row span {
  color: var(--text-soft);
  font-weight: 700;
}

.favorite-list {
  color: var(--text-soft);
  display: grid;
  gap: 0.8rem;
  padding-left: 1.1rem;
}

.empty-state {
  align-items: center;
  background: #f8fbff;
  border: 1px dashed #c8d8ff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
  padding: 2.5rem 1.5rem;
  text-align: center;
}

.empty-state i {
  color: var(--primary);
  font-size: 2.4rem;
}

#toastAccion {
  background: #102a7a;
  color: #fff;
}

@media (max-width: 991px) {
  .hero-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .hero-card,
  .panel-card,
  .sidebar-card {
    border-radius: 24px;
    padding: 1.25rem;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .resource-actions .btn {
    width: 100%;
  }
}
</style>
