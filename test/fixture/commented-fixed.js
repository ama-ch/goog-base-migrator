/**
 * @fileoverview sample file.
 */
goog.provide('my.app.Sample');

goog.require('goog.ui.MenuItem');


/**
 * @param {!goog.ui.ControlContent} content
 * @constructor
 * @extends {goog.ui.MenuItem}
 */
my.app.Sample = function(opt_domHelper) {
  my.app.Sample.base(this, 'constructor', content, null /* opt_model */, /* opt_domHelper */ null, /** @type {goog.ui.MenuItemRenderer} */ (goog.ui.ControlRenderer.getCustomRenderer(goog.ui.MenuItemRenderer, goog.getCssName('myclass'))));
};
goog.inherits(my.app.Sample, goog.ui.MenuItem);
