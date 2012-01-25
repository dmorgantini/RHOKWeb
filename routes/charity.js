module.exports = function (charityModel) {
    charityModel = charityModel || require('../model/Charity.js');

    return {
        register:function (req, res) {
            return res.render('pages/registerCharity', { error:'false' });
        },

        newCharity:function (req, res) {
            if (!req.currentSession){
                return res.redirect('charity/login');
            }

            var charity = new charityModel.Charity(req.body.charity);
            charity.save(function (err) {
                console.log(err);  // TODO: handle error better
                if (err) {
                    return res.render('pages/registerCharity', { error:'true' });
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
                    return res.render('pages/donate', { charity: doc, donation: { value: 5 } } );
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
            if (!req.currentSession){
                return res.redirect('charity/login');
            }

            // TODO: handle no access to charity

            charityModel.Charity.findById(req.params.id, function (err, doc) {
                if (!err) {
                    doc.name = req.body.charity.name;
                    doc.website = req.body.charity.website;
                    doc.directDonationLink = req.body.charity.directDonationLink;
                    doc.donationInstructions = req.body.charity.donationInstructions;
                    doc.userId = req.currentSession.userId;

                    doc.save(function (error) {
                        if (!error)
                            return res.redirect('/charity/' + req.params.id);
                        else {
                            console.log(error);
                            return res.render('pages/updateCharity', { charity:doc, error:'true' });
                        }
                    })

                } else {
                    console.log(err);
                    return res.redirect('/error'); // TODO: need to set up an error page
                }
            });

        },

        updateView:function (req, res) {
            if (!req.currentSession){
                return res.redirect('charity/login');
            }

            var error = { error:'false'};

            if (req.params[0]) {
                error.error = 'true';
            }

            charityModel.Charity.findById(req.params.id, function (err, doc) {
                if (!err) {
                    return res.render('pages/updateCharity', { charity:doc, error:'false' });
                }
                else {
                    console.log('Update View ' + err);
                    return res.redirect('/error'); // TODO: need to set up an error page
                }
            });
        }

    };
};