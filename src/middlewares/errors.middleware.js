// importamos las clases de errores de sequelize
const fs = require('node:fs/promises')
const path = require('node:path')
const { ConnectionError, ValidationError, DatabaseError } = require ('sequelize')

//mostrar errores en la consola
const errorLogger = (err, req, res, next) => {
  const date = new Date().toLocaleString()
  console.log(err)
  const filePath = path.join(__dirname, '../logs/logs.txt')
  fs.appendFile(filePath, `=================ERROR  ${date}=============\n `) 
  fs.appendFile(filePath, JSON.stringify(err) + '\n\n')
  next(err)
}


const ormErrorHandler = (err, req, res, next) => {
 if(err instanceof ConnectionError) {
  return res.status(409).json({
    error: 'Database connection error',
    message: err.name
  })
 }
 //verificamos si el error fue creado con la base Validation Error
 if(err instanceof ValidationError) {
  return res.status(400).json({
    error: err.name,
    message: err?.original?.detail,
    errors: err.errors
  })
 }
 if(err instanceof DatabaseError) {
  return res.status(409).json ({
    error:err.name,
    message: err.message,
    errors: err.errors
  })
 }
}
//error
//{status, err, message}
const errorHandler = (err, req, res, next) => {
    const {status, ...error} = err
   res.status(err.status || 500).json(error)

}

const notFoundErrorHandler = (req, res) => {
   res.status(404).json({
    error: 'Not Found',
    message: 'The resquested resourse is not into the server'
   })
}



module.exports = {
    errorLogger,
    errorHandler,
    notFoundErrorHandler, 
    ormErrorHandler
}

//escribir un manejador de errores para jsonwebtoken