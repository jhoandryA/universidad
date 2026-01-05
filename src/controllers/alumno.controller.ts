import { Request, Response } from "express";
import * as alumnoService from "../services/alumno.service";
import { alumnoCrearSchema, alumnoActualizarSchema } from "../schemas/alumno.schema";
import { BaseResponse } from "../shared/base-response";
import {
    STATUS_CREATED,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_BAD_REQUEST,
    STATUS_NOT_FOUND
} from "../shared/constants";

export const getAlumnos = async (req: Request, res: Response) => {
    try {
        const alumnos = await alumnoService.getAlumnos();
        res.json(BaseResponse.success(alumnos));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al obtener los alumnos'));
    }
};

export const getAlumnoById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const alumno = await alumnoService.getAlumnoById(id);

        if (!alumno) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Alumno no encontrado'));
        }

        res.json(BaseResponse.success(alumno));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al obtener el alumno'));
    }
};

export const createAlumno = async (req: Request, res: Response) => {
    try {
        const { error } = alumnoCrearSchema.validate(req.body || {});
        if (error) {
            return res.status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(error.message));
        }

        const alumno = await alumnoService.createAlumno(req.body);
        res.status(STATUS_CREATED)
            .json(BaseResponse.success(alumno, 'Alumno creado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al crear el alumno'));
    }
};

export const updateAlumno = async (req: Request, res: Response) => {
    try {
        const { error } = alumnoActualizarSchema.validate(req.body || {});
        if (error) {
            return res.status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(error.message));
        }

        const id = parseInt(req.params.id);
        const alumno = await alumnoService.updateAlumno(id, req.body);

        if (!alumno) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Alumno no encontrado'));
        }

        res.json(BaseResponse.success(alumno, 'Alumno actualizado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al actualizar el alumno'));
    }
};

export const deleteAlumno = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const resultado = await alumnoService.deleteAlumno(id);

        if (!resultado.eliminado) {
            return res.status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Alumno no encontrado'));
        }

        res.json(BaseResponse.success(resultado, 'Alumno eliminado correctamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al eliminar el alumno'));
    }
};
