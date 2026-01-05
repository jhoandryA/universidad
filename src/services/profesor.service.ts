import { pool } from '../database/mysql';

export const getProfesores = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM profesores WHERE estado_auditoria = "1"'
    );
    console.log('profesor.service::getProfesores', rows);
    return rows;
};

export const getProfesorById = async (id: number) => {
    const [rows]: any = await pool.query(
        'SELECT * FROM profesores WHERE id_profesor = ? AND estado_auditoria = "1"',
        [id]
    );
    console.log('profesor.service::getProfesorById', rows);
    return rows[0] || null;
};

export const createProfesor = async (data: any) => {
    console.log('profesor.service::createProfesor', data);

    const [result]: any = await pool.query(
        `INSERT INTO profesores
        (nombres, apellido_paterno, apellido_materno, id_tipo_documento,
         numero_documento, id_sexo, id_estado_civil, grado_academico,
         telefono, email, pago_mensual, fecha_ingreso, usuario_creacion)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?, 'admin')`,
        [
            data.nombres,
            data.apellido_paterno,
            data.apellido_materno,
            data.id_tipo_documento,
            data.numero_documento,
            data.id_sexo,
            data.id_estado_civil,
            data.grado_academico,
            data.telefono,
            data.email,
            data.pago_mensual,
            data.fecha_ingreso
        ]
    );

    const profesor = await getProfesorById(result.insertId);
    console.log('profesor.service::createProfesor::resultado', profesor);

    return profesor;
};

export const updateProfesor = async (id: number, data: any) => {
    console.log('profesor.service::updateProfesor', { id, data });

    const [result]: any = await pool.query(
        `UPDATE profesores SET
            nombres = ?,
            apellido_paterno = ?,
            apellido_materno = ?,
            id_tipo_documento = ?,
            numero_documento = ?,
            id_sexo = ?,
            id_estado_civil = ?,
            grado_academico = ?,
            telefono = ?,
            email = ?,
            pago_mensual = ?,
            fecha_ingreso = ?,
            fecha_modificacion = NOW(),
            usuario_modificacion = ?
        WHERE id_profesor = ?
          AND estado_auditoria = '1'`,
        [
            data.nombres,
            data.apellido_paterno,
            data.apellido_materno,
            data.id_tipo_documento,
            data.numero_documento,
            data.id_sexo,
            data.id_estado_civil,
            data.grado_academico,
            data.telefono,
            data.email,
            data.pago_mensual,
            data.fecha_ingreso,
            data.usuario_modificacion ?? 'admin',
            id
        ]
    );

    if (result.affectedRows === 0) return null;

    return await getProfesorById(id);
};

export const deleteProfesor = async (id: number) => {
    console.log('profesor.service::deleteProfesor', id);

    const [result]: any = await pool.query(
        `UPDATE profesores
         SET 
            estado_auditoria = '0',
            fecha_modificacion = NOW(),
            usuario_modificacion = 'admin'
        WHERE id_profesor = ? AND estado_auditoria = '1'`,
        [id]
    );

    return { id_profesor: id, eliminado: result.affectedRows > 0 };
};
