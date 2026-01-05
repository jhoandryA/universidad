import { Router } from "express";
import {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso
} from "../controllers/curso.controller";

const router = Router();

router.get('/', getCursos);
router.post('/', createCurso);
router.get('/:id', getCursoById);
router.put('/:id', updateCurso);
router.delete('/:id', deleteCurso);

export default router;
