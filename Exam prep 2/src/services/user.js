const bcrypt = require('bcrypt');
const { User } = require('../models/User');

async function register(username, email, password) {

    const existing = await User.findOne({ email });

    if (existing) {
        const err = new Error('Email is already used');
        err.errors = { email: 'Email is already used' };
        throw err;
    }

    const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10)
    });

    await user.save();

    return user;
}

async function login(email, password) {

    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Incorrect email or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error('Incorrect email or password');
    }

    return user;
}

module.exports = {
    register,
    login
};