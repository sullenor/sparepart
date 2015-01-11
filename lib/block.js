'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');

var Core = require('./core');
var Elem = require('./elem');
var Mod = require('./mod');

var inherits = util.inherits;

/**
 * @emits {}
 * @param {String} directory Абсолютный путь
 */
function Block(directory) {
  Core.call(this, directory);

  this.name = this._block = path.basename(directory);
}

inherits(Block, Core);

var proto = Block.prototype;

/**
 * @param  {String} dirpath Абсолютный путь.
 * @param  {String} dirname
 */
proto._determine = function (dirpath, dirname) {
  var that = this;
  var isMod = this._isMod(dirname);

  var bem = isMod ?
    new Mod(dirpath, this) :
    new Elem(dirpath, this);

  this[isMod ? 'mods' : 'elems'].push(bem);

  this._addOrders();

  bem.once('done', function () {
    that._removeOrder();
    that._checkOrders();
  });

  bem.read();
};

/**
 * @return {Core}
 */
proto.read = function () {
  var that = this;

  this.elems = [];
  this.mods = [];

  this.on('directory', this._determine);

  this.once('done', function () {
    that.removeListener('directory', that._determine);
  });

  this._readdir();

  return this;
};

module.exports = Block;
