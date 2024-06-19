const { Schema, SchemaTypes: Types, model } = require('mongoose');

const volcanoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    lastEruption: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    typeVolcano: {
        type: String,
        enum: [Supervolcanoes, Submarine, Subglacial, Mud, Stratovolcanoes, Shield],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    voteList: {
        type: [Types.ObjectId],
        ref: 'user',
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'user'
    },
})