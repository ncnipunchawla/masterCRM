'use strict';

const express = require('express');
const router = express.Router();
const users = require('../services/users');

router.post('/v1/authenticate', function (req, res) {
    if(!(req.body.email && req.body.password)) return res.status(400).send('Please send Email and Password');
    users.handleAuthentication(req.body.email, req.body.password, req.ip).then(function(result){
        res.status(result.status).json(result.data);
    });
});

module.exports = router;
