import { Router } from 'express';
import { login } from '../controllers/auth.controller';

const router = Router();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     description: Devuelve un token JWT
 *     security: []   # 👈 PÚBLICO (SIN TOKEN)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Token generado correctamente
 */
router.post('/login', login);

export default router;
