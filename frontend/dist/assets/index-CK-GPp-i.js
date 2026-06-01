import{o as T,d as $,e as U,A as x,c as o,n as w,h as C,k as _}from"./index-B3hwfRKK.js";import{r as L}from"./auth-D-uhFCw3.js";const S={__name:"index",setup(j){return T(async()=>{L(["admin"]);const r=document.getElementById("alertContainer"),i=document.getElementById("tablaUsuarios"),b=document.getElementById("filtroUsuario"),k=document.getElementById("btnFiltrar"),v=document.getElementById("resumenTotal"),f=document.getElementById("resumenTelefono"),p=document.getElementById("resumenSinTelefono"),l=document.getElementById("actividadUsuarios");let a=[];const n=(s,e="danger")=>{r&&(r.innerHTML=`
      <div class="alert alert-${e} rounded-4" role="alert">
        ${s}
      </div>
    `)},h=()=>({Authorization:`Bearer ${C()}`,"Content-Type":"application/json"}),d=s=>{v&&(v.textContent=s.length),f&&(f.textContent=s.filter(e=>(e.telefono||"").trim()!=="").length),p&&(p.textContent=s.filter(e=>!(e.telefono||"").trim()).length)},c=s=>{if(!l)return;const e=s.slice(0,3);if(!e.length){l.innerHTML=`
        <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
          No hay actividad disponible.
        </div>
      `;return}l.innerHTML=e.map((t,m)=>`
      <div class="p-3 rounded-4 bg-light border-start border-4 ${m===0?"border-primary":m===1?"border-success":"border-warning"}">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="fw-bold mb-1">${t.nombres||""} ${t.apellidos||""}</h6>
          <small class="text-muted">Registro reciente</small>
        </div>
        <p class="small mb-0 text-muted">
          ${t.correo_electronico||"Sin correo"}${t.telefono?" · "+t.telefono:""}
        </p>
      </div>
    `).join("")},u=s=>{if(i){if(!s.length){i.innerHTML=`
        <tr>
          <td colspan="5" class="text-muted">No hay usuarios registrados.</td>
        </tr>
      `;return}i.innerHTML=s.map(e=>`
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <i class="bi bi-person-circle fs-3 me-2 text-secondary"></i>
            <div>
              <div class="fw-bold">${e.nombres||""} ${e.apellidos||""}</div>
              <div class="small text-muted">${e.resumen_profesional||""}</div>
            </div>
          </div>
        </td>
        <td>${e.correo_electronico||"N/D"}</td>
        <td>${e.telefono||"N/D"}</td>
        <td>${e.nombre_municipio||e.id_municipio_fk||"N/D"}</td>
        <td>
          <div class="d-flex align-items-center gap-2">
            <button
              class="btn btn-sm text-white fw-bold px-3 btn-eliminar"
              data-id="${e.id_usuario}"
              style="background-color:#dc3545; border-radius: 6px;"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    `).join(""),document.querySelectorAll(".btn-eliminar").forEach(e=>{e.addEventListener("click",async()=>{const t=e.dataset.id;confirm("¿Seguro que deseas eliminar este usuario?")&&await E(t)})})}},g=async()=>{try{const s=await fetch(`${x}/admin/usuarios`,{headers:h()});let e=[];try{e=await s.json()}catch{e=[]}if(s.status===401||s.status===403){typeof o=="function"&&o(),w("../../public/login");return}if(!s.ok){n(e.mensaje||"No se pudieron cargar los usuarios.");return}a=Array.isArray(e)?e:[],u(a),d(a),c(a)}catch(s){console.error(s),n("Error de conexión con el servidor.")}},E=async s=>{try{const e=await fetch(`${x}/admin/usuarios/${s}`,{method:"DELETE",headers:h()});let t={};try{t=await e.json()}catch{t={}}if(e.status===401||e.status===403){typeof o=="function"&&o(),w("../../public/login");return}if(!e.ok){n(t.mensaje||"No se pudo eliminar el usuario.");return}n("Usuario eliminado correctamente.","success"),await g()}catch(e){console.error(e),n("Error de conexión con el servidor.")}},y=()=>{const s=(b?.value||"").trim().toLowerCase();if(!s){u(a),d(a),c(a);return}const e=a.filter(t=>`${t.nombres||""} ${t.apellidos||""}`.toLowerCase().includes(s)||(t.correo_electronico||"").toLowerCase().includes(s));u(e),d(e),c(e)};k?.addEventListener("click",y),b?.addEventListener("keydown",s=>{s.key==="Enter"&&y()}),g()}),(r,i)=>(_(),$("div",null,[...i[0]||(i[0]=[U('<nav class="navbar navbar-expand-lg py-3 sticky-top"><div class="container-fluid px-4"><a class="navbar-brand fw-bold text-white fs-3 d-flex align-items-center" href="../principal"><i class="bi bi-briefcase-fill me-2"></i> Workly </a><button class="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navContent"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navContent"><ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-1"><li class="nav-item"><a class="nav-link nav-link-custom" href="../principal">Dashboard</a></li><li class="nav-item"><a class="nav-link nav-link-custom" href=".">Usuarios</a></li><li class="nav-item"><a class="nav-link nav-link-custom" href="../gestionempresas">Empresas</a></li><li class="nav-item"><a class="nav-link nav-link-custom" href="../gestionvacantes">Vacantes</a></li><li class="nav-item"><a class="nav-link nav-link-custom" href="../estadisticas">Estadísticas</a></li></ul><div class="profile-wrapper ms-lg-3"><i class="bi bi-person-circle fs-2 text-white" style="cursor:pointer;"></i><span class="notif-badge"></span></div></div></div></nav><main class="container-fluid px-4 py-4"><div class="row g-4"><aside class="col-12 col-lg-2"><div class="bento-card p-3 h-100"><h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">Menú Admin</h6><div class="d-flex flex-column"><a href="../principal" class="btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard </a><a href="." class="btn-menu-side active"><i class="bi bi-people-fill me-2"></i> Gestión de Usuarios </a><a href="../gestionempresas" class="btn-menu-side"><i class="bi bi-building me-2"></i> Gestión de Empresas </a><a href="../gestionvacantes" class="btn-menu-side"><i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes </a><a href="../estadisticas" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema </a><a href="../moderacion" class="btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> Moderación de Contenido </a></div></div></aside><div class="col-12 col-lg-10"><div class="d-flex justify-content-between align-items-center mb-4"><h4 class="fw-bold m-0" style="color:var(--azul-oscuro);">Gestión de Usuarios</h4></div><div id="alertContainer" class="mb-3"></div><div class="bento-card p-2 mb-4"><div class="row g-2 align-items-center"><div class="col"><div class="input-group"><span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span><input type="text" id="filtroUsuario" class="form-control bg-light border-0" placeholder="Buscar usuario o correo..."></div></div><div class="col-auto"><button class="btn btn-primary px-4" id="btnFiltrar" style="background-color:var(--azul);border-radius:10px;"> Filtrar </button></div></div></div><div class="bento-card p-4 mb-4"><h6 class="fw-bold mb-4">Lista de usuarios</h6><div class="table-responsive"><table class="table align-middle"><thead class="text-muted border-bottom"><tr><th>Usuario</th><th>Correo</th><th>Teléfono</th><th>Municipio</th><th>Acciones</th></tr></thead><tbody id="tablaUsuarios"><tr><td colspan="5" class="text-muted">Cargando usuarios...</td></tr></tbody></table></div></div><div class="row g-4"><div class="col-12 col-md-4"><div class="bento-card p-4 h-100"><h6 class="fw-bold mb-4">Resumen</h6><div class="vstack gap-3"><div class="d-flex justify-content-between align-items-center"><span class="text-muted fw-semibold">Total usuarios</span><span class="fw-bold fs-5" id="resumenTotal">0</span></div><div class="d-flex justify-content-between align-items-center"><span class="text-muted fw-semibold">Con teléfono</span><span class="fw-bold fs-5" id="resumenTelefono">0</span></div><div class="d-flex justify-content-between align-items-center"><span class="text-muted fw-semibold">Sin teléfono</span><span class="fw-bold fs-5" id="resumenSinTelefono">0</span></div></div></div></div><div class="col-12 col-md-8"><div class="bento-card p-4"><h6 class="fw-bold mb-4"><i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente </h6><div class="vstack gap-3" id="actividadUsuarios"><div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted"> Cargando actividad... </div></div></div></div></div></div></div></main><footer class="py-4"><div class="container text-center"><div class="d-flex justify-content-center gap-4 small opacity-75"><a href="#" class="text-white text-decoration-none">Ayuda</a><a href="#" class="text-white text-decoration-none">Privacidad</a><span class="fw-semibold">Workly 2026</span></div></div></footer>',3)])]))}};export{S as default};
