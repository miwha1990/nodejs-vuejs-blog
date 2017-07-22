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
    app.use('/api/new-users', router(app, User));


};