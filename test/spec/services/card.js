'use strict';

describe('Service: Card', function () {

  // load the service's module
  beforeEach(module('weatherManApp'));

  // instantiate service
  var Card;
  beforeEach(inject(function (_Card_) {
    Card = _Card_;
  }));

  it('should do something', function () {
    expect(!!Card).toBe(true);
  });

});
