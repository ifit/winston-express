var uglify = require('uglify-js')
  , clientCode = require('fs').readFileSync(__dirname + '/client.js').toString()
  , jsClient = uglify.minify(clientCode).code
  , winston
  ;

function getClient(req, res) {
  res.header('Content-Type', 'application/javascript');
  res.end(jsClient);
}

function logMessage(req, res) {
  let meta = parseMetadataSafely(req.params.meta);
  winston.log(req.params.level, req.params.message, meta);
  res.json({got: 'it'});
}

function parseMetadataSafely(meta) {
  let parsedMeta = '';
  if(!meta) return parsedMeta;
  try {
    parsedMeta = JSON.parse(meta);
  } catch(error) {
    parsedMeta = meta.toString();
  }
  return parsedMeta;
}

function helpExpress(app, _winston) {
  winston = _winston;
  jsClient = jsClient.replace('{LEVELS:LEVELS}', JSON.stringify(winston.levels));
  app.get('/winston/client.js', getClient);
  app.get('/winston/log/:level/:message/:meta?', logMessage);
}

module.exports = helpExpress;
