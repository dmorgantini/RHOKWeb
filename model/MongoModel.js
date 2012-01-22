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
    email:String,
    password:String,
    confirmPassword:String,
    charityState:{ type:String, "default":"pending"}
}, { strict: true } );

var CharitySessionSchema = new Schema({
    id:ObjectId,
    charity: String
}, { strict: true });

exports.CharitySchema = CharitySchema;
exports.CharitySessionSchema = CharitySessionSchema;
exports.Mongoose = Mongoose;
