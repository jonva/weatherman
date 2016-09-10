'use strict';

describe('Service: MapsApiUrl', function () {

  // load the service's module
  beforeEach(module('weatherManApp'));

  // instantiate service
  var MapsApiUrl;
  beforeEach(inject(function (_MapsApiUrl_) {
    MapsApiUrl = _MapsApiUrl_;
  }));

  it('should do something', function () {
    expect(!!MapsApiUrl).toBe(true);
  });

});
