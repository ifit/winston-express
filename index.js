var fs = require('fs')
  , uglify = require('uglify-js')
  , jsClient
  , winston;

jsClient = fs.readFileSync(__dirname + '/client.js', 'utf8');
jsClient = minifyJs(jsClient);

function minifyJs(script) {
  var ast;
  ast = uglify.parse(script);
  ast = uglify.ast_mangle(ast);
  ast = uglify.ast_squeeze(ast);
  script = uglify.gen_code(ast, { ascii_only: true });
  return script;
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

function helpExpress(app, _winston) {
  winston = _winston;
  jsClient = jsClient.replace('{LEVELS:LEVELS}', JSON.stringify(winston.levels));
  app.get('/winston/client.js', getClient);
  app.get('/winston/log/:level/:message/:meta?', logMessage);
}

module.exports = helpExpress;
