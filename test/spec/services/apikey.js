'use strict';

describe('Service: ApiKey', function () {

  // load the service's module
  beforeEach(module('weatherManApp'));

  // instantiate service
  var ApiKey;
  beforeEach(inject(function (_ApiKey_) {
    ApiKey = _ApiKey_;
  }));

  it('should do something', function () {
    expect(!!ApiKey).toBe(true);
  });

});
