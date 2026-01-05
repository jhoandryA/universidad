import { Request, Response } from "express";
import * as cursoService from "../services/curso.service";
import { cursoCrearSchema, cursoActualizarSchema } from "../schemas/curso.schema";
import { BaseResponse } from "../shared/base-response";
import {
    STATUS_CREATED,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_BAD_REQUEST,
    STATUS_NOT_FOUND
} from "../shared/constants";

export const getCursos = async (req: Request, res: Response) => {
    try {
        const cursos = await cursoService.getCursos();
        res.json(BaseResponse.success(cursos));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al obtener los cursos'));
    }
};

export const getCursoById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const curso = await cursoService.getCursoById(id);

        if (!curso) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Curso no encontrado'));
        }

        res.json(BaseResponse.success(curso));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al obtener el curso'));
    }
};

export const createCurso = async (req: Request, res: Response) => {
    try {
        const { error } = cursoCrearSchema.validate(req.body || {});
        if (error) {
            return res.status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(error.message));
        }

        const curso = await cursoService.createCurso(req.body);
        res.status(STATUS_CREATED)
            .json(BaseResponse.success(curso, 'Curso creado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al crear el curso'));
    }
};

export const updateCurso = async (req: Request, res: Response) => {
    try {
        const { error } = cursoActualizarSchema.validate(req.body || {});
        if (error) {
            return res.status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(error.message));
        }

        const id = parseInt(req.params.id);
        const curso = await cursoService.updateCurso(id, req.body);

        if (!curso) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Curso no encontrado'));
        }

        res.json(BaseResponse.success(curso, 'Curso actualizado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al actualizar el curso'));
    }
};

export const deleteCurso = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const resultado = await cursoService.deleteCurso(id);

        if (!resultado.eliminado) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Curso no encontrado'));
        }

        res.json(BaseResponse.success(resultado, 'Curso eliminado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al eliminar el curso'));
    }
};
