const {Router} =  require('express');
const { registerUser, validateEmailUser,  getAllUsers, uploadAvatar} = require('./user.controllers');
const { loginUser, } = require('./user.controllers');
const authenticate = require('../../middlewares/auth.middlerware');
const { registerUserValidator, loginValidation } = require("./user.validators")
//const { User, Participant } = require("../../models");
const upload = require('../../middlewares/imageUpload.middlerware');
const router = Router()

router.route('/') 
.get(authenticate, getAllUsers)
.post(registerUserValidator, registerUser)

.get(async (req, res, next) => {
    try {
      const result = await User.findAll({
        include: {
          model: Participant,
        },
      })
      
      res.json(result);
    } catch (error) {
      next(error);
    }
  })

router.put('/:id', authenticate, upload.single('avatar'), uploadAvatar)
router.route('/login')
.post(loginUser)
.post(loginValidation)

router.post('/validate', validateEmailUser)




module.exports = router