const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util.js');

const stoneRouter = Router();

//TODO create stone
stoneRouter.get('/create', isUser(), (req, res) => {
    res.render('create')
});

stoneRouter.post('/create',
    isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The name should be at least 2 symbols'),
    body('location').trim().isLength({ min: 3 }).withMessage('The location should be at least 3 symbols'),
    body('elevation').trim().isInt({ min: 0 }).withMessage('elevation should be at least 0'),
    body('lastEruption').trim().isInt({ min: 0, max: 2024 }).withMessage('choose betwee 0 and 2024'),
    body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('invalid URL'),
    body('typeVolcano').trim(),
    body('description').trim().isLength({ min: 10 }).withMessage('The description should be at least 10 symbols'),
    async (req, res) => {
        const authorId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await createVolcano(req.body, authorId);
            res.redirect('/');
        } catch (err) {
            res.render('create', { volcano: req.body, errors: parseError(err).errors });
        }

    });

//TODO edit Stone

//TODO delete Stone

//TODO


module.exports = { stoneRouter }