export interface Alumno {
    id_alumno: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    id_tipo_documento: number;
    numero_documento: string;
    id_sexo: number;
    id_estado_civil: number;
    id_carrera: number;
    ciclo?: number;
    telefono?: string;
    email?: string;
    fecha_ingreso?: Date;
    estado_academico?: string;
    estado_auditoria: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
    usuario_creacion?: string;
    usuario_modificacion?: string;
}
