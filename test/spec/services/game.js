'use strict';

describe('Service: game', function () {

  // load the service's module
  beforeEach(module('coderetreatApp'));

  // instantiate service
  var $interval, game, frame, refreshPeriod, canvas, drawPoint;
  beforeEach(inject(function (_$interval_, gameService, frameService, canvasService) {
    $interval = _$interval_;
    game = gameService;
    frame = frameService;
    canvas = canvasService;
    refreshPeriod = game.speed;
    spyOn(frame, 'init');
    spyOn(frame, 'active');
    spyOn(frame, 'next');
    spyOn(frame, 'eachPoint').and.callFake(function (_drawPoint_) {
      drawPoint = _drawPoint_;
    });

    spyOn(canvas, 'drawPoint');
    spyOn(canvas, 'clearPoint');
  }));

  describe('start', function(){
    beforeEach(function(){
      game.start();
    });

    it('should init a first frame', function () {
      expect(frame.init).toHaveBeenCalled();
    });

    it('should refresh frame after a refresh period when game is started', inject(function () {
      $interval.flush(refreshPeriod);
      expect(frame.next).toHaveBeenCalled();
    }));

    it('should refresh frame twice after two refresh period when game is started', inject(function () {
      $interval.flush(refreshPeriod * 2);
      expect(frame.next.calls.count()).toEqual(2);
    }));

    it('should draw point when it is alive', inject(function () {
      $interval.flush(refreshPeriod);
      expect(frame.eachPoint).toHaveBeenCalled();

      drawPoint(1, 2, true);
      expect(canvas.drawPoint).toHaveBeenCalledWith(1, 2);
      expect(canvas.clearPoint.calls.any()).toBe(false);
    }));

    it('should clear point when it is died', inject(function () {
      $interval.flush(refreshPeriod);

      drawPoint(1, 2, false);
      expect(canvas.clearPoint).toHaveBeenCalledWith(1, 2);
      expect(canvas.drawPoint.calls.any()).toBe(false);
    }));

  });

  describe('pause', function(){
    it('should not refresh frames anymore when game is paused', function() {
      game.start();
      game.pause();
      $interval.flush(refreshPeriod);
      expect(frame.next.calls.any()).toBe(false);
    })
  });

});
