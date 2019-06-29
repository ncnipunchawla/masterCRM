'use strict';

const express = require('express');
const router = express.Router();

router.post('/v1/users/changepassword', (req, res) => {
    res.send('pong');
});

module.exports = router;