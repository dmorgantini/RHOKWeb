var charityModel = require('../model/Charity.js');
var charitySessionModel = require('../model/CharitySession.js');

exports.register = function (req, res) {
    return res.render('pages/registerCharity');
};

exports.loginView = function (req, res) {
    if (req.cookies && req.cookies.session !== null) {
        charitySessionModel.CharitySession.findById(req.cookies.session.charity, function (err, doc) {
            if (err) {
                console.log(err);
                return res.redirect('/error');
            }

            if (doc.length == 0) {
                return res.render('pages/loginCharity');
            }

            return res.redirect('/charity/' + doc.charityId + '/update');
        });

    }
    else {
        return res.render('pages/loginCharity');
    }
};

exports.login = function (req, res) {
    charityModel.Charity.find({ 'emailAddress':req.body.username, 'password':req.body.password }, function (err, doc) {

        if (err) {
            console.log(err);
            return res.redirect('/error');
        }

        if (doc.length == 0) {
            return res.redirect('pages/loginCharity/error');
        }

        return res.render('pages/viewCharity', doc[0]);

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
            return res.redirect('/error'); // TODO: need to set up an error page
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
            return res.redirect('/error'); // TODO: need to set up an error page
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
            return res.redirect('/error'); // TODO: need to set up an error page
        }
    });
};