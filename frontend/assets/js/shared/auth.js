import { getToken, getTipo, clearSession, resolveViewPath, navigateTo } from "./config.js";

const LOGIN_PATH = resolveViewPath("public/login");

export const decodeJwtPayload = (token) => {
  try {
    const payload = String(token || "").split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  const payload = decodeJwtPayload(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 <= Date.now();
};

export const requireAuth = (tiposPermitidos = []) => {
  const token = getToken();
  const tipo = getTipo();

  if (!token || !tipo || isTokenExpired(token)) {
    clearSession();
    navigateTo(LOGIN_PATH);
    return false;
  }

  if (tiposPermitidos.length > 0 && !tiposPermitidos.includes(tipo)) {
    clearSession();
    navigateTo(LOGIN_PATH);
    return false;
  }

  return true;
};

export const logout = () => {
  clearSession();
  navigateTo(LOGIN_PATH);
};
