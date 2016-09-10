'use strict';

/**
 * @ngdoc service
 * @name weatherManApp.weather
 * @description
 * # weather
 * Factory in the weatherManApp.
 */
angular.module('weatherManApp')
  .factory('Weather', function(ApiKey, ApiUrl, $http) {
    var weatherServiceFactory = {
      getWeather: function(coordinates) {
        return $http({
          url: ApiUrl,
          params: {
            APPID: ApiKey,
            lat: coordinates.lat,
            lon: coordinates.lng
          }
        });
      }
    };
    return weatherServiceFactory;
  });
