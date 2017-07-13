
const   mongoose = require('mongoose'),
        Schema   = mongoose.Schema,
        bcrypt = require('bcrypt-nodejs'),
        salt = bcrypt.genSaltSync(10),
        uniqueValidator = require('mongoose-unique-validator');

// set up a mongoose model
const UserSchema = new Schema({
    firstName: {
        type: String,
        // required: true,
    },
    lastName: {
        type: String,
    },
    email: {
      type: String,
      // required: true,
      unique: true
    },
    password: {
        type: String,
        // required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['Client', 'Manager', 'Admin'],
        default: 'Client'
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
});

UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, salt, null, function(err, hash) {
        if(err) throw err;
        user.password = hash;
        next();
    });
});

UserSchema.plugin(uniqueValidator);
module.exports = UserSchema;