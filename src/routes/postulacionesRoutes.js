import { Router } from "express";
import {
  obtenerPostulaciones,
  obtenerPostulacionesPorUsuario,
  obtenerPostulacionesPorVacante,
  obtenerPostulacionesEmpresa,
  crearPostulacion,
  actualizarPostulacion,
  eliminarPostulacion
} from "../controllers/postulacionesController.js";
import { verificarToken, autorizarRoles } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/empresa", verificarToken, autorizarRoles("empresa", "admin"), obtenerPostulacionesEmpresa);
router.put("/:id/estado", verificarToken, autorizarRoles("empresa", "admin"), actualizarPostulacion);
router.get("/", obtenerPostulaciones);
router.get("/usuario/:id_usuario", obtenerPostulacionesPorUsuario);
router.get("/vacante/:id_vacante", obtenerPostulacionesPorVacante);
router.post("/", verificarToken, autorizarRoles("usuario"), crearPostulacion);
router.delete("/:id", verificarToken, autorizarRoles("usuario"), eliminarPostulacion);

export default router;
