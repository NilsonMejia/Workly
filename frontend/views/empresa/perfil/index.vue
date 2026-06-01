<template>
  <div class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-custom py-3">
        <div class="container-fluid px-4 px-lg-5">
            <a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal">
                <i class="bi bi-briefcase-fill brand-icon"></i>
                <div class="lh-sm ms-2">
                    <span class="brand-text">Workly</span>
                    <span class="brand-sub">Panel de empresa</span>
                </div>
            </a>
            <div class="collapse navbar-collapse show">
                <div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0">
                    <a href="../publicarvacante" class="nav-link-custom"><i class="bi bi-plus-circle me-1"></i> Publicar</a>
                    <a href="../misvacantes" class="nav-link-custom"><i class="bi bi-briefcase me-1"></i> Mis vacantes</a>
                    <a href="../postulaciones" class="nav-link-custom"><i class="bi bi-people me-1"></i> Postulaciones</a>
                    <a href="../resenaempresa" class="nav-link-custom"><i class="bi bi-star me-1"></i> Reseñas</a>
                    <a href="../perfil" class="nav-link-custom active"><i class="bi bi-building me-1"></i> Perfil empresa</a>
                </div>
                <div class="d-flex align-items-center gap-3 mt-3 mt-lg-0">
                    <a href="../notificaciones" class="text-white position-relative text-decoration-none">
                        <i class="bi bi-bell-fill fs-3"></i>
                        <span class="notification-badge">0</span>
                    </a>
                    <a href="../perfil" class="text-white text-decoration-none">
                        <i class="bi bi-person-circle fs-2"></i>
                    </a>
                </div>
            </div>
        </div>
    </nav>

    <main class="flex-grow-1 py-4">
        <div class="container px-4 px-lg-5">
            <div class="row g-4">
                <div class="col-12 col-xl-4">
                    <div class="surface-card p-4 h-100">
                        <div class="text-center">
                            <img id="previewLogo" class="profile-avatar mb-3" alt="Logo de empresa" src="https://placehold.co/240x240/eef2ff/3f51b5?text=Empresa">
                            <h1 class="h4 fw-bold mb-1" id="cardNombre">Empresa</h1>
                            <p class="text-muted mb-3" id="cardTitulo">Perfil corporativo</p>
                            <label for="logo_empresa_input" class="btn btn-outline-primary rounded-pill px-4">
                                <i class="bi bi-camera me-2"></i>Cambiar logo
                            </label>
                            <input id="logo_empresa_input" type="file" accept="image/*" class="d-none">
                        </div>
                        <hr class="my-4">
                        <div class="d-grid gap-3">
                            <div>
                                <div class="section-title mb-1">Correo</div>
                                <div id="cardCorreo" class="text-muted">--</div>
                            </div>
                            <div>
                                <div class="section-title mb-1">Telefono</div>
                                <div id="cardTelefono" class="text-muted">--</div>
                            </div>
                            <div>
                                <div class="section-title mb-1">Ubicacion</div>
                                <div id="cardUbicacion" class="text-muted">--</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12 col-xl-8">
                    <div class="surface-card p-4 p-lg-5">
                        <div class="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h2 class="h3 fw-bold mb-1">Perfil de empresa</h2>
                                <p class="text-muted mb-0">Manten tu informacion empresarial lista para atraer mejor talento.</p>
                            </div>
                            <button class="btn btn-primary rounded-pill px-4" id="btnGuardarPerfil">
                                <i class="bi bi-floppy me-2"></i>Guardar cambios
                            </button>
                        </div>

                        <div id="alertContainer" class="mb-3"></div>

                        <form class="row g-4" novalidate>
                            <div class="col-12 col-md-6">
                                <label class="form-label fw-semibold" for="nombre_comercial">Nombre comercial</label>
                                <input id="nombre_comercial" class="form-control form-control-lg rounded-4" required>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label fw-semibold" for="razon_social">Razon social</label>
                                <input id="razon_social" class="form-control form-control-lg rounded-4" required>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label fw-semibold" for="correo_electronico">Correo</label>
                                <input id="correo_electronico" class="form-control form-control-lg rounded-4" type="email" disabled>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label fw-semibold" for="telefono">Telefono</label>
                                <input id="telefono" class="form-control form-control-lg rounded-4" required>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label fw-semibold" for="id_municipio_fk">Municipio</label>
                                <select id="id_municipio_fk" class="form-select form-select-lg rounded-4" required></select>
                            </div>
                            <div class="col-12 col-md-6">
                                <label class="form-label fw-semibold" for="sitio_web">Sitio web</label>
                                <input id="sitio_web" class="form-control form-control-lg rounded-4" placeholder="https://">
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold" for="direccion">Direccion</label>
                                <input id="direccion" class="form-control form-control-lg rounded-4" placeholder="Direccion corporativa">
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold" for="descripcion_empresa">Descripcion de empresa</label>
                                <textarea id="descripcion_empresa" class="form-control form-control-lg rounded-4" rows="4" placeholder="Describe la empresa, su enfoque y lo que ofrece al talento."></textarea>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold" for="especialidades_input">Especialidades y perfiles que contratas</label>
                                <input id="especialidades_input" class="form-control form-control-lg rounded-4" placeholder="Ej. Backend, Frontend, QA, Ventas">
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold" for="cultura_input">Cultura de empresa</label>
                                <textarea id="cultura_input" class="form-control form-control-lg rounded-4" rows="4" placeholder="Una linea por elemento. Ej. Trabajo en equipo"></textarea>
                            </div>
                            <div class="col-12">
                                <label class="form-label fw-semibold" for="beneficios_input">Beneficios para el talento</label>
                                <textarea id="beneficios_input" class="form-control form-control-lg rounded-4" rows="4" placeholder="Una linea por beneficio. Ej. Modalidad hibrida"></textarea>
                            </div>
                        </form>

                        <hr class="my-5">
                        <div class="row g-4">
                            <div class="col-12 col-lg-4">
                                <div class="border rounded-4 p-4 h-100">
                                    <h3 class="h5 fw-bold mb-3">Especialidades</h3>
                                    <div class="d-flex flex-wrap gap-2" id="listaEspecialidades"></div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-4">
                                <div class="border rounded-4 p-4 h-100">
                                    <h3 class="h5 fw-bold mb-3">Cultura</h3>
                                    <div class="d-grid gap-3" id="listaCultura"></div>
                                </div>
                            </div>
                            <div class="col-12 col-lg-4">
                                <div class="border rounded-4 p-4 h-100">
                                    <h3 class="h5 fw-bold mb-3">Beneficios</h3>
                                    <div class="d-grid gap-3" id="listaBeneficios"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer-custom py-4 mt-auto text-center text-white-50">
        <div class="container">
            <span>Workly 2026 · Tu empresa tambien necesita una gran vitrina</span>
        </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { API_URL, getToken } from "../../../assets/js/shared/config.js";
import { requireAuth } from "../../../assets/js/shared/auth.js";

onMounted(async () => {
  requireAuth(["empresa"]);

  const btnGuardarPerfil = document.getElementById("btnGuardarPerfil");
  const alertContainer = document.getElementById("alertContainer");
  const selectMunicipio = document.getElementById("id_municipio_fk");
  const inputLogo = document.getElementById("logo_empresa_input");
  const previewLogo = document.getElementById("previewLogo");

  let logoEmpresaBase64 = "";

  const authHeaders = () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`
  });

  const syncEmpresaStorage = (perfil) => {
    const usuarioActual = JSON.parse(localStorage.getItem("usuario") || "{}");
    localStorage.setItem("usuario", JSON.stringify({
      ...usuarioActual,
      ...perfil,
      empresa: perfil.nombre_comercial,
      nombre_comercial: perfil.nombre_comercial
    }));
  };

  const showAlert = (message, type = "danger") => {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show rounded-4" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
  };

  const splitLines = (value) =>
    value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

  const setCardData = (perfil) => {
    document.getElementById("cardNombre").textContent = perfil.nombre_comercial || "Empresa";
    document.getElementById("cardTitulo").textContent = perfil.razon_social || "Perfil de empresa";
    document.getElementById("cardCorreo").textContent = perfil.correo_electronico || "--";
    document.getElementById("cardTelefono").textContent = perfil.telefono || "--";
    document.getElementById("cardUbicacion").textContent = [perfil.nombre_municipio, perfil.nombre_departamento].filter(Boolean).join(", ") || perfil.direccion || "--";
    previewLogo.src = perfil.logo_empresa || "https://placehold.co/240x240/eef2ff/3f51b5?text=Empresa";
  };

  const renderExtras = (perfil) => {
    const rootEspecialidades = document.getElementById("listaEspecialidades");
    const rootCultura = document.getElementById("listaCultura");
    const rootBeneficios = document.getElementById("listaBeneficios");

    if (rootEspecialidades) {
      rootEspecialidades.innerHTML = (perfil.especialidades || []).length
        ? perfil.especialidades.map((item) => `<span class="badge text-bg-light rounded-pill px-3 py-2">${item}</span>`).join("")
        : `<span class="text-muted">Aun no has definido especialidades.</span>`;
    }

    if (rootCultura) {
      rootCultura.innerHTML = (perfil.cultura || []).length
        ? perfil.cultura.map((item) => `<div class="border rounded-4 p-3">${item}</div>`).join("")
        : `<p class="text-muted mb-0">Aun no has definido cultura de empresa.</p>`;
    }

    if (rootBeneficios) {
      rootBeneficios.innerHTML = (perfil.beneficios || []).length
        ? perfil.beneficios.map((item) => `<div class="border rounded-4 p-3">${item}</div>`).join("")
        : `<p class="text-muted mb-0">Aun no has definido beneficios.</p>`;
    }
  };

  const cargarMunicipios = async () => {
    const response = await fetch(`${API_URL}/catalogos/municipios-agrupados`);
    const data = await response.json();
    selectMunicipio.innerHTML = `<option value="">Selecciona un municipio</option>`;
    data.forEach((item) => {
      selectMunicipio.innerHTML += `<option value="${item.id_municipio}">${item.nombre_municipio} - ${item.nombre_departamento}</option>`;
    });
  };

  const cargarPerfilEmpresa = async () => {
    const response = await fetch(`${API_URL}/perfil/empresa`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo cargar el perfil de empresa");
    }

    document.getElementById("nombre_comercial").value = data.nombre_comercial || "";
    document.getElementById("razon_social").value = data.razon_social || "";
    document.getElementById("correo_electronico").value = data.correo_electronico || "";
    document.getElementById("telefono").value = data.telefono || "";
    document.getElementById("id_municipio_fk").value = data.id_municipio_fk || "";
    document.getElementById("direccion").value = data.direccion || "";
    document.getElementById("sitio_web").value = data.sitio_web || "";
    document.getElementById("descripcion_empresa").value = data.descripcion_empresa || "";
    document.getElementById("especialidades_input").value = (data.especialidades || []).join(", ");
    document.getElementById("cultura_input").value = (data.cultura || []).join("\n");
    document.getElementById("beneficios_input").value = (data.beneficios || []).join("\n");

    logoEmpresaBase64 = data.logo_empresa || "";
    setCardData(data);
    renderExtras(data);
  };

  const validarFormulario = () => {
    if (!document.getElementById("nombre_comercial").value.trim()) {
      throw new Error("El nombre comercial es obligatorio.");
    }
    if (!document.getElementById("razon_social").value.trim()) {
      throw new Error("La razon social es obligatoria.");
    }
    if (!document.getElementById("telefono").value.trim()) {
      throw new Error("El telefono es obligatorio.");
    }
    if (!document.getElementById("id_municipio_fk").value) {
      throw new Error("Selecciona un municipio.");
    }
  };

  const guardarPerfil = async () => {
    validarFormulario();

    const body = {
      nombre_comercial: document.getElementById("nombre_comercial").value.trim(),
      razon_social: document.getElementById("razon_social").value.trim(),
      sitio_web: document.getElementById("sitio_web").value.trim(),
      descripcion_empresa: document.getElementById("descripcion_empresa").value.trim(),
      id_municipio_fk: Number(document.getElementById("id_municipio_fk").value),
      telefono: document.getElementById("telefono").value.trim(),
      direccion: document.getElementById("direccion").value.trim(),
      logo_empresa: logoEmpresaBase64 || null,
      especialidades: document.getElementById("especialidades_input").value.split(",").map((item) => item.trim()).filter(Boolean),
      cultura: splitLines(document.getElementById("cultura_input").value),
      beneficios: splitLines(document.getElementById("beneficios_input").value)
    };

    const response = await fetch(`${API_URL}/perfil/empresa`, {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(body)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.mensaje || "No se pudo guardar el perfil.");
    }

    setCardData(data.data);
    renderExtras(data.data);
    syncEmpresaStorage(data.data);
    showAlert("Perfil de empresa actualizado correctamente.", "success");
  };

  inputLogo?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showAlert("Selecciona una imagen valida.");
      inputLogo.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      showAlert("La imagen debe pesar menos de 3MB.");
      inputLogo.value = "";
      return;
    }

    logoEmpresaBase64 = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("No se pudo leer la imagen."));
      reader.readAsDataURL(file);
    });

    previewLogo.src = logoEmpresaBase64;
  });

  btnGuardarPerfil?.addEventListener("click", async () => {
    try {
      await guardarPerfil();
    } catch (error) {
      console.error(error);
      showAlert(error.message || "No se pudo guardar el perfil.");
    }
  });

  const init = async () => {
    await cargarMunicipios();
    await cargarPerfilEmpresa();
  };

  init().catch((error) => {
    console.error(error);
    showAlert(error.message || "No se pudo cargar el perfil de empresa.");
  });
});
</script>

<style>

:root { --primary-deep: #3f51b5; --nav-bg: #011671; }
        body { font-family: "Inter", sans-serif; background: linear-gradient(180deg, #eef4ff 0%, #f8faff 100%); }
        .navbar-custom, .footer-custom { background-color: var(--nav-bg); }
        .nav-link-custom { color: white !important; text-decoration: none; font-weight: 500; padding: 0.5rem 1rem; border-radius: 30px; transition: background 0.2s; }
        .nav-link-custom:hover, .nav-link-custom.active { background: rgba(255, 255, 255, 0.12); }
        .brand-icon { font-size: 3.5rem; color: white; margin-right: 0.75rem; }
        .brand-text { color: white; font-weight: 700; font-size: 2rem; line-height: 1.2; }
        .brand-sub { color: #e2e4e8; font-size: 0.95rem; }
        .notification-badge { position: absolute; top: -5px; right: -5px; background-color: #ff4757; color: white; border-radius: 50%; padding: 0.2rem 0.4rem; font-size: 0.65rem; font-weight: bold; border: 2px solid white; }
        .surface-card { background: rgba(255, 255, 255, 0.95); border: 1px solid rgba(255, 255, 255, 0.8); border-radius: 28px; box-shadow: 0 20px 35px -12px rgba(1, 22, 113, 0.08); }
        .profile-avatar { width: 120px; height: 120px; object-fit: cover; border-radius: 28px; border: 4px solid #eef2ff; }
        .section-title { font-size: 0.95rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #5b6475; }

textarea.form-control {
  resize: vertical;
  min-height: 180px;
}
</style>
