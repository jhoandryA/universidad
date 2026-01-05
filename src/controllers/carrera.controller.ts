import { Request, Response } from "express";
import * as carreraService from '../services/carrera.service';
import { carreraCrearSchema, carreraActualizarSchema } from "../schemas/carrera.schema";
import { BaseResponse } from "../shared/base-response";
import { STATUS_BAD_REQUEST, STATUS_CREATED, STATUS_INTERNAL_SERVER_ERROR, STATUS_NO_CONTENT, STATUS_NOT_FOUND } from "../shared/constants";

export const getCarreras = async(req: Request, res: Response) => {
    try {
        const carreras = await carreraService.getCarreras();
        res.json(BaseResponse.success(carreras));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(BaseResponse.error('Error al obtener las carreras'));
    }
}

export const getCarreraById = async(req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const carrera = await carreraService.getCarreraById(id);
        if (!carrera) {
            return res.status(STATUS_NOT_FOUND).json(BaseResponse.error('Carrera no encontrada'));
        }
        res.json(BaseResponse.success(carrera));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(BaseResponse.error('Error al obtener la carrera por ID'));
    }
}

export const createCarrera = async(req: Request, res: Response) => {
    console.log('carrera.controller::createCarrera', {body: req.body}); 
    try {
        const { error } = carreraCrearSchema.validate(req.body || {});
        if (error) {
            return res.status(STATUS_BAD_REQUEST).json(BaseResponse.error(`Error de validación: ${error.message}`));
        }
        const { nombre_carrera } = req.body;
        const carreraCreada = await carreraService.createCarrera(nombre_carrera);
        res.status(STATUS_CREATED).json(BaseResponse.success(carreraCreada, 'Carrera creada exitosamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(BaseResponse.error('Error al crear la carrera: la carrera ya existe'));
    }
}

export const updateCarrera = async(req: Request, res: Response) => {
    console.log('carrera.controller::updateCarrera', { body: req.body, params: req.params }); 
    try {
        const { error } = carreraActualizarSchema.validate(req.body || {});
        if (error) {
            return res
                .status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error(`Error de validación: ${error.message}`));
        }

        const id = parseInt(req.params.id);
        const { nombre_carrera } = req.body;

        const carreraActualizada = await carreraService.updateCarrera(id, nombre_carrera);

        if (!carreraActualizada) {
            return res
                .status(STATUS_NOT_FOUND)
                .json(BaseResponse.error('Carrera no encontrada'));
        }

        res.json(
            BaseResponse.success(carreraActualizada, 'Carrera actualizada exitosamente')
        );

    } catch (error: any) {

        if (error.code === 'ER_DUP_ENTRY') {
            return res
                .status(STATUS_BAD_REQUEST)
                .json(BaseResponse.error('La carrera ya existe'));
        }

        res
            .status(STATUS_INTERNAL_SERVER_ERROR)
            .json(BaseResponse.error('Error al actualizar la carrera'));
    }
}


export const deleteCarrera = async(req: Request, res: Response) => {
    console.log('carrera.controller::deleteCarrera', {params: req.params}); 
    try {
        const id = parseInt(req.params.id);
        const resultado = await carreraService.deleteCarrera(id);
        if (!resultado.eliminado) {
            return res.status(STATUS_NOT_FOUND).json(BaseResponse.error('Carrera no encontrada'));
        }
        res.json(BaseResponse.success(resultado, 'Carrera eliminada exitosamente'));
    } catch (error) {
        res.status(STATUS_INTERNAL_SERVER_ERROR).json(BaseResponse.error('Error al eliminar la carrera'));
    }
}