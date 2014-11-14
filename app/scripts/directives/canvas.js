'use strict';

/**
 * @ngdoc directive
 * @name coderetreatApp.directive:canvas
 * @description
 * # canvas
 */
angular.module('coderetreatApp')
  .directive('canvas', ['$interval', 'gameService', 'toggleFactory', 'canvasService',
    function ($interval, game, toggle, canvasService) {
      return {
        restrict: 'E',
        link: function (scope, element) {
          canvasService.reg(element[0]);

          var toggleAutoDraw = toggle(function () {
            game.start();
          }, function () {
            game.pause();
          });

          element.on('click', toggleAutoDraw).click();

        }
      };
    }]);
