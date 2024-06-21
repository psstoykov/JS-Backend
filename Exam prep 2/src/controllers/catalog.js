const { isUser } = require('../middlewares/guards');
const { getAllVolcanos, getVolcanoById, updateVolcano } = require('../services/volcano');
const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const CatalogRouter = Router()

CatalogRouter.get('/catalog', async (req, res) => {
    const volcanos = await getAllVolcanos();

    res.render('catalog', { volcanos })
});
CatalogRouter.get('/catalog/:id', async (req, res) => {

    const id = req.params.id;
    const volcano = await getVolcanoById(id);

    if (!volcano) {
        res.status(404).render('404');
        return;
    }

    volcano.votes = volcano.voteList.length;
    volcano.hasUser = res.locals.hasUser;
    volcano.isAuthor = req.user?._id == volcano.owner.toString();
    volcano.hasVoted = volcano.voteList.find(v => v.toString() == req.user?._id);

    res.render('details', { volcano });
});

CatalogRouter.get('/edit/:id', isUser(), async (req, res) => {
    const id = req.params.id;

    let volcano;

    try {
        volcano = await getVolcanoById(id);

        if (!volcano) {
            throw new Error('Volcano not found')
        }
    } catch (err) {
        res.render('404');
        return;
    }

    const isAuthor = req.user._id = volcano.owner.toString();

    if (!isAuthor) {
        res.redirect('/login');
        return;
    }
    res.render('edit', { volcano })
})

CatalogRouter.post('edit/:id', isUser(),
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
        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors;
            }

            const volcano = await updateVolcano(volcanoId, req.body, authorId);
            res.render('details')
        } catch (err) {
            res.render('create', { volcano: req.body, errors: parseError(err).errors });
        }
    }
)
//TODO add edit, delete, vote functionality

module.exports = { CatalogRouter }
