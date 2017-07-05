
const crudRouter = require('../../routes/CRUD'),
      CommentModel = require('../../models/comments'),
      mongoose = require('mongoose');

const comment_model = mongoose.model('Comment');

const prepareResp = (success, message, data) => {
    return {
        success: !!success,
        msg: message,
        data: data,
    }
};

exports.get_all = (req, res) => {
    comment_model.count((err, _entity) => {
        if (err) {
            return res.status(400).json(prepareResp(0, 'Error!', err));
        }
        res.status(200).json(prepareResp(1, 'Total number', _entity));
    })
};

exports.count_all = (req, res) => {
    comment_model.find({post_id: req.params.post_id}, (err, _entity) => {
        if (err) {
            return res.status(400).json(prepareResp(0, 'Error!', err));
        }
        res.status(200).json(prepareResp(1, 'Listed comments for the post', _entity.reverse()));
    });
};

exports.get_10 = (req, res) => {
    comment_model.find({post_id: req.params.post_id}, (err, _entity) => {
        if (err) {
            return res.status(400).json(prepareResp(0, 'Error!', err));
        }
        const output = _entity.reverse().slice((req.params.page*5), ((req.params.page*5)+5));
        if(!output.length) {
            res.status(200).json(prepareResp(0, 'No more comments', []));
        } else {
            res.status(200).json(prepareResp(1, 'Listed 10 comments for the post', output));
        }

    });
};

exports.create_comment = (req, res) => {
        const entity = new comment_model(req.body);
        entity.save(function (err, _entity) {
            if (err) {
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.status(200).json(prepareResp(1, "Created comment", _entity));
        });
    };

