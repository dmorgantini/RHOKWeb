var charityModel = require('../model/Charity.js');


exports.register = function (req, res) {
    return res.render('pages/registerCharity');
};

exports.loginView = function(req, res) {
    return res.render('pages/loginCharity', {'error' : false}); // There may be a better way so that I don't need to pass in false
};

exports.login = function(req, res) {
    charityModel.Charity.find({ 'username': req.body.username, 'password': req.body.password }, function(err, doc){

        if (err)
            return res.render('error');

        if (doc.length == 0){
            return res.render('pages/loginCharity', {'error': true});
        }

        return res.render('pages/viewCharity', doc);

    });
};

exports.newCharity = function (req, res) {
    var charity = new charityModel.Charity(req.body.charity);
    charity.save(function (err) {
        console.log(err);  // TODO: handle error better
    });
    return res.redirect('/charity/' + charity._id);
};

exports.view = function (req, res) {
    charityModel.Charity.findById(req.params.id, function (err, doc) {
        if (!err) {
            return res.render('pages/viewCharity', doc);
        }
        else {
            console.log(err);
            return res.render('error'); // TODO: need to set up an error page
        }
    });
};

exports.donate = function (req, res) {
    charityModel.Charity.findById(req.params.id, function (err, doc) {
        if (!err) {
            return res.redirect(doc.directDonationLink);
        }
        else {
            console.log(err);
            return res.render('error'); // TODO: need to set up an error page
        }
    });
};

exports.information = function (req, res) {
    charityModel.Charity.findById(req.params.id, function (err, doc) {
        if (!err) {
            return res.redirect(doc.website);
        }
        else {
            console.log(err);
            return res.render('error'); // TODO: need to set up an error page
        }
    });
};