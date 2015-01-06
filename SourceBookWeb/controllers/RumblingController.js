var userFeedback = require("../models/user-feedback").UserFeedback;
var util = require('util');
var fs = require("fs");
var formidable = require("formidable");

exports.controller = {
    index: function(req, res) {
        userFeedback.all(null, function(feedbacks) {
            if (req.headers.accept === "application/json") {
                res.json(200, feedbacks);
            } else {
                res.send(200, feedbacks);
            }

        });
    },
    get: function(req, res) {
        var rumbleId = req.params.id;
        var userFeedbackOrm = userFeedback.orm();
        var rumble = userFeedbackOrm.findOne({
            '_id': rumbleId
        }, 'screenShotHtml', function(err, rumbleResult) {
            res.send(rumbleResult.screenShotHtml);
        });
    },
    getAllByApp: function(req, res) {
        var appName = req.params.app;
        var filter = {
            'appName': appName
        };
        if (typeof req.params.id !== "undefined") {
            filter._id = req.params.id;
        }

        userFeedback.allByFilter(filter, null, function(feedbacks) {
            if (req.headers.accept === "application/json") {
                res.json(200, feedbacks);

            } else {
                res.render("home", {
                    appName: filter.appName,
                    rumbles: feedbacks
                });
            }

        });
    },
    addNew: function(req, res) {
        var form = new formidable.IncomingForm();
        var feedback = null;
        var feedbackContent = null;
        form.parse(req, function(err, fields, files) {
            if (fields) {
                feedback = JSON.parse(fields.feedback);
            }
            if (files) {
                feedbackContent = fs.readFileSync(files.screenShot.path, "utf8");
            }
            var feedbackOrm = userFeedback.ormByArgs(feedback);
            feedbackOrm.screenShotHtml = feedbackContent;
            feedbackOrm.save();

        });

        userFeedback.all(null, function(feedbacks) {
            res.json(feedbacks);
        });
    },
    show: function(req, res){
        var rumbleId = req.params.id;
        var userFeedbackOrm = userFeedback.orm();
        console.log(rumbleId);
        var rumble = userFeedbackOrm.findOne({
            '_id': rumbleId
        }, 'screenShotHtml', function(err, rumbleResult) {
            res.send(200, rumbleResult.screenShotHtml);
        });
    }
};