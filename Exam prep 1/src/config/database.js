const mongoose = require('mongoose')

//TODO - require the models for the data base
const connectionString = 'mongodb://localhost:27017/earth-treasure';

async function configDatabase() {
    await mongoose.connect(connectionString);

    console.log('Database connected');
}

module.exports = { configDatabase };