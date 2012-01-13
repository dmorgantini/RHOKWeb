/*
 * All code (c) 2011 CharityClick.net all rights reserved
 */

var app, express;
express = require("express");
app = module.exports = express.createServer();

app.configure(function () {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('session'));
    app.use(app.router);
    return app.use(express.static(__dirname + "/public"));
});

app.configure("development", function () {
    return app.use(express.errorHandler({
        dumpExceptions:true,
        showStack:true
    }));
});

app.configure("production", function () {
    return app.use(express.errorHandler());
});

var index = require('./routes/index.js');
var charity = require('./routes/charity.js')();
var charities = require('./routes/charities.js');

app.get("/", index.index);
app.get("/index", index.index);
app.get("/aboutus", index.aboutus);
app.get("/contact", index.contact);

app.get("/charity/register", charity.register);
app.get(/^\/charity\/login(\/error)?$/, charity.loginView);
app.get("/charity/:id", charity.view);
app.get("/charity/:id/donate", charity.donate);
app.get("/charity/:id/information", charity.information);
app.get("/charity/:id/update", charity.updateView);
app.post("/charity/:id/update", charity.update);
app.post("/charity/register", charity.newCharity);
app.post("/charity/login", charity.login);


app.get("/charities.json", charities.jsonList);

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);