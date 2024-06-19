const { getAllVolcanos, getVolcanoById } = require('../services/volcano');
const { Router } = require('express')

const CatalogRouter = Router()

CatalogRouter.get('/catalog', async (req, res) => {
    const volcanos = await getAllVolcanos();

    res.render('catalog', { volcanos })
});
CatalogRouter.get('/details/:id', async (req, res) => {
    const id = req.params.id;

    const volcano = await getVolcanoById(id);

    if (!volcano) {
        res.render('404');
        return;
    }
    volcano.isAuthor = req.user && req.user._id == volcano.owner.toString();

    res.render('details', { volcano });
});


module.exports = { CatalogRouter }
