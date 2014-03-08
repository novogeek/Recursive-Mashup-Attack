
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes'); //same as: require('./routes/index');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));


//app.set('view engine', 'ejs'); 
/*BEGIN app.engine: Change default view engine to write views in "html", instead of "ejs"*/
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
/*End app.engine*/

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(express.session({secret: 'alessios'}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/partner', routes.partner);
app.get('/attackerGadget',routes.attackerGadget);
app.get('/attackerParent',routes.attackerParent);

/*
var port = process.env.PORT || 3000;
app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + port);
});
*/


var ports = [3000, 3100];
ports.forEach(function(port) {
    var s = http.createServer(app);
    s.listen(port, function(){
		console.log('Express server listening on port ' + port);
	});
});


/*
var server=http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
*/