var server = require('./server1');
var route = require('./router');

server.start(route.route);