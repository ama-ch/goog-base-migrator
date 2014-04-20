'use strict';

var _ = require('lodash');
var doctrine = require('doctrine');
var falafel = require('falafel');

function isGoogBaseExpression(node) {
  return node.type === 'CallExpression' &&
    node.callee.object && node.callee.object.name === 'goog' &&
    node.callee.property && node.callee.property.name === 'base';
}

function getAncestry(node, condition) {
  if (condition(node)) {
    return node;
  }
  if (node.parent) {
    return getAncestry(node.parent, condition);
  }
  throw new Error();
}

function getParentAssignmentNode(node) {
  return getAncestry(node, function(node) {
    return node.type === 'ExpressionStatement' &&
      node.expression.type === 'AssignmentExpression';
  });
}

function getBaseClass(node) {
  var assignNode = getParentAssignmentNode(node);
  var baseClass = assignNode.expression.left.source();
  return baseClass.split('.prototype')[0];
}

function isConstructorNode(node) {
  var jsdoc;
  var comments = node.leadingComments;
  var comment = _.findLast(comments, function(comment) {
    return comment.type === 'Block';
  });

  try {
    jsdoc = doctrine.parse(
      '/*' + comment.value + '*/',
      {unwrap: true, recoverable: true});
  } catch (e) {
  }
  return jsdoc.tags.some(function(tag) {
    return tag.title === 'constructor';
  });
}

function createNewExpression(node, className, isConstructor) {
  var args = ['this'];
  if (isConstructor) {
    args.push("'constructor'");
  }
  args = args.concat(node.arguments.slice(1).map(function(arg) {
    return arg.source();
  }));
  var result = '';
  result += className + '.base(';
  result += args.join(', ');
  result += ')';
  return result;
}

var Migrator = function(logger) {
  this.logger = logger;
  this.found = 0;
};

Migrator.prototype.migrate = function(src) {
  this.found = 0;
  var options = {
    attachComment: true,
    loc: true
  };
  var output = falafel(src, options, function(node) {
    if (!isGoogBaseExpression(node)) {
      return;
    }
    var className = getBaseClass(node);
    var parentAssignmentNode = getParentAssignmentNode(node);
    var isConstructor = isConstructorNode(parentAssignmentNode);
    var expression = createNewExpression(node, className, isConstructor);
    this.logger.debug('before: ' + node.source());
    this.logger.debug(' after: ' + expression);
    node.update(expression);
    this.found++;
  }.bind(this));
  return output.toString();
};

module.exports = Migrator;
