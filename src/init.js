/**
 * Initialization script - runs once at server startup to ensure all DB schemas exist
 * This prevents repeated CREATE TABLE IF NOT EXISTS queries on every request
 */

import { pool } from "./config/db.js";
import { ensureEmailVerificationSchema } from "./models/usuarioModel.js";

const initializeDatabase = async () => {
  console.log("🔄 Initializing database schemas...");

  try {
    // Ensure core tables exist so subsequent ALTER/INSERT operations don't fail
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Usuarios (
        id_usuario INT NOT NULL AUTO_INCREMENT,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        correo_electronico VARCHAR(150) NOT NULL,
        contrasena VARCHAR(255) NOT NULL,
        telefono VARCHAR(20),
        id_municipio_fk INT NULL,
        resumen_profesional TEXT,
        email_verificado TINYINT(1) NOT NULL DEFAULT 0,
        PRIMARY KEY (id_usuario),
        UNIQUE KEY uq_usuarios_correo (correo_electronico)
      ) ENGINE=InnoDB;
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS Empresas (
        id_empresa INT NOT NULL AUTO_INCREMENT,
        nombre_comercial VARCHAR(150) NOT NULL,
        razon_social VARCHAR(150),
        sitio_web VARCHAR(100),
        descripcion_empresa TEXT,
        id_municipio_fk INT NULL,
        correo_electronico VARCHAR(150) NULL,
        contrasena VARCHAR(255) NULL,
        email_verificado TINYINT(1) NOT NULL DEFAULT 0,
        PRIMARY KEY (id_empresa),
        UNIQUE KEY uq_empresas_correo (correo_electronico)
      ) ENGINE=InnoDB;
    `);

    // Ensure email verification columns (no-op if already present)
    await ensureEmailVerificationSchema();
    console.log("✅ Core tables and email verification schema ensured");

    // Email Verification Schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Email_Verification (
        id_usuario INT NOT NULL,
        tipo_usuario ENUM('usuario', 'empresa', 'admin') NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        codigo VARCHAR(10) NOT NULL,
        expires_at DATETIME NOT NULL,
        motivo VARCHAR(50) DEFAULT 'registro',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id_usuario, tipo_usuario),
        INDEX idx_expires_at (expires_at),
        INDEX idx_token (token)
      ) ENGINE=InnoDB;
    `);
    console.log("✅ Email_Verification table ready");

    // Company Profile Detail Schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Empresas_Perfil_Detalle (
        id_empresa_fk INT NOT NULL,
        telefono VARCHAR(20) NULL,
        direccion VARCHAR(255) NULL,
        logo_empresa LONGTEXT NULL,
        especialidades_json LONGTEXT NULL,
        cultura_json LONGTEXT NULL,
        beneficios_json LONGTEXT NULL,
        PRIMARY KEY (id_empresa_fk),
        CONSTRAINT fk_empresas_perfil_detalle_empresa
          FOREIGN KEY (id_empresa_fk)
          REFERENCES Empresas(id_empresa)
          ON UPDATE CASCADE
          ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);
    console.log("✅ Empresas_Perfil_Detalle table ready");

    console.log("✅ Database initialization complete");
  } catch (error) {
    console.error("❌ Database initialization error:", error.message);
    throw error;
  }
};

export default initializeDatabase;
