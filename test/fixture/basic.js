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
   * @type {number}
   * @private
   */
  this.number_ = 0;
};
goog.inherits(my.app.Sample, goog.ui.Component);

/** @override */
my.app.Sample.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
};

/** @override */
my.app.Sample.prototype.renderBefore = function(sibling) {
  goog.base(this, 'renderBefore', sibling);
};

/** @override */
my.app.Sample.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  delete this.number_;
};
