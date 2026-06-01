import { Router } from "express";
import { verificarToken, autorizarRoles } from "../middlewares/authMiddleware.js";
import {
  obtenerEmpresas,
  obtenerEmpresaPorId,
  crearEmpresa,
  actualizarEmpresa,
  eliminarEmpresa
} from "../controllers/empresasController.js";

const router = Router();

router.use(verificarToken, autorizarRoles("admin"));

router.get("/", obtenerEmpresas);
router.get("/:id", obtenerEmpresaPorId);
router.post("/", crearEmpresa);
router.put("/:id", actualizarEmpresa);
router.delete("/:id", eliminarEmpresa);

export default router;
