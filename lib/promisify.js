'use strict';

/**
 * Оборачивает функцию в промис
 * @param  {Function} fn
 * @param  {Object}   ctx
 * @return {Function}
 */
module.exports = function (fn, ctx) {
  return function () {
    var args = Array.prototype.slice.call(arguments, 0, fn.length - 1);

    return new Promise(function (resolve, reject) {
      args.push(function (err) {
        err ? reject(err) : resolve(arguments[1] || args[1]);
      });

      fn.apply(ctx, args);
    });
  };
}
