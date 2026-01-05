import { Router } from "express";
import {
    getProfesores,
    getProfesorById,
    createProfesor,
    updateProfesor,
    deleteProfesor
} from "../controllers/profesor.controller";

const router = Router();

router.get('/', getProfesores);
router.post('/', createProfesor);
router.get('/:id', getProfesorById);
router.put('/:id', updateProfesor);
router.delete('/:id', deleteProfesor);

export default router;
