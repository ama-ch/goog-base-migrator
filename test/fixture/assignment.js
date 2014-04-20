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
  goog.base(this, opt_domHelper);

  /**
   * @type {boolean}
   * @private
   */
  this.canDecorate_ = false;
};
goog.inherits(my.app.Sample, goog.ui.Component);

/** @override */
my.app.Sample.prototype.canDecorate = function() {
  this.canDecorate_ = goog.base(this, 'canDecorate');
};
