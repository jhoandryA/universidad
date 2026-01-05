import { pool } from '../database/mysql';
import { Carrera } from '../models/carrera.model';

export const getCarreras = async() => {
    const [registros] = await pool.query('SELECT * FROM carreras WHERE estado_auditoria = "1"');
    console.log('carrera.service::getCarreras', registros);
    return registros as Carrera[];
}

export const getCarreraById = async(id: number): Promise<Carrera | null> => {
    const [registros]: any = await pool.query('SELECT * FROM carreras WHERE id_carrera = ? AND estado_auditoria = "1"', [id]);
    console.log('carrera.service::getCarreraById', registros);
    return registros[0] as Carrera;
}

export const createCarrera = async(nombre_carrera: string) => {
    console.log('carrera.service::createCarrera', nombre_carrera);
    
    const [resultado]: any = await pool.query(`
        INSERT INTO carreras (nombre_carrera, usuario_creacion)
        VALUES (?, 'admin')`,
        [nombre_carrera]
    );

    console.log('carrera.service::createCarrera::resultado', resultado);

    return {
        id_carrera: resultado.insertId,
        nombre_carrera: nombre_carrera,
        estado_auditoria: '1',
        fecha_creacion: new Date(),
        usuario_creacion: 'admin'
    };
}

export const updateCarrera = async(id: number, nombre_carrera: string) => {
    console.log('carrera.service::updateCarrera', { id, nombre_carrera });

    const [resultado]: any = await pool.query(`
        UPDATE carreras
        SET 
            nombre_carrera = ?,
            fecha_modificacion = NOW(),
            usuario_modificacion = 'admin'
        WHERE id_carrera = ? AND estado_auditoria = "1"`,
        [nombre_carrera, id]
    );

    console.log('carrera.service::updateCarrera::resultado', resultado);

    if (resultado.affectedRows === 0) {
        return null;
    }

    const carreraActualizada = await getCarreraById(id);
    return carreraActualizada;
}

export const deleteCarrera = async(id: number) => {
    console.log('carrera.service::deleteCarrera', id);

    const [resultado]: any = await pool.query(`
        UPDATE carreras
        SET 
            estado_auditoria = '0',
            fecha_modificacion = NOW(),
            usuario_modificacion = 'admin'
        WHERE id_carrera = ? AND estado_auditoria = '1'`,
        [id]
    );

    return {
        id_carrera: id,
        eliminado: resultado.affectedRows > 0
    };
}