module.exports = function (charitySessionModel) {

    var charitySessionModel = charitySessionModel || require('../model/CharitySession.js');

    return {
        index:function (req, res) {
            return res.render('pages/index');
        },

        contact:function (req, res) {
            return res.render('pages/contact');
        },

        aboutus:function (req, res) {
            return res.render('pages/aboutus');
        },

        session:function (req, res, next) {
            if (req.cookies && req.cookies.session) {
                charitySessionModel.CharitySession.findById(req.cookies.session, function (err, doc) {
                    req.currentSession = doc;
                    next();
                });
            } else {
                next();
            }
        }
    }

};
