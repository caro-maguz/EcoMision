'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswersSchema = Schema({
    agua: String,
    energia: String,
    plastico: String
}, { _id: false });

var QuizResultSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    completed_at: {
        type: Date,
        default: Date.now
    },
    answers: AnswersSchema,
    score: String
});

module.exports = mongoose.model('QuizResult', QuizResultSchema);
// quiz_results