<template>
  <nav class="navbar navbar-expand-lg py-3 sticky-top admin-navbar">
    <div class="container-fluid px-4">
      <a class="navbar-brand fw-bold text-white fs-3 d-flex align-items-center" href="../principal">
        <i class="bi bi-briefcase-fill me-2"></i> Workly
      </a>

      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="adminNavbarContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
          <li v-for="item in navItems" :key="item.key" class="nav-item">
            <a :class="['nav-link', 'nav-link-custom', { active: active === item.key }]" :href="item.href">
              {{ item.label }}
            </a>
          </li>
        </ul>

        <div class="profile-wrapper ms-lg-3 d-flex align-items-center">
          <button type="button" class="btn btn-outline-light btn-sm rounded-pill" @click="logout">
            <i class="bi bi-box-arrow-right me-1"></i>Salir
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { logout } from "../assets/js/shared/auth.js";

defineProps({
  active: {
    type: String,
    default: ""
  }
});

const navItems = [
  { key: "principal", href: "../principal", label: "Dashboard" },
  { key: "gestionusuarios", href: "../gestionusuarios", label: "Usuarios" },
  { key: "gestionempresas", href: "../gestionempresas", label: "Empresas" },
  { key: "gestionvacantes", href: "../gestionvacantes", label: "Vacantes" },
  { key: "recursos", href: "../recursos", label: "Recursos" },
  { key: "foro", href: "../foro", label: "Foro" },
  { key: "estadisticas", href: "../estadisticas", label: "Estadísticas" },
  { key: "moderacion", href: "../moderacion", label: "Moderación" }
];
</script>

<style scoped>
.admin-navbar {
  background-color: var(--azul-oscuro, #001670) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.nav-link-custom {
  color: rgba(255, 255, 255, 0.86) !important;
  font-size: 0.88rem;
  font-weight: 500;
  border-radius: 999px;
  padding: 0.55rem 0.95rem !important;
  transition: background 0.2s ease, color 0.2s ease;
}

.nav-link-custom:hover,
.nav-link-custom.active {
  background: rgba(255, 255, 255, 0.14);
  color: #fff !important;
}

.navbar-toggler-icon {
  filter: invert(1);
}

</style>
