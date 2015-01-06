exports.controller = {
    index: function(req, res) {
        res.render("home", {
            appName: '',
            rumbles: []
        });
    }
};