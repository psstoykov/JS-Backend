const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util.js');
const { createVolcano, getVolcanoById, getAllVolcanos, updateVolcano, deleteVolcano, addVote } = require('../services/volcano.js')



const volcanoRouter = Router();

volcanoRouter.get('/create', isUser(), (req, res) => {
    res.render('create')
})

volcanoRouter.post('/create',
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

volcanoRouter.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    const volcano = await getVolcanoById(id);

    if (!volcano) {
        res.status(404).render('404');
        return;
    }

    if (volcano.owner.toString() != req.user._id) {
        res.redirect('/login');
    }


    res.render('edit', { volcano })
});

volcanoRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The name should be at least 2 symbols'),
    body('location').trim().isLength({ min: 3 }).withMessage('The location should be at least 3 symbols'),
    body('elevation').trim().isInt({ min: 0 }).withMessage('elevation should be at least 0'),
    body('lastEruption').trim().isInt({ min: 0, max: 2024 }).withMessage('choose betwee 0 and 2024'),
    body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('invalid URL'),
    body('typeVolcano').trim(),
    body('description').trim().isLength({ min: 10 }).withMessage('The description should be at least 10 symbols'),
    async (req, res) => {
        const volcanoId = req.params.id;
        const authorId = req.user._id;

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const result = await updateVolcano(volcanoId, req.body, authorId);
            res.redirect('/catalog/' + volcanoId)
        } catch (err) {
            res.render('edit', { volcano: req.body, errors: parseError(err).errors });
        }

    });

volcanoRouter.get('/vote/:id', isUser(), async (req, res) => {
    const volcanoId = req.params.id;
    const authorId = req.user._id;

    try {
        const result = await addVote(volcanoId, authorId);
        res.redirect('/catalog/' + volcanoId)
    } catch (err) {

        res.render('details', { errors: parseError(err).errors });
    }

});
volcanoRouter.get('/delete/:id', isUser(), async (req, res) => {

    const volcanoId = req.params.id;
    const authorId = req.user._id;

    try {
        await deleteVolcano(volcanoId, authorId);
    } catch (err) {
        if (err.message == 'Access denied') {
            res.redirect('/login');
            return;
        }
    }
    res.redirect('/catalog');
});

//TODO create the services for the volcano



module.exports = { volcanoRouter }