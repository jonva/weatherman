'use strict';

describe('Service: ApiUrl', function () {

  // load the service's module
  beforeEach(module('weatherManApp'));

  // instantiate service
  var ApiUrl;
  beforeEach(inject(function (_ApiUrl_) {
    ApiUrl = _ApiUrl_;
  }));

  it('should do something', function () {
    expect(!!ApiUrl).toBe(true);
  });

});
