# goog-base-migrator [![Build Status](https://secure.travis-ci.org/ama-ch/goog-base-migrator.png?branch=master)](http://travis-ci.org/ama-ch/goog-base-migrator) [![Coverage Status](https://coveralls.io/repos/ama-ch/goog-base-migrator/badge.png?branch=master)](https://coveralls.io/r/ama-ch/goog-base-migrator?branch=master)

Migration tool from goog.base to static base class methods.

## Install

```bash
$ npm install -g goog-base-migrator
```

## How to use

Find and confirm replacement with `--debug` option.

```bash
$ goog-base-migrator test/fixture/basic.js --debug
File: test/fixture/basic.js
before: goog.base(this, opt_domHelper)
 after: my.app.Sample.base(this, 'constructor', opt_domHelper)
before: goog.base(this, 'enterDocument')
 after: my.app.Sample.base(this, 'enterDocument')
before: goog.base(this, 'renderBefore', sibling)
 after: my.app.Sample.base(this, 'renderBefore', sibling)
before: goog.base(this, 'disposeInternal')
 after: my.app.Sample.base(this, 'disposeInternal')
Found 4 expressions.
```

OK, fix it with `--fix-in-place` option!

```bash
$ goog-base-migrator test/fixture/basic.js --fix-in-place
File: test/fixture/basic.js
Fixed 4 expressions.
$ git diff test/fixture/basic.js
diff --git a/test/fixture/basic.js b/test/fixture/basic.js
index f74e4fc..fa57b6f 100644
--- a/test/fixture/basic.js
+++ b/test/fixture/basic.js
@@ -12,7 +12,7 @@ goog.require('goog.ui.Component');
  * @extends {goog.ui.Component}
  */
 my.app.Sample = function(opt_domHelper) {
-  goog.base(this, opt_domHelper);
+  my.app.Sample.base(this, 'constructor', opt_domHelper);

   /**
    * @type {number}
@@ -24,16 +24,16 @@ goog.inherits(my.app.Sample, goog.ui.Component);

 /** @override */
 my.app.Sample.prototype.enterDocument = function() {
-  goog.base(this, 'enterDocument');
+  my.app.Sample.base(this, 'enterDocument');
 };

 /** @override */
 my.app.Sample.prototype.renderBefore = function(sibling) {
-  goog.base(this, 'renderBefore', sibling);
+  my.app.Sample.base(this, 'renderBefore', sibling);
 };

 /** @override */
 my.app.Sample.prototype.disposeInternal = function() {
-  goog.base(this, 'disposeInternal');
+  my.app.Sample.base(this, 'disposeInternal');
   delete this.number_;
 };
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 ama-ch  
Licensed under the MIT license.
