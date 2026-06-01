<template>
  <div class="d-flex flex-column min-vh-100">
    <UserNavbar active="foro" />

    <main class="flex-grow-1 py-4">
      <div class="container px-4 px-lg-5">
        <section class="surface-card p-4 p-lg-5 mb-4">
          <div class="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
            <div>
              <h1 class="h3 fw-bold mb-1">Foro de discusion</h1>
              <p class="text-muted mb-0">Comparte dudas, consejos de carrera y experiencias de postulacion.</p>
            </div>
            <select id="filtroCategoriaForo" class="form-select form-select-lg rounded-4 forum-select">
              <option value="">Todas las categorias</option>
              <option>Entrevistas</option>
              <option>CV</option>
              <option>Experiencias</option>
              <option>Consejos</option>
            </select>
          </div>

          <div id="alertContainer"></div>

          <div class="composer-card mb-4">
            <textarea id="textoForo" class="form-control border-0 bg-light rounded-4 p-3" rows="3" placeholder="Escribe una pregunta o consejo para la comunidad..."></textarea>
            <div class="d-flex flex-wrap justify-content-between gap-3 mt-3">
              <div class="d-flex flex-wrap gap-2">
                <button type="button" class="chip active" data-category="Entrevistas">Entrevistas</button>
                <button type="button" class="chip" data-category="CV">CV</button>
                <button type="button" class="chip" data-category="Experiencias">Experiencias</button>
                <button type="button" class="chip" data-category="Consejos">Consejos</button>
              </div>
              <button type="button" id="btnPublicarForo" class="btn btn-primary rounded-pill px-4">
                <i class="bi bi-send me-2"></i>Publicar
              </button>
            </div>
          </div>

          <div class="d-grid gap-3" id="listaForo"></div>
        </section>
      </div>
    </main>

    <footer class="footer-custom py-4 mt-auto text-center text-white-50">
      <div class="container">Workly 2026 | Comunidad de talento</div>
    </footer>
  </div>
</template>

<script setup>
import UserNavbar from "../../../components/UserNavbar.vue";
import { onMounted } from "vue";
import { getUsuario } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";
import {
  createUserForumPost,
  getUserForumPosts,
  incrementUserForumLike,
  toggleUserForumSave
} from "../../../assets/js/shared/userForum.js";

onMounted(() => {
  requireAuth(["usuario"]);

  const listaForo = document.getElementById("listaForo");
  const textoForo = document.getElementById("textoForo");
  const btnPublicarForo = document.getElementById("btnPublicarForo");
  const filtroCategoria = document.getElementById("filtroCategoriaForo");
  const alertContainer = document.getElementById("alertContainer");

  const showAlert = (message, type = "warning") => {
    alertContainer.innerHTML = `<div class="alert alert-${type} rounded-4">${message}</div>`;
  };

  const getAuthor = () => {
    const usuario = getUsuario();
    return usuario?.nombre || [usuario?.nombres, usuario?.apellidos].filter(Boolean).join(" ") || "Usuario";
  };

  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "Reciente" : date.toLocaleDateString("es-SV");
  };

  const selectedCategory = () =>
    document.querySelector(".chip.active")?.dataset.category || "Entrevistas";

  const renderPosts = () => {
    const category = filtroCategoria.value;
    const posts = getUserForumPosts().filter((post) => !category || post.category === category);

    if (!posts.length) {
      listaForo.innerHTML = `<div class="empty-state">No hay temas para esta categoria.</div>`;
      return;
    }

    listaForo.innerHTML = posts.map((post) => `
      <article class="forum-card">
        <div class="d-flex justify-content-between gap-3 mb-2">
          <div>
            <h2 class="h5 fw-bold mb-1">${post.title}</h2>
            <div class="text-muted small">${post.author} · ${formatDate(post.createdAt)} · ${post.category}</div>
          </div>
          <span class="badge text-bg-light rounded-pill align-self-start">${post.likes} likes</span>
        </div>
        <p class="text-muted">${post.content}</p>
        <div class="d-flex flex-wrap gap-2">
          <button type="button" class="btn btn-outline-primary rounded-pill" data-like="${post.id}">
            <i class="bi bi-hand-thumbs-up me-1"></i>Me gusta
          </button>
          <button type="button" class="btn btn-outline-primary rounded-pill" data-save="${post.id}">
            <i class="bi ${post.saved ? "bi-bookmark-check-fill" : "bi-bookmark"} me-1"></i>${post.saved ? "Guardado" : "Guardar"}
          </button>
        </div>
      </article>
    `).join("");

    listaForo.querySelectorAll("[data-like]").forEach((button) => {
      button.addEventListener("click", () => {
        incrementUserForumLike(button.dataset.like);
        renderPosts();
      });
    });

    listaForo.querySelectorAll("[data-save]").forEach((button) => {
      button.addEventListener("click", () => {
        toggleUserForumSave(button.dataset.save);
        renderPosts();
      });
    });
  };

  document.querySelectorAll(".chip").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });

  btnPublicarForo.addEventListener("click", () => {
    const content = textoForo.value.trim();
    if (!content) {
      showAlert("Escribe un contenido antes de publicar.");
      return;
    }

    createUserForumPost({
      author: getAuthor(),
      content,
      category: selectedCategory()
    });
    textoForo.value = "";
    showAlert("Tema publicado correctamente.", "success");
    renderPosts();
  });

  filtroCategoria.addEventListener("change", renderPosts);
  renderPosts();
});
</script>

<style>
:root { --nav-bg: #011671; --primary-deep: #3f51b5; }
body { background: #f5f7fc; font-family: "Inter", sans-serif; }
.navbar-custom, .footer-custom { background: var(--nav-bg); }
.brand-icon { color: #fff; font-size: 3rem; }
.brand-text { color: #fff; display: block; font-size: 1.8rem; font-weight: 800; }
.brand-sub { color: rgba(255,255,255,.7); font-size: .9rem; }
.nav-link-custom { color: #fff; text-decoration: none; padding: .6rem 1rem; border-radius: 999px; }
.nav-link-custom:hover, .nav-link-custom.active { background: rgba(255,255,255,.14); }
.notification-badge { position: absolute; top: -5px; right: -7px; background: #dc3545; color: #fff; border-radius: 999px; min-width: 1.35rem; text-align: center; font-size: .72rem; }
.surface-card, .composer-card, .forum-card { background: #fff; border: 1px solid #e7edf7; border-radius: 28px; box-shadow: 0 20px 35px -24px rgba(1,22,113,.28); }
.composer-card, .forum-card { padding: 1.4rem; }
.forum-select { max-width: 260px; }
.chip { border: 1px solid #dfe6fb; background: #f4f7ff; color: var(--primary-deep); border-radius: 999px; padding: .45rem 1rem; font-weight: 700; }
.chip.active { background: var(--primary-deep); color: #fff; }
.empty-state { background: #f8fafc; border: 1px dashed #ccd6ea; border-radius: 24px; padding: 2rem; text-align: center; color: #6c757d; }
</style>
