/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */

var mongoModel = require('./MongoModel.js');

var UserSchema = mongoModel.UserSchema;
var Mongoose = mongoModel.Mongoose;

// I would expect any mongoModel behaviour to belong in here... but I could be confused

UserSchema.pre('save', function (next) {
    if (this.password !== this.confirmPassword){
        next(new Error("Passwords do not match"));
    } else {
        next();
    }
});

exports.User = Mongoose.model('User', UserSchema);