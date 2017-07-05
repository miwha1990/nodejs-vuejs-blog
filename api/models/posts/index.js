'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let date = new Date();
date = date.getDate() +' / '+date.getMonth() +' / ' + date.getFullYear();
const PostsSchema = new Schema({
    title: {
        type: String,
        Required: 'Enter the title of the post'
    },
    author: {
        type: String,
        Required: 'Enter your name'
    },
    content:{
        type: String,
        Required: 'Enter the title of the post'
    },
    date: {
        type: String,
        default: date
    },
    category: {
        type: String,
        default: 'Not categorized'
    },
    imageUrl: {
        type: String,
        default: 'http://lorempixel.com/300/300/'
    },
    status: {
        type: [{
            type: String,
            enum: ['published', 'reviewing', 'trash']
        }],
        default: ['reviewing']
    }
});

module.exports =  mongoose.model('Post', PostsSchema);