import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");

describe("security regression checks", () => {
  it("protege CRUD publicos de usuarios, empresas, postulaciones y notificaciones", () => {
    expect(read("src/routes/usersRoutes.js")).toContain('router.use(verificarToken, autorizarRoles("admin"))');
    expect(read("src/routes/empresasRoutes.js")).toContain('router.use(verificarToken, autorizarRoles("admin"))');
    expect(read("src/routes/postulacionesRoutes.js")).toContain('router.post("/", verificarToken, autorizarRoles("usuario"), crearPostulacion)');
    expect(read("src/routes/postulacionesRoutes.js")).toContain('router.delete("/:id", verificarToken, autorizarRoles("usuario"), eliminarPostulacion)');
    expect(read("src/routes/notificacionesRoutes.js")).toContain('router.post("/", verificarToken, autorizarRoles("admin"), crearNotificacionManual)');
  });

  it("mantiene contrasenas hasheadas y admin configurado por entorno", () => {
    expect(read("src/models/usersModel.js")).toContain("bcrypt.hash");
    expect(read("src/controllers/authController.js")).not.toContain("admin123");
    expect(read("src/utils/adminCredentials.js")).toContain("process.env.ADMIN_EMAIL");
    expect(read("src/utils/adminCredentials.js")).toContain("process.env.ADMIN_PASSWORD");
  });

  it("evita auth duplicado y logs de depuracion en login", () => {
    expect(fs.existsSync(path.join(root, "frontend/assets/js/shared/authGuard.js"))).toBe(false);
    expect(read("frontend/views/public/login/index.vue")).not.toContain("console.log");
  });

  it("mantiene helper de API y render seguro en paginas criticas", () => {
    expect(read("frontend/assets/js/shared/api.js")).toContain("fetchJson");
    expect(read("frontend/views/public/paginainicial/index.vue")).toContain("v-for=\"item in vacantes\"");
    expect(read("frontend/views/usuario/foro/index.vue")).toContain("escapeHtml(post.content)");
    expect(read("frontend/views/usuario/detalleempleo/index.vue")).toContain("escapeHtml(vacante.descripcion_puesto");
  });
});
