
# Winston Express

Winston Express is a helper for express, that allows you to log to
winston from the browser. 

It is simple to use.

```javascript
var winstonExpress = require('winston-express')
  , winston = require('winston')
  , express = require('express')
  , app = express.createServer();

// winstonExpress takes two parameters,
// an express app, and a winston logger instance.
winstonExpress(app, winston);
```
Only call `winstonExpress()` once, or bad things could happen

Add the following script tag to your html:

    <script type="text/javascript" src="/winston/client.js"></script>

Winston Express requires jQuery to be included before itself in the
browser.

From there, you are ready to go! Anywhere in your browser side code you
can use winston:

```javascript
winston.log('info', 'This is informational...');
winston.info('This is more info');
winston.myCustomLevel('winston is aware of error levels you define');
winston.anotherCustomLevel('but only if you define them before calling winstonExpress()');
winston.log('debug', 'meta data is also allowed', {this: 'is', meta: 'data'});
```

### Updating the package version

To update the package version and publishing the new version to npmjs.com use:
```
npm version patch
npm publish
```
The `npm version patch` command will update the patch version number in the package.json file.
The `npm publish` command will publish the new version to npmjs.com

Note: Previously, this package was not under ifit npm organization and new version were being published here https://npmjs.com/winston-express. The package has now been relocated to https://npmjs.com/@ifit/winston-express, and new versions will only be publish to the latter URL.