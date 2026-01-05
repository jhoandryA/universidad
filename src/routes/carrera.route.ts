import { Router } from "express";
import {
    getCarreras,
    getCarreraById,
    createCarrera,
    updateCarrera,
    deleteCarrera
} from "../controllers/carrera.controller";
import { requireAuth } from "../middlewares/auth.middleware";

const router = Router();

// Rutas públicas
router.get('/', getCarreras);
router.get('/:id', getCarreraById);

// Rutas protegidas (requieren token)
router.post('/', requireAuth, createCarrera);
router.put('/:id', requireAuth, updateCarrera);
router.delete('/:id', requireAuth, deleteCarrera);

export default router;