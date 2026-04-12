'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImpactSchema = Schema({
    water_liters: Number,
    energy_kwh: Number
}, { _id: false });

var ChallengeSnapshotSchema = Schema({
    title: String,
    category: String,
    icon: String
}, { _id: false });

var HistorySchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    challenge_id: {
        type: Schema.Types.ObjectId,
        ref: 'Challenge'
    },
    completed_at: Date,
    impact_registered: ImpactSchema,
    challenge_snapshot: ChallengeSnapshotSchema
});

module.exports = mongoose.model('History', HistorySchema);
// history