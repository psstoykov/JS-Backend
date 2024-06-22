const { Stone } = require('../models/stones');

async function getAllStones() {
    const stones = await Stone.find().lean();

    return stones;
};

async function getStoneById(id) {
    const stone = await Stone.findById(id).lean();
    return stone;
};

async function createStone(stoneData, authorId) {

    const stone = new Stone({
        name: stoneData.name,
        category: stoneData.category,
        color: stoneData.color,
        imageURL: stoneData.imageURL,
        location: stoneData.location,
        formula: stoneData.formula,
        description: stoneData.description,
        owner: authorId

    })

    await stone.save();
    return stone;
};

async function updateStone(stoneId, stoneData, userId) {
    //TODO write the function
};

async function deleteStone(stoneId, userId) {
    const stone = await Stone.findById(stoneId);
    if (!stone) {
        throw new Error(`Stone ${stoneId} not found`)
    }

    if (stone.author.toString() != userId) {
        throw new Error('Access denied')
    }

    await Stone.findByIdAndDelete(stoneId);
}

module.exports = {
    getAllStones,
    getStoneById,
    createStone,
    updateStone,
    deleteStone
}