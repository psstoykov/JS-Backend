const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isGuest } = require('../middlewares/guards');
const { register, login } = require('../services/user');
const { createToken } = require('../services/token');
const { parseError } = require('../util.js');

const userRouter = Router();

userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

userRouter.post(
    '/register',
    isGuest(),
    body('username').trim().isLength({ min: 2 }).withMessage('Please enter a valid username'),
    body('email').trim().isEmail().isLength({ min: 10 }).withMessage('Please enter a valid email'),
    body('password').trim().isAlphanumeric().isLength({ min: 4 }).withMessage('Password must be at least 6 characters long and may contain only English letters and numbers'),
    body('repass').trim().custom((value, { req }) => value == req.body.password).withMessage('Passwords don\'t match'),
    async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const result = validationResult(req);

            if (result.errors.length) {
                throw result.errors;
            }

            const user = await register(username, email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        } catch (err) {
            res.render('register', { data: { username, email }, errors: parseError(err).errors });
            return;
        }
    }
);

userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

userRouter.post('/login', isGuest(),
    body('email').trim(),
    body('password').trim(),
    async (req, res) => {
        const { email, password } = req.body;

        try {
            if (!email || !password) {
                throw new Error('All fields are required');
            }

            const user = await login(email, password);
            const token = createToken(user);

            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        } catch (err) {
            res.render('login', { data: { email }, errors: parseError(err).errors });
            return;
        }
    });
//TODO something doesn't work with logout while at details
userRouter.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = { userRouter };