import { pool } from '../database/mysql';

export const getAlumnos = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM alumnos WHERE estado_auditoria = "1"'
    );
    console.log('alumno.service::getAlumnos', rows);
    return rows;
};

export const getAlumnoById = async (id: number) => {
    const [rows]: any = await pool.query(
        'SELECT * FROM alumnos WHERE id_alumno = ? AND estado_auditoria = "1"',
        [id]
    );
    console.log('alumno.service::getAlumnoById', rows);
    return rows[0] || null;
};

export const createAlumno = async (data: any) => {
    console.log('alumno.service::createAlumno', data);

    const [result]: any = await pool.query(
        `INSERT INTO alumnos
        (nombres, apellido_paterno, apellido_materno, id_tipo_documento,
         numero_documento, id_sexo, id_estado_civil, id_carrera,
         ciclo, telefono, email, fecha_ingreso, estado_academico, usuario_creacion)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?, ?)`,
        [
            data.nombres,
            data.apellido_paterno,
            data.apellido_materno,
            data.id_tipo_documento,
            data.numero_documento,
            data.id_sexo,
            data.id_estado_civil,
            data.id_carrera,
            data.ciclo,
            data.telefono,
            data.email,
            data.fecha_ingreso,
            data.estado_academico,
            data.usuario_creacion ?? 'admin'
        ]
    );

    return await getAlumnoById(result.insertId);
};


export const updateAlumno = async (id: number, data: any) => {
    console.log('alumno.service::updateAlumno', { id, data });

    const [result]: any = await pool.query(
        `UPDATE alumnos SET
            nombres = ?,
            apellido_paterno = ?,
            apellido_materno = ?,
            id_tipo_documento = ?,
            numero_documento = ?,
            id_sexo = ?,
            id_estado_civil = ?,
            id_carrera = ?,
            ciclo = ?,
            telefono = ?,
            email = ?,
            fecha_ingreso = ?,
            estado_academico = ?,
            fecha_modificacion = NOW(),
            usuario_modificacion = ?
        WHERE id_alumno = ?
          AND estado_auditoria = '1'`,
        [
            data.nombres,
            data.apellido_paterno,
            data.apellido_materno,
            data.id_tipo_documento,
            data.numero_documento,
            data.id_sexo,
            data.id_estado_civil,
            data.id_carrera,
            data.ciclo,
            data.telefono,
            data.email,
            data.fecha_ingreso,
            data.estado_academico,
            data.usuario_modificacion ?? 'admin',
            id
        ]
    );

    if (result.affectedRows === 0) return null;

    return await getAlumnoById(id);
};



export const deleteAlumno = async (id: number) => {
    console.log('alumno.service::deleteAlumno', id);

    const [result]: any = await pool.query(
        `UPDATE alumnos
         SET 
            estado_auditoria = '0',
            fecha_modificacion = NOW(),
            usuario_modificacion = 'admin'
        WHERE id_alumno = ? AND estado_auditoria = '1'`,
        [id]
    );

    return { id_alumno: id, eliminado: result.affectedRows > 0 };
};
