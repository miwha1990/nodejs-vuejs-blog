'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PostsSchema = new Schema({
    title: {
        type: String,
        Required: 'Enter the title of the post'
    },
    content:{
        type: String,
        Required: 'Enter the title of the post'
    },
    Created_date: {
        type: Date,
        default: Date.now
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