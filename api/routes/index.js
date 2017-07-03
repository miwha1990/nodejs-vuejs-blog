'use strict';
const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const users = require('../controllers/users');
const comments = require('../controllers/comments');
module.exports =  (app) => {

    app.route('/api/comments/:post_id')
        .get(comments.get_all);

    app.route('/api/comments/')
        .post(comments.create_comment);

    return router;
};