
const crudRouter = require('../../routes/CRUD'),
      CommentModel = require('../../models/comments'),
      mongoose = require('mongoose');

const Model = mongoose.model('Comment');

const prepareResp = (success, message, data) => {
    return {
        success: !!success,
        msg: message,
        data: data,
    }
};

exports.get_all = (req, res) => {
        Model.find({post_id: req.params.post_id}, (err, _entity) => {
            if (err) {
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.status(200).json(prepareResp(1, 'Listed comments for the post', _entity.reverse()));
        });
    };

exports.create_comment = (req, res) => {
        const entity = new Model(req.body);
        entity.save(function (err, _entity) {
            if (err) {
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.status(200).json(prepareResp(1, "Created comment", _entity));
        });
    };

