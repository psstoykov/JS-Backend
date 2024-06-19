const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util.js');
const { createVolcano, getVolcanoById, getAllVolcanos, updateVolcano, deleteVolcano } = require('../services/volcano.js')

//TODO create the services for the volcano


const volcanoRouter = Router();

volcanoRouter.get('/create', isUser(), (req, res) => {
    res.render('create')
})

volcanoRouter.post('/create',
    isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The name should be minimum 2 symbols'),

)

module.exports = { volcanoRouter }