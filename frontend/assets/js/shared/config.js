export const API_URL = "http://localhost:3000";

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
