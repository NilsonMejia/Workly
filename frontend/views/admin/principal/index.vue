<template>
  <div>
    <AdminNavbar active="principal" />

        <main class="container-fluid px-4 py-4">
            <div class="row g-4">
                <aside class="col-12 col-lg-2">
                    <div class="bento-card p-3 h-100">
                        <h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">Menú Admin</h6>
                        <div class="d-flex flex-column">
                            <a href="." class="btn-menu-side active"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
                            <a href="../gestionusuarios" class="btn-menu-side text-nowrap"><i class="bi bi-people-fill me-2"></i> Gestión de Usuarios</a>
                            <a href="../gestionempresas" class="btn-menu-side text-nowrap"><i class="bi bi-building me-2"></i> Gestión de Empresas</a>
                            <a href="../gestionvacantes" class="btn-menu-side text-nowrap"><i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes</a>
                            <a href="../estadisticas" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema</a>
                            <a href="../moderacion" class="btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> Moderación de Contenido</a>
                        </div>
                    </div>
                </aside>

                <div class="col-12 col-lg-10">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">Dashboard Administrativo</h4>
                    </div>

                    <div id="alertContainer" class="mb-3"></div>

                    <div class="row g-3 mb-4">
                        <div class="col-md-3">
                            <div class="bento-card p-3 text-center">
                                <h2 class="fw-bold mb-0" id="totalUsuarios">0</h2>
                                <p class="mb-0 fw-semibold small">Usuarios registrados</p>
                                <small class="text-success">Actualizado</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="bento-card p-3 text-center">
                                <h2 class="fw-bold mb-0" id="totalEmpresas">0</h2>
                                <p class="mb-0 fw-semibold small">Empresas activas</p>
                                <small class="text-success">Actualizado</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="bento-card p-3 text-center">
                                <h2 class="fw-bold mb-0" id="totalVacantes">0</h2>
                                <p class="mb-0 fw-semibold small">Vacantes publicadas</p>
                                <small class="text-success">Actualizado</small>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="bento-card p-3 text-center">
                                <h2 class="fw-bold mb-0" id="totalPostulaciones">0</h2>
                                <p class="mb-0 fw-semibold small">Postulaciones</p>
                                <small class="text-muted">Actividad general</small>
                            </div>
                        </div>
                    </div>

                    <div class="row g-4">
                        <div class="col-lg-8">
                            <div class="bento-card p-4 mb-4">
                                <h6 class="fw-bold mb-4">Crecimiento reciente</h6>
                                <div class="d-flex justify-content-around align-items-end" style="height: 180px;" id="chartDashboard">
                                    <div class="text-muted">Cargando...</div>
                                </div>
                            </div>

                            <div class="bento-card p-4">
                                <h6 class="fw-bold mb-4"><i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente</h6>
                                <div class="vstack gap-3" id="actividadReciente">
                                    <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
                                        Cargando actividad...
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4">
                            <div class="vstack gap-4">
                                <div class="bento-card p-4">
                                    <h6 class="fw-bold text-center mb-3">Accesos rápidos</h6>
                                    <a class="btn-quick-access" href="../gestionusuarios">Usuarios</a>
                                    <a class="btn-quick-access" href="../gestionempresas">Empresas</a>
                                    <a class="btn-quick-access" href="../gestionvacantes">Vacantes</a>
                                    <a class="btn-quick-access" href="../moderacion">Moderación</a>
                                </div>

                                <div class="bento-card p-4">
                                    <h6 class="fw-bold mb-3">Resumen operativo</h6>
                                    <div class="d-flex justify-content-between mb-2 small"><span>Últimos usuarios</span> <strong id="resumenUsuarios">0</strong></div>
                                    <div class="d-flex justify-content-between mb-2 small"><span>Últimas empresas</span> <strong id="resumenEmpresas">0</strong></div>
                                    <div class="d-flex justify-content-between mb-2 small"><span>Últimas vacantes</span> <strong id="resumenVacantes">0</strong></div>
                                    <div class="d-flex justify-content-between small"><span>Postulaciones</span> <strong id="resumenPostulaciones">0</strong></div>
                                </div>

                                <div class="bento-card p-4">
                                    <h6 class="fw-bold mb-3">Últimas vacantes</h6>
                                    <div id="ultimasVacantesBox" class="small text-muted">Cargando...</div>
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
import AdminNavbar from "../../../components/AdminNavbar.vue";
import { onMounted } from "vue";
import { API_URL, clearSession, getToken, navigateTo } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["admin"]);

  const alertContainer = document.getElementById("alertContainer");
  const totalUsuarios = document.getElementById("totalUsuarios");
  const totalEmpresas = document.getElementById("totalEmpresas");
  const totalVacantes = document.getElementById("totalVacantes");
  const totalPostulaciones = document.getElementById("totalPostulaciones");

  const resumenUsuarios = document.getElementById("resumenUsuarios");
  const resumenEmpresas = document.getElementById("resumenEmpresas");
  const resumenVacantes = document.getElementById("resumenVacantes");
  const resumenPostulaciones = document.getElementById("resumenPostulaciones");

  const chartDashboard = document.getElementById("chartDashboard");
  const actividadReciente = document.getElementById("actividadReciente");
  const ultimasVacantesBox = document.getElementById("ultimasVacantesBox");
  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;

    alertContainer.innerHTML = `
      <div class="alert alert-${type} rounded-4" role="alert">
        ${message}
      </div>
    `;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Reciente";
    const d = new Date(fecha);
    if (isNaN(d.getTime())) return "Reciente";
    return d.toLocaleDateString("es-SV");
  };

  const renderChart = (metricas) => {
    if (!chartDashboard) return;

    const values = [
      { label: "Usuarios", value: Number(metricas?.total_usuarios || 0) },
      { label: "Empresas", value: Number(metricas?.total_empresas || 0) },
      { label: "Vacantes", value: Number(metricas?.total_vacantes || 0) }
    ];

    const max = Math.max(...values.map(x => x.value), 1);

    chartDashboard.innerHTML = values.map(item => {
      const height = Math.max((item.value / max) * 130, 20);

      return `
        <div class="text-center">
          <div class="bar mx-auto" style="height:${height}px;"></div>
          <span class="small mt-2 d-block text-muted">${item.label}</span>
          <strong class="small d-block">${item.value}</strong>
        </div>
      `;
    }).join("");
  };

  const renderActividad = (usuarios, empresas, vacantes) => {
    if (!actividadReciente) return;

    const items = [];

    if (usuarios?.[0]) {
      items.push({
        titulo: "Nuevo usuario detectado",
        fecha: formatearFecha(usuarios[0].fecha_registro),
        detalle: `${usuarios[0].nombres || ""} ${usuarios[0].apellidos || ""}`.trim() || "Usuario"
      });
    }

    if (empresas?.[0]) {
      items.push({
        titulo: "Nueva empresa detectada",
        fecha: formatearFecha(empresas[0].fecha_registro),
        detalle: empresas[0].nombre_comercial || "Empresa"
      });
    }

    if (vacantes?.[0]) {
      items.push({
        titulo: "Nueva vacante detectada",
        fecha: formatearFecha(vacantes[0].fecha_publicacion),
        detalle: vacantes[0].titulo_puesto || "Vacante"
      });
    }

    if (!items.length) {
      actividadReciente.innerHTML = `
        <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
          No hay actividad disponible.
        </div>
      `;
      return;
    }

    actividadReciente.innerHTML = items.map((item, index) => `
      <div class="p-3 rounded-4 bg-light border-start border-4 ${index === 0 ? "border-primary" : index === 1 ? "border-danger" : "border-success"}">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="fw-bold mb-1">${item.titulo}</h6>
          <small class="text-muted">${item.fecha}</small>
        </div>
        <p class="small mb-0 text-muted">${item.detalle}</p>
      </div>
    `).join("");
  };

  const renderUltimasVacantes = (vacantes) => {
    if (!ultimasVacantesBox) return;

    if (!vacantes?.length) {
      ultimasVacantesBox.innerHTML = `No hay vacantes.`;
      return;
    }

    ultimasVacantesBox.innerHTML = vacantes.slice(0, 4).map(v => `
      <div class="mb-2">
        <div class="fw-semibold">${v.titulo_puesto || "Vacante"}</div>
        <div class="text-muted">${v.nombre_comercial || "Empresa"}</div>
      </div>
    `).join("");
  };

  const cargarDashboard = async () => {
    try {
      const response = await fetch(`${API_URL}/dashboard/admin`, {
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
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
        navigateTo("../../public/login");
        return;
      }

      if (!response.ok) {
        showAlert(data.mensaje || "No se pudo cargar el dashboard.");
        return;
      }

      if (totalUsuarios) totalUsuarios.textContent = data.metricas?.total_usuarios ?? 0;
      if (totalEmpresas) totalEmpresas.textContent = data.metricas?.total_empresas ?? 0;
      if (totalVacantes) totalVacantes.textContent = data.metricas?.total_vacantes ?? 0;
      if (totalPostulaciones) totalPostulaciones.textContent = data.metricas?.total_postulaciones ?? 0;

      if (resumenUsuarios) resumenUsuarios.textContent = data.ultimosUsuarios?.length ?? 0;
      if (resumenEmpresas) resumenEmpresas.textContent = data.ultimasEmpresas?.length ?? 0;
      if (resumenVacantes) resumenVacantes.textContent = data.ultimasVacantes?.length ?? 0;
      if (resumenPostulaciones) resumenPostulaciones.textContent = data.metricas?.total_postulaciones ?? 0;

      renderChart(data.metricas);
      renderActividad(data.ultimosUsuarios, data.ultimasEmpresas, data.ultimasVacantes);
      renderUltimasVacantes(data.ultimasVacantes);
    } catch (error) {
      console.error("Error al cargar dashboard:", error);
      showAlert("Error de conexión con el servidor.");
    }
  };

  cargarDashboard();
});
</script>

<style>

@import url("../../../assets/css/global.css");

:root {
            --azul-oscuro: #001670;
            --azul: #2C48D4;
            --celeste: #84ACF0;
            --amarillo-mostaza: #DDAE5B;
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

        .bar {
            background-color: var(--amarillo-mostaza);
            width: 80px;
            border-radius: 4px;
            transition: height .3s ease;
        }

        .btn-action {
            background-color: var(--azul);
            color: white;
            border-radius: 10px;
            font-weight: 600;
            border: none;
            padding: 10px 20px;
        }

        .btn-quick-access {
            background-color: #F2EBE4;
            color: #333;
            border: none;
            padding: 10px;
            border-radius: 8px;
            width: 100%;
            margin-bottom: 8px;
            font-weight: 500;
            text-decoration: none;
            display: block;
            text-align: center;
        }

        footer {
            background-color: var(--azul-oscuro);
            color: white;
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
  min-height: 140px;
}
</style>
