'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CommentsSchema = new Schema({
    post_id: {
        type: String,
        required: "Please enter post id"
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        required: "Enter Author name"
    },
    text: {
        type: String,
        required: "Enter Comment text"
    }
});

module.exports =  mongoose.model('Comment', CommentsSchema);