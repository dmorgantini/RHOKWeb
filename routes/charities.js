/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */
var charityModel = require('../model/Charity.js');


exports.jsonList = function (req, res) {
    charityModel.Charity.find({'charityState': "pending"}, function(err, docs){ // TODO: change this to "approved" when approval functionality completed
        if (!err)
        {
            var json = [];
            
            docs.forEach(function(elem){
                json.push({ "id": elem._id, "name": elem.name, "donationInstructions": elem.donationInstructions})
            });

            return res.send(json);

        }
        else
        {
            console.log(err);
            return res.send({'error': 'There was an error'}, 400);
        }
    });

};