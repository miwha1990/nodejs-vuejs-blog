const   crudRouter = require('./../../routes/CRUD'),
        router = require('./router'),
        mongoose = require('mongoose'),
        schema = require('./user.shema');

module.exports = function (app) {
    const User = mongoose.model('User', schema);

    app.components.User = {
        models: {
            User: User
        }
    };
        
    app.use('/api/users', crudRouter(app, User));
    app.use('/users-alt', router(app, User));

    app.route('/api/add-new-user')
        .post((req, res) => {
            //uploads
            const UPLOAD_PATH = appDir+'/public/static/uploads/users';
            const storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, `${UPLOAD_PATH}/`)
                },
                filename: function (req, file, cb) {
                    cb(null, Date.now() + '-' + file.originalname);
                }
            });
            const upload = multer({ storage: storage }).single('avatar');
            upload(req, res, function (err) {
                if (err) {
                    res.status(400).json(prepareResp(0, 'Error!', err));
                    return
                }

                const copy = Object.assign({}, req.body);
                if(req.file) {
                    copy.imageUrl = '/static/uploads/users/'+req.file.filename;
                }
                const entity = new User(copy);

                entity.save(function (err, _entity) {
                    if (err) {
                        return res.status(400).json(prepareResp(0, 'Error!', err));
                    }
                    res.status(200).json(prepareResp(1, "Created", _entity));
                });
            })
        });
};