/**
 * @fileoverview sample file.
 */
goog.provide('my.app.Sample');

goog.require('goog.ui.Component');


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
my.app.Sample = function(opt_domHelper) {
  my.app.Sample.base(this, 'constructor', opt_domHelper);
};
goog.inherits(my.app.Sample, goog.ui.Component);
