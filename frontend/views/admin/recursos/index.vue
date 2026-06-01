<template>
  <div class="min-vh-100">
    <nav class="navbar navbar-expand-lg py-3 admin-nav">
      <div class="container-fluid px-4">
        <a class="navbar-brand fw-bold text-white fs-3" href="../principal"><i class="bi bi-briefcase-fill me-2"></i>Workly</a>
        <div class="navbar-nav mx-auto gap-2">
          <a class="nav-link nav-link-custom" href="../principal">Dashboard</a>
          <a class="nav-link nav-link-custom active" href="../recursos">Recursos</a>
          <a class="nav-link nav-link-custom" href="../foro">Foro</a>
          <a class="nav-link nav-link-custom" href="../moderacion">Moderacion</a>
        </div>
        <button type="button" class="btn btn-outline-light rounded-pill" @click="logout">
          <i class="bi bi-box-arrow-right me-1"></i>Salir
        </button>
      </div>
    </nav>

    <main class="container px-4 py-4">
      <div class="row g-4">
        <section class="col-12 col-lg-5">
          <div class="panel-card p-4">
            <h1 class="h4 fw-bold mb-1">Crear recurso</h1>
            <p class="text-muted mb-4">Estos recursos aparecen en las vistas de usuario y empresa.</p>
            <div id="alertContainer"></div>
            <form id="formRecurso" class="row g-3">
              <div class="col-12">
                <label class="form-label fw-semibold">Titulo</label>
                <input id="titulo" class="form-control form-control-lg rounded-4" required>
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Descripcion</label>
                <textarea id="descripcion" class="form-control rounded-4" rows="4" required></textarea>
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label fw-semibold">Categoria</label>
                <input id="categoria" class="form-control form-control-lg rounded-4" placeholder="Entrevistas">
              </div>
              <div class="col-12 col-md-6">
                <label class="form-label fw-semibold">Formato</label>
                <input id="formato" class="form-control form-control-lg rounded-4" placeholder="PDF">
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Audiencia</label>
                <select id="audiencia" class="form-select form-select-lg rounded-4">
                  <option value="ambos">Usuarios y empresas</option>
                  <option value="usuario">Solo usuarios</option>
                  <option value="empresa">Solo empresas</option>
                </select>
              </div>
              <div class="col-12">
                <label class="form-label fw-semibold">Enlace opcional</label>
                <input id="enlace" class="form-control form-control-lg rounded-4" placeholder="https://">
              </div>
              <div class="col-12 d-grid">
                <button class="btn btn-primary btn-lg rounded-4" type="submit">
                  <i class="bi bi-plus-circle me-2"></i>Publicar recurso
                </button>
              </div>
            </form>
          </div>
        </section>

        <section class="col-12 col-lg-7">
          <div class="panel-card p-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h2 class="h4 fw-bold mb-1">Recursos publicados</h2>
                <p class="text-muted mb-0">Control rapido del contenido visible.</p>
              </div>
              <span class="badge text-bg-light rounded-pill" id="contadorRecursos">0</span>
            </div>
            <div class="d-grid gap-3" id="listaRecursos"></div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { requireAuth, logout } from "../../../assets/js/shared/auth.js";
import { deleteAdminResource, getAdminResources, saveAdminResource } from "../../../assets/js/shared/adminResources.js";

onMounted(() => {
  requireAuth(["admin"]);

  const form = document.getElementById("formRecurso");
  const listaRecursos = document.getElementById("listaRecursos");
  const contadorRecursos = document.getElementById("contadorRecursos");
  const alertContainer = document.getElementById("alertContainer");

  const showAlert = (message, type = "success") => {
    alertContainer.innerHTML = `<div class="alert alert-${type} rounded-4">${message}</div>`;
  };

  const render = () => {
    const resources = getAdminResources();
    contadorRecursos.textContent = String(resources.length);
    listaRecursos.innerHTML = resources.map((resource) => `
      <article class="resource-row">
        <div>
          <div class="fw-bold">${resource.titulo}</div>
          <div class="text-muted small">${resource.categoria} - ${resource.formato} - ${resource.audiencia}</div>
          <p class="text-muted mb-0 mt-2">${resource.descripcion}</p>
        </div>
        <button type="button" class="btn btn-outline-danger rounded-pill" data-delete="${resource.id}">
          <i class="bi bi-trash3"></i>
        </button>
      </article>
    `).join("");

    listaRecursos.querySelectorAll("[data-delete]").forEach((button) => {
      button.addEventListener("click", () => {
        deleteAdminResource(button.dataset.delete);
        render();
      });
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const titulo = document.getElementById("titulo").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    if (!titulo || !descripcion) {
      showAlert("Completa titulo y descripcion.", "warning");
      return;
    }

    saveAdminResource({
      titulo,
      descripcion,
      categoria: document.getElementById("categoria").value.trim() || "General",
      formato: document.getElementById("formato").value.trim() || "WEB",
      audiencia: document.getElementById("audiencia").value,
      enlace: document.getElementById("enlace").value.trim()
    });
    form.reset();
    showAlert("Recurso publicado correctamente.");
    render();
  });

  render();
});
</script>

<style>
:root { --azul-oscuro: #001670; --fondo: #E9F0FF; }
body { background: var(--fondo); font-family: "Inter", sans-serif; }
.admin-nav { background: var(--azul-oscuro); }
.nav-link-custom { color: rgba(255,255,255,.82); border-radius: 999px; padding: .55rem 1rem !important; }
.nav-link-custom:hover, .nav-link-custom.active { background: rgba(255,255,255,.14); color: #fff; }
.panel-card, .resource-row { background: #fff; border: 1px solid #e5ebf7; border-radius: 24px; box-shadow: 0 20px 35px -24px rgba(1,22,113,.24); }
.resource-row { align-items: center; display: flex; gap: 1rem; justify-content: space-between; padding: 1rem; }
</style>
