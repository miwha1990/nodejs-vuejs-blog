'use strict';
const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts');
const users = require('../controllers/users');
const comments = require('../controllers/comments'),
    mongoose = require('mongoose'),
    PostModel = require('../models/posts'),
    multer = require('multer'),
    path = require('path'),
    appDir = path.dirname(require.main.filename);

const post_model = mongoose.model('Post');
const prepareResp = (success, message, data) => {
    return {
        success: !!success,
        msg: message,
        data: data,
    }
};
module.exports =  (app) => {

    app.route('/api/comments/:post_id')
        .get(comments.get_all);

    app.route('/api/comments/:post_id/count_all')
        .get(comments.count_all);

    app.route('/api/comments/:post_id/:page')
        .get(comments.get_10);

    app.route('/api/comments/')
        .post(comments.create_comment);


    app.route('/api/posts/new_post')
        .post((req, res) => {
            //uploads
            const UPLOAD_PATH = appDir+'/public/static/uploads/posts';
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, `${UPLOAD_PATH}/`)
                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + '-' + file.originalname);
                }
            });
            const upload = multer({ storage: storage }).single('imageUrl');
            upload(req, res, function (err) {
                if (err) {
                    res.status(400).json(prepareResp(0, 'Error!', err));
                    return
                }

                const copy = Object.assign({}, req.body);
                      if(req.file) {
                          copy.imageUrl = '/static/uploads/posts/'+req.file.filename;
                      }
                const entity = new post_model(copy);

                entity.save(function (err, _entity) {
                    if (err) {
                        return res.status(400).json(prepareResp(0, 'Error!', err));
                    }
                    res.status(200).json(prepareResp(1, "Created", _entity));
                });
            })
        });


    return router;
};