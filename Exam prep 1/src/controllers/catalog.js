const { isUser } = require('../middlewares/guards');

const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { getAll, getById, search } = require('../services/stone');


const catalogRouter = Router();

catalogRouter.get('/dashboard', async (req, res) => {
    const stones = await getAll();
    res.render('dashboard', { stones })
});

catalogRouter.get('/details/:id', async (req, res) => {

    const id = req.params.id;
    const stone = await getById(id);

    if (!stone) {
        res.status(404).render('404');
        return;
    }
    stone.likes = stone.likedList.length;
    stone.hasUser = res.locals.hasUser;
    stone.isAuthor = req.user?._id == stone.owner.toString();
    stone.hasLiked = Boolean(stone.likedList.find(v => v.toString() == req.user?._id));

    res.render('details', { stone })
});

catalogRouter.get('/search', async (req, res) => {

    const { name } = req.query;

    const stones = await search(name);
    console.log(stones)
    res.render('search', { data: { name }, stones })
})


module.exports = { catalogRouter };
