const { isUser } = require('../middlewares/guards');

const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { getAll } = require('../services/recipe');

const catalogRouter = Router();


catalogRouter.get('/catalog', async (req, res) => {
    const recipes = await getAll();

    res.render('catalog', { recipes });
});


module.exports = { catalogRouter };
//TODO create local controller and export local controller
