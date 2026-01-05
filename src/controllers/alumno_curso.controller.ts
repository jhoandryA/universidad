import { Request, Response } from "express";
import * as alumnoCursoService from "../services/alumno_curso.service";
import { alumnoCursoCrearSchema, alumnoCursoActualizarSchema } from "../schemas/alumno_curso.schema";
import { BaseResponse } from "../shared/base-response";
import {
    STATUS_CREATED,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_BAD_REQUEST,
    STATUS_NOT_FOUND
} from "../shared/constants";

export const getAlumnoCursos = async (req: Request, res: Response) => {
    try {
        const registros = await alumnoCursoService.getAlumnoCursos();
        res.json(BaseResponse.success(registros));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al obtener los registros'));
    }
};

export const getAlumnoCursoById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const registro = await alumnoCursoService.getAlumnoCursoById(id);

        if (!registro) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Registro no encontrado'));
        }

        res.json(BaseResponse.success(registro));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al obtener el registro'));
    }
};

export const createAlumnoCurso = async (req: Request, res: Response) => {
    try {
        const { error } = alumnoCursoCrearSchema.validate(req.body || {});
        if (error) {
            return res.status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(error.message));
        }

        const registro = await alumnoCursoService.createAlumnoCurso(req.body);
        res.status(STATUS_CREATED)
            .json(BaseResponse.success(registro, 'Registro creado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al crear el registro'));
    }
};

export const updateAlumnoCurso = async (req: Request, res: Response) => {
    try {
        const { error } = alumnoCursoActualizarSchema.validate(req.body || {});
        if (error) {
            return res.status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(error.message));
        }

        const id = parseInt(req.params.id);
        const registro = await alumnoCursoService.updateAlumnoCurso(id, req.body);

        if (!registro) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Registro no encontrado'));
        }

        res.json(BaseResponse.success(registro, 'Registro actualizado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al actualizar el registro'));
    }
};

export const deleteAlumnoCurso = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const resultado = await alumnoCursoService.deleteAlumnoCurso(id);

        if (!resultado.eliminado) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Registro no encontrado'));
        }

        res.json(BaseResponse.success(resultado, 'Registro eliminado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al eliminar el registro'));
    }
};
