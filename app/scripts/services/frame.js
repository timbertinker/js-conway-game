'use strict';

/**
 * @ngdoc service
 * @name coderetreatApp.frame
 * @description
 * # frame
 * Service in the coderetreatApp.
 */
angular.module('coderetreatApp')
  .service('frameService', function () {
    var point = function () {
      return {
        alive: false,
        active: function () {
          this.alive = true;
        }
      };
    };

    return {
      points: [],
      init: function (width, height) {
        for (var y = 0; y < height; y++) {
          var line = [];
          for (var x = 0; x < width; x++) {
            line.push(point());
          }
          this.points.push(line);
        }
      },
      active: function (x, y) {
        this.getPoint(x, y).active();
      },
      next: function () {
        var newPoints = [];
        this.points.forEach(function (line) {
          var newLine = [point()];
          line.forEach(function(p){
            newLine.push(p);
          });
          newPoints.push(newLine.slice(0, -1));
        });
        this.points = newPoints;
      },
      eachPoint: function(callback) {
        this.points.forEach(function (line, y) {
          line.forEach(function (p, x) {
            callback(x, y, p.alive);
          });
        });
      },
      getPoint: function(x, y) {
        return this.points[y][x];
      }
    };
  });
