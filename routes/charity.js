charityModel = require('../model/Charity.js');


exports.register = function (req, res) {
    return res.render('pages/register');
};

exports.newCharity = function (req, res) {
    var charity = new charityModel.Charity(req.body.charity);
    charity.save(function (err){
        console.log(err);
    });
    return res.redirect('/charity/' + charity._id);
};

exports.view = function (req, res) {
    charityModel.Charity.findById(req.params.id, function(err, doc) {
        if (!err)
        {
            console.log(doc);
            return res.render('pages/viewCharity', doc);
        }
        else
            return res.render('pages/viewCharity', { 'name': "Crash & Burn" });
    });
};