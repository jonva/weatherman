'use strict';

/**
 * @ngdoc function
 * @name weatherManApp.controller:WeatherCtrl
 * @description
 * # WeatherCtrl
 * Controller of the weatherManApp
 */
angular.module('weatherManApp')
  .controller('WeatherCtrl', function($scope, weatherData, all, lat, lng, IconUrl, $stateParams, Search, Weather, $filter) {
    $scope.all = all;
    $scope.lat = lat;
    $scope.lng = lng;
    function urlIze(icon) {
      return IconUrl + icon + '.png';
    }

    function condensedWeather(weatherResponse) {

      return {
        city: weatherResponse.city.name,
        country: weatherResponse.city.country,
        list: weatherResponse.list.map(function(listItem) {
          return {
            time: new Date(listItem.dt),
            temp: listItem.main.temp,
            humidity: listItem.main.humidity,
            weather: {
              main: listItem.weather[0].main,
              icon: urlIze(listItem.weather[0].icon)
            }
          };
        })
      };
    }

    $scope.getCity = function() {
      if($scope.searchKey.length > 3) {
      Search.returnCoordinates($scope, $scope.searchKey);
      }
      else {
        return;
      }
    };

    if($stateParams.lat && $stateParams.lng) {
      $scope.condensedWeather = condensedWeather(weatherData.data);
    }
  });
