const { Schema, SchemaTypes: Types, model } = require('mongoose');

const stoneSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    formula: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    likedList: {
        type: [Types.ObjectId],
        ref: 'user'
    },
    owner: {
        type: Types.ObjectId,
        ref: 'user'
    }
});

const Stone = model('Stone', stoneSchema);

module.exports = { Stone };