import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";

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
      path: `${routePath}/`,
      redirect: preserveQueryRedirect(routePath)
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

createApp(App).use(router).mount("#app");
