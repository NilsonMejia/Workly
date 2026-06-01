import { getToken, getTipo, clearSession, resolveViewPath, navigateTo } from "./config.js";

const LOGIN_PATH = resolveViewPath("public/login");

export const requireAuth = (tiposPermitidos = []) => {
  const token = getToken();
  const tipo = getTipo();

  if (!token || !tipo) {
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
