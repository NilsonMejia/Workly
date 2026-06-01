import { Router } from "express";
import { verificarToken, autorizarRoles } from "../middlewares/authMiddleware.js";
import {
  obtenerUsuariosAdmin,
  crearUsuarioAdmin,
  obtenerEmpresasAdmin,
  crearEmpresaAdmin,
  obtenerVacantesAdmin,
  crearVacanteAdmin,
  actualizarVacanteAdmin,
  cambiarEstadoUsuarioAdmin,
  verificarEmailUsuarioAdmin,
  cambiarEstadoEmpresaAdmin,
  cambiarEstadoVacanteAdmin,
  eliminarUsuarioAdmin,
  eliminarEmpresaAdmin,
  eliminarVacanteAdmin
} from "../controllers/adminController.js";

const router = Router();

router.get("/usuarios", verificarToken, autorizarRoles("admin"), obtenerUsuariosAdmin);
router.post("/usuarios", verificarToken, autorizarRoles("admin"), crearUsuarioAdmin);
router.patch("/usuarios/:id/estado", verificarToken, autorizarRoles("admin"), cambiarEstadoUsuarioAdmin);
router.patch("/usuarios/:id/verificar-email", verificarToken, autorizarRoles("admin"), verificarEmailUsuarioAdmin);
router.get("/empresas", verificarToken, autorizarRoles("admin"), obtenerEmpresasAdmin);
router.post("/empresas", verificarToken, autorizarRoles("admin"), crearEmpresaAdmin);
router.patch("/empresas/:id/estado", verificarToken, autorizarRoles("admin"), cambiarEstadoEmpresaAdmin);

router.get("/vacantes", verificarToken, autorizarRoles("admin"), obtenerVacantesAdmin);
router.post("/vacantes", verificarToken, autorizarRoles("admin"), crearVacanteAdmin);
router.put("/vacantes/:id", verificarToken, autorizarRoles("admin"), actualizarVacanteAdmin);
router.patch("/vacantes/:id/estado", verificarToken, autorizarRoles("admin"), cambiarEstadoVacanteAdmin);

router.delete("/usuarios/:id", verificarToken, autorizarRoles("admin"), eliminarUsuarioAdmin);
router.delete("/empresas/:id", verificarToken, autorizarRoles("admin"), eliminarEmpresaAdmin);
router.delete("/vacantes/:id", verificarToken, autorizarRoles("admin"), eliminarVacanteAdmin);

export default router;
