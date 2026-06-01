// API_URL es dinámico: 
// - En desarrollo (localhost:5173): vacío → las llamadas van a localhost:5173 que proxy a :3000
// - En producción: será el mismo origin de donde se sirve la app
// NOTA: Si necesitas llamadas cross-origin, configura CORS en backend (src/index.js)
export const API_URL = (() => {
  if (typeof window === "undefined") return "";
  
  const { location } = window;
  const isDev = location.hostname === "localhost" && location.port === "5173";
  
  // En dev: las llamadas a "" van a localhost:5173 que hace proxy a :3000
  // En prod: las llamadas a "" van al mismo origin (mismo servidor sirve API y frontend)
  return "";
})();

// Global router instance (será asignado por main.js)
let globalRouter = null;
export const setGlobalRouter = (router) => {
  globalRouter = router;
};

const isExternalTarget = (value) => /^(https?:)?\/\//i.test(value) && !value.startsWith(window.location.origin);

export const normalizeNavigationTarget = (target) => {
  const rawTarget = String(target || "").trim();

  if (!rawTarget || rawTarget === "." || rawTarget === "./") {
    return globalRouter?.currentRoute?.value?.fullPath || "/views/public/paginainicial";
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

  const currentPath = globalRouter?.currentRoute?.value?.path || window.location.pathname || "/";
  const basePath = currentPath.endsWith("/") ? currentPath : `${currentPath}/`;
  const url = new URL(rawTarget, `${window.location.origin}${basePath}`);

  if (url.origin !== window.location.origin) {
    return url.href;
  }

  const normalizedPath = url.pathname
    .replace(/^\/frontend\/views\//i, "/views/")
    .replace(/\/index\.(html|vue)$/i, "")
    .replace(/\/$/, "");

  return `${normalizedPath || "/"}${url.search}${url.hash}`;
};

// Navegar de forma SPA-aware: usa router.push() si está disponible, senó window.location.href
export const navigateTo = (path) => {
  const target = normalizeNavigationTarget(path);
  if (!target || target.startsWith("#")) return;
  
  try {
    if (isExternalTarget(target) || /^(mailto:|tel:|javascript:|data:|blob:)/i.test(target)) {
      window.location.href = target;
      return;
    }

    if (globalRouter && typeof globalRouter.push === "function") {
      globalRouter.push(target).catch((error) => {
        if (error?.type !== 16) {
          console.error("Error during navigation:", error);
        }
      });
    } else {
      window.location.href = target;
    }
  } catch (error) {
    console.error("Error during navigation:", error);
    window.location.href = target;
  }
};

export const saveSession = (token, tipo, usuario) => {
  localStorage.setItem("token", token);
  localStorage.setItem("tipo", tipo);
  localStorage.setItem("usuario", JSON.stringify(usuario));
};

export const getToken = () => localStorage.getItem("token");
export const getTipo = () => localStorage.getItem("tipo");

export const getUsuario = () => {
  const data = localStorage.getItem("usuario");
  return data ? JSON.parse(data) : null;
};

export const resolveViewPath = (relativeViewPath) => {
  const [pathPart, queryPart = ""] = String(relativeViewPath || "").split("?");
  const cleanPath = pathPart
    .replace(/^\/+frontend\/views\//i, "")
    .replace(/^\/+views\//i, "")
    .replace(/\/index\.(html|vue)$/i, "")
    .replace(/^\/+|\/+$/g, "");

  const resolved = `/views/${cleanPath}`;
  return queryPart ? `${resolved}?${queryPart}` : resolved;
};

export const normalizeAppRedirect = (redirectPath, fallbackPath = "") => {
  const value = String(redirectPath || "").trim();

  if (!value) {
    return fallbackPath;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const [pathPart, queryPart = ""] = value.split("?");
  const normalizedPath = pathPart
    .replace(/^\/+frontend\/views\//i, "")
    .replace(/^\/+views\//i, "")
    .replace(/^\/+/, "");

  const resolved = resolveViewPath(normalizedPath);
  return queryPart ? `${resolved}?${queryPart}` : resolved;
};

export const buildPendingVerificationPath = ({ email = "", tipo = "" } = {}) => {
  const params = new URLSearchParams();

  if (email) params.set("email", email);
  if (tipo) params.set("tipo", tipo);

  const basePath = resolveViewPath("public/verificacion-pendiente");
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
};

export const clearSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("tipo");
  localStorage.removeItem("usuario");
};
