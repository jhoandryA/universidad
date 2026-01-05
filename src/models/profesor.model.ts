export interface Profesor {
    id_profesor: number;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    id_tipo_documento: number;
    numero_documento: string;
    id_sexo: number;
    id_estado_civil: number;
    grado_academico: string;
    telefono?: string;
    email?: string;
    pago_mensual?: number;
    fecha_ingreso?: Date;
    estado_auditoria: string;
    fecha_creacion: Date;
    fecha_modificacion: Date;
    usuario_creacion?: string;
    usuario_modificacion?: string;
}