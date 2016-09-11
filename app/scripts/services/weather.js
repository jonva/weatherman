'use strict';

/**
 * @ngdoc service
 * @name weatherManApp.weather
 * @description
 * # weather
 * Factory in the weatherManApp.
 */
angular.module('weatherManApp')
  .factory('Weather', ['WeatherApiKey', 'WeatherApiUrl', '$http', function(WeatherApiKey, WeatherApiUrl, $http) {
    var weatherServiceFactory = {
      getWeather: function(coordinates) {
        return $http({
          url: WeatherApiUrl,
          params: {
            APPID: WeatherApiKey,
            lat: coordinates.lat,
            lon: coordinates.lng
          }
        });
      }
    };
    return weatherServiceFactory;
  }]);
