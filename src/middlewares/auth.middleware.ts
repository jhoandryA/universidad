import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { BaseResponse } from "../shared/base-response";
import { STATUS_UNAUTHORIZED } from "../shared/constants";
import { env } from "../config/env";

export const requireAuth = (req: Request, res: Response, next: Function) => {
    // obtener el token del header
    const header = req.headers.authorization;

    if(!header) {
        return res.status(STATUS_UNAUTHORIZED).json(BaseResponse.error("No se proporcionó token de autenticación"));
    }

    const token = header.split(" ")[1];

    try{
        const decoded = jwt.verify(token, env.JWT_SECRET);
        // req.user = decoded;
        next();
    }catch(error) {
        return res.status(STATUS_UNAUTHORIZED).json(BaseResponse.error("Token inválido"));
    }
}