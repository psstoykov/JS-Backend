const { notFound } = require("../controllers/404");
const { createGet, createPost } = require("../controllers/create");
const { home } = require("../controllers/home");
const { Router } = require('express');
const { dashboard } = require("../controllers/dashboard");
const { userRouter } = require('../controllers/user');

const router = Router();
function configRoutes(app) {
    app.use(router)

    app.get('/', home);
    app.get('/create', createGet);
    app.post('/create', createPost);
    app.get('/dashboard', dashboard);

    app.use(userRouter);

    app.get('*', notFound);
};

module.exports = { configRoutes }