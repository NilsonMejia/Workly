<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- ========== NAVBAR MEJORADO ========== -->
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
                    <a href="../publicarvacante" class="nav-link-custom text-decoration-none"><i class="bi bi-plus-circle me-1"></i> Publicar</a>
                    <a href="../misvacantes" class="nav-link-custom text-decoration-none"><i class="bi bi-briefcase me-1"></i> Mis vacantes</a>
                    <a href="../postulaciones" class="nav-link-custom text-decoration-none"><i class="bi bi-people me-1"></i> Postulaciones</a>
                    <a href="../foro" class="nav-link-custom active text-decoration-none"><i class="bi bi-chat-dots me-1"></i> Foro</a>
                    <a href="../resenaempresa" class="nav-link-custom text-decoration-none"><i class="bi bi-star me-1"></i> Reseñas</a>
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

    <!-- ========== MAIN ========== -->
    <main class="flex-grow-1 py-4">
        <div class="container-fluid px-4 px-lg-5">

            <!-- Barra de búsqueda y filtros -->
            <div class="filter-bar mb-4 p-3 d-flex align-items-center flex-wrap gap-3">
                <div class="d-flex align-items-center">
                    <i class="bi bi-chat-dots-fill fs-2 me-2" style="color: var(--primary-deep);"></i>
                    <h4 class="fw-bold mb-0" style="color: #121826;">Foro de Empresas</h4>
                </div>
                <div class="ms-auto d-flex gap-2 flex-wrap">
                    <div class="input-group" style="max-width: 260px;">
                        <span class="input-group-text bg-transparent border-0 text-muted"><i class="bi bi-search"></i></span>
                        <input type="text" class="form-control bg-transparent border-0 shadow-none" placeholder="Buscar tema..." id="inputBuscarForo">
                    </div>
                    <button class="btn btn-outline-primary-deep btn-accion" data-mensaje="Buscando en el foro...">Buscar</button>
                    <select class="form-select w-auto rounded-pill bg-light border-0 fw-medium btn-accion" data-mensaje="Filtro de categoría aplicado">
                        <option selected>Todas las categorías</option>
                        <option>Reclutamiento</option>
                        <option>Consejos</option>
                        <option>Networking</option>
                    </select>
                    <button class="btn btn-primary-deep" id="btnNuevoTema"><i class="bi bi-plus-circle me-1"></i> Nuevo tema</button>
                </div>
            </div>

            <div class="row g-4">

                <!-- Columna principal: Publicaciones -->
                <section class="col-12 col-lg-8">

                    <!-- Caja de nueva publicación -->
                    <div class="forum-card">
                        <div class="d-flex gap-3 mb-3">
                            <div class="avatar-circle">TS</div>
                            <div class="flex-grow-1">
                                <textarea id="textoPublicacion" class="form-control border-0 bg-light p-3 rounded-4" rows="3" placeholder="Comparte una pregunta, consejo o tema con la comunidad..."></textarea>
                            </div>
                        </div>
                        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-2">
                            <div class="d-flex flex-wrap gap-2">
                                <span class="category-badge cursor-pointer">Reclutamiento</span>
                                <span class="category-badge cursor-pointer">Vacantes</span>
                                <span class="category-badge cursor-pointer">Consejos</span>
                                <span class="category-badge cursor-pointer">Cultura</span>
                            </div>
                            <div class="d-flex gap-2">
                                <button type="button" id="btnGuardarTema" class="btn btn-outline-primary-deep"><i class="bi bi-bookmark me-1"></i> Borrador</button>
                                <button type="button" id="btnPublicarTema" class="btn btn-primary-deep"><i class="bi bi-send me-1"></i> Publicar</button>
                            </div>
                        </div>
                    </div>

                    <!-- Publicación 1 -->
                    <div class="forum-card">
                        <div class="d-flex gap-3 mb-3">
                            <div class="avatar-circle">TS</div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 class="fw-bold mb-1">TechSolutions</h6>
                                        <div class="d-flex align-items-center gap-2 flex-wrap">
                                            <span class="text-secondary small"><i class="bi bi-clock me-1"></i>Hace 10 horas</span>
                                            <span class="category-badge">Reclutamiento</span>
                                        </div>
                                    </div>
                                    <i class="bi bi-three-dots-vertical text-secondary"></i>
                                </div>
                            </div>
                        </div>
                        <h5 class="fw-bold mb-3">¿Qué preguntas recomiendan para una entrevista técnica?</h5>
                        <p class="text-secondary mb-4">Estamos contratando desarrolladores backend y queremos mejorar nuestro proceso de selección. ¿Qué preguntas técnicas o situacionales consideran útiles para evaluar experiencia real en APIs, bases de datos y resolución de problemas?</p>
                        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-3 border-top">
                            <div class="d-flex gap-3">
                                <span class="interaction-btn"><i class="bi bi-chat-left-text me-1"></i> 15 respuestas</span>
                                <span class="interaction-btn"><i class="bi bi-eye me-1"></i> 42 vistas</span>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-primary-deep btn-responder" data-titulo="¿Qué preguntas recomiendan para una entrevista técnica?" data-bs-toggle="modal" data-bs-target="#modalResponder"><i class="bi bi-reply-fill me-1"></i> Responder</button>
                                <button class="btn btn-outline-primary-deep" id="btnGuardarPost"><i class="bi bi-bookmark me-1" id="iconoGuardarPost"></i> <span id="textoGuardarPost">Guardar</span></button>
                            </div>
                        </div>
                    </div>

                    <!-- Publicación 2 -->
                    <div class="forum-card">
                        <div class="d-flex gap-3 mb-3">
                            <div class="avatar-circle" style="background: #e0e7ff; color: #2c3e8f;">IE</div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between align-items-start">
                                    <div>
                                        <h6 class="fw-bold mb-1">Innovate El Salvador</h6>
                                        <div class="d-flex align-items-center gap-2 flex-wrap">
                                            <span class="text-secondary small"><i class="bi bi-clock me-1"></i>Ayer</span>
                                            <span class="category-badge">Cultura Laboral</span>
                                        </div>
                                    </div>
                                    <i class="bi bi-three-dots-vertical text-secondary"></i>
                                </div>
                            </div>
                        </div>
                        <h5 class="fw-bold mb-3">Beneficios que realmente valoran los desarrolladores</h5>
                        <p class="text-secondary mb-4">Más allá del salario competitivo, hemos notado que ofrecer modalidad híbrida y seguro médico ha incrementado nuestra retención de talento en un 40%. ¿Qué otros beneficios no tradicionales les han funcionado?</p>
                        <div class="d-flex flex-wrap align-items-center justify-content-between gap-3 pt-3 border-top">
                            <div class="d-flex gap-3">
                                <span class="interaction-btn"><i class="bi bi-chat-left-text me-1"></i> 32 respuestas</span>
                                <span class="interaction-btn"><i class="bi bi-eye me-1"></i> 156 vistas</span>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-primary-deep btn-responder" data-titulo="Beneficios que realmente valoran los desarrolladores" data-bs-toggle="modal" data-bs-target="#modalResponder"><i class="bi bi-reply-fill me-1"></i> Responder</button>
                                <button class="btn btn-outline-primary-deep btn-accion" data-mensaje="Tema guardado en favoritos"><i class="bi bi-bookmark me-1"></i> Guardar</button>
                            </div>
                        </div>
                    </div>

                </section>

                <!-- Sidebar derecho -->
                <aside class="col-12 col-lg-4">

                    <!-- Categorías populares -->
                    <div class="sidebar-card">
                        <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-tags me-2" style="color: var(--primary-deep);"></i>Categorías populares</h6>
                        <div class="d-flex flex-column gap-2">
                            <a href="#" class="d-flex justify-content-between text-decoration-none text-dark fw-medium btn-accion p-2 rounded-3" data-mensaje="Filtrando por: Reclutamiento"><span>Reclutamiento</span><span class="badge bg-light px-3 py-1">24</span></a>
                            <a href="#" class="d-flex justify-content-between text-decoration-none text-dark fw-medium btn-accion p-2 rounded-3" data-mensaje="Filtrando por: Vacantes"><span>Vacantes</span><span class="badge bg-light px-3 py-1">18</span></a>
                            <a href="#" class="d-flex justify-content-between text-decoration-none text-dark fw-medium btn-accion p-2 rounded-3" data-mensaje="Filtrando por: Entrevistas"><span>Entrevistas</span><span class="badge bg-light px-3 py-1">13</span></a>
                            <a href="#" class="d-flex justify-content-between text-decoration-none text-dark fw-medium btn-accion p-2 rounded-3" data-mensaje="Filtrando por: Consejos"><span>Consejos</span><span class="badge bg-light px-3 py-1">11</span></a>
                        </div>
                    </div>

                    <!-- Temas recientes -->
                    <div class="sidebar-card">
                        <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-clock-history me-2" style="color: var(--primary-deep);"></i>Temas recientes</h6>
                        <div class="d-flex flex-column gap-3">
                            <a href="#" class="text-decoration-none text-dark fw-medium btn-accion d-block" data-mensaje="Cargando tema...">Mejores preguntas para entrevista técnica</a>
                            <a href="#" class="text-decoration-none text-dark fw-medium btn-accion d-block" data-mensaje="Cargando tema...">Cómo redactar vacantes más claras</a>
                            <a href="#" class="text-decoration-none text-dark fw-medium btn-accion d-block" data-mensaje="Cargando tema...">Filtros para revisar postulantes</a>
                            <a href="#" class="text-decoration-none text-dark fw-medium btn-accion d-block" data-mensaje="Cargando tema...">Consejos para marca empleadora</a>
                        </div>
                    </div>

                    <!-- Actividad del foro -->
                    <div class="sidebar-card text-center" style="background: linear-gradient(145deg, var(--primary-deep), #2c3e8f); color: white;">
                        <i class="bi bi-chat-quote-fill display-4 mb-2 opacity-50"></i>
                        <h6 class="fw-bold mb-3">Actividad del foro</h6>
                        <div class="d-flex justify-content-between small fw-semibold border-bottom border-light border-opacity-25 pb-2 mb-2">
                            <span>Publicaciones hoy</span><span class="badge bg-white text-dark rounded-pill">12</span>
                        </div>
                        <div class="d-flex justify-content-between small fw-semibold border-bottom border-light border-opacity-25 pb-2 mb-2">
                            <span>Respuestas nuevas</span><span class="badge bg-white text-dark rounded-pill">37</span>
                        </div>
                        <div class="d-flex justify-content-between small fw-semibold">
                            <span>Temas guardados</span><span class="badge bg-white text-dark rounded-pill">9</span>
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    </main>

    <!-- ========== MODAL RESPONDER (conservado) ========== -->
    <div class="modal fade" id="modalResponder" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 rounded-4 shadow-lg">
                <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
                    <h5 class="modal-title fw-bold">Responder al tema</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body px-4 py-4">
                    <div class="bg-light p-3 rounded-4 mb-4">
                        <span class="text-secondary small fw-semibold">Respondiendo a:</span>
                        <p class="fw-medium mb-0 fst-italic" id="tituloTemaResponder">Cargando título...</p>
                    </div>
                    <form>
                        <div class="mb-4">
                            <label class="form-label fw-semibold small">Tu respuesta:</label>
                            <div class="border rounded-4 overflow-hidden">
                                <div class="bg-light border-bottom p-2 d-flex gap-3 text-secondary">
                                    <i class="bi bi-type-bold cursor-pointer"></i>
                                    <i class="bi bi-type-italic cursor-pointer"></i>
                                    <i class="bi bi-link-45deg cursor-pointer"></i>
                                </div>
                                <textarea class="form-control border-0 shadow-none p-3" rows="5" placeholder="Comparte tu experiencia o consejo aquí..."></textarea>
                            </div>
                        </div>
                        <div class="d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" class="btn btn-primary-deep" data-bs-dismiss="modal" id="btnEnviarRespuesta">Publicar respuesta</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- ========== TOASTS (conservados) ========== -->
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toastAccion" class="toast align-items-center text-white border-0 rounded-4 shadow mb-2" role="alert" style="background-color: var(--primary-deep);">
            <div class="d-flex">
                <div class="toast-body fs-6 py-3 fw-semibold" id="toastTexto">Acción realizada.</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
        <div id="toastExito" class="toast align-items-center text-white bg-success border-0 rounded-4 shadow" role="alert">
            <div class="d-flex">
                <div class="toast-body fs-6 py-3 fw-semibold" id="toastExitoTexto">¡Realizado con éxito!</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
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


    <!-- ========== SCRIPT ORIGINAL (CONSERVADO ÍNTEGRAMENTE) ========== -->


    <!-- Interactividad adicional para categorías -->
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { getUsuario } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";
import {
  addCompanyForumComment,
  createCompanyForumPost,
  getCompanyForumPosts,
  incrementCompanyForumMetric,
  saveCompanyForumPosts,
  toggleCompanyForumSave
} from "../../../assets/js/shared/empresaForum.js";

onMounted(async () => {
  requireAuth(["empresa"]);

  const sectionRoot = document.querySelector("section.col-12.col-lg-8");
  const sidebarRoot = document.querySelector("aside.col-12.col-lg-4");
  const filterBar = document.querySelector(".filter-bar");
  const inputBuscarForo = document.getElementById("inputBuscarForo");
  let selectCategoria = filterBar?.querySelector("select");
  let btnNuevoTema = document.getElementById("btnNuevoTema");
  const modalResponder = document.getElementById("modalResponder");
  const tituloTemaResponder = document.getElementById("tituloTemaResponder");
  const btnEnviarRespuesta = document.getElementById("btnEnviarRespuesta");
  const toastTexto = document.getElementById("toastTexto");
  const toastExitoTexto = document.getElementById("toastExitoTexto");

  let composerTextarea = document.getElementById("textoPublicacion");
  let btnGuardarTema = document.getElementById("btnGuardarTema");
  let btnPublicarTema = document.getElementById("btnPublicarTema");
  let searchButton = filterBar?.querySelector("button.btn-outline-primary-deep");
  let currentReplyPostId = null;
  let selectedCategory = "Todas las categorias";

  const showToast = (kind, message) => {
    const id = kind === "success" ? "toastExito" : "toastAccion";
    const targetText = kind === "success" ? toastExitoTexto : toastTexto;
    const target = document.getElementById(id);
    if (targetText) targetText.textContent = message;
    if (target && window.bootstrap?.Toast) {
      new window.bootstrap.Toast(target).show();
    }
  };

  const getCompanyName = () => {
    const usuario = getUsuario();
    return usuario?.nombre_comercial || usuario?.empresa || "Empresa";
  };

  const getCompanyInitials = () =>
    getCompanyName()
      .split(" ")
      .map((item) => item.trim().charAt(0))
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase() || "EM";

  const formatRelativeDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Reciente";

    const diffMs = Date.now() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return "Hace unos minutos";
    if (diffHours < 24) return `Hace ${diffHours}h`;

    const diffDays = Math.floor(diffHours / 24);
    return diffDays === 1 ? "Ayer" : `Hace ${diffDays} dias`;
  };

  const getSelectedComposerCategory = () =>
    document.querySelector(".category-badge.active")?.textContent?.trim() || "Vacantes";

  const createPostsContainer = () => {
    if (!sectionRoot) return null;

    const cards = [...sectionRoot.querySelectorAll(".forum-card")];
    cards.slice(1).forEach((card) => card.remove());

    let container = document.getElementById("foroPostsContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "foroPostsContainer";
      sectionRoot.appendChild(container);
    }

    return container;
  };

  const createSidebarContainers = () => {
    if (!sidebarRoot) return {};

    const cards = [...sidebarRoot.querySelectorAll(".sidebar-card")];
    const [categoriesCard, recentsCard, activityCard] = cards;

    if (categoriesCard) {
      categoriesCard.innerHTML = `
        <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-tags me-2" style="color: var(--primary-deep);"></i>Categorias populares</h6>
        <div class="d-flex flex-column gap-2" id="foroCategoriasPopulares"></div>
      `;
    }

    if (recentsCard) {
      recentsCard.innerHTML = `
        <h6 class="fw-bold mb-3 d-flex align-items-center"><i class="bi bi-clock-history me-2" style="color: var(--primary-deep);"></i>Temas recientes</h6>
        <div class="d-flex flex-column gap-3" id="foroTemasRecientes"></div>
      `;
    }

    if (activityCard) {
      activityCard.innerHTML = `
        <i class="bi bi-chat-quote-fill display-4 mb-2 opacity-50"></i>
        <h6 class="fw-bold mb-3">Actividad del foro</h6>
        <div class="d-flex justify-content-between small fw-semibold border-bottom border-light border-opacity-25 pb-2 mb-2">
          <span>Publicaciones totales</span><span class="badge bg-white text-dark rounded-pill" id="actividadPublicaciones">0</span>
        </div>
        <div class="d-flex justify-content-between small fw-semibold border-bottom border-light border-opacity-25 pb-2 mb-2">
          <span>Comentarios</span><span class="badge bg-white text-dark rounded-pill" id="actividadComentarios">0</span>
        </div>
        <div class="d-flex justify-content-between small fw-semibold">
          <span>Temas guardados</span><span class="badge bg-white text-dark rounded-pill" id="actividadGuardados">0</span>
        </div>
      `;
    }

    return {
      categoriesRoot: document.getElementById("foroCategoriasPopulares"),
      recentsRoot: document.getElementById("foroTemasRecientes")
    };
  };

  const normalizeCategory = (value = "") =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

  const getFilteredPosts = () => {
    const term = inputBuscarForo?.value.trim().toLowerCase() || "";
    const selectValue = selectCategoria?.value || "Todas las categorias";
    const activeCategory =
      selectedCategory !== "Todas las categorias" ? selectedCategory : selectValue;

    return getCompanyForumPosts().filter((post) => {
      const matchesSearch =
        !term ||
        [post.title, post.content, post.companyName, post.category].some((value) =>
          String(value || "").toLowerCase().includes(term)
        );

      const matchesCategory =
        normalizeCategory(activeCategory).includes("todas") ||
        normalizeCategory(post.category) === normalizeCategory(activeCategory);

      return matchesSearch && matchesCategory;
    });
  };

  const renderPosts = () => {
    const container = createPostsContainer();
    if (!container) return;

    const posts = getFilteredPosts();
    if (!posts.length) {
      container.innerHTML = `
        <div class="forum-card text-center">
          <i class="bi bi-search fs-1 text-muted opacity-50"></i>
          <h5 class="fw-bold mt-3">No hay temas para esos filtros</h5>
          <p class="text-muted mb-0">Prueba otra busqueda o publica un nuevo tema.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = posts
      .map(
        (post) => `
          <article class="forum-card" data-post-id="${post.id}">
            <div class="d-flex gap-3 mb-3">
              <div class="avatar-circle">${post.authorInitials}</div>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-start">
                  <div>
                    <h6 class="fw-bold mb-1">${post.companyName}</h6>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <span class="text-secondary small"><i class="bi bi-clock me-1"></i>${formatRelativeDate(post.createdAt)}</span>
                      <span class="category-badge">${post.category}</span>
                    </div>
                  </div>
                  <i class="bi bi-three-dots-vertical text-secondary"></i>
                </div>
              </div>
            </div>
            <h5 class="fw-bold mb-3">${post.title}</h5>
            <p class="text-secondary mb-4">${post.content}</p>
            <div class="d-flex flex-wrap gap-2 mb-3">
              <button class="btn btn-outline-primary-deep rounded-pill" data-action="like" data-id="${post.id}">
                <i class="bi bi-hand-thumbs-up me-1"></i>${post.likes}
              </button>
              <button class="btn btn-outline-primary-deep rounded-pill" data-action="comment" data-id="${post.id}" data-title="${post.title}">
                <i class="bi bi-chat-left-text me-1"></i>${post.comments.length}
              </button>
              <button class="btn btn-outline-primary-deep rounded-pill" data-action="share" data-id="${post.id}">
                <i class="bi bi-share me-1"></i>${post.shares}
              </button>
              <button class="btn btn-outline-primary-deep rounded-pill" data-action="save" data-id="${post.id}">
                <i class="bi ${post.saved ? "bi-bookmark-check-fill" : "bi-bookmark"} me-1"></i>${post.saved ? "Guardado" : "Guardar"}
              </button>
            </div>
            <div class="bg-light rounded-4 p-3">
              <div class="small fw-semibold mb-2">Comentarios recientes</div>
              ${
                post.comments.length
                  ? post.comments
                      .slice(-2)
                      .reverse()
                      .map(
                        (comment) => `
                          <div class="border rounded-4 bg-white p-3 mb-2">
                            <div class="fw-semibold small">${comment.author}</div>
                            <div class="text-muted small mb-1">${formatRelativeDate(comment.createdAt)}</div>
                            <div>${comment.content}</div>
                          </div>
                        `
                      )
                      .join("")
                  : '<div class="text-muted small">Todavia no hay comentarios en este tema.</div>'
              }
            </div>
          </article>
        `
      )
      .join("");

    container.querySelectorAll("[data-action='like']").forEach((button) => {
      button.addEventListener("click", () => {
        incrementCompanyForumMetric(button.dataset.id, "likes");
        renderAll();
        showToast("success", "Like registrado.");
      });
    });

    container.querySelectorAll("[data-action='share']").forEach((button) => {
      button.addEventListener("click", async () => {
        incrementCompanyForumMetric(button.dataset.id, "shares");
        renderAll();
        const url = window.location.href.split("?")[0];
        try {
          if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(url);
          }
        } catch {
          // Ignore clipboard errors inside the sandbox/browser environment.
        }
        showToast("success", "Enlace copiado y tema marcado como compartido.");
      });
    });

    container.querySelectorAll("[data-action='save']").forEach((button) => {
      button.addEventListener("click", () => {
        toggleCompanyForumSave(button.dataset.id);
        renderAll();
        showToast("success", "Tema actualizado en tus guardados.");
      });
    });

    container.querySelectorAll("[data-action='comment']").forEach((button) => {
      button.addEventListener("click", () => {
        currentReplyPostId = button.dataset.id;
        if (tituloTemaResponder) {
          tituloTemaResponder.textContent = `"${button.dataset.title}"`;
        }
        const modal = modalResponder && window.bootstrap?.Modal
          ? window.bootstrap.Modal.getOrCreateInstance(modalResponder)
          : null;
        modal?.show();
      });
    });
  };

  const renderSidebar = () => {
    const { categoriesRoot, recentsRoot } = createSidebarContainers();
    const posts = getCompanyForumPosts();

    const counts = posts.reduce((acc, post) => {
      const key = post.category || "General";
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    if (categoriesRoot) {
      categoriesRoot.innerHTML = [
        { label: "Todas las categorias", total: posts.length },
        ...Object.entries(counts).map(([label, total]) => ({ label, total }))
      ]
        .map(
          (item) => `
            <button type="button" class="d-flex justify-content-between text-start text-decoration-none text-dark fw-medium p-2 rounded-3 border-0 bg-transparent foro-category-filter ${normalizeCategory(selectedCategory) === normalizeCategory(item.label) ? "bg-light" : ""}" data-category="${item.label}">
              <span>${item.label}</span><span class="badge bg-light px-3 py-1">${item.total}</span>
            </button>
          `
        )
        .join("");

      categoriesRoot.querySelectorAll("[data-category]").forEach((button) => {
        button.addEventListener("click", () => {
          selectedCategory = button.dataset.category;
          if (selectCategoria) {
            selectCategoria.value = button.dataset.category;
          }
          renderAll();
        });
      });
    }

    if (recentsRoot) {
      recentsRoot.innerHTML = posts
        .slice(0, 4)
        .map(
          (post) => `
            <button type="button" class="text-decoration-none text-start text-dark fw-medium d-block border-0 bg-transparent p-0 foro-recent-topic" data-title="${post.title}">
              ${post.title}
            </button>
          `
        )
        .join("");

      recentsRoot.querySelectorAll(".foro-recent-topic").forEach((button) => {
        button.addEventListener("click", () => {
          if (inputBuscarForo) {
            inputBuscarForo.value = button.dataset.title;
          }
          renderAll();
        });
      });
    }

    const totalComments = posts.reduce((acc, post) => acc + post.comments.length, 0);
    const totalSaved = posts.filter((post) => post.saved).length;
    const publicacionesNode = document.getElementById("actividadPublicaciones");
    const comentariosNode = document.getElementById("actividadComentarios");
    const guardadosNode = document.getElementById("actividadGuardados");

    if (publicacionesNode) publicacionesNode.textContent = String(posts.length);
    if (comentariosNode) comentariosNode.textContent = String(totalComments);
    if (guardadosNode) guardadosNode.textContent = String(totalSaved);
  };

  const publishTopic = () => {
    const content = composerTextarea?.value.trim();
    if (!content) {
      showToast("info", "Escribe algo antes de publicar.");
      composerTextarea?.focus();
      return;
    }

    createCompanyForumPost({
      companyName: getCompanyName(),
      authorInitials: getCompanyInitials(),
      content,
      category: getSelectedComposerCategory()
    });

    composerTextarea.value = "";
    selectedCategory = "Todas las categorias";
    if (selectCategoria) {
      selectCategoria.value = "Todas las categorias";
    }
    renderAll();
    showToast("success", "Tema publicado con exito en el foro.");
  };

  const bindComposerBadges = () => {
    document.querySelectorAll(".category-badge").forEach((badge) => {
      badge.addEventListener("click", () => {
        const allBadges = [...document.querySelectorAll(".category-badge")].filter(
          (item) => item.closest(".forum-card") === badge.closest(".forum-card")
        );
        allBadges.forEach((item) => {
          item.classList.remove("active");
          item.style.background = "#e9ecf9";
          item.style.color = "var(--primary-deep)";
        });
        badge.classList.add("active");
        badge.style.background = "var(--primary-deep)";
        badge.style.color = "white";
      });
    });
  };

  const replaceNode = (node) => {
    if (!node) return null;
    const clone = node.cloneNode(true);
    node.replaceWith(clone);
    return clone;
  };

  const bindTopBar = () => {
    searchButton = replaceNode(searchButton);
    selectCategoria = replaceNode(selectCategoria);
    btnGuardarTema = replaceNode(btnGuardarTema);
    btnPublicarTema = replaceNode(btnPublicarTema);
    btnNuevoTema = replaceNode(btnNuevoTema);

    searchButton?.addEventListener("click", (event) => {
      event.preventDefault();
      renderAll();
    });

    selectCategoria?.addEventListener("change", () => {
      selectedCategory = selectCategoria.value;
      renderAll();
    });

    inputBuscarForo?.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        renderAll();
      }
    });

    btnNuevoTema?.addEventListener("click", () => {
      composerTextarea?.scrollIntoView({ behavior: "smooth", block: "center" });
      composerTextarea?.focus();
    });

    btnGuardarTema?.addEventListener("click", () => {
      showToast("success", "Borrador guardado correctamente.");
    });

    btnPublicarTema?.addEventListener("click", publishTopic);
    bindComposerBadges();
  };

  const bindReplySubmit = () => {
    btnEnviarRespuesta?.addEventListener("click", () => {
      const textarea = modalResponder?.querySelector("textarea");
      const content = textarea?.value.trim();

      if (!currentReplyPostId || !content) {
        showToast("info", "Escribe una respuesta antes de publicarla.");
        return;
      }

      addCompanyForumComment(currentReplyPostId, getCompanyName(), content);
      textarea.value = "";
      currentReplyPostId = null;
      renderAll();
      showToast("success", "Respuesta publicada con exito.");
    });
  };

  const ensureCategoryOptions = () => {
    if (!selectCategoria) return;

    const baseOptions = ["Todas las categorias", "Reclutamiento", "Vacantes", "Consejos", "Cultura"];
    selectCategoria.innerHTML = baseOptions
      .map(
        (option) => `
          <option ${normalizeCategory(option) === normalizeCategory(selectedCategory) ? "selected" : ""}>${option}</option>
        `
      )
      .join("");
  };

  const renderAll = () => {
    ensureCategoryOptions();
    renderPosts();
    renderSidebar();
  };

  const init = () => {
    composerTextarea = document.getElementById("textoPublicacion");
    btnGuardarTema = document.getElementById("btnGuardarTema");
    btnPublicarTema = document.getElementById("btnPublicarTema");
    searchButton = filterBar?.querySelector("button.btn-outline-primary-deep");

    bindTopBar();
    bindReplySubmit();
    renderAll();

    const posts = getCompanyForumPosts();
    saveCompanyForumPosts(posts);
  };

  init();
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
            --body-bg: #f5f7fc;
        }
        body { background: var(--body-bg); }
        /* Navbar */
        .navbar-custom { background-color: var(--nav-bg) !important; box-shadow: 0 6px 20px rgba(1, 22, 113, 0.15); }
        .navbar-brand .brand-icon { font-size: 3.5rem; color: white; margin-right: 0.75rem; }
        .navbar-brand .brand-text { color: white; font-weight: 700; font-size: 2rem; line-height: 1.2; }
        .navbar-brand .brand-sub { color: var(--light-text); font-size: 0.95rem; }
        .nav-link-custom { color: white !important; font-weight: 500; padding: 0.5rem 1.2rem; border-radius: 30px; transition: all 0.2s; background: rgba(255,255,255,0.05); }
        .nav-link-custom:hover { background: rgba(255,255,255,0.15); }
        .nav-link-custom.active { background: rgba(255,255,255,0.2); }
        .btn-primary-deep { background: linear-gradient(135deg, var(--primary-deep), #2c3e8f); border: none; color: white; font-weight: 600; border-radius: 40px; padding: 0.5rem 1.5rem; box-shadow: 0 6px 14px rgba(63, 81, 181, 0.25); }
        .btn-primary-deep:hover { background: linear-gradient(135deg, #2c3e8f, var(--primary-deep)); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(63, 81, 181, 0.35); }
        .btn-outline-primary-deep { background: transparent; border: 1.5px solid var(--primary-deep); color: var(--primary-deep); font-weight: 600; border-radius: 40px; padding: 0.4rem 1.2rem; }
        .btn-outline-primary-deep:hover { background: var(--primary-deep); color: white; }
        /* Tarjetas */
        .filter-bar { background: white; border-radius: 60px; padding: 0.5rem 1rem; box-shadow: 0 8px 20px rgba(0,0,0,0.02); border: 1px solid #e2e8f0; }
        .forum-card { background: white; border-radius: 28px; padding: 1.8rem; box-shadow: 0 12px 24px -8px rgba(0,0,0,0.04); border: 1px solid #edf0f5; margin-bottom: 1.5rem; transition: all 0.2s; }
        .forum-card:hover { box-shadow: 0 18px 30px -10px rgba(63,81,181,0.1); border-color: rgba(63,81,181,0.2); }
        .sidebar-card { background: white; border-radius: 24px; padding: 1.5rem; box-shadow: 0 12px 24px -8px rgba(0,0,0,0.04); border: 1px solid #edf0f5; margin-bottom: 1.5rem; }
        /* Avatar */
        .avatar-circle { width: 52px; height: 52px; background: #eef2f9; border-radius: 18px; display: flex; align-items: center; justify-content: center; color: var(--primary-deep); font-weight: 700; font-size: 1.2rem; }
        .category-badge { background: #e9ecf9; color: var(--primary-deep); padding: 0.3rem 1rem; border-radius: 30px; font-size: 0.75rem; font-weight: 600; }
        /* Footer */
        .footer-custom { background-color: var(--nav-bg); color: var(--light-text); }
        .footer-custom a { color: var(--light-text) !important; text-decoration: none; }
        .footer-custom a:hover { color: white !important; text-decoration: underline; }
        .notification-badge { position: absolute; top: -5px; right: -5px; background-color: #ff4757; color: white; border-radius: 50%; padding: 0.25rem 0.45rem; font-size: 0.7rem; font-weight: bold; border: 2px solid white; }
        .navbar-toggler-icon { background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); }
        .hover-primary:hover { color: var(--primary-deep) !important; }
        .cursor-pointer { cursor: pointer; }
        .interaction-btn { color: #5a6275; transition: all 0.15s; padding: 0.4rem 1rem; border-radius: 30px; background: #f8fafd; }
        .interaction-btn:hover { background: var(--primary-deep); color: white; }

.foro-item {
  border: 1px solid #e9ecef;
  border-radius: 14px;
  padding: 14px;
  margin-bottom: 12px;
  background: #fff;
}

.foro-titulo {
  font-weight: 700;
  margin-bottom: 6px;
}

.foro-meta {
  font-size: 0.9rem;
  color: #6c757d;
}

textarea.form-control {
  resize: vertical;
}
</style>
