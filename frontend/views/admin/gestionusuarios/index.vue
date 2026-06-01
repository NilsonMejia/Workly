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
                        <li class="nav-item"><a class="nav-link nav-link-custom" href=".">Usuarios</a></li>
                        <li class="nav-item"><a class="nav-link nav-link-custom" href="../gestionempresas">Empresas</a></li>
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
                            <a href="../principal" class="btn-menu-side">
                                <i class="bi bi-grid-fill me-2"></i> Dashboard
                            </a>
                            <a href="." class="btn-menu-side active">
                                <i class="bi bi-people-fill me-2"></i> Gestión de Usuarios
                            </a>
                            <a href="../gestionempresas" class="btn-menu-side">
                                <i class="bi bi-building me-2"></i> Gestión de Empresas
                            </a>
                            <a href="../gestionvacantes" class="btn-menu-side">
                                <i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes
                            </a>
                            <a href="../estadisticas" class="btn-menu-side">
                                <i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema
                            </a>
                            <a href="../moderacion" class="btn-menu-side">
                                <i class="bi bi-shield-lock-fill me-2"></i> Moderación de Contenido
                            </a>
                        </div>
                    </div>
                </aside>

                <div class="col-12 col-lg-10">

                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">Gestión de Usuarios</h4>
                    </div>

                    <div id="alertContainer" class="mb-3"></div>

                    <div class="bento-card p-2 mb-4">
                        <div class="row g-2 align-items-center">
                            <div class="col">
                                <div class="input-group">
                                    <span class="input-group-text bg-light border-0">
                                        <i class="bi bi-search"></i>
                                    </span>
                                    <input
                                        type="text"
                                        id="filtroUsuario"
                                        class="form-control bg-light border-0"
                                        placeholder="Buscar usuario o correo..."
                                    >
                                </div>
                            </div>
                            <div class="col-auto">
                                <button
                                    class="btn btn-primary px-4"
                                    id="btnFiltrar"
                                    style="background-color: var(--azul); border-radius: 10px;"
                                >
                                    Filtrar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="bento-card p-4 mb-4">
                        <h6 class="fw-bold mb-4">Lista de usuarios</h6>
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead class="text-muted border-bottom">
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Correo</th>
                                        <th>Teléfono</th>
                                        <th>Municipio</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaUsuarios">
                                    <tr>
                                        <td colspan="5" class="text-muted">Cargando usuarios...</td>
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
                                        <span class="text-muted fw-semibold">Total usuarios</span>
                                        <span class="fw-bold fs-5" id="resumenTotal">0</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-muted fw-semibold">Con teléfono</span>
                                        <span class="fw-bold fs-5" id="resumenTelefono">0</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-muted fw-semibold">Sin teléfono</span>
                                        <span class="fw-bold fs-5" id="resumenSinTelefono">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-8">
                            <div class="bento-card p-4">
                                <h6 class="fw-bold mb-4">
                                    <i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente
                                </h6>
                                <div class="vstack gap-3" id="actividadUsuarios">
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
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["admin"]);

  const alertContainer = document.getElementById("alertContainer");
  const tablaUsuarios = document.getElementById("tablaUsuarios");
  const filtroUsuario = document.getElementById("filtroUsuario");
  const btnFiltrar = document.getElementById("btnFiltrar");

  const resumenTotal = document.getElementById("resumenTotal");
  const resumenTelefono = document.getElementById("resumenTelefono");
  const resumenSinTelefono = document.getElementById("resumenSinTelefono");
  const actividadUsuarios = document.getElementById("actividadUsuarios");

  let usuariosGlobal = [];

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;

    alertContainer.innerHTML = `
      <div class="alert alert-${type} rounded-4" role="alert">
        ${message}
      </div>
    `;
  };

  const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json"
  });

  const renderResumen = (usuarios) => {
    if (resumenTotal) {
      resumenTotal.textContent = usuarios.length;
    }

    if (resumenTelefono) {
      resumenTelefono.textContent = usuarios.filter(x => (x.telefono || "").trim() !== "").length;
    }

    if (resumenSinTelefono) {
      resumenSinTelefono.textContent = usuarios.filter(x => !(x.telefono || "").trim()).length;
    }
  };

  const renderActividad = (usuarios) => {
    if (!actividadUsuarios) return;

    const top = usuarios.slice(0, 3);

    if (!top.length) {
      actividadUsuarios.innerHTML = `
        <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
          No hay actividad disponible.
        </div>
      `;
      return;
    }

    actividadUsuarios.innerHTML = top.map((usuario, index) => `
      <div class="p-3 rounded-4 bg-light border-start border-4 ${
        index === 0 ? "border-primary" : index === 1 ? "border-success" : "border-warning"
      }">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="fw-bold mb-1">${usuario.nombres || ""} ${usuario.apellidos || ""}</h6>
          <small class="text-muted">Registro reciente</small>
        </div>
        <p class="small mb-0 text-muted">
          ${usuario.correo_electronico || "Sin correo"}${usuario.telefono ? " · " + usuario.telefono : ""}
        </p>
      </div>
    `).join("");
  };

  const renderUsuarios = (usuarios) => {
    if (!tablaUsuarios) return;

    if (!usuarios.length) {
      tablaUsuarios.innerHTML = `
        <tr>
          <td colspan="5" class="text-muted">No hay usuarios registrados.</td>
        </tr>
      `;
      return;
    }

    tablaUsuarios.innerHTML = usuarios.map(item => `
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <i class="bi bi-person-circle fs-3 me-2 text-secondary"></i>
            <div>
              <div class="fw-bold">${item.nombres || ""} ${item.apellidos || ""}</div>
              <div class="small text-muted">${item.resumen_profesional || ""}</div>
            </div>
          </div>
        </td>
        <td>${item.correo_electronico || "N/D"}</td>
        <td>${item.telefono || "N/D"}</td>
        <td>${item.nombre_municipio || item.id_municipio_fk || "N/D"}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <button
              class="btn btn-sm text-white fw-bold px-3 btn-eliminar"
              data-id="${item.id_usuario}"
              style="background-color:#dc3545; border-radius: 6px;"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    `).join("");

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const confirmado = confirm("¿Seguro que deseas eliminar este usuario?");
        if (confirmado) {
          await eliminarUsuario(id);
        }
      });
    });
  };

  const cargarUsuarios = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/usuarios`, {
        headers: authHeaders()
      });

      let data = [];
      try {
        data = await response.json();
      } catch {
        data = [];
      }

      if (response.status === 401 || response.status === 403) {
        if (typeof clearSession === "function") {
          clearSession();
        }
        window.location.href = "../../public/login";
        return;
      }

      if (!response.ok) {
        showAlert(data.mensaje || "No se pudieron cargar los usuarios.");
        return;
      }

      usuariosGlobal = Array.isArray(data) ? data : [];
      renderUsuarios(usuariosGlobal);
      renderResumen(usuariosGlobal);
      renderActividad(usuariosGlobal);
    } catch (error) {
      console.error(error);
      showAlert("Error de conexión con el servidor.");
    }
  };

  const eliminarUsuario = async (id) => {
    try {
      const response = await fetch(`${API_URL}/admin/usuarios/${id}`, {
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
        window.location.href = "../../public/login";
        return;
      }

      if (!response.ok) {
        showAlert(data.mensaje || "No se pudo eliminar el usuario.");
        return;
      }

      showAlert("Usuario eliminado correctamente.", "success");
      await cargarUsuarios();
    } catch (error) {
      console.error(error);
      showAlert("Error de conexión con el servidor.");
    }
  };

  const aplicarFiltro = () => {
    const texto = (filtroUsuario?.value || "").trim().toLowerCase();

    if (!texto) {
      renderUsuarios(usuariosGlobal);
      renderResumen(usuariosGlobal);
      renderActividad(usuariosGlobal);
      return;
    }

    const filtrados = usuariosGlobal.filter(item =>
      `${item.nombres || ""} ${item.apellidos || ""}`.toLowerCase().includes(texto) ||
      (item.correo_electronico || "").toLowerCase().includes(texto)
    );

    renderUsuarios(filtrados);
    renderResumen(filtrados);
    renderActividad(filtrados);
  };

  btnFiltrar?.addEventListener("click", aplicarFiltro);

  filtroUsuario?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      aplicarFiltro();
    }
  });

  cargarUsuarios();
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

        footer {
            background-color: var(--azul-oscuro);
            color: white;
            margin-top: auto;
        }

.table td,
.table th {
  vertical-align: middle;
}

.resumen-cell {
  max-width: 260px;
  white-space: normal;
}
</style>
