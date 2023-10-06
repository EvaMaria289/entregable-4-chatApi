const {Router} = require('express');
const { 
    createConversation,
     createGroupConversation,
      getAllConversations 
    } = require('./conversation.controllers');

const authenticate = require('../../middlewares/auth.middlerware');

const router = Router()

router.post('/', authenticate, createConversation);

router.post('/group',authenticate, createGroupConversation );

router.get('/:id',authenticate, getAllConversations);

module.exports = router;




module.exports = router