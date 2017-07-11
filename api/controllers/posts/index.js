
const crudRouter = require('../../routes/CRUD'),
      PostModel = require('../../models/posts'),
      mongoose = require('mongoose');

const Post_model = mongoose.model('Post');

module.exports =  (app) => {
    app.use('/api/posts', crudRouter(app, Post_model, true));
};