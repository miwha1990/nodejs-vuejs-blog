const express = require('express');

module.exports = (app, Model, pagination) => {
    const router = express.Router();

    function prepareResp (success, message, data) {
        return {
            success: !!success,
            msg: message,
            data: data,
        }
    }
    router.get('/count_all', (req, res, next) => {
        const category = req.query.category;
        if(category) {
            Model
                .find({ category: category })
                .count((err, _entity) => {
                    if (err) {
                        return res.status(400).json(prepareResp(0, 'Error!', err));
                    }
                    res.status(200).json(prepareResp(1, 'Total number by category', _entity));
                })
        } else {
            Model
                .count((err, _entity) => {
                    if (err) {
                        return res.status(400).json(prepareResp(0, 'Error!', err));
                    }
                    res.status(200).json(prepareResp(1, 'Total number', _entity));
                })
        }

    });
    router.get('/', (req, res, next) => {
        if(pagination){
            const pageOptions = {
                page: req.query.page || 0,
                limit: req.query.limit || 10,
                category: req.query.category || { $gt: [] }
            };
            Model
                .find({ category: pageOptions.category })
                .skip(pageOptions.page*pageOptions.limit)
                .limit(pageOptions.limit)
                .exec(function (err, data) {
                    if(err) {
                        return res.status(500).json(prepareResp(0, 'Error!', err));
                    }
                    res.status(200).json(prepareResp(1, 'Listed '+ pageOptions.limit, data));
                })
        } else {
            Model.find((err, _entity) => {
                if (err) {
                    return res.status(400).json(prepareResp(0, 'Error!', err));
                }
                res.status(200).json(prepareResp(1, 'Listed all', _entity));
            });
        }

    });

    router.get('/:id', (req, res, next) => {
        Model.findById(req.params.id, (err, _entity) => {
            if (err) {
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.status(200).json(prepareResp(1, 'Listed one', _entity));
        });
    });

    router.post('/', (req, res, next) => {
        const entity = new Model(req.body);
        entity.save(function (err, _entity) {
            if (err) {
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.status(200).json(prepareResp(1, "Created", _entity));
        });
    });

    router.delete('/:id', (req, res, next) => {
        Model.findById(req.params.id).remove( (err, _entity) => {
            if (err){
                return res.status(400).json(prepareResp(0, 'Error!', err));
            }
            res.json(prepareResp(1, "Deleted", _entity));
        });
    });

    router.put('/:id', function(req ,res, next) {
        Model.findByIdAndUpdate(req.params.id,  req.body, {new:true,runValidators:true}, function(err, _entity){
            if (err){
                return res.status(400).json(prepareResp(0, 'Error!!!', err));
            }
            res.status(200).json(prepareResp(1, "Updated", _entity));
        })
    });

    return router;
};