'use strict';

var path = require('path');
var util = require('util');

var Core = require('./core');
var ElemMod = require('./elemmod');

var format = util.format;
var inherits = util.inherits;

/**
 * @emits {}
 * @param {String} directory Абсолютный путь
 * @param {Core}   parent
 */
function Elem(directory, parent) {
  Core.call(this, directory, parent);

  if (!parent) {
    this._block = path.basename(path.dirname(directory));
  }

  var elem = path.basename(directory);
  this._elem = elem;
  this.name = elem.replace(/^_{2}/, '');
}

inherits(Elem, Core);

var proto = Elem.prototype;

/**
 * @param  {String} dirpath Абсолютный путь.
 * @param  {String} dirname
 */
proto._determine = function (dirpath, dirname) {
  if (!this._isMod(dirname)) {
    return that._checkOrders();
  }

  var that = this;
  var bem = new ElemMod(dirpath);

  this.mods.push(bem);

  this._addOrders();

  bem.once('done', function () {
    that._removeOrder();
    that._checkOrders();
  });

  bem.read();
};

/**
 * @param  {String} suffix
 * @return {String}
 */
proto._resolveFilename = function (suffix) {
  return suffix.replace('?', format('%s__%s',
    this._block,
    this.name));
};

/**
 * @return {Core}
 */
proto.read = function () {
  var that = this;

  this.mods = [];

  this.on('directory', this._determine);

  this.once('done', function () {
    that.removeListener('directory', that._determine);
  });

  this._readdir();

  return this;
};

module.exports = Elem;
