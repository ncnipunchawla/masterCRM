'use strict';

const Client = require('../models/clients');
const express = require('express');
const router = express.Router();

router.post('/v1/clients', (req, res) => {
    if (!req.body.name) return res.status(400).send('Please send client name');
    let client_object = {};
    client_object.name = req.body.name;
    req.body.location ? client_object.location = req.body.location : '';
    req.body.city ? client_object.city = req.body.city : '';
    req.body.state ? client_object.state = req.body.state : '';
    req.body.status ? client_object.status = req.body.status : '';
    client_object.subscription = {};
    req.body.subscription && req.body.subscription.billing_cycle ? client_object.subscription.billing_cycle = req.body.subscription.billing_cycle : '';
    req.body.subscription && req.body.subscription.price ? client_object.subscription.price = req.body.subscription.price : '';
    req.body.subscription && req.body.subscription.start_date ? client_object.subscription.start_date = req.body.subscription.start_date : '';
    req.body.subscription && req.body.subscription.end_date ? client_object.subscription.end_date = req.body.subscription.end_date : '';
    const client = new Client(client_object);
    client.save().then(data => {
        res.status(200).send(data._id);
    }).catch(err => {
        res.status(400).send(err);
    })
});

router.get('/v1/clients', (req, res) => {
    Client.find().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    });
});

router.get('/v1/clients/:id', (req, res) => {
    Client.findOne({_id: req.params.id}).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(400).send(err);
    });
});

router.patch('/v1/clients/:id', (req, res) => {
    let client_object = {};
    req.body.name ? client_object.name = req.body.name : '';
    req.body.location ? client_object.location = req.body.location : '';
    req.body.city ? client_object.city = req.body.city : '';
    req.body.state ? client_object.state = req.body.state : '';
    req.body.status ? client_object.status = req.body.status : '';
    client_object.subscription = {};
    req.body.subscription && req.body.subscription.billing_cycle ? client_object.subscription.billing_cycle = req.body.subscription.billing_cycle : '';
    req.body.subscription && req.body.subscription.price ? client_object.subscription.price = req.body.subscription.price : '';
    req.body.subscription && req.body.subscription.start_date ? client_object.subscription.start_date = req.body.subscription.start_date : '';
    req.body.subscription && req.body.subscription.end_date ? client_object.subscription.end_date = req.body.subscription.end_date : '';
    Client.updateOne({"_id": req.params.id}, {$set: client_object}).then(data => {
        res.status(200).send(data._id);
    }).catch(err => {
        res.status(400).send(err);
    })
});

module.exports = router;