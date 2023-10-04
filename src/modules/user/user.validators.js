const { check } = require ('express-validator');
const validateResult = require('../../middlewares/validator.middleware');

const registerUserValidator = [

    check('firstname', 'Error con firstname')
    //verificando si esxiste
    .exists().withMessage('Falta firstname')
    //verificando que no venga vacio
    .notEmpty().withMessage('El firstname no debe ser vacio')
    //verficando si es string
    .isString().withMessage('El valor del Firstname debe ser string')//para personalizar mi mensaje de error
    //controlar cual es el minimo que tenga o cuantos caractres vamos a permitir
    .isLength({min: 2, max: 50}).withMessage('La longitud del mensaje debe ser entre 2 y 50 caracteres')
    //construir una expresion regular para nombres, para que no acepte puntos o caracteres especiales
    .matches(/^[a-zA-Z\s]/).withMessage('El firstname solo acepta letras'),
    
    //LASTNAME
    check('lastname', 'Error con lastname')
     //verificando si esxiste
     .exists().withMessage('Falta lastname')
     //verificando que no venga vacio
     .notEmpty().withMessage('El lasstname no debe ser vacio')
     //verficando si es string
     .isString().withMessage('El valor del lastname debe ser string')//para personalizar mi mensaje de error
     //controlar cual es el minimo que tenga o cuantos caractres vamos a permitir
     .isLength({min: 2, max: 50}).withMessage('La longitud del mensaje debe ser entre 2 y 50 caracteres')
     //construir una expresion regular para nombres, para que no acepte puntos o caracteres especiales
     .matches(/^[a-zA-Z\s]/).withMessage('El lastname solo acepta letras'),
     
     //EMAIL
    check('email', 'Error con el campo email')
    //verificando si esxiste
    .exists().withMessage('Falta email')
    //verificando que no venga vacio
    .notEmpty().withMessage('El email no debe ser vacio')
    //verficando si es string
    .isString().withMessage('El valor del email debe ser string')//para personalizar mi mensaje de error
    //que sea un correo electronico
    .isEmail().withMessage('El valor bebe ser un email')
    //controlar cual es el minimo que tenga o cuantos caractres vamos a permitir
    .isLength({min: 7, max: 50}).withMessage('La longitud del mensaje debe ser entre 2 y 50 caracteres'),

    //PASSWORD
    check('password', 'Error con el campo password')
    .exists().withMessage('La propiedad de password no esta incluida')
    .notEmpty().withMessage('El password no debe estar vacio')
    .isString().withMessage('El valor de password debe ser string')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/).withMessage(
        "El password debe ser minimo 8 caracteres, una mayuscula, una minuscula y un acaracter especial")
    ,
    
    validateResult,
]

const loginValidation = [
    check('email', 'Error con la propiedad emial')
    .exists().withMessage('Falta email')
    .notEmpty().withMessage('El email no debe ser vacio')
    .isString().withMessage('El valor del email debe ser string')//para personalizar mi mensaje de error
    .isEmail().withMessage('El valor bebe ser un email'),

    check('password', 'Error con el campo password')
    .exists().withMessage('La propiedad de password no esta incluida')
    .notEmpty().withMessage('El password no debe estar vacio')
    .isString().withMessage('El valor de password debe ser string'),

    validateResult,
]

module.exports = {
    registerUserValidator,
    loginValidation,
}

