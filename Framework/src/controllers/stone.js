const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const { isUser } = require('../middlewares/guards');
const { parseError } = require('../util');
const { createStone, getStoneById, updateStone, deleteStone } = require('../services/stones')

const stoneRouter = Router();

stoneRouter.get('/create', isUser(), (req, res) => {
    res.render('create')
});

stoneRouter.post('/create',
    isUser(),
    body('imageURL').trim().isURL({ require_tld: false }).withMessage('Please enter valid URL for movie poster'),
    //TODO add validation for the other fields
    async (req, res) => {
        const authorId = req.user._id

        try {
            const validation = validationResult(req);

            if (validation.errors.length) {
                throw validation.errors
            }

            const result = await createStone(req.body, authorId);
            res.redirect('/details/' + result._id);
        } catch (err) {
            res.render('create', { stone: req.body, errors: parseError(err).errors });
        }
    });

// stoneRouter.get('/delete/:id', isUser(), async (req, res) => {
//     const stoneId = req.params.id;

//     let stone;

//     try {
//         stone = await getStoneById(stoneId);

//         if (!stone) {
//             throw new Error('Stone not found');
//         }
//     } catch (err) {
//         res.render('404');
//         return;
//     }

//     const isAuthor = req.user._id == stone.owner.toString();

//     if (!isAuthor) {
//         res.redirect('/login');
//         return
//     }
//     res.render('delete', { stone });
// });

stoneRouter.post('/delete/:id', isUser(), async (req, res) => {
    const stoneId = req.params.id;
    const authorId = req.user._id;
    try {
        await deleteStone(stoneId, authorId);
    } catch (err) {
        if (err.message == 'Access denied') {
            res.redirect('/login');
        } else {
            res.render('404')
        }
        return;
    }
    res.redirect('/dashboard');
})

module.exports = { stoneRouter };
