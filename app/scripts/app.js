"use strict";
angular.module("weatherManApp", ["ui.router"]).config(["$stateProvider", "$urlRouterProvider",
  function(a, b) {
    var c = {
        name: "home",
        url: "/",
        resolve: {
          weatherData: function() {
            return !0
          },
          all: function() {
            return !1
          },
          lat: function() {
            return null
          },
          lng: function() {
            return null
          }
        },
        views: {
          "": {
            templateUrl: "views/home.html"
          },
          "search@home": {
            templateUrl: "views/search-tpl.html",
            controller: "WeatherCtrl"
          }
        }
      },
      d = {
        name: "condensed",
        url: "/:lat/:lng/",
        resolve: {
          weatherData: ["Weather", "$stateParams",
            function(a, b) {
              return a.getWeather({
                lat: b.lat,
                lng: b.lng
              })
            }
          ],
          all: function() {
            return !1
          },
          lat: ["$stateParams",
            function(a) {
              return a.lat
            }
          ],
          lng: ["$stateParams",
            function(a) {
              return a.lng
            }
          ]
        },
        views: {
          "": {
            templateUrl: "views/condensed.html"
          },
          "search@condensed": {
            templateUrl: "views/search-tpl.html",
            controller: "WeatherCtrl"
          },
          "condensed@condensed": {
            templateUrl: "views/condensed-tpl.html",
            controller: "WeatherCtrl"
          }
        }
      },
      e = {
        name: "detailed",
        url: "/:lat/:lng/:all/",
        resolve: {
          weatherData: ["Weather", "$stateParams",
            function(a, b) {
              return a.getWeather({
                lat: b.lat,
                lng: b.lng
              })
            }
          ],
          all: ["$stateParams",
            function(a) {
              return "all" === a.all ? !0 : !1
            }
          ],
          lat: ["$stateParams",
            function(a) {
              return a.lat
            }
          ],
          lng: ["$stateParams",
            function(a) {
              return a.lng
            }
          ]
        },
        views: {
          "": {
            templateUrl: "views/condensed.html"
          },
          "search@detailed": {
            templateUrl: "views/search-tpl.html",
            controller: "WeatherCtrl"
          },
          "condensed@detailed": {
            templateUrl: "views/condensed-tpl.html",
            controller: "WeatherCtrl"
          }
        }
      };
    a.state(c), a.state(d), a.state(e), b.when("/:lat/:lng", "/:lat/:lng/"), b.when("/:lat/:lng/all", "/:lat/:lng/all/"), b.otherwise("/")
  }
]), angular.module("weatherManApp").factory("Weather", ["WeatherApiKey", "WeatherApiUrl", "$http",
  function(a, b, c) {
    var d = {
      getWeather: function(d) {
        return c({
          url: b,
          params: {
            APPID: a,
            lat: d.lat,
            lon: d.lng
          }
        })
      }
    };
    return d
  }
]), angular.module("weatherManApp").value("WeatherApiKey", "102f327c431a12ac7868d08379d9eb88"), angular.module("weatherManApp").value("WeatherApiUrl", "http://api.openweathermap.org/data/2.5/forecast"), angular.module("weatherManApp").value("IconUrl", "http://openweathermap.org/img/w/"),
angular.module("weatherManApp").controller("WeatherCtrl", ["$scope", "weatherData", "all", "lat", "lng", "IconUrl", "$stateParams", "Search",
  function(a, b, c, d, e, f, g, h) {
    function i(a) {
      return f + a + ".png"
    }

    function j(a) {
      return {
        city: a.city.name,
        country: a.city.country,
        list: a.list.map(function(a) {
          return {
            time: new Date(a.dt),
            temp: a.main.temp,
            humidity: a.main.humidity,
            weather: {
              main: a.weather[0].main,
              icon: i(a.weather[0].icon)
            }
          }
        })
      }
    }
    a.all = c, a.lat = d, a.lng = e, a.getCity = function() {
      a.searchKey.length > 3 && h.returnCoordinates(a, a.searchKey)
    }, g.lat && g.lng && (a.condensedWeather = j(b.data))
  }
]), angular.module("weatherManApp").service("Search", function() {
  this.returnCoordinates = function(a, b) {
    var c = new window.google.maps.Geocoder;
    c.geocode({
      address: b
    }, function(b, c) {
      c === window.google.maps.GeocoderStatus.OK ? (a.searchResults = b.map(function(a) {
        return {
          adddress: a.formatted_address,
          coordinates: {
            lat: a.geometry.location.lat(),
            lng: a.geometry.location.lng()
          }
        }
      }), a.$apply()) : console.log("Something got wrong " + c)
    })
  }
}), angular.module("weatherManApp").filter("unique", function() {
  return function(a, b) {
    if (b === !1) return a;
    if ((b || angular.isUndefined(b)) && angular.isArray(a)) {
      var c = [],
        d = function(a) {
          return angular.isObject(a) && angular.isString(b) ? a[b] : a
        };
      angular.forEach(a, function(a) {
        for (var b = !1, e = 0; e < c.length; e++)
          if (angular.equals(d(c[e]), d(a))) {
            b = !0;
            break
          }
        b || c.push(a)
      }), a = c
    }
    return a
  }
}), angular.module("weatherManApp").filter("temp", ["$filter",
  function(a) {
    return function(b, c) {
      if (angular.isUndefined(c) || null === c || !angular.isNumber(b)) return b;
      switch (c.toLowerCase()) {
        case "k":
          return a("number")(b, 1);
        case "kelvin":
          return a("number")(b, 1) + " K";
        case "c":
          return a("number")(b - 273.15, 1) + " ˚C";
        case "celsius":
          return a("number")(b - 273.15, 1) + " ˚C";
        case "f":
          return a("number")(1.8 * b - 459.67, 1) + " ˚F";
        case "fahrenheit":
          return a("number")(1.8 * b - 459.67, 1) + " ˚F";
        default:
          return a("number")(b, 1) + " K"
      }
    }
  }
]), angular.module("weatherManApp").run(["$templateCache",
  function(a) {
    a.put("views/condensed-tpl.html", '<article class="weather-card container"> <div class="row"> <span class="col-xs-12 location"> <div class="row"> <h3 class="city-name col-xs-6" ng-bind="condensedWeather.city"></h3> <h3 class="country-name col-xs-6" ng-bind="condensedWeather.country"></h3> </div> </span> <select class="hidden filter-date" ng-model="filterDate" ng-options="day.time for day in condensedWeather.list" ng-init="(all) ? filterDate.time = \'\' : filterDate.time = condensedWeather.list[0]"> </select> </div> <div class="row"> <ul class="hour-list col-xs-12"> <li class="hour row" ng-repeat="hour in condensedWeather.list | filter: filterDate.time"> <span class="time col-lg-2 col-md-2 col-sm-2 col-xs-12"> <div class="row title" ng-bind="\'Time\'"></div> <div class="row" ng-bind="hour.time | date :\'EEE HHmm \'"></div> </span> <span class="temp col-lg-2 col-md-2 col-sm-2 col-xs-12"> <div class="row title" ng-bind="\'Temp\'"></div> <div class="row" ng-bind="hour.temp | temp: \'c\'"></div> </span> <span class="humidity col-lg-2 col-md-2 col-sm-2 col-xs-12"> <div class="row title" ng-bind="\'Humidity\'"></div> <div class="row" ng-bind="hour.humidity"></div> </span> <span class="weather-icon col-lg-2 col-md-2 col-sm-2 col-xs-12"> <img ng-src="{{hour.weather.icon}}" class="weather-icon-img"> </span> <span class="weather-main col-lg-4 col-md-4 col-sm-4 col-xs-12" ng-bind="hour.weather.main"> </span> <span class="col-xs-12" ng-show="!all"> <a ui-sref="detailed({lat: lat,lng: lng,all: \'all\'})" class="row"> <h4 ng-bind="\'Full forecast\'" class="col-xs-12"></h4> </a> </span> </li> </ul> </div> </article>'), a.put("views/condensed.html", '<div ui-view="search" class="search-box row"></div> <div ui-view="condensed" class="row"></div>'), a.put("views/home.html", '<div ui-view="search"></div>'), a.put("views/search-tpl.html", '<div class="header container search-container"> <div class="row search-bar"> <div class="col-xs-12"> <input type="text" class="city-search form-control" placeholder="Search for city or coordinates...." ng-model="searchKey" ng-change="getCity()"> </div> </div> <ul class="city-search-results row"> <li ng-repeat="result in searchResults" class="col-xs-12"> <a ui-sref="condensed({lat: result.coordinates.lat, lng: result.coordinates.lng})">{{result.adddress}}</a> </li> </ul> </div>')
  }
]);
