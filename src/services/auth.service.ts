import * as jwt from "jsonwebtoken";
import { env } from "../config/env";
import { JwtPayloadDto } from "../dto/jwt-payload.dto";
import { pool } from "../database/mysql";

export const login = async (username: string, password: string) => {

    const [rows]: any = await pool.query(
        `SELECT id_login, usuario, contrasena, email, rol
         FROM usuarios_sistemas
         WHERE usuario = ?`,
        [username]
    );

    if (rows.length === 0) {
        throw new Error("credenciales invalidas");
    }

    const usuarioDB = rows[0];

    if (usuarioDB.contrasena !== password) {
        throw new Error("credenciales invalidas");
    }

    const payload: JwtPayloadDto = {
        id: usuarioDB.id_login,
        username: usuarioDB.usuario,
        email: usuarioDB.email,
        rol: usuarioDB.rol
    };

    const token = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: Number(env.JWT_EXPIRES_IN)
    });

    return {
        token,
        user: payload
    };
};
