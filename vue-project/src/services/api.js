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

export const requireAuth = (roles = []) => {
  const token = getToken();
  const tipo = getTipo();

  if (!token || !tipo) {
    throw new Error('Sesion no iniciada');
  }

  if (roles.length && !roles.includes(tipo)) {
    throw new Error('Rol no autorizado');
  }

  return {
    token,
    tipo,
    usuario: getUsuario()
  };
};

export const logout = (redirect = '/login') => {
  clearSession();
  window.location.href = redirect;
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
    'public/verificacion-pendiente/index.html': '/verificacion-pendiente',
    '/views/admin/principal/index.html': '/admin/principal',
    '/views/admin/gestionusuarios/index.html': '/admin/usuarios',
    '/views/admin/gestionempresas/index.html': '/admin/empresas',
    '/views/admin/gestionvacantes/index.html': '/admin/vacantes',
    '/views/admin/estadisticas/index.html': '/admin/estadisticas',
    '/views/admin/moderacion/index.html': '/admin/moderacion',
    '/views/usuario/principal/index.html': '/usuario/principal',
    '/views/usuario/buscarempleo/index.html': '/usuario/buscar-empleo',
    '/views/usuario/detalleempleo/index.html': '/usuario/detalle-empleo',
    '/views/usuario/miperfil/index.html': '/usuario/mi-perfil',
    '/views/usuario/notificaciones/index.html': '/usuario/notificaciones',
    '/views/usuario/recursos/index.html': '/usuario/recursos',
    '/views/usuario/valoracionempresa/index.html': '/usuario/valoraciones-empresa',
    '/views/usuario/valoracionesempresa/index.html': '/usuario/valoraciones-empresa',
    '/views/empresa/principal/index.html': '/empresa/principal',
    '/views/empresa/misvacantes/index.html': '/empresa/mis-vacantes',
    '/views/empresa/publicarvacante/index.html': '/empresa/publicar-vacante',
    '/views/empresa/postulaciones/index.html': '/empresa/postulaciones',
    '/views/empresa/detallepostulacion/index.html': '/empresa/detalle-postulacion',
    '/views/empresa/perfil/index.html': '/empresa/perfil',
    '/views/empresa/notificaciones/index.html': '/empresa/notificaciones',
    '/views/empresa/recursos/index.html': '/empresa/recursos',
    '/views/empresa/foro/index.html': '/empresa/foro',
    '/views/empresa/resenaempresa/index.html': '/empresa/resena-empresa'
  };

  return `${routes[pathname] || pathname || fallback}${query}`;
};

export const resolveViewPath = (path = '') => normalizeAppRedirect(path, '/');

export const apiFetch = (path, options = {}) => fetch(`${API_URL}${path}`, options);
