import { Router } from "express";
import { postCrearUsuario, getObtenerPorElId, getObtenerTodosLosUsuarios,actualizarUsuario,eliminarUsuario } from "../controllers/usersController.js";
import { verificarToken, autorizarRoles } from "../middlewares/authMiddleware.js";


const router = Router();

router.use(verificarToken, autorizarRoles("admin"));

router.get('/',getObtenerTodosLosUsuarios);
router.get('/:id',getObtenerPorElId);
router.post('/',postCrearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);
export default router;
