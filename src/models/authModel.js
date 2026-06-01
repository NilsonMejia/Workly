import { pool } from "../config/db.js";

export const loginUsuario = async (correo_electronico) => {
  const [rows] = await pool.query(
    `
    SELECT
      id_usuario,
      nombres,
      apellidos,
      correo_electronico,
      contrasena,
      telefono,
      id_municipio_fk,
      resumen_profesional,
      COALESCE(email_verificado, 0) AS email_verificado
    FROM Usuarios
    WHERE correo_electronico = ?
    LIMIT 1
    `,
    [correo_electronico]
  );

  return rows[0] || null;
};

export const loginEmpresa = async (correo_electronico) => {
  const [rows] = await pool.query(
    `
    SELECT
      id_empresa,
      nombre_comercial,
      razon_social,
      sitio_web,
      descripcion_empresa,
      id_municipio_fk,
      correo_electronico,
      contrasena,
      COALESCE(email_verificado, 0) AS email_verificado
    FROM Empresas
    WHERE correo_electronico = ?
    LIMIT 1
    `,
    [correo_electronico]
  );

  return rows[0] || null;
};

export const registerEmpresaAuth = async (empresa) => {
  const {
    nombre_comercial,
    razon_social,
    sitio_web,
    descripcion_empresa,
    id_municipio_fk,
    correo_electronico,
    contrasena
  } = empresa;

  const [result] = await pool.query(
    `
    INSERT INTO Empresas
    (
      nombre_comercial,
      razon_social,
      sitio_web,
      descripcion_empresa,
      id_municipio_fk,
      correo_electronico,
      contrasena,
      email_verificado
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 0)
    `,
    [
      nombre_comercial,
      razon_social,
      sitio_web,
      descripcion_empresa,
      id_municipio_fk,
      correo_electronico,
      contrasena
    ]
  );

  return {
    id_empresa: result.insertId,
    nombre_comercial,
    correo_electronico,
    email_verificado: 0
  };
};

export const registerUsuarioAuth = async (usuario) => {
  const {
    nombres,
    apellidos,
    correo_electronico,
    contrasena,
    telefono,
    id_municipio_fk,
    resumen_profesional
  } = usuario;

  // 💡 EL TRUCO: Si resumen_profesional viene vacío desde Vue, le asignamos un texto en blanco ("")
  const resumenSeguro = resumen_profesional || "";

  const [result] = await pool.query(
    `
    INSERT INTO Usuarios
    (
      nombres,
      apellidos,
      correo_electronico,
      contrasena,
      telefono,
      id_municipio_fk,
      resumen_profesional,
      email_verificado
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, 0)
    `,
    [
      nombres,
      apellidos,
      correo_electronico,
      contrasena,
      telefono,
      id_municipio_fk,
      resumenSeguro 
    ]
  );

  return {
    id_usuario: result.insertId,
    nombres,
    apellidos,
    correo_electronico,
    email_verificado: 0
  };
};