/**
 * Module, controllers, directives and factories for Spring Trader app
 * @author Joe Berger
 */

'use strict';

// Declare app level module which depends on filters, and services
var appTrader = angular.module('appTrader', ['ngResource', 'ngCookies'])
.config(function ($routeProvider, $locationProvider) {
    // Set up our routes
    $routeProvider
/*      .when('/login',{
        controller: 'LoginCtrl'
      })
      .when('/', {
        controller: 'marketSummaryCtrl',
        templateUrl: app.conf.tpls.marketSummary
      })
     
      .when('/dashboard', {
        controller: 'DashboardCtrl'//,
        //templateUrl: 'templates/dashboard.html'
      })
      .when('/portfolio', {
        controller: 'PortfolioCtrl',
        templateUrl: 'templates/portfolio.html'
      })
      .when('/trade', {
        controller: 'TradeCtrl',
        templateUrl: 'templates/trade.html'
      })
      .otherwise({redirectTo: '/dashboard'});
*/
    // Use HTML5 mode (History API) when changing URL
    $locationProvider.html5Mode(true);
  })


  // Setup Factories that can be requested by any other
  // part of the module, and then injected by Angular
  .factory('marketSummary', function ($resource) {
    return $resource(app.conf.urls.marketSummary, {
     // query: {method:'GET', isArray:true}
    });
  })
/*
  .factory('accountProfile', function ($resource) {
    //return $resource('/api/contact/:name', { name: '@name.clean' });
    return $resource('/spring-nanotrader-services/api/accountProfile', {});    
  })
  .factory('holdingSummary', function ($resource) {
    return $resource('/spring-nanotrader-services/api/holdingSummary', {});
  })
  .factory('portfolioSummary', function ($resource) {
    return $resource('/spring-nanotrader-services/api/portfolioSummary', {});
  })
*/

  // Controllers
  .controller('mainCtrl', function ($scope, $cookieStore) {
    $scope.strings = app.strings; // load i18n strings into scope

    // Check if the user is logged in
    var userSession = $cookieStore.get(app.conf.sessionCookieName);

    if (!userSession){
      // Show login form
      $scope.showLoading = false;
      $scope.showLogin = true;
      
    }
  })
  .controller('LoginCtrl', function($scope, $http, $routeParams, $location, $filter){
    $scope.logMeIn = function() {
      $http.post(app.conf.urls.login, $filter('json')({username : $scope.username, password : $scope.password}))
        .success(function(data, status, headers, config) {
          $scope.showLogin = false;

          debugger;
          // this callback will be called asynchronously
          // when the response is available
        })
        .error(function(data, status, headers, config) {
          debugger;
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });
    }

  })
  .controller('marketSummaryCtrl', function ($scope, $resource, marketSummary) {
    $scope.marketSummary = marketSummary.get();
  })

  // Directives
  .directive('marketSummaryDir', function(){
    return {
      restrict: 'E',
      // This HTML from template will replace the market summary directive.
      replace: true,
      templateUrl: app.conf.tpls.marketSummary      
    }
  })
  .directive('loginDir', function(){
    return {
      restrict: 'E',
      // This HTML from template will replace the market summary directive.
      replace: true,
      templateUrl: app.conf.tpls.login      
    }
  })
/*
  .controller('DashboardCtrl', function ($scope, $resource) {})
  .controller('PortfolioCtrl', function ($scope, $resource, portfolioSummary) {});

  .controller('TradeCtrl', function ($scope, $resource, $routeParams, Contact, $timeout, $location) {
    // Grab just a single contact
    $scope.contact = Contact.get({ name: $routeParams.name });

    // Throttle the save POST request
    var saveTimeout;
    $scope.save = function () {
      $timeout.cancel(saveTimeout);
      saveTimeout = $timeout(function () {
        // Save the contact and then update the scope & URL with what came
        // back from the server
        $scope.contact.$save(function (updated_contact) {
          $scope.contact = updated_contact;
          $location.path('/contact/' + updated_contact.name.clean).replace();
        });
      }, 1000);
    };
  })
  .controller('Add', function ($scope, $resource, Contact, $location) {
    // Create a new contact
    $scope.contact = new Contact({});

    // Save and redirect back home
    $scope.save = function () {
      $scope.contact.$save(function () {
        $location.path('/');
      });
    };
  });
*/
;