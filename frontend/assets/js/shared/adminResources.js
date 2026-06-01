const STORAGE_KEY = "workly_admin_resources";

const DEFAULT_RESOURCES = [
  {
    id: "resource-admin-1",
    titulo: "Guia para entrevistas con estructura",
    descripcion: "Preguntas, criterios y cierre para entrevistas mas consistentes.",
    categoria: "Entrevistas",
    audiencia: "ambos",
    formato: "PDF",
    enlace: ""
  },
  {
    id: "resource-admin-2",
    titulo: "Checklist para postular mejor",
    descripcion: "Pasos rapidos para revisar CV, perfil y postulacion antes de enviar.",
    categoria: "Carrera",
    audiencia: "usuario",
    formato: "DOCX",
    enlace: ""
  }
];

const normalizeResources = (items) =>
  items.map((item) => ({
    id: item.id || `resource-${Date.now()}`,
    titulo: String(item.titulo || "Recurso").trim(),
    descripcion: String(item.descripcion || "").trim(),
    categoria: String(item.categoria || "General").trim(),
    audiencia: ["usuario", "empresa", "ambos"].includes(item.audiencia) ? item.audiencia : "ambos",
    formato: String(item.formato || "WEB").trim().toUpperCase(),
    enlace: String(item.enlace || "").trim(),
    createdAt: item.createdAt || new Date().toISOString()
  }));

export const getAdminResources = () => {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_RESOURCES));
    return normalizeResources(DEFAULT_RESOURCES);
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? normalizeResources(parsed) : normalizeResources(DEFAULT_RESOURCES);
  } catch {
    return normalizeResources(DEFAULT_RESOURCES);
  }
};

export const saveAdminResource = (resource) => {
  const nextResource = normalizeResources([
    {
      ...resource,
      id: `resource-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
  ])[0];

  localStorage.setItem(STORAGE_KEY, JSON.stringify([nextResource, ...getAdminResources()]));
  return nextResource;
};

export const deleteAdminResource = (id) => {
  const resources = getAdminResources().filter((resource) => resource.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  return resources;
};

export const getResourcesForAudience = (audience) =>
  getAdminResources().filter((resource) => resource.audiencia === "ambos" || resource.audiencia === audience);
