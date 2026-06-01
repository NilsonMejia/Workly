import{U as P}from"./UserNavbar-Ca48gZOP.js";import{p as H,A as g,f as M,i as A,g as R,k as q,q as U}from"./index-HlKz43MW.js";import{r as z}from"./auth-BMidhxVl.js";const D={class:"d-flex flex-column min-vh-100"},J={__name:"index",setup(O){return H(async()=>{z(["usuario"]);const d=document.getElementById("selectorEmpresa"),p=document.getElementById("listaEmpresas"),S=document.getElementById("resumenEmpresa"),x=document.getElementById("listaValoraciones"),j=document.getElementById("formValoracion"),V=document.getElementById("alertContainer"),l=document.getElementById("puntuacion"),r=document.getElementById("comentario"),c=document.getElementById("estadoPermiso"),o=document.getElementById("btnEnviarValoracion"),y=document.getElementById("starRating");let m=[],u=null,i=null;const h=()=>({Authorization:`Bearer ${q()}`}),b=(e,a="danger")=>{V.innerHTML=`
      <div class="alert alert-${a} alert-dismissible fade show rounded-4" role="alert">
        ${e}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `},n=e=>String(e??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"),L=e=>{if(!e)return"Reciente";const a=new Date(e);return Number.isNaN(a.getTime())?"Reciente":a.toLocaleDateString("es-SV",{dateStyle:"medium"})},E=e=>{const a=Number(e||0);return Array.from({length:5},(t,s)=>`<i class="bi ${s<a?"bi-star-fill text-warning":"bi-star text-secondary"}"></i>`).join("")},f=()=>{y.innerHTML=Array.from({length:5},(e,a)=>`
      <button class="star-option ${a<Number(l.value)?"active":""}" type="button" data-value="${a+1}" ${o.disabled?"disabled":""}>
        <i class="bi bi-star-fill"></i>
      </button>
    `).join(""),y.querySelectorAll("[data-value]").forEach(e=>{e.addEventListener("click",()=>{l.value=e.dataset.value,f()})})},_=()=>{i?(l.value=String(i.puntuacion||0),r.value=i.comentario||""):(l.value="0",r.value=""),f()},B=e=>{const a=Number(e?.puede_valorar||0)===1;if(Number(e?.ya_valoro||0)===1){c.className="badge rounded-pill text-bg-info",c.textContent="Ya valoraste esta empresa. Puedes editar tu comentario.",o.disabled=!1,o.innerHTML='<i class="bi bi-pencil-square me-2"></i>Actualizar valoración',r.disabled=!1,_();return}if(a){c.className="badge rounded-pill text-bg-success",c.textContent="Puedes valorar esta empresa",o.disabled=!1,o.innerHTML='<i class="bi bi-send me-2"></i>Enviar valoración',r.disabled=!1,_();return}c.className="badge rounded-pill text-bg-warning",c.textContent="Solo puedes valorar si postulaste o trabajaste aquí",o.disabled=!0,o.innerHTML='<i class="bi bi-lock me-2"></i>Valoración bloqueada',r.disabled=!0,l.value=i?String(i.puntuacion||0):"0",r.value=i?.comentario||"",f()},I=()=>{d.innerHTML=m.map(e=>`
      <option value="${e.id_empresa}">${n(e.nombre_comercial)}</option>
    `).join(""),u&&(d.value=String(u.id_empresa)),p.innerHTML=m.map(e=>`
      <article class="empresa-card p-3 ${Number(u?.id_empresa)===Number(e.id_empresa)?"active":""}" data-id="${e.id_empresa}">
        <div class="d-flex justify-content-between gap-3">
          <div>
            <div class="d-flex flex-wrap align-items-center gap-2 mb-1">
              <h3 class="h6 fw-bold mb-0">${n(e.nombre_comercial)}</h3>
              ${Number(e.puede_valorar)===1?'<span class="badge text-bg-success">Valorable</span>':""}
              ${Number(e.ya_valoro)===1?'<span class="badge text-bg-info">Ya valorada</span>':""}
            </div>
            <p class="text-muted small mb-2">${n([e.nombre_municipio,e.nombre_departamento].filter(Boolean).join(", ")||"El Salvador")}</p>
            <div class="small text-muted">${n(e.descripcion_empresa||"Empresa activa en Workly.")}</div>
          </div>
          <div class="text-end">
            <div class="fw-bold">${e.promedio||"0.0"}</div>
            <small class="text-muted">${e.total_valoraciones||0} reseñas</small>
          </div>
        </div>
      </article>
    `).join(""),p.querySelectorAll("[data-id]").forEach(e=>{e.addEventListener("click",()=>{w(Number(e.dataset.id))})})},T=e=>{const{empresa:a,resumen:t,mi_valoracion:s}=e;u=a,i=s||null,S.innerHTML=`
      <div class="d-flex flex-column flex-lg-row justify-content-between gap-4">
        <div>
          <h2 class="h4 fw-bold mb-1">${n(a.nombre_comercial)}</h2>
          <p class="text-muted mb-2">${a.descripcion_empresa||"Empresa sin descripción registrada."}</p>
          <div class="text-muted small">${n([a.nombre_municipio,a.nombre_departamento].filter(Boolean).join(", ")||"El Salvador")}</div>
        </div>
        <div class="text-lg-end">
          <div class="display-6 fw-bold mb-1">${t?.promedio||a.promedio||"0.0"}</div>
          <div class="mb-2">${E(Math.round(Number(t?.promedio||a.promedio||0)))}</div>
          <span class="badge text-bg-light rounded-pill">${t?.total_valoraciones||a.total_valoraciones||0} valoraciones</span>
        </div>
      </div>
    `,B(a),I()},k=e=>{if(!e.length){x.innerHTML=`
        <div class="text-center py-4 text-muted border rounded-4 bg-light">
          Esta empresa todavía no tiene comentarios publicados.
        </div>
      `;return}x.innerHTML=e.map(a=>`
      <article class="border rounded-4 p-4">
        <div class="d-flex justify-content-between flex-wrap gap-2 mb-2">
          <div>
            <h3 class="h6 fw-bold mb-1">${n(a.nombre_usuario)}</h3>
            <div>${E(a.puntuacion)}</div>
          </div>
          <small class="text-muted">${L(a.fecha_valoracion)}</small>
        </div>
        <p class="text-muted mb-0">${n(a.comentario||"Sin comentario adicional.")}</p>
      </article>
    `).join("")},C=()=>{const e=Number(new URLSearchParams(window.location.search).get("id_empresa"));if(e)return e;const a=m.find(s=>Number(s.puede_valorar)===1&&Number(s.ya_valoro)===0);if(a)return Number(a.id_empresa);const t=m.find(s=>Number(s.ya_valoro)===1);return Number(t?t.id_empresa:m[0]?.id_empresa)},N=async(e=null)=>{const a=await fetch(`${g}/valoraciones/empresas`,{headers:h()}),t=await a.json();if(!a.ok)throw new Error(t.mensaje||"No se pudieron cargar las empresas");m=t;const s=Number(e)||C();s&&await w(s,!1)},w=async(e,a=!0)=>{const t=await fetch(`${g}/valoraciones/empresa/${e}`,{headers:h()}),s=await t.json();if(!t.ok)throw new Error(s.mensaje||"No se pudo cargar el detalle de la empresa");T(s),k(s.valoraciones||[]),a&&(d.value=String(e));const v=new URL(window.location.href);v.searchParams.set("id_empresa",e),window.history.replaceState({},"",v)};j?.addEventListener("submit",async e=>{e.preventDefault();try{if(!u)throw new Error("Selecciona una empresa para valorar.");if(o.disabled)throw new Error("No tienes permiso para valorar esta empresa.");if(Number(l.value)<1)throw new Error("Selecciona una puntuación de 1 a 5 estrellas.");if(!r.value.trim())throw new Error("Escribe un comentario antes de enviar.");const a=Number(u.id_empresa),t=!!i?.id_valoracion,s=t?`${g}/valoraciones/empresa/${a}`:`${g}/valoraciones`,v=await fetch(s,{method:t?"PUT":"POST",headers:{"Content-Type":"application/json",...h()},body:JSON.stringify({id_empresa_fk:a,puntuacion:Number(l.value),comentario:r.value.trim()})}),$=await v.json();if(!v.ok)throw new Error($.mensaje||"No se pudo guardar la valoración");b($.mensaje,"success"),await N(a)}catch(a){console.error(a),b(a.message||"No se pudo enviar la valoración")}}),d?.addEventListener("change",async()=>{try{await w(Number(d.value))}catch(e){b(e.message)}}),f(),N().catch(e=>{console.error(e),b(e.message||"No se pudo inicializar la vista de valoraciones")})}),(d,p)=>(U(),M("div",D,[A(P,{active:"valoracionempresa"}),p[0]||(p[0]=R('<main class="flex-grow-1 py-4"><div class="container px-4 px-lg-5"><div class="surface-card p-4 p-lg-5"><div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4"><div><h1 class="h3 fw-bold mb-1">Valoraciones de empresas</h1><p class="text-muted mb-0">Consulta opiniones reales y comparte tu experiencia si ya postulaste.</p></div><select id="selectorEmpresa" class="form-select form-select-lg rounded-4" style="max-width:340px;"></select></div><div id="alertContainer" class="mb-3"></div><div class="row g-4"><div class="col-12 col-xl-4"><div class="surface-card p-4 h-100"><h2 class="h5 fw-bold mb-3">Empresas disponibles</h2><div class="d-grid gap-3" id="listaEmpresas"></div></div></div><div class="col-12 col-xl-8"><div class="surface-card p-4 mb-4"><div id="resumenEmpresa"></div></div><div class="surface-card p-4 mb-4"><div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"><h2 class="h5 fw-bold mb-0">Escribe tu valoración</h2><span class="badge rounded-pill text-bg-light" id="estadoPermiso">Cargando permiso...</span></div><form id="formValoracion" class="row g-3"><div class="col-12"><label class="form-label fw-semibold">Puntuación</label><div class="d-flex gap-1" id="starRating"></div><input type="hidden" id="puntuacion" value="0"></div><div class="col-12"><label class="form-label fw-semibold" for="comentario">Comentario</label><textarea id="comentario" class="form-control form-control-lg rounded-4" rows="4" maxlength="600" placeholder="Cuéntale a otros candidatos cómo fue tu experiencia."></textarea></div><div class="col-12 d-grid d-md-flex justify-content-md-end"><button class="btn btn-primary btn-lg rounded-pill px-4" type="submit" id="btnEnviarValoracion"><i class="bi bi-send me-2"></i>Enviar valoración </button></div></form></div><div class="surface-card p-4"><h2 class="h5 fw-bold mb-3">Comentarios recientes</h2><div class="d-grid gap-3" id="listaValoraciones"></div></div></div></div></div></div></main><footer class="footer-custom py-4 mt-auto text-center text-white-50"><div class="container"><span>Workly 2026 · Opiniones transparentes para tomar mejores decisiones</span></div></footer>',2))]))}};export{J as default};
