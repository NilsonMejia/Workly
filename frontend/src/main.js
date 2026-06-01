import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.vue";
import { setGlobalRouter } from "../assets/js/shared/config.js";

window.bootstrap = bootstrap;

const viewModules = import.meta.glob("../views/**/index.vue");

const normalizeViewPath = (path) => {
  const cleanPath = String(path || "")
    .replace(/^\/+frontend\/views\//i, "")
    .replace(/^\/+views\//i, "")
    .replace(/\/index\.(html|vue)$/i, "")
    .replace(/^\/+|\/+$/g, "");

  return `/views/${cleanPath}`;
};

const preserveQueryRedirect = (target) => (to) => ({
  path: target,
  query: to.query,
  hash: to.hash
});

const routes = Object.entries(viewModules).flatMap(([modulePath, component]) => {
  const routePath = normalizeViewPath(
    modulePath.replace("../views/", "").replace(/\/index\.vue$/i, "")
  );

  return [
    {
      path: routePath,
      component
    },
    {
      path: `${routePath}/index.vue`,
      redirect: preserveQueryRedirect(routePath)
    },
    {
      path: `${routePath}/index.html`,
      redirect: preserveQueryRedirect(routePath)
    }
  ];
});

const homePath = "/views/public/paginainicial";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: homePath
    },
    ...routes,
    {
      path: "/:pathMatch(.*)*",
      redirect: homePath
    }
  ]
});

const isExternalTarget = (value) => /^(https?:)?\/\//i.test(value) && !value.startsWith(window.location.origin);

const normalizeNavigationTarget = (target) => {
  const rawTarget = String(target || "").trim();

  if (!rawTarget || rawTarget === "." || rawTarget === "./") {
    return router.currentRoute.value.fullPath || homePath;
  }

  if (
    rawTarget.startsWith("#") ||
    /^(mailto:|tel:|javascript:|data:|blob:)/i.test(rawTarget)
  ) {
    return rawTarget;
  }

  if (isExternalTarget(rawTarget)) {
    return rawTarget;
  }

  const currentPath = router.currentRoute.value.path || window.location.pathname || "/";
  const basePath = currentPath.endsWith("/") ? currentPath : `${currentPath}/`;
  const url = new URL(rawTarget, `${window.location.origin}${basePath}`);

  if (url.origin !== window.location.origin) {
    return url.href;
  }

  const normalizedPath = url.pathname
    .replace(/^\/frontend\/views\//i, "/views/")
    .replace(/\/index\.(html|vue)$/i, "")
    .replace(/\/$/, "");

  const routePath = normalizedPath || "/";
  return `${routePath}${url.search}${url.hash}`;
};

const navigateInApp = (target) => {
  const normalizedTarget = normalizeNavigationTarget(target);

  if (!normalizedTarget || normalizedTarget.startsWith("#")) {
    return;
  }

  if (isExternalTarget(normalizedTarget)) {
    window.location.href = normalizedTarget;
    return;
  }

  router.push(normalizedTarget).catch((error) => {
    if (error?.type !== 16) {
      console.error("Error durante navegacion:", error);
    }
  });
};

const navigationWindow = new Proxy(window, {
  get(target, property) {
    if (property !== "location") {
      const value = target[property];
      return typeof value === "function" ? value.bind(target) : value;
    }

    return new Proxy(target.location, {
      get(locationTarget, locationProperty) {
        const value = locationTarget[locationProperty];
        return typeof value === "function" ? value.bind(locationTarget) : value;
      },
      set(locationTarget, locationProperty, value) {
        if (locationProperty === "href" || locationProperty === "pathname") {
          navigateInApp(value);
          return true;
        }

        locationTarget[locationProperty] = value;
        return true;
      }
    });
  }
});

document.addEventListener("click", (event) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  const anchor = event.target.closest?.("a[href]");
  if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) {
    return;
  }

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) {
    return;
  }

  const normalizedTarget = normalizeNavigationTarget(href);
  if (isExternalTarget(normalizedTarget)) {
    return;
  }

  event.preventDefault();
  navigateInApp(href);
});

const renderStartupError = (error) => {
  const target = document.getElementById("app");
  if (!target) return;

  target.innerHTML = `
    <main style="font-family: Arial, sans-serif; padding: 32px; color: #1f2937;">
      <h1 style="font-size: 24px; margin-bottom: 12px;">No se pudo iniciar Workly</h1>
      <p style="margin-bottom: 16px;">Vue encontro un error al cargar la vista inicial.</p>
      <pre style="white-space: pre-wrap; background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 8px; padding: 16px;">${String(error?.stack || error?.message || error)}</pre>
    </main>
  `;
};

router.onError(renderStartupError);

const app = createApp(App);

// Registrar router ANTES de montar la app
setGlobalRouter(router);

app.config.errorHandler = renderStartupError;
app.config.globalProperties.window = navigationWindow;
app.config.globalProperties.navigateTo = navigateInApp;
app.use(router);
app.mount("#app");
