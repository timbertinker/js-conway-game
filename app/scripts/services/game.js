'use strict';

/**
 * @ngdoc service
 * @name coderetreatApp.game
 * @description
 * # game
 * Service in the coderetreatApp.
 */
angular.module('coderetreatApp')
  .service('gameService', ['$interval', 'frameService', 'canvasService', function ($interval, frame, canvas) {
    var timeoutId;
    function refresh() {
      frame.next();
      frame.eachPoint(function(x, y, alive){
        if (alive) {
          canvas.drawPoint(x, y);
        } else {
          canvas.clearPoint(x, y);
        }
      });
    }
    return {
      speed: 500,
      start: function () {
        frame.init(350, 200);
        frame.active(1, 1);
        frame.active(2, 2);
        frame.active(5, 10);
        timeoutId = $interval(refresh, this.speed);
      },
      pause: function () {
        $interval.cancel(timeoutId);
      }
    };
  }]);
