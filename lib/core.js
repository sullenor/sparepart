'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');

var Queue = require('./queue');

var inherits = util.inherits;

/**
 * @emits {}
 * @param {String} directory Абсолютный путь
 * @param {Core}   parent
 */
function Core(directory, parent) {
  Queue.call(this);

  this.path = directory;

  if (!parent) {
    return this;
  }

  if (!(parent instanceof Core)) {
    throw new Error('derive props from parent failed');
  }

  this._deriveProps(parent);
}

inherits(Core, Queue);

var proto = Core.prototype;

/**
 * @param {Core} parent
 */
proto._deriveProps = function (parent) {
  var props = [
    '_block',
    '_elem',
    '_mod'
  ];

  props.forEach(function (prop) {
    if (parent[prop]) {
      this[prop] = parent[prop];
    }
  }, this);
};

/**
 * @param  {String}  dirname
 * @return {Boolean}
 */
proto._isMod = function (dirname) {
  return /^_\w/.test(dirname);
};

/**
 * @emits {raw}
 */
proto._readdir = function () {
  var directory = this.path;
  var that = this;

  this.on('raw', this._stats);

  fs.readdir(directory, function (err, files) {
    if (err) {
      throw err;
    }

    that._addOrders(files.length);

    files.forEach(function (file) {
      that.emit('raw', path.join(directory, file), file);
    });

    that.removeListener('raw', that._stats);
  });
};

/**
 * @param  {String} suffix
 * @return {String}
 */
proto._resolveFilename = function (suffix) {
  return suffix.replace('?', this.name);
};

/**
 * @param  {String} filename
 * @return {String}
 */
proto._resolveFilepath = function (filename) {
  return path.join(this.path, filename);
};

/**
 * @emits {directory}
 * @emits {file}
 * @param {String}    filepath Абсолютный путь.
 * @param {String}    file
 */
proto._stats = function (filepath, file) {
  var that = this;

  fs.stat(filepath, function (err, stats) {
    if (err) {
      throw err;
    }

    that._removeOrder();

    if (stats.isDirectory()) {
      that.emit('directory', filepath, file);
    }

    if (stats.isFile()) {
      that.emit('file', filepath, file);
    }

    that._checkOrders();
  });
};

/**
 * @param  {String} suffix
 * @return {Core}
 */
proto.has = function (suffix) {
  var filename = this._resolveFilename(suffix);
  var filepath = this._resolveFilepath(filename);
  var that = this;

  this._addOrders();

  fs.stat(filepath, function (err, stats) {
    if (err && err.code !== 'ENOENT') {
      throw err;
    }

    that._removeOrder();

    if (stats && stats.isFile()) {
      that.emit(suffix, filepath, filename);
    } else {
      that.emit(suffix, null, filename);
    }

    that._checkOrders();
  });

  return this;
};

/**
 * @return {Core}
 */
proto.read = function () {
  this.emit('done');
  return this;
};

module.exports = Core;
