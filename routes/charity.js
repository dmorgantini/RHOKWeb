exports.Charity = function (charityModel, charitySessionModel) {
    var charityModel = charityModel || require('../model/Charity.js');
    var charitySessionModel = charitySessionModel || require('../model/CharitySession.js');

    return {
        register:function (req, res) {
            return res.render('pages/registerCharity');
        },

        loginView:function (req, res) {
            if (req.cookies && req.cookies.session !== null) {
                charitySessionModel.CharitySession.findById(req.cookies.session, function (err, doc) {
                    if (err) {
                        console.log(err);
                        return res.redirect('/error');
                    }

                    if (!doc) {
                        return res.render('pages/loginCharity');
                    }

                    return res.redirect('/charity/' + doc.charity + '/update');
                });

            }
            else {
                return res.render('pages/loginCharity');
            }
        },

        login:function (req, res) {
            charityModel.Charity.find({ 'email':req.body.username, 'password':req.body.password }, function (err, doc) {

                if (err) {
                    console.log(err);
                    return res.redirect('/error');
                }

                if (doc.length == 0) {
                    return res.redirect('/loginCharity/error');
                }

                var session = new charitySessionModel.CharitySession({ 'charity': doc[0]._id });
                session.save(function(err, obj) {
                    res.cookie('session', obj._id);
                    return res.redirect('/charity/' + doc[0]._id + '/update');
                });


            });
        },

        newCharity:function (req, res) {
            var charity = new charityModel.Charity(req.body.charity);
            charity.save(function (err) {
                console.log(err);  // TODO: handle error better
                if (err){
                    return res.render('pages/registerCharity/error')
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
            charityModel.Charity.update({_id: req.params.id }, req.body.charity, function (err) {
                console.log(err);  // TODO: handle error better
                return res.redirect('/charity/' + req.params.id);
            });
        },

        updateView: function (req, res) {
            charityModel.Charity.findById(req.params.id, function (err, doc) {
                if (!err) {
                    return res.render('pages/updateCharity', { 'charity': doc });
                }
                else {
                    console.log('Update View ' + err);
                    return res.redirect('/error'); // TODO: need to set up an error page
                }
            });
        }

    };
};