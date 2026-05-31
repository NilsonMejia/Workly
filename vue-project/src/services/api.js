export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const saveSession = (token, tipo, usuario) => {
  localStorage.setItem('token', token);
  localStorage.setItem('tipo', tipo);
  localStorage.setItem('usuario', JSON.stringify(usuario));
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('tipo');
  localStorage.removeItem('usuario');
};

export const getToken = () => localStorage.getItem('token');

export const getTipo = () => localStorage.getItem('tipo');

export const getUsuario = () => {
  try {
    return JSON.parse(localStorage.getItem('usuario') || 'null');
  } catch {
    return null;
  }
};

export const buildPendingVerificationPath = ({ email = '', tipo = '' } = {}) => {
  const params = new URLSearchParams();
  if (email) params.set('email', email);
  if (tipo) params.set('tipo', tipo);

  const query = params.toString();
  return `/verificacion-pendiente${query ? `?${query}` : ''}`;
};

export const normalizeAppRedirect = (redirect, fallback = '/') => {
  if (!redirect) return fallback;

  const value = String(redirect);
  const [pathname, search = ''] = value.split('?');
  const query = search ? `?${search}` : '';

  const routes = {
    '/views/public/paginainicial/index.html': '/',
    'public/paginainicial/index.html': '/',
    '../../public/paginainicial/index.html': '/',
    '../paginainicial/index.html': '/',
    '/views/public/login/index.html': '/login',
    'public/login/index.html': '/login',
    '../../public/login/index.html': '/login',
    '../login/index.html': '/login',
    '/views/public/registro/index.html': '/registro',
    'public/registro/index.html': '/registro',
    '../registro/index.html': '/registro',
    '/views/public/verificacion-pendiente/index.html': '/verificacion-pendiente',
    'public/verificacion-pendiente/index.html': '/verificacion-pendiente'
  };

  return `${routes[pathname] || pathname || fallback}${query}`;
};

export const resolveViewPath = (path = '') => normalizeAppRedirect(path, '/');

export const apiFetch = (path, options = {}) => fetch(`${API_URL}${path}`, options);
