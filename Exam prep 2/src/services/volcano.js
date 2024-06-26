const { Volcano } = require('../models/volcano');


async function getAllVolcanos() {
    const volcano = await Volcano.find().lean();
    return volcano;
}

async function getVolcanoById(id) {
    const volcano = await Volcano.findById(id).lean().populate();
    return volcano;
};

async function getByAuthorId(authorId) {
    return Volcano.find({ owner: authorId }).lean();
}

async function createVolcano(volcanoData, authorId) {
    const volcano = new Volcano({
        name: volcanoData.name,
        location: volcanoData.location,
        elevation: Number(volcanoData.elevation),
        lastEruption: Number(volcanoData.lastEruption),
        image: volcanoData.image,
        typeVolcano: volcanoData.typeVolcano,
        description: volcanoData.description,
        owner: authorId

    });

    await volcano.save();

    return volcano;
};

async function updateVolcano(volcanoId, volcanoData, userId) {
    const volcano = await Volcano.findById(volcanoId);

    if (!volcano) {
        throw new Error(`Volcano ${volcanoId} not found`);
    }

    if (volcano.owner.toString() != userId) {
        throw new Error('Access denied');
    }

    volcano.name = volcanoData.name;
    volcano.location = volcanoData.location;
    volcano.elevation = volcanoData.elevation;
    volcano.lastEruption = volcanoData.lastEruption;
    volcano.image = volcanoData.image;
    volcano.typeVolcano = volcanoData.typeVolcano;
    volcano.description = volcanoData.description;

    await volcano.save();

    return volcano;
};

async function search(name, typeVolcano) {

    const query = {};

    if (name) {

        query.name = new RegExp(name, "i");
    }
    if (typeVolcano && typeVolcano != '---') {
        query.typeVolcano = typeVolcano;
    }

    return Volcano.find(query).lean()
}

async function addVote(volcanoId, userId) {
    const volcano = await Volcano.findById(volcanoId);

    if (!volcano) {
        throw new Error(`Volcano ${volcanoId} not found`);
    };

    if (volcano.owner.toString() == userId) {
        throw new Error('Can\'t vote for your own publication');
    };

    if (volcano.voteList.find(v => v.toString() == userId)) {
        throw new Error('You have already liked this volcano');
    }
    volcano.voteList.push(userId);
    await volcano.save();

    return volcano;
}

async function deleteVolcano(volcanoId, userId) {
    const volcano = await Volcano.findById(volcanoId);

    if (!volcano) {
        throw new Error(`Volcano ${volcanoId} not found`);
    }

    if (volcano.owner.toString() != userId) {
        throw new Error('Access denied');
    }

    await Volcano.findByIdAndDelete(volcanoId);
}

module.exports = {
    getAllVolcanos,
    getVolcanoById,
    getByAuthorId,
    createVolcano,
    updateVolcano,
    addVote,
    deleteVolcano,
    search
}