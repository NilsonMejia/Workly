const a=t=>{const e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};return String(t||"").replace(/[&<>"']/g,s=>e[s])},r=(t="",e="danger")=>{const s=a(t);return`
    <div class="alert alert-${e} alert-dismissible fade show" role="alert">
      ${s}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `};export{r as c,a as e};
