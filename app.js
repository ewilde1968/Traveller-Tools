
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
var server = http.createServer(app, function(request,responts) {
    const {headers,method,url} = request;
    let body = [];

    // handle error requests and concatenate data into a string object
    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        // at this point, 'body' has the entire request body stored in it as a string
        
        response.on('error', (err) => {
            console.error(err);
        });
        
    });
    
    // handle 
}).listen(app.get('port'));
