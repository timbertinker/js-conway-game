'use strict';

/**
 * @ngdoc service
 * @name coderetreatApp.toggle
 * @description
 * # toggle
 * Factory in the coderetreatApp.
 */
angular.module('coderetreatApp')
  .factory('toggleFactory', function () {
    return function(f1, f2) {
      var running = false;
      return function () {
        if (running) {
          running = false;
          f2();
        } else {
          running = true;
          f1();
        }
      };
    };
  });
