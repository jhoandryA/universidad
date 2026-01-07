import { Router } from 'express';
import {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
  deleteCurso
} from '../controllers/curso.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @openapi
 * /api/v1/cursos:
 *   get:
 *     tags: [Cursos]
 *     summary: Listar cursos
 *     description: Obtiene todos los cursos activos
 *     security:
 *       - bearerAuth: []   # 🔐 PROTEGIDO
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/', requireAuth, getCursos);

/**
 * @openapi
 * /api/v1/cursos/{id}:
 *   get:
 *     tags: [Cursos]
 *     summary: Obtener curso por ID
 *     description: Obtiene un curso activo por su ID
 *     security:
 *       - bearerAuth: []   # 🔐 PROTEGIDO
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Curso encontrado
 */
router.get('/:id', requireAuth, getCursoById);

/**
 * @openapi
 * /api/v1/cursos:
 *   post:
 *     tags: [Cursos]
 *     summary: Crear curso
 *     description: Crea un nuevo curso
 *     security:
 *       - bearerAuth: []   # 🔐 PROTEGIDO
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre_curso
 *               - id_carrera
 *               - id_profesor
 *               - creditos
 *               - horas_semanales
 *             properties:
 *               nombre_curso:
 *                 type: string
 *                 example: Programación I
 *               id_carrera:
 *                 type: integer
 *                 example: 1
 *               id_profesor:
 *                 type: integer
 *                 example: 2
 *               creditos:
 *                 type: integer
 *                 example: 4
 *               horas_semanales:
 *                 type: integer
 *                 example: 6
 *               descripcion:
 *                 type: string
 *                 example: Curso introductorio de programación
 *     responses:
 *       201:
 *         description: Curso creado correctamente
 */
router.post('/', requireAuth, createCurso);

/**
 * @openapi
 * /api/v1/cursos/{id}:
 *   put:
 *     tags: [Cursos]
 *     summary: Actualizar curso
 *     description: Actualiza los datos de un curso
 *     security:
 *       - bearerAuth: []   # 🔐 PROTEGIDO
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Curso actualizado correctamente
 */
router.put('/:id', requireAuth, updateCurso);

/**
 * @openapi
 * /api/v1/cursos/{id}:
 *   delete:
 *     tags: [Cursos]
 *     summary: Eliminar curso
 *     description: Eliminación lógica de un curso
 *     security:
 *       - bearerAuth: []   # 🔐 PROTEGIDO
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Curso eliminado correctamente
 */
router.delete('/:id', requireAuth, deleteCurso);

export default router;
