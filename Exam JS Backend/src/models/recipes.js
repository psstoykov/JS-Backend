const { Schema, SchemaTypes: Types, model } = require('mongoose');

const RecipesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    recommendedList: {
        type: [Types.ObjectId],
        ref: 'user'
    },
    owner: {
        type: Types.ObjectId,
        ref: 'user'
    },
});

const Recipe = model('Recipe', RecipesSchema);

module.exports = { Recipe };