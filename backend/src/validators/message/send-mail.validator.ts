import { body } from "express-validator";

export const sendMailValidator = [
    body('templateId')
        .isInt({ min: 1 }).withMessage('El ID de la plantilla debe ser un número entero válido.'),

    body('toEmail')
        .isEmail().withMessage('El correo de destino es inválido.'),

    body('subject')
        .notEmpty().withMessage('El asunto es obligatorio.'),

    body('contactData')
        .isObject().withMessage('Los datos de contacto para el parser son requeridos.')
];