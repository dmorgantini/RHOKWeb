/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */

var mongoModel = require('./MongoModel.js');

var CharitySchema = mongoModel.CharitySchema;
var Mongoose = mongoModel.Mongoose;

exports.Charity = Mongoose.model('Charity', CharitySchema);