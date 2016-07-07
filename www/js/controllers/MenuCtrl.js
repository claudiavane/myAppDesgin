angular.module('ServiceMan')
/********************************************
MenuCtrl
*********************************************/
.controller('MenuCtrl', function ($scope, $state, $ionicHistory, AuthService, $timeout, $ionicModal, $ionicPopup, Property, $rootScope, APP_PARAMS) {

    console.log("MenuCtrl..");

    $scope.logout = function () {
        AuthService.logout();
        console.log("logout..");
        $rootScope.showNotifications = false;
        
        $state.go('login', {}, {reload: true});

        $scope.$on('$ionicView.afterLeave', function(){
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
          $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });

        });        
    };

    $ionicModal.fromTemplateUrl('templates/dash_startday.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalStart = modal;
    });

    $rootScope.openStartDay = function () {
        var currentDate =  new Date();
        $scope.hour = currentDate.getHours();
        $scope.min = currentDate.getMinutes();
        $scope.modalStart.show();        
    };


    $scope.closeStartDay = function() {             
        $scope.modalStart.hide();
    };

    $scope.subtitle = 'Start Work';
    $scope.icon = 'icon ion-android-time';
    $scope.action = 'openStartDay';
    $scope.isWorkFinished = false;

    $scope.startDay = function () {        
        $scope.modalStart.hide();
        //$scope.subtitle  = 'Work started at ' + $scope.hour + ":" + $scope.min;
        $scope.subtitle  = 'End Work';
        $scope.icon = 'icon ion-android-stopwatch';
        $scope.action = 'openEndDay';
        /*var confirmPopup = $ionicPopup.confirm({
         title: 'Start Work',
         template: 'Are you sure you want to start?',
         okType: APP_PARAMS.button_dialog
        });
        confirmPopup.then(function(res) {
             if(res) {
                
             } 
           });*/
    };

    
    $scope.data = {};
    $scope.noWorkToday = function(){
        var myPopup = $ionicPopup.show({
        template: '<textarea name="comment" rows="6" ng-model="data.comment" placeholder="Please write a comment">',
        title: 'Not Working Today',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: 'OK',
            type: APP_PARAMS.button_dialog,
            onTap: function(e) {
              if ($scope.data.comment) {
                $scope.modalStart.hide();
                $scope.subtitle  = 'Not working today';
                $scope.icon = 'icon ion-ios-pause';
                $scope.action = '';
              } 
            }
          }
        ]
      });        
    }


    $ionicModal.fromTemplateUrl('templates/dash_finishday.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalEnd = modal;
    });

    var loadData = function() {
        $scope.properties = [];
        var items = Property.all();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            $scope.properties.push({"id": item.id, "name": item.name, "endTime":item.endTime, "checked": true});
        }; 
        
    };

    $scope.openEndDay = function () {
        var endDate =  new Date();
        $scope.endHour = endDate.getHours();
        $scope.endMin = endDate.getMinutes();
        loadData();
        $scope.modalEnd.show();        
    };

    $scope.closeEndDay = function() {             
        $scope.modalEnd.hide();
    }

    $scope.endDay = function () {
        
        var confirmPopup = $ionicPopup.confirm({
            title: 'End Work',
            template: 'Are you sure you want to finish?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
         if(res) {
            $scope.isWorkFinished = true;
            $scope.subtitle = 'Work finished at ' + $scope.endHour + ":" + $scope.endMin;
            $scope.action = '';
            $scope.modalEnd.hide();
           
         } else {
           console.log('You are not sure');
         }
       });

    };

});