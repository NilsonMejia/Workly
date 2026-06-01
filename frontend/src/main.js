import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.vue";

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
app.config.errorHandler = renderStartupError;
app.use(router);
app.mount("#app");
