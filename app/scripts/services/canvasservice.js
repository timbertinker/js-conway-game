'use strict';

/**
 * @ngdoc service
 * @name coderetreatApp.canvasService
 * @description
 * # canvasService
 * Service in the coderetreatApp.
 */
angular.module('coderetreatApp')
  .service('canvasService', [function () {
    var ctx;
    var pointSize = 2;

    return {
      reg: function (canvas) {
        ctx = canvas.getContext('2d');
        ctx.fillStyle = '#000000';
      },
      drawPoint: function(x, y) {
        ctx.fillRect(x * pointSize, y * pointSize, pointSize, pointSize);
      },
      clearPoint: function(x, y) {
        ctx.clearRect(x * pointSize, y * pointSize, pointSize, pointSize);
      }
    };
  }]);
