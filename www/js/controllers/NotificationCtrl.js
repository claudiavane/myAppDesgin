angular.module('ServiceMan')
/********************************************
NotificationCtrl
*********************************************/
.controller('NotificationCtrl', function ($scope, $state, $http, $ionicPopup, $ionicPopover, AuthService, $ionicModal, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, Process, ProcessOut, AddServiceRequest, $q, Actions) {

    console.log('NotificationCtrl');

    $scope.serviceCall = Actions.getServiceCall();
    $scope.extra = Actions.getExtra();
    $scope.material = Actions.getMaterial();
    $scope.emergency = Actions.getEmergency();

    $ionicPopover.fromTemplateUrl('popover1.html', {
          scope: $scope
       }).then(function(popover) {
          $scope.popover1 = popover;
       });

    $ionicPopover.fromTemplateUrl('popover2.html', {
          scope: $scope
       }).then(function(popover) {
          $scope.popover2 = popover;
       });

    $ionicPopover.fromTemplateUrl('popover3.html', {
          scope: $scope
       }).then(function(popover) {
          $scope.popover3 = popover;
       });

    $ionicPopover.fromTemplateUrl('popover4.html', {
          scope: $scope
       }).then(function(popover) {
          $scope.popover4 = popover;
       });

    $scope.openPopover1 = function($event) {
      $scope.popover1.show($event);
    };

    $scope.openPopover2 = function($event) {
      $scope.popover2.show($event);
    };

    $scope.openPopover3 = function($event) {
      $scope.popover3.show($event);
    };

    $scope.openPopover4 = function($event) {
      $scope.popover4.show($event);
    };


});