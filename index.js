'use strict';

var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var path = require('path');
var util = require('util');

/**
 * @param  {string}   directory
 * @param  {object}   [options]
 * @param  {function} callback
 */
module.exports = function sparepart(directory, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  new DirReader(directory, {}, 2, callback);
};

/**
 * @param {string}   directory
 * @param {object}   tree
 * @param {number}   depth
 * @param {function} callback
 */
function DirReader(directory, tree, depth, callback) {
  var that = this;

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
        tree[file] = {};

        if (depth > 1) {
          new DirReader(file, tree[file], --depth, function (err) {
            if (err) {
              return that.emit(err);
            }

            that._stack--;
            that.emit('done');
          });

          that._stack++;
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
