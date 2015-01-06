var exphbs = require('express3-handlebars');

module.exports.prepare = function(app, express, baseDir) {
    app.use(express.static(baseDir + '/public/css'));
    app.use(express.static(baseDir + '/public/js'));
    app.engine('handlebars', exphbs({defaultLayout: 'main'}));
    app.set('view engine', 'handlebars');
}