const { User } = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();

const getAllUsers = async (req, res, next) => {
  try {
    const users =await User.findAll(
      {
        attributes:{
          exclude: ['password']
        }
      }
    )
    res.json(users)
  } catch (error) {
    next(error)
  }
}


const registerUser = async (req, res, next) => {

    try {
        const newUser = req.body
       
        
        await User.create( newUser )
        res.status(201).end()
    } catch (error) {
        next(error)
        
    }
}


const loginUser = async(req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({
            where: {email}
        })

        if(!user) {
          throw {
            status: 400,
            error: 'User does not exist mid',
            message: 'You need register before login'
          }
       

        }
        
        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword) {
          throw{
            status: 400,
            error: 'Incorrect password',
                message: 'The password does not match whit the user'
          }
            
        }

        if(!user.validEmail) {
          throw {
            status: 401,
            error: 'Email verification needed',
            message: 'Look at your email messages for a verification email'
          
          }
        }
        
         
         const copyUser = {...user.dataValues}
         delete copyUser.password
         
         const token = jwt.sign(copyUser,  process.env.JWT_SECRET, {
            algorithm: 'HS512',
            expiresIn: '1h',
         })

         

         copyUser.token = token
         res.json(copyUser)

    } catch (error) {
      next (error)
    }

}

const validateEmailUser = async (req, res, next) => {
    try {
      const { token } = req.body
      if(!token){
        throw {
          status: 400,
          message: 'Token is required'
        }
    }

    const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET, {
        algorithms: 'HS512'
    })
    const user = await User.findOne( {
        where: { email }
    }) 

    if(user.validEmail) {
      throw {
        status: 400,
        message: 'Email is already verified'
      }
      
      }

      user.validEmail = true
      user.save()
      res.json({
        message: 'Email verified successfully'
      })

    } catch (error) {
      next(error)
    }
  }


const uploadAvatar = async (req, res, next) => {
  try {
    const {file} = req
    const {id } = req.params
    const imageUrl = `${process.env.APP_URL}/avatar/${file.filename}`
    await User.update({avatar: imageUrl}, {
      where: { id }
    })
    res.send(imageUrl)
  } catch (error) {
    next(error)
  }
}

module.exports = { registerUser, loginUser, validateEmailUser,  getAllUsers, uploadAvatar}