module.exports = function (charityModel, charitySessionModel) {
    var charityModel = charityModel || require('../model/Charity.js');
    var charitySessionModel = charitySessionModel || require('../model/CharitySession.js');

    return {
        register:function (req, res) {
            return res.render('pages/registerCharity', { error: 'false' });
        },

        loginView:function (req, res) {
            var error = { error:'false'};

            if (req.params[0]) {
                error.error = 'true';
            }

            if (req.cookies && req.cookies.session) {
                charitySessionModel.CharitySession.findById(req.cookies.session, function (err, doc) {
                    if (err) {
                        console.log(err);
                        return res.redirect('/error');
                    }

                    if (!doc) {
                        return res.render('pages/loginCharity', error);
                    }

                    return res.redirect('/charity/' + doc.charity + '/update');
                });

            }
            else {


                return res.render('pages/loginCharity', error);
            }
        },

        login:function (req, res) {
            charityModel.Charity.find({ 'email':req.body.username, 'password':req.body.password }, function (err, doc) {

                if (err) {
                    console.log(err);
                    return res.redirect('/error');
                }

                if (doc.length == 0) {
                    return res.redirect('/charity/login/error');
                }

                var session = new charitySessionModel.CharitySession({ 'charity':doc[0]._id });
                session.save(function (err, obj) {
                    res.cookie('session', obj._id);
                    return res.redirect('/charity/' + doc[0]._id + '/update');
                });


            });
        },

        newCharity:function (req, res) {
            var charity = new charityModel.Charity(req.body.charity);
            charity.save(function (err) {
                console.log(err);  // TODO: handle error better
                if (err) {
                    return res.render('pages/registerCharity', { error: 'true' } );
                }

                return res.redirect('/charity/' + charity._id);
            });
        },

        view:function (req, res) {
            charityModel.Charity.findById(req.params.id, function (err, doc) {
                if (!err) {
                    return res.render('pages/viewCharity', doc);
                }
                else {
                    console.log(err);
                    return res.redirect('/error'); // TODO: need to set up an error page
                }
            });
        },

        donate:function (req, res) {
            charityModel.Charity.findById(req.params.id, function (err, doc) {
                if (!err) {
                    return res.redirect(doc.directDonationLink);
                }
                else {
                    console.log(err);
                    return res.redirect('/error'); // TODO: need to set up an error page
                }
            });
        },

        information:function (req, res) {
            charityModel.Charity.findById(req.params.id, function (err, doc) {
                if (!err) {
                    return res.redirect(doc.website);
                }
                else {
                    console.log(err);
                    return res.redirect('/error'); // TODO: need to set up an error page
                }
            });
        },

        update:function (req, res) {
            // TODO: security (validate session cookie)
            charityModel.Charity.findById(req.params.id, function (err, doc) {
                if (!err) {
                    doc.name = req.body.charity.name;
                    doc.website = req.body.charity.website;
                    doc.directDonationLink = req.body.charity.directDonationLink;
                    doc.donationInstructions = req.body.charity.donationInstructions;
                    doc.email = req.body.charity.email;
                    if (!req.body.charity.password) {
                        doc.confirmPassword = doc.password;
                    }

                    doc.save(function (error) {
                        if (!error)
                            return res.redirect('/charity/' + req.params.id);
                        else {
                            console.log(error);
                            return res.render('pages/updateCharity', { charity: doc, error: 'true' } );
                        }
                    })

                } else {
                    console.log(err);
                    return res.redirect('/error'); // TODO: need to set up an error page
                }
            });

        },

        updateView:function (req, res) {
            var error = { error:'false'};

            if (req.params[0]) {
                error.error = 'true';
            }

            charityModel.Charity.findById(req.params.id, function (err, doc) {
                if (!err) {
                    return res.render('pages/updateCharity', { charity: doc, error: 'false' });
                }
                else {
                    console.log('Update View ' + err);
                    return res.redirect('/error'); // TODO: need to set up an error page
                }
            });
        }

    };
};