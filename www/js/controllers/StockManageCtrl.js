angular.module('ServiceMan')

/********************************************
DashCtrl
*********************************************/
.controller('StockManageCtrl', function ($scope, $state, $http, $ionicPopup, $ionicSideMenuDelegate, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Request) {

    console.log("StockManageCtrl...");

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }

    $scope.requests = [];
    $scope.requests = Request.getPedings();

    $scope.data = {
        showDelete: false
    };

    $scope.onItemDelete = function(item) {
        $scope.requests.splice($scope.requests.indexOf(item), 1);        
    };
});