import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generarToken = (payload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no esta configurado");
  }

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "8h"
  });
};
