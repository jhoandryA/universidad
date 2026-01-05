import { Router } from "express";
import {
    getAlumnos,
    getAlumnoById,
    createAlumno,
    updateAlumno,
    deleteAlumno
} from "../controllers/alumno.controller";

const router = Router();

router.get('/', getAlumnos);
router.post('/', createAlumno);
router.get('/:id', getAlumnoById);
router.put('/:id', updateAlumno);
router.delete('/:id', deleteAlumno);

export default router;
