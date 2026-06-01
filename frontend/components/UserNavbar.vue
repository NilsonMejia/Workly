<template>
  <nav class="navbar navbar-expand-lg py-3 user-navbar">
    <div class="container-fluid px-4 px-lg-5">
      <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal">
        <i class="bi bi-briefcase-fill brand-icon"></i>
        <div class="lh-sm ms-2">
          <span class="brand-text">Workly</span>
          <span class="brand-sub">Tu busqueda de trabajo profesional</span>
        </div>
      </a>

      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#userNavbarContent">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="userNavbarContent">
        <div class="navbar-nav mx-auto mt-3 mt-lg-0 gap-1">
          <a
            v-for="item in navItems"
            :key="item.key"
            :href="item.href"
            :class="['nav-link-custom', 'text-decoration-none', { active: active === item.key }]"
          >
            <i :class="['bi', item.icon, 'me-1']"></i> {{ item.label }}
          </a>
        </div>

        <div class="d-flex align-items-center justify-content-center gap-3 mt-3 mt-lg-0">
          <a
            href="../notificaciones"
            :class="['icon-link-custom', 'text-white', 'position-relative', 'd-inline-block', 'text-decoration-none', { active: active === 'notificaciones' }]"
            aria-label="Notificaciones"
          >
            <i class="bi bi-bell-fill fs-3"></i>
            <span v-if="notificationsCount > 0" class="notification-badge">{{ notificationsCount }}</span>
          </a>
          <a
            href="../miperfil"
            :class="['icon-link-custom', 'text-white', 'd-inline-block', 'text-decoration-none', { active: active === 'miperfil' }]"
            aria-label="Mi perfil"
          >
            <i class="bi bi-person-circle fs-2"></i>
          </a>
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
  },
  notificationsCount: {
    type: Number,
    default: 0
  }
});

const navItems = [
  { key: "buscarempleo", href: "../buscarempleo", icon: "bi-search", label: "Buscar empleo" },
  { key: "recursos", href: "../recursos", icon: "bi-journal-bookmark-fill", label: "Recursos" },
  { key: "foro", href: "../foro", icon: "bi-chat-dots", label: "Foro" },
  { key: "valoracionempresa", href: "../valoracionempresa", icon: "bi-star-fill", label: "Valoraciones" },
  { key: "miperfil", href: "../miperfil", icon: "bi-person-badge", label: "Mi Perfil" }
];
</script>

<style scoped>
.user-navbar {
  background-color: var(--nav-bg, #011671) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.brand-icon {
  color: #fff;
  font-size: 3.2rem;
  margin-right: 0.2rem;
}

.brand-text {
  color: #fff;
  display: block;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1.1;
}

.brand-sub {
  color: rgba(255, 255, 255, 0.75);
  display: block;
  font-size: 0.92rem;
}

.nav-link-custom {
  color: #fff !important;
  font-weight: 500;
  padding: 0.6rem 0.95rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  transition: background 0.2s ease, transform 0.2s ease;
}

.nav-link-custom:hover,
.nav-link-custom.active,
.icon-link-custom.active {
  background: rgba(255, 255, 255, 0.16);
}

.icon-link-custom {
  border-radius: 999px;
  padding: 0.35rem 0.45rem;
  transition: background 0.2s ease;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 1.35rem;
  background-color: #ff4757;
  color: #fff;
  border-radius: 999px;
  padding: 0.2rem 0.42rem;
  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1;
  border: 2px solid #fff;
  text-align: center;
}

.navbar-toggler-icon {
  filter: invert(1);
}
</style>
