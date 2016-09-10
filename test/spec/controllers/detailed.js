'use strict';

describe('Controller: DetailedCtrl', function () {

  // load the controller's module
  beforeEach(module('weatherManApp'));

  var DetailedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DetailedCtrl = $controller('DetailedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DetailedCtrl.awesomeThings.length).toBe(3);
  });
});
