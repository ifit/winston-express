var fs = require('fs')
  , jsp = require("uglify-js").parser
  , pro = require("uglify-js").uglify
  , jsClient
  , winston;

jsClient = fs.readFileSync(__dirname + '/client.js', 'utf8');
jsClient = minifyJs(jsClient);

function minifyJs(script) {
  var ast;
  ast = jsp.parse(script);
  ast = pro.ast_mangle(ast);
  ast = pro.ast_squeeze(ast);
  script = pro.gen_code(ast, { ascii_only: true });
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
