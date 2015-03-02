'use strict';

/**
 * Возвращает функцию, которая позволяет вызывать конструтор без оператора new.
 * @todo  Подумать о добавление св-ва constructor
 * @param  {Function} constructor
 * @return {Function}
 */
function wrap(constructor) {
  return function () {
    var component = Object.create(constructor.prototype);
    constructor.apply(component, arguments);
    return component;
  }
}

/**
 * @param  {String} component
 * @return {Function|Object}
 */
exports.create = function (component) {
  var constructor = wrap(function () {});
  var slice = Array.prototype.slice;

  if (arguments.length > 1) {
    return constructor.apply(null, slice.call(arguments, 1));
  } else {
    return constructor;
  }
};
