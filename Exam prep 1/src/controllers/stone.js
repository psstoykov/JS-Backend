const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util.js');
const { createStone, deleteStone, getById, editStone, likeStone } = require('../services/stone.js');

const stoneRouter = Router();

stoneRouter.get('/create', isUser(), (req, res) => {
    res.render('create')
});

stoneRouter.post('/create',
    isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The name should be at least 2 symbols'),
    body('category').trim().isLength({ min: 3 }).withMessage('category should be at least 3 characters'),
    body('color').trim().isLength({ min: 2 }).withMessage('color should be at least 2 characters'),
    body('formula').trim().isLength({ min: 3, max: 30 }).withMessage('formula should be between 3 and 30 characters long'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('location should be between 5 and 15 characters long'),
    body('description').trim().isLength({ min: 10 }).withMessage('The description should be at least 10 symbols'),
    body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('invalid URL'),
    async (req, res) => {
        const authorId = req.user._id;
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await createStone(req.body, authorId);

            res.redirect('/dashboard');
        } catch (err) {
            res.render('create', { data: req.body, errors: parseError(err).errors });
        }

    });

stoneRouter.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    const stone = await getById(id);

    if (!stone) {
        res.status(404).render('404');
        return;
    }

    if (stone.owner.toString() != req.user._id) {
        res.redirect('/login');
    }


    res.render('edit', { stone });
});

stoneRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('name must be at least 2 characters long'),
    body('category').trim().isLength({ min: 3 }).withMessage('category must be at least 2 characters long'),
    body('color').trim().isLength({ min: 2 }).withMessage('color must be at least 2 characters long'),
    body('formula').trim().isLength({ min: 3, max: 30 }).withMessage('formula must be between 3 and 30 characters'),
    body('location').trim().isLength({ min: 5, max: 15 }).withMessage('location must be between 5 and 15 characters'),
    body('description').trim().isLength({ min: 10 }).withMessage('description must be at least 10 characters long'),
    body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('invalid URL'),
    async (req, res) => {

        const stoneId = req.params.id;
        const authorId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await editStone(req.body, stoneId, authorId);
            res.redirect('/details/' + stoneId)
        } catch (err) {
            res.render('edit', { stone: req.body, errors: parseError(err).errors });
        }

    });

stoneRouter.get('/delete/:id', isUser(), async (req, res) => {

    const stoneId = req.params.id;
    const authorId = req.user._id;

    try {
        await deleteStone(stoneId, authorId);
    } catch (err) {
        if (err.message == 'Access denied') {
            res.redirect('/login');
            return;
        }
    }

    res.redirect('/dashboard')
})

stoneRouter.get('/like/:id', isUser(), async (req, res) => {

    const stoneId = req.params.id;
    const authorId = req.user._id;

    try {
        const result = await likeStone(stoneId, authorId);
        res.redirect('/details/' + stoneId)
    } catch (err) {

        res.render('details', { errors: parseError(err).errors });
    }
});


module.exports = { stoneRouter }