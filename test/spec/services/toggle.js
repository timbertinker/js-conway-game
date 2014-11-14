'use strict';

describe('Service: toggle', function () {

  // load the service's module
  beforeEach(module('coderetreatApp'));

  // instantiate service
  var toggle, function1, function2;
  beforeEach(inject(function (_toggleFactory_) {
    function1 = jasmine.createSpy('function1');
    function2 = jasmine.createSpy('function2');
    toggle = _toggleFactory_(function1, function2);
  }));

  it('should do something', function () {
    expect(!!toggle).toBe(true);
  });

  it('should trigger first function when toggle is triggered', function() {
    toggle();
    expect(function1).toHaveBeenCalled();
    expect(function2.calls.any()).toBe(false);
  });

  it('should trigger second function when toggle is triggered twice', function() {
    toggle();
    toggle();
    expect(function2).toHaveBeenCalled();
  });

  it('should trigger first function again when toggle is triggered 3 times', function() {
    toggle();
    toggle();
    toggle();
    expect(function1.calls.count()).toEqual(2);
    expect(function2.calls.count()).toEqual(1);
  });

});
