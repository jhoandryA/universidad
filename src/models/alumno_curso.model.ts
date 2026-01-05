export interface AlumnoCurso {
    id_alumno_curso: number;
    id_alumno: number;
    id_curso: number;
    ciclo: number;
    nota_final?: number;
    estado_curso?: string;
    estado_auditoria: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
    usuario_creacion?: string;
    usuario_modificacion?: string;
}
