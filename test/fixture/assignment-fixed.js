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

  /**
   * @type {boolean}
   * @private
   */
  this.canDecorate_ = false;
};
goog.inherits(my.app.Sample, goog.ui.Component);

/** @override */
my.app.Sample.prototype.canDecorate = function() {
  this.canDecorate_ = my.app.Sample.base(this, 'canDecorate');
};
