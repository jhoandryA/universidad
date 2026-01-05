import { Router } from "express";
import {
    getAlumnoCursos,
    getAlumnoCursoById,
    createAlumnoCurso,
    updateAlumnoCurso,
    deleteAlumnoCurso
} from "../controllers/alumno_curso.controller";

const router = Router();

router.get('/', getAlumnoCursos);
router.post('/', createAlumnoCurso);
router.get('/:id', getAlumnoCursoById);
router.put('/:id', updateAlumnoCurso);
router.delete('/:id', deleteAlumnoCurso);

export default router;
