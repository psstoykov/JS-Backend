const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util.js');
const { createRecipe } = require('../services/recipe.js');

const recipeRouter = Router();

recipeRouter.get('/create', isUser(), (req, res) => {
    res.render('create')
});

recipeRouter.post('/create',
    isUser(),
    body('title').trim().isLength({ min: 2 }).withMessage('The name should be at least 2 symbols'),
    body('description').trim().isLength({ min: 10, max: 100 }).withMessage('description must be between 10 and 100 characters'),
    body('ingredients').trim().isLength({ min: 10, max: 200 }).withMessage('ingredients must be between 10 and 200 characters'),
    body('instructions').trim().isLength({ min: 10 }).withMessage('instructions must be at least 10 characters'),
    body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('invalid URL'),
    async (req, res) => {
        const authorId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await createRecipe(req.body, authorId);
            res.redirect('/catalog');
        } catch (err) {
            res.render('create', { recipe: req.body, errors: parseError(err).errors });
        }

    });

module.exports = { recipeRouter }


//TODO create
//TODO edit
//TODO delete