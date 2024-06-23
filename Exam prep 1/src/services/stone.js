const { Stone } = require('../models/stones')

async function createStone(data, ownerId) {
    const stone = new Stone({
        name: data.name,
        category: data.category,
        color: data.color,
        image: data.image,
        location: data.location,
        formula: data.formula,
        description: data.description,
        owner: ownerId
    });
    await stone.save();
    return stone;
};

async function getAll() {
    const stones = await Stone.find().lean();
    return stones;
};

async function getById(id) {
    const stone = await Stone.findById(id).lean() //TODO maybe it needs .populate()?
    return stone;
};

async function deleteStone(stoneId, authorId) {
    const stone = await Stone.findById(stoneId);

    if (!stone) {
        throw new Error(`Stone ${stoneId} not found`);
    }

    if (stone.owner.toString() != authorId) {
        throw new Error('Access denied');
    }

    await Stone.findByIdAndDelete(stoneId);
};


async function editStone(data, stoneId, userId) {
    const stone = await Stone.findById(stoneId);

    if (!stone) {
        throw new Error(`Stone ${stoneId} not found`);
    }

    if (stone.owner.toString() != userId) {
        throw new Error('Access denied');
    }

    stone.name = data.name;
    stone.category = data.category;
    stone.color = data.color;
    stone.image = data.image;
    stone.location = data.location;
    stone.formula = data.formula;
    stone.description = data.description;

    await stone.save();

    return stone;

};

async function likeStone(stoneId, userId) {

    const stone = await Stone.findById(stoneId);

    if (!stone) {
        throw new Error(`Stone ${volcanoId} not found`);
    };

    if (stone.owner.toString() == userId) {
        throw new Error('Can\'t vote for your own publication');
    };

    if (stone.likedList.find(v => v.toString() == userId)) {
        throw new Error('You have already liked this volcano');
    };

    stone.likedList.push(userId);
    await stone.save();
};

async function getRecent() {
    return Stone.find().sort({ $natural: -1 }).limit(3).lean();
}

async function search(name) {

    const query = {};

    if (name) {
        query.name = new RegExp(name, "i");
    }
    return Stone.find(query).lean()
}

module.exports = {
    createStone,
    getAll,
    getById,
    deleteStone,
    editStone,
    likeStone,
    getRecent,
    search
};