/**
 * @fileoverview sample file.
 */
goog.provide('my.app.Sample');

goog.scope(function() {
var app = my.app;


/**
 * @param {goog.dom.DomHelper=} opt_domHelper
 * @constructor
 * @extends {goog.ui.Component}
 */
app.Sample = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(my.app.Sample, goog.ui.Component);

});  // goog.scope
