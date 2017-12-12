
/**
 * Module dependencies.
 */

const express = require('express'),
      myDatabase = require('./model/database'),
      viewCallbacks = require('./viewCallbacks'),
      http = require('http'),
      path = require('path');

const app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('case sensitive routing', true);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('travellerToolsCookieSecret'));
app.use(express.session({ secret: 'travellerToolsSessionSecret'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.locals.viewCallbacks = viewCallbacks.InitializeViewCallbacks(app);

// setup DB
app.locals.database = new myDatabase();
app.locals.database.initialize();

// setup server and main loop
var server = http.createServer(app).listen(app.get('port'));
