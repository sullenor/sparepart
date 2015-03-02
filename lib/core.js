'use strict';

var fs = require('fs');
var path = require('path');
var promisify = require('./promisify');

var SpareError = require('./spareError');

function Core() {
  this._describe.apply(this, arguments);
}

/**
 * @param {String} pathname
 * @param {String} [name]
 */
Core.prototype._describe = function (pathname, name) {
  this.path = path.resolve(pathname);
  this.name = name || path.basename(pathname);
};

/**
 * Ищет вложенные компоненты.
 * @param  {Boolean}  [deep]
 * @param  {Function} callback
 * @return {Promise}
 */
Core.prototype._fetch = function (deep, callback) {};

/**
 * Поиск вложенных файликов по маске.
 * @param  {String}   mask
 * @param  {Function} callback
 */
Core.prototype._tech = function (mask, callback) {
  var file = path.join(this.path, mask.replace('?', this.name));

  fs.stat(file, function (err, stats) {
    if (!err && stats.isFile()) {
      return callback(null, file);
    }

    callback(err || SpareError('Not a file'));
  });
}

/**
 * Ищет вложенные компоненты.
 * @param  {Boolean}  [deep]
 * @param  {Function} [callback]
 * @return {Promise}
 */
Core.prototype.fetch = function (deep, callback) {
  if (callback) {
    this._fetch.apply(this, arguments);
    return;
  }

  return promisify(this._fetch, this);
};

/**
 * Поиск вложенных файликов по маске.
 * @param  {String}   mask
 * @param  {Function} [callback]
 * @return {Promise}
 */
Core.prototype.tech = function (mask, callback) {
  if (callback) {
    this._tech.apply(this, arguments);
    return;
  }

  return promisify(this._tech, this);
};

/**
 * @return {String}
 */
Core.prototype.toString = function () {
  return this.name;
};
