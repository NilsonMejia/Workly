import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const getJwtSecret = () => process.env.JWT_SECRET || "workly-dev-secret";

export const generarToken = (payload) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "8h"
  });
};
