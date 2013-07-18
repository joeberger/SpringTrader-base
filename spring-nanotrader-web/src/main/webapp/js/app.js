/**
 * Module, controllers, directives and factories for Spring Trader app
 * @author Joe Berger
 */
'use strict';

// Declare app level module which depends on filters, and services
var appTrader = angular.module('appTrader', ['ngResource'])//, 'ngCookies'])
.config(function ($routeProvider, $locationProvider, $httpProvider) {
    // Set up our routes
    $routeProvider
      .when('/logout', {
        controller: 'LogoutCtrl',
        template: " "
      })
      .when('/', {
        controller: 'MainCtrl',
        template: " "
      })
      .when('/dashboard', {
        controller: 'DashboardCtrl',
        templateUrl: app.conf.tpls.accountSummaryTest
      })
/*
      .when("/logout", {resolve: {redirect: 'LogoutCtrl'}})
      .when('/', {
          resolve: {
              redirect: function ($route, $location) {
                  debugger;
              }
            }
      })
      .when('/portfolio', {
        controller: 'PortfolioCtrl',
        templateUrl: 'templates/portfolio.html'
      })
      .when('/trade', {
        controller: 'TradeCtrl',
        templateUrl: 'templates/trade.html'
      })

      .otherwise({redirectTo: '/'});
*/
    // Use HTML5 mode (History API) when changing URL
    $locationProvider.html5Mode(true);
    //$httpProvider.defaults.withCredentials = true;
  })

  // Setup Factories that can be requested by any other
  // part of the module, and then injected by Angular
  .factory('MarketSummary', function ($resource) {
    return $resource(app.conf.urls.marketSummary, {
     // query: {method:'GET', isArray:true}
    });
  })
  .factory('Account', function ($resource) {
    return $resource(app.conf.urls.account, {});
  })
  .factory('Orders', function ($resource) {
    return $resource(app.conf.urls.orders, {});
  })
  .factory('Portfolio', function ($resource) {
    return $resource(app.conf.urls.portfolioSummary, {});
  })
  .factory('Holdings', function ($resource) {
    return $resource(app.conf.urls.holdingSummary, {});
  })

  // Controllers
  .controller('MainCtrl', function ($scope, $http) {
    $scope.strings = app.strings; // load i18n strings into scope

    // Check if the user is logged in
    var userSession = $.cookie(app.conf.sessionCookieName);
    if (userSession){
      // set http common headers:
      $http.defaults.headers.common['API_TOKEN'] = angular.fromJson(userSession).authToken;
      //$scope.accountID = angular.fromJson($.cookie(app.conf.sessionCookieName)).accountid;  
      $scope.accountID = angular.fromJson(userSession).accountid; 
      $scope.showLoading = false;
      $scope.showLogin = false;    
    }
    else{
      // Show login form
      $scope.showLoading = false;
      $scope.showLogin = true;   
    }
  })
  .controller('LogoutCtrl', function ($http) { 
    $http.get(app.conf.urls.logout); //, {headers: u_headers});   
    // Remove the session object
    $.cookie(app.conf.sessionCookieName, null); 
    window.location.href = app.conf.baseUrl;   
  })
  .controller('LoginCtrl', function($scope, $rootScope, $http, $routeParams, $location, $filter){
    $scope.logMeIn = function() {
      $http.post(app.conf.urls.login, $filter('json')({username : $scope.username, password : $scope.password}))
        .success(function(data, status, headers, config) {
          //Store the session info in the cookie.
          var info = {
              username : $scope.username,
              accountid : data.accountid,
              profileid : data.profileid,
              authToken : data.authToken
          };
          $.cookie(app.conf.sessionCookieName, $filter('json')(info))
          //$rootScope.showLogin = false;
          window.location.href = app.conf.baseUrl;
        })
        .error(function(data, status, headers, config) {
          $scope.loginError = data.detail;
        });
    }
  })
  .controller('MarketSummaryCtrl', function ($scope, $resource, MarketSummary) {
    $scope.marketSummary = MarketSummary.get();
  })
  .controller('AccountSummaryCtrl', function ($scope, $resource, Account) {
    if ($scope.accountID){
      $scope.account = Account.get({accountId: $scope.accountID});
      $scope.totalMarketValue = 99;
      $scope.gain = 0;
      //inject math object into scope:
      //$scope.Math = window.Math;
    }
  })
  .controller('OrdersCtrl', function ($scope, $resource, Orders) {
    if ($scope.accountID){
      $scope.orders = Orders.get({accountId: $scope.accountID});
    }
  })
  .controller('DashboardCtrl', function ($scope, $resource) {})
  .controller('AssetCtrl', function ($scope, $resource, Account, Portfolio) {
    // data for Asset Distribution
    if($scope.accountID){
      $scope.account = Account.get({accountId: $scope.accountID}, function(account) {
          $scope.account.cashBalance = account.balance;
          $scope.portfolio = Portfolio.get({accountId: $scope.accountID}, function(portfolio) {
              $scope.portfolio.totalMarketValue = portfolio.totalMarketValue;

              var totalAssets = $scope.portfolio.totalMarketValue + $scope.account.cashBalance,
              assetData = [[app.strings.cashBalance, ($scope.account.cashBalance / totalAssets)],
                  [app.strings.portfolioValue, ($scope.portfolio.totalMarketValue / totalAssets)]];
              app.utils.renderPieChart('ad-pie-chart', assetData, $scope); 
          });      
        });
    }
  })
  .controller('GainsCtrl', function ($scope, $resource, Holdings) {
    // data for Daily Top Gains
    if($scope.accountID){
      $scope.holdings = Holdings.get({accountId: $scope.accountID}, function(holdings){
        var i, holdingData = [],
        holdingRollups = holdings.holdingRollups;

        for (i in holdingRollups) {
          if (holdingRollups[i].percent != 0){holdingData.push([holdingRollups[i].symbol, holdingRollups[i].percent]);}            
        }
        app.utils.renderPieChart('dtg-pie-chart', holdingData, $scope);
      });
    }
  })

  .controller('PortfolioCtrl', function ($scope, $resource) {
//    if ($.cookie(app.conf.sessionCookieName)){
//      $scope.accountID = angular.fromJson($.cookie(app.conf.sessionCookieName)).accountid;
//    }
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
  .directive('ordersDir', function(){
    return {
      restrict: 'E',
      // This HTML from template will replace the orders directive.
      replace: true,
      templateUrl: app.conf.tpls.orders      
    }
  })
  .directive('accountSummaryDir', function(){
    return {
      restrict: 'E',
      // This HTML from template will replace the account summary directive.
      replace: true,
      templateUrl: app.conf.tpls.accountSummary      
    }
  })
  .directive('userStatsDir', function(){
    return {
      restrict: 'E',
      // This HTML from template will replace the account summary directive.
      replace: true,
      templateUrl: app.conf.tpls.userStatistics      
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
  .directive('navbarDir', function(){
    return {
      restrict: 'E',
      // This HTML from template will replace the market summary directive.
      replace: true,
      templateUrl: app.conf.tpls.navbar      
    }
  });

//appTrader.run(function($route){});