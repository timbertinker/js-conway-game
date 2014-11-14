'use strict';

describe('Directive: canvas', function () {

  // load the directive's module
  beforeEach(module('coderetreatApp'));

  var element, scope, canvasService, game;

  beforeEach(inject(function ($rootScope, $compile, _canvasService_, gameService) {
    scope = $rootScope.$new();
    canvasService = _canvasService_;
    game = gameService;
    spyOn(canvasService, 'reg');

    spyOn(game, 'start');
    spyOn(game, 'pause');

    element = angular.element('<canvas></canvas>');
    element = $compile(element)(scope);
  }));

  it('should register html element to canvas service', inject(function () {
    expect(canvasService.reg).toHaveBeenCalledWith(element[0]);
  }));

  it('should start game by default', inject(function () {
    expect(game.start.calls.count()).toEqual(1);
    expect(game.pause.calls.count()).toEqual(0);
  }));

  it('should pause game when click canvas element', inject(function () {
    element.click();
    expect(game.start.calls.count()).toEqual(1);
    expect(game.pause.calls.count()).toEqual(1);
  }));

  it('should start game again when click canvas element twice', inject(function () {
    element.click().click();
    expect(game.start.calls.count()).toEqual(2);
    expect(game.pause.calls.count()).toEqual(1);
  }));

});
