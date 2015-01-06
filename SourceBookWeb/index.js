var express = require("express");
var app = require("./app/app");
var corsenabler = require("./app/cors-enabler");
var appServer = express();
var appview = require("./app/app-view");
var appRouter = require("./app/router");
var bodyParser = require('body-parser');

appServer.use(bodyParser.urlencoded({
    extended: true
}));
appServer.use(bodyParser.json());
appServer.set("port", process.env.port || 3000);
appServer.use(corsenabler.allowcors);


app.startup(function(err) {}, function() {
    appview.prepare(appServer, express, __dirname);
    appRouter.start(appServer);
    appServer.listen(appServer.get("port"));
});