const { Schema, SchemaTypes: Types, model } = require('mongoose');

const StoneSchema = new Schema(
    {
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
        imageURL: {
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
            ref: 'User',
            default: []
        },
        owner: {
            type: Types.ObjectId,
            ref: 'User'
        }
    }
);

const Stone = model('Stone', StoneSchema);

module.exports = { Stone };