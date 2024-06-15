const mongoose = require('mongoose')
require('../models/user');
require('../models/stones')


const connectionString = 'mongodb://localhost:27017/earth-treasure';

async function configDatabase() {
    await mongoose.connect(connectionString);

    console.log('Database connected');
}

module.exports = { configDatabase };