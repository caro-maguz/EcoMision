'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
}, { _id: false });

var TreeSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    username: String,
    tree_type: String,
    planted_at: Date,
    location: LocationSchema,
    visible_on_map: Boolean
});

// índice geoespacial (MUY IMPORTANTE para mapas)
TreeSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Tree', TreeSchema);
// trees