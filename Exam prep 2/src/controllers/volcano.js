const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util.js');
const { createVolcano, getVolcanoById, getAllVolcanos, updateVolcano, deleteVolcano } = require('../services/volcano.js')



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
})

volcanoRouter.post('/edit/:id', isUser(),
    body('name').trim().isLength({ min: 2 }).withMessage('The name should be at least 2 symbols'),
    body('location').trim().isLength({ min: 3 }).withMessage('The location should be at least 3 symbols'),
    body('elevation').trim().isInt({ min: 0 }).withMessage('elevation should be at least 0'),
    body('lastEruption').trim().isInt({ min: 0, max: 2024 }).withMessage('choose betwee 0 and 2024'),
    body('image').trim().isURL({ require_tld: false, require_protocol: true }).withMessage('invalid URL'),
    body('typeVolcano').trim(),
    body('description').trim().isLength({ min: 10 }).withMessage('The description should be at least 10 symbols'),
    async (req, res) => {
        const authorId = req.user._id;
        const volcanoId = req.params.id;

        // const errors = {
        //     name: !req.body.name,
        //     location: !req.body.location,
        //     elevation: !req.body.elevation,
        //     lastEruption: !req.body.lastEruption,
        //     iamge: !req.body.image,
        //     typeVolcano: !req.body.typeVolcano,
        //     description: !req.body.description
        // };

        // if (Object.values(errors).includes(true)) {
        //     res.render('edit', { volcano: req.body, errors });
        //     return;
        // }

        try {
            await updateVolcano(volcanoId, req.body, authorId);
        } catch (err) {
            if (err.message == 'Access denied') {
                res.redirect('/login');
            } else {
                res.render('404');
            }
            return;
        }
        const volcano = await getVolcanoById(volcanoId);
        res.redirect('/catalog/' + volcanoId)
    });

volcanoRouter.post('/vote/:id', isUser(), async (req, res) => {

});
volcanoRouter.post('/delete/:id', isUser(), async (req, res) => {

    const volcanoId = req.params.id;
    const authorId = req.user._id;

    try {
        await deleteVolcano(volcanoId, authorId);
    } catch (err) {
        if (err.message == 'Access denied') {
            res.redirect('/login')
        } else {
            res.render('404');
        }
        return;
    }
    //TODO check the render here
    const volcanos = await getAllVolcanos();

    res.render('catalog', { volcanos })
});

//TODO create the services for the volcano



module.exports = { volcanoRouter }