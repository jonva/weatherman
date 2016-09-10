'use strict';

describe('Service: MapsApiKey', function () {

  // load the service's module
  beforeEach(module('weatherManApp'));

  // instantiate service
  var MapsApiKey;
  beforeEach(inject(function (_MapsApiKey_) {
    MapsApiKey = _MapsApiKey_;
  }));

  it('should do something', function () {
    expect(!!MapsApiKey).toBe(true);
  });

});
