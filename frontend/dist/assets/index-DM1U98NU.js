import{_ as H,f as q,g as U,o as S,A as p,j as k,p as D}from"./index-DiwRWjIu.js";import{r as L}from"./auth-B0efUe-6.js";const O={__name:"index",setup(V,{expose:b}){b(),S(async()=>{L(["usuario"]);const c=document.getElementById("selectorEmpresa"),x=document.getElementById("listaEmpresas"),_=document.getElementById("resumenEmpresa"),y=document.getElementById("listaValoraciones"),B=document.getElementById("formValoracion"),C=document.getElementById("alertContainer"),l=document.getElementById("puntuacion"),r=document.getElementById("comentario"),d=document.getElementById("estadoPermiso"),i=document.getElementById("btnEnviarValoracion"),E=document.getElementById("starRating");let m=[],o=null,n=null;const w=()=>({Authorization:`Bearer ${k()}`}),v=(e,a="danger")=>{C.innerHTML=`
      <div class="alert alert-${a} alert-dismissible fade show rounded-4" role="alert">
        ${e}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `},T=e=>{if(!e)return"Reciente";const a=new Date(e);return Number.isNaN(a.getTime())?"Reciente":a.toLocaleDateString("es-SV",{dateStyle:"medium"})},$=e=>{const a=Number(e||0);return Array.from({length:5},(s,t)=>`<i class="bi ${t<a?"bi-star-fill text-warning":"bi-star text-secondary"}"></i>`).join("")},f=()=>{E.innerHTML=Array.from({length:5},(e,a)=>`
      <button class="star-option ${a<Number(l.value)?"active":""}" type="button" data-value="${a+1}" ${i.disabled?"disabled":""}>
        <i class="bi bi-star-fill"></i>
      </button>
    `).join(""),E.querySelectorAll("[data-value]").forEach(e=>{e.addEventListener("click",()=>{l.value=e.dataset.value,f()})})},N=()=>{n?(l.value=String(n.puntuacion||0),r.value=n.comentario||""):(l.value="0",r.value=""),f()},I=e=>{const a=Number(e?.puede_valorar||0)===1;if(Number(e?.ya_valoro||0)===1){d.className="badge rounded-pill text-bg-info",d.textContent="Ya valoraste esta empresa. Puedes editar tu comentario.",i.disabled=!1,i.innerHTML='<i class="bi bi-pencil-square me-2"></i>Actualizar valoración',r.disabled=!1,N();return}if(a){d.className="badge rounded-pill text-bg-success",d.textContent="Puedes valorar esta empresa",i.disabled=!1,i.innerHTML='<i class="bi bi-send me-2"></i>Enviar valoración',r.disabled=!1,N();return}d.className="badge rounded-pill text-bg-warning",d.textContent="Solo puedes valorar si postulaste o trabajaste aquí",i.disabled=!0,i.innerHTML='<i class="bi bi-lock me-2"></i>Valoración bloqueada',r.disabled=!0,l.value=n?String(n.puntuacion||0):"0",r.value=n?.comentario||"",f()},P=()=>{c.innerHTML=m.map(e=>`
      <option value="${e.id_empresa}">${e.nombre_comercial}</option>
    `).join(""),o&&(c.value=String(o.id_empresa)),x.innerHTML=m.map(e=>`
      <article class="empresa-card p-3 ${Number(o?.id_empresa)===Number(e.id_empresa)?"active":""}" data-id="${e.id_empresa}">
        <div class="d-flex justify-content-between gap-3">
          <div>
            <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
              <h3 class="h6 fw-bold mb-0">${e.nombre_comercial}</h3>
              ${Number(e.puede_valorar)===1?'<span class="badge text-bg-success">Valorable</span>':""}
              ${Number(e.ya_valoro)===1?'<span class="badge text-bg-info">Ya valorada</span>':""}
            </div>
            <p class="text-muted small mb-2">${[e.nombre_municipio,e.nombre_departamento].filter(Boolean).join(", ")||"El Salvador"}</p>
            <div class="small text-muted">${e.descripcion_empresa||"Empresa activa en Workly."}</div>
          </div>
          <div class="text-end">
            <div class="fw-bold">${e.promedio||"0.0"}</div>
            <small class="text-muted">${e.total_valoraciones||0} reseñas</small>
          </div>
        </div>
      </article>
    `).join(""),x.querySelectorAll("[data-id]").forEach(e=>{e.addEventListener("click",()=>{g(Number(e.dataset.id))})})},A=e=>{const{empresa:a,resumen:s,mi_valoracion:t}=e;o=a,n=t||null,_.innerHTML=`
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-4">
        <div>
          <h2 class="h4 fw-bold mb-1">${a.nombre_comercial}</h2>
          <p class="text-muted mb-2">${a.descripcion_empresa||"Empresa sin descripción registrada."}</p>
          <div class="text-muted small">${[a.nombre_municipio,a.nombre_departamento].filter(Boolean).join(", ")||"El Salvador"}</div>
        </div>
        <div class="text-lg-end">
          <div class="display-6 fw-bold mb-1">${s?.promedio||a.promedio||"0.0"}</div>
          <div class="mb-2">${$(Math.round(Number(s?.promedio||a.promedio||0)))}</div>
          <span class="badge text-bg-light rounded-pill">${s?.total_valoraciones||a.total_valoraciones||0} valoraciones</span>
        </div>
      </div>
    `,I(a),P()},M=e=>{if(!e.length){y.innerHTML=`
        <div class="text-center py-4 text-muted border rounded-4 bg-light">
          Esta empresa todavía no tiene comentarios publicados.
        </div>
      `;return}y.innerHTML=e.map(a=>`
      <article class="border rounded-4 p-4">
        <div class="d-flex justify-content-between flex-wrap gap-2 mb-2">
          <div>
            <h3 class="h6 fw-bold mb-1">${a.nombre_usuario}</h3>
            <div>${$(a.puntuacion)}</div>
          </div>
          <small class="text-muted">${T(a.fecha_valoracion)}</small>
        </div>
        <p class="text-muted mb-0">${a.comentario||"Sin comentario adicional."}</p>
      </article>
    `).join("")},R=()=>{const e=Number(new URLSearchParams(window.location.search).get("id_empresa"));if(e)return e;const a=m.find(t=>Number(t.puede_valorar)===1&&Number(t.ya_valoro)===0);if(a)return Number(a.id_empresa);const s=m.find(t=>Number(t.ya_valoro)===1);return Number(s?s.id_empresa:m[0]?.id_empresa)},j=async()=>{const e=await fetch(`${p}/valoraciones/empresas`,{headers:w()}),a=await e.json();if(!e.ok)throw new Error(a.mensaje||"No se pudieron cargar las empresas");m=a;const s=R();s&&await g(s,!1)},g=async(e,a=!0)=>{const s=await fetch(`${p}/valoraciones/empresa/${e}`,{headers:w()}),t=await s.json();if(!s.ok)throw new Error(t.mensaje||"No se pudo cargar el detalle de la empresa");A(t),M(t.valoraciones||[]),a&&(c.value=String(e));const u=new URL(window.location.href);u.searchParams.set("id_empresa",e),window.history.replaceState({},"",u)};B.addEventListener("submit",async e=>{e.preventDefault();try{if(!o)throw new Error("Selecciona una empresa para valorar.");if(i.disabled)throw new Error("No tienes permiso para valorar esta empresa.");if(Number(l.value)<1)throw new Error("Selecciona una puntuación de 1 a 5 estrellas.");if(!r.value.trim())throw new Error("Escribe un comentario antes de enviar.");const a=!!n?.id_valoracion,s=a?`${p}/valoraciones/empresa/${o.id_empresa}`:`${p}/valoraciones`,t=await fetch(s,{method:a?"PUT":"POST",headers:{"Content-Type":"application/json",...w()},body:JSON.stringify({id_empresa_fk:Number(o.id_empresa),puntuacion:Number(l.value),comentario:r.value.trim()})}),u=await t.json();if(!t.ok)throw new Error(u.mensaje||"No se pudo guardar la valoración");v(u.mensaje,"success"),await j(),await g(Number(o.id_empresa))}catch(a){console.error(a),v(a.message||"No se pudo enviar la valoración")}}),c.addEventListener("change",async()=>{try{await g(Number(c.value))}catch(e){v(e.message)}}),f(),j().catch(e=>{console.error(e),v(e.message||"No se pudo inicializar la vista de valoraciones")})});const h={onMounted:S,get API_URL(){return p},get getToken(){return k},get requireAuth(){return L}};return Object.defineProperty(h,"__isScriptSetup",{enumerable:!1,value:!0}),h}},W={class:"d-flex flex-column min-vh-100"};function z(V,b,h,c,x,_){return D(),q("div",W,[...b[0]||(b[0]=[U('<nav class="navbar navbar-expand-lg navbar-custom py-3"><div class="container-fluid px-4 px-lg-5"><a class="navbar-brand d-flex align-items-center text-decoration-none" href="../principal"><i class="bi bi-briefcase-fill brand-icon"></i><div class="lh-sm ms-2"><span class="brand-text">Workly</span><span class="brand-sub">Tu busqueda de trabajo profesional</span></div></a><button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse" id="navbarContent"><div class="navbar-nav mx-auto gap-2 mt-3 mt-lg-0"><a href="../buscarempleo" class="nav-link-custom"><i class="bi bi-search me-1"></i> Buscar empleo</a><a href="../recursos" class="nav-link-custom"><i class="bi bi-journal-bookmark-fill me-1"></i> Recursos</a><a href="../valoracionempresa" class="nav-link-custom active"><i class="bi bi-star-fill me-1"></i> Valoraciones</a><a href="../miperfil" class="nav-link-custom"><i class="bi bi-person-badge me-1"></i> Mi Perfil</a></div><div class="d-flex align-items-center gap-3 mt-3 mt-lg-0"><a href="../notificaciones" class="text-white position-relative text-decoration-none"><i class="bi bi-bell-fill fs-3"></i><span class="notification-badge">0</span></a><a href="../miperfil" class="text-white text-decoration-none"><i class="bi bi-person-circle fs-2"></i></a></div></div></div></nav><main class="flex-grow-1 py-4"><div class="container px-4 px-lg-5"><div class="surface-card p-4 p-lg-5"><div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4"><div><h1 class="h3 fw-bold mb-1">Valoraciones de empresas</h1><p class="text-muted mb-0">Consulta opiniones reales y comparte tu experiencia si ya postulaste.</p></div><select id="selectorEmpresa" class="form-select form-select-lg rounded-4" style="max-width:340px;"></select></div><div id="alertContainer" class="mb-3"></div><div class="row g-4"><div class="col-12 col-xl-4"><div class="surface-card p-4 h-100"><h2 class="h5 fw-bold mb-3">Empresas disponibles</h2><div class="d-grid gap-3" id="listaEmpresas"></div></div></div><div class="col-12 col-xl-8"><div class="surface-card p-4 mb-4"><div id="resumenEmpresa"></div></div><div class="surface-card p-4 mb-4"><div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"><h2 class="h5 fw-bold mb-0">Escribe tu valoración</h2><span class="badge rounded-pill text-bg-light" id="estadoPermiso">Cargando permiso...</span></div><form id="formValoracion" class="row g-3"><div class="col-12"><label class="form-label fw-semibold">Puntuación</label><div class="d-flex gap-1" id="starRating"></div><input type="hidden" id="puntuacion" value="0"></div><div class="col-12"><label class="form-label fw-semibold" for="comentario">Comentario</label><textarea id="comentario" class="form-control form-control-lg rounded-4" rows="4" maxlength="600" placeholder="Cuéntale a otros candidatos cómo fue tu experiencia."></textarea></div><div class="col-12 d-grid d-md-flex justify-content-md-end"><button class="btn btn-primary btn-lg rounded-pill px-4" type="submit" id="btnEnviarValoracion"><i class="bi bi-send me-2"></i>Enviar valoración </button></div></form></div><div class="surface-card p-4"><h2 class="h5 fw-bold mb-3">Comentarios recientes</h2><div class="d-grid gap-3" id="listaValoraciones"></div></div></div></div></div></div></main><footer class="footer-custom py-4 mt-auto text-center text-white-50"><div class="container"><span>Workly 2026 · Opiniones transparentes para tomar mejores decisiones</span></div></footer>',3)])])}const J=H(O,[["render",z],["__file","C:/Users/nilso/Downloads/Desarrolo de aplicaciones web/CLON/Workly/frontend/views/usuario/valoracionempresa/index.vue"]]);export{J as default};
