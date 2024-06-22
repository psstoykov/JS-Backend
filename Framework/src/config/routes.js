const { notFound } = require("../controllers/404");

const { home } = require("../controllers/home");
const { Router } = require('express');
const { dashboard, details } = require("../controllers/dashboard");
const { userRouter } = require('../controllers/user');
const { stoneRouter } = require('../controllers/stone')

const router = Router();
function configRoutes(app) {
    app.use(router)

    app.get('/', home);
    app.get('/dashboard', dashboard);
    app.get('/details/:id', details);
    app.use(userRouter);
    app.use(stoneRouter);
    app.get('*', notFound);
};

module.exports = { configRoutes }