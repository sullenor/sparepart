'use strict';

var util = require('util');

function SpareError() {
  Error.apply(this, arguments);
}

util.inherits(SpareError, Error);

module.exports = SpareError;
