export interface Curso {
    id_curso: number;
    nombre_curso: string;
    id_carrera: number;
    id_profesor: number;
    creditos: number;
    horas_semanales?: number;
    descripcion?: string;
    estado_auditoria: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
    usuario_creacion?: string;
    usuario_modificacion?: string;
}
