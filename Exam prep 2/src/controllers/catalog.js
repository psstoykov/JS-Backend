const { isUser } = require('../middlewares/guards');
const { getAllVolcanos, getVolcanoById, updateVolcano, deleteVolcano, getByAuthorId } = require('../services/volcano');
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
    volcano.hasVoted = Boolean(volcano.voteList.find(v => v.toString() == req.user?._id));

    res.render('details', { volcano });
});


module.exports = { CatalogRouter }
