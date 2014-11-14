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

  describe('next', function () {

    beforeEach(function() {
      frame.init(20, 10);
    });

    it('should die current point and activate next point when next is called', function () {
      frame.active(5, 4);
      frame.next();
      expect(frame.getPoint(5, 4).alive).toBe(false);
      expect(frame.getPoint(6, 4).alive).toBe(true);
    });

  });

});
