<template>
  <div>
    <nav class="navbar navbar-expand-lg py-3 sticky-top">
            <div class="container-fluid px-4">
                <a class="navbar-brand fw-bold text-white fs-3 d-flex align-items-center" href="../principal">
                    <i class="bi bi-briefcase-fill me-2"></i> Workly
                </a>

                <div class="collapse navbar-collapse" id="navContent">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
                        <li class="nav-item"><a class="nav-link nav-link-custom" href="../principal">Dashboard</a></li>
                        <li class="nav-item"><a class="nav-link nav-link-custom" href="../gestionusuarios">Usuarios</a></li>
                        <li class="nav-item"><a class="nav-link nav-link-custom" href="../gestionempresas">Empresas</a></li>
                        <li class="nav-item"><a class="nav-link nav-link-custom" href="../gestionvacantes">Vacantes</a></li>
                        <li class="nav-item"><a class="nav-link nav-link-custom" href=".">Estadísticas</a></li>
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
                            <a href="../principal" class="btn btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
                            <a href="../gestionusuarios" class="btn btn-menu-side text-nowrap"><i class="bi bi-people-fill me-2"></i> Gestión de Usuarios</a>
                            <a href="../gestionempresas" class="btn btn-menu-side text-nowrap"><i class="bi bi-building me-2"></i> Gestión de Empresas</a>
                            <a href="../gestionvacantes" class="btn btn-menu-side text-nowrap"><i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes</a>
                            <a href="." class="btn btn-menu-side active"><i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema</a>
                            <a href="../moderacion" class="btn btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> Moderación</a>
                        </div>
                    </div>
                </aside>

                <div class="col-12 col-lg-10">

                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">Estadísticas del Sistema</h4>
                    </div>

                    <div id="alertContainer" class="mb-3"></div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-3">
                            <div class="bento-card p-3 text-center">
                                <h2 class="stat-number mb-0" id="totalVacantesCategoria">0</h2>
                                <p class="mb-0 fw-semibold">Categorías con vacantes</p>
                                <small class="text-muted">Datos actuales</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="bento-card p-3 text-center">
                                <h2 class="stat-number mb-0" id="totalModalidades">0</h2>
                                <p class="mb-0 fw-semibold">Modalidades activas</p>
                                <small class="text-muted">Datos actuales</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="bento-card p-3 text-center">
                                <h2 class="stat-number mb-0" id="totalEstados">0</h2>
                                <p class="mb-0 fw-semibold">Estados de postulación</p>
                                <small class="text-muted">Datos actuales</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="bento-card p-3 text-center">
                                <h2 class="stat-number mb-0" id="totalEmpresasRanking">0</h2>
                                <p class="mb-0 fw-semibold">Empresas en ranking</p>
                                <small class="text-muted">Datos actuales</small>
                            </div>
                        </div>
                    </div>

                    <div class="row g-4 mb-4">
                        <div class="col-lg-8">
                            <div class="bento-card p-4 h-100">
                                <h6 class="fw-bold mb-4">Vacantes por categoría</h6>
                                <div class="d-flex justify-content-around align-items-end" style="height: 300px; border-bottom: 2px solid #eee;" id="chartCategorias">
                                    <div class="empty-box">Cargando datos...</div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="bento-card p-4 h-100">
                                <h6 class="fw-bold mb-4">Vacantes por modalidad</h6>
                                <div id="listaModalidades" class="small">
                                    <div class="empty-box">Cargando datos...</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row g-4">
                        <div class="col-lg-8">
                            <div class="bento-card p-4">
                                <h6 class="fw-bold mb-3">Empresas con más vacantes</h6>
                                <div class="table-responsive">
                                    <table class="table table-borderless align-middle">
                                        <thead class="text-muted small">
                                            <tr>
                                                <th>Empresa</th>
                                                <th class="text-end">Total vacantes</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tablaEmpresasVacantes">
                                            <tr>
                                                <td colspan="2" class="text-muted">Cargando datos...</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="vstack gap-4">
                                <div class="bento-card p-4">
                                    <h6 class="fw-bold mb-3">Postulaciones por estado</h6>
                                    <div id="listaEstados" class="small">
                                        <div class="empty-box">Cargando datos...</div>
                                    </div>
                                </div>

                                <div class="bento-card p-4">
                                    <h6 class="fw-bold mb-3">Resumen rápido</h6>
                                    <div class="d-flex justify-content-between mb-2"><span>Categorías</span> <strong id="resumenCategorias">0</strong></div>
                                    <div class="d-flex justify-content-between mb-2"><span>Modalidades</span> <strong id="resumenModalidades">0</strong></div>
                                    <div class="d-flex justify-content-between mb-2"><span>Estados</span> <strong id="resumenEstados">0</strong></div>
                                    <div class="d-flex justify-content-between"><span>Empresas rankeadas</span> <strong id="resumenEmpresas">0</strong></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>

        <footer class="py-4 mt-5">
            <div class="container text-center">
                <div class="d-flex justify-content-center gap-4 small opacity-75">
                    <a href="#" class="text-white text-decoration-none">Ayuda</a>
                    <a href="#" class="text-white text-decoration-none">Privacidad</a>
                    <span>Workly 2026</span>
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

  const totalVacantesCategoria = document.getElementById("totalVacantesCategoria");
  const totalModalidades = document.getElementById("totalModalidades");
  const totalEstados = document.getElementById("totalEstados");
  const totalEmpresasRanking = document.getElementById("totalEmpresasRanking");

  const chartCategorias = document.getElementById("chartCategorias");
  const listaModalidades = document.getElementById("listaModalidades");
  const tablaEmpresasVacantes = document.getElementById("tablaEmpresasVacantes");
  const listaEstados = document.getElementById("listaEstados");

  const resumenCategorias = document.getElementById("resumenCategorias");
  const resumenModalidades = document.getElementById("resumenModalidades");
  const resumenEstados = document.getElementById("resumenEstados");
  const resumenEmpresas = document.getElementById("resumenEmpresas");



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

  const renderCategoriasChart = (items) => {
    if (!chartCategorias) return;

    if (!items?.length) {
      chartCategorias.innerHTML = `<div class="empty-box">No hay datos de categorías.</div>`;
      return;
    }

    const top = items.slice(0, 6);
    const max = Math.max(...top.map(x => Number(x.total || 0)), 1);

    chartCategorias.innerHTML = top.map(item => {
      const total = Number(item.total || 0);
      const height = Math.max((total / max) * 220, 30);

      return `
        <div class="text-center bar-wrap">
          <div class="bar mx-auto" style="height:${height}px;"></div>
          <span class="small mt-2 d-block text-muted">${item.nombre_categoria ?? "N/D"}</span>
          <strong class="small">${total}</strong>
        </div>
      `;
    }).join("");
  };

  const renderModalidades = (items) => {
    if (!listaModalidades) return;

    if (!items?.length) {
      listaModalidades.innerHTML = `<div class="empty-box">No hay modalidades.</div>`;
      return;
    }

    listaModalidades.innerHTML = items.map(item => `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <span>${item.modalidad ?? "N/D"}</span>
        <strong>${item.total ?? 0}</strong>
      </div>
    `).join("");
  };

  const renderEstados = (items) => {
    if (!listaEstados) return;

    if (!items?.length) {
      listaEstados.innerHTML = `<div class="empty-box">No hay estados.</div>`;
      return;
    }

    listaEstados.innerHTML = items.map(item => `
      <div class="d-flex justify-content-between mb-2">
        <span>${item.nombre_estado ?? "N/D"}</span>
        <strong>${item.total ?? 0}</strong>
      </div>
    `).join("");
  };

  const renderEmpresas = (items) => {
    if (!tablaEmpresasVacantes) return;

    if (!items?.length) {
      tablaEmpresasVacantes.innerHTML = `
        <tr>
          <td colspan="2" class="text-muted">No hay datos de empresas.</td>
        </tr>
      `;
      return;
    }

    tablaEmpresasVacantes.innerHTML = items.map(item => `
      <tr class="border-bottom">
        <td class="fw-semibold">${item.nombre_comercial ?? "N/D"}</td>
        <td class="text-end">${item.total_vacantes ?? 0}</td>
      </tr>
    `).join("");
  };

  const cargarEstadisticas = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/estadisticas`, {
        headers: authHeaders()
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (response.status === 401 || response.status === 403) {
        clearSession();
        window.location.href = "../../public/login";
        return;
      }

      if (!response.ok) {
        showAlert(data.mensaje || "No se pudieron cargar las estadísticas.");
        return;
      }

      const categorias = data.vacantesPorCategoria || [];
      const modalidades = data.vacantesPorModalidad || [];
      const estados = data.postulacionesPorEstado || [];
      const empresas = data.empresasConMasVacantes || [];

      totalVacantesCategoria.textContent = categorias.length;
      totalModalidades.textContent = modalidades.length;
      totalEstados.textContent = estados.length;
      totalEmpresasRanking.textContent = empresas.length;

      resumenCategorias.textContent = categorias.length;
      resumenModalidades.textContent = modalidades.length;
      resumenEstados.textContent = estados.length;
      resumenEmpresas.textContent = empresas.length;

      renderCategoriasChart(categorias);
      renderModalidades(modalidades);
      renderEstados(estados);
      renderEmpresas(empresas);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
      showAlert("Error de conexión con el servidor.");
    }
  };

  cargarEstadisticas();
});
</script>

<style>

@import url("../../../assets/css/global.css");

:root {
            --azul-oscuro: #001670;
            --azul: #2C48D4;
            --celeste: #84ACF0;
            --amarillo-mostaza: #D4AF37;
            --gris-claro: #F0EBE5;
            --fondo: #E9F0FF;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--fondo);
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
            transition: transform 0.3s ease;
        }

        .bar-wrap {
            width: 80px;
        }

        .bar {
            background-color: #DDAE5B;
            width: 80px;
            border-radius: 8px 8px 0 0;
            transition: height 0.4s ease;
        }

        .btn-action {
            background-color: var(--azul);
            color: white;
            border-radius: 10px;
            font-weight: 600;
            border: none;
            padding: 10px 20px;
        }

        .stat-number {
            font-weight: 700;
        }

        .empty-box {
            color: #6c757d;
            font-size: 0.95rem;
        }

        footer {
            background-color: var(--azul-oscuro);
            color: white;
        }

.estadistica-item {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
  background: #fff;
}

.estadistica-label {
  font-weight: 600;
}

.estadistica-total {
  font-size: 1.1rem;
  font-weight: 700;
}
</style>
