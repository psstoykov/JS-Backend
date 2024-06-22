const mongoose = require('mongoose');

//TODO attach the correct models to the database

const connectionString = 'mongodb://localhost:27017/magma-haven';

async function configDatabase() {
    await mongoose.connect(connectionString);

    console.log('Database connected')
};

module.exports = { configDatabase };