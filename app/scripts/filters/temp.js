'use strict';

/**
 * @ngdoc filter
 * @name weatherManApp.filter:temp
 * @function
 * @description
 * # temp
 * Filter in the weatherManApp.
 */
angular.module('weatherManApp')
  .filter('temp', ['$filter', function ($filter) {
    return function (input, filterOn) {
      if (angular.isUndefined(filterOn) || filterOn === null || !angular.isNumber(input)) {
        return input;
      }
      else {
        switch(filterOn.toLowerCase()) {
          case 'k':
            return $filter('number')(input, 1);
          case 'kelvin':
            return $filter('number')(input, 1) + ' K';
          case 'c':
            return $filter('number')(input - 273.15, 1) + ' ˚C';
          case 'celsius':
            return $filter('number')(input - 273.15, 1) + ' ˚C';;
          case 'f':
            return $filter('number')(input * (9/5) - 459.67, 1) + ' ˚F';
          case 'fahrenheit':
            return $filter('number')(input * (9/5) - 459.67, 1) + ' ˚F';;
          default:
            return $filter('number')(input, 1) + ' K';
        }
      }
    };
  }]);
