import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.route';
import carreraRoutes from './routes/carrera.route';
import profesorRoutes from './routes/profesor.route';
import alumnoRoutes from './routes/alumno.route';
import cursoRoutes from './routes/curso.route';
import alumnoCursoRoutes from './routes/alumno_curso.route';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const prefix = '/api/v1';
app.use(`${prefix}/auth`, authRoutes);
app.use(`${prefix}/carreras`, carreraRoutes);
app.use(`${prefix}/profesores`, profesorRoutes);
app.use(`${prefix}/alumnos`, alumnoRoutes);
app.use(`${prefix}/cursos`, cursoRoutes);
app.use(`${prefix}/alumno-cursos`, alumnoCursoRoutes);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});