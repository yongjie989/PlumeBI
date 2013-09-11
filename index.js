var http = require("http");
var template = require("swig");
var querystring = require("querystring");
var url = require("url");
//var module = require("module");
var mysql = require("mysql");

module.exports = {
    run: run,
    get_execute: get_execute
};

var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "xxx",
    database : "yyy"
});
connection.connect();

function read_json(filename){
    var fs = require("fs");
    var myobj = JSON.parse(fs.readFileSync(filename,"utf8"));
    return myobj;  
};

function executesql(sql, callback){
    var obj = {};
    connection.query({sql:sql, typeCast: true}, function(err, rows, fields){
        if (err) throw err;
        //console.log(rows[0]);
        //console.log(fields);
        if(fields){
            obj.column = [];
            for(var x in fields){
                //name, length, 
                obj.column.push(fields[x].name);
                //console.log(fields[x].name);
            };
        };
        callback(obj);
    });
    //return obj;
    
};

function run(request, response){
    var myobj = read_json("json_format.json");
    //console.log(request.query);
    
    if (request.query.action == "execute_sql"){
        response.writeHead(200, {"Content-Type": "application/json"});
        //console.log(request.query);
        executesql(request.query.sql, function(data){
            if(data){
                console.log(JSON.stringify(data));
                response.write(JSON.stringify(data));
                
            }else{
                response.write('');
            }
            response.end();
        });
        //console.log(obj);
        
        //response.write(JSON.stringify(obj));
        
        return false;
    };
    
    //console.log(myobj.process_list[0].sql_statement);
    //response.end(myobj.process_list[0].sql_statement);
    
    /*
    var sql = "select * from users";
    connection.query(sql, function(err, rows, fields){
        if (err) throw err;
        console.log(rows);
    });
    */
    var tmpl = template.compileFile("plume.html");
    var render_html = tmpl.render(
        {
            pagename: "awesome people",
            authors: ["Paula","Evan","Ethan"],
            recipes: myobj,

        }
    );
    
    response.writeHead(200, {"Content-Type":"text/html"});
    response.end(render_html);
    
};

function get_execute(request, response){
    response.writeHead(200, {"Content-Type": "application/json"});
    var myobj = read_json("json_format.json");
    
    //console.log(request.query);
    //var fields = executesql(request.query.sql);
    response.write(JSON.stringify(myobj));
    response.end();
};