import { body } from 'express-validator';
import { Contact } from '../../models'; 
export const createDealValidator = [
    //Validar Title (Requerido)
    body('title')
        .notEmpty().withMessage('El título del deal es requerido.')
        .isString().withMessage('El título debe ser una cadena de texto.')
        .trim(),

    //Validar Contact ID (Requerido e Existente)
    body('contact_id')
        .isInt({ min: 1 }).withMessage('El ID de contacto debe ser un número entero positivo.')
        .toInt() 
        .custom(async (contactId) => {
            const contact = await Contact.findByPk(contactId);
            if (!contact) {
                return Promise.reject('El contacto asociado con el ID proporcionado no existe.');
            }
            return true;
        }),

    // Validar Value 
    body('value')
        .optional({ checkFalsy: true }) 
        .isFloat({ min: 0 }).withMessage('El valor debe ser un número positivo.')
        .toFloat() 
];