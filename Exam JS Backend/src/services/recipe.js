const { create } = require('express-handlebars');
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

async function createRecipe(data, authorId) {

    const recipe = new Recipe({
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
        description: data.description,
        image: data.image,
        owner: data.owner
    });

    await recipe.save();
    return recipe;
}
//TODO update recipe
//TODO delete recipe
//TODO search recipe
//TODO show latest 3 recipes

module.exports = {
    getAll,
    getById,
    getByAuthorId,
    createRecipe
};