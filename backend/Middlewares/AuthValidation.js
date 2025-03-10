const Joi = require('joi'); // validaciones

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .trim() // Elimina espacios innecesarios al inicio y final
            .required()
            .regex(/^[a-zA-Z0-9-_ ]+$/) // Permite solo letras, números, guiones y espacios
            .messages({
            'string.pattern.base': 'El valor contiene caracteres no permitidos.',
            }),
        email: Joi.string()
            .email({ tlds: { allow: false } }) // Valida formato de email
            .trim() // Elimina espacios innecesarios al inicio y final
            .lowercase() // Convierte el email a minúsculas
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Evita caracteres sospechosos
            .required()
            .messages({
            'string.pattern.base': 'El email ingresado no es válido.',
            'string.email': 'Formato de email inválido.',
            }),
        password: Joi.string()
            .min(4)
            .max(100)
            .trim()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_-]+$/) 
            .required()
            .messages({
            'string.min': 'La contraseña debe tener al menos 4 caracteres.',
            'string.max': 'La contraseña no puede superar los 100 caracteres.',
            'string.pattern.base': 'La contraseña debe incluir al menos una mayúscula, una minúscula y un número.',
            'any.required': 'La contraseña es obligatoria.'
            })
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } }) // Valida formato de email
            .trim() // Elimina espacios innecesarios al inicio y final
            .lowercase() // Convierte el email a minúsculas
            .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) // Evita caracteres sospechosos
            .required()
            .messages({
            'string.pattern.base': 'El email ingresado no es válido.',
            'string.email': 'Formato de email inválido.',
            }),
        password: Joi.string()
            .min(4)
            .max(100)
            .trim()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_-]+$/) 
            .required()
            .messages({
            'string.min': 'La contraseña debe tener al menos 4 caracteres.',
            'string.max': 'La contraseña no puede superar los 100 caracteres.',
            'string.pattern.base': 'La contraseña debe incluir al menos una mayúscula, una minúscula y un número.',
            'any.required': 'La contraseña es obligatoria.'
            })
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400)
            .json({ message: "Bad request", error })
    }
    next();
}
module.exports = {
    signupValidation,
    loginValidation
}