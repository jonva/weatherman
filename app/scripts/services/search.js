'use strict';

/**
 * @ngdoc service
 * @name weatherManApp.Search
 * @description
 * # Search
 * Service in the weatherManApp.
 */
angular.module('weatherManApp')
  .service('Search', function() {
    this.returnCoordinates = function(scope, city) {
      var geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({
        'address': city
      }, function(results, status) {
        if (status === window.google.maps.GeocoderStatus.OK) {
          scope.searchResults = results.map(function(result) {
            return {
              adddress: result.formatted_address,
              coordinates: {
                lat: result.geometry.location.lat(),
                lng: result.geometry.location.lng()
              }
            };
          });
          scope.$apply();
        } else {
          console.log("Something got wrong " + status);
        }
      });
    };
  });
