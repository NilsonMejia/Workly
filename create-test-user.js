#!/usr/bin/env node
/**
 * Utility script to create a test user in the database
 * Usage: node create-test-user.js
 */

import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

async function createTestUser() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "WorklyDB"
  });

  try {
    console.log("🔄 Conectando a la base de datos...");
    console.log(`   Host: ${process.env.DB_HOST || "localhost"}`);
    console.log(`   Database: ${process.env.DB_NAME || "WorklyDB"}\n`);

    const email = "test@workly.local";
    const password = "test123456";
    const nombre = "Test";
    const apellido = "User";
    const telefono = "1234567890";
    const municipioId = 1;

    // Generar hash bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log("📝 Datos del usuario:");
    console.log(`   Email: ${email}`);
    console.log(`   Contraseña: ${password}`);
    console.log(`   Nombre: ${nombre} ${apellido}`);
    console.log(`   Teléfono: ${telefono}\n`);

    // Insertar usuario
    const [result] = await connection.execute(
      `
      INSERT INTO Usuarios (nombres, apellidos, correo_electronico, contrasena, telefono, id_municipio_fk, email_verificado)
      VALUES (?, ?, ?, ?, ?, ?, 1)
      `,
      [nombre, apellido, email, hashedPassword, telefono, municipioId]
    );

    console.log(`✅ Usuario creado exitosamente!`);
    console.log(`   ID: ${result.insertId}`);
    console.log(`   Email: ${email}`);
    console.log(`\n🔐 Usa estas credenciales para hacer login en http://localhost:5173/views/public/login`);
    console.log(`   Email: ${email}`);
    console.log(`   Contraseña: ${password}`);

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al crear usuario:", error.message);
    if (error.code === "ER_DUP_ENTRY") {
      console.log("\n💡 Hint: El usuario ya existe. Usa otras credenciales.");
    }
    process.exit(1);
  }
}

createTestUser();
