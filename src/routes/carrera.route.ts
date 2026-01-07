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

/**
 * @openapi
 * /api/v1/carreras:
 *   get:
 *     tags: [Carreras]
 *     description: Listar todas las carreras
 *     responses:
 *       200:
 *         description: Lista de carreras
 */
router.get('/', getCarreras);

/**
 * @openapi
 * /api/v1/carreras/{id}:
 *   get:
 *     tags: [Carreras]
 *     description: Obtener una carrera por ID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *          example: 1
 *     responses:
 *       200:
 *         description: Carrera encontrada
 */
router.get('/:id', getCarreraById);

/**
 * @openapi
 * /api/v1/carreras:
 *   post:
 *     tags: [Carreras]
 *     description: Crear una nueva carrera
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre]
 *             properties:
 *               nombre_carrera:
 *                 type: string
 *                 example: "Ingeniería de Sistemas"
 *     responses:
 *       201:
 *         description: Carrera creada correctamente
 */
router.post('/', requireAuth, createCarrera);

/**
 * @openapi
 * /api/v1/carreras/{id}:
 *   put:
 *     tags: [Carreras]
 *     description: Actualizar una carrera
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_carrera:
 *                 type: string
 *                 example: "Ingeniería de Software"
 *     responses:
 *       200:
 *         description: Carrera actualizada correctamente
 */
router.put('/:id', requireAuth, updateCarrera);

/**
 * @openapi
 * /api/v1/carreras/{id}:
 *   delete:
 *     tags: [Carreras]
 *     description: Eliminar una carrera
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: integer
 *     responses:
 *       204:
 *         description: Carrera eliminada correctamente
 */
router.delete('/:id', requireAuth, deleteCarrera);

export default router;
