const { Recipe } = require('../models/recipes');


async function getAll() {
    const recipe = await Recipe.find().lean();
    return recipe;
};

async function getById(id) {
    const recipe = await Recipe.findById(id).lean();
    return recipe;
};

async function getByAuthorId(authorId) {
    return Recipe.find({ owner: authorId }).lean();
};

//TODO create recipe
//TODO update recipe
//TODO delete recipe
//TODO search recipe
//TODO show latest 3 recipes

module.exports = {
    getAll,
    getById,
    getByAuthorId
};