exports.controller = {
    index: function(req, res) {
        res.render("home", {
            appName: '',
            rumbles: []
        });
    },
    progressive: function(req, res) {
        var root = {};
        var hello = {
            "say": "hello"
        };
        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Transfer-Encoding': 'chunked'
        });

        // res.write(root);
        root["hello"] = {
            "say": "hello"
        };
        console.log(root);
        res.write(JSON.stringify(root));

        setTimeout(function() {
            hello = {
                "hello": "wolrd"
            };
            root["say"] = {
                "hello": "world"
            };
            res.write("," + JSON.stringify(hello));
        }, 400)

        setTimeout(function() {
            hello = {
                "helloworld": "sayhello"
            };
            // res.write(","+JSON.stringify(hello));
        }, 400);

        setTimeout(function() {
            // res.write("}");
            res.end();
        }, 1000);


    },
    progressiveHTML: function(req, res) {
        var body = 'hello world';

        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
            'Transfer-Encoding': 'chunked'
        });

        var html =
            '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<head>' +
            '<meta charset="utf-8">' +
            '<title>Chunked transfer encoding test</title>' +
            '</head>' +
            '<body><h1>Global Header -- THis is Ebay </h1>';
        res.write(html);
        var anotherChunk = "<ul><li>One </li><li>Two</li>";

        for (var i = 0; i < 10; i++) {
            setTimeout(function() {
                anotherChunk = "<li>Three </li><li>Four</li>";
                res.write(anotherChunk);
                res.write("<li>" + i + "</i>")
            }, i * 1000);

        };
        setTimeout(function() {
            res.write("Im Done .. Complete ");
            res.write("</body></html>");
            res.end();
        }, 2000);
        res.write('<html><head>');


    },
    progressiveArray: function(req, res) {
        var result = {
            chunks: null
        };
        var body = [];

        res.writeHead(200, {
            'Content-Type': 'application/json; charset=UTF-8'
        });
        var i = 0;
        var hasDependencies = false;
        var result = {};
        while (!hasDependencies && i == 5) {
            setTimeout(function(){
                result[i]=getDepedent(i);
                i++;
            });
            if(i==5){
                hasDependencies=true;
            }
        }
        while (i == 3) {
            res.write(i);
            i++;
        }
        var html =
            '<!DOCTYPE html>' +
            '<html lang="en">' +
            '<head>' +
            '<meta charset="utf-8">' +
            '<title>Chunked transfer encoding test</title>' +
            '</head>' +
            '<body>';

        body.push(html);
        result.chunks = body;
        res.write(JSON.stringify(result));
        res.write("\n");
        setTimeout(function() {
            var one = {
                "hello": "world"
            };
            res.write(JSON.stringify(one));
            res.write("\n");
        }, 400)

        setTimeout(function() {
            var one = {
                "hello": "world"
            };
            res.write(JSON.stringify(one));
        }, 400)
        setTimeout(function() {
            res.end();
        }, 1000);


    },
    getDepedent: function(i) {
        var one = {
            "hello": "world",
            "one": i
        };
        return one;
    }
};