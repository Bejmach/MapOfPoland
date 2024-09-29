const http = require("http");
const url = require('url');
const fs = require('fs');

const port = 8080;

http.createServer(function (req, res){
	var q = url.parse(req.url, true);

	switch(q.pathname) {
		case '/':
			fs.readFile('./html/main.html', function(err, data) {
				if (err) {
					res.writeHead(500);
					res.end('Error loading the HTML file');
				} else {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
				}
			});
			break;
		case '/makroregions':
			fs.readFile('./html/makroregions.html', function(err, data) {
				if (err) {
					res.writeHead(500);
					res.end('Error loading the HTML file');
				} else {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.end(data);
				}
			});
			break;
		case '/style.css':
			fs.readFile('./html/style.css', (err, data) => {
				if (err) {
					res.writeHead(500);
					res.end('Error loading the CSS file');
				} else {
					res.writeHead(200, { 'Content-Type': 'text/css' });
					res.end(data);
				}
			});
			break;
		case '/script.js':
			fs.readFile('./html/script.js', (err, data) => {
				if (err) {
					res.writeHead(500);
					res.end('Error loading the JS file');
				} else {
					res.writeHead(200, { 'Content-Type': 'text/javascript' });
					res.end(data);
				}
			});
			break;
		case '/makroregionyRaw.png':
			fs.readFile('./images/makroregionyRaw.png', (err, data) => {
				if (err) {
					res.writeHead(500);
					res.end('Error loading the image file');
				} else {
					res.writeHead(200, {'Content-Type': 'image/png'});
					res.end(data);
				}
			});
			break;
		default:
			res.writeHead(404, {'Content-Type': 'text/plain'});
			res.end('404 Not Found');
			break;
	}

}).listen(port);
