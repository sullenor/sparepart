'use strict';

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path');
var util = require('util');

/**
 * @param  {string}   directory
 * @param  {object}   [options]
 * @param  {number}   [options.depth] Глубина обхода. По умолчанию, 2.
 * @param  {function} callback
 */
module.exports = function sparepart(directory, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  _.defaults(options, {
    depth: 2
  });

  new DirReader(directory, options.depth, callback);
};

/**
 * @param {string}   directory
 * @param {number}   depth
 * @param {function} callback
 */
function DirReader(directory, depth, callback) {
  var that = this;
  var tree = {};

  EventEmitter.call(that);

  that.once('error', function (err) {
    callback(err);
  });

  that.on('done', function () {
    if (that._stack !== 0) {
      return;
    }

    callback(null, tree);
  });

  that.on('file', function (file) {
    fs.stat(file, function (err, stats) {
      if (err) {
        return that.emit('error', err);
      }

      that._stack--;

      if (stats.isDirectory()) {
        if (depth > 1) {
          new DirReader(file, depth - 1, function (err, descendantTree) {
            if (err) {
              return that.emit(err);
            }

            tree[file] = descendantTree;
            that._stack--;
            that.emit('done');
          });

          that._stack++;
        } else {
          tree[file] = {};
        }
      }

      if (stats.isFile()) {
        tree[file] = null;
      }

      that.emit('done');
    });
  });

  fs.readdir(directory, function (err, files) {
    if (err) {
      return that.emit('error', err);
    }

    files.forEach(function (file) {
      that.emit('file', path.join(directory, file));
    });

    that._stack = files.length;
  });
}

util.inherits(DirReader, EventEmitter);
