const http = require('http');
const url = require('url')
const dt = require('/Mymodule');

// Exercise N1


//     http.createServer(function(req,res){
//     res.writeHead(200,{'Content-Type': 'text/html'});
//     res.end("Hello World");
// }).listen(8090)



// Exercise N2




// http.createServer(function (req, res){
//     res.writeHead(200,
//         {'Content-Type': 'text/html'});
//     res.write("The date and time are currently: " + dt.myDate());
// res.end();
// }).listen(8090);


// Exercise N3


// http.createServer
// (function (req, res){
// res.writeHead(200, {'Content-Type': 'text/html'});
// res.write("This is an Example for url property" + req.url);
// res.end();
// }).listen(8090);

//Exercise  N4

http.createServer(function (req, res){
    var q = url.parse(req.url, true).query;
    console.log(url.parse(req.url, true).pathname);
    var vals = req.body;
    dt.add(req, res, q);
}).listen(8090);