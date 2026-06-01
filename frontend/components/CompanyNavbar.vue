<template>
  <nav class="navbar navbar-expand-lg py-3 navbar-custom company-navbar">
    <div class="container-fluid px-4 px-lg-5">
      <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal">
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
          <a
            v-for="item in navItems"
            :key="item.key"
            :href="item.href"
            :class="['nav-link-custom', 'text-decoration-none', { active: active === item.key }]"
          >
            <i :class="['bi', item.icon, 'me-1']"></i> {{ item.label }}
          </a>
        </div>

        <div class="d-flex align-items-center justify-content-center gap-4 mt-3 mt-lg-0">
          <a
            href="../notificaciones"
            :class="['company-icon-link', 'text-white', 'position-relative', 'd-inline-block', 'text-decoration-none', { active: active === 'notificaciones' }]"
            aria-label="Notificaciones"
          >
            <i class="bi bi-bell-fill fs-3"></i>
            <span class="notification-badge">0</span>
          </a>
          <a
            href="../perfil"
            :class="['company-icon-link', 'text-white', 'd-inline-block', 'text-decoration-none', { active: active === 'perfil' }]"
            aria-label="Perfil de empresa"
          >
            <i class="bi bi-person-circle fs-2"></i>
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  active: {
    type: String,
    default: ""
  }
});

const navItems = [
  { key: "principal", href: "../principal", icon: "bi-speedometer2", label: "Dashboard" },
  { key: "publicarvacante", href: "../publicarvacante", icon: "bi-plus-circle", label: "Publicar" },
  { key: "misvacantes", href: "../misvacantes", icon: "bi-briefcase", label: "Mis vacantes" },
  { key: "postulaciones", href: "../postulaciones", icon: "bi-people", label: "Postulaciones" },
  { key: "foro", href: "../foro", icon: "bi-chat-dots", label: "Foro" },
  { key: "resenaempresa", href: "../resenaempresa", icon: "bi-star", label: "Reseñas" },
  { key: "recursos", href: "../recursos", icon: "bi-journal-bookmark", label: "Recursos" }
];
</script>

<style scoped>
.navbar-custom {
  background-color: var(--nav-bg, #011671) !important;
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
.company-icon-link.active {
  background: rgba(255, 255, 255, 0.16);
}

.company-icon-link {
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
