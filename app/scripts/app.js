'use strict';

/**
 * @ngdoc overview
 * @name weatherManApp
 * @description
 * # weatherManApp
 *
 * Main module of the application.
 */
angular
  .module('weatherManApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var homeState = {
      name: 'home',
      url: '/',
      resolve: {
        weatherData: function() {
          return true;
        },
        all: function() {
          return false;
        },
        lat: function() {
          return null;
        },
        lng: function() {
          return null;
        }
      },
      views: {
        '': {
          templateUrl: 'views/home.html',
        },
        'search@home': {
          templateUrl: 'views/search-tpl.html',
          controller: 'WeatherCtrl'
        }
      }
    };


    var condensedState = {
      name: 'condensed',
      url: '/:lat/:lng/',
      resolve: {
        weatherData: ['Weather', '$stateParams', function(Weather, $stateParams) {
          return Weather.getWeather({
            lat: $stateParams.lat,
            lng: $stateParams.lng
          });
        }],
        all: function(){
          return false;
        },
        lat: ['$stateParams', function($stateParams) {
          return $stateParams.lat;
        }],
        lng: ['$stateParams', function($stateParams) {
          return $stateParams.lng;
        }]
      },
      views: {
        '': {
          templateUrl: 'views/condensed.html'
        },
        'search@condensed': {
          templateUrl: 'views/search-tpl.html',
          controller: 'WeatherCtrl'
        },
        'condensed@condensed': {
          templateUrl: 'views/condensed-tpl.html',
          controller: 'WeatherCtrl'
        }
      }
    };

    var detailedState = {
      name: 'detailed',
      url: '/:lat/:lng/:all/',
      resolve: {
        weatherData: ['Weather', '$stateParams', function(Weather, $stateParams) {
          return Weather.getWeather({
            lat: $stateParams.lat,
            lng: $stateParams.lng
          });
        }],
        all: ['$stateParams', function($stateParams){
          return $stateParams.all === 'all' ? true : false;
        }],
        lat: ['$stateParams', function($stateParams) {
          return $stateParams.lat;
        }],
        lng: ['$stateParams', function($stateParams) {
          return $stateParams.lng;
        }]
      },
      views: {
        '': {
          templateUrl: 'views/condensed.html'
        },
        'search@detailed': {
          templateUrl: 'views/search-tpl.html',
          controller: 'WeatherCtrl'
        },
        'condensed@detailed': {
          templateUrl: 'views/condensed-tpl.html',
          controller: 'WeatherCtrl'
        }
      }
    };

    $stateProvider.state(homeState);
    $stateProvider.state(condensedState);
    $stateProvider.state(detailedState);
    $urlRouterProvider.when('/:lat/:lng', '/:lat/:lng/');
    $urlRouterProvider.when('/:lat/:lng/all', '/:lat/:lng/all/');
    $urlRouterProvider.otherwise('/');
  }]);


