<template>
  <div>
    <div class="loading-spinner">
          <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>

        <nav class="navbar navbar-expand-lg py-3 sticky-top">
          <div class="container-fluid px-4">
            <a
              class="navbar-brand fw-bold text-white fs-3 d-flex align-items-center"
              href="../principal/index.vue"
            >
              <i class="bi bi-briefcase-fill me-2"></i> Workly
            </a>

            <button
              class="navbar-toggler text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navContent"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navContent">
              <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
                <li class="nav-item">
                  <a class="nav-link nav-link-custom" href="../principal/index.vue">Dashboard</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link nav-link-custom" href="../gestionusuarios/index.vue">Usuarios</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link nav-link-custom" href="../gestionempresas/index.vue">Empresas</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link nav-link-custom" href="../gestionvacantes/index.vue">Vacantes</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link nav-link-custom" href="../estadisticas/index.vue">Estadísticas</a>
                </li>
              </ul>
              <div class="profile-wrapper ms-lg-3">
                <i class="bi bi-person-circle fs-2 text-white" style="cursor: pointer"></i>
                <span class="notif-badge"></span>
              </div>
            </div>
          </div>
        </nav>

        <main class="container-fluid px-4 py-4">
          <div class="row g-4">
            <aside class="col-12 col-lg-2">
              <div class="bento-card p-3 h-100">
                <h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">Menú Admin</h6>
                <div class="d-flex flex-column">
                  <a href="../principal/index.vue" class="btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
                  <a href="../gestionusuarios/index.vue" class="btn-menu-side"><i class="bi bi-people-fill me-2"></i> Gestión de Usuarios</a>
                  <a href="../gestionempresas/index.vue" class="btn-menu-side"><i class="bi bi-building me-2"></i> Gestión de Empresas</a>
                  <a href="../gestionvacantes/index.vue" class="btn-menu-side"><i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes</a>
                  <a href="../estadisticas/index.vue" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema</a>
                  <a href="./index.vue" class="btn-menu-side active"><i class="bi bi-shield-lock-fill me-2"></i> Moderación de Contenido</a>
                </div>
              </div>
            </aside>

            <div class="col-12 col-lg-10">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">
                  Moderación de Contenido
                </h4>
              </div>

              <div id="alertContainer" class="mb-3"></div>

              <div class="bento-card p-2 mb-4">
                <div class="row g-2 align-items-center">
                  <div class="col">
                    <div class="input-group">
                      <span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span>
                      <input
                        type="text"
                        id="filtroModeracion"
                        class="form-control bg-light border-0"
                        placeholder="Buscar en usuarios, empresas o vacantes..."
                      />
                    </div>
                  </div>
                  <div class="col-auto">
                    <button
                      class="btn btn-primary px-4"
                      id="btnFiltrar"
                      style="background-color: var(--azul); border-radius: 10px"
                    >
                      Filtrar
                    </button>
                  </div>
                </div>
              </div>

              <div class="bento-card p-4 mb-4">
                <h6 class="fw-bold mb-4">Elementos para revisión</h6>
                <div class="table-responsive">
                  <table class="table align-middle">
                    <thead class="text-muted border-bottom">
                      <tr>
                        <th>Contenido</th>
                        <th>Tipo</th>
                        <th>Origen</th>
                        <th>Detalle</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody id="tablaModeracion">
                      <tr>
                        <td colspan="6" class="text-muted">Cargando información...</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="row g-4">
                <div class="col-12 col-md-4">
                  <div class="bento-card p-4 h-100">
                    <h6 class="fw-bold mb-4">Resumen</h6>
                    <div class="vstack gap-3">
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted fw-semibold">Usuarios</span>
                        <span class="fw-bold fs-5" id="resumenUsuarios">0</span>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted fw-semibold">Empresas</span>
                        <span class="fw-bold fs-5" id="resumenEmpresas">0</span>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted fw-semibold">Vacantes</span>
                        <span class="fw-bold fs-5" id="resumenVacantes">0</span>
                      </div>
                      <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted fw-semibold">Total items</span>
                        <span class="fw-bold fs-5" id="resumenTotal">0</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-12 col-md-8">
                  <div class="bento-card p-4">
                    <h6 class="fw-bold mb-4">
                      <i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente
                    </h6>
                    <div class="vstack gap-3" id="actividadModeracion">
                      <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
                        Cargando actividad...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div class="modal fade" id="modalConfirmacion" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Confirmar acción</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body" id="confirmacionMensaje">
                ¿Estás seguro de realizar esta acción?
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Cancelar
                </button>
                <button type="button" class="btn btn-danger" id="confirmarAccionBtn">
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer class="py-4">
          <div class="container text-center">
            <div class="d-flex justify-content-center gap-4 small opacity-75">
              <a href="#" class="text-white text-decoration-none">Ayuda</a>
              <a href="#" class="text-white text-decoration-none">Privacidad</a>
              <span class="fw-semibold">Workly 2026</span>
            </div>
          </div>
        </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["admin"]);
  const alertContainer = document.getElementById("alertContainer");
  const tablaModeracion = document.getElementById("tablaModeracion");
  const filtroModeracion = document.getElementById("filtroModeracion");
  const btnFiltrar = document.getElementById("btnFiltrar");

  const resumenUsuarios = document.getElementById("resumenUsuarios");
  const resumenEmpresas = document.getElementById("resumenEmpresas");
  const resumenVacantes = document.getElementById("resumenVacantes");
  const resumenTotal = document.getElementById("resumenTotal");

  const actividadModeracion = document.getElementById("actividadModeracion");
  const loadingSpinner = document.querySelector(".loading-spinner");

  let usuariosGlobal = [];
  let empresasGlobal = [];
  let vacantesGlobal = [];
  let itemsModeracion = [];



  const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json"
  });

  const showLoading = (show) => {
    if (!loadingSpinner) return;
    loadingSpinner.style.display = show ? "block" : "none";
    document.body.style.cursor = show ? "wait" : "default";
  };

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;

    let icon = "x-circle";
    if (type === "success") icon = "check-circle";
    else if (type === "warning") icon = "exclamation-triangle";
    else if (type === "info") icon = "info-circle";
    else if (type === "primary") icon = "info-circle";

    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show rounded-4" role="alert">
        <i class="bi bi-${icon} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;

    setTimeout(() => {
      const alert = alertContainer.querySelector(".alert");
      if (alert) {
        alert.classList.remove("show");
        setTimeout(() => alert.remove(), 150);
      }
    }, 5000);
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "N/D";
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return "N/D";
    return d.toLocaleDateString("es-SV");
  };

  const getEstadoBadge = (estado) => {
    const estados = {
      Activo: { class: "success", icon: "check-circle", text: "Activo" },
      Pendiente: { class: "warning text-dark", icon: "clock", text: "Pendiente" },
      Suspendido: { class: "danger", icon: "exclamation-triangle", text: "Suspendido" },
      Rechazado: { class: "danger", icon: "x-circle", text: "Rechazado" },
      "Revisión general": { class: "info", icon: "eye", text: "En revisión" },
      Publicada: { class: "success", icon: "check-circle", text: "Publicada" },
      Reportada: { class: "danger", icon: "exclamation-triangle", text: "Reportada" }
    };

    const estadoInfo = estados[estado] || {
      class: "secondary",
      icon: "question-circle",
      text: estado || "N/D"
    };

    return `
      <span class="badge bg-${estadoInfo.class} px-3 py-2">
        <i class="bi bi-${estadoInfo.icon} me-1"></i>${estadoInfo.text}
      </span>
    `;
  };

  const buildItems = (usuarios, empresas, vacantes) => {
    const itemsUsuarios = usuarios.map(item => ({
      id: item.id_usuario || item.id,
      titulo: `${item.nombres || ""} ${item.apellidos || ""}`.trim() || "Usuario",
      tipo: "Usuario",
      origen: item.correo_electronico || "Sin correo",
      detalle: item.telefono || item.nombre_municipio || "Sin detalle",
      estado: item.estado || "Activo",
      fecha: item.fecha_registro || new Date().toISOString()
    }));

    const itemsEmpresas = empresas.map(item => ({
      id: item.id_empresa || item.id,
      titulo: item.nombre_comercial || "Empresa",
      tipo: "Empresa",
      origen: item.correo_electronico || "Sin correo",
      detalle: item.sitio_web || "Sin sitio web",
      estado: item.estado || "Revisión general",
      fecha: item.fecha_registro || new Date().toISOString()
    }));

    const itemsVacantes = vacantes.map(item => ({
      id: item.id_vacante || item.id,
      titulo: item.titulo_puesto || "Vacante",
      tipo: "Vacante",
      origen: item.nombre_comercial || "Sin empresa",
      detalle: `${item.nombre_categoria || "Sin categoría"} · ${item.modalidad || "N/D"}`,
      estado: item.estado || "Publicada",
      fecha: item.fecha_publicacion || new Date().toISOString()
    }));

    return [...itemsUsuarios, ...itemsEmpresas, ...itemsVacantes].sort(
      (a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0)
    );
  };

  const renderResumen = (usuarios, empresas, vacantes) => {
    if (resumenUsuarios) resumenUsuarios.textContent = usuarios.length;
    if (resumenEmpresas) resumenEmpresas.textContent = empresas.length;
    if (resumenVacantes) resumenVacantes.textContent = vacantes.length;
    if (resumenTotal) resumenTotal.textContent = usuarios.length + empresas.length + vacantes.length;
  };

  const renderActividad = (items) => {
    if (!actividadModeracion) return;

    const top = items.slice(0, 3);

    if (!top.length) {
      actividadModeracion.innerHTML = `
        <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
          <i class="bi bi-info-circle me-2"></i>No hay actividad disponible.
        </div>
      `;
      return;
    }

    actividadModeracion.innerHTML = top.map((item, index) => {
      const colorBorder = index === 0 ? "primary" : index === 1 ? "danger" : "success";
      const icono = index === 0 ? "plus-circle" : index === 1 ? "exclamation-triangle" : "check-circle";

      return `
        <div class="p-3 rounded-4 bg-light border-start border-4 border-${colorBorder}">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="fw-bold mb-1">
              <i class="bi bi-${icono} me-2 text-${colorBorder}"></i>
              ${item.titulo}
            </h6>
            <small class="text-muted">${item.tipo} · ${formatearFecha(item.fecha)}</small>
          </div>
          <p class="small mb-0 text-muted">${item.origen} · ${item.detalle}</p>
        </div>
      `;
    }).join("");
  };

  const actualizarEstadoItem = async (item, nuevoEstado) => {
    try {
      showLoading(true);

      const tipoPath =
        item.tipo === "Usuario" ? "usuarios" :
        item.tipo === "Empresa" ? "empresas" :
        "vacantes";

      const response = await fetch(`${API_URL}/admin/${tipoPath}/${item.id}/estado`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ estado: nuevoEstado })
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 401 || response.status === 403) {
        if (typeof clearSession === "function") {
          clearSession();
        }
        window.location.href = "../../public/login/index.vue";
        return;
      }

      if (!response.ok) {
        showAlert(data.mensaje || `No se pudo actualizar el estado de ${item.tipo}.`);
        return;
      }

      showAlert(`${item.tipo} "${item.titulo}" actualizado correctamente.`, "success");
      await cargarModeracion();
    } catch (error) {
      console.error(error);
      showAlert(`Error de conexión al actualizar ${item.tipo}.`);
    } finally {
      showLoading(false);
    }
  };

  const eliminarItem = async (item) => {
    try {
      showLoading(true);

      const tipoPath =
        item.tipo === "Usuario" ? "usuarios" :
        item.tipo === "Empresa" ? "empresas" :
        "vacantes";

      const response = await fetch(`${API_URL}/admin/${tipoPath}/${item.id}`, {
        method: "DELETE",
        headers: authHeaders()
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 401 || response.status === 403) {
        if (typeof clearSession === "function") {
          clearSession();
        }
        window.location.href = "../../public/login/index.vue";
        return;
      }

      if (!response.ok) {
        showAlert(data.mensaje || `No se pudo eliminar ${item.tipo}.`);
        return;
      }

      showAlert(`${item.tipo} "${item.titulo}" eliminado correctamente.`, "success");
      await cargarModeracion();
    } catch (error) {
      console.error(error);
      showAlert(`Error de conexión al eliminar ${item.tipo}.`);
    } finally {
      showLoading(false);
    }
  };

  const renderTabla = (items) => {
    if (!tablaModeracion) return;

    if (!items.length) {
      tablaModeracion.innerHTML = `
        <tr>
          <td colspan="6" class="text-center text-muted py-5">
            <i class="bi bi-inbox fs-1 d-block mb-2"></i>
            No hay elementos para mostrar
          </td>
        </tr>
      `;
      return;
    }

    tablaModeracion.innerHTML = items.map(item => `
      <tr>
        <td>
          <div class="fw-bold">${item.titulo}</div>
          <div class="small text-muted">ID: ${item.id || "N/D"}</div>
        </td>
        <td>
          <span class="badge bg-secondary px-3 py-2">
            <i class="bi bi-${item.tipo === "Usuario" ? "person" : item.tipo === "Empresa" ? "building" : "file-text"} me-1"></i>
            ${item.tipo}
          </span>
        </td>
        <td>${item.origen}</td>
        <td>${item.detalle}</td>
        <td>${getEstadoBadge(item.estado)}</td>
        <td>
          <div class="d-flex gap-2">
            ${item.estado !== "Suspendido"
              ? `<button class="btn btn-sm btn-outline-warning btn-suspender" data-id="${item.id}" data-tipo="${item.tipo}" title="Suspender">
                   <i class="bi bi-exclamation-triangle"></i>
                 </button>`
              : `<button class="btn btn-sm btn-outline-success btn-activar" data-id="${item.id}" data-tipo="${item.tipo}" title="Activar">
                   <i class="bi bi-check-circle"></i>
                 </button>`
            }
            <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${item.id}" data-tipo="${item.tipo}" title="Eliminar">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    document.querySelectorAll(".btn-suspender").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = itemsModeracion.find(i => String(i.id) === String(btn.dataset.id) && i.tipo === btn.dataset.tipo);
        if (!item) return;

        const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
        document.getElementById("confirmacionMensaje").innerHTML =
          `¿Estás seguro de que deseas <strong>SUSPENDER</strong> ${item.tipo} "${item.titulo}"?`;

        document.getElementById("confirmarAccionBtn").onclick = async () => {
          await actualizarEstadoItem(item, "Suspendido");
          modal.hide();
        };

        modal.show();
      });
    });

    document.querySelectorAll(".btn-activar").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = itemsModeracion.find(i => String(i.id) === String(btn.dataset.id) && i.tipo === btn.dataset.tipo);
        if (!item) return;

        const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
        document.getElementById("confirmacionMensaje").innerHTML =
          `¿Estás seguro de que deseas <strong>ACTIVAR</strong> ${item.tipo} "${item.titulo}"?`;

        document.getElementById("confirmarAccionBtn").onclick = async () => {
          const nuevoEstado = item.tipo === "Vacante" ? "Publicada" : "Activo";
          await actualizarEstadoItem(item, nuevoEstado);
          modal.hide();
        };

        modal.show();
      });
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = itemsModeracion.find(i => String(i.id) === String(btn.dataset.id) && i.tipo === btn.dataset.tipo);
        if (!item) return;

        const modal = new bootstrap.Modal(document.getElementById("modalConfirmacion"));
        document.getElementById("confirmacionMensaje").innerHTML =
          `¿Estás seguro de que deseas <strong>ELIMINAR</strong> ${item.tipo} "${item.titulo}"? Esta acción no se puede deshacer.`;

        document.getElementById("confirmarAccionBtn").onclick = async () => {
          await eliminarItem(item);
          modal.hide();
        };

        modal.show();
      });
    });
  };

  const cargarModeracion = async () => {
    try {
      showLoading(true);

      const headers = { Authorization: `Bearer ${getToken()}` };

      const [usuariosRes, empresasRes, vacantesRes] = await Promise.all([
        fetch(`${API_URL}/admin/usuarios`, { headers }),
        fetch(`${API_URL}/admin/empresas`, { headers }),
        fetch(`${API_URL}/admin/vacantes`, { headers })
      ]);

      if (
        usuariosRes.status === 401 || usuariosRes.status === 403 ||
        empresasRes.status === 401 || empresasRes.status === 403 ||
        vacantesRes.status === 401 || vacantesRes.status === 403
      ) {
        if (typeof clearSession === "function") {
          clearSession();
        }
        window.location.href = "../../public/login/index.vue";
        return;
      }

      let usuariosData = [];
      let empresasData = [];
      let vacantesData = [];

      try { usuariosData = await usuariosRes.json(); } catch {}
      try { empresasData = await empresasRes.json(); } catch {}
      try { vacantesData = await vacantesRes.json(); } catch {}

      if (!usuariosRes.ok || !empresasRes.ok || !vacantesRes.ok) {
        showAlert("No se pudieron cargar los datos de moderación.");
        usuariosGlobal = [];
        empresasGlobal = [];
        vacantesGlobal = [];
        itemsModeracion = [];
        renderResumen([], [], []);
        renderTabla([]);
        renderActividad([]);
        return;
      }

      usuariosGlobal = Array.isArray(usuariosData) ? usuariosData : [];
      empresasGlobal = Array.isArray(empresasData) ? empresasData : [];
      vacantesGlobal = Array.isArray(vacantesData) ? vacantesData : [];

      itemsModeracion = buildItems(usuariosGlobal, empresasGlobal, vacantesGlobal);

      renderResumen(usuariosGlobal, empresasGlobal, vacantesGlobal);
      renderTabla(itemsModeracion);
      renderActividad(itemsModeracion);
    } catch (error) {
      console.error(error);
      showAlert("Error de conexión con el servidor.");
      usuariosGlobal = [];
      empresasGlobal = [];
      vacantesGlobal = [];
      itemsModeracion = [];
      renderResumen([], [], []);
      renderTabla([]);
      renderActividad([]);
    } finally {
      showLoading(false);
    }
  };

  const aplicarFiltro = () => {
    const texto = (filtroModeracion?.value || "").trim().toLowerCase();

    if (!texto) {
      renderTabla(itemsModeracion);
      renderActividad(itemsModeracion);
      return;
    }

    const filtrados = itemsModeracion.filter(item =>
      (item.titulo || "").toLowerCase().includes(texto) ||
      (item.tipo || "").toLowerCase().includes(texto) ||
      (item.origen || "").toLowerCase().includes(texto) ||
      (item.detalle || "").toLowerCase().includes(texto)
    );

    renderTabla(filtrados);
    renderActividad(filtrados);
  };

  btnFiltrar?.addEventListener("click", aplicarFiltro);

  filtroModeracion?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      aplicarFiltro();
    }
  });

  cargarModeracion();
});
</script>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");

@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap");

@import url("../../../assets/css/global.css");

:root {
        --azul-oscuro: #001670;
        --azul: #2c48d4;
        --celeste: #84acf0;
        --amarillo-mostaza: #f8bd00;
        --fondo: #e9f0ff;
        --success-btn: #28a745;
        --danger-btn: #dc3545;
        --gris-claro: #e9ecef;
      }

      body {
        font-family: "Inter", sans-serif;
        background-color: var(--fondo);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .navbar {
        background-color: var(--azul-oscuro) !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .nav-link-custom {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.85rem;
        font-weight: 500;
        transition: all 0.3s;
        border-radius: 8px;
        padding: 8px 15px !important;
      }

      .nav-link-custom:hover {
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }

      .profile-wrapper {
        position: relative;
        display: inline-block;
      }

      .notif-badge {
        position: absolute;
        top: 5px;
        right: 5px;
        width: 12px;
        height: 12px;
        background-color: #ff3b3b;
        border: 2px solid var(--azul-oscuro);
        border-radius: 50%;
      }

      .btn-menu-side {
        text-align: left;
        border: none;
        padding: 12px 15px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 0.9rem;
        transition: 0.3s;
        background-color: var(--azul);
        color: white;
        margin-bottom: 8px;
        width: 100%;
        text-decoration: none;
      }

      .btn-menu-side:hover {
        background-color: var(--azul-oscuro);
        color: white;
        transform: translateX(5px);
      }

      .btn-menu-side.active {
        background-color: var(--celeste) !important;
        color: var(--azul-oscuro) !important;
      }

      .bento-card {
        background: white;
        border-radius: 20px;
        border: none;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
      }

      .table thead th {
        border: none;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      footer {
        background-color: var(--azul-oscuro);
        color: white;
        margin-top: auto;
      }

      .loading-spinner {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }

      .table tbody tr {
        animation: fadeIn 0.3s ease-out;
      }

.list-block-item {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
  background: #fff;
}
</style>
