'use strict';

describe('Service: IconUrl', function () {

  // load the service's module
  beforeEach(module('weatherManApp'));

  // instantiate service
  var IconUrl;
  beforeEach(inject(function (_IconUrl_) {
    IconUrl = _IconUrl_;
  }));

  it('should do something', function () {
    expect(!!IconUrl).toBe(true);
  });

});
