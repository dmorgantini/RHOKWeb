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
var charity = require('./routes/charity.js');

app.get("/", index.index);
app.get("/index", index.index);
app.get("/charity/register", charity.register);
app.get("/charity/:id", charity.view);
app.post("/charity/register", charity.newCharity);

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);