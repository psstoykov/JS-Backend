const { Router } = require('express');
const { home, details } = require('../controllers/catalogue');
const { about } = require('../controllers/about');
const { createGet, createPost } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const { search } = require('../controllers/catalogue');

const router = Router();

router.get('/', home);
router.get('/details/:id', details);
router.get('/about', about);
router.get('/create', createGet)
router.post('/create', createPost);
router.get('/search', search);

router.get('*', notFound);


module.exports = { router };