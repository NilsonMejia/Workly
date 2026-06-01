import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const BCRYPT_HASH_PATTERN = /^\$2[aby]\$\d{2}\$/;
let adminPasswordHashPromise = null;

export const getAdminEmail = () => String(process.env.ADMIN_EMAIL || "").trim().toLowerCase();

const getAdminPasswordHash = async () => {
  const configuredPassword = String(process.env.ADMIN_PASSWORD || "").trim();

  if (!configuredPassword) {
    return "";
  }

  if (BCRYPT_HASH_PATTERN.test(configuredPassword)) {
    return configuredPassword;
  }

  adminPasswordHashPromise ||= bcrypt.hash(configuredPassword, 10);
  return adminPasswordHashPromise;
};

export const validarCredencialesAdmin = async (email, password) => {
  const adminEmail = getAdminEmail();
  const adminPasswordHash = await getAdminPasswordHash();

  if (!adminEmail || !adminPasswordHash) {
    return false;
  }

  const emailNormalizado = String(email || "").trim().toLowerCase();
  const passwordIngresado = String(password || "").trim();

  return emailNormalizado === adminEmail && bcrypt.compare(passwordIngresado, adminPasswordHash);
};
