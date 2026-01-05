import { Request, Response } from "express";
import * as profesorService from "../services/profesor.service";
import { profesorCrearSchema, profesorActualizarSchema } from "../schemas/profesor.schema";
import { BaseResponse } from "../shared/base-response";
import {
    STATUS_CREATED,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_BAD_REQUEST,
    STATUS_NOT_FOUND
} from "../shared/constants";

export const getProfesores = async (req: Request, res: Response) => {
    try {
        const profesores = await profesorService.getProfesores();
        res.json(BaseResponse.success(profesores, 'Listado de profesores exitoso'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al obtener los profesores'));
    }
};

export const getProfesorById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const profesor = await profesorService.getProfesorById(id);

        if (!profesor) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Profesor no encontrado'));
        }

        res.json(BaseResponse.success(profesor));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al obtener el profesor'));
    }
};

export const createProfesor = async (req: Request, res: Response) => {
    try {
        const { error } = profesorCrearSchema.validate(req.body || {});
        if (error) {
            return res.status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(error.message));
        }

        const profesor = await profesorService.createProfesor(req.body);
        res.status(STATUS_CREATED)
            .json(BaseResponse.success(profesor, 'Profesor creado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al crear el profesor'));
    }
};

export const updateProfesor = async (req: Request, res: Response) => {
    try {
        const { error } = profesorActualizarSchema.validate(req.body || {});
        if (error) {
            return res.status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(error.message));
        }

        const id = parseInt(req.params.id);
        const profesor = await profesorService.updateProfesor(id, req.body);

        if (!profesor) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Profesor no encontrado'));
        }

        res.json(BaseResponse.success(profesor, 'Profesor actualizado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al actualizar el profesor'));
    }
};

export const deleteProfesor = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const resultado = await profesorService.deleteProfesor(id);

        if (!resultado.eliminado) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Profesor no encontrado'));
        }

        res.json(BaseResponse.success(resultado, 'Profesor eliminado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al eliminar el profesor'));
    }
};
