'use strict';

var path = require('path');
var util = require('util');

var Core = require('./core');

var inherits = util.inherits;

/**
 * @emits {}
 * @param {String} file   Абсолютный путь
 * @param {Core}   parent
 */
function Val(file, parent) {
  Core.call(this, file, parent);

  var filename = path.basename(file);
  var basename = filename.substr(0, filename.indexOf('.'));

  if (!basename) {
    throw new Error('Val failed');
  }

  if (!parent) {
    var hasElem = basename.length - basename.replace(/_/g, '').length > 2;
    var mod = path.dirname(file);

    if (hasElem) {
      var elem = path.dirname(mod);
      this._block = path.basename(path.dirname(elem));
      this._elem = path.basename(elem);
    } else {
      this._block = path.basename(path.dirname(mod));
    }

    this._mod = path.basename(mod);
  }

  this._val = basename.substr(basename.lastIndexOf('_'));
  this.name = this._val.replace(/^_/, '');
}

inherits(Val, Core);

var proto = Val.prototype;

/**
 * @param  {String} suffix
 * @return {String}
 */
proto._resolveFilename = function (suffix) {
  var filename = this.elem ?
    format('%s__%s_%s_%s',
      this._block,
      this._elem.replace(/^__/, ''),
      this._mod.replace(/^_/, ''),
      this.name) :
    format('%s_%s_%s',
      this._block,
      this._mod.replace(/^_/, ''),
      this.name);

  return suffix.replace('?', filename);
};

/**
 * @param  {String} filename
 * @return {String}
 */
proto._resolveFilepath = function (filename) {
  return path.join(path.dirname(this.path), filename);
};

module.exports = Val;
