<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- ========== NAVBAR MEJORADO ========== -->
    <CompanyNavbar active="postulaciones" />

    <!-- ========== MAIN ========== -->
    <main class="flex-grow-1 py-4">
        <div class="container-fluid px-4 px-lg-5">

            <!-- Barra de filtros y búsqueda -->
            <div class="filter-bar mb-4 p-3 d-flex align-items-center flex-wrap gap-3">
                <div class="d-flex align-items-center">
                    <i class="bi bi-people-fill fs-2 me-2" style="color: var(--primary-deep);"></i>
                    <h4 class="fw-bold mb-0" style="color: #121826;">Gestión de Postulantes</h4>
                </div>
                <div class="ms-auto d-flex gap-2 flex-wrap">
                    <div class="input-group" style="max-width: 260px;">
                        <span class="input-group-text bg-transparent border-0 text-muted">
                            <i class="bi bi-search"></i>
                        </span>
                        <input type="text" class="form-control bg-transparent border-0 shadow-none" 
                               placeholder="Buscar por nombre o correo...">
                    </div>
                    <select class="form-select w-auto rounded-pill bg-light border-0 fw-medium">
                        <option selected>Todas las vacantes</option>
                        <option>Backend Developer</option>
                        <option>Frontend Developer</option>
                        <option>Diseñador UI/UX</option>
                    </select>
                    <select class="form-select w-auto rounded-pill bg-light border-0 fw-medium">
                        <option selected>Todos los estados</option>
                        <option>En revisión</option>
                        <option>Entrevista</option>
                        <option>Aprobado</option>
                        <option>Rechazado</option>
                    </select>
                </div>
            </div>

            <div class="row g-4">

                <!-- Columna principal: Lista de candidatos -->
                <section class="col-12 col-xl-8">
                    <!-- Contenedor para app.js (ID conservado) -->
                    <div id="contenedorPostulaciones">
                        <!-- Ejemplo de tarjeta estática (se reemplaza por app.js) -->
                        <!-- 
                        <div class="candidate-card d-flex align-items-center flex-wrap gap-3">
                            <div class="d-flex align-items-center gap-3 flex-grow-1">
                                <div class="avatar-circle">CR</div>
                                <div>
                                    <h6 class="fw-bold mb-1">Carlos Ruiz</h6>
                                    <p class="text-secondary small mb-0">carlos.ruiz@email.com</p>
                                </div>
                                <div class="ms-md-4">
                                    <span class="badge bg-light text-dark px-3 py-2">Backend Developer</span>
                                </div>
                                <div class="ms-auto text-end">
                                    <span class="status-badge status-review">En revisión</span>
                                    <p class="text-secondary small mb-0 mt-1">Postulado: 12/04/2026</p>
                                </div>
                            </div>
                            <div class="d-flex gap-2">
                                <button class="action-btn" title="Ver perfil" data-bs-toggle="modal" data-bs-target="#modalPerfilCandidato"><i class="bi bi-eye"></i></button>
                                <button class="action-btn" title="Contactar" data-bs-toggle="modal" data-bs-target="#modalContactar"><i class="bi bi-chat-dots"></i></button>
                                <div class="dropdown">
                                    <button class="action-btn" data-bs-toggle="dropdown"><i class="bi bi-three-dots-vertical"></i></button>
                                    <ul class="dropdown-menu dropdown-menu-end border-0 shadow-sm rounded-3">
                                        <li><a class="dropdown-item" href="#">Mover a Entrevista</a></li>
                                        <li><a class="dropdown-item" href="#">Aprobar</a></li>
                                        <li><a class="dropdown-item text-danger" href="#">Rechazar</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        -->
                    </div>
                </section>

                <!-- Sidebar derecho -->
                <aside class="col-12 col-xl-4">

                    <!-- Resumen con gráfico simple -->
                    <div class="sidebar-card">
                        <h6 class="fw-bold mb-3 d-flex align-items-center">
                            <i class="bi bi-pie-chart me-2" style="color: var(--primary-deep);"></i>Resumen de postulaciones
                        </h6>
                        <div class="d-flex align-items-center gap-4">
                            <div style="width: 100px; height: 100px;">
                                <svg viewBox="0 0 40 40">
                                    <circle cx="20" cy="20" r="16" fill="none" stroke="#e9ecf9" stroke-width="4"/>
                                    <circle cx="20" cy="20" r="16" fill="none" stroke="#3f51b5" stroke-width="4" stroke-dasharray="25 75" stroke-dashoffset="25" stroke-linecap="round" transform="rotate(-90 20 20)"/>
                                    <circle cx="20" cy="20" r="16" fill="none" stroke="#28a745" stroke-width="4" stroke-dasharray="15 85" stroke-dashoffset="5" stroke-linecap="round" transform="rotate(-90 20 20)"/>
                                </svg>
                            </div>
                            <div class="flex-grow-1">
                                <div class="d-flex justify-content-between small"><span>En revisión</span> <span class="fw-bold">18</span></div>
                                <div class="d-flex justify-content-between small"><span>Entrevistas</span> <span class="fw-bold">9</span></div>
                                <div class="d-flex justify-content-between small"><span>Aprobados</span> <span class="fw-bold">6</span></div>
                            </div>
                        </div>
                        <hr class="my-3">
                        <div class="d-flex justify-content-between">
                            <span class="fw-medium">Total postulantes</span>
                            <span class="fw-bold fs-5" style="color: var(--primary-deep);">42</span>
                        </div>
                    </div>

                    <!-- Vacantes con más postulantes -->
                    <div class="sidebar-card">
                        <h6 class="fw-bold mb-3 d-flex align-items-center">
                            <i class="bi bi-bar-chart-line me-2" style="color: var(--primary-deep);"></i>Vacantes más activas
                        </h6>
                        <div class="d-flex flex-column gap-3">
                            <div>
                                <div class="d-flex justify-content-between small fw-medium mb-1">
                                    <span>Backend Developer</span>
                                    <span>16</span>
                                </div>
                                <div class="progress" style="height:6px;"><div class="progress-bar" style="width:80%; background:var(--primary-deep);"></div></div>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between small fw-medium mb-1">
                                    <span>Frontend Developer</span>
                                    <span>12</span>
                                </div>
                                <div class="progress" style="height:6px;"><div class="progress-bar" style="width:60%; background:var(--primary-deep);"></div></div>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between small fw-medium mb-1">
                                    <span>Diseñador UI/UX</span>
                                    <span>8</span>
                                </div>
                                <div class="progress" style="height:6px;"><div class="progress-bar" style="width:40%; background:var(--primary-deep);"></div></div>
                            </div>
                        </div>
                    </div>

                    <!-- Últimos postulantes -->
                    <div class="sidebar-card">
                        <h6 class="fw-bold mb-3 d-flex align-items-center">
                            <i class="bi bi-clock-history me-2" style="color: var(--primary-deep);"></i>Recientes
                        </h6>
                        <div class="d-flex flex-column gap-3">
                            <div class="d-flex align-items-center gap-3">
                                <div class="avatar-circle" style="width:40px; height:40px; font-size:0.9rem;">CR</div>
                                <div><span class="fw-semibold d-block">Carlos Ruiz</span><small class="text-secondary">Hace 2h</small></div>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <div class="avatar-circle" style="width:40px; height:40px; font-size:0.9rem;">MG</div>
                                <div><span class="fw-semibold d-block">María García</span><small class="text-secondary">Hace 5h</small></div>
                            </div>
                            <div class="d-flex align-items-center gap-3">
                                <div class="avatar-circle" style="width:40px; height:40px; font-size:0.9rem;">PL</div>
                                <div><span class="fw-semibold d-block">Pedro López</span><small class="text-secondary">Ayer</small></div>
                            </div>
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    </main>

    <!-- ========== MODAL PERFIL CANDIDATO (conservado) ========== -->
    <div class="modal fade" id="modalPerfilCandidato" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 rounded-4 shadow-lg">
                <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
                    <h5 class="modal-title fw-bold" style="color: #121826;">Perfil del Candidato</h5>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body px-4 py-4">
                    <div class="d-flex align-items-center mb-4">
                        <div class="bg-light p-4 rounded-4 me-4">
                            <i class="bi bi-person display-4" style="color: var(--primary-deep);"></i>
                        </div>
                        <div>
                            <h4 class="fw-bold mb-1" id="perfilNombre">Cargando...</h4>
                            <p class="fw-semibold mb-0" style="color: var(--primary-deep);" id="perfilPuesto">Cargando...</p>
                        </div>
                    </div>
                    <hr>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label class="text-secondary small">Correo</label>
                            <p class="fw-medium" id="perfilCorreo">---</p>
                        </div>
                        <div class="col-md-6">
                            <label class="text-secondary small">Teléfono</label>
                            <p class="fw-medium" id="perfilTelefono">---</p>
                        </div>
                        <div class="col-12">
                            <label class="text-secondary small">CV / Resumen</label>
                            <p class="fw-medium" id="perfilResumen">---</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-top-0 px-4 pb-4">
                    <button type="button" class="btn btn-primary-deep px-4" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ========== MODAL CONTACTAR (conservado) ========== -->
    <div class="modal fade" id="modalContactar" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 rounded-4 shadow-lg">
                <div class="modal-header border-bottom-0 pb-0 px-4 pt-4">
                    <h5 class="modal-title fw-bold" style="color: #121826;">Contactar Candidato</h5>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body px-4 py-4">
                    <form>
                        <div class="mb-3">
                            <label class="form-label small fw-semibold">Para:</label>
                            <input type="text" class="form-control bg-light border-0 rounded-3 py-2 fw-medium" id="contactoDestino" readonly>
                        </div>
                        <div class="mb-4">
                            <label class="form-label small fw-semibold">Mensaje:</label>
                            <textarea class="form-control bg-light border-0 rounded-3 py-2" rows="5" placeholder="Escribe tu mensaje..." id="contactoMensaje"></textarea>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="button" class="btn btn-primary-deep px-4" id="btnEnviarMensaje">Enviar mensaje</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- ========== FOOTER ========== -->
    <footer class="py-4 mt-auto footer-custom">
        <div class="container text-center">
            <div class="d-flex flex-wrap justify-content-center gap-4 gap-md-5">
                <a href="#"><i class="bi bi-question-circle me-1"></i>Ayuda</a>
                <a href="#"><i class="bi bi-shield-lock me-1"></i>Privacidad</a>
                <a href="#">Términos</a>
                <span class="text-white opacity-75">💼 Workly 2026 · Conectando talento</span>
            </div>
        </div>
    </footer>

    <!-- Bootstrap JS -->

    <!-- Script de la aplicación (conservado) -->


    <!-- Script para aplicar estilos a las tarjetas generadas por app.js -->
  </div>
</template>

<script setup>
import CompanyNavbar from "../../../components/CompanyNavbar.vue";
import { onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";
import { createSafeAlert, escapeHtml } from "../../../assets/js/shared/security.js";

onMounted(async () => {
  requireAuth(["empresa"]);

  const contenedorPostulaciones = document.getElementById("contenedorPostulaciones");
  const searchInput = document.querySelector(".filter-bar input");
  const selectVacante = document.querySelectorAll(".filter-bar select")[0];
  const selectEstado = document.querySelectorAll(".filter-bar select")[1];
  const sidebarCards = [...document.querySelectorAll(".sidebar-card")];
  const inputContactoMensaje = document.getElementById("contactoMensaje");
  const btnEnviarMensaje = document.getElementById("btnEnviarMensaje");

  let postulaciones = [];
  let postulacionSeleccionada = null;

  const authHeaders = (withJson = false) => ({
    ...(withJson ? { "Content-Type": "application/json" } : {}),
    Authorization: `Bearer ${getToken()}`
  });

  const formatearFecha = (fecha) => {
    if (!fecha) return "N/D";
    return new Date(fecha).toLocaleDateString("es-SV");
  };

  const getEstadoClass = (estadoId) => {
    if (Number(estadoId) === 2) return "bg-primary-subtle text-primary";
    if (Number(estadoId) === 3) return "bg-success text-white";
    if (Number(estadoId) === 4) return "bg-danger text-white";
    if (Number(estadoId) === 5) return "bg-dark text-white";
    return "bg-warning text-dark";
  };

  const abrirPerfil = (item) => {
    document.getElementById("perfilNombre").textContent = `${item.nombres} ${item.apellidos}`;
    document.getElementById("perfilPuesto").textContent = item.titulo_puesto || "Postulante";
    document.getElementById("perfilCorreo").textContent = item.correo_electronico || "---";
    document.getElementById("perfilTelefono").textContent = item.telefono || "---";
    document.getElementById("perfilResumen").textContent = item.resumen_profesional || "Sin resumen profesional.";

    const modal = new bootstrap.Modal(document.getElementById("modalPerfilCandidato"));
    modal.show();
  };

  const abrirContacto = (item) => {
    postulacionSeleccionada = item;
    const inputDestino = document.getElementById("contactoDestino");
    if (inputDestino) {
      inputDestino.value = `${item.nombres} ${item.apellidos} (${item.correo_electronico || "sin correo"})`;
    }
    if (inputContactoMensaje) {
      inputContactoMensaje.value = `Hola ${item.nombres}, queremos dar seguimiento a tu postulacion para ${item.titulo_puesto || "esta vacante"}.`;
    }
    const modal = new bootstrap.Modal(document.getElementById("modalContactar"));
    modal.show();
  };

  const enviarMensaje = async () => {
    if (!postulacionSeleccionada?.id_usuario) {
      throw new Error("No se encontro el usuario para enviar el mensaje.");
    }

    const mensaje = inputContactoMensaje?.value.trim();
    if (!mensaje) {
      throw new Error("Escribe un mensaje antes de enviarlo.");
    }

    const response = await fetch(`${API_URL}/notificaciones`, {
      method: "POST",
      headers: authHeaders(true),
      body: JSON.stringify({
        tipo_usuario: "usuario",
        id_destinatario: Number(postulacionSeleccionada.id_usuario),
        titulo: `Mensaje de empresa sobre ${postulacionSeleccionada.titulo_puesto || "tu postulacion"}`,
        mensaje,
        tipo_notificacion: "comentario",
        enlace: `/views/usuario/detalleempleo?id=${postulacionSeleccionada.id_vacante_fk}`
      })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo enviar el mensaje al usuario.");
    }

    inputContactoMensaje.value = "";
    bootstrap.Modal.getInstance(document.getElementById("modalContactar"))?.hide();
    window.alert("Mensaje enviado correctamente. El usuario ya lo puede ver en sus notificaciones.");
  };

  const actualizarEstado = async (idPostulacion, nuevoEstadoId) => {
    const response = await fetch(`${API_URL}/postulaciones/${idPostulacion}/estado`, {
      method: "PUT",
      headers: authHeaders(true),
      body: JSON.stringify({ id_estado_fk: Number(nuevoEstadoId) })
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo actualizar el estado.");
    }

    await cargarLista();
  };

  const filtrar = () => {
    const texto = (searchInput?.value || "").trim().toLowerCase();
    const vacante = selectVacante?.value || "Todas las vacantes";
    const estado = selectEstado?.value || "Todos los estados";

    return postulaciones.filter((item) => {
      const nombreCompleto = `${item.nombres} ${item.apellidos}`;
      const coincideTexto =
        !texto ||
        [nombreCompleto, item.correo_electronico, item.titulo_puesto]
          .some((value) => String(value || "").toLowerCase().includes(texto));

      const coincideVacante = vacante === "Todas las vacantes" || item.titulo_puesto === vacante;
      const coincideEstado = estado === "Todos los estados" || item.nombre_estado === estado;
      return coincideTexto && coincideVacante && coincideEstado;
    });
  };

  const renderSidebar = () => {
    const resumenCard = sidebarCards[0];
    const activasCard = sidebarCards[1];
    const recientesCard = sidebarCards[2];

    if (resumenCard) {
      const counts = {
        revision: postulaciones.filter((item) => Number(item.id_estado_fk) === 1 || Number(item.id_estado_fk) === 2).length,
        entrevistas: postulaciones.filter((item) => Number(item.id_estado_fk) === 3).length,
        aprobados: postulaciones.filter((item) => Number(item.id_estado_fk) === 5).length,
        total: postulaciones.length
      };

      const numbers = resumenCard.querySelectorAll(".fw-bold");
      if (numbers[0]) numbers[0].textContent = String(counts.revision);
      if (numbers[1]) numbers[1].textContent = String(counts.entrevistas);
      if (numbers[2]) numbers[2].textContent = String(counts.aprobados);
      const totalNode = resumenCard.querySelector(".fw-bold.fs-5");
      if (totalNode) totalNode.textContent = String(counts.total);
    }

    if (activasCard) {
      const top = Object.values(postulaciones.reduce((acc, item) => {
        const key = item.titulo_puesto || "Vacante";
        if (!acc[key]) acc[key] = { titulo: key, total: 0 };
        acc[key].total += 1;
        return acc;
      }, {})).sort((a, b) => b.total - a.total).slice(0, 3);

      const blocks = activasCard.querySelectorAll(".d-flex.flex-column.gap-3 > div");
      blocks.forEach((block, index) => {
        const item = top[index];
        if (!item) return;
        const labels = block.querySelectorAll(".small.fw-medium span");
        if (labels[0]) labels[0].textContent = item.titulo;
        if (labels[1]) labels[1].textContent = String(item.total);
        const bar = block.querySelector(".progress-bar");
        if (bar) bar.style.width = `${Math.min(100, item.total * 12)}%`;
      });
    }

    if (recientesCard) {
      const root = recientesCard.querySelector(".d-flex.flex-column.gap-3");
      if (!root) return;

      const recientes = postulaciones.slice(0, 3);
      root.innerHTML = recientes.map((item) => {
        const initials = `${item.nombres?.[0] || ""}${item.apellidos?.[0] || ""}`.toUpperCase();
        return `
          <div class="d-flex align-items-center gap-3">
            <div class="avatar-circle" style="width:40px; height:40px; font-size:0.9rem;">${initials}</div>
            <div>
              <span class="fw-semibold d-block">${item.nombres} ${item.apellidos}</span>
              <small class="text-secondary">${formatearFecha(item.fecha_postulacion)}</small>
            </div>
          </div>
        `;
      }).join("") || `<p class="text-muted mb-0">No hay postulantes recientes.</p>`;
    }
  };

  const renderFiltros = () => {
    const vacantesUnicas = [...new Set(postulaciones.map((item) => item.titulo_puesto).filter(Boolean))];
    const estadosUnicos = [...new Set(postulaciones.map((item) => item.nombre_estado).filter(Boolean))];
    const selectedVacante = selectVacante?.value || "Todas las vacantes";
    const selectedEstado = selectEstado?.value || "Todos los estados";

    if (selectVacante) {
      selectVacante.innerHTML = [
        "<option>Todas las vacantes</option>",
        ...vacantesUnicas.map((item) => `<option>${item}</option>`)
      ].join("");
      selectVacante.value = vacantesUnicas.includes(selectedVacante) ? selectedVacante : "Todas las vacantes";
    }

    if (selectEstado) {
      selectEstado.innerHTML = [
        "<option>Todos los estados</option>",
        ...estadosUnicos.map((item) => `<option>${item}</option>`)
      ].join("");
      selectEstado.value = estadosUnicos.includes(selectedEstado) ? selectedEstado : "Todos los estados";
    }
  };

  const renderPostulaciones = () => {
    const items = filtrar();

    if (!items.length) {
      contenedorPostulaciones.innerHTML = `<div class="text-center p-5 fw-bold text-muted">No hay postulantes registrados.</div>`;
      return;
    }

    contenedorPostulaciones.innerHTML = items.map((item) => {
      const nombreCompleto = `${item.nombres} ${item.apellidos}`;
      const initials = `${item.nombres?.[0] || ""}${item.apellidos?.[0] || ""}`.toUpperCase();

      return `
        <div class="candidate-card">
          <div class="d-flex align-items-center flex-wrap gap-3">
            <div class="d-flex align-items-center gap-3 flex-grow-1">
              <div class="avatar-circle">${initials}</div>
              <div>
                <h6 class="fw-bold mb-1">${nombreCompleto}</h6>
                <p class="text-secondary small mb-0">${item.correo_electronico || "Sin correo"} · ${item.titulo_puesto || "Vacante"}</p>
              </div>
              <div class="ms-md-4">
                <span class="badge bg-light text-dark px-3 py-2">${item.titulo_puesto}</span>
              </div>
              <div class="ms-auto text-end">
                <select class="form-select form-select-sm rounded-pill fw-bold ${getEstadoClass(item.id_estado_fk)} border-0 shadow-none select-estado" data-id="${item.id_postulacion}">
                  <option value="1" ${Number(item.id_estado_fk) === 1 ? "selected" : ""}>Recibida</option>
                  <option value="2" ${Number(item.id_estado_fk) === 2 ? "selected" : ""}>En Revisión</option>
                  <option value="3" ${Number(item.id_estado_fk) === 3 ? "selected" : ""}>Entrevista</option>
                  <option value="4" ${Number(item.id_estado_fk) === 4 ? "selected" : ""}>Rechazada</option>
                  <option value="5" ${Number(item.id_estado_fk) === 5 ? "selected" : ""}>Contratado</option>
                </select>
                <p class="text-secondary small mb-0 mt-1">Postulado: ${formatearFecha(item.fecha_postulacion)}</p>
              </div>
            </div>
            <div class="d-flex gap-2">
              <button class="action-btn btn-ver" data-id="${item.id_postulacion}" title="Ver perfil"><i class="bi bi-eye"></i></button>
              <button class="action-btn btn-contactar" data-id="${item.id_postulacion}" title="Contactar"><i class="bi bi-chat-dots"></i></button>
              <a class="action-btn text-decoration-none" href="../detallepostulacion?id=${item.id_postulacion}" title="Abrir detalle"><i class="bi bi-box-arrow-up-right"></i></a>
            </div>
          </div>
        </div>
      `;
    }).join("");

    contenedorPostulaciones.querySelectorAll(".btn-ver").forEach((button) => {
      button.addEventListener("click", () => {
        const item = postulaciones.find((postulacion) => String(postulacion.id_postulacion) === button.dataset.id);
        if (item) abrirPerfil(item);
      });
    });

    contenedorPostulaciones.querySelectorAll(".btn-contactar").forEach((button) => {
      button.addEventListener("click", () => {
        const item = postulaciones.find((postulacion) => String(postulacion.id_postulacion) === button.dataset.id);
        if (item) abrirContacto(item);
      });
    });

    contenedorPostulaciones.querySelectorAll(".select-estado").forEach((select) => {
      select.addEventListener("change", async () => {
        try {
          await actualizarEstado(select.dataset.id, select.value);
        } catch (error) {
          console.error(error);
          window.alert(error.message);
        }
      });
    });
  };

  const cargarLista = async () => {
    const response = await fetch(`${API_URL}/empresa/postulaciones`, {
      headers: authHeaders()
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudieron cargar las postulaciones.");
    }

    postulaciones = Array.isArray(data) ? data : [];
    renderFiltros();
    renderSidebar();
    renderPostulaciones();
  };

  searchInput?.addEventListener("input", renderPostulaciones);
  selectVacante?.addEventListener("change", renderPostulaciones);
  selectEstado?.addEventListener("change", renderPostulaciones);
  btnEnviarMensaje?.addEventListener("click", async () => {
    try {
      await enviarMensaje();
    } catch (error) {
      console.error(error);
      window.alert(error.message);
    }
  });

  cargarLista().catch((error) => {
    console.error(error);
    contenedorPostulaciones.innerHTML = createSafeAlert(error.message, "danger");
  });
});
</script>

<style>

* { font-family: 'Inter', sans-serif; }
        :root {
            --primary-deep: #3f51b5;
            --nav-bg: #011671;
            --soft-accent: #f1ebd9;
            --light-text: #e2e4e8;
            --body-bg: #f5f7fc;
        }
        body {
            background: var(--body-bg);
        }
        /* Navbar personalizado */
        .navbar-custom {
            background-color: var(--nav-bg) !important;
            box-shadow: 0 6px 20px rgba(1, 22, 113, 0.15);
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
            color: var(--light-text);
            font-size: 0.95rem;
        }
        .nav-link-custom {
            color: white !important;
            font-weight: 500;
            padding: 0.5rem 1.2rem;
            border-radius: 30px;
            transition: all 0.2s;
            background: rgba(255,255,255,0.05);
        }
        .nav-link-custom:hover {
            background: rgba(255,255,255,0.15);
        }
        .nav-link-custom.active {
            background: rgba(255,255,255,0.2);
        }
        .btn-primary-deep {
            background: linear-gradient(135deg, var(--primary-deep), #2c3e8f);
            border: none;
            color: white;
            font-weight: 600;
            transition: all 0.25s ease;
            border-radius: 40px;
            padding: 0.5rem 1.5rem;
            box-shadow: 0 6px 14px rgba(63, 81, 181, 0.25);
        }
        .btn-primary-deep:hover {
            background: linear-gradient(135deg, #2c3e8f, var(--primary-deep));
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(63, 81, 181, 0.35);
            color: white;
        }
        .btn-outline-primary-deep {
            background: transparent;
            border: 1.5px solid var(--primary-deep);
            color: var(--primary-deep);
            font-weight: 600;
            border-radius: 40px;
            padding: 0.4rem 1.2rem;
            transition: all 0.2s;
        }
        .btn-outline-primary-deep:hover {
            background: var(--primary-deep);
            color: white;
        }
        /* Tarjetas */
        .filter-bar {
            background: white;
            border-radius: 60px;
            padding: 0.5rem 1rem;
            box-shadow: 0 8px 20px rgba(0,0,0,0.02);
            border: 1px solid #e2e8f0;
        }
        .candidate-card {
            background: white;
            border-radius: 24px;
            padding: 1.25rem 1.5rem;
            box-shadow: 0 8px 18px rgba(0,0,0,0.02);
            border: 1px solid #edf0f5;
            transition: all 0.2s;
            margin-bottom: 1rem;
        }
        .candidate-card:hover {
            box-shadow: 0 12px 24px -6px rgba(63,81,181,0.08);
            border-color: rgba(63,81,181,0.2);
        }
        .sidebar-card {
            background: white;
            border-radius: 24px;
            padding: 1.5rem;
            box-shadow: 0 12px 24px -8px rgba(0,0,0,0.04);
            border: 1px solid #edf0f5;
            margin-bottom: 1.5rem;
        }
        .status-badge {
            padding: 0.35rem 1rem;
            border-radius: 40px;
            font-weight: 600;
            font-size: 0.75rem;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            white-space: nowrap;
        }
        .status-pending { background: #fff3cd; color: #856404; }
        .status-review { background: #e9ecf9; color: var(--primary-deep); }
        .status-interview { background: #d1ecf1; color: #0c5460; }
        .status-approved { background: #d4edda; color: #155724; }
        .status-rejected { background: #f8d7da; color: #721c24; }
        /* Avatar */
        .avatar-circle {
            width: 52px;
            height: 52px;
            background: #eef2f9;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--primary-deep);
            font-weight: 700;
            font-size: 1.2rem;
        }
        /* Footer */
        .footer-custom {
            background-color: var(--nav-bg);
            color: var(--light-text);
        }
        .footer-custom a {
            color: var(--light-text) !important;
            text-decoration: none;
        }
        .footer-custom a:hover {
            color: white !important;
            text-decoration: underline;
        }
        .notification-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background-color: #ff4757;
            color: white;
            border-radius: 50%;
            padding: 0.25rem 0.45rem;
            font-size: 0.7rem;
            font-weight: bold;
            border: 2px solid white;
        }
        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
        }
        /* Dropdown actions */
        .action-btn {
            width: 36px;
            height: 36px;
            border-radius: 12px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #f8fafd;
            color: #4a5568;
            transition: all 0.15s;
        }
        .action-btn:hover {
            background: var(--primary-deep);
            color: white;
        }

.table td,
.table th {
  vertical-align: middle;
}

.badge-estado {
  font-size: 0.85rem;
}
</style>
