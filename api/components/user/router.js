/**
 * Created by dev6 on 16.06.16.
 */
const express = require('express');
const path = require('path');
const appDir = path.dirname(require.main.filename);
const multer = require('multer');
const prepareResp = (success, message, data) => {
    return {
        success: !!success,
        msg: message,
        data: data,
    }
};
module.exports = function (app, Model) {
    const router = express.Router();

    router.post('/add', (req, res) => {
            //uploads
            const UPLOAD_PATH = appDir+'/uploads/users';
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, `${UPLOAD_PATH}/`)
                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + '-' + file.originalname);
                }
            });
            const upload = multer({ storage: storage }).single('file');
            upload(req, res, function (err) {
                if (err) {
                    res.status(400).json(prepareResp(0, 'Error!', err));
                    return
                }

                const copy = Object.assign({}, req.body);
                if(req.file) {
                    copy.avatar = '/users/'+req.file.filename;
                }
                const entity = new Model(copy);

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