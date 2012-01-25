/**
 * All code (c) 2011 CharityClick.net all rights reserved
 */
var charityModel = require('../model/Charity.js');

exports.jsonList = function (req, res) {
    // TODO: Caching
    charityModel.Charity.find({'charityState':"accepted"}, function (err, docs) {
        if (!err) {
            var json = [];
            docs.forEach(function (elem) {
                var matches = (/^[^#]*?:\/\/(.*?)(\/.*)?$/).exec(elem.website);
                var baseURI;
                if (!matches){
                    baseURI = "";
                } else {
                    baseURI = matches[1];
                }

                json.push({
                    "id":elem._id,
                    "name":elem.name,
                    "donationInstructions":elem.donationInstructions,
                    "baseURI": baseURI
                });
            });
            return res.send(json);
        }
        else {
            console.log(err);
            return res.send({'error':'There was an error'}, 400);
        }
    });

};

exports.manageList = function(req, res){
    if (!req.currentSession)
        return res.send(401);

    charityModel.Charity.find({ }, function (err, docs) {
        if (!err) {
            var obj = {};
            obj.aaData = [];
            obj.sEcho = 1;
            obj.iTotalRecords = docs.length;
            obj.iTotalDisplayRecords = docs.length;

            docs.forEach(function (elem) {
                obj.aaData.push({
                    "DT_RowId":elem._id,
                    "name": elem.name,
                    "donationInstructions": elem.donationInstructions,
                    "website": elem.website,
                    "charityState": elem.charityState
                });
            });
            return res.send(obj);
        }
        else {
            console.log(err);
            return res.send({'error':'There was an error'}, 400);
        }
    });
};

exports.manageView = function(req, res) {
    if (!req.currentSession)
        return res.redirect('/login');
    return res.render("pages/manageList");
};

exports.update = function(req, res) {
    if (!req.currentSession)
        return res.send(401);

    charityModel.Charity.findById(req.body.id, function (err, doc) {
        if (!err) {
            doc[req.body.cssClass] = req.body.value;
            doc.save();
            res.send(req.body.value);
        } else {
            console.log(err);
            return res.redirect('/error'); // TODO: need to set up an error page
        }
    });
};