const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost:27017/HomeCookingRecipes ';

async function configDatabase() {
    await mongoose.connect(connectionString);

    console.log('Database connected')
};

module.exports = { configDatabase };