'use strict';

const express = require('express');
const router = express.Router();
const constants = require('../middleware/constants');

let super_admin_apis = ['/v1/clients'];

let admin_apis = [];

router.use(super_admin_apis, function (req, res, next) {
    if (req.user.role != constants.ROLE.SUPER_ADMIN) {
        res.status('401').send('Access Denied');
        return;
    }
    next();
});

router.use(admin_apis, function (req, res, next) {
    if (req.user.role != constants.ROLE.SUPER_ADMIN && req.user.role != constants.ROLE.ADMIN) {
        res.status('401').send('Access Denied');
        return;
    }
    next();
});

module.exports = router;