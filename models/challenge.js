'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImpactSchema = Schema({
    water_liters: Number,
    energy_kwh: Number
}, { _id: false });

var ChallengeSchema = Schema({
    title: String,
    description: String,
    category: String,
    difficulty: String,
    impact: ImpactSchema,
    icon: String,
    active: Boolean,
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
// challenges