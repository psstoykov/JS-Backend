const { Router } = require('express');
const { home, details } = require('../controllers/catalogue');
const { about } = require('../controllers/about');
const { createGet, createPost } = require('../controllers/movie');
const { notFound } = require('../controllers/404');
const { search } = require('../controllers/catalogue');
const { createCastGet, createCastPost } = require('../controllers/cast');
const { attachGet, attachPost } = require('../controllers/attach');

const router = Router();

router.get('/', home);
router.get('/details/:id', details);
router.get('/about', about);
router.get('/create/movie', createGet)
router.post('/create/movie', createPost);
router.get('/create/cast', createCastGet);
router.post('/create/cast', createCastPost);
router.get('/attach/:id', attachGet);
router.post('/attach/:id', attachPost);
router.get('/search', search);

router.get('*', notFound);


module.exports = { router };