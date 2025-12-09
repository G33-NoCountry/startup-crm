import { ValidationErrorType } from "../types/validation-error.type";

export const buildValidationMessage = (
    field: string,
    type: ValidationErrorType,
    options?: { min?: number; max?: number, enumValues?: string[] }
): string => {
    const fieldLabel = `'${field}'`;

    const messages = {
        required: `El campo ${fieldLabel} es obligatorio.`,
        invalid_format: `El campo ${fieldLabel} no tiene un formato válido.`,
        empty: `El campo ${fieldLabel} no puede estar vacío.`,
        enum: `El campo ${fieldLabel} debe ser uno de los siguientes valores: ${options?.enumValues?.join(", ")}.`,
        array: `El campo ${fieldLabel} debe ser un array.`,
        invalid: `El campo ${fieldLabel} no tiene un valor válido`,
        min_length: `El campo ${fieldLabel} debe tener al menos ${options?.min} caracteres.`,
        max_length: `El campo ${fieldLabel} debe tener como máximo ${options?.max} caracteres.`,
        min_numeric: `El campo ${fieldLabel} debe tener un valor mínimo de ${options?.min}.`,
        already_exists: `El valor ingresado en ${fieldLabel} ya está registrado.`,
        not_match: `El campo ${fieldLabel} no coincide con el valor requerido.`,
        weak_password: `El campo ${fieldLabel} debe incluir mayúsculas, minúsculas, números y símbolos.`,
        alpha: `El campo ${fieldLabel} solo puede contener caracteres alfabeticos`,
        numeric: `El campo ${fieldLabel} solo puede contener números`,
        boolean: `El campo ${fieldLabel} debe ser verdadero o falso`,
        date: `El campo ${fieldLabel} debe ser una fecha válida.`,
        string: `El campo ${fieldLabel} debe ser una cadena de texto válida.`,
    };

    return messages[type];
};