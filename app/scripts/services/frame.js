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
        var self = this;
        var newPoints = [];
        this.eachPoint(function (x, y, p) {
          var newPoint = point();
          if (p.alive && self.aliveNeighbours(x, y) === 2 ||
            self.aliveNeighbours(x, y) === 3) {
            newPoint.active();
          }
          if (!newPoints[y]) {
            newPoints[y] = [];
          }
          newPoints[y].push(newPoint);
        });
        this.points = newPoints;
      },
      eachPoint: function (callback) {
        this.points.forEach(function (line, y) {
          line.forEach(function (p, x) {
            callback(x, y, p);
          });
        });
      },
      getPoint: function (x, y) {
        try {
          var p = this.points[y][x];
          return p ? p : point();
        } catch (e) {
        }
        return point();
      },
      neighbours: function (x, y) {
        var nbs = [];
        for (var i = -1; i <= 1; i++) {
          for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0){
              continue;
            }
            nbs.push(this.getPoint(x + i, y + j));
          }
        }
        return nbs;
      },
      aliveNeighbours: function (x, y) {
        var aliveCount = 0;
        this.neighbours(x, y).forEach(function (p) {
          if (p.alive) {
            aliveCount++;
          }
        });
        return aliveCount;
      }
    };
  });
