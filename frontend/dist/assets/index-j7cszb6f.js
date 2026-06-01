import{A as I}from"./AdminNavbar-DQCY5say.js";import{p as L,f as A,i as j,g as M,A as n,k as S,c as G,n as H,q as R}from"./index-HlKz43MW.js";import{r as z}from"./auth-BMidhxVl.js";import{e as o}from"./security-CUlqO42a.js";const O={__name:"index",setup(F){return L(async()=>{z(["admin"]);const u=document.getElementById("alertContainer"),r=document.getElementById("tablaUsuarios"),g=document.getElementById("filtroUsuario"),U=document.getElementById("btnFiltrar"),$=document.getElementById("btnNuevoUsuario"),_=document.getElementById("btnGuardarUsuario"),h=document.getElementById("usuarioMunicipio"),y=document.getElementById("resumenTotal"),w=document.getElementById("resumenTelefono"),x=document.getElementById("resumenSinTelefono"),m=document.getElementById("actividadUsuarios");let i=[];const s=(a,e="danger")=>{u&&(u.innerHTML=`
      <div class="alert alert-${e} rounded-4" role="alert">
        ${a}
      </div>
    `)},l=()=>({Authorization:`Bearer ${S()}`,"Content-Type":"application/json"}),d=()=>{G(),H("../../public/login")},b=a=>{y&&(y.textContent=a.length),w&&(w.textContent=a.filter(e=>(e.telefono||"").trim()!=="").length),x&&(x.textContent=a.filter(e=>!(e.telefono||"").trim()).length)},f=a=>{if(!m)return;const e=a.slice(0,3);if(!e.length){m.innerHTML=`
        <div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted">
          No hay actividad disponible.
        </div>
      `;return}m.innerHTML=e.map((t,v)=>`
      <div class="p-3 rounded-4 bg-light border-start border-4 ${v===0?"border-primary":v===1?"border-success":"border-warning"}">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="fw-bold mb-1">${t.nombres||""} ${t.apellidos||""}</h6>
          <small class="text-muted">Registro reciente</small>
        </div>
        <p class="small mb-0 text-muted">
          ${t.correo_electronico||"Sin correo"}${t.telefono?" · "+t.telefono:""}
        </p>
      </div>
    `).join("")},p=a=>{if(r){if(!a.length){r.innerHTML=`
        <tr>
          <td colspan="6" class="text-muted">No hay usuarios registrados.</td>
        </tr>
      `;return}r.innerHTML=a.map(e=>`
      <tr>
        <td>
          <div class="d-flex align-items-center">
            <i class="bi bi-person-circle fs-3 me-2 text-secondary"></i>
            <div>
              <div class="fw-bold">${o(e.nombres||"")} ${o(e.apellidos||"")}</div>
              <div class="small text-muted">${o(e.resumen_profesional||"")}</div>
            </div>
          </div>
        </td>
        <td>${o(e.correo_electronico||"N/D")}</td>
        <td>${o(e.telefono||"N/D")}</td>
        <td>${o(e.nombre_municipio||e.id_municipio_fk||"N/D")}</td>
        <td>
          <span class="badge rounded-pill ${Number(e.email_verificado)===1?"bg-success":"bg-warning text-dark"}">
            ${Number(e.email_verificado)===1?"Verificado":"Pendiente"}
          </span>
        </td>
        <td>
          <div class="d-flex align-items-center gap-2">
            ${Number(e.email_verificado)===1?"":`
              <button
                class="btn btn-sm text-white fw-bold px-3 btn-verificar"
                data-id="${o(e.id_usuario)}"
                style="background-color:#198754; border-radius: 6px;"
              >
                Verificar
              </button>
            `}
            <button
              class="btn btn-sm text-white fw-bold px-3 btn-eliminar"
              data-id="${o(e.id_usuario)}"
              style="background-color:#dc3545; border-radius: 6px;"
            >
              Eliminar
            </button>
          </div>
        </td>
      </tr>
    `).join(""),document.querySelectorAll(".btn-eliminar").forEach(e=>{e.addEventListener("click",async()=>{const t=e.dataset.id;confirm("¿Seguro que deseas eliminar este usuario?")&&await C(t)})}),document.querySelectorAll(".btn-verificar").forEach(e=>{e.addEventListener("click",async()=>{await B(e.dataset.id)})})}},T=async()=>{if(!h)return;const a=await fetch(`${n}/catalogos/municipios-agrupados`),e=a.ok?await a.json():[];h.innerHTML=`<option value="">Selecciona un municipio</option>${e.map(t=>`
      <option value="${o(t.id_municipio)}">${o(t.nombre_departamento)} - ${o(t.nombre_municipio)}</option>
    `).join("")}`},c=async()=>{try{const a=await fetch(`${n}/admin/usuarios`,{headers:l()});let e=[];try{e=await a.json()}catch{e=[]}if(a.status===401||a.status===403){d();return}if(!a.ok){s(e.mensaje||"No se pudieron cargar los usuarios.");return}i=Array.isArray(e)?e:[],p(i),b(i),f(i)}catch(a){console.error(a),s("Error de conexión con el servidor.")}},C=async a=>{try{const e=await fetch(`${n}/admin/usuarios/${a}`,{method:"DELETE",headers:l()});let t={};try{t=await e.json()}catch{t={}}if(e.status===401||e.status===403){d();return}if(!e.ok){s(t.mensaje||"No se pudo eliminar el usuario.");return}s("Usuario eliminado correctamente.","success"),await c()}catch(e){console.error(e),s("Error de conexión con el servidor.")}},B=async a=>{try{const e=await fetch(`${n}/admin/usuarios/${a}/verificar-email`,{method:"PATCH",headers:l()});let t={};try{t=await e.json()}catch{t={}}if(e.status===401||e.status===403){d();return}if(!e.ok){s(t.mensaje||"No se pudo verificar el usuario.");return}s("Usuario verificado. Ya puede iniciar sesion.","success"),await c()}catch(e){console.error(e),s("Error de conexion con el servidor.")}},E=()=>{const a=(g?.value||"").trim().toLowerCase();if(!a){p(i),b(i),f(i);return}const e=i.filter(t=>`${t.nombres||""} ${t.apellidos||""}`.toLowerCase().includes(a)||(t.correo_electronico||"").toLowerCase().includes(a));p(e),b(e),f(e)},k=()=>{document.getElementById("formUsuario")?.reset()},N=async()=>{const a={nombres:document.getElementById("usuarioNombres").value.trim(),apellidos:document.getElementById("usuarioApellidos").value.trim(),correo_electronico:document.getElementById("usuarioCorreo").value.trim(),contrasena:document.getElementById("usuarioContrasena").value.trim(),telefono:document.getElementById("usuarioTelefono").value.trim(),id_municipio_fk:document.getElementById("usuarioMunicipio").value,resumen_profesional:document.getElementById("usuarioResumen").value.trim()};if(!a.nombres||!a.apellidos||!a.correo_electronico||!a.contrasena){s("Completa nombres, apellidos, correo y contraseña.","warning");return}if(a.contrasena.length<6){s("La contraseña debe tener al menos 6 caracteres.","warning");return}if(a.correo_electronico.toLowerCase()==="admin@workly.com"){s("Ese correo esta reservado para el administrador del sistema.","warning");return}const e=await fetch(`${n}/admin/usuarios`,{method:"POST",headers:l(),body:JSON.stringify(a)});let t={};try{t=await e.json()}catch{}if(e.status===401||e.status===403){d();return}if(!e.ok){s(t.mensaje||"No se pudo crear el usuario.");return}s("Usuario creado correctamente.","success"),window.bootstrap?.Modal.getInstance(document.getElementById("modalUsuario"))?.hide(),k(),await c()};U?.addEventListener("click",E),$?.addEventListener("click",k),_?.addEventListener("click",N),g?.addEventListener("keydown",a=>{a.key==="Enter"&&E()}),await T(),c()}),(u,r)=>(R(),A("div",null,[j(I,{active:"gestionusuarios"}),r[0]||(r[0]=M('<main class="container-fluid px-4 py-4"><div class="row g-4"><aside class="col-12 col-lg-2"><div class="bento-card p-3 h-100"><h6 class="text-muted fw-bold mb-4 ps-2 small text-uppercase">Menú Admin</h6><div class="d-flex flex-column"><a href="../principal" class="btn-menu-side"><i class="bi bi-grid-fill me-2"></i> Dashboard </a><a href="." class="btn-menu-side active"><i class="bi bi-people-fill me-2"></i> Gestión de Usuarios </a><a href="../gestionempresas" class="btn-menu-side"><i class="bi bi-building me-2"></i> Gestión de Empresas </a><a href="../gestionvacantes" class="btn-menu-side"><i class="bi bi-file-earmark-text me-2"></i> Gestión de Vacantes </a><a href="../estadisticas" class="btn-menu-side"><i class="bi bi-bar-chart-fill me-2"></i> Estadísticas del Sistema </a><a href="../moderacion" class="btn-menu-side"><i class="bi bi-shield-lock-fill me-2"></i> Moderación de Contenido </a></div></div></aside><div class="col-12 col-lg-10"><div class="d-flex justify-content-between align-items-center mb-4"><h4 class="fw-bold m-0" style="color:var(--azul-oscuro);">Gestión de Usuarios</h4><button class="btn btn-primary px-4" id="btnNuevoUsuario" data-bs-toggle="modal" data-bs-target="#modalUsuario" style="background-color:var(--azul-oscuro);border-radius:10px;"> Nuevo usuario </button></div><div id="alertContainer" class="mb-3"></div><div class="bento-card p-2 mb-4"><div class="row g-2 align-items-center"><div class="col"><div class="input-group"><span class="input-group-text bg-light border-0"><i class="bi bi-search"></i></span><input type="text" id="filtroUsuario" class="form-control bg-light border-0" placeholder="Buscar usuario o correo..."></div></div><div class="col-auto"><button class="btn btn-primary px-4" id="btnFiltrar" style="background-color:var(--azul);border-radius:10px;"> Filtrar </button></div></div></div><div class="bento-card p-4 mb-4"><h6 class="fw-bold mb-4">Lista de usuarios</h6><div class="table-responsive"><table class="table align-middle"><thead class="text-muted border-bottom"><tr><th>Usuario</th><th>Correo</th><th>Teléfono</th><th>Municipio</th><th>Verificacion</th><th>Acciones</th></tr></thead><tbody id="tablaUsuarios"><tr><td colspan="6" class="text-muted">Cargando usuarios...</td></tr></tbody></table></div></div><div class="row g-4"><div class="col-12 col-md-4"><div class="bento-card p-4 h-100"><h6 class="fw-bold mb-4">Resumen</h6><div class="vstack gap-3"><div class="d-flex justify-content-between align-items-center"><span class="text-muted fw-semibold">Total usuarios</span><span class="fw-bold fs-5" id="resumenTotal">0</span></div><div class="d-flex justify-content-between align-items-center"><span class="text-muted fw-semibold">Con teléfono</span><span class="fw-bold fs-5" id="resumenTelefono">0</span></div><div class="d-flex justify-content-between align-items-center"><span class="text-muted fw-semibold">Sin teléfono</span><span class="fw-bold fs-5" id="resumenSinTelefono">0</span></div></div></div></div><div class="col-12 col-md-8"><div class="bento-card p-4"><h6 class="fw-bold mb-4"><i class="bi bi-clock-history me-2 text-primary"></i>Actividad reciente </h6><div class="vstack gap-3" id="actividadUsuarios"><div class="p-3 rounded-4 bg-light border-start border-4 border-primary text-muted"> Cargando actividad... </div></div></div></div></div></div></div></main><footer class="py-4"><div class="container text-center"><div class="d-flex justify-content-center gap-4 small opacity-75"><a href="#" class="text-white text-decoration-none">Ayuda</a><a href="#" class="text-white text-decoration-none">Privacidad</a><span class="fw-semibold">Workly 2026</span></div></div></footer><div class="modal fade" id="modalUsuario" tabindex="-1"><div class="modal-dialog modal-lg"><div class="modal-content"><div class="modal-header" style="background-color:var(--azul-oscuro);color:white;"><h5 class="modal-title">Nuevo usuario</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div><div class="modal-body"><form id="formUsuario"><div class="row g-3"><div class="col-md-6"><label class="form-label fw-bold">Nombres *</label><input type="text" class="form-control" id="usuarioNombres"></div><div class="col-md-6"><label class="form-label fw-bold">Apellidos *</label><input type="text" class="form-control" id="usuarioApellidos"></div><div class="col-md-6"><label class="form-label fw-bold">Correo *</label><input type="email" class="form-control" id="usuarioCorreo"></div><div class="col-md-6"><label class="form-label fw-bold">Contraseña *</label><input type="password" class="form-control" id="usuarioContrasena"></div><div class="col-md-6"><label class="form-label fw-bold">Teléfono</label><input type="text" class="form-control" id="usuarioTelefono"></div><div class="col-md-6"><label class="form-label fw-bold">Municipio</label><select class="form-select" id="usuarioMunicipio"></select></div><div class="col-12"><label class="form-label fw-bold">Resumen profesional</label><textarea class="form-control" id="usuarioResumen" rows="4"></textarea></div></div></form></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button><button type="button" class="btn btn-primary" id="btnGuardarUsuario" style="background-color:var(--azul);">Guardar usuario</button></div></div></div></div>',3))]))}};export{O as default};
