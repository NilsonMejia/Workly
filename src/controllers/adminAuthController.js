import { generarToken } from "../utils/jwt.js";
import { getAdminEmail, validarCredencialesAdmin } from "../utils/adminCredentials.js";

export const loginAdminTemporal = async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") {
      return res.status(404).json({
        mensaje: "Login admin temporal no disponible"
      });
    }

    const { usuario, clave } = req.body;
    const usuarioNormalizado = (usuario || "").trim().toLowerCase();

    const adminEmail = getAdminEmail();
    const credencialesValidas =
      usuarioNormalizado === "admin"
        ? await validarCredencialesAdmin(adminEmail, clave)
        : await validarCredencialesAdmin(usuarioNormalizado, clave);

    if (!credencialesValidas) {
      return res.status(401).json({
        mensaje: "Credenciales de admin invalidas"
      });
    }

    const token = generarToken({
      id: 1,
      tipo: "admin",
      email_verificado: true
    });

    res.json({
      mensaje: "Login admin correcto",
      token,
      tipo: "admin",
      data: {
        id: 1,
        usuario: adminEmail || usuarioNormalizado,
        tipo: "admin",
        email_verificado: true
      }
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al iniciar sesion como admin",
      error: error.message
    });
  }
};
