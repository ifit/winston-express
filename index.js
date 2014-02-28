var fs = require('fs')
  , uglify = require('uglify-js')
  , compressor = uglify.Compressor({})
  , jsClient
  , winston
  ;

jsClient = fs.readFileSync(__dirname + '/client.js', 'utf8');
jsClient = minifyJs(jsClient);

function minifyJs(script) {
  var ast = uglify.parse(script);
  ast.figure_out_scope();
  ast = ast.transform(compressor);
  ast.figure_out_scope();
  ast.compute_char_frequency();
  ast.mangle_names();
  var stream = uglify.OutputStream({});
  ast.print(stream);
  return stream.toString();
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
