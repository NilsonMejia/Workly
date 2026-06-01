<template>
  <div>
    <nav class="navbar navbar-expand-lg py-3 sticky-top">
            <div class="container-fluid px-4">
                <a class="navbar-brand fw-bold text-white fs-3 d-flex align-items-center" href="../principal">
                    <i class="bi bi-briefcase-fill me-2"></i> Workly
                </a>

                <button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navContent">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
                        <li class="nav-item"><a class="nav-link nav-link-custom" href="../principal">Dashboard</a></li>
                        <li class="nav-item"><a class="nav-link nav-link-custom" href="../gestionusuarios">Usuarios</a></li>
                        <li class="nav-item"><a class="nav-link nav-link-custom" href=".">Empresas</a></li>
                        <li class="nav-item"><a class="nav-link nav-link-custom" href="../gestionvacantes">Vacantes</a></li>
                        <li class="nav-item"><a class="nav-link nav-link-custom" href="../estadisticas">Estadísticas</a></li>
                    </ul>
                    <div class="profile-wrapper ms-lg-3">
                        <i class="bi bi-person-circle fs-2 text-white" style="cursor: pointer;"></i>
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
                            <a href="../principal" class="btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
                            <a href="../gestionusuarios" class="btn-menu-side"><i class="bi bi-people-fill me-2"></i> Gestión de Usuarios</a>
                            <a href="." class="btn-menu-side active"><i class="bi bi-building me-2"></i> Gestión de Empresas</a>
                            <a href="../gestionvacantes" class="btn-menu-side"><i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes</a>
                            <a href="../estadisticas" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema</a>
                            <a href="../moderacion" class="btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> Moderación de Contenido</a>
                        </div>
                    </div>
                </aside>

                <div class="col-12 col-lg-10">

                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">Gestión de Empresas</h4>
                    </div>

                    <div id="alertContainer" class="mb-3"></div>

                    <div class="bento-card p-2 mb-4">
                        <div class="row g-2 align-items-center">
                            <div class="col">
                                <div class="input-group">
                                    <span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span>
                                    <input type="text" id="filtroEmpresa" class="form-control bg-light border-0" placeholder="Buscar empresa o correo...">
                                </div>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-primary px-4" id="btnFiltrar" style="background-color: var(--azul); border-radius: 10px;">Filtrar</button>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-primary px-4" id="btnNuevaEmpresa" data-bs-toggle="modal" data-bs-target="#modalEmpresa" style="background-color: var(--azul-oscuro); border-radius: 10px;">Nueva empresa</button>
                            </div>
                        </div>
                    </div>

                    <div class="bento-card p-4 mb-4">
                        <h6 class="fw-bold mb-4">Lista de empresas</h6>
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead class="text-muted border-bottom">
                                    <tr>
                                        <th>Empresa</th>
                                        <th>Correo</th>
                                        <th>Sitio web</th>
                                        <th>Municipio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaEmpresas">
                                    <tr>
                                        <td colspan="5" class="text-muted">Cargando empresas...</td>
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
                                        <span class="text-muted fw-semibold">Total empresas</span>
                                        <span class="fw-bold fs-5" id="resumenTotal">0</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-muted fw-semibold">Con sitio web</span>
                                        <span class="fw-bold fs-5" id="resumenWeb">0</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-muted fw-semibold">Sin sitio web</span>
                                        <span class="fw-bold fs-5" id="resumenSinWeb">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-8">
                            <div class="bento-card p-4">
                                <h6 class="fw-bold mb-4">
                                    <i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente
                                </h6>
                                <div class="vstack gap-3" id="actividadEmpresas">
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

        <footer class="py-4">
            <div class="container text-center">
                <div class="d-flex justify-content-center gap-4 small opacity-75">
                    <a href="#" class="text-white text-decoration-none">Ayuda</a>
                    <a href="#" class="text-white text-decoration-none">Privacidad</a>
                    <span class="fw-semibold">Workly 2026</span>
                </div>
            </div>
        </footer>

        <div class="modal fade" id="modalEmpresa" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: var(--azul-oscuro); color: white;">
                        <h5 class="modal-title">Nueva empresa</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formEmpresa">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Nombre comercial *</label>
                                    <input type="text" class="form-control" id="empresaNombreComercial">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Razon social</label>
                                    <input type="text" class="form-control" id="empresaRazonSocial">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Correo *</label>
                                    <input type="email" class="form-control" id="empresaCorreo">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Contrasena *</label>
                                    <input type="password" class="form-control" id="empresaContrasena">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Sitio web</label>
                                    <input type="text" class="form-control" id="empresaSitioWeb">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label fw-bold">Municipio</label>
                                    <select class="form-select" id="empresaMunicipio"></select>
                                </div>
                                <div class="col-12">
                                    <label class="form-label fw-bold">Descripcion</label>
                                    <textarea class="form-control" id="empresaDescripcion" rows="4"></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnGuardarEmpresa" style="background-color: var(--azul);">Guardar empresa</button>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, getToken, clearSession, navigateTo } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["admin"]);

  const alertContainer = document.getElementById("alertContainer");
  const tablaEmpresas = document.getElementById("tablaEmpresas");
  const filtroEmpresa = document.getElementById("filtroEmpresa");
  const btnFiltrar = document.getElementById("btnFiltrar");
  const btnNuevaEmpresa = document.getElementById("btnNuevaEmpresa");
  const btnGuardarEmpresa = document.getElementById("btnGuardarEmpresa");
  const resumenTotal = document.getElementById("resumenTotal");
  const resumenWeb = document.getElementById("resumenWeb");
  const resumenSinWeb = document.getElementById("resumenSinWeb");
  const actividadEmpresas = document.getElementById("actividadEmpresas");
  const selectMunicipio = document.getElementById("empresaMunicipio");

  let empresasGlobal = [];

  const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json"
  });

  const redirectToLogin = () => {
    clearSession();
    navigateTo("../../public/login");
  };

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${type} rounded-4" role="alert">
        ${message}
      </div>
    `;
  };

  const renderResumen = (empresas) => {
    if (resumenTotal) resumenTotal.textContent = empresas.length;
    if (resumenWeb) resumenWeb.textContent = empresas.filter((item) => (item.sitio_web || "").trim() !== "").length;
    if (resumenSinWeb) resumenSinWeb.textContent = empresas.filter((item) => !(item.sitio_web || "").trim()).length;
  };

  const renderActividad = (empresas) => {
    if (!actividadEmpresas) return;

    const top = empresas.slice(0, 3);
    if (!top.length) {
      actividadEmpresas.innerHTML = `
        <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
          No hay actividad disponible.
        </div>
      `;
      return;
    }

    actividadEmpresas.innerHTML = top.map((empresa, index) => `
      <div class="p-3 rounded-4 bg-light border-start border-4 ${index === 0 ? "border-primary" : index === 1 ? "border-success" : "border-warning"}">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="fw-bold mb-1">${empresa.nombre_comercial || "Empresa"}</h6>
          <small class="text-muted">Registro reciente</small>
        </div>
        <p class="small mb-0 text-muted">${empresa.correo_electronico || "Sin correo"}${empresa.sitio_web ? " · " + empresa.sitio_web : ""}</p>
      </div>
    `).join("");
  };

  const renderEmpresas = (empresas) => {
    if (!tablaEmpresas) return;

    if (!empresas.length) {
      tablaEmpresas.innerHTML = `
        <tr>
          <td colspan="5" class="text-muted">No hay empresas registradas.</td>
        </tr>
      `;
      return;
    }

    tablaEmpresas.innerHTML = empresas.map((item) => `
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <i class="bi bi-building empresa-row-icon me-2"></i>
            <div>
              <div class="fw-bold">${item.nombre_comercial || "N/D"}</div>
              <div class="small text-muted">${item.razon_social || ""}</div>
            </div>
          </div>
        </td>
        <td>${item.correo_electronico || "N/D"}</td>
        <td>${item.sitio_web || "N/D"}</td>
        <td>${item.nombre_municipio || item.id_municipio_fk || "N/D"}</td>
        <td>
          <button class="btn btn-sm fw-bold px-3 btn-eliminar text-white" data-id="${item.id_empresa}" style="background-color:#dc3545; border-radius: 6px;">
            Eliminar
          </button>
        </td>
      </tr>
    `).join("");

    tablaEmpresas.querySelectorAll(".btn-eliminar").forEach((button) => {
      button.addEventListener("click", async () => {
        if (window.confirm("¿Seguro que deseas eliminar esta empresa?")) {
          await eliminarEmpresa(button.dataset.id);
        }
      });
    });
  };

  const cargarMunicipios = async () => {
    if (!selectMunicipio) return;

    const response = await fetch(`${API_URL}/catalogos/municipios-agrupados`);
    const municipios = response.ok ? await response.json() : [];

    selectMunicipio.innerHTML = `<option value="">Selecciona un municipio</option>${municipios.map((item) => `
      <option value="${item.id_municipio}">${item.nombre_departamento} - ${item.nombre_municipio}</option>
    `).join("")}`;
  };

  const cargarEmpresas = async () => {
    const response = await fetch(`${API_URL}/admin/empresas`, {
      headers: authHeaders()
    });

    let data = [];
    try {
      data = await response.json();
    } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin();
      return;
    }

    if (!response.ok) {
      showAlert(data.mensaje || "No se pudieron cargar las empresas.");
      return;
    }

    empresasGlobal = Array.isArray(data) ? data : [];
    renderEmpresas(empresasGlobal);
    renderResumen(empresasGlobal);
    renderActividad(empresasGlobal);
  };

  const eliminarEmpresa = async (id) => {
    const response = await fetch(`${API_URL}/admin/empresas/${id}`, {
      method: "DELETE",
      headers: authHeaders()
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin();
      return;
    }

    if (!response.ok) {
      showAlert(data.mensaje || "No se pudo eliminar la empresa.");
      return;
    }

    showAlert("Empresa eliminada correctamente.", "success");
    await cargarEmpresas();
  };

  const aplicarFiltro = () => {
    const texto = (filtroEmpresa?.value || "").trim().toLowerCase();

    if (!texto) {
      renderEmpresas(empresasGlobal);
      renderResumen(empresasGlobal);
      renderActividad(empresasGlobal);
      return;
    }

    const filtradas = empresasGlobal.filter((item) =>
      (item.nombre_comercial || "").toLowerCase().includes(texto) ||
      (item.correo_electronico || "").toLowerCase().includes(texto) ||
      (item.razon_social || "").toLowerCase().includes(texto)
    );

    renderEmpresas(filtradas);
    renderResumen(filtradas);
    renderActividad(filtradas);
  };

  const limpiarFormulario = () => {
    document.getElementById("formEmpresa").reset();
  };

  const guardarEmpresa = async () => {
    const payload = {
      nombre_comercial: document.getElementById("empresaNombreComercial").value.trim(),
      razon_social: document.getElementById("empresaRazonSocial").value.trim(),
      correo_electronico: document.getElementById("empresaCorreo").value.trim(),
      sitio_web: document.getElementById("empresaSitioWeb").value.trim(),
      descripcion_empresa: document.getElementById("empresaDescripcion").value.trim(),
      id_municipio_fk: document.getElementById("empresaMunicipio").value,
      contrasena: document.getElementById("empresaContrasena").value.trim()
    };

    if (!payload.nombre_comercial || !payload.correo_electronico || !payload.contrasena) {
      showAlert("Completa nombre comercial, correo y contraseña.", "warning");
      return;
    }

    const response = await fetch(`${API_URL}/admin/empresas`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(payload)
    });

    let data = {};
    try {
      data = await response.json();
    } catch {}

    if (response.status === 401 || response.status === 403) {
      redirectToLogin();
      return;
    }

    if (!response.ok) {
      showAlert(data.mensaje || "No se pudo crear la empresa.");
      return;
    }

    showAlert("Empresa creada correctamente.", "success");
    bootstrap.Modal.getInstance(document.getElementById("modalEmpresa"))?.hide();
    limpiarFormulario();
    await cargarEmpresas();
  };

  btnFiltrar?.addEventListener("click", aplicarFiltro);
  filtroEmpresa?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") aplicarFiltro();
  });
  btnNuevaEmpresa?.addEventListener("click", limpiarFormulario);
  btnGuardarEmpresa?.addEventListener("click", guardarEmpresa);

  await cargarMunicipios();
  await cargarEmpresas();
});
</script>

<style>

@import url("../../../assets/css/global.css");

:root {
            --azul-oscuro: #001670;
            --azul: #2C48D4;
            --celeste: #84ACF0;
            --amarillo-mostaza: #F8BD00;
            --fondo: #E9F0FF;
            --success-btn: #28a745;
            --danger-btn: #dc3545;
            --suspend-btn: #b23b3b;
            --gris-claro: #E9ECEF;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--fondo);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .navbar {
            background-color: var(--azul-oscuro) !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .nav-link-custom {
            color: rgba(255,255,255,0.8);
            font-size: 0.85rem;
            font-weight: 500;
            transition: all 0.3s;
            border-radius: 8px;
            padding: 8px 15px !important;
        }

        .nav-link-custom:hover {
            background: rgba(255,255,255,0.1);
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
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
        }

        .btn-action-top {
            background-color: var(--azul);
            color: white;
            border-radius: 10px;
            font-weight: 600;
            border: none;
            padding: 10px 20px;
        }

        .table thead th {
            border: none;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .empresa-row-icon {
            font-size: 2rem;
            color: #6c757d;
        }

        footer {
            background-color: var(--azul-oscuro);
            color: white;
            margin-top: auto;
        }

.table td,
.table th {
  vertical-align: middle;
}

.descripcion-cell {
  max-width: 280px;
  white-space: normal;
}
</style>
