<template>
  <div class="min-vh-100">
    <nav class="navbar navbar-expand-lg py-3 admin-nav">
      <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold text-white fs-3" href="../principal"><i class="bi bi-briefcase-fill me-2"></i>Workly</a>
        <div class="navbar-nav mx-auto gap-2">
          <a class="nav-link nav-link-custom" href="../principal">Dashboard</a>
          <a class="nav-link nav-link-custom" href="../recursos">Recursos</a>
          <a class="nav-link nav-link-custom active" href="../foro">Foro</a>
          <a class="nav-link nav-link-custom" href="../moderacion">Moderacion</a>
        </div>
        <button type="button" class="btn btn-outline-light rounded-pill" @click="logout">
          <i class="bi bi-box-arrow-right me-1"></i>Salir
        </button>
      </div>
    </nav>

    <main class="container px-4 py-4">
      <section class="panel-card p-4">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <div>
            <h1 class="h3 fw-bold mb-1">Foro administrativo</h1>
            <p class="text-muted mb-0">Vista de moderacion de temas publicados por empresas y usuarios.</p>
          </div>
          <div class="d-flex gap-2">
            <span class="badge text-bg-light rounded-pill px-3 py-2" id="contadorEmpresas">0 empresas</span>
            <span class="badge text-bg-light rounded-pill px-3 py-2" id="contadorUsuarios">0 usuarios</span>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-12 col-lg-6">
            <h2 class="h5 fw-bold mb-3">Foro de empresas</h2>
            <div class="d-grid gap-3" id="foroEmpresas"></div>
          </div>
          <div class="col-12 col-lg-6">
            <h2 class="h5 fw-bold mb-3">Foro de usuarios</h2>
            <div class="d-grid gap-3" id="foroUsuarios"></div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { requireAuth, logout } from "../../../assets/js/shared/auth.js";
import { getCompanyForumPosts } from "../../../assets/js/shared/empresaForum.js";
import { getUserForumPosts } from "../../../assets/js/shared/userForum.js";

onMounted(() => {
  requireAuth(["admin"]);

  const foroEmpresas = document.getElementById("foroEmpresas");
  const foroUsuarios = document.getElementById("foroUsuarios");
  const contadorEmpresas = document.getElementById("contadorEmpresas");
  const contadorUsuarios = document.getElementById("contadorUsuarios");

  const renderPosts = (root, posts, empty) => {
    root.innerHTML = posts.length
      ? posts.map((post) => `
          <article class="forum-row">
            <div class="fw-bold">${post.title}</div>
            <div class="text-muted small">${post.companyName || post.author || "Autor"} - ${post.category || "General"}</div>
            <p class="text-muted mb-0 mt-2">${post.content}</p>
          </article>
        `).join("")
      : `<div class="empty-state">${empty}</div>`;
  };

  const companyPosts = getCompanyForumPosts();
  const userPosts = getUserForumPosts();
  contadorEmpresas.textContent = `${companyPosts.length} empresas`;
  contadorUsuarios.textContent = `${userPosts.length} usuarios`;
  renderPosts(foroEmpresas, companyPosts, "No hay temas de empresas.");
  renderPosts(foroUsuarios, userPosts, "No hay temas de usuarios.");
});
</script>

<style>
:root { --azul-oscuro: #001670; --fondo: #E9F0FF; }
body { background: var(--fondo); font-family: "Inter", sans-serif; }
.admin-nav { background: var(--azul-oscuro); }
.nav-link-custom { color: rgba(255,255,255,.82); border-radius: 999px; padding: .55rem 1rem !important; }
.nav-link-custom:hover, .nav-link-custom.active { background: rgba(255,255,255,.14); color: #fff; }
.panel-card, .forum-row { background: #fff; border: 1px solid #e5ebf7; border-radius: 24px; box-shadow: 0 20px 35px -24px rgba(1,22,113,.24); }
.forum-row, .empty-state { padding: 1rem; }
.empty-state { background: #f8fafc; border: 1px dashed #ccd6ea; border-radius: 20px; color: #6c757d; }
</style>
