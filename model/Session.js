/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */
var mongoModel = require('./MongoModel.js');

var SessionSchema = mongoModel.SessionSchema;
var Mongoose = mongoModel.Mongoose;


exports.Session = Mongoose.model('Session', SessionSchema);

