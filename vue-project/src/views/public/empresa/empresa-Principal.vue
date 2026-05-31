<template>
  <div class="d-flex flex-column min-vh-100">
    <!-- ========== NAVBAR MEJORADO ========== -->
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal/index.html">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Panel de Empresa</span>
          </div>
        </a>

        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarContent">
          <div class="navbar-nav mx-auto mt-3 mt-lg-0 gap-1">
            <a href="../publicarvacante/index.html" class="nav-link-custom text-decoration-none">
              <i class="bi bi-plus-circle me-1"></i> Publicar
            </a>
            <a href="../misvacantes/index.html" class="nav-link-custom text-decoration-none">
              <i class="bi bi-briefcase me-1"></i> Mis vacantes
            </a>
            <a href="../postulaciones/index.html" class="nav-link-custom text-decoration-none">
              <i class="bi bi-people me-1"></i> Postulaciones
            </a>
            <a href="../foro/index.html" class="nav-link-custom text-decoration-none">
              <i class="bi bi-chat-dots me-1"></i> Foro
            </a>
            <a href="../resenaempresa/index.html" class="nav-link-custom text-decoration-none">
              <i class="bi bi-star me-1"></i> Reseñas
            </a>
          </div>

          <div class="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
            <a href="../notificaciones/index.html" class="text-white position-relative d-inline-block">
              <i class="bi bi-bell-fill fs-3"></i>
              <span class="notification-badge">2</span>
            </a>
            <a href="../perfil/index.html" class="text-white d-inline-block">
              <i class="bi bi-person-circle fs-2"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>

    <!-- ========== MAIN ========== -->
    <main class="flex-grow-1 py-4">
      <div class="container-fluid px-4 px-lg-5">
        
        <!-- Barra de búsqueda y acción rápida -->
        <div class="filter-bar mb-5 d-flex align-items-center flex-wrap">
          <div class="d-flex align-items-center me-auto">
            <i class="bi bi-speedometer2 fs-3 me-3" style="color: var(--primary-deep);"></i>
            <h4 class="fw-bold mb-0 glow-text" style="color: #121826;">Panel de Control</h4>
          </div>
          <div class="d-flex gap-2 align-items-center mt-2 mt-sm-0">
            <div class="input-group" style="max-width: 280px;">
              <span class="input-group-text bg-transparent border-0 text-muted">
                <i class="bi bi-search"></i>
              </span>
              <input type="text" id="inputBusquedaDashboard" class="form-control bg-transparent border-0 shadow-none" 
                     placeholder="Buscar vacantes o postulantes...">
            </div>
            <button type="button" id="btnBuscarDashboard" class="btn btn-outline-primary-deep px-4">
              <i class="bi bi-search me-1"></i> Buscar
            </button>
            <button type="button" id="btnIrPublicarVacante" class="btn btn-primary-deep px-4">
              <i class="bi bi-plus-lg me-1"></i> Publicar Vacante
            </button>
          </div>
        </div>
        <div id="alertContainer"></div>

        <!-- Métricas rápidas (nuevas tarjetas creativas) -->
        <div class="row g-4 mb-5">
          <div class="col-6 col-md-3">
            <div class="metric-card text-center">
              <div class="bg-light rounded-4 p-3 d-inline-flex mb-3">
                <i class="bi bi-eye-fill fs-1" style="color: var(--primary-deep);"></i>
              </div>
              <h2 class="fw-bold mb-1 counter" data-target="1850">0</h2>
              <p class="text-secondary small fw-medium mb-0">Vistas totales</p>
              <small class="text-success"><i class="bi bi-arrow-up-short"></i> +12% esta semana</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="metric-card text-center">
              <div class="bg-light rounded-4 p-3 d-inline-flex mb-3">
                <i class="bi bi-people-fill fs-1" style="color: var(--primary-deep);"></i>
              </div>
              <h2 class="fw-bold mb-1" id="totalPostulaciones">0</h2>
              <p class="text-secondary small fw-medium mb-0">Postulantes</p>
              <small class="text-success" id="textoPostulacionesResumen"><i class="bi bi-arrow-up-short"></i> Datos en vivo</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="metric-card text-center">
              <div class="bg-light rounded-4 p-3 d-inline-flex mb-3">
                <i class="bi bi-briefcase-fill fs-1" style="color: var(--primary-deep);"></i>
              </div>
              <h2 class="fw-bold mb-1" id="totalVacantes">0</h2>
              <p class="text-secondary small fw-medium mb-0">Vacantes activas</p>
              <small class="text-warning" id="textoVacantesResumen"><i class="bi bi-clock"></i> Datos en vivo</small>
            </div>
          </div>
          <div class="col-6 col-md-3">
            <div class="metric-card text-center">
              <div class="bg-light rounded-4 p-3 d-inline-flex mb-3">
                <i class="bi bi-star-fill fs-1" style="color: #ffb347;"></i>
              </div>
              <h2 class="fw-bold mb-1">4.8</h2>
              <p class="text-secondary small fw-medium mb-0">Calificación</p>
              <small><i class="bi bi-star-fill text-warning"></i> +45 reseñas</small>
            </div>
          </div>
        </div>

        <div class="row g-4">
          
          <!-- Columna principal -->
          <section class="col-12 col-lg-8">
            
            <!-- Caja de publicación rápida (mejorada) -->
            <div class="main-card">
              <div class="d-flex align-items-center gap-3 mb-4">
                <div class="bg-light p-3 rounded-4">
                  <i class="bi bi-megaphone fs-3" style="color: var(--primary-deep);"></i>
                </div>
                <div>
                  <h5 class="fw-bold mb-0" style="color: #121826;">Crear publicación</h5>
                  <p class="text-secondary small mb-0">Comparte novedades, vacantes o cultura empresarial</p>
                </div>
              </div>
              
              <textarea id="textareaPublicacion" class="form-control border-0 shadow-none px-0 mb-4" 
                        rows="3" placeholder="¿Qué quieres compartir hoy?" 
                        style="font-size: 1.1rem; resize: none; font-weight: 400;"></textarea>
              
              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <div class="d-flex flex-wrap gap-2">
                  <span class="badge-category active"><i class="bi bi-briefcase me-1"></i>Vacante</span>
                  <span class="badge-category"><i class="bi bi-newspaper me-1"></i>Noticia</span>
                  <span class="badge-category"><i class="bi bi-emoji-smile me-1"></i>Cultura</span>
                  <span class="badge-category"><i class="bi bi-calendar-event me-1"></i>Evento</span>
                </div>
                <div class="d-flex gap-2 mt-3 mt-sm-0">
                  <button type="button" id="btnGuardarPub" class="btn btn-outline-primary-deep px-4 fw-semibold">
                    <i class="bi bi-bookmark me-1"></i> Borrador
                  </button>
                  <button type="button" id="btnPublicarPub" class="btn btn-primary-deep px-4 fw-semibold">
                    <i class="bi bi-send me-1"></i> Publicar
                  </button>
                </div>
              </div>
            </div>

            <!-- Publicación 1 (con vacante) - más creativa -->
            <div class="post-card">
              <div class="d-flex gap-3 mb-4">
                <div class="flex-shrink-0">
                  <div class="bg-light p-3 rounded-4 shadow-sm">
                    <i class="bi bi-building fs-2" style="color: var(--primary-deep);"></i>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="fw-bold mb-0" style="color: #121826;">TechSolutions 
                        <span class="badge bg-info bg-opacity-10 text-info ms-2 px-3 py-1 rounded-pill">Verificada</span>
                      </h6>
                      <span class="text-secondary small"><i class="bi bi-clock me-1"></i>Hace 2 horas · 🌎 San Salvador</span>
                    </div>
                    <i class="bi bi-three-dots-vertical text-secondary"></i>
                  </div>
                </div>
              </div>
              
              <p class="text-secondary mb-4" style="font-size: 1rem;">🚀 Estamos buscando talento para nuestro equipo de desarrollo. Buscamos un <strong>Backend Developer</strong> con experiencia en APIs, bases de datos, .NET y trabajo en equipo. ¡Únete a nosotros!</p>
              
              <div class="bg-light p-4 rounded-4 mb-4 border-start border-4" style="border-color: var(--primary-deep) !important;">
                <div class="d-flex align-items-center gap-2 mb-3">
                  <i class="bi bi-briefcase-fill fs-5" style="color: var(--primary-deep);"></i>
                  <span class="fw-bold fs-5">Backend Developer</span>
                  <span class="badge bg-warning bg-opacity-15 text-warning px-3 py-1 rounded-pill ms-2">NUEVO</span>
                </div>
                <div class="row g-2 text-secondary small">
                  <div class="col-md-4"><i class="bi bi-clock me-1"></i>Tiempo completo</div>
                  <div class="col-md-4"><i class="bi bi-laptop me-1"></i>Híbrido</div>
                  <div class="col-md-4"><i class="bi bi-geo-alt me-1"></i>San Salvador</div>
                </div>
                <div class="mt-3 fw-bold" style="color: var(--primary-deep);">💰 Salario: $1,200 - $1,800</div>
              </div>

              <div class="d-flex flex-wrap align-items-center justify-content-between">
                <div class="d-flex gap-3">
                  <span class="stat-badge"><i class="bi bi-people me-1"></i>24 postulantes</span>
                  <span class="stat-badge"><i class="bi bi-eye me-1"></i>85 vistas</span>
                  <span class="stat-badge"><i class="bi bi-bookmark me-1"></i>12 guardados</span>
                </div>
                <div class="d-flex gap-2 mt-3 mt-sm-0">
                  <button class="btn btn-sm btn-light rounded-pill px-4"><i class="bi bi-hand-thumbs-up"></i> 18</button>
                  <button class="btn btn-sm btn-light rounded-pill px-4"><i class="bi bi-chat"></i> 6</button>
                  <button class="btn btn-sm btn-light rounded-pill px-4"><i class="bi bi-share"></i></button>
                </div>
              </div>
            </div>

            <!-- Publicación 2 (cultura) -->
            <div class="post-card">
              <div class="d-flex gap-3 mb-4">
                <div class="flex-shrink-0">
                  <div class="bg-light p-3 rounded-4 shadow-sm">
                    <i class="bi bi-building fs-2" style="color: var(--primary-deep);"></i>
                  </div>
                </div>
                <div class="flex-grow-1">
                  <div class="d-flex justify-content-between">
                    <div>
                      <h6 class="fw-bold mb-0">TechSolutions</h6>
                      <span class="text-secondary small"><i class="bi bi-clock me-1"></i>Hace 5 horas</span>
                    </div>
                    <i class="bi bi-three-dots-vertical text-secondary"></i>
                  </div>
                </div>
              </div>
              
              <p class="text-secondary mb-4">🎉 ¡Nuestra cultura de trabajo híbrido sigue creciendo! Hoy integramos nuevas herramientas para facilitar la comunicación entre equipos presenciales y remotos. 🚀💻</p>
              
              <div class="bg-gradient p-3 rounded-4 mb-4" style="background: linear-gradient(145deg, #f8faff, #eef2fe);">
                <div class="d-flex align-items-center gap-3">
                  <i class="bi bi-emoji-smile fs-1" style="color: var(--primary-deep);"></i>
                  <div>
                    <span class="fw-bold">#CulturaWorkly</span>
                    <p class="small mb-0">Promovemos el bienestar y la innovación.</p>
                  </div>
                </div>
              </div>
              
              <div class="d-flex gap-3">
                <span class="stat-badge"><i class="bi bi-heart me-1"></i>32 reacciones</span>
                <span class="stat-badge"><i class="bi bi-chat me-1"></i>9 comentarios</span>
              </div>
            </div>

            <!-- Gráfico de actividad semanal (creativo) -->
            <div class="main-card">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="fw-bold mb-0"><i class="bi bi-bar-chart-line me-2" style="color: var(--primary-deep);"></i>Actividad semanal</h6>
                <span class="text-secondary small">Últimos 7 días</span>
              </div>
              <div class="row align-items-end g-3" style="min-height: 140px;">
                <div class="col text-center">
                  <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                    <div style="width: 30px; background: var(--primary-deep); height: 35px; border-radius: 12px 12px 4px 4px; opacity: 0.7;"></div>
                  </div>
                  <small>Lun</small>
                </div>
                <div class="col text-center">
                  <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                    <div style="width: 30px; background: var(--primary-deep); height: 48px; border-radius: 12px 12px 4px 4px; opacity: 0.8;"></div>
                  </div>
                  <small>Mar</small>
                </div>
                <div class="col text-center">
                  <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                    <div style="width: 30px; background: var(--primary-deep); height: 60px; border-radius: 12px 12px 4px 4px;"></div>
                  </div>
                  <small>Mié</small>
                </div>
                <div class="col text-center">
                  <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                    <div style="width: 30px; background: var(--primary-deep); height: 42px; border-radius: 12px 12px 4px 4px; opacity: 0.8;"></div>
                  </div>
                  <small>Jue</small>
                </div>
                <div class="col text-center">
                  <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                    <div style="width: 30px; background: var(--primary-deep); height: 55px; border-radius: 12px 12px 4px 4px; opacity: 0.9;"></div>
                  </div>
                  <small>Vie</small>
                </div>
                <div class="col text-center">
                  <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                    <div style="width: 30px; background: var(--primary-deep); height: 30px; border-radius: 12px 12px 4px 4px; opacity: 0.6;"></div>
                  </div>
                  <small>Sáb</small>
                </div>
                <div class="col text-center">
                  <div style="height: 60px; display: flex; align-items: flex-end; justify-content: center;">
                    <div style="width: 30px; background: var(--primary-deep); height: 20px; border-radius: 12px 12px 4px 4px; opacity: 0.5;"></div>
                  </div>
                  <small>Dom</small>
                </div>
              </div>
            </div>

          </section>

          <!-- Sidebar creativo -->
          <aside class="col-12 col-lg-4">
            
            <!-- Vacantes activas + progreso -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center">
                <i class="bi bi-briefcase-fill me-2" style="color: var(--primary-deep);"></i>Vacantes activas
              </h6>
              <div class="d-flex align-items-center justify-content-between mb-2">
                <span class="fw-bold fs-4">12</span>
                <span class="badge bg-success bg-opacity-10 text-success px-3 py-1 rounded-pill">+2 esta semana</span>
              </div>
              <div class="activity-bar mb-3">
                <div class="activity-fill" style="width: 75%;"></div>
              </div>
              <p class="text-secondary small">75% de ocupación · 3 vacantes críticas</p>
              <button class="btn btn-outline-primary-deep w-100 mt-3" id="btnGestionarVacantesAside">
                Gestionar vacantes <i class="bi bi-arrow-right ms-1"></i>
              </button>
            </div>

            <!-- Postulantes recientes con avatares -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center">
                <i class="bi bi-person-plus me-2" style="color: var(--primary-deep);"></i>Postulantes recientes
              </h6>
              <ul class="list-unstyled mb-0">
                <li class="d-flex align-items-center gap-3 mb-3">
                  <div class="position-relative">
                    <i class="bi bi-person-circle fs-2" style="color: var(--primary-deep);"></i>
                    <span class="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-white" style="width: 10px; height: 10px;"></span>
                  </div>
                  <div class="flex-grow-1">
                    <span class="fw-semibold">Carlos Ruiz</span>
                    <p class="small text-secondary mb-0">Backend Developer · 2h</p>
                  </div>
                  <span class="badge bg-warning bg-opacity-15 text-warning">Nuevo</span>
                </li>
                <li class="d-flex align-items-center gap-3 mb-3">
                  <i class="bi bi-person-circle fs-2" style="color: #5a6ab0;"></i>
                  <div class="flex-grow-1">
                    <span class="fw-semibold">María García</span>
                    <p class="small text-secondary mb-0">Frontend · 5h</p>
                  </div>
                </li>
                <li class="d-flex align-items-center gap-3 mb-3">
                  <i class="bi bi-person-circle fs-2" style="color: #6b7fc9;"></i>
                  <div class="flex-grow-1">
                    <span class="fw-semibold">José Méndez</span>
                    <p class="small text-secondary mb-0">DevOps · 1d</p>
                  </div>
                </li>
              </ul>
              <button class="btn btn-outline-primary-deep w-100 mt-2" id="btnVerTodosPostulantesAside">
                Ver todos (48) <i class="bi bi-arrow-right ms-1"></i>
              </button>
            </div>

            <!-- Recursos destacados con iconos -->
            <div class="sidebar-card">
              <h6 class="fw-bold mb-3 d-flex align-items-center">
                <i class="bi bi-journal-text me-2" style="color: var(--primary-deep);"></i>Recursos destacados
              </h6>
              <div class="d-flex flex-column gap-3">
                <div class="d-flex align-items-center gap-3">
                  <div class="bg-light p-3 rounded-4"><i class="bi bi-file-earmark-text fs-5" style="color: var(--primary-deep);"></i></div>
                  <div><span class="fw-medium">Guía para redactar vacantes</span><br><small class="text-secondary">12 min lectura</small></div>
                </div>
                <div class="d-flex align-items-center gap-3">
                  <div class="bg-light p-3 rounded-4"><i class="bi bi-people fs-5" style="color: var(--primary-deep);"></i></div>
                  <div><span class="fw-medium">Buenas prácticas de reclutamiento</span><br><small class="text-secondary">8 min lectura</small></div>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>

    <!-- ========== FOOTER ========== -->
    <footer class="footer-custom py-4 mt-auto">
      <div class="container-fluid px-4 px-lg-5">
        <div class="row align-items-center justify-content-between flex-column flex-sm-row gap-3">
          <div class="text-center text-sm-start">
            <span class="fw-bold">Workly</span> &copy; 2026 - Todos los derechos reservados.
          </div>
          <div class="d-flex gap-4 justify-content-center text-center">
            <a href="#">Soporte</a>
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'EmpresaPrincipal',
  mounted() {
    // === TU LOGICA JAVASCRIPT EXACTA ===

    // Variables de simulación de datos de la empresa (pueden venir de un servidor)
    const datosEmpresa = {
        totalPostulaciones: 48,
        totalVacantes: 12,
        mensajesSemanales: ["Datos actualizados", "Sin novedades críticas"]
    };

    // Función para renderizar estadísticas principales
    function inicializarDashboard() {
        const txtPostulaciones = document.getElementById("totalPostulaciones");
        const txtVacantes = document.getElementById("totalVacantes");
        const resPostulaciones = document.getElementById("textoPostulacionesResumen");
        const resVacantes = document.getElementById("textoVacantesResumen");

        if(txtPostulaciones && txtVacantes) {
            txtPostulaciones.textContent = datosEmpresa.totalPostulaciones;
            txtVacantes.textContent = datosEmpresa.totalVacantes;
            
            resPostulaciones.innerHTML = '<i class="bi bi-arrow-up-short"></i> 4 nuevos hoy';
            resVacantes.innerHTML = '<i class="bi bi-check2-circle"></i> Todo activo';
        }

        // Efecto contador animado para las vistas totales
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 50; // Velocidad de la animación

            const updateCount = () => {
                if (count < target) {
                    count = Math.ceil(count + speed);
                    counter.textContent = count;
                    setTimeout(updateCount, 20);
                } else {
                    counter.textContent = target;
                }
            };
            updateCount();
        });
    }

    // Manejo de la simulación de creación de posts/publicaciones
    const btnPublicar = document.getElementById("btnPublicarPub");
    const btnGuardar = document.getElementById("btnGuardarPub");
    const textareaPub = document.getElementById("textareaPublicacion");
    const alertContainer = document.getElementById("alertContainer");

    function mostrarAlerta(mensaje, tipo = "success") {
        if(!alertContainer) return;
        alertContainer.innerHTML = `
            <div class="alert alert-${tipo} alert-dismissible fade show rounded-4 shadow-sm mb-4" role="alert">
                <i class="bi ${tipo === 'success' ? 'bi-check-circle-fill' : 'bi-info-circle-fill'} me-2"></i>
                ${mensaje}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        setTimeout(() => {
            const alert = document.querySelector('.alert');
            if(alert) {
                // eslint-disable-next-line no-undef
                const bsAlert = bootstrap.Alert.getInstance(alert) || new bootstrap.Alert(alert);
                bsAlert.close();
            }
        }, 4000);
    }

    if(btnPublicar && textareaPub) {
        btnPublicar.addEventListener("click", () => {
            const contenido = textareaPub.value.trim();
            if(contenido === "") {
                mostrarAlerta("Por favor escribe algo antes de publicar.", "danger");
                return;
            }
            mostrarAlerta("¡Publicación compartida con éxito en tu feed de empresa!");
            textareaPub.value = "";
        });
    }

    if(btnGuardar && textareaPub) {
        btnGuardar.addEventListener("click", () => {
            const contenido = textareaPub.value.trim();
            if(contenido === "") {
                mostrarAlerta("No puedes guardar un borrador vacío.", "danger");
                return;
            }
            mostrarAlerta("Borrador guardado correctamente.", "secondary");
        });
    }

    // Buscador del Dashboard
    const btnBuscar = document.getElementById("btnBuscarDashboard");
    const inputBusqueda = document.getElementById("inputBusquedaDashboard");

    if(btnBuscar && inputBusqueda) {
        btnBuscar.addEventListener("click", () => {
            const criterio = inputBusqueda.value.trim();
            if(criterio !== "") {
                mostrarAlerta(`Buscando "${criterio}" en tus registros...`, "info");
            }
        });
        inputBusqueda.addEventListener("keyup", (e) => {
            if(e.key === "Enter" && inputBusqueda.value.trim() !== "") {
                mostrarAlerta(`Buscando "${inputBusqueda.value.trim()}" en tus registros...`, "info");
            }
        });
    }

    // Redirecciones rápidas
    const btnIrPublicar = document.getElementById("btnIrPublicarVacante");
    if(btnIrPublicar) {
        btnIrPublicar.addEventListener("click", () => {
            window.location.href = "../publicarvacante/index.html";
        });
    }

    // Redirecciones agregadas para los onclicks inline del HTML original
    const btnGestionarVacantesAside = document.getElementById("btnGestionarVacantesAside");
    if(btnGestionarVacantesAside) {
        btnGestionarVacantesAside.addEventListener("click", () => {
            window.location.href = '../misvacantes/index.html';
        });
    }

    const btnVerTodosPostulantesAside = document.getElementById("btnVerTodosPostulantesAside");
    if(btnVerTodosPostulantesAside) {
        btnVerTodosPostulantesAside.addEventListener("click", () => {
            window.location.href = '../postulaciones/index.html';
        });
    }

    // Ejecutar lógica inicial
    inicializarDashboard();
  }
}
</script>

<style scoped>
/* Cambiado el target de body a un contenedor general para aplicar a Vue de forma correcta */
div, * { 
  font-family: 'Inter', sans-serif; 
}

:root {
    --primary-deep: #3f51b5;
    --nav-bg: #011671;
    --soft-accent: #f1ebd9;
    --light-text: #e2e4e8;
    --body-bg: #f0f4fe;
}

/* Navbar personalizado */
.navbar-custom {
    background-color: #011671 !important; /* Forzado del valor de var(--nav-bg) de manera directa para asegurar la consistencia */
    box-shadow: 0 6px 20px rgba(1, 22, 113, 0.15);
}
.navbar-brand .brand-icon {
    font-size: 3.5rem;
    color: white;
    margin-right: 0.75rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
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
.nav-link-custom {
    color: white !important;
    font-weight: 500;
    padding: 0.5rem 1.2rem;
    border-radius: 30px;
    transition: all 0.2s;
    background: rgba(255,255,255,0.05);
    margin: 0 2px;
}
.nav-link-custom:hover {
    background: rgba(255,255,255,0.15);
    transform: translateY(-1px);
}
.btn-primary-deep {
    background: linear-gradient(135deg, #3f51b5, #2c3e8f);
    border: none;
    color: white;
    font-weight: 600;
    transition: all 0.25s ease;
    border-radius: 40px;
    padding: 0.6rem 1.8rem;
    box-shadow: 0 6px 14px rgba(63, 81, 181, 0.25);
}
.btn-primary-deep:hover {
    background: linear-gradient(135deg, #2c3e8f, #3f51b5);
    transform: translateY(-3px);
    box-shadow: 0 12px 20px rgba(63, 81, 181, 0.35);
    color: white;
}
.btn-outline-primary-deep {
    background: transparent;
    border: 2px solid #3f51b5;
    color: #3f51b5;
    font-weight: 600;
    border-radius: 40px;
    padding: 0.45rem 1.5rem;
    transition: all 0.2s;
}
.btn-outline-primary-deep:hover {
    background: #3f51b5;
    color: white;
    transform: translateY(-2px);
}
/* Tarjetas */
.metric-card {
    background: white;
    border-radius: 24px;
    padding: 1.5rem 1.2rem;
    box-shadow: 0 15px 30px -8px rgba(0, 20, 60, 0.08);
    border: 1px solid rgba(63, 81, 181, 0.08);
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
}
.metric-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 35px -10px rgba(63, 81, 181, 0.15);
    border-color: #3f51b5;
}
.metric-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #3f51b5, #8c9eff);
    transform: scaleX(0);
    transition: transform 0.3s;
}
.metric-card:hover::after {
    transform: scaleX(1);
}
.main-card {
    background: white;
    border-radius: 32px;
    padding: 2rem;
    box-shadow: 0 20px 35px -10px rgba(0, 20, 60, 0.06);
    border: 1px solid rgba(63, 81, 181, 0.06);
    margin-bottom: 1.8rem;
    transition: box-shadow 0.25s;
}
.main-card:hover {
    box-shadow: 0 25px 40px -12px rgba(63, 81, 181, 0.12);
}
.sidebar-card {
    background: white;
    border-radius: 28px;
    padding: 1.8rem;
    box-shadow: 0 15px 25px -8px rgba(0, 0, 0, 0.04);
    border: 1px solid #eef2f9;
    margin-bottom: 1.8rem;
    transition: all 0.2s;
}
.sidebar-card:hover {
    box-shadow: 0 18px 30px -10px rgba(63, 81, 181, 0.1);
}
.filter-bar {
    background: white;
    border-radius: 60px;
    padding: 0.5rem 0.5rem 0.5rem 1.5rem;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
    border: 1px solid #e2e8f0;
}
/* Badges y etiquetas */
.badge-category {
    background: #f0f4ff;
    color: #3f51b5;
    padding: 0.6rem 1.4rem;
    border-radius: 40px;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
}
.badge-category:hover {
    background: #3f51b5;
    color: white;
    transform: scale(1.02);
    box-shadow: 0 6px 12px rgba(63, 81, 181, 0.2);
}
.badge-category.active {
    background: #3f51b5;
    color: white;
}
.post-card {
    background: white;
    border-radius: 28px;
    padding: 2rem;
    box-shadow: 0 15px 25px -8px rgba(0,0,0,0.03);
    border: 1px solid #edf2f9;
    margin-bottom: 1.8rem;
    transition: all 0.3s;
}
.post-card:hover {
    box-shadow: 0 22px 35px -12px rgba(63, 81, 181, 0.12);
    border-color: rgba(63, 81, 181, 0.2);
}
.stat-badge {
    background: #f4f7fd;
    color: #3f51b5;
    padding: 0.45rem 1.3rem;
    border-radius: 40px;
    font-weight: 600;
    font-size: 0.85rem;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: all 0.15s;
    border: 1px solid rgba(63,81,181,0.1);
}
.stat-badge:hover {
    background: #3f51b5;
    color: white;
}
/* Footer */
.footer-custom {
    background-color: #011671;
    color: #e2e4e8;
}
.footer-custom a {
    color: #e2e4e8 !important;
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
    box-shadow: 0 3px 8px rgba(255,71,87,0.4);
}
.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 0.95)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}
/* Elementos creativos adicionales */
.activity-bar {
    height: 8px;
    background: #e9ecf5;
    border-radius: 10px;
    overflow: hidden;
}
.activity-fill {
    height: 100%;
    background: linear-gradient(90deg, #3f51b5, #7b8cde);
    border-radius: 10px;
    width: 0%;
    transition: width 0.5s ease;
}
.progress-ring {
    width: 60px;
    height: 60px;
}
.glow-text {
    text-shadow: 0 2px 8px rgba(63,81,181,0.15);
}
</style>