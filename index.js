var fs = require('fs')
  , jsClient
  , winston;

try {
  jsClient = fs.readFileSync(__dirname + '/client.min.js', 'utf8');
} catch (e) {
  jsClient = fs.readFileSync(__dirname + '/client.js', 'utf8');
}

function helpExpress(app, _winston) {
  winston = _winston;
  jsClient = jsClient.replace('{LEVELS:LEVELS}', JSON.stringify(winston.levels));
  app.get('/winston/client.js', getClient);
  app.get('/winston/log/:level/:message/:meta?', logMessage);
}

function getClient(req, res) {
  res.header('Content-Type', 'application/javascript');
  res.end(jsClient);
}

function logMessage(req, res) {
  var meta = ( req.params.meta
             ? JSON.parse(req.params.meta)
             : undefined );
  winston.log(req.params.level, req.params.message, meta);
  res.json({got: 'it'});
}

module.exports = helpExpress;
