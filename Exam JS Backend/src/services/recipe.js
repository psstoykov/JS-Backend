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
        owner: authorId
    });

    await recipe.save();
    return recipe;
};

async function addVote(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        throw new Error(`Volcano ${recipeId} not found`);
    };

    if (recipe.owner.toString() == userId) {
        throw new Error('Can\'t vote for your own publication');
    };

    if (recipe.recommendedList.find(v => v.toString() == userId)) {
        throw new Error('You have already recommended this recipe');
    }
    recipe.recommendedList.push(userId);
    await recipe.save();

    return recipe;
};


async function deleteRecipe(recipeId, userId) {
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
        throw new Error(`Volcano ${recipeId} not found`);
    }

    if (recipe.owner.toString() != userId) {
        throw new Error('Access denied');
    }

    await Recipe.findByIdAndDelete(recipeId);
};
//TODO update recipe
//TODO delete recipe
//TODO search recipe
//TODO show latest 3 recipes

module.exports = {
    getAll,
    getById,
    getByAuthorId,
    createRecipe,
    addVote,
    deleteRecipe
};