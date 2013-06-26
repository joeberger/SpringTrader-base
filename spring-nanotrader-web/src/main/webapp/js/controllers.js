'use strict';

/* Controllers */

function DashboardCtrl($scope) {
  $scope.toggleOrder = function() {
    if ($scope.orders-toggle)
      $scope.orders-toggle = false;
    else
      $scope.orders-toggle = true;
    console.log("toggling here")
  }
}