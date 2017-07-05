
const crudRouter = require('../../routes/CRUD'),
      PostModel = require('../../models/posts'),
      mongoose = require('mongoose');

module.exports =  (app) => {
    const Post_model = mongoose.model('Post');
    app.use('/api/posts', crudRouter(app, Post_model, true));

};