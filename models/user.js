'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = Schema({
    ecological_score: Number,
    challenges_completed: Number,
    water_saved_liters: Number,
    energy_saved_kwh: Number
}, { _id: false });

var SettingsSchema = Schema({
    notifications_enabled: Boolean,
    location_permission: Boolean,
    privacy_mode: Boolean
}, { _id: false });

var UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password_hash: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    profile: ProfileSchema,
    settings: SettingsSchema,
    first_quiz_completed: Boolean
});
module.exports = mongoose.model('User', UserSchema);
// users