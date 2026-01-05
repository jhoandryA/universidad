import { pool } from '../database/mysql';

export const getAlumnoCursos = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM alumno_curso WHERE estado_auditoria = "1"'
    );
    console.log('alumnoCurso.service::getAlumnoCursos', rows);
    return rows;
};

export const getAlumnoCursoById = async (id: number) => {
    const [rows]: any = await pool.query(
        'SELECT * FROM alumno_curso WHERE id_alumno_curso = ? AND estado_auditoria = "1"',
        [id]
    );
    console.log('alumnoCurso.service::getAlumnoCursoById', rows);
    return rows[0] || null;
};

export const createAlumnoCurso = async (data: any) => {
    console.log('alumnoCurso.service::createAlumnoCurso', data);

    const [result]: any = await pool.query(
        `INSERT INTO alumno_curso
        (id_alumno, id_curso, ciclo, nota_final, estado_curso, usuario_creacion)
         VALUES (?,?,?,?,?, 'admin')`,
        [
            data.id_alumno,
            data.id_curso,
            data.ciclo,
            data.nota_final,
            data.estado_curso
        ]
    );

    const ac = await getAlumnoCursoById(result.insertId);
    console.log('alumnoCurso.service::createAlumnoCurso::resultado', ac);

    return ac;
};

export const updateAlumnoCurso = async (id: number, data: any) => {
    console.log('alumnoCurso.service::updateAlumnoCurso', { id, data });

    const [result]: any = await pool.query(
        `UPDATE alumno_curso SET
            id_alumno = ?,
            id_curso = ?,
            ciclo = ?,
            nota_final = ?,
            estado_curso = ?,
            fecha_modificacion = NOW(),
            usuario_modificacion = ?
        WHERE id_alumno_curso = ?
          AND estado_auditoria = '1'`,
        [
            data.id_alumno,
            data.id_curso,
            data.ciclo,
            data.nota_final,
            data.estado_curso,
            data.usuario_modificacion ?? 'admin',
            id
        ]
    );

    if (result.affectedRows === 0) return null;

    return await getAlumnoCursoById(id);
};


export const deleteAlumnoCurso = async (id: number) => {
    console.log('alumnoCurso.service::deleteAlumnoCurso', id);

    const [result]: any = await pool.query(
        `UPDATE alumno_curso
         SET estado_auditoria = '0',
             fecha_modificacion = NOW(),
             usuario_modificacion = 'admin'
         WHERE id_alumno_curso = ? AND estado_auditoria = '1'`,
        [id]
    );

    return {
        id_alumno_curso: id,
        eliminado: result.affectedRows > 0
    };
};