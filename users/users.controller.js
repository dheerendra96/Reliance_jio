const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/registration', registration);
router.get('/storeData', storeDetails)

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function registration(req, res, next) {
    userService.registration(req.body)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function storeDetails(req, res, next) {
    userService.getStoreDetails()
        .then(users => res.json(users))
        .catch(err => next(err));
}