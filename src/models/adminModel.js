import { pool } from "../config/db.js";
import { ensureEmailVerificationSchema } from "./usuarioModel.js";

const vacanteEstados = new Map();
const usuarioEstados = new Map();
const empresaEstados = new Map();

const withVacanteEstado = (vacante) => ({
  ...vacante,
  estado: vacanteEstados.get(Number(vacante.id_vacante)) || vacante.estado || "Activo"
});

const withUsuarioEstado = (usuario) => ({
  ...usuario,
  estado: usuarioEstados.get(Number(usuario.id_usuario)) || usuario.estado || "Activo"
});

const withEmpresaEstado = (empresa) => ({
  ...empresa,
  estado: empresaEstados.get(Number(empresa.id_empresa)) || empresa.estado || "Activo"
});

const getAdminVacanteBaseQuery = () => `
  SELECT
    v.id_vacante,
    v.id_empresa_fk,
    e.id_empresa,
    e.nombre_comercial,
    v.id_categoria_fk,
    c.id_categoria,
    c.nombre_categoria,
    v.titulo_puesto,
    v.descripcion_puesto,
    v.salario_offrecido,
    v.modalidad,
    v.id_municipio_fk,
    m.nombre_municipio,
    v.fecha_publicacion
  FROM Vacantes v
  INNER JOIN Empresas e ON v.id_empresa_fk = e.id_empresa
  INNER JOIN Categorias c ON v.id_categoria_fk = c.id_categoria
  LEFT JOIN Municipios m ON v.id_municipio_fk = m.id_municipio
`;

const getAdminVacanteById = async (id) => {
  const [rows] = await pool.query(
    `${getAdminVacanteBaseQuery()} WHERE v.id_vacante = ?`,
    [id]
  );

  return rows[0] ? withVacanteEstado(rows[0]) : null;
};

const getAdminEmpresaById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      e.id_empresa,
      e.nombre_comercial,
      e.razon_social,
      e.sitio_web,
      e.descripcion_empresa,
      e.id_municipio_fk,
      e.correo_electronico,
      m.nombre_municipio
    FROM Empresas e
    LEFT JOIN Municipios m ON e.id_municipio_fk = m.id_municipio
    WHERE e.id_empresa = ?
    `,
    [id]
  );

  return rows[0] ? withEmpresaEstado(rows[0]) : null;
};

const getAdminUsuarioById = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      u.id_usuario,
      u.nombres,
      u.apellidos,
      u.correo_electronico,
      u.telefono,
      u.id_municipio_fk,
      u.resumen_profesional,
      COALESCE(u.email_verificado, 0) AS email_verificado,
      m.nombre_municipio
    FROM Usuarios u
    LEFT JOIN Municipios m ON u.id_municipio_fk = m.id_municipio
    WHERE u.id_usuario = ?
    `,
    [id]
  );

  return rows[0] ? withUsuarioEstado(rows[0]) : null;
};

export const getAdminUsuarios = async () => {
  await ensureEmailVerificationSchema();

  const [rows] = await pool.query(`
    SELECT
      u.id_usuario,
      u.nombres,
      u.apellidos,
      u.correo_electronico,
      u.telefono,
      u.id_municipio_fk,
      u.resumen_profesional,
      COALESCE(u.email_verificado, 0) AS email_verificado,
      m.nombre_municipio
    FROM Usuarios u
    LEFT JOIN Municipios m ON u.id_municipio_fk = m.id_municipio
    ORDER BY u.id_usuario DESC
  `);

  return rows.map(withUsuarioEstado);
};

export const createAdminUsuario = async (usuario) => {
  await ensureEmailVerificationSchema();

  const {
    nombres,
    apellidos,
    correo_electronico,
    contrasena,
    telefono,
    id_municipio_fk,
    resumen_profesional
  } = usuario;

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
    VALUES (?, ?, ?, ?, ?, ?, ?, 1)
    `,
    [
      nombres,
      apellidos,
      correo_electronico,
      contrasena,
      telefono,
      id_municipio_fk,
      resumen_profesional || ""
    ]
  );

  usuarioEstados.set(result.insertId, "Activo");
  return getAdminUsuarioById(result.insertId);
};

export const getAdminEmpresas = async () => {
  const [rows] = await pool.query(`
    SELECT
      e.id_empresa,
      e.nombre_comercial,
      e.razon_social,
      e.sitio_web,
      e.descripcion_empresa,
      e.id_municipio_fk,
      e.correo_electronico,
      m.nombre_municipio
    FROM Empresas e
    LEFT JOIN Municipios m ON e.id_municipio_fk = m.id_municipio
    ORDER BY e.id_empresa DESC
  `);

  return rows.map(withEmpresaEstado);
};

export const createAdminEmpresa = async (empresa) => {
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
      contrasena
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
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

  empresaEstados.set(result.insertId, "Activo");
  return getAdminEmpresaById(result.insertId);
};

export const getAdminVacantes = async () => {
  const [rows] = await pool.query(
    `${getAdminVacanteBaseQuery()} ORDER BY v.fecha_publicacion DESC, v.id_vacante DESC`
  );

  return rows.map(withVacanteEstado);
};

export const createAdminVacante = async (vacante) => {
  const {
    id_empresa_fk,
    id_categoria_fk,
    titulo_puesto,
    descripcion_puesto,
    salario_offrecido,
    modalidad,
    id_municipio_fk,
    estado = "Activo"
  } = vacante;

  const [result] = await pool.query(
    `
    INSERT INTO Vacantes
    (
      id_empresa_fk,
      id_categoria_fk,
      titulo_puesto,
      descripcion_puesto,
      salario_offrecido,
      modalidad,
      id_municipio_fk
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      id_empresa_fk,
      id_categoria_fk,
      titulo_puesto,
      descripcion_puesto,
      salario_offrecido,
      modalidad,
      id_municipio_fk
    ]
  );

  vacanteEstados.set(result.insertId, estado);
  return getAdminVacanteById(result.insertId);
};

export const updateAdminVacante = async (id, vacante) => {
  const {
    id_empresa_fk,
    id_categoria_fk,
    titulo_puesto,
    descripcion_puesto,
    salario_offrecido,
    modalidad,
    id_municipio_fk,
    estado
  } = vacante;

  const [result] = await pool.query(
    `
    UPDATE Vacantes
    SET
      id_empresa_fk = ?,
      id_categoria_fk = ?,
      titulo_puesto = ?,
      descripcion_puesto = ?,
      salario_offrecido = ?,
      modalidad = ?,
      id_municipio_fk = ?
    WHERE id_vacante = ?
    `,
    [
      id_empresa_fk,
      id_categoria_fk,
      titulo_puesto,
      descripcion_puesto,
      salario_offrecido,
      modalidad,
      id_municipio_fk,
      id
    ]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  if (estado) {
    vacanteEstados.set(Number(id), estado);
  }

  return getAdminVacanteById(id);
};

export const updateAdminVacanteEstado = async (id, estado) => {
  const vacante = await getAdminVacanteById(id);

  if (!vacante) {
    return null;
  }

  vacanteEstados.set(Number(id), estado);
  return getAdminVacanteById(id);
};

export const updateAdminUsuarioEstado = async (id, estado) => {
  const usuario = await getAdminUsuarioById(id);

  if (!usuario) {
    return null;
  }

  usuarioEstados.set(Number(id), estado);
  return getAdminUsuarioById(id);
};

export const verifyAdminUsuarioEmail = async (id) => {
  await ensureEmailVerificationSchema();

  await pool.query(
    "UPDATE Usuarios SET email_verificado = 1 WHERE id_usuario = ?",
    [id]
  );

  return getAdminUsuarioById(id);
};

export const updateAdminEmpresaEstado = async (id, estado) => {
  const empresa = await getAdminEmpresaById(id);

  if (!empresa) {
    return null;
  }

  empresaEstados.set(Number(id), estado);
  return getAdminEmpresaById(id);
};

export const deleteAdminUsuario = async (id) => {
  const [rows] = await pool.query(
    `
    SELECT
      id_usuario,
      nombres,
      apellidos,
      correo_electronico
    FROM Usuarios
    WHERE id_usuario = ?
    `,
    [id]
  );

  const usuario = rows[0];

  if (!usuario) {
    return null;
  }

  await pool.query(
    `
    DELETE FROM Usuarios
    WHERE id_usuario = ?
    `,
    [id]
  );

  usuarioEstados.delete(Number(id));

  return usuario;
};

export const deleteAdminEmpresa = async (id) => {
  const empresa = await getAdminEmpresaById(id);

  if (!empresa) {
    return null;
  }

  await pool.query(
    `
    DELETE FROM Empresas
    WHERE id_empresa = ?
    `,
    [id]
  );

  empresaEstados.delete(Number(id));

  return empresa;
};

export const deleteAdminVacante = async (id) => {
  const vacante = await getAdminVacanteById(id);

  if (!vacante) {
    return null;
  }

  await pool.query(
    `
    DELETE FROM Vacantes
    WHERE id_vacante = ?
    `,
    [id]
  );

  vacanteEstados.delete(Number(id));

  return vacante;
};
