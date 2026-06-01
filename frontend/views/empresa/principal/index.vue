<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
            <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal">
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
                    <a href="../publicarvacante" class="nav-link-custom text-decoration-none">
                        <i class="bi bi-plus-circle me-1"></i> Publicar
                    </a>
                    <a href="../misvacantes" class="nav-link-custom text-decoration-none">
                        <i class="bi bi-briefcase me-1"></i> Mis vacantes
                    </a>
                    <a href="../postulaciones" class="nav-link-custom text-decoration-none">
                        <i class="bi bi-people me-1"></i> Postulaciones
                    </a>
                    <a href="../foro" class="nav-link-custom text-decoration-none">
                        <i class="bi bi-chat-dots me-1"></i> Foro
                    </a>
                    <a href="../resenaempresa" class="nav-link-custom text-decoration-none">
                        <i class="bi bi-star me-1"></i> Reseñas
                    </a>
                </div>

                <div class="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
                    <a href="../notificaciones" class="text-white position-relative d-inline-block">
                        <i class="bi bi-bell-fill fs-3"></i>
                        <span class="notification-badge">2</span>
                    </a>
                    <a href="../perfil" class="text-white d-inline-block">
                        <i class="bi bi-person-circle fs-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <main class="flex-grow-1 py-4">
        <div class="container-fluid px-4 px-lg-5">

            <div class="filter-bar mb-5 d-flex align-items-center flex-wrap">
                <div class="d-flex align-items-center me-auto">
                    <i class="bi bi-speedometer2 fs-3 me-3" style="color: var(--primary-deep);"></i>
                    <h4 class="fw-bold mb-0 glow-text" style="color: #121826;">Panel de Control</h4>
                </div>
                <div class="d-flex gap-2 align-items-center mt-2 mt-sm-0">
                    <div class="input-group" style="max-width: 280px;">
                        <span class="input-group-text bg-transparent border-0 text-muted">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" id="inputBusquedaDashboard" class="form-control bg-transparent border-0 shadow-none" 
                               placeholder="Buscar vacantes o postulantes...">
                    </div>
                    <button type="button" id="btnBuscarDashboard" class="btn btn-outline-primary-deep px-4">
                        <i class="bi bi-search me-1"></i> Buscar
                    </button>
                    <button type="button" id="btnIrPublicarVacante" class="btn btn-primary-deep px-4">
                        <i class="bi bi-plus-lg me-1"></i> Publicar Vacante
                    </button>
                </div>
            </div>
            <div id="alertContainer"></div>

            <div class="row g-4 mb-5">
                <div class="col-6 col-md-3">
                    <div class="metric-card text-center">
                        <div class="bg-light rounded-4 p-3 d-inline-flex mb-3">
                            <i class="bi bi-eye-fill fs-1" style="color: var(--primary-deep);"></i>
                        </div>
                        <h2 class="fw-bold mb-1 counter" data-target="1850">0</h2>
                        <p class="text-secondary small fw-medium mb-0">Vistas totales</p>
                        <small class="text-success"><i class="bi bi-arrow-up-short"></i> +12% esta semana</small>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="metric-card text-center">
                        <div class="bg-light rounded-4 p-3 d-inline-flex mb-3">
                            <i class="bi bi-people-fill fs-1" style="color: var(--primary-deep);"></i>
                        </div>
                        <h2 class="fw-bold mb-1" id="totalPostulaciones">0</h2>
                        <p class="text-secondary small fw-medium mb-0">Postulantes</p>
                        <small class="text-success" id="textoPostulacionesResumen"><i class="bi bi-arrow-up-short"></i> Datos en vivo</small>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="metric-card text-center">
                        <div class="bg-light rounded-4 p-3 d-inline-flex mb-3">
                            <i class="bi bi-briefcase-fill fs-1" style="color: var(--primary-deep);"></i>
                        </div>
                        <h2 class="fw-bold mb-1" id="totalVacantes">0</h2>
                        <p class="text-secondary small fw-medium mb-0">Vacantes activas</p>
                        <small class="text-warning" id="textoVacantesResumen"><i class="bi bi-clock"></i> Datos en vivo</small>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="metric-card text-center">
                        <div class="bg-light rounded-4 p-3 d-inline-flex mb-3">
                            <i class="bi bi-star-fill fs-1" style="color: #ffb347;"></i>
                        </div>
                        <h2 class="fw-bold mb-1" id="calificacionPromedio">0.0</h2>
                        <p class="text-secondary small fw-medium mb-0">Calificación</p>
                        <small><i class="bi bi-star-fill text-warning"></i> <span id="totalResenas">+0 reseñas</span></small>
                    </div>
                </div>
            </div>

            <div class="row g-4">

                <section class="col-12 col-lg-8">

                    <div class="main-card">
                        <div class="d-flex align-items-center gap-3 mb-4">
                            <div class="bg-light p-3 rounded-4">
                                <i class="bi bi-megaphone fs-3" style="color: var(--primary-deep);"></i>
                            </div>
                            <div>
                                <h5 class="fw-bold mb-0" style="color: #121826;">Crear publicación</h5>
                                <p class="text-secondary small mb-0">Comparte novedades, vacantes o cultura empresarial</p>
                            </div>
                        </div>

                        <textarea id="textareaPublicacion" class="form-control border-0 shadow-none px-0 mb-4" 
                                  rows="3" placeholder="¿Qué quieres compartir hoy?" 
                                  style="font-size: 1.1rem; resize: none; font-weight: 400;"></textarea>

                        <div class="d-flex flex-wrap align-items-center justify-content-between">
                            <div class="d-flex flex-wrap gap-2">
                                <span class="badge-category active"><i class="bi bi-briefcase me-1"></i>Vacante</span>
                                <span class="badge-category"><i class="bi bi-newspaper me-1"></i>Noticia</span>
                                <span class="badge-category"><i class="bi bi-emoji-smile me-1"></i>Cultura</span>
                                <span class="badge-category"><i class="bi bi-calendar-event me-1"></i>Evento</span>
                            </div>
                            <div class="d-flex gap-2 mt-3 mt-sm-0">
                                <button type="button" id="btnGuardarPub" class="btn btn-outline-primary-deep px-4 fw-semibold">
                                    <i class="bi bi-bookmark me-1"></i> Borrador
                                </button>
                                <button type="button" id="btnPublicarPub" class="btn btn-primary-deep px-4 fw-semibold">
                                    <i class="bi bi-send me-1"></i> Publicar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="d-flex align-items-center justify-content-between mb-4 mt-2">
                        <h5 class="fw-bold mb-0" style="color: #121826;"><i class="bi bi-star-fill text-warning me-2"></i>Reseñas recientes de candidatos</h5>
                        <a href="../resenaempresa" class="text-decoration-none fw-semibold" style="color: var(--primary-deep);">
                            Ver todas <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>

                    <div v-if="resenas.length === 0" class="text-center p-5 bg-white rounded-4 border mb-4 shadow-sm">
                        <i class="bi bi-star text-muted fs-1 mb-3 d-block"></i>
                        <h6 class="fw-bold text-secondary">Aún no hay reseñas</h6>
                        <p class="small text-muted mb-0">Cuando los candidatos evalúen tu empresa, aparecerán aquí.</p>
                    </div>

                    <article v-else v-for="resena in resenas.slice(0, 3)" :key="resena.id_valoracion" class="review-card mb-4">
                        <div class="d-flex gap-3 mb-3">
                            <div class="flex-shrink-0">
                                <div class="bg-light p-3 rounded-4 shadow-sm d-flex align-items-center justify-content-center" style="width: 56px; height: 56px;">
                                    <i class="bi bi-person-fill fs-3" style="color: var(--primary-deep);"></i>
                                </div>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 class="fw-bold mb-1" style="color: #121826;">{{ resena.nombre_usuario || resena.Candidato || 'Candidato' }}</h6>
                                        <span class="text-secondary small"><i class="bi bi-clock me-1"></i>{{ formatDateTimeVue(resena.fecha_valoracion) }}</span>
                                    </div>
                                    <div class="text-warning">
                                        <i v-for="n in 5" :key="n" class="bi" :class="n <= resena.puntuacion ? 'bi-star-fill' : 'bi-star'"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="text-secondary mb-0" style="font-size: 1rem;">"{{ resena.comentario }}"</p>
                    </article>
                    <div class="main-card">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="fw-bold mb-0"><i class="bi bi-bar-chart-line me-2" style="color: var(--primary-deep);"></i>Actividad semanal</h6>
                            <span class="text-secondary small">Últimos 7 días</span>
                        </div>
                        <div class="row align-items-end g-3" style="min-height: 140px;">
                            <div class="col text-center">
                                <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                                    <div style="width: 30px; background: var(--primary-deep); height: 35px; border-radius: 12px 12px 4px 4px; opacity: 0.7;"></div>
                                </div>
                                <small>Lun</small>
                            </div>
                            <div class="col text-center">
                                <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                                    <div style="width: 30px; background: var(--primary-deep); height: 48px; border-radius: 12px 12px 4px 4px; opacity: 0.8;"></div>
                                </div>
                                <small>Mar</small>
                            </div>
                            <div class="col text-center">
                                <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                                    <div style="width: 30px; background: var(--primary-deep); height: 60px; border-radius: 12px 12px 4px 4px;"></div>
                                </div>
                                <small>Mié</small>
                            </div>
                            <div class="col text-center">
                                <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                                    <div style="width: 30px; background: var(--primary-deep); height: 42px; border-radius: 12px 12px 4px 4px; opacity: 0.8;"></div>
                                </div>
                                <small>Jue</small>
                            </div>
                            <div class="col text-center">
                                <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                                    <div style="width: 30px; background: var(--primary-deep); height: 55px; border-radius: 12px 12px 4px 4px; opacity: 0.9;"></div>
                                </div>
                                <small>Vie</small>
                            </div>
                            <div class="col text-center">
                                <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                                    <div style="width: 30px; background: var(--primary-deep); height: 30px; border-radius: 12px 12px 4px 4px; opacity: 0.6;"></div>
                                </div>
                                <small>Sáb</small>
                            </div>
                            <div class="col text-center">
                                <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                                    <div style="width: 30px; background: var(--primary-deep); height: 20px; border-radius: 12px 12px 4px 4px; opacity: 0.5;"></div>
                                </div>
                                <small>Dom</small>
                            </div>
                        </div>
                    </div>

                </section>

                <aside class="col-12 col-lg-4">

                    <div class="sidebar-card">
                        <h6 class="fw-bold mb-3 d-flex align-items-center">
                            <i class="bi bi-briefcase-fill me-2" style="color: var(--primary-deep);"></i>Vacantes activas
                        </h6>
                        <div class="d-flex align-items-center justify-content-between mb-2">
                            <span class="fw-bold fs-4">12</span>
                            <span class="badge bg-success bg-opacity-10 text-success px-3 py-1 rounded-pill">+2 esta semana</span>
                        </div>
                        <div class="activity-bar mb-3">
                            <div class="activity-fill" style="width: 75%;"></div>
                        </div>
                        <p class="text-secondary small">75% de ocupación · 3 vacantes críticas</p>
                        <button class="btn btn-outline-primary-deep w-100 mt-3" @click="window.location.href='../misvacantes'">
                            Gestionar vacantes <i class="bi bi-arrow-right ms-1"></i>
                        </button>
                    </div>

                    <div class="sidebar-card">
                        <h6 class="fw-bold mb-3 d-flex align-items-center">
                            <i class="bi bi-person-plus me-2" style="color: var(--primary-deep);"></i>Postulantes recientes
                        </h6>
                        <ul class="list-unstyled mb-0">
                            <li class="d-flex align-items-center gap-3 mb-3">
                                <div class="position-relative">
                                    <i class="bi bi-person-circle fs-2" style="color: var(--primary-deep);"></i>
                                    <span class="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-white" style="width: 10px; height: 10px;"></span>
                                </div>
                                <div class="flex-grow-1">
                                    <span class="fw-semibold">Carlos Ruiz</span>
                                    <p class="small text-secondary mb-0">Backend Developer · 2h</p>
                                </div>
                                <span class="badge bg-warning bg-opacity-15 text-warning">Nuevo</span>
                            </li>
                            <li class="d-flex align-items-center gap-3 mb-3">
                                <i class="bi bi-person-circle fs-2" style="color: #5a6ab0;"></i>
                                <div class="flex-grow-1">
                                    <span class="fw-semibold">María García</span>
                                    <p class="small text-secondary mb-0">Frontend · 5h</p>
                                </div>
                            </li>
                            <li class="d-flex align-items-center gap-3 mb-3">
                                <i class="bi bi-person-circle fs-2" style="color: #6b7fc9;"></i>
                                <div class="flex-grow-1">
                                    <span class="fw-semibold">José Méndez</span>
                                    <p class="small text-secondary mb-0">DevOps · 1d</p>
                                </div>
                            </li>
                        </ul>
                        <button class="btn btn-outline-primary-deep w-100 mt-2" @click="window.location.href='../postulaciones'">
                            Ver todos (48) <i class="bi bi-arrow-right ms-1"></i>
                        </button>
                    </div>

                    <div class="sidebar-card">
                        <h6 class="fw-bold mb-3 d-flex align-items-center">
                            <i class="bi bi-journal-text me-2" style="color: var(--primary-deep);"></i>Recursos destacados
                        </h6>
                        <div class="d-flex flex-column gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-light p-3 rounded-4"><i class="bi bi-file-earmark-text fs-5" style="color: var(--primary-deep);"></i></div>
                                <div><span class="fw-medium">Guía para redactar vacantes</span><br><small class="text-secondary">12 min lectura</small></div>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <div class="bg-light p-3 rounded-4"><i class="bi bi-people fs-5" style="color: var(--primary-deep);"></i></div>
                                <div><span class="fw-medium">Plantilla de entrevista técnica</span><br><small class="text-secondary">Descargable</small></div>
                            </div>
                        </div>
                        <button class="btn btn-outline-primary-deep w-100 mt-4" @click="window.location.href='../recursos'">
                            Explorar biblioteca <i class="bi bi-box-arrow-up-right ms-1"></i>
                        </button>
                    </div>

                    <div class="sidebar-card">
                        <h6 class="fw-bold mb-3 d-flex align-items-center">
                            <i class="bi bi-lightning-charge me-2" style="color: var(--primary-deep);"></i>Accesos rápidos
                        </h6>
                        <div class="d-grid gap-2">
                            <a href="../foro" class="btn btn-light text-start rounded-4 py-3 d-flex align-items-center">
                                <i class="bi bi-chat-dots-fill me-3 fs-5" style="color: var(--primary-deep);"></i> Foro de empresas
                            </a>
                            <a href="../resenaempresa" class="btn btn-light text-start rounded-4 py-3 d-flex align-items-center">
                                <i class="bi bi-star-fill me-3 fs-5" style="color: #ffb347;"></i> Reseñas recibidas
                            </a>
                            <a href="../perfil" class="btn btn-light text-start rounded-4 py-3 d-flex align-items-center">
                                <i class="bi bi-building me-3 fs-5" style="color: var(--primary-deep);"></i> Editar perfil empresa
                            </a>
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    </main>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toastGuardado" class="toast align-items-center text-white border-0 rounded-4 shadow mb-2" role="alert" style="background-color: #2ecc71;">
            <div class="d-flex">
                <div class="toast-body fs-6 py-3 fw-semibold">
                    <i class="bi bi-floppy-fill me-2 fs-5"></i> Borrador guardado correctamente.
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
        <div id="toastPublicado" class="toast align-items-center text-white border-0 rounded-4 shadow" role="alert" style="background-color: var(--primary-deep);">
            <div class="d-flex">
                <div class="toast-body fs-6 py-3 fw-semibold">
                    <i class="bi bi-send-check-fill me-2 fs-5"></i> ¡Publicación realizada con éxito!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    </div>

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

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { API_URL, getToken, getUsuario, navigateTo } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";
import {
  addCompanyForumComment,
  createCompanyForumPost,
  getCompanyForumPosts,
  incrementCompanyForumMetric,
  toggleCompanyForumSave
} from "../../../assets/js/shared/empresaForum.js";

// VARIABLES REACTIVAS PARA LAS RESEÑAS
const resenas = ref([]);

onMounted(async () => {
  requireAuth(["empresa"]);

  const alertContainer = document.getElementById("alertContainer");
  const totalVacantes = document.getElementById("totalVacantes");
  const totalPostulaciones = document.getElementById("totalPostulaciones");
  const textoVacantesResumen = document.getElementById("textoVacantesResumen");
  const textoPostulacionesResumen = document.getElementById("textoPostulacionesResumen");
  
  const calificacionPromedio = document.getElementById("calificacionPromedio");
  const totalResenas = document.getElementById("totalResenas");
  
  const inputBusquedaDashboard = document.getElementById("inputBusquedaDashboard");
  const btnBuscarDashboard = document.getElementById("btnBuscarDashboard");
  const btnIrPublicarVacante = document.getElementById("btnIrPublicarVacante");
  let btnGuardarPub = document.getElementById("btnGuardarPub");
  let btnPublicarPub = document.getElementById("btnPublicarPub");
  const textareaPublicacion = document.getElementById("textareaPublicacion");

  let dashboardData = {
    ultimasVacantes: [],
    ultimasPostulaciones: []
  };

  // FUNCIONES DE FECHAS (VUE VS VANILLA)
  const formatDateTimeVue = (value) => {
    if (!value) return "Reciente";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Reciente";
    return date.toLocaleDateString("es-SV", { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getSidebarCardByTitle = (title) =>
    [...document.querySelectorAll(".sidebar-card")].find((card) =>
      card.querySelector("h6")?.textContent?.toLowerCase().includes(title.toLowerCase())
    );

  const getPublicationFeedRoot = () => {
    let root = document.getElementById("feedPrincipalEmpresa");
    if (root) return root;

    const publicationCard = btnPublicarPub?.closest(".main-card");
    if (!publicationCard) return null;

    // Aquí evitamos borrar las reseñas porque les cambiamos la clase a .review-card
    [...document.querySelectorAll("section.col-12.col-lg-8 > .post-card")].forEach((card) => card.remove());

    publicationCard.insertAdjacentHTML(
      "afterend",
      `
        <div class="d-flex align-items-center justify-content-between mb-3 mt-4">
          <h5 class="fw-bold mb-0" style="color: #121826;">Publicaciones recientes del foro</h5>
          <a href="../foro" class="text-decoration-none fw-semibold" style="color: var(--primary-deep);">
            Ver foro completo <i class="bi bi-arrow-right"></i>
          </a>
        </div>
        <div id="feedPrincipalEmpresa"></div>
      `
    );

    return document.getElementById("feedPrincipalEmpresa");
  };

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show rounded-4 shadow-sm mb-4" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
      </div>
    `;
  };

  const showToast = (id, fallbackMessage) => {
    const element = document.getElementById(id);
    if (element && window.bootstrap?.Toast) {
      new window.bootstrap.Toast(element).show();
      return;
    }
    showAlert(fallbackMessage, "success");
  };

  const replaceNode = (node) => {
    if (!node) return null;
    const clone = node.cloneNode(true);
    node.replaceWith(clone);
    return clone;
  };

  const getCompanyDisplayName = () => {
    const usuario = getUsuario();
    return usuario?.nombre_comercial || usuario?.empresa || usuario?.correo_electronico || "Empresa";
  };

  const getCompanyInitials = () =>
    getCompanyDisplayName()
      .split(" ")
      .map((part) => part.trim().charAt(0))
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "EM";

  const formatDateTime = (value) => {
    if (!value) return "Reciente";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Reciente";
    return date.toLocaleString("es-SV", { dateStyle: "medium", timeStyle: "short" });
  };

  const renderForumFeed = () => {
    const root = getPublicationFeedRoot();
    if (!root) return;

    const posts = getCompanyForumPosts().slice(0, 3);

    if (!posts.length) {
      root.innerHTML = `
        <div class="post-card text-center">
          <p class="text-muted mb-0">Todavia no hay publicaciones en el foro.</p>
        </div>
      `;
      return;
    }

    root.innerHTML = posts.map((post) => `
      <article class="post-card">
        <div class="d-flex gap-3 mb-3">
          <div class="bg-light rounded-4 shadow-sm d-flex align-items-center justify-content-center fw-bold" style="width: 64px; height: 64px; color: var(--primary-deep);">
            ${post.authorInitials}
          </div>
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-start gap-3">
              <div>
                <h6 class="fw-bold mb-1" style="color: #121826;">${post.companyName}</h6>
                <div class="d-flex flex-wrap gap-2 align-items-center">
                  <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill px-3 py-2">${post.category}</span>
                  <span class="text-secondary small"><i class="bi bi-clock me-1"></i>${formatDateTime(post.createdAt)}</span>
                </div>
              </div>
              <a href="../foro" class="btn btn-sm btn-outline-primary-deep rounded-pill">Abrir foro</a>
            </div>
          </div>
        </div>
        <h5 class="fw-bold mb-2">${post.title}</h5>
        <p class="text-secondary mb-4">${post.content}</p>
        <div class="d-flex flex-wrap gap-2 mb-3">
          <button type="button" class="btn btn-sm btn-light rounded-pill px-4" data-action="like" data-id="${post.id}">
            <i class="bi bi-hand-thumbs-up"></i> ${post.likes}
          </button>
          <button type="button" class="btn btn-sm btn-light rounded-pill px-4" data-action="comment" data-id="${post.id}" data-title="${post.title}">
            <i class="bi bi-chat"></i> ${post.comments.length}
          </button>
          <button type="button" class="btn btn-sm btn-light rounded-pill px-4" data-action="share" data-id="${post.id}">
            <i class="bi bi-share"></i> ${post.shares}
          </button>
          <button type="button" class="btn btn-sm btn-light rounded-pill px-4" data-action="save" data-id="${post.id}">
            <i class="bi ${post.saved ? "bi-bookmark-check-fill" : "bi-bookmark"}"></i> ${post.saved ? "Guardado" : "Guardar"}
          </button>
        </div>
        <div class="bg-light rounded-4 p-3">
          <div class="small fw-semibold mb-2">Comentarios recientes</div>
          ${
            post.comments.length
              ? post.comments.slice(-2).reverse().map((comment) => `
                  <div class="border rounded-4 bg-white p-3 mb-2">
                    <div class="fw-semibold small">${comment.author}</div>
                    <div class="text-muted small mb-1">${formatDateTime(comment.createdAt)}</div>
                    <div>${comment.content}</div>
                  </div>
                `).join("")
              : '<div class="text-muted small">Todavia no hay comentarios en esta publicacion.</div>'
          }
        </div>
      </article>
    `).join("");

    root.querySelectorAll("[data-action='like']").forEach((button) => {
      button.addEventListener("click", () => {
        incrementCompanyForumMetric(button.dataset.id, "likes");
        renderForumFeed();
        showAlert("Like registrado.", "success");
      });
    });

    root.querySelectorAll("[data-action='share']").forEach((button) => {
      button.addEventListener("click", async () => {
        incrementCompanyForumMetric(button.dataset.id, "shares");
        renderForumFeed();
        try {
          await navigator.clipboard.writeText(window.location.href);
        } catch (error) {
          console.error(error);
        }
        showAlert("Enlace copiado y publicacion marcada como compartida.", "success");
      });
    });

    root.querySelectorAll("[data-action='save']").forEach((button) => {
      button.addEventListener("click", () => {
        toggleCompanyForumSave(button.dataset.id);
        renderForumFeed();
        showAlert("Guardado actualizado.", "success");
      });
    });

    root.querySelectorAll("[data-action='comment']").forEach((button) => {
      button.addEventListener("click", () => {
        const respuesta = window.prompt(`Escribe un comentario para "${button.dataset.title}"`);
        if (!respuesta || !respuesta.trim()) return;
        addCompanyForumComment(button.dataset.id, getCompanyDisplayName(), respuesta.trim());
        renderForumFeed();
        showAlert("Comentario agregado.", "success");
      });
    });
  };

  const renderSidebarVacantes = () => {
    const card = getSidebarCardByTitle("Vacantes activas");
    if (!card) return;

    const countNode = card.querySelector(".fw-bold.fs-4");
    const badgeNode = card.querySelector(".badge");
    const detailNode = card.querySelector("p.small");
    const progressNode = card.querySelector(".activity-fill");
    const actionButton = card.querySelector("button");
    const total = Number(dashboardData.metricas?.total_vacantes || 0);

    if (countNode) countNode.textContent = String(total);
    if (badgeNode) badgeNode.textContent = total > 0 ? `${total} activas` : "Sin vacantes";
    if (detailNode) detailNode.textContent = total > 0 ? `${total} vacantes publicadas en este momento.` : "Todavia no has publicado vacantes.";
    if (progressNode) progressNode.style.width = `${Math.min(100, total * 10)}%`;
    actionButton?.addEventListener("click", () => {
      navigateTo("../misvacantes");
    });
  };

  const renderSidebarPostulaciones = () => {
    const card = getSidebarCardByTitle("Postulantes recientes");
    if (!card) return;

    const list = card.querySelector("ul");
    const button = card.querySelector("button");
    const items = Array.isArray(dashboardData.ultimasPostulaciones) ? dashboardData.ultimasPostulaciones : [];

    if (button) {
      button.innerHTML = `Ver todos (${dashboardData.metricas?.total_postulaciones ?? 0}) <i class="bi bi-arrow-right ms-1"></i>`;
      button.addEventListener("click", () => {
        navigateTo("../postulaciones");
      });
    }

    if (!list) return;
    if (!items.length) {
      list.innerHTML = `<li class="text-muted">No hay postulantes recientes todavia.</li>`;
      return;
    }

    list.innerHTML = items.map((item, index) => `
      <li class="d-flex align-items-center gap-3 mb-3">
        <div class="position-relative">
          <i class="bi bi-person-circle fs-2" style="color: ${index === 0 ? "var(--primary-deep)" : "#5a6ab0"};"></i>
          ${index === 0 ? '<span class="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-white" style="width: 10px; height: 10px;"></span>' : ""}
        </div>
        <div class="flex-grow-1">
          <span class="fw-semibold">${item.nombre_usuario}</span>
          <p class="small text-secondary mb-0">${item.titulo_puesto} · ${formatDateTime(item.fecha_postulacion)}</p>
        </div>
        <span class="badge bg-light text-dark">${item.nombre_estado}</span>
      </li>
    `).join("");
  };

  const updateMetrics = () => {
    const totalVacantesValue = dashboardData.metricas?.total_vacantes ?? 0;
    const totalPostulacionesValue = dashboardData.metricas?.total_postulaciones ?? 0;
    
    const promedio = Number(dashboardData.metricas?.promedio_valoracion || 0).toFixed(1);
    const numResenas = dashboardData.metricas?.total_valoraciones || 0;

    if (totalVacantes) totalVacantes.textContent = String(totalVacantesValue);
    if (totalPostulaciones) totalPostulaciones.textContent = String(totalPostulacionesValue);
    if (textoVacantesResumen) {
      textoVacantesResumen.innerHTML = `<i class="bi bi-clock"></i> ${totalVacantesValue > 0 ? "Actualizado desde la API" : "Sin vacantes activas"}`;
    }
    if (textoPostulacionesResumen) {
      textoPostulacionesResumen.innerHTML = `<i class="bi bi-arrow-up-short"></i> ${totalPostulacionesValue > 0 ? "Actualizado desde la API" : "Sin postulaciones"}`;
    }
    
    if (calificacionPromedio) calificacionPromedio.textContent = promedio;
    if (totalResenas) totalResenas.textContent = `+${numResenas} reseñas`;
  };

  const searchDashboard = () => {
    const term = inputBusquedaDashboard?.value.trim().toLowerCase();
    if (!term) {
      showAlert("Escribe un termino para buscar vacantes, postulantes o publicaciones.", "warning");
      inputBusquedaDashboard?.focus();
      return;
    }

    const vacantes = dashboardData.ultimasVacantes.filter((item) =>
      [item.titulo_puesto, item.modalidad].some((value) => String(value || "").toLowerCase().includes(term))
    );

    const postulaciones = dashboardData.ultimasPostulaciones.filter((item) =>
      [item.nombre_usuario, item.titulo_puesto, item.nombre_estado].some((value) => String(value || "").toLowerCase().includes(term))
    );

    const posts = getCompanyForumPosts().filter((post) =>
      [post.title, post.content, post.category].some((value) => String(value || "").toLowerCase().includes(term))
    );

    const totalMatches = vacantes.length + postulaciones.length + posts.length;
    if (!totalMatches) {
      showAlert(`No encontramos resultados para "${term}".`, "warning");
      return;
    }

    showAlert(`Se encontraron <strong>${totalMatches}</strong> coincidencias para <strong>${term}</strong>. Vacantes: ${vacantes.length}, postulantes: ${postulaciones.length}, publicaciones: ${posts.length}.`, "success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePublish = () => {
    const content = textareaPublicacion?.value.trim();
    if (!content) {
      showAlert("Escribe una publicacion antes de enviarla al foro.", "warning");
      textareaPublicacion?.focus();
      return;
    }

    const activeCategory = document.querySelector(".badge-category.active")?.textContent?.trim() || "Vacante";
    createCompanyForumPost({
      companyName: getCompanyDisplayName(),
      authorInitials: getCompanyInitials(),
      content,
      category: activeCategory
    });

    textareaPublicacion.value = "";
    renderForumFeed();
    showToast("toastPublicado", "Publicacion realizada con exito.");
    showAlert("La publicacion ya aparece en el foro de empresas.", "success");
  };

  const bindCategoryBadges = () => {
    document.querySelectorAll(".badge-category").forEach((badge) => {
      badge.addEventListener("click", () => {
        document.querySelectorAll(".badge-category").forEach((item) => {
          item.classList.remove("active");
          item.style.background = "#f0f4ff";
          item.style.color = "var(--primary-deep)";
        });
        badge.classList.add("active");
        badge.style.background = "var(--primary-deep)";
        badge.style.color = "white";
      });
    });
  };

  const bindEvents = () => {
    btnGuardarPub = replaceNode(btnGuardarPub);
    btnPublicarPub = replaceNode(btnPublicarPub);

    btnBuscarDashboard?.addEventListener("click", searchDashboard);
    inputBusquedaDashboard?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        searchDashboard();
      }
    });

    btnIrPublicarVacante?.addEventListener("click", () => {
      navigateTo("../publicarvacante");
    });

    btnGuardarPub?.addEventListener("click", () => {
      showToast("toastGuardado", "Borrador guardado correctamente.");
    });

    btnPublicarPub?.addEventListener("click", handlePublish);
    bindCategoryBadges();
  };

  // CONSUMO DE API PARA EL DASHBOARD
  const fetchDashboard = async () => {
    const response = await fetch(`${API_URL}/dashboard/empresa`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo cargar el dashboard");
    }

    dashboardData = {
      ...data,
      ultimasVacantes: Array.isArray(data.ultimasVacantes) ? data.ultimasVacantes : [],
      ultimasPostulaciones: Array.isArray(data.ultimasPostulaciones) ? data.ultimasPostulaciones : []
    };
  };

  // NUEVO: CONSUMO DE API PARA LAS RESEÑAS
  const cargarResenas = async () => {
    try {
        const response = await fetch(`${API_URL}/valoraciones/empresa`, {
            headers: { Authorization: `Bearer ${getToken()}` }
        });
        if (response.ok) {
            const data = await response.json();
            // Aseguramos que sea un arreglo sin importar cómo lo envíe el backend
            resenas.value = Array.isArray(data) ? data : (data.valoraciones || []);
        }
    } catch (error) {
        console.error("Error al cargar las reseñas dinámicas:", error);
    }
  };

  const init = async () => {
    bindEvents();
    renderForumFeed();
    await fetchDashboard();
    await cargarResenas(); // Llamamos a las reseñas reales
    updateMetrics();
    renderSidebarVacantes();
    renderSidebarPostulaciones();
  };

  init().catch((error) => {
    console.error(error);
    showAlert(error.message || "No se pudo cargar la vista principal de empresa");
  });
});
</script>

<style>
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
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
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
            margin: 0 2px;
        }
        .nav-link-custom:hover {
            background: rgba(255,255,255,0.15);
            transform: translateY(-1px);
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
            transform: translateY(-3px);
            box-shadow: 0 12px 20px rgba(63, 81, 181, 0.35);
            color: white;
        }
        .btn-outline-primary-deep {
            background: transparent;
            border: 2px solid var(--primary-deep);
            color: var(--primary-deep);
            font-weight: 600;
            border-radius: 40px;
            padding: 0.45rem 1.5rem;
            transition: all 0.2s;
        }
        .btn-outline-primary-deep:hover {
            background: var(--primary-deep);
            color: white;
            transform: translateY(-2px);
        }
        /* Tarjetas */
        .metric-card {
            background: white;
            border-radius: 24px;
            padding: 1.5rem 1.2rem;
            box-shadow: 0 15px 30px -8px rgba(0, 20, 60, 0.08);
            border: 1px solid rgba(63, 81, 181, 0.08);
            transition: all 0.25s;
            position: relative;
            overflow: hidden;
        }
        .metric-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 35px -10px rgba(63, 81, 181, 0.15);
            border-color: var(--primary-deep);
        }
        .metric-card::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-deep), #8c9eff);
            transform: scaleX(0);
            transition: transform 0.3s;
        }
        .metric-card:hover::after {
            transform: scaleX(1);
        }
        .main-card {
            background: white;
            border-radius: 32px;
            padding: 2rem;
            box-shadow: 0 20px 35px -10px rgba(0, 20, 60, 0.06);
            border: 1px solid rgba(63, 81, 181, 0.06);
            margin-bottom: 1.8rem;
            transition: box-shadow 0.25s;
        }
        .main-card:hover {
            box-shadow: 0 25px 40px -12px rgba(63, 81, 181, 0.12);
        }
        .sidebar-card {
            background: white;
            border-radius: 28px;
            padding: 1.8rem;
            box-shadow: 0 15px 25px -8px rgba(0, 0, 0, 0.04);
            border: 1px solid #eef2f9;
            margin-bottom: 1.8rem;
            transition: all 0.2s;
        }
        .sidebar-card:hover {
            box-shadow: 0 18px 30px -10px rgba(63, 81, 181, 0.1);
        }
        .filter-bar {
            background: white;
            border-radius: 60px;
            padding: 0.5rem 0.5rem 0.5rem 1.5rem;
            box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
            border: 1px solid #e2e8f0;
        }
        /* Badges y etiquetas */
        .badge-category {
            background: #f0f4ff;
            color: var(--primary-deep);
            padding: 0.6rem 1.4rem;
            border-radius: 40px;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid transparent;
            box-shadow: 0 2px 6px rgba(0,0,0,0.02);
        }
        .badge-category:hover {
            background: var(--primary-deep);
            color: white;
            transform: scale(1.02);
            box-shadow: 0 6px 12px rgba(63, 81, 181, 0.2);
        }
        .badge-category.active {
            background: var(--primary-deep);
            color: white;
        }
        .post-card {
            background: white;
            border-radius: 28px;
            padding: 2rem;
            box-shadow: 0 15px 25px -8px rgba(0,0,0,0.03);
            border: 1px solid #edf2f9;
            margin-bottom: 1.8rem;
            transition: all 0.3s;
        }
        .post-card:hover {
            box-shadow: 0 22px 35px -12px rgba(63, 81, 181, 0.12);
            border-color: rgba(63, 81, 181, 0.2);
        }
        /* ESTILO PARA LA NUEVA TARJETA DE RESEÑAS (NATIVO EN VUE) */
        .review-card {
            background: white;
            border-radius: 28px;
            padding: 2rem;
            box-shadow: 0 15px 25px -8px rgba(0,0,0,0.03);
            border: 1px solid #edf2f9;
            transition: all 0.3s;
        }
        .review-card:hover {
            box-shadow: 0 22px 35px -12px rgba(63, 81, 181, 0.12);
            border-color: rgba(63, 81, 181, 0.2);
        }
        .stat-badge {
            background: #f4f7fd;
            color: var(--primary-deep);
            padding: 0.45rem 1.3rem;
            border-radius: 40px;
            font-weight: 600;
            font-size: 0.85rem;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: all 0.15s;
            border: 1px solid rgba(63,81,181,0.1);
        }
        .stat-badge:hover {
            background: var(--primary-deep);
            color: white;
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
            box-shadow: 0 3px 8px rgba(255,71,87,0.4);
        }
        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
        /* Elementos creativos adicionales */
        .activity-bar {
            height: 8px;
            background: #e9ecf5;
            border-radius: 10px;
            overflow: hidden;
        }
        .activity-fill {
            height: 100%;
            background: linear-gradient(90deg, var(--primary-deep), #7b8cde);
            border-radius: 10px;
            width: 0%;
            transition: width 0.5s ease;
        }
        .progress-ring {
            width: 60px;
            height: 60px;
        }
        .glow-text {
            text-shadow: 0 2px 8px rgba(63,81,181,0.15);
        }

.dashboard-card h2 {
  font-weight: 700;
  margin: 0;
}

.list-item-card {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
  background: #fff;
}

.small-empty {
  min-height: 120px;
}
</style>