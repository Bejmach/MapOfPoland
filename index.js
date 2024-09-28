const http = require("http");
const url = require('url');
const fs = require('fs');

const port = 8080;

http.createServer(function (req, res){
	var q = url.parse(req.url, true);

	if(q.pathname == '/'){
		fs.readFile('./html/main.html', function(err, data) {
			res.write(data);
			res.end();
		});
	}
	else if(q.pathname == '/makroregions'){
		fs.readFile('./html/makroregions.html', function(err, data) {
			res.write(data);
			res.end();
		});
	}
	else if (req.url === '/style.css') {
        fs.readFile('./html/style.css', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading the CSS file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
    }
	else if (req.url === '/script.js') {
        fs.readFile('./html/script.js', (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Error loading the Js file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/javascript' });
                res.end(data);
            }
        });
    }
	else if(req.url == '/makroregionyRaw.png'){
		fs.readFile('./images/makroregionyRaw.png', (err, data)=>{
			res.writeHead(200, {'Content-Type': 'image/png'});
			res.end(data);
		})
	}
	else{
		res.write("not Main Page");
		res.end();
	}
	

}).listen(port);
