const { notFound } = require("../controllers/404");
const { createGet, createPost } = require("../controllers/create");
const { home } = require("../controllers/home");
const { Router } = require('express');
const { loginGet, loginPost } = require("../controllers/login");

const router = Router();
function configRoutes(app) {
    app.use(router)
    app.get('/', home);
    app.get('/create', createGet);
    app.post('/create', createPost);
    app.get('/login', loginGet);
    app.post('/login', loginPost);

    app.get('*', notFound);
};

module.exports = { configRoutes }