var config = require("./db-config").dbConfig;
var mongoose = require("mongoose");

function connectDB(err, success) {
    mongoose.connect('mongodb://' + config.server.host + '/' + config.dbname);
    mongoose.connection.on("open", function(ref) {
        success.call(this);
    });

    mongoose.connection.on("error", function(err) {
        console.error('Failed to connect to DB ' + config.server.host + ' on startup ', err);
    });

}

exports.connect = function(err, success) {
    connectDB(err, success);
}

exports.close = function(){
  mongoose.connection.close(function () {
  });
}