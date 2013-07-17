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
/*
  .factory('accountProfile', function ($resource) {
    //return $resource('/api/contact/:name', { name: '@name.clean' });
    return $resource('/spring-nanotrader-services/api/accountProfile', {});    
  })
  .factory('holdingSummary', function ($resource) {
    return $resource('/spring-nanotrader-services/api/holdingSummary', {});
  })
*/

  // Controllers
  .controller('MainCtrl', function ($scope, $http) {
    $scope.strings = app.strings; // load i18n strings into scope
    // Check if the user is logged in
    var userSession = $.cookie(app.conf.sessionCookieName);
    if (!userSession){
      // Show login form
      $scope.showLoading = false;
      $scope.showLogin = true;      
    }
    else{
      // set http common headers:
      $http.defaults.headers.common['API_TOKEN'] = angular.fromJson(userSession).authToken;

      $scope.showLoading = false;
      $scope.showLogin = false; 
    }
  })
  .controller('LogoutCtrl', function ($http) {
/*    
    var sessCookie = $.cookie(app.conf.sessionCookieName);
    var u_headers = {
        "Content-Type" : "application/json"
    };
    if (sessCookie)
    {
      u_headers.API_TOKEN = angular.fromJson(sessCookie).authToken;
    }
*/    
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
          debugger;
          $scope.loginError = data.detail;
        });
    }
  })
  .controller('MarketSummaryCtrl', function ($scope, $resource, MarketSummary) {
    $scope.marketSummary = MarketSummary.get();
  })
  .controller('AccountSummaryCtrl', function ($scope, $resource, Account) {
    if ($.cookie(app.conf.sessionCookieName)){
      var accountID = angular.fromJson($.cookie(app.conf.sessionCookieName)).accountid;
      $scope.account = Account.get({accountId: accountID});
      $scope.totalMarketValue = 99;
      $scope.gain = 0;
      //inject math object into scope:
      //$scope.Math = window.Math;
    }
  })
  .controller('OrdersCtrl', function ($scope, $resource, Orders) {
    if ($.cookie(app.conf.sessionCookieName)){
      var accountID = angular.fromJson($.cookie(app.conf.sessionCookieName)).accountid;
      $scope.orders = Orders.get({accountId: accountID});
    }
  })
  .controller('DashboardCtrl', function ($scope, $resource) {})
  
  .controller('PortfolioCtrl', function ($scope, $resource, Account, Portfolio) {
    var accountID = angular.fromJson($.cookie(app.conf.sessionCookieName)).accountid;
    $scope.account = Account.get({accountId: accountID}, function(account) {
        $scope.account.cashBalance = account.balance;
        $scope.portfolio = Portfolio.get({accountId: accountID}, function(portfolio) {
            $scope.portfolio.totalMarketValue = portfolio.totalMarketValue;
            var totalAssets = $scope.portfolio.totalMarketValue + $scope.account.cashBalance,
            data = [[app.strings.cashBalance, ($scope.account.cashBalance / totalAssets)],
                [app.strings.portfolioValue, ($scope.portfolio.totalMarketValue / totalAssets)]];
            app.utils.renderPieChart('ad-pie-chart', data);
        });      
      });
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


/*
  
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

//appTrader.run(function($route){});