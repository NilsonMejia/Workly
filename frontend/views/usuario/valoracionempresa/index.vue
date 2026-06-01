<template>
  <div class="d-flex flex-column min-vh-100">
    <UserNavbar active="valoracionempresa" />

        <main class="flex-grow-1 py-4">
            <div class="container px-4 px-lg-5">
                <div class="surface-card p-4 p-lg-5">
                    <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
                        <div>
                            <h1 class="h3 fw-bold mb-1">Valoraciones de empresas</h1>
                            <p class="text-muted mb-0">Consulta opiniones reales y comparte tu experiencia si ya postulaste.</p>
                        </div>
                        <select id="selectorEmpresa" class="form-select form-select-lg rounded-4" style="max-width: 340px;"></select>
                    </div>

                    <div id="alertContainer" class="mb-3"></div>

                    <div class="row g-4">
                        <div class="col-12 col-xl-4">
                            <div class="surface-card p-4 h-100">
                                <h2 class="h5 fw-bold mb-3">Empresas disponibles</h2>
                                <div class="d-grid gap-3" id="listaEmpresas"></div>
                            </div>
                        </div>

                        <div class="col-12 col-xl-8">
                            <div class="surface-card p-4 mb-4">
                                <div id="resumenEmpresa"></div>
                            </div>

                            <div class="surface-card p-4 mb-4">
                                <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                                    <h2 class="h5 fw-bold mb-0">Escribe tu valoración</h2>
                                    <span class="badge rounded-pill text-bg-light" id="estadoPermiso">Cargando permiso...</span>
                                </div>
                                <form id="formValoracion" class="row g-3">
                                    <div class="col-12">
                                        <label class="form-label fw-semibold">Puntuación</label>
                                        <div class="d-flex gap-1" id="starRating"></div>
                                        <input type="hidden" id="puntuacion" value="0">
                                    </div>
                                    <div class="col-12">
                                        <label class="form-label fw-semibold" for="comentario">Comentario</label>
                                        <textarea id="comentario" class="form-control form-control-lg rounded-4" rows="4" maxlength="600" placeholder="Cuéntale a otros candidatos cómo fue tu experiencia."></textarea>
                                    </div>
                                    <div class="col-12 d-grid d-md-flex justify-content-md-end">
                                        <button class="btn btn-primary btn-lg rounded-pill px-4" type="submit" id="btnEnviarValoracion">
                                            <i class="bi bi-send me-2"></i>Enviar valoración
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <div class="surface-card p-4">
                                <h2 class="h5 fw-bold mb-3">Comentarios recientes</h2>
                                <div class="d-grid gap-3" id="listaValoraciones"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <footer class="footer-custom py-4 mt-auto text-center text-white-50">
            <div class="container">
                <span>Workly 2026 · Opiniones transparentes para tomar mejores decisiones</span>
            </div>
        </footer>
  </div>
</template>

<script setup>
import UserNavbar from "../../../components/UserNavbar.vue";
import { onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["usuario"]);

  const selectorEmpresa = document.getElementById("selectorEmpresa");
  const listaEmpresas = document.getElementById("listaEmpresas");
  const resumenEmpresa = document.getElementById("resumenEmpresa");
  const listaValoraciones = document.getElementById("listaValoraciones");
  const formValoracion = document.getElementById("formValoracion");
  const alertContainer = document.getElementById("alertContainer");
  const inputPuntuacion = document.getElementById("puntuacion");
  const inputComentario = document.getElementById("comentario");
  const estadoPermiso = document.getElementById("estadoPermiso");
  const btnEnviarValoracion = document.getElementById("btnEnviarValoracion");
  const starRating = document.getElementById("starRating");

  let empresas = [];
  let empresaSeleccionada = null;
  let miValoracion = null;

  const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`
  });

  const showAlert = (message, type = "danger") => {
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show rounded-4" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  };

  const escapeHtml = (value) =>
    String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  const formatearFecha = (fecha) => {
    if (!fecha) {
      return "Reciente";
    }

    const date = new Date(fecha);
    return Number.isNaN(date.getTime())
      ? "Reciente"
      : date.toLocaleDateString("es-SV", { dateStyle: "medium" });
  };

  const buildStars = (value) => {
    const rating = Number(value || 0);
    return Array.from({ length: 5 }, (_, index) =>
      `<i class="bi ${index < rating ? "bi-star-fill text-warning" : "bi-star text-secondary"}"></i>`
    ).join("");
  };

  const renderStarSelector = () => {
    starRating.innerHTML = Array.from({ length: 5 }, (_, index) => `
      <button class="star-option ${index < Number(inputPuntuacion.value) ? "active" : ""}" type="button" data-value="${index + 1}" ${btnEnviarValoracion.disabled ? "disabled" : ""}>
        <i class="bi bi-star-fill"></i>
      </button>
    `).join("");

    starRating.querySelectorAll("[data-value]").forEach((button) => {
      button.addEventListener("click", () => {
        inputPuntuacion.value = button.dataset.value;
        renderStarSelector();
      });
    });
  };

  const hydrateForm = () => {
    if (miValoracion) {
      inputPuntuacion.value = String(miValoracion.puntuacion || 0);
      inputComentario.value = miValoracion.comentario || "";
    } else {
      inputPuntuacion.value = "0";
      inputComentario.value = "";
    }

    renderStarSelector();
  };

  const updateReviewAvailability = (empresa) => {
    const puedeValorar = Number(empresa?.puede_valorar || 0) === 1;
    const yaValoro = Number(empresa?.ya_valoro || 0) === 1;

    if (yaValoro) {
      estadoPermiso.className = "badge rounded-pill text-bg-info";
      estadoPermiso.textContent = "Ya valoraste esta empresa. Puedes editar tu comentario.";
      btnEnviarValoracion.disabled = false;
      btnEnviarValoracion.innerHTML = '<i class="bi bi-pencil-square me-2"></i>Actualizar valoración';
      inputComentario.disabled = false;
      hydrateForm();
      return;
    }

    if (puedeValorar) {
      estadoPermiso.className = "badge rounded-pill text-bg-success";
      estadoPermiso.textContent = "Puedes valorar esta empresa";
      btnEnviarValoracion.disabled = false;
      btnEnviarValoracion.innerHTML = '<i class="bi bi-send me-2"></i>Enviar valoración';
      inputComentario.disabled = false;
      hydrateForm();
      return;
    }

    estadoPermiso.className = "badge rounded-pill text-bg-warning";
    estadoPermiso.textContent = "Solo puedes valorar si postulaste o trabajaste aquí";
    btnEnviarValoracion.disabled = true;
    btnEnviarValoracion.innerHTML = '<i class="bi bi-lock me-2"></i>Valoración bloqueada';
    inputComentario.disabled = true;
    inputPuntuacion.value = miValoracion ? String(miValoracion.puntuacion || 0) : "0";
    inputComentario.value = miValoracion?.comentario || "";
    renderStarSelector();
  };

  const renderEmpresas = () => {
    selectorEmpresa.innerHTML = empresas.map((empresa) => `
      <option value="${empresa.id_empresa}">${escapeHtml(empresa.nombre_comercial)}</option>
    `).join("");

    if (empresaSeleccionada) {
      selectorEmpresa.value = String(empresaSeleccionada.id_empresa);
    }

    listaEmpresas.innerHTML = empresas.map((empresa) => `
      <article class="empresa-card p-3 ${Number(empresaSeleccionada?.id_empresa) === Number(empresa.id_empresa) ? "active" : ""}" data-id="${empresa.id_empresa}">
        <div class="d-flex justify-content-between gap-3">
          <div>
            <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
              <h3 class="h6 fw-bold mb-0">${escapeHtml(empresa.nombre_comercial)}</h3>
              ${Number(empresa.puede_valorar) === 1 ? '<span class="badge text-bg-success">Valorable</span>' : ""}
              ${Number(empresa.ya_valoro) === 1 ? '<span class="badge text-bg-info">Ya valorada</span>' : ""}
            </div>
            <p class="text-muted small mb-2">${escapeHtml([empresa.nombre_municipio, empresa.nombre_departamento].filter(Boolean).join(", ") || "El Salvador")}</p>
            <div class="small text-muted">${escapeHtml(empresa.descripcion_empresa || "Empresa activa en Workly.")}</div>
          </div>
          <div class="text-end">
            <div class="fw-bold">${empresa.promedio || "0.0"}</div>
            <small class="text-muted">${empresa.total_valoraciones || 0} reseñas</small>
          </div>
        </div>
      </article>
    `).join("");

    listaEmpresas.querySelectorAll("[data-id]").forEach((card) => {
      card.addEventListener("click", () => {
        seleccionarEmpresa(Number(card.dataset.id));
      });
    });
  };

  const renderResumen = (payload) => {
    const { empresa, resumen, mi_valoracion } = payload;
    empresaSeleccionada = empresa;
    miValoracion = mi_valoracion || null;

    resumenEmpresa.innerHTML = `
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-4">
        <div>
          <h2 class="h4 fw-bold mb-1">${escapeHtml(empresa.nombre_comercial)}</h2>
          <p class="text-muted mb-2">${empresa.descripcion_empresa || "Empresa sin descripción registrada."}</p>
          <div class="text-muted small">${escapeHtml([empresa.nombre_municipio, empresa.nombre_departamento].filter(Boolean).join(", ") || "El Salvador")}</div>
        </div>
        <div class="text-lg-end">
          <div class="display-6 fw-bold mb-1">${resumen?.promedio || empresa.promedio || "0.0"}</div>
          <div class="mb-2">${buildStars(Math.round(Number(resumen?.promedio || empresa.promedio || 0)))}</div>
          <span class="badge text-bg-light rounded-pill">${resumen?.total_valoraciones || empresa.total_valoraciones || 0} valoraciones</span>
        </div>
      </div>
    `;

    updateReviewAvailability(empresa);
    renderEmpresas();
  };

  const renderValoraciones = (items) => {
    if (!items.length) {
      listaValoraciones.innerHTML = `
        <div class="text-center py-4 text-muted border rounded-4 bg-light">
          Esta empresa todavía no tiene comentarios publicados.
        </div>
      `;
      return;
    }

    listaValoraciones.innerHTML = items.map((item) => `
      <article class="border rounded-4 p-4">
        <div class="d-flex justify-content-between flex-wrap gap-2 mb-2">
          <div>
            <h3 class="h6 fw-bold mb-1">${escapeHtml(item.nombre_usuario)}</h3>
            <div>${buildStars(item.puntuacion)}</div>
          </div>
          <small class="text-muted">${formatearFecha(item.fecha_valoracion)}</small>
        </div>
        <p class="text-muted mb-0">${escapeHtml(item.comentario || "Sin comentario adicional.")}</p>
      </article>
    `).join("");
  };

  const getPreferredEmpresaId = () => {
    const urlId = Number(new URLSearchParams(window.location.search).get("id_empresa"));

    if (urlId) {
      return urlId;
    }

    const editable = empresas.find((empresa) => Number(empresa.puede_valorar) === 1 && Number(empresa.ya_valoro) === 0);
    if (editable) {
      return Number(editable.id_empresa);
    }

    const alreadyRated = empresas.find((empresa) => Number(empresa.ya_valoro) === 1);
    if (alreadyRated) {
      return Number(alreadyRated.id_empresa);
    }

    return Number(empresas[0]?.id_empresa);
  };

  const cargarEmpresas = async (preferredId = null) => {
    const response = await fetch(`${API_URL}/valoraciones/empresas`, {
      headers: authHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudieron cargar las empresas");
    }

    empresas = data;

    const initialId = Number(preferredId) || getPreferredEmpresaId();
    if (initialId) {
      await seleccionarEmpresa(initialId, false);
    }
  };

  const seleccionarEmpresa = async (idEmpresa, syncSelect = true) => {
    const response = await fetch(`${API_URL}/valoraciones/empresa/${idEmpresa}`, {
      headers: authHeaders()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo cargar el detalle de la empresa");
    }

    renderResumen(data);
    renderValoraciones(data.valoraciones || []);

    if (syncSelect) {
      selectorEmpresa.value = String(idEmpresa);
    }

    const url = new URL(window.location.href);
    url.searchParams.set("id_empresa", idEmpresa);
    window.history.replaceState({}, "", url);
  };

  formValoracion?.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      if (!empresaSeleccionada) {
        throw new Error("Selecciona una empresa para valorar.");
      }

      if (btnEnviarValoracion.disabled) {
        throw new Error("No tienes permiso para valorar esta empresa.");
      }

      if (Number(inputPuntuacion.value) < 1) {
        throw new Error("Selecciona una puntuación de 1 a 5 estrellas.");
      }

      if (!inputComentario.value.trim()) {
        throw new Error("Escribe un comentario antes de enviar.");
      }

      const selectedEmpresaId = Number(empresaSeleccionada.id_empresa);
      const isEditing = Boolean(miValoracion?.id_valoracion);
      const endpoint = isEditing
        ? `${API_URL}/valoraciones/empresa/${selectedEmpresaId}`
        : `${API_URL}/valoraciones`;

      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders()
        },
        body: JSON.stringify({
          id_empresa_fk: selectedEmpresaId,
          puntuacion: Number(inputPuntuacion.value),
          comentario: inputComentario.value.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.mensaje || "No se pudo guardar la valoración");
      }

      showAlert(data.mensaje, "success");
      await cargarEmpresas(selectedEmpresaId);
    } catch (error) {
      console.error(error);
      showAlert(error.message || "No se pudo enviar la valoración");
    }
  });

  selectorEmpresa?.addEventListener("change", async () => {
    try {
      await seleccionarEmpresa(Number(selectorEmpresa.value));
    } catch (error) {
      showAlert(error.message);
    }
  });

  renderStarSelector();

  cargarEmpresas().catch((error) => {
    console.error(error);
    showAlert(error.message || "No se pudo inicializar la vista de valoraciones");
  });
});
</script>

<style>

:root {
            --primary-deep: #3f51b5;
            --nav-bg: #011671;
            --body-bg: #f5f7fc;
        }

        body {
            font-family: "Inter", sans-serif;
            background: linear-gradient(180deg, #eef4ff 0%, #f8faff 100%);
        }

        .navbar-custom,
        .footer-custom {
            background-color: var(--nav-bg);
        }

        .nav-link-custom {
            color: white !important;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 30px;
            font-weight: 500;
            transition: background 0.2s;
        }

        .nav-link-custom:hover,
        .nav-link-custom.active {
            background: rgba(255, 255, 255, 0.12);
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
            color: #e2e4e8;
            font-size: 0.95rem;
        }

        .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: #ff4757;
            color: white;
            border-radius: 50%;
            padding: 0.2rem 0.4rem;
            font-size: 0.65rem;
            font-weight: bold;
            border: 2px solid white;
        }

        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }

        .surface-card {
            background: rgba(255, 255, 255, 0.96);
            border-radius: 28px;
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 20px 35px -12px rgba(1, 22, 113, 0.08);
        }

        .empresa-card {
            border-radius: 24px;
            border: 1px solid #e8edf6;
            transition: 0.2s ease;
            cursor: pointer;
        }

        .empresa-card.active,
        .empresa-card:hover {
            border-color: var(--primary-deep);
            box-shadow: 0 12px 24px -10px rgba(63, 81, 181, 0.18);
        }

        .star-option {
            border: none;
            background: transparent;
            color: #d0d4dd;
            font-size: 1.7rem;
        }

        .star-option.active {
            color: #f4b400;
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
