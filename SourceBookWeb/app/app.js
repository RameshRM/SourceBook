var express = require("express");

var dbClient = require("../db-context/db-client");

function onDbConnected(ref, successcb){
    successcb.call(this);
}

module.exports = {
    startup: function(err, success){
        dbClient.connect(err, function(ref){
            onDbConnected(ref, success);
        });
    },
    shutdown: function(){

    }
}