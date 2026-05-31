<template>
  <div class="d-flex flex-column min-vh-100 bg-light-custom">
    <nav class="navbar navbar-expand-lg py-3 navbar-custom">
      <div class="container-fluid px-4 px-lg-5">
        <a class="navbar-brand d-flex align-items-center" href="/">
          <i class="bi bi-briefcase-fill brand-icon"></i>
          <div class="lh-sm ms-2">
            <span class="brand-text">Workly</span>
            <span class="brand-sub">Tu búsqueda de trabajo profesional</span>
          </div>
        </a>

        <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
          <div class="d-flex gap-2 mt-3 mt-lg-0">
            <button class="btn px-4 fw-semibold border-0 text-white btn-primary-deep"
                    @click="goTo('../login/index.html')">
              Iniciar sesión
            </button>
            <button class="btn px-4 fw-semibold border-0 text-white btn-primary-deep"
                    @click="goTo('../registro/index.html')">
              Registrarse
            </button>
            <button class="btn border-0 text-white fs-3 d-none d-lg-block ms-3">
              <i class="bi bi-list"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-grow-1">
      
      <section class="hero-wrapper py-5 py-lg-6">
        <div class="container py-3">
          <div class="hero-card p-4 p-xl-5 fade-element">
            <div class="row align-items-center g-5">
              <div class="col-lg-7">
                <div class="d-inline-block mb-3 px-3 py-1 bg-white rounded-pill shadow-sm border" style="border-color: #cdd2dc !important;">
                  <span class="fw-semibold" style="color: var(--primary-deep);"><i class="bi bi-stars me-1"></i>Más de 15k talentos conectados</span>
                </div>
                <h1 class="display-4 fw-bold mb-3" style="color: #121826; line-height: 1.2;">
                  El lugar donde <br>
                  <span style="color: var(--primary-deep);">el talento</span> encuentra <br>
                  su próximo reto
                </h1>
                <p class="fs-5 text-secondary mb-4" style="max-width: 90%;">
                  Accede a oportunidades verificadas, empresas de primer nivel y un proceso seguro. 
                  Workly conecta profesionales con el futuro.
                </p>

                <div class="d-flex flex-wrap gap-3 mt-4">
                  <button class="btn btn-primary-deep px-4 py-3 fw-semibold d-flex align-items-center gap-2 shadow-sm action-btn"
                          @click="goTo('../registro/index.html')">
                    Quiero trabajar <i class="bi bi-arrow-right"></i>
                  </button>
                  <button class="btn btn-soft px-4 py-3 fw-semibold d-flex align-items-center gap-2 border-0 shadow-sm action-btn"
                          @click="goTo('../registro/index.html')">
                    ¿Quieres contratar? <i class="bi bi-arrow-right"></i>
                  </button>
                </div>

                <div class="row mt-5 g-3">
                  <div class="col-4">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-shield-check fs-2 me-2" style="color: var(--primary-deep);"></i>
                      <div><span class="fw-bold d-block fs-4">+98%</span><small class="text-secondary">verificados</small></div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-building fs-2 me-2" style="color: var(--primary-deep);"></i>
                      <div><span class="fw-bold d-block fs-4">2.5k</span><small class="text-secondary">empresas</small></div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="d-flex align-items-center">
                      <i class="bi bi-briefcase fs-2 me-2" style="color: var(--primary-deep);"></i>
                      <div><span class="fw-bold d-block fs-4">8.9k</span><small class="text-secondary">vacantes</small></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-5 text-center position-relative fade-element">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                     alt="Conexiones profesionales" 
                     class="img-fluid rounded-4 shadow-lg custom-hero-img">
                <div class="position-absolute bottom-0 start-0 bg-white p-3 rounded-4 shadow d-none d-md-block floating-badge">
                  <div class="d-flex align-items-center gap-2">
                    <div class="bg-success bg-opacity-10 p-2 rounded-3"><i class="bi bi-graph-up-arrow fs-4 text-primary-deep"></i></div>
                    <div><span class="fw-bold">+240</span> <span class="text-secondary">nuevas hoy</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5">
        <div class="container">
          <div class="text-center mb-5">
            <h2 class="fw-bold display-6">Vacantes Recientes (<span class="text-primary">{{ statVacantes }}</span>)</h2>
            <p class="text-secondary">Descubre las últimas oportunidades agregadas a Workly</p>
          </div>

          <div v-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
          
          <div v-else-if="isLoading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>

          <div v-else-if="vacantes.length === 0" class="col-12">
            <div class="alert alert-light border text-center py-4">
              <i class="bi bi-inbox fs-1 text-muted mb-2 d-block"></i>
              No hay vacantes disponibles en este momento.
            </div>
          </div>

          <div v-else class="row g-4">
            <div v-for="(item, index) in topVacantes" :key="index" class="col-md-6 col-xl-4 fade-element">
              <div class="card card-custom vacante-card h-100 shadow-sm border-0">
                <div class="card-body d-flex flex-column">
                  <div class="mb-2">
                    <span class="badge bg-primary-subtle text-primary">{{ item.nombre_categoria }}</span>
                  </div>
                  <h5 class="card-title fw-bold">{{ item.titulo_puesto }}</h5>
                  <p class="text-muted mb-3"><i class="bi bi-building me-1"></i>{{ item.nombre_comercial }}</p>

                  <div class="vacante-meta mb-3 p-3 bg-light rounded-3">
                    <div class="mb-1"><i class="bi bi-geo-alt me-2"></i><strong>Municipio:</strong> {{ item.nombre_municipio ?? "No definido" }}</div>
                    <div class="mb-1"><i class="bi bi-laptop me-2"></i><strong>Modalidad:</strong> {{ item.modalidad }}</div>
                    <div><i class="bi bi-cash me-2"></i><strong>Salario:</strong> ${{ Number(item.salario_offrecido ?? 0).toFixed(2) }}</div>
                  </div>

                  <p class="card-text text-secondary mb-4 flex-grow-1">{{ (item.descripcion_puesto ?? "").slice(0, 120) }}...</p>

                  <div class="vacante-footer mt-auto">
                    <button class="btn btn-outline-primary w-100" @click="goTo('../../public/login/index.html')">
                      Inicia sesión para aplicar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-5 bg-white border-top">
        <div class="container">
          <div class="text-center mb-5 fade-element">
            <span class="badge-growth mb-2"><i class="bi bi-bar-chart-line me-1"></i> Cifras en tiempo real</span>
            <h2 class="fw-bold display-6">Workly en números</h2>
          </div>
          <div class="row g-4 justify-content-center">
            <div class="col-md-6 col-lg-3 fade-element" v-for="(stat, idx) in stats" :key="idx">
              <div class="stat-card text-center h-100 shadow-sm">
                <div class="feature-icon mx-auto mb-3">
                  <i :class="stat.icon"></i>
                </div>
                <div class="stat-number"><span class="counter" :data-target="stat.target">0</span></div>
                <h5 class="fw-semibold">{{ stat.title }}</h5>
                <span class="badge-growth"><i class="bi bi-arrow-up-short"></i> {{ stat.growth }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

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
import { ref, computed, onMounted, nextTick } from 'vue';
// IMPORTANTE: Ajusta esta ruta de acuerdo a la estructura de tu proyecto Vue
import { API_URL } from "../../../assets/js/shared/config.js"; 

// --- Estados Reactivos ---
const vacantes = ref([]);
const isLoading = ref(true);
const error = ref(null);

// --- Propiedades Computadas ---
const topVacantes = computed(() => vacantes.value.slice(0, 6));
const statVacantes = computed(() => vacantes.value.length);

// Datos estáticos para la sección de estadísticas
const stats = ref([
  { icon: 'bi bi-people-fill', target: 15240, title: 'Usuarios', growth: '+120 este mes' },
  { icon: 'bi bi-building', target: 2580, title: 'Empresas', growth: '+35 esta semana' },
  { icon: 'bi bi-briefcase-fill', target: 10320, title: 'Vacantes', growth: '+240 hoy' },
  { icon: 'bi bi-send-check', target: 24870, title: 'Postulaciones/mes', growth: 'Prom. 829/día' },
]);

// --- Métodos ---
const goTo = (url) => {
  window.location.href = url;
};

const cargarVacantes = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${API_URL}/vacantes/busqueda/filtros`);
    const data = await response.json();

    if (!response.ok) {
      error.value = data.mensaje || "No se pudieron cargar las vacantes";
      return;
    }
    vacantes.value = data;
  } catch (err) {
    console.error(err);
    error.value = "Error de conexión con el servidor";
  } finally {
    isLoading.value = false;
  }
};

// --- Ciclo de Vida y Animaciones ---
onMounted(() => {
  cargarVacantes();

  nextTick(() => {
    // Animación de contadores
    const counters = document.querySelectorAll('.counter');
    const animateCounter = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10);
      if (isNaN(target)) return;
      let current = 0;
      const step = Math.ceil(target / 70);
      const updateCounter = () => {
        current += step;
        if (current >= target) {
          el.innerText = target.toLocaleString();
          return;
        }
        el.innerText = current.toLocaleString();
        requestAnimationFrame(updateCounter);
      };
      requestAnimationFrame(updateCounter);
    };

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.classList.contains('counted')) {
            counter.classList.add('counted');
            animateCounter(counter);
          }
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));

    // Animación de entrada (Fade Up)
    const fadeElements = document.querySelectorAll('.fade-element, .feature-icon');
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    
    fadeElements.forEach(el => {
      el.classList.add('fade-up');
      fadeObserver.observe(el);
    });
  });
});
</script>

<style scoped>
/* Asegúrate de tener importado Inter y Bootstrap Icons en tu index.html principal */

:global(:root) {
  --primary-deep: #3f51b5;
  --nav-bg: #011671;
  --soft-accent: #f1ebd9;
  --light-text: #e2e4e8;
}

.bg-light-custom {
  background-color: #f9fafc;
  font-family: 'Inter', sans-serif;
}

.navbar-custom {
  background-color: var(--nav-bg) !important;
  box-shadow: 0 6px 12px rgba(0,0,0,0.03);
}

.brand-icon {
  font-size: 3.5rem;
  color: white;
  line-height: 1;
  margin-right: 1rem;
  transition: transform 0.2s;
}

.navbar-brand:hover .brand-icon {
  transform: scale(1.02);
}

.brand-text {
  color: white;
  font-weight: 700;
  font-size: 2rem;
  display: block;
  line-height: 1.2;
}

.brand-sub {
  color: var(--light-text);
  font-size: 0.95rem;
}

.btn-primary-deep {
  background-color: var(--primary-deep);
  transition: all 0.2s ease;
}

.btn-primary-deep:hover {
  background-color: #2c3e8f;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(63, 81, 181, 0.25);
}

.btn-soft {
  background-color: var(--soft-accent);
  color: #1e1f22;
  transition: all 0.2s;
}

.btn-soft:hover {
  background-color: #e6dcc4;
  transform: translateY(-2px);
}

.action-btn {
  border-radius: 60px;
  font-size: 1.1rem;
}

.hero-wrapper {
  background: linear-gradient(145deg, #f0f3fa 0%, #e9ecf5 100%);
  position: relative;
  overflow: hidden;
}

.hero-card {
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 2.5rem;
  box-shadow: 0 25px 40px -12px rgba(0,0,0,0.12);
}

.custom-hero-img {
  border-radius: 2rem !important;
  border: 4px solid white;
}

.floating-badge {
  transform: translate(-10px, 20px);
}

.text-primary-deep {
  color: var(--primary-deep);
}

.stat-card {
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem 1rem;
  transition: all 0.2s;
  border: 1px solid rgba(146, 154, 169, 0.15);
}

.stat-card:hover {
  transform: scale(1.02);
  box-shadow: 0 18px 30px -8px rgba(63, 81, 181, 0.12);
  border-color: var(--primary-deep);
}

.stat-number {
  font-size: 2.8rem;
  font-weight: 700;
  color: var(--primary-deep);
  line-height: 1.1;
}

.feature-icon {
  width: 60px;
  height: 60px;
  background: rgba(63, 81, 181, 0.08);
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-deep);
  font-size: 2rem;
}

.badge-growth {
  background: #e9ecf9;
  color: #2c3e8f;
  font-weight: 500;
  padding: 0.25rem 0.8rem;
  border-radius: 40px;
  font-size: 0.8rem;
  display: inline-block;
}

.vacante-card {
  border-radius: 14px;
  transition: transform 0.2s;
}

.vacante-card:hover {
  transform: translateY(-5px);
}

.vacante-meta {
  font-size: 0.92rem;
  color: #6c757d;
}

.footer-custom {
  background-color: var(--nav-bg);
  color: var(--light-text);
}

.footer-custom a {
  color: var(--light-text) !important;
  text-decoration: none;
  font-weight: 500;
}

.footer-custom a:hover {
  color: white !important;
  text-decoration: underline;
}

/* Animaciones */
.fade-up {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-up.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>