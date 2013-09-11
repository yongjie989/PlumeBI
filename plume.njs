var http = require("http");
var template = require("swig");
var querystring = require("querystring");
var url = require("url");
var express = require("express");
var app = express();
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/grid', express.static(__dirname + '/grid'));
app.use('/edit_area', express.static(__dirname + '/edit_area'));
template.init(
    {
        allowErrors: false,
        autoescape: true,
        encoding: 'utf8',
        filters: {},
        root: '.',
        tage: {}
    }
);
/*
function function_call(pathname, request, response){
    switch(pathname){
        case '/save':
            {
            var save = require("./save.js");
            save.run(request, response);
            break;
            }
        default:
            index(request, response);
            break;
    };
};
*/


/*
function onRequest(request, response){
    
    var ParamsWithValue = querystring.parse(require('url').parse(request.url).query);
    //console.log(ParamsWithValue);
    var pathname = url.parse(request.url, true).pathname;
    //console.log(pathname);
    function_call(pathname, request, response);
    
};
*/
//http.createServer(onRequest).listen(81);

app.get('/', function(request, response){
    //var ParamsWithValue = querystring.parse(require('url').parse(request.url).query);
    //var pathname = url.parse(request.url, true).pathname;
    //index(request, response);
    var index = require('./index.js');
    index.run(request, response);
});

app.get('/get_execute', function(request, response){
    var index = require('./index.js');
    index.get_execute(request, response);
});

app.get('/save', function(request, response){
    var save = require("./save.js");
    save.run(request, response);
});

var server = http.createServer(app);
var ip = '127.0.0.1';
var port = 81;

server.listen(port,ip,function(){
    console.log('Start PlumeBI Server ('+ip+':'+port+')');
});