'use strict';

const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
 
const ClientsSchema = new Schema({
    name: {type: String},
    location: {type: String},
    city: {type: String},
    state: {type: String},
    status: {type: Number, default: 1}, // 1: Trial, 2: Mini, 3: Pro, 4: End Trial, 5: End Subscription, 6: Disabled
    subsciption: {
        billing_cycle: {type: Number, default: 2}, // In Months
        start_date: {type: Date},
        end_date: {type: Date},
        price: {type: Number, default: 0}
    }
}, { collection: 'clients' });

ClientsSchema.plugin(timestamps);

module.exports = exports = mongoose.model('Client', ClientsSchema)