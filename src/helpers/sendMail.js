const transporter = require('./mailer');
const jwt = require('jsonwebtoken')
const ejs = require('ejs')
const path = require('path')
const getImages = require('./getImages');
require('dotenv').config()


const sendMail = (email, subject, template, attachments) => {
    
    transporter.sendMail({
        to: email,
        subject,
        html: template,
        attachments
        })
}

const getTemplate = async (templatePath, templateVar) => {
    const emailTemplate = path.join(__dirname, templatePath )
    const template = await ejs.renderFile(emailTemplate, templateVar) //un obj de las variables que usare en el template
    return template
}

const sendWelcomeEmail = async (email, data) => {
    //general el token 
    const token = jwt.sign({email}, process.env.JWT_EMAIL_SECRET, {
        expiresIn : "3d",
        algorithm: "HS512",
    })
    
    //renderizar el template, encontrar la ruta de mi archivo
    template = await getTemplate('../views/welcome/welcome-email.ejs', {
     ...data, token })

     //Obtener las imagenes a adjuntar
     //crear funcion para obtener el arreglo de imagenes de manera automatica
     const attachments = await getImages('/views/welcome/images')
    
    

    //enviar el correo
    sendMail(email, 'Bienvenido a academlo chat', template, attachments)

}

module.exports = sendWelcomeEmail