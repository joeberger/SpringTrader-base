/**
 * Modules of Spring Trader app
 * @author Joe Berger
 */

'use strict';

// Declare app level module which depends on filters, and services
angular.module('appTrader', ['ngResource'])
.config(function ($routeProvider, $locationProvider) {
    // Set up our routes
    $routeProvider
      .when('/dashboard', {
        controller: 'DashboardCtrl',
        templateUrl: 'templates/dashboard.html'
      })
      .when('/marketSummary', {
        controller: 'marketSummaryCtrl',
        templateUrl: 'templates/marketSummary.html'
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

    // Use HTML5 mode (History API) when changing URL
    $locationProvider.html5Mode(true);
  })


  // Setup Factories that can be requested by any other
  // part of the module, and then injected by Angular
  .factory('accountProfile', function ($resource) {
    //return $resource('/api/contact/:name', { name: '@name.clean' });
    return $resource('/spring-nanotrader-services/api/accountProfile', {});
    
  })
  .factory('marketSummary', function ($resource) {
    return $resource(app.conf.urls.marketSummary, {});
  })
  .factory('holdingSummary', function ($resource) {
    return $resource('/spring-nanotrader-services/api/holdingSummary', {});
  })
  .factory('portfolioSummary', function ($resource) {
    return $resource('/spring-nanotrader-services/api/portfolioSummary', {});
  })

  // Controllers
  .controller('marketSummaryCtrl', function ($scope, $resource) {


  })
  .controller('DashboardCtrl', function ($scope, $resource) {})
  .controller('PortfolioCtrl', function ($scope, $resource, portfolioSummary) {
    // Use the $resource query method to grab all contacts
    $scope.contacts = Contact.query();
  })
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