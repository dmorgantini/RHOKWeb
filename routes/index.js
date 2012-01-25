module.exports = function (sessions, users) {
    users = users || require('../model/User.js');
    sessions = sessions || require('../model/Session.js');

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
                sessions.Session.findById(req.cookies.session, function (err, doc) {
                    req.currentSession = doc;
                    next();
                });
            } else {
                next();
            }
        },

        login:function (req, res) {
            // TODO: send them back to whenst they came

            users.User.find({ 'userId':req.body.username, 'password':req.body.password }, function (err, doc) {

                if (err) {
                    console.log(err);
                    return res.redirect('/error');
                }

                if (doc.length == 0) {
                    return res.redirect('/login/error');
                }

                var session = new sessions.Session({ 'userId':doc[0]._id });
                session.save(function (err, obj) {
                    res.cookie('session', obj._id);
                    return res.redirect('/');
                });
            });
        },

        loginView:function (req, res) {
            var error = { error:'false'};

            if (req.params[0]) {
                error.error = 'true';
            }

            if (req.currentSession) {
                return res.redirect('/');
            }
            else {
                return res.render('pages/login', error);
            }
        }

    }

};
