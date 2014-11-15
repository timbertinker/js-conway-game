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
      frame.eachPoint(function (x, y, point) {
        if (point.alive) {
          canvas.drawPoint(x, y);
        } else {
          canvas.clearPoint(x, y);
        }
      });
    }

    return {
      speed: 200,
      start: function () {
        frame.init(350, 200);
        this.initAlives();
        this.resume();
      },
      initAlives: function () {
        var alivePoint = Math.floor(Math.random() * 350 * 200);
        for (var i = 0; i < alivePoint; i++) {
          var x = Math.floor(Math.random() * 350);
          var y = Math.floor(Math.random() * 200);
          frame.active(x, y);
        }
      },
      resume: function () {
        timeoutId = $interval(refresh, this.speed);
      },
      pause: function () {
        $interval.cancel(timeoutId);
      }
    };
  }]);
