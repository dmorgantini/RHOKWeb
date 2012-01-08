/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */

var mongoModel = require('./MongoModel.js');

var CharitySchema = mongoModel.CharitySchema;
var Mongoose = mongoModel.Mongoose;

// I would expect any mongoModel behaviour to belong in here... but I could be confused

CharitySchema.pre('save', function (next) {
    if (this.password !== this.confirmPassword){
        next(new Error("Passwords do not match"));
    } else {
        next();
    }
});


exports.Charity = Mongoose.model('Charity', CharitySchema);