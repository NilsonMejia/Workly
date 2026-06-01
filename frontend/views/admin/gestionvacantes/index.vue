<template>
  <div>
    <div class="loading-spinner">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>

        <AdminNavbar active="gestionvacantes" />

        <main class="container-fluid px-4 py-4">
            <div id="alertContainer" class="mb-3"></div>

            <div class="row g-4">
                <aside class="col-12 col-lg-2">
                    <div class="bento-card p-3 h-100">
                        <h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">Menú Admin</h6>
                        <div class="d-flex flex-column">
                            <a href="../principal" class="btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard</a>
                            <a href="../gestionusuarios" class="btn-menu-side"><i class="bi bi-people-fill me-2"></i> Gestión de Usuarios</a>
                            <a href="../gestionempresas" class="btn-menu-side"><i class="bi bi-building me-2"></i> Gestión de Empresas</a>
                            <a href="." class="btn-menu-side active"><i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes</a>
                            <a href="../estadisticas" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema</a>
                            <a href="../moderacion" class="btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> Moderación de Contenido</a>
                        </div>
                    </div>
                </aside>

                <div class="col-12 col-lg-10">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h4 class="fw-bold m-0" style="color: var(--azul-oscuro)">Gestión de Vacantes</h4>
                        <div class="d-flex gap-2">
                            <button class="btn btn-action-top" id="btnExportar">
                                <i class="bi bi-download me-2"></i>Exportar lista
                            </button>
                            <button class="btn btn-action-top" id="btnNuevaVacante" data-bs-toggle="modal" data-bs-target="#modalVacante">
                                <i class="bi bi-plus-circle me-2"></i>Nueva Vacante
                            </button>
                        </div>
                    </div>

                    <div class="bento-card p-2 mb-4">
                        <div class="row g-2 align-items-center">
                            <div class="col">
                                <div class="input-group">
                                    <span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span>
                                    <input type="text" class="form-control bg-light border-0" id="searchInput" placeholder="Buscar por título, empresa o categoría...">
                                </div>
                            </div>
                            <div class="col-auto">
                                <select class="form-select" id="estadoFilter" style="border-radius: 10px;">
                                    <option value="">Todos los estados</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Pausada">Pausada</option>
                                    <option value="Reportada">Reportada</option>
                                </select>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-primary px-4" id="btnFiltrar" style="background-color: var(--azul); border-radius: 10px;">
                                    <i class="bi bi-funnel me-2"></i>Filtrar
                                </button>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-secondary px-4" id="btnLimpiarFiltros" style="border-radius: 10px;">
                                    <i class="bi bi-eraser me-2"></i>Limpiar
                                </button>
                            </div>
                        </div>
                    </div>

                    <div class="bento-card p-4 mb-4">
                        <h6 class="fw-bold mb-4">Lista de vacantes</h6>
                        <div class="table-responsive">
                            <table class="table align-middle">
                                <thead class="text-muted border-bottom">
                                    <tr>
                                        <th>Vacante</th>
                                        <th>Empresa</th>
                                        <th>Estado</th>
                                        <th>Registro</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody id="tablaVacantes">
                                    <tr>
                                        <td colspan="5" class="text-center text-muted py-4">
                                            <div class="spinner-border text-primary" role="status">
                                                <span class="visually-hidden">Cargando...</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="row g-4">
                        <div class="col-12 col-md-4">
                            <div class="bento-card p-4 h-100">
                                <h6 class="fw-bold mb-4">
                                    <i class="bi bi-pie-chart me-2 text-primary"></i>Resumen
                                </h6>
                                <div class="vstack gap-3">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-muted fw-semibold">Total vacantes</span>
                                        <span class="fw-bold fs-5" id="resumenTotal">0</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-muted fw-semibold">Activas</span>
                                        <span class="fw-bold fs-5 text-success" id="resumenActivas">0</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-muted fw-semibold">Pausadas</span>
                                        <span class="fw-bold fs-5 text-warning" id="resumenPausadas">0</span>
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <span class="text-muted fw-semibold">Reportadas</span>
                                        <span class="fw-bold fs-5 text-danger" id="resumenReportadas">0</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-12 col-md-8">
                            <div class="bento-card p-4">
                                <h6 class="fw-bold mb-4">
                                    <i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente
                                </h6>
                                <div class="vstack gap-3" id="actividadVacantes">
                                    <div class="text-center text-muted py-3">
                                        <div class="spinner-border spinner-border-sm" role="status"></div>
                                        <span class="ms-2">Cargando actividad...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <div class="modal fade" id="modalVacante" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header" style="background-color: var(--azul-oscuro); color: white;">
                        <h5 class="modal-title">
                            <i class="bi bi-file-earmark-plus me-2"></i>
                            <span id="modalTitle">Nueva Vacante</span>
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="formVacante">
                            <input type="hidden" id="vacanteId">
                            <div class="mb-3">
                                <label class="form-label fw-bold">Título del puesto *</label>
                                <input type="text" class="form-control" id="tituloPuesto" required>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Empresa</label>
                                <select class="form-select" id="nombreEmpresa"></select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Categoría</label>
                                <select class="form-select" id="categoria"></select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Modalidad</label>
                                <select class="form-select" id="modalidad">
                                    <option value="Presencial">Presencial</option>
                                    <option value="Remoto">Remoto</option>
                                    <option value="Híbrido">Híbrido</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Descripción</label>
                                <textarea class="form-control" id="descripcion" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                                <label class="form-label fw-bold">Estado</label>
                                <select class="form-select" id="estadoVacante">
                                    <option value="Activo">Activo</option>
                                    <option value="Pausada">Pausada</option>
                                    <option value="Reportada">Reportada</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary" id="btnGuardarVacante" style="background-color: var(--azul);">
                            <i class="bi bi-save me-2"></i>Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>

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
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="confirmarAccionBtn">Confirmar</button>
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
import AdminNavbar from "../../../components/AdminNavbar.vue";
import { onMounted } from "vue";
import { API_URL, getToken, clearSession, navigateTo } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";
import { escapeHtml } from "../../../assets/js/shared/security.js";

onMounted(async () => {
  requireAuth(["admin"]);

  const tablaVacantes = document.getElementById("tablaVacantes");
  const searchInput = document.getElementById("searchInput");
  const estadoFilter = document.getElementById("estadoFilter");
  const btnFiltrar = document.getElementById("btnFiltrar");
  const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
  const btnExportar = document.getElementById("btnExportar");
  const btnNuevaVacante = document.getElementById("btnNuevaVacante");
  const btnGuardarVacante = document.getElementById("btnGuardarVacante");
  const alertContainer = document.getElementById("alertContainer");
  const actividadVacantes = document.getElementById("actividadVacantes");
  const resumenTotal = document.getElementById("resumenTotal");
  const resumenActivas = document.getElementById("resumenActivas");
  const resumenPausadas = document.getElementById("resumenPausadas");
  const resumenReportadas = document.getElementById("resumenReportadas");
  const selectEmpresa = document.getElementById("nombreEmpresa");
  const selectCategoria = document.getElementById("categoria");

  let vacantesGlobal = [];

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
      <div class="alert alert-${type} alert-dismissible fade show rounded-4" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "N/D";
    const parsed = new Date(fecha);
    if (Number.isNaN(parsed.getTime())) return "N/D";
    return parsed.toLocaleDateString("es-SV");
  };

  const renderSelectOptions = (select, items, valueKey, labelBuilder, placeholder) => {
    if (!select) return;
    select.innerHTML = [`<option value="">${placeholder}</option>`]
      .concat(items.map((item) => `<option value="${item[valueKey]}">${labelBuilder(item)}</option>`))
      .join("");
  };

  const cargarCatalogos = async () => {
    const [empresasResponse, categoriasResponse] = await Promise.all([
      fetch(`${API_URL}/admin/empresas`, { headers: authHeaders() }),
      fetch(`${API_URL}/catalogos/categorias`)
    ]);

    if (empresasResponse.status === 401 || empresasResponse.status === 403) {
      redirectToLogin();
      return false;
    }

    if (!empresasResponse.ok || !categoriasResponse.ok) {
      throw new Error("No se pudieron cargar empresas o categorías.");
    }

    const empresas = await empresasResponse.json();
    const categorias = await categoriasResponse.json();

    renderSelectOptions(selectEmpresa, empresas, "id_empresa", (item) => item.nombre_comercial, "Selecciona una empresa");
    renderSelectOptions(selectCategoria, categorias, "id_categoria", (item) => item.nombre_categoria, "Selecciona una categoría");

    return true;
  };

  const renderResumen = (vacantes) => {
    if (resumenTotal) resumenTotal.textContent = vacantes.length;
    if (resumenActivas) resumenActivas.textContent = vacantes.filter((item) => (item.estado || "Activo") === "Activo").length;
    if (resumenPausadas) resumenPausadas.textContent = vacantes.filter((item) => item.estado === "Pausada").length;
    if (resumenReportadas) resumenReportadas.textContent = vacantes.filter((item) => item.estado === "Reportada").length;
  };

  const renderActividad = (vacantes) => {
    if (!actividadVacantes) return;

    const top = [...vacantes]
      .sort((a, b) => new Date(b.fecha_publicacion || 0) - new Date(a.fecha_publicacion || 0))
      .slice(0, 3);

    if (!top.length) {
      actividadVacantes.innerHTML = `
        <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
          No hay actividad disponible.
        </div>
      `;
      return;
    }

    actividadVacantes.innerHTML = top.map((vacante, index) => `
      <div class="p-3 rounded-4 bg-light border-start border-4 ${index === 0 ? "border-primary" : index === 1 ? "border-success" : "border-warning"}">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="fw-bold mb-1">${escapeHtml(vacante.titulo_puesto || "Vacante")}</h6>
          <small class="text-muted">${escapeHtml(formatearFecha(vacante.fecha_publicacion))}</small>
        </div>
        <p class="small mb-0 text-muted">${escapeHtml(vacante.nombre_comercial || "Empresa")} · ${escapeHtml(vacante.modalidad || "N/D")} · ${escapeHtml(vacante.estado || "Activo")}</p>
      </div>
    `).join("");
  };

  const renderVacantes = (vacantes) => {
    if (!tablaVacantes) return;

    if (!vacantes.length) {
      tablaVacantes.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted py-5">
            <i class="bi bi-inbox fs-1 d-block mb-2"></i>
            No hay vacantes registradas
          </td>
        </tr>
      `;
      return;
    }

    tablaVacantes.innerHTML = vacantes.map((vacante) => `
      <tr>
        <td>
          <div class="fw-bold">${escapeHtml(vacante.titulo_puesto || "N/D")}</div>
          <div class="small text-muted">${escapeHtml(vacante.modalidad || "N/D")} · ${escapeHtml(vacante.nombre_categoria || "Sin categoría")}</div>
        </td>
        <td>${escapeHtml(vacante.nombre_comercial || "N/D")}</td>
        <td><span class="badge bg-${vacante.estado === "Pausada" ? "warning text-dark" : vacante.estado === "Reportada" ? "danger" : "success"} px-3 py-2">${escapeHtml(vacante.estado || "Activo")}</span></td>
        <td class="text-muted">${escapeHtml(formatearFecha(vacante.fecha_publicacion))}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <button class="btn btn-sm btn-outline-info btn-ver" data-id="${escapeHtml(vacante.id_vacante)}"><i class="bi bi-eye"></i></button>
            <button class="btn btn-sm btn-outline-warning btn-editar" data-id="${escapeHtml(vacante.id_vacante)}"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-sm btn-outline-secondary btn-estado" data-id="${escapeHtml(vacante.id_vacante)}" data-estado="Pausada"><i class="bi bi-pause-circle"></i></button>
            <button class="btn btn-sm btn-outline-primary btn-estado" data-id="${escapeHtml(vacante.id_vacante)}" data-estado="Activo"><i class="bi bi-play-circle"></i></button>
            <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${escapeHtml(vacante.id_vacante)}"><i class="bi bi-trash"></i></button>
          </div>
        </td>
      </tr>
    `).join("");

    tablaVacantes.querySelectorAll(".btn-ver").forEach((button) => {
      button.addEventListener("click", () => {
        const vacante = vacantesGlobal.find((item) => String(item.id_vacante) === button.dataset.id);
        if (!vacante) return;
        showAlert(`
          <strong>${escapeHtml(vacante.titulo_puesto)}</strong><br>
          Empresa: ${escapeHtml(vacante.nombre_comercial)}<br>
          Categoría: ${escapeHtml(vacante.nombre_categoria)}<br>
          Modalidad: ${escapeHtml(vacante.modalidad || "N/D")}<br>
          Estado: ${escapeHtml(vacante.estado || "Activo")}<br>
          Descripción: ${escapeHtml(vacante.descripcion_puesto || "Sin descripción")}
        `, "info");
      });
    });

    tablaVacantes.querySelectorAll(".btn-editar").forEach((button) => {
      button.addEventListener("click", () => {
        const vacante = vacantesGlobal.find((item) => String(item.id_vacante) === button.dataset.id);
        if (!vacante) return;

        document.getElementById("modalTitle").textContent = "Editar Vacante";
        document.getElementById("vacanteId").value = vacante.id_vacante;
        document.getElementById("tituloPuesto").value = vacante.titulo_puesto || "";
        document.getElementById("nombreEmpresa").value = vacante.id_empresa_fk || "";
        document.getElementById("categoria").value = vacante.id_categoria_fk || "";
        document.getElementById("modalidad").value = vacante.modalidad || "Presencial";
        document.getElementById("descripcion").value = vacante.descripcion_puesto || "";
        document.getElementById("estadoVacante").value = vacante.estado || "Activo";

        new bootstrap.Modal(document.getElementById("modalVacante")).show();
      });
    });

    tablaVacantes.querySelectorAll(".btn-estado").forEach((button) => {
      button.addEventListener("click", async () => {
        await cambiarEstadoVacante(button.dataset.id, button.dataset.estado);
      });
    });

    tablaVacantes.querySelectorAll(".btn-eliminar").forEach((button) => {
      button.addEventListener("click", async () => {
        if (window.confirm("¿Seguro que deseas eliminar esta vacante?")) {
          await eliminarVacante(button.dataset.id);
        }
      });
    });
  };

  const aplicarFiltroLocal = () => {
    const texto = (searchInput?.value || "").trim().toLowerCase();
    const estado = estadoFilter?.value || "";

    const filtradas = vacantesGlobal.filter((vacante) => {
      const coincideTexto = !texto ||
        (vacante.titulo_puesto || "").toLowerCase().includes(texto) ||
        (vacante.nombre_comercial || "").toLowerCase().includes(texto) ||
        (vacante.nombre_categoria || "").toLowerCase().includes(texto);

      const coincideEstado = !estado || (vacante.estado || "Activo") === estado;
      return coincideTexto && coincideEstado;
    });

    renderVacantes(filtradas);
    renderResumen(filtradas);
    renderActividad(filtradas);
  };

  const limpiarFormularioVacante = () => {
    document.getElementById("vacanteId").value = "";
    document.getElementById("formVacante").reset();
    document.getElementById("modalTitle").textContent = "Nueva Vacante";
  };

  const obtenerPayloadVacante = () => ({
    id_empresa_fk: document.getElementById("nombreEmpresa").value,
    id_categoria_fk: document.getElementById("categoria").value,
    titulo_puesto: document.getElementById("tituloPuesto").value.trim(),
    descripcion_puesto: document.getElementById("descripcion").value.trim(),
    modalidad: document.getElementById("modalidad").value,
    estado: document.getElementById("estadoVacante").value
  });

  const guardarVacante = async () => {
    const id = document.getElementById("vacanteId").value.trim();
    const payload = obtenerPayloadVacante();

    if (!payload.id_empresa_fk || !payload.id_categoria_fk || !payload.titulo_puesto || !payload.descripcion_puesto) {
      showAlert("Completa empresa, categoría, título y descripción.", "warning");
      return;
    }

    const response = await fetch(id ? `${API_URL}/admin/vacantes/${id}` : `${API_URL}/admin/vacantes`, {
      method: id ? "PUT" : "POST",
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
      showAlert(data.mensaje || "No se pudo guardar la vacante.");
      return;
    }

    showAlert(id ? "Vacante actualizada correctamente." : "Vacante creada correctamente.", "success");
    bootstrap.Modal.getInstance(document.getElementById("modalVacante"))?.hide();
    limpiarFormularioVacante();
    await cargarVacantes();
  };

  const cambiarEstadoVacante = async (id, estado) => {
    const response = await fetch(`${API_URL}/admin/vacantes/${id}/estado`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ estado })
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
      showAlert(data.mensaje || "No se pudo cambiar el estado.");
      return;
    }

    showAlert("Estado actualizado correctamente.", "success");
    await cargarVacantes();
  };

  const eliminarVacante = async (id) => {
    const response = await fetch(`${API_URL}/admin/vacantes/${id}`, {
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
      showAlert(data.mensaje || "No se pudo eliminar la vacante.");
      return;
    }

    showAlert("Vacante eliminada correctamente.", "success");
    await cargarVacantes();
  };

  const cargarVacantes = async () => {
    const response = await fetch(`${API_URL}/admin/vacantes`, {
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
      showAlert(data.mensaje || "No se pudieron cargar las vacantes.");
      vacantesGlobal = [];
      renderVacantes([]);
      renderResumen([]);
      renderActividad([]);
      return;
    }

    vacantesGlobal = Array.isArray(data) ? data : [];
    renderVacantes(vacantesGlobal);
    renderResumen(vacantesGlobal);
    renderActividad(vacantesGlobal);
  };

  const exportarLista = () => {
    if (!vacantesGlobal.length) {
      showAlert("No hay datos para exportar.", "warning");
      return;
    }

    const rows = [
      ["ID", "Titulo", "Empresa", "Categoria", "Estado", "Fecha"],
      ...vacantesGlobal.map((vacante) => [
        vacante.id_vacante,
        vacante.titulo_puesto,
        vacante.nombre_comercial,
        vacante.nombre_categoria,
        vacante.estado || "Activo",
        formatearFecha(vacante.fecha_publicacion)
      ])
    ];

    const csv = rows
      .map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vacantes_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  btnFiltrar?.addEventListener("click", aplicarFiltroLocal);
  btnLimpiarFiltros?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (estadoFilter) estadoFilter.value = "";
    renderVacantes(vacantesGlobal);
    renderResumen(vacantesGlobal);
    renderActividad(vacantesGlobal);
  });
  btnExportar?.addEventListener("click", exportarLista);
  btnNuevaVacante?.addEventListener("click", limpiarFormularioVacante);
  btnGuardarVacante?.addEventListener("click", guardarVacante);
  searchInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") aplicarFiltroLocal();
  });
  document.getElementById("modalVacante")?.addEventListener("hidden.bs.modal", limpiarFormularioVacante);

  await cargarCatalogos();
  await cargarVacantes();
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

        .modal-content {
            border-radius: 20px;
        }

        .form-control:focus, .form-select:focus {
            border-color: var(--azul);
            box-shadow: 0 0 0 0.2rem rgba(44, 72, 212, 0.25);
        }

        .loading-spinner {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
        }

        .btn-loading {
            pointer-events: none;
            opacity: 0.6;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .table tbody tr {
            animation: fadeIn 0.3s ease-out;
        }

        .btn-outline-info:hover, .btn-outline-warning:hover,
        .btn-outline-secondary:hover, .btn-outline-success:hover,
        .btn-outline-primary:hover, .btn-outline-danger:hover {
            transform: scale(1.05);
            transition: transform 0.2s;
        }

.table td,
.table th {
  vertical-align: middle;
}

.puesto-cell {
  max-width: 260px;
  white-space: normal;
}
</style>
