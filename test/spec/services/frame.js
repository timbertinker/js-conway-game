'use strict';

describe('Service: frame', function () {

  // load the service's module
  beforeEach(module('coderetreatApp'));

  var pointMock = function (alive) {
    return jasmine.objectContaining({alive: alive});
  };

  // instantiate service
  var frame;
  beforeEach(inject(function (_frameService_) {
    frame = _frameService_;
  }));

  it('should create a empty block when init a frame with 0 line', function () {
    frame.init(0, 0);
    expect(frame.points).toEqual([]);
  });

  it('should create a block by specified width and height when init a frame', function () {
    frame.init(1, 2);
    expect(frame.points).toEqual([
      [pointMock(false)],
      [pointMock(false)]
    ]);
  });

  it('should make a point alive when it is activated', function () {
    frame.init(1, 1);
    frame.active(0, 0);
    expect(frame.points).toEqual([
      [pointMock(true)]
    ]);
  });

  it('should process all point when eachPoint is called', function () {
    frame.init(2, 3);
    var callback = jasmine.createSpy('callback');
    frame.eachPoint(callback);
    expect(callback.calls.count()).toEqual(6);
  });

  describe('aliveNeighbours', function () {

    beforeEach(function () {
      frame.init(3, 3);
    });

    it('should always return eight points', function () {
      var nbs = frame.neighbours(0, 0);
      expect(nbs.length).toEqual(8);
      expect(frame.aliveNeighbours(0, 0)).toEqual(0);
    });

    it('should have one alive point', function () {
      frame.active(1, 2);
      frame.active(1, 1);
      expect(frame.aliveNeighbours(1, 1)).toEqual(1);
    });

  });

  describe('next', function () {

    beforeEach(function () {
      frame.init(3, 3);
    });

    it('should return next frame with all died points when points given were died', function () {
      frame.next();
      var checkPoint = jasmine.createSpy('checkPoint');
      frame.eachPoint(function (x, y, point) {
        checkPoint();
        expect(point.alive).toBe(false);
      });
      expect(checkPoint.calls.count()).toEqual(9);
    });

    it('should return next frame with one alive point when there is two points beside it', function () {
      frame.active(1, 1);
      frame.active(0, 2);
      frame.active(2, 0);
      frame.next();
      var checkPoint = jasmine.createSpy('checkPoint');
      frame.eachPoint(function (x, y, point) {
        checkPoint();
        if (x == 1 && y == 1) {
          expect(point.alive).toBe(true);
        } else {
          expect(point.alive).toBe(false);
        }
      });
      expect(checkPoint.calls.count()).toEqual(9);
    });

    it('should return next frame with one alive point when there is three points beside it', function () {
      frame.active(0, 0);
      frame.active(0, 2);
      frame.active(2, 0);
      frame.next();
      var checkPoint = jasmine.createSpy('checkPoint');
      frame.eachPoint(function (x, y, point) {
        checkPoint();
        if (x == 1 && y == 1) {
          expect(point.alive).toBe(true);
        } else {
          expect(point.alive).toBe(false);
        }
      });
      expect(checkPoint.calls.count()).toEqual(9);
    });
  });

});
