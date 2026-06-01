<template>
  <div class="d-flex flex-column min-vh-100">
    <UserNavbar />

        <main class="flex-grow-1 py-4">
            <div class="container px-4 px-lg-5">

                <div class="welcome-banner d-flex align-items-center justify-content-between">
                    <div>
                        <h2>👋 ¡Bienvenido, <span>{{ nombreUsuarioVisible }}</span>!</h2>
                        <p>Hoy hay nuevas vacantes esperando por ti</p>
                    </div>
                    <div class="d-none d-md-block">
                        <i class="bi bi-graph-up-arrow fs-2 opacity-50"></i>
                    </div>
                </div>

                <section class="mb-5">
                    <h5 class="fw-bold mb-3" style="color: #121826;">
                        <i class="bi bi-search-heart me-2" style="color: var(--primary-deep);"></i>Explora ofertas de trabajo
                    </h5>
                    <div class="search-bar d-flex align-items-center">
                        <i class="bi bi-search fs-5 text-muted me-2"></i>
                        <input type="text" id="inputBusquedaRapida" class="form-control border-0 shadow-none bg-transparent py-2" placeholder="Puesto, empresa o habilidad...">
                        <button class="btn btn-primary-deep px-4 py-2 fw-semibold" id="btnBusquedaRapida">
                            Buscar <i class="bi bi-arrow-right ms-1"></i>
                        </button>
                    </div>
                </section>

                <section class="mb-5">
        <div class="d-flex align-items-center mb-3">
            <i class="bi bi-sliders2 fs-4 me-2" style="color: var(--primary-deep);"></i>
            <h5 class="fw-bold mb-0" style="color: #121826;">Personaliza tu búsqueda</h5>
            <span class="badge bg-light text-dark ms-3 px-3 py-2 rounded-pill">Filtros avanzados</span>
        </div>

        <div class="filter-section">
            <div class="row g-4 mb-4">
                <div class="col-md-6">
                    <div class="filter-label"><i class="bi bi-tag"></i> Palabra clave</div>
                    <div class="input-group">
                        <span class="input-group-text bg-transparent border-0 ps-0"><i class="bi bi-search"></i></span>
                        <input type="text" id="filtroPalabra" class="form-control-custom w-100" placeholder="Puesto, empresa o habilidad">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="filter-label"><i class="bi bi-geo-alt"></i> Ubicación</div>
                    <div class="input-group">
                        <span class="input-group-text bg-transparent border-0 ps-0"><i class="bi bi-pin-map"></i></span>
                        <input type="text" id="filtroUbicacion" class="form-control-custom w-100" placeholder="Ciudad, estado o remoto">
                    </div>
                </div>
            </div>

            <div class="row g-4 mb-4">
                <div class="col-md-6">
                    <div class="filter-label"><i class="bi bi-clock"></i> Tipo de empleo</div>
                    <select id="filtroTipo" class="form-select-custom w-100">
                        <option selected>Todos los tipos</option>
                        <option value="Tiempo completo">Tiempo completo</option>
                        <option value="Medio tiempo">Medio tiempo</option>
                        <option value="Freelance">Freelance</option>
                        <option value="Prácticas">Prácticas</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <div class="filter-label"><i class="bi bi-bar-chart-steps"></i> Nivel de experiencia</div>
                    <select id="filtroExperiencia" class="form-select-custom w-100">
                        <option selected>Todos los niveles</option>
                        <option value="Prácticas / Becario">Prácticas / Becario</option>
                        <option value="Junior">Junior (0-2 años)</option>
                        <option value="Semi-Senior">Semi-Senior (2-5 años)</option>
                        <option value="Senior">Senior (5+ años)</option>
                    </select>
                </div>
            </div>

            <div class="row g-4">
                <div class="col-md-6">
                    <div class="filter-label"><i class="bi bi-cash-stack"></i> Rango salarial</div>
                    <div class="row g-2">
                        <div class="col-6">
                            <select id="filtroSalarioMin" class="form-select-custom w-100">
                                <option selected>Mínimo</option>
                                <option value="500">$500</option>
                                <option value="800">$800</option>
                                <option value="1000">$1000</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <select id="filtroSalarioMax" class="form-select-custom w-100">
                                <option selected>Máximo</option>
                                <option value="1000">$1000</option>
                                <option value="1500">$1500</option>
                                <option value="2000">$2000</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="filter-label"><i class="bi bi-laptop"></i> Modalidad</div>
                    <div class="d-flex flex-wrap gap-2">
                        <div class="form-check me-3">
                            <input class="form-check-input" type="checkbox" id="filtroRemoto" value="Remoto">
                            <label class="form-check-label" for="filtroRemoto">Remoto</label>
                        </div>
                        <div class="form-check me-3">
                            <input class="form-check-input" type="checkbox" id="filtroPresencial" value="Presencial">
                            <label class="form-check-label" for="filtroPresencial">Presencial</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="filtroHibrido" value="Híbrido">
                            <label class="form-check-label" for="filtroHibrido">Híbrido</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-center gap-3 mt-5">
                <button id="btnLimpiarFiltros" class="btn btn-outline-secondary px-4 py-2 rounded-pill">
                    <i class="bi bi-arrow-repeat me-1"></i> Limpiar filtros
                </button>
                <button id="btnAplicarFiltros" class="btn btn-primary-deep px-5 py-3 fw-semibold">
                    <i class="bi bi-funnel-fill me-2"></i>Aplicar filtros y buscar
                </button>
            </div>
        </div>
    </section>

    <section id="seccion-resultados-busqueda" class="mb-5 d-none">
        <div class="d-flex align-items-center mb-4">
            <h4 class="fw-bold mb-0" style="color: #121826;">
                <i class="bi bi-card-checklist me-2" style="color: var(--primary-deep);"></i>Resultados de tu búsqueda
            </h4>
            <span id="contador-resultados" class="badge bg-primary ms-3 rounded-pill">0 encontrados</span>
        </div>

        <div class="row g-4" id="contenedor-resultados"></div>
    </section>

                <section class="mb-5">
                    <div class="row g-4">
                        <div class="col-6 col-md-3">
                            <div class="stat-card text-center h-100">
                                <i class="bi bi-building fs-1 mb-2" style="color: var(--primary-deep);"></i>
                                <h3 class="fw-bold mb-0">2,580</h3>
                                <p class="text-secondary mb-0">Empresas</p>
                                <small class="text-success"><i class="bi bi-arrow-up-short"></i> +35 esta semana</small>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="stat-card text-center h-100">
                                <i class="bi bi-people-fill fs-1 mb-2" style="color: var(--primary-deep);"></i>
                                <h3 class="fw-bold mb-0">152.4k</h3>
                                <p class="text-secondary mb-0">Usuarios</p>
                                <small class="text-success"><i class="bi bi-arrow-up-short"></i> +2.1k este mes</small>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="stat-card text-center h-100">
                                <i class="bi bi-briefcase-fill fs-1 mb-2" style="color: var(--primary-deep);"></i>
                                <h3 class="fw-bold mb-0">10,320</h3>
                                <p class="text-secondary mb-0">Vacantes Activas</p>
                                <small class="text-success"><i class="bi bi-arrow-up-short"></i> +240 hoy</small>
                            </div>
                        </div>
                        <div class="col-6 col-md-3">
                            <div class="stat-card text-center h-100">
                                <i class="bi bi-file-earmark-text-fill fs-1 mb-2" style="color: var(--primary-deep);"></i>
                                <h3 class="fw-bold mb-0">75,820</h3>
                                <p class="text-secondary mb-0">Contrataciones</p>
                                <small class="text-success"><i class="bi bi-check-circle"></i> este año</small>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="mb-5">
                    <div class="d-flex align-items-center justify-content-between mb-4">
                        <h2 class="fw-bold mb-0" style="color: #121826;">
                            <i class="bi bi-star-fill me-2" style="color: #ffc107;"></i>Empleos Destacados
                        </h2>
                        <a href="../buscarempleo" class="text-decoration-none fw-semibold"
                            style="color: var(--primary-deep);">
                            Ver todos <i class="bi bi-arrow-right"></i>
                        </a>
                    </div>
                    
                    <div class="row g-4">
                        <div v-if="cargandoVacantes" class="text-center py-5 w-100">
                            <div class="spinner-border" style="color: var(--primary-deep);" role="status"></div>
                            <p class="mt-2 text-secondary">Cargando las mejores ofertas para ti...</p>
                        </div>
                        
                        <div v-else-if="vacantesDestacadas.length === 0" class="col-12 text-center py-4">
                            <p class='text-muted'>No hay empleos destacados por ahora.</p>
                        </div>

                        <div v-else class="col-md-4 mb-4" v-for="vacante in vacantesDestacadas" :key="vacante.id_vacante">
                            <div class="job-card bg-white rounded-4 p-4 h-100 d-flex flex-column position-relative" style="border: 1px solid #e0e5f0; transition: all 0.3s ease;">
                                <div class="d-flex align-items-start mb-3 mt-2">
                                <div class="bg-light rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width: 50px; height: 50px; border: 1px solid #edf0f7;">
                                    <i class="bi bi-buildings fs-4" style="color: var(--primary-deep);"></i>
                                </div>
                                <div>
                                    <h6 class="fw-bold mb-1" style="color: #121826; font-size: 1.05rem;">{{ vacante.titulo_puesto || vacante.titulo || "Vacante" }}</h6>
                                    <p class="text-secondary small mb-0 fw-medium">{{ vacante.nombre_empresa || vacante.nombre_comercial || vacante.empresa || "Empresa" }}</p>
                                </div>
                                </div>
                                <div class="mb-4 mt-2">
                                <div class="d-flex align-items-center text-muted small mb-2">
                                    <i class="bi bi-geo-alt me-2 text-secondary"></i> {{ vacante.nombre_municipio || "El Salvador" }}
                                </div>
                                <div class="d-flex align-items-center text-muted small mb-2">
                                    <i class="bi bi-cash-stack me-2 text-secondary"></i> {{ formatearSalario(vacante) }}
                                </div>
                                <div class="d-flex align-items-center text-muted small">
                                    <i class="bi bi-bar-chart-steps me-2 text-secondary"></i> {{ vacante.experiencia_nivel || "No especificado" }}
                                </div>
                                </div>
                                <div class="mt-auto pt-3 border-top">
                                <a :href="'../detalleempleo?id=' + vacante.id_vacante" class="btn text-white w-100 rounded-pill fw-medium py-2" style="background-color: var(--primary-deep); box-shadow: 0 4px 10px rgba(63, 81, 181, 0.2);">
                                    Ver vacante <i class="bi bi-arrow-right-short ms-1 fs-5 align-middle"></i>
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                </div>
        </main>

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
  </div>
</template>

<script setup>
import UserNavbar from "../../../components/UserNavbar.vue";
// 💡 CORRECCIÓN 3: Importamos "ref" de Vue para crear variables que actualicen el HTML solas
import { ref, onMounted } from "vue";
import { API_URL, getUsuario, navigateTo } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";
import { escapeHtml } from "../../../assets/js/shared/security.js";

// Creamos nuestras variables reactivas
const nombreUsuarioVisible = ref("Usuario");
const vacantesDestacadas = ref([]);
const cargandoVacantes = ref(true);

const formatearSalario = (vacante) => {
  if (vacante.salario_offrecido === null || vacante.salario_offrecido === undefined || vacante.salario_offrecido === "") {
    return "A convenir";
  }
  return `$${Number(vacante.salario_offrecido).toFixed(2)}`;
};

onMounted(async () => {
  requireAuth(["usuario"]);

  // 1. Obtener y asignar el nombre usando Reactividad (sin getElementById)
  const usuario = getUsuario();
  if (usuario) {
    nombreUsuarioVisible.value = usuario.nombres || usuario.nombre || usuario.nombre_comercial || usuario.correo_electronico || "Usuario";
  }

  // 2. Cargar los empleos desde la BD
  await cargarEmpleosDestacados();

  // Filtros de busqueda avanzada.
  const btnBusquedaRapida = document.getElementById("btnBusquedaRapida");
  const inputBusquedaRapida = document.getElementById("inputBusquedaRapida");
  const btnAplicarFiltros = document.getElementById("btnAplicarFiltros");
  const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
  const seccionResultados = document.getElementById("seccion-resultados-busqueda");
  const contenedorResultados = document.getElementById("contenedor-resultados");
  const contadorResultados = document.getElementById("contador-resultados");

  const normalizarTexto = (value = "") =>
    value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

  const obtenerModalidades = () => {
    const modalidades = [];
    if (document.getElementById("filtroRemoto")?.checked) modalidades.push("Remoto");
    if (document.getElementById("filtroPresencial")?.checked) modalidades.push("Presencial");
    if (document.getElementById("filtroHibrido")?.checked) modalidades.push("Hibrido");
    return modalidades;
  };

  const construirFiltros = () => {
    const params = new URLSearchParams();
    const palabra = document.getElementById("filtroPalabra")?.value.trim() || "";
    const ubicacion = document.getElementById("filtroUbicacion")?.value.trim() || "";
    const tipo = document.getElementById("filtroTipo")?.value || "";
    const experiencia = document.getElementById("filtroExperiencia")?.value || "";
    const salarioMin = document.getElementById("filtroSalarioMin")?.value || "";
    const salarioMax = document.getElementById("filtroSalarioMax")?.value || "";
    const modalidades = obtenerModalidades();

    if (palabra) params.set("q", palabra);
    if (ubicacion) params.set("ubicacion", ubicacion);
    if (tipo && !normalizarTexto(tipo).includes("todos")) params.set("tipo", tipo);
    if (experiencia && !normalizarTexto(experiencia).includes("todos")) params.set("experiencia", experiencia);
    if (salarioMin && !normalizarTexto(salarioMin).includes("min")) params.set("min", salarioMin);
    if (salarioMax && !normalizarTexto(salarioMax).includes("max")) params.set("max", salarioMax);
    if (modalidades.length > 0) params.set("modalidad", modalidades.join(","));

    return params;
  };

  const tarjetaVacante = (vacante) => `
    <div class="col-md-4 mb-4">
      <div class="job-card bg-white rounded-4 p-4 h-100 d-flex flex-column position-relative" style="border: 1px solid #e0e5f0; transition: all 0.3s ease;">
        <div class="d-flex align-items-start mb-3 mt-2">
          <div class="bg-light rounded-3 d-flex align-items-center justify-content-center me-3 flex-shrink-0" style="width: 50px; height: 50px; border: 1px solid #edf0f7;">
            <i class="bi bi-buildings fs-4" style="color: var(--primary-deep);"></i>
          </div>
          <div>
            <h6 class="fw-bold mb-1" style="color: #121826; font-size: 1.05rem;">${escapeHtml(vacante.titulo_puesto || vacante.titulo || "Vacante")}</h6>
            <p class="text-secondary small mb-0 fw-medium">${escapeHtml(vacante.nombre_empresa || vacante.nombre_comercial || vacante.empresa || "Empresa")}</p>
          </div>
        </div>
        <div class="mb-4 mt-2">
          <div class="d-flex align-items-center text-muted small mb-2">
            <i class="bi bi-geo-alt me-2 text-secondary"></i> ${escapeHtml(vacante.nombre_municipio || "El Salvador")}
          </div>
          <div class="d-flex align-items-center text-muted small mb-2">
            <i class="bi bi-cash-stack me-2 text-secondary"></i> ${formatearSalario(vacante)}
          </div>
          <div class="d-flex align-items-center text-muted small">
            <i class="bi bi-bar-chart-steps me-2 text-secondary"></i> ${vacante.experiencia_nivel || "No especificado"}
          </div>
        </div>
        <div class="mt-auto pt-3 border-top">
          <a href="../detalleempleo?id=${encodeURIComponent(vacante.id_vacante)}" class="btn text-white w-100 rounded-pill fw-medium py-2" style="background-color: var(--primary-deep); box-shadow: 0 4px 10px rgba(63, 81, 181, 0.2);">
            Ver vacante <i class="bi bi-arrow-right-short ms-1 fs-5 align-middle"></i>
          </a>
        </div>
      </div>
    </div>
  `;

  const renderResultados = (vacantes) => {
    if (!seccionResultados || !contenedorResultados || !contadorResultados) return;
    seccionResultados.classList.remove("d-none");
    contadorResultados.textContent = `${vacantes.length} encontrados`;

    if (!vacantes.length) {
      contenedorResultados.innerHTML = `
        <div class="col-12 text-center py-4 bg-white rounded-4 border">
          <i class="bi bi-search fs-1 text-muted opacity-50"></i>
          <h6 class="mt-3 fw-bold">No se encontraron vacantes</h6>
          <p class="text-muted small">Intenta buscar con otras palabras o ajusta los filtros.</p>
        </div>
      `;
      return;
    }
    contenedorResultados.innerHTML = vacantes.map(tarjetaVacante).join("");
  };

  const buscarConFiltros = async () => {
    if (!contenedorResultados) return;
    const params = construirFiltros();
    contenedorResultados.innerHTML = `<div class="col-12 text-center py-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">Buscando los mejores empleos para ti...</p></div>`;
    seccionResultados?.classList.remove("d-none");
    seccionResultados?.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      const response = await fetch(`${API_URL}/vacantes/busqueda/filtros?${params.toString()}`);
      if (!response.ok) throw new Error("No se pudieron filtrar las vacantes");
      let vacantes = await response.json();
      vacantes = Array.isArray(vacantes) ? vacantes : (vacantes.data || vacantes.vacantes || []);

      const modalidades = obtenerModalidades().map(normalizarTexto);
      if (modalidades.length > 0) {
        vacantes = vacantes.filter((vacante) => {
          const modalidadVacante = normalizarTexto(vacante.modalidad || "");
          return modalidades.some((modalidad) => modalidadVacante.includes(modalidad));
        });
      }
      renderResultados(vacantes);
    } catch (error) {
      console.error("Error filtrando vacantes:", error);
      contenedorResultados.innerHTML = `<div class="col-12 text-center text-danger"><i class="bi bi-x-circle fs-3"></i><p>Hubo un problema al buscar vacantes.</p></div>`;
    }
  };

  const limpiarFiltros = () => {
    document.getElementById("filtroPalabra").value = "";
    document.getElementById("filtroUbicacion").value = "";
    document.getElementById("filtroTipo").selectedIndex = 0;
    document.getElementById("filtroExperiencia").selectedIndex = 0;
    document.getElementById("filtroSalarioMin").selectedIndex = 0;
    document.getElementById("filtroSalarioMax").selectedIndex = 0;
    document.getElementById("filtroRemoto").checked = false;
    document.getElementById("filtroPresencial").checked = false;
    document.getElementById("filtroHibrido").checked = false;
    seccionResultados?.classList.add("d-none");
  };

  const irABusqueda = () => {
    const query = inputBusquedaRapida?.value.trim();
    if (!query) {
      navigateTo("../buscarempleo");
      return;
    }
    btnBusquedaRapida?.setAttribute("disabled", "true");
    btnBusquedaRapida.textContent = "Buscando";
    navigateTo(`../buscarempleo?q=${encodeURIComponent(query)}`);
  };

  btnBusquedaRapida?.addEventListener("click", irABusqueda);
  inputBusquedaRapida?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") irABusqueda();
  });

  btnAplicarFiltros?.addEventListener("click", buscarConFiltros);
  btnLimpiarFiltros?.addEventListener("click", limpiarFiltros);
});

// 💡 CORRECCIÓN 4: Función asíncrona dedicada a traer los datos correctos
const cargarEmpleosDestacados = async () => {
  cargandoVacantes.value = true;
  try {
    const response = await fetch(`${API_URL}/vacantes`);
    if (!response.ok) throw new Error("Error en servidor");

    const data = await response.json();
    
    // Defensa: Por si la API devuelve { data: [...] } en lugar de [...]
    const arregloVacantes = Array.isArray(data) ? data : (data.data || data.vacantes || []);
    
    // Guardamos solo los primeros 6 empleos en nuestra variable reactiva
    vacantesDestacadas.value = arregloVacantes.slice(0, 6);
  } catch (error) {
    console.error("Error cargando empleos:", error);
  } finally {
    cargandoVacantes.value = false;
  }
};
</script>

<style>

* {
            font-family: 'Inter', sans-serif;
        }

        :root {
            --primary-deep: #3f51b5;
            --nav-bg: #011671;
            --soft-accent: #f1ebd9;
            --light-text: #e2e4e8;
            --body-bg: #f5f7fc;
            --card-shadow: 0 20px 35px -8px rgba(1, 22, 113, 0.08);
        }

        body {
            background: linear-gradient(145deg, #f0f4fa 0%, #e8edf6 100%);
        }

        /* Navbar personalizado */
        .navbar-custom {
            background-color: var(--nav-bg) !important;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.05);
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
            padding: 0.5rem 1rem;
            border-radius: 30px;
            transition: background 0.2s;
        }

        .nav-link-custom:hover {
            background: rgba(255, 255, 255, 0.1);
        }

        .btn-primary-deep {
            background-color: var(--primary-deep);
            border: none;
            color: white;
            font-weight: 600;
            transition: all 0.2s ease;
            border-radius: 40px;
            padding: 0.6rem 1.5rem;
        }

        .btn-primary-deep:hover {
            background-color: #2c3e8f;
            transform: translateY(-2px);
            box-shadow: 0 8px 16px rgba(63, 81, 181, 0.25);
            color: white;
        }

        /* Tarjetas */
        .card-custom {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(4px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            border-radius: 32px;
            box-shadow: var(--card-shadow);
            transition: all 0.25s ease;
        }

        /* Banner de bienvenida OPTIMIZADO */
        .welcome-banner {
            background: linear-gradient(105deg, var(--primary-deep) 0%, #5c6bc0 100%);
            border-radius: 20px;
            padding: 1.2rem 2rem;
            /* Más delgado verticalmente */
            color: white;
            margin-bottom: 1.5rem;
            /* Menos margen inferior */
            box-shadow: 0 10px 30px rgba(63, 81, 181, 0.2);
        }

        .welcome-banner h2 {
            font-size: 1.5rem;
            /* Título más pequeño */
            margin-bottom: 0.2rem;
            font-weight: 700;
        }

        .welcome-banner p {
            font-size: 0.9rem;
            /* Párrafo más discreto */
            margin-bottom: 0;
            opacity: 0.9;
        }

        .stat-card {
            background: white;
            border-radius: 24px;
            padding: 1.5rem 1rem;
            box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.03);
            border: 1px solid rgba(63, 81, 181, 0.08);
            transition: all 0.2s;
            position: relative;
            overflow: hidden;
        }

        .search-bar {
            background: white;
            border-radius: 60px;
            padding: 0.4rem 0.4rem 0.4rem 1.5rem;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.04);
            border: 1px solid #e9ecf2;
        }

        .filter-section {
            background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);
            border-radius: 36px;
            padding: 2rem;
        }

        .form-control-custom,
        .form-select-custom {
            background-color: #f8faff;
            border: 1.5px solid #e0e5f0;
            border-radius: 20px;
            padding: 0.75rem 1.2rem;
            font-size: 0.95rem;
            transition: all 0.2s;
        }

        .footer-custom {
            background-color: var(--nav-bg);
            color: var(--light-text);
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

        .skill-tag {
            background: #eef2ff;
            color: var(--primary-deep);
            border-radius: 30px;
            padding: 0.2rem 0.8rem;
            font-size: 0.8rem;
            font-weight: 500;
        }

/* Conservar compatibilidad con clases originales */
        .bg-primary-subtle {
            background-color: #eef2f9 !important;
        }

        .bg-secondary {
            background-color: var(--nav-bg) !important;
        }

        .text-white-50 {
            color: var(--light-text) !important;
        }

        .btn-primary {
            background-color: var(--primary-deep) !important;
            border-color: var(--primary-deep) !important;
        }

        #contenedor-destacados .card {
            border-radius: 20px;
            border: none;
            box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
        }

        /* Mejora visual para selects en iOS */
        .form-select-custom {
            appearance: none;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%233f51b5' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 1.2rem center;
            background-size: 16px 12px;
        }

.dashboard-card h2 {
  font-weight: 700;
  margin: 0;
}

.list-group-item-custom {
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
  background: #fff;
}

.small-empty {
  min-height: 120px;
}
</style>
