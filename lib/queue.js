'use strict';

var events = require('events');
var util = require('util');

var EventEmitter = events.EventEmitter;

var inherits = util.inherits;

function Queue() {
  EventEmitter.call(this);
}

inherits(Queue, EventEmitter);

var proto = Queue.prototype;

/**
 * @param {Number} count
 */
proto._addOrders = function (count) {
  this._orders = (this._orders || 0) + (count || 1);
};

/**
 * @emits {done}
 */
proto._checkOrders = function () {
  if (this._orders === 0) {
    this.emit('done');
  }
};

proto._removeOrder = function () {
  this._orders--;
};

module.exports = Queue;
