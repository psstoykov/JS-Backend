const { isUser } = require('../middlewares/guards');

const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { getAll, getById } = require('../services/recipe');

const catalogRouter = Router();


catalogRouter.get('/catalog', async (req, res) => {
    const recipes = await getAll();

    res.render('catalog', { recipes });
});

catalogRouter.get('/catalog/:id', async (req, res) => {

    const id = req.params.id;
    const recipe = await getById(id);

    if (!recipe) {
        res.status(404).render('404');
        return;
    }

    //TODO create helper data for recommended count(likes)

    recipe.votes = recipe.recommendedList.length;
    recipe.hasUser = res.locals.hasUser;
    recipe.isAuthor = req.user?._id == recipe.owner.toString();
    recipe.hasRecommended = Boolean(recipe.recommendedList.find(v => v.toString() == req.user?._id));

    res.render('details', { recipe });
});


module.exports = { catalogRouter };
//TODO create local controller and export local controller
