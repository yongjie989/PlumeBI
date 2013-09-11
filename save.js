var http = require("http");
var template = require("swig");
var querystring = require("querystring");
var url = require("url");
//var module = require("module");

module.exports = {
    run: run
};

function run(request, response){
    var tmpl = template.compileFile("save.html");
    var render_html = tmpl.render(
        {
            pagename: "Save page"
        }
    );
    
    response.writeHead(200, {"Content-Type":"text/html"});
    response.end(render_html);
};

