'use strict';

var path = require('path');
var util = require('util');

var Core = require('./core');
var Val = require('./val');

var format = util.format;
var inherits = util.inherits;

/**
 * @emits {}
 * @param {String} directory Абсолютный путь
 * @param {Core}   parent
 */
function Mod(directory, parent) {
  Core.call(this, directory, parent);

  if (!parent) {
    this._block = path.basename(path.dirname(directory));
  }

  var mod = path.basename(directory);
  this._mod = mod;
  this.name = mod.replace(/^_/, '');
}

inherits(Mod, Core);

var proto = Mod.prototype;

/**
 * @param  {String} filepath Абсолютный путь.
 * @param  {String} filename
 */
proto._determine = function (filepath, filename) {
  var basename = filename.substr(filename, filename.indexOf('.'));

  if (!/^[\-a-z0-9]+_[\-a-z0-9]+_[\-a-z0-9]+$/i.test(basename)) {
    return this._checkOrders();
  }

  if (basename in this._cache) {
    return this._checkOrders();
  }

  var bem = new Val(filepath, this);
  var that = this;

  this.vals.push(bem);

  this._addOrders();
  this._cache[basename] = filepath;

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
  return suffix.replace('?', format('%s_%s',
    this._block,
    this.name));
};

/**
 * @return {Core}
 */
proto.read = function () {
  var that = this;

  this._cache = {};
  this.vals = [];

  this.on('file', this._determine);

  this.once('done', function () {
    delete that._cache;
    that.removeListener('file', that._determine);
  });

  this._readdir();

  return this;
};

module.exports = Mod;
