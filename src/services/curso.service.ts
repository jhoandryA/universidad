import { pool } from '../database/mysql';

export const getCursos = async () => {
    const [rows] = await pool.query(
        'SELECT * FROM cursos WHERE estado_auditoria = "1"'
    );
    console.log('curso.service::getCursos', rows);
    return rows;
};

export const getCursoById = async (id: number) => {
    const [rows]: any = await pool.query(
        'SELECT * FROM cursos WHERE id_curso = ? AND estado_auditoria = "1"',
        [id]
    );
    console.log('curso.service::getCursoById', rows);
    return rows[0] || null;
};

export const createCurso = async (data: any) => {
    console.log('curso.service::createCurso', data);

    const [result]: any = await pool.query(
        `INSERT INTO cursos
        (nombre_curso, id_carrera, id_profesor, creditos,
         horas_semanales, descripcion, usuario_creacion)
         VALUES (?,?,?,?,?,?, 'admin')`,
        [
            data.nombre_curso,
            data.id_carrera,
            data.id_profesor,
            data.creditos,
            data.horas_semanales,
            data.descripcion
        ]
    );

    const curso = await getCursoById(result.insertId);
    console.log('curso.service::createCurso::resultado', curso);

    return curso;
};

export const updateCurso = async (id: number, data: any) => {
    console.log('curso.service::updateCurso', { id, data });

    const [result]: any = await pool.query(
        `UPDATE cursos SET
            nombre_curso = ?,
            id_carrera = ?,
            id_profesor = ?,
            creditos = ?,
            horas_semanales = ?,
            descripcion = ?,
            fecha_modificacion = NOW(),
            usuario_modificacion = 'admin'
         WHERE id_curso = ? AND estado_auditoria = '1'`,
        [
            data.nombre_curso,
            data.id_carrera,
            data.id_profesor,
            data.creditos,
            data.horas_semanales,
            data.descripcion,
            id
        ]
    );

    if (result.affectedRows === 0) return null;

    const curso = await getCursoById(id);
    console.log('curso.service::updateCurso::resultado', curso);

    return curso;
};


export const deleteCurso = async (id: number) => {
    console.log('curso.service::deleteCurso', id);

    const [result]: any = await pool.query(
        `UPDATE cursos
         SET 
            estado_auditoria = '0',
            fecha_modificacion = NOW(),
            usuario_modificacion = 'admin'
        WHERE id_curso = ? AND estado_auditoria = '1'`,
        [id]
    );

    return { id_curso: id, eliminado: result.affectedRows > 0 };
};
