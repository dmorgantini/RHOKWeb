/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */
var mongoModel = require('./MongoModel.js');

var CharitySessionSchema = mongoModel.CharitySessionSchema;
var Mongoose = mongoModel.Mongoose;


exports.CharitySession = Mongoose.model('CharitySession', CharitySessionSchema);