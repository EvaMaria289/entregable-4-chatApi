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
     
    const token = jwt.sign({email}, process.env.JWT_EMAIL_SECRET, {
        expiresIn : "3d",
        algorithm: "HS512",
       
    })
    
   
    template = await getTemplate('../views/welcome/welcome-email.ejs', {
     ...data, token,
     url: process.env.FRONT_URL,
    });

    
     const attachments = await getImages('/views/welcome/images')
    
    
    sendMail(email, 'Bienvenido a academlo chat', template, attachments)

}

module.exports = sendWelcomeEmail