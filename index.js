var uglify = require('uglify-js')
  , jsClient = uglify.minify(__dirname + '/client.js').code
  , winston
  ;

function getClient(req, res) {
  res.header('Content-Type', 'application/javascript');
  res.end(jsClient);
}

function logMessage(req, res) {
  var meta = ( req.params.meta
             ? JSON.parse(req.params.meta)
             : '' );
  winston.log(req.params.level, req.params.message, meta);
  res.json({got: 'it'});
}

function helpExpress(app, _winston) {
  winston = _winston;
  jsClient = jsClient.replace('{LEVELS:LEVELS}', JSON.stringify(winston.levels));
  app.get('/winston/client.js', getClient);
  app.get('/winston/log/:level/:message/:meta?', logMessage);
}

module.exports = helpExpress;
