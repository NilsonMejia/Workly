<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
        <div class="container-fluid px-4 px-lg-5">
            <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../../public/paginainicial/index.html">
                <i class="bi bi-briefcase-fill brand-icon"></i>
                <div class="lh-sm ms-2">
                    <span class="brand-text">Workly</span>
                    <span class="brand-sub">Tu búsqueda de trabajo profesional</span>
                </div>
            </a>

            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarContent">
                <div class="navbar-nav mx-auto mt-3 mt-lg-0 gap-2">
                    <a href="../buscarempleo/index.html" class="nav-link-custom active text-decoration-none px-3 py-2">
                        <i class="bi bi-search me-1"></i> Búsqueda
                    </a>
                    <a href="../recursos/index.html" class="nav-link-custom text-decoration-none px-3 py-2">
                        <i class="bi bi-journal-bookmark-fill me-1"></i> Recursos
                    </a>
                    <a href="../valoracionempresa/index.html" class="nav-link-custom text-decoration-none px-3 py-2">
                        <i class="bi bi-star-fill me-1"></i> Valoraciones
                    </a>
                    <a href="../miperfil/index.html" class="nav-link-custom text-decoration-none px-3 py-2">
                        <i class="bi bi-person-badge me-1"></i> Mi Perfil
                    </a>
                </div>

                <div class="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
                    <a href="../notificaciones/index.html" class="position-relative cursor-pointer text-decoration-none">
                        <i class="bi bi-bell-fill fs-3 text-white"></i>
                        <span class="notification-badge">5</span>
                    </a>
                    <a href="../miperfil/index.html" class="text-white"><i class="bi bi-person-circle fs-2"></i></a>
                </div>
            </div>
        </div>
    </nav>

    <main class="flex-grow-1 py-4">
        <div class="container px-4 px-lg-5">
            
            <div class="search-bar-wrapper mb-4 d-flex align-items-center">
                <i class="bi bi-search fs-5 text-muted me-2"></i>
                <input type="text" v-model="queryBusqueda" @keydown.enter="aplicarFiltros" class="form-control border-0 shadow-none bg-transparent py-2" placeholder="Puesto, empresa o palabra clave...">
                <button @click="aplicarFiltros" class="btn btn-primary-deep px-4 py-2 fw-semibold">
                    Buscar empleo <i class="bi bi-arrow-right ms-1"></i>
                </button>
            </div>

            <div class="status-bar mb-4">
                <p class="mb-0 text-secondary small fw-medium">
                    <i class="bi bi-info-circle me-1" style="color: var(--primary-deep);"></i>
                    <span>{{ textoBarraEstado }}</span>
                </p>
            </div>

            <div class="row g-4">
                <aside class="col-12 col-lg-3">
                    <div class="filter-card">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <h6 class="fw-bold mb-0 d-flex align-items-center" style="color: #121826;">
                                <i class="bi bi-funnel-fill me-2" style="color: var(--primary-deep);"></i>Filtros
                            </h6>
                            <button type="button" @click="aplicarFiltros" class="btn btn-primary-deep btn-sm px-4 py-2 fw-semibold">
                                Aplicar <i class="bi bi-check2 ms-1"></i>
                            </button>
                        </div>

                        <div class="accordion" id="accordionFiltros">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFecha">
                                        <i class="bi bi-calendar3 me-2"></i> Fecha de publicación
                                    </button>
                                </h2>
                                <div id="collapseFecha" class="accordion-collapse collapse show" data-bs-parent="#accordionFiltros">
                                    <div class="accordion-body pt-2">
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" v-model="filtros.fecha" value="fecha1" id="fecha1">
                                            <label class="form-check-label text-secondary small fw-medium" for="fecha1">Cualquier fecha</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" v-model="filtros.fecha" value="fecha2" id="fecha2">
                                            <label class="form-check-label text-secondary small fw-medium" for="fecha2">Últimas 24 horas</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" v-model="filtros.fecha" value="fecha3" id="fecha3">
                                            <label class="form-check-label text-secondary small fw-medium" for="fecha3">Última semana</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" v-model="filtros.fecha" value="fecha4" id="fecha4">
                                            <label class="form-check-label text-secondary small fw-medium" for="fecha4">Último mes</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNivel">
                                        <i class="bi bi-bar-chart-steps me-2"></i> Nivel de experiencia
                                    </button>
                                </h2>
                                <div id="collapseNivel" class="accordion-collapse collapse" data-bs-parent="#accordionFiltros">
                                    <div class="accordion-body pt-2">
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="checkbox" v-model="filtros.experiencia.practicante" id="nivel1">
                                            <label class="form-check-label text-secondary small fw-medium" for="nivel1">Practicante</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="checkbox" v-model="filtros.experiencia.junior" id="nivel2">
                                            <label class="form-check-label text-secondary small fw-medium" for="nivel2">Junior</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="checkbox" v-model="filtros.experiencia.semiSenior" id="nivel3">
                                            <label class="form-check-label text-secondary small fw-medium" for="nivel3">Semi-senior</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="checkbox" v-model="filtros.experiencia.senior" id="nivel4">
                                            <label class="form-check-label text-secondary small fw-medium" for="nivel4">Senior</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSalario">
                                        <i class="bi bi-cash-stack me-2"></i> Rango salarial
                                    </button>
                                </h2>
                                <div id="collapseSalario" class="accordion-collapse collapse" data-bs-parent="#accordionFiltros">
                                    <div class="accordion-body pt-2">
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" v-model="filtros.salario" value="salario1" id="salario1">
                                            <label class="form-check-label text-secondary small fw-medium" for="salario1">$0 - $500</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" v-model="filtros.salario" value="salario2" id="salario2">
                                            <label class="form-check-label text-secondary small fw-medium" for="salario2">$500 - $800</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" v-model="filtros.salario" value="salario3" id="salario3">
                                            <label class="form-check-label text-secondary small fw-medium" for="salario3">$800 - $1,000</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" v-model="filtros.salario" value="salario4" id="salario4">
                                            <label class="form-check-label text-secondary small fw-medium" for="salario4">$1,000 - $1,500</label>
                                        </div>
                                        <div class="form-check mb-2">
                                            <input class="form-check-input" type="radio" v-model="filtros.salario" value="salario5" id="salario5">
                                            <label class="form-check-label text-secondary small fw-medium" for="salario5">$2,000+</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="sticky-apply-btn d-lg-none">
                            <button type="button" @click="aplicarFiltros" class="btn btn-primary-deep w-100 py-3 fw-semibold">
                                <i class="bi bi-funnel me-2"></i>Aplicar filtros
                            </button>
                        </div>
                    </div>
                </aside>

                <section class="col-12 col-lg-9">
                    <div id="contenedor-vacantes">
                        <div v-if="cargando" class="text-center py-5">
                            <div class="spinner-border" style="color: var(--primary-deep);" role="status"></div>
                            <p class="mt-2 text-secondary">Buscando vacantes reales...</p>
                        </div>

                        <div v-else-if="errorServidor" class="text-center py-5">
                            <i class="bi bi-exclamation-triangle text-danger fs-1"></i>
                            <p class="text-danger mt-2">Hubo un error al conectar con el servidor.</p>
                        </div>

                        <div v-else-if="!resultadosActuales.length" class="text-center py-5 bg-white rounded-4 border">
                            <i class="bi bi-search fs-1 text-muted opacity-50 mb-3 d-block"></i>
                            <h5 class="fw-bold text-dark">No encontramos vacantes</h5>
                            <p class="text-secondary">Intenta buscar con otras palabras o limpia los filtros laterales.</p>
                        </div>

                        <div v-else v-for="vacante in vacantesPaginadas" :key="vacante.id_vacante" class="card vacante-card mb-4 p-4 border-0 shadow-sm" style="border-radius: 20px; transition: transform 0.2s;">
                            <div class="row align-items-center card-body p-0">
                                <div class="col-md-9">
                                    <div class="d-flex align-items-center mb-2 flex-wrap gap-2">
                                        <h5 class="fw-bold mb-0 me-3" style="color: #121826;">{{ vacante.titulo_puesto || "Vacante" }}</h5>
                                        <span class="badge bg-primary bg-opacity-10 text-primary rounded-pill fw-medium px-3">{{ vacante.modalidad || "Modalidad no indicada" }}</span>
                                        <span class="badge bg-light text-dark rounded-pill fw-medium px-3">{{ vacante.experiencia_nivel || "No especificado" }}</span>
                                    </div>
                                    <p class="text-secondary fw-medium mb-3">{{ vacante.nombre_empresa || vacante.nombre_comercial || vacante.empresa || "Empresa confidencial" }}</p>

                                    <div class="d-flex flex-wrap gap-3 vacante-meta text-muted">
                                        <div class="d-flex align-items-center">
                                            <i class="bi bi-geo-alt me-1"></i> {{ vacante.nombre_municipio || "El Salvador" }}
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <i class="bi bi-cash me-1"></i> {{ formatearSalario(vacante) }}
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <i class="bi bi-clock me-1"></i> {{ formatearFecha(vacante.fecha_publicacion) }}
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 text-md-end mt-4 mt-md-0 vacante-footer">
                                    <a :href="'../detalleempleo/index.html?id=' + vacante.id_vacante" class="btn px-4 py-2 fw-semibold w-100 w-md-auto text-white" style="background-color: var(--primary-deep); border-radius: 30px;">
                                        Ver detalles <i class="bi bi-arrow-right ms-1"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav v-if="!cargando && !errorServidor && resultadosActuales.length" class="d-flex justify-content-center mt-5">
                        <div class="pagination-container d-flex align-items-center gap-3">
                            <button @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1" class="btn btn-link text-secondary text-decoration-none small fw-medium">
                                <i class="bi bi-arrow-left me-1"></i> Anterior
                            </button>
                            
                            <div class="d-flex gap-2 align-items-center">
                                <button v-for="page in totalPaginas" :key="page" @click="cambiarPagina(page)" class="btn btn-link text-decoration-none p-0 mx-1 page-link-custom" :class="{ 'page-active': page === paginaActual }">
                                    {{ page }}
                                </button>
                            </div>

                            <button @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas" class="btn btn-link text-secondary text-decoration-none small fw-medium">
                                Siguiente <i class="bi bi-arrow-right ms-1"></i>
                            </button>
                        </div>
                    </nav>
                </section>
            </div>
        </div>
    </main>

    <div class="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="toastFiltros" class="toast align-items-center text-white border-0 rounded-4 shadow mb-2" role="alert" style="background-color: var(--primary-deep);">
            <div class="d-flex">
                <div class="toast-body fs-6 py-3 fw-semibold">
                    <i class="bi bi-funnel-fill me-2 fs-5"></i> ¡Filtros aplicados correctamente!
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    </div>

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

<script>
import { API_URL } from "../../../assets/js/shared/config.js";

const PAGE_SIZE = 6;

export default {
  name: "BuscadorVacantes",
  data() {
    return {
      queryBusqueda: "",
      resultadosActuales: [],
      paginaActual: 1,
      cargando: true,
      errorServidor: false,
      textoBarraEstado: "Cargando vacantes...",
      
      filtros: {
        fecha: "fecha1",
        experiencia: {
          practicante: false,
          junior: false,
          semiSenior: false,
          senior: false
        },
        salario: "",
        modalidad: {
          remoto: false,
          presencial: false,
          hibrido: false
        }
      }
    };
  },

  computed: {
    totalPaginas() {
      return Math.max(1, Math.ceil(this.resultadosActuales.length / PAGE_SIZE));
    },
    vacantesPaginadas() {
      const inicio = (this.paginaActual - 1) * PAGE_SIZE;
      return this.resultadosActuales.slice(inicio, inicio + PAGE_SIZE);
    }
  },

  mounted() {
    const paramsIniciales = this.hidratarDesdeUrl();
    this.cargarVacantes(paramsIniciales);
  },

  methods: {
    formatearFecha(fecha) {
      if (!fecha) return "Sin fecha";
      const parsed = new Date(fecha);
      if (Number.isNaN(parsed.getTime())) return "Sin fecha";
      return parsed.toLocaleDateString("es-SV");
    },

    formatearSalario(vacante) {
      if (!vacante.salario_offrecido) return "A convenir";
      return `$${Number(vacante.salario_offrecido).toFixed(2)}`;
    },

    normalizarTexto(value = "") {
      return value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
    },

    obtenerParametrosFiltros() {
      const params = new URLSearchParams();
      const query = this.queryBusqueda.trim();

      if (query) params.set("q", query);

      if (this.filtros.fecha === "fecha2") params.set("fecha", "24h");
      else if (this.filtros.fecha === "fecha3") params.set("fecha", "semana");
      else if (this.filtros.fecha === "fecha4") params.set("fecha", "mes");

      const exp = [];
      if (this.filtros.experiencia.practicante) exp.push("Practicante");
      if (this.filtros.experiencia.junior) exp.push("Junior");
      if (this.filtros.experiencia.semiSenior) exp.push("Semi-senior");
      if (this.filtros.experiencia.senior) exp.push("Senior");
      if (exp.length > 0) params.set("experiencia", exp.join(","));

      if (this.filtros.salario === "salario1") { params.set("min", "0"); params.set("max", "500"); }
      else if (this.filtros.salario === "salario2") { params.set("min", "501"); params.set("max", "800"); }
      else if (this.filtros.salario === "salario3") { params.set("min", "801"); params.set("max", "1000"); }
      else if (this.filtros.salario === "salario4") { params.set("min", "1001"); params.set("max", "1500"); }
      else if (this.filtros.salario === "salario5") { params.set("min", "2000"); }

      return params;
    },

    aplicarFiltroLocalModalidad(vacantes) {
      const modSeleccionadas = [];
      if (this.filtros.modalidad.remoto) modSeleccionadas.push("remoto");
      if (this.filtros.modalidad.presencial) modSeleccionadas.push("presencial");
      if (this.filtros.modalidad.hibrido) modSeleccionadas.push("hibrido");

      if (!modSeleccionadas.length) return vacantes;

      return vacantes.filter((vacante) => {
        const modalVacante = this.normalizarTexto(vacante.modalidad || "");
        return modSeleccionadas.some((m) => modalVacante.includes(m));
      });
    },

    async cargarVacantes(params) {
      this.cargando = true;
      this.errorServidor = false;
      try {
        const query = params.toString();
        const url = query ? `${API_URL}/vacantes/busqueda/filtros?${query}` : `${API_URL}/vacantes`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en API");

        let vacantes = await response.json();
        vacantes = Array.isArray(vacantes) ? vacantes : [];
        vacantes = this.aplicarFiltroLocalModalidad(vacantes);

        this.resultadosActuales = vacantes;
        this.paginaActual = 1;

        if (query) {
          this.textoBarraEstado = `Se encontraron ${this.resultadosActuales.length} resultados con los filtros seleccionados`;
        } else {
          this.textoBarraEstado = `Mostrando ${this.resultadosActuales.length} vacantes disponibles`;
        }

        const queryStr = params.toString();
        const newUrl = queryStr ? `${window.location.pathname}?${queryStr}` : window.location.pathname;
        window.history.replaceState({}, "", newUrl);

      } catch (error) {
        console.error(error);
        this.errorServidor = true;
      } finally {
        this.cargando = false;
      }
    },

    aplicarFiltros() {
      const params = this.obtenerParametrosFiltros();
      this.cargarVacantes(params);

      const toastElement = document.getElementById("toastFiltros");
      if (toastElement) {
        new bootstrap.Toast(toastElement).show();
      }
    },

    hidratarDesdeUrl() {
      const params = new URLSearchParams(window.location.search);

      if (params.has("q")) this.queryBusqueda = params.get("q");

      const fecha = params.get("fecha");
      if (fecha === "24h") this.filtros.fecha = "fecha2";
      else if (fecha === "semana") this.filtros.fecha = "fecha3";
      else if (fecha === "mes") this.filtros.fecha = "fecha4";
      else this.filtros.fecha = "fecha1";

      const exp = this.normalizarTexto(params.get("experiencia") || "");
      if (exp.includes("practic")) this.filtros.experiencia.practicante = true;
      if (exp.includes("junior")) this.filtros.experiencia.junior = true;
      if (exp.includes("semi")) this.filtros.experiencia.semiSenior = true;
      if (exp.includes("senior")) this.filtros.experiencia.senior = true;

      const min = params.get("min");
      const max = params.get("max");
      if (min === "0" && max === "500") this.filtros.salario = "salario1";
      else if (min === "501" && max === "800") this.filtros.salario = "salario2";
      else if (min === "801" && max === "1000") this.filtros.salario = "salario3";
      else if (min === "1001" && max === "1500") this.filtros.salario = "salario4";
      else if (min === "2000") this.filtros.salario = "salario5";

      return params;
    },

    cambiarPagina(page) {
      if (page >= 1 && page <= this.totalPaginas) {
        this.paginaActual = page;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
* { font-family: 'Inter', sans-serif; }
:root {
    --primary-deep: #3f51b5;
    --nav-bg: #011671;
    --soft-accent: #f1ebd9;
    --light-text: #e2e4e8;
    --body-bg: #f5f7fc;
}
.navbar-custom {
    background-color: var(--nav-bg) !important;
    box-shadow: 0 6px 12px rgba(0,0,0,0.05);
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
    background: rgba(255,255,255,0.1);
}
.nav-link-custom.active {
    background: rgba(255,255,255,0.2);
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
.search-bar-wrapper {
    background: white;
    border-radius: 60px;
    padding: 0.4rem 0.4rem 0.4rem 1.8rem;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05);
    border: 1px solid #e9ecf2;
}
.search-bar-wrapper input {
    border: none;
    background: transparent;
    font-size: 1rem;
    padding: 0.7rem 0;
}
.search-bar-wrapper input:focus {
    outline: none;
    box-shadow: none;
}
.status-bar {
    background: white;
    border-radius: 40px;
    padding: 0.6rem 1.8rem;
    box-shadow: 0 5px 12px rgba(0,0,0,0.02);
    border: 1px solid #eef2f6;
}
.filter-card {
    background: white;
    border: none;
    border-radius: 28px;
    box-shadow: 0 15px 30px -8px rgba(1, 22, 113, 0.06);
    padding: 1.5rem;
    border: 1px solid #edf0f5;
    position: sticky;
    top: 20px;
}
.accordion-button {
    padding: 0.75rem 0;
    font-weight: 600;
    color: #121826;
    background: transparent;
    box-shadow: none;
    border-bottom: 1px solid #eef2f6;
}
.accordion-button:not(.collapsed) {
    color: var(--primary-deep);
    background: transparent;
    box-shadow: none;
}
.accordion-button:focus {
    box-shadow: none;
    border-color: var(--primary-deep);
}
.accordion-item {
    border: none;
    background: transparent;
}
.form-check-input:checked {
    background-color: var(--primary-deep);
    border-color: var(--primary-deep);
}
.form-check-input:focus {
    box-shadow: 0 0 0 0.2rem rgba(63, 81, 181, 0.15);
}
#contenedor-vacantes .card {
    border: none;
    border-radius: 24px;
    box-shadow: 0 10px 25px -8px rgba(0,0,0,0.04);
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid #f0f3f9;
}
#contenedor-vacantes .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 30px -10px rgba(63,81,181,0.1);
    border-color: var(--primary-deep);
}
.pagination-container {
    background: white;
    border-radius: 60px;
    padding: 0.5rem 1.2rem;
    box-shadow: 0 8px 18px rgba(0,0,0,0.02);
}
.page-link-custom {
    color: #5a6275;
    background: transparent;
    border: none;
    padding: 0.5rem 0.9rem;
    border-radius: 40px;
    font-weight: 500;
}
.page-link-custom:hover {
    background: #f0f3fc;
    color: var(--primary-deep);
}
.page-active {
    background: var(--primary-deep) !important;
    color: white !important;
}
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
    background-color: #dc3545;
    color: white;
    border-radius: 50%;
    padding: 0.2rem 0.4rem;
    font-size: 0.65rem;
    font-weight: bold;
    border: 2px solid white;
}
.sticky-apply-btn {
    position: sticky;
    bottom: 20px;
    background: white;
    padding-top: 10px;
    margin-top: 10px;
}
.cursor-pointer { cursor: pointer; }
.accordion-button::after {
    background-size: 1rem;
}
.form-check-input {
    cursor: pointer;
    border: 1.5px solid #cdd2dc;
}
.form-check-label {
    cursor: pointer;
}
.sticky-apply-btn {
    background: white;
    padding-top: 15px;
    margin-top: 15px;
    border-top: 1px solid #edf0f5;
}
.vacante-card {
  height: 100%;
}
.vacante-card .card-body {
  display: flex;
  flex-direction: column;
}
.vacante-meta {
  font-size: 0.92rem;
  color: #6c757d;
}
.vacante-footer {
  margin-top: auto;
}
</style>