var express = require('express'),
	app = express(),
	expressStaticGzip = require("express-static-gzip"),
	isProd = typeof(process) !== 'undefined' && process && process.env && process.env.PORT,
	port = isProd ? process.env.PORT : 3000, // Heroku should pass process.env.PORT
	rootFolder = __dirname;

app.use(expressStaticGzip(rootFolder));

app.get('/', function(req, res){
	res.sendFile(`${rootFolder}/index.html`);
});

app.get('*', function (req, res) {
	res.redirect('/');
});

app.listen(port, function () {
  console.log(`New express server started listening on port ${port}`);
});