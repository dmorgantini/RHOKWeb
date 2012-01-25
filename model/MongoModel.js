/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */

var Mongoose = require('mongoose');

Mongoose.connect('mongodb://localhost/charityclick'); // TODO: Configuration me thinks

var Schema = Mongoose.Schema, ObjectId = Schema.ObjectId;

var CharitySchema = new Schema({
    id:ObjectId,
    name:String,
    website:String,
    directDonationLink:String,
    donationInstructions:String,
    charityState:{ type:String, "default":"pending"},
    userId:String
}, { strict:true });

var SessionSchema = new Schema({
    id:ObjectId,
    userId:String
}, { strict:true });

var UserSchema = new Schema({
    id:ObjectId,
    firstName: String,
    email:String,
    password:String,
    confirmPassword:String
});

exports.CharitySchema = CharitySchema;
exports.SessionSchema = SessionSchema;
exports.UserSchema = UserSchema;
exports.Mongoose = Mongoose;
