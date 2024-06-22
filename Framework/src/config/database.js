const mongoose = require('mongoose');


// TODO name the mongoDB collection
// const connectionString = 'mongodb://localhost:27017/magma-haven'; 

async function configDatabase() {
    await mongoose.connect(connectionString);

    console.log('Database connected')
};

module.exports = { configDatabase };