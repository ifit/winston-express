(function(window, $) {
  "use strict";

  var levels = {LEVELS:LEVELS};
  var console = window.console;
  var Winston = new Function();

  Winston.log = function(level, message, meta) {
    var url = '/winston/log/' + encodeURIComponent(level) +
              '/' + encodeURIComponent(message);
    if (meta) {
      url += '/' + encodeURIComponent(JSON.stringify(meta));
    }
    // send it to the server
    $.ajax({url: url});

    // log it to the browser console
    if (typeof console !== 'undefined') {
      level = (console[level] ? level : 'log');
      console[level](level + ': ' + message);
    }
  };

  // attach methods for each log level
  for (var level in levels) {
    if (levels.hasOwnProperty(level)) {
      (function(level) {
        Winston[level] = function(message, cb) {
          this.log(level, message, cb);
        };
      })(level);
    }
  }

  if (window.onerror) {
    window.onerror = function(msg, url, code) {
      var error = msg + " in " + url + " with code " + code;
      winston.error(error);
    };
  }

  window.winston = Winston;

})(window, jQuery);
