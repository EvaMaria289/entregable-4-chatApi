const Router = require('express');
const { createConversation, createGroupConversation, getAllConversations } = require('./conversation.controllers');

const router = Router()
//crear conversaciones
router.post('/', createConversation)

router.post('/group', createGroupConversation )

router.get('/:id', getAllConversations)

//crear conversaciones grupales
//traer todas las conversaciones
//obtener una conversacion con todos los mensajes




module.exports = router