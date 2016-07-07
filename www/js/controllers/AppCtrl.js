angular.module('ServiceMan')

/********************************************
AppCtrl
*********************************************/
.controller('AppCtrl', function ($scope, $state, $ionicPopup, AuthService, AUTH_EVENTS, APP_PARAMS, $cordovaNetwork, $rootScope, $window) {
    
    //$scope.username = AuthService.username();

    console.log('AppCtrl START');
    $rootScope.showNotifications = false;
        //verify if user has session
    var sessionData = $window.sessionStorage.getItem('USERDATA');
    if (sessionData) {
        //console.log(sessionData);
        var userdata = JSON.parse(sessionData);
        $rootScope.userdata = userdata;
        $rootScope.showNotifications = true;
    }
    

    
    $scope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        $scope.showLoading = true;
        
        if (!AuthService.isAuthenticated() && toState.name != 'login' && toState.name != 'account') {
            console.log('no session');
            $rootScope.showNotifications = false;
            $state.go('login', {}, {
                reload: true
            });
            event.preventDefault();
            
        } else {
            
            if (toState != undefined && toState.data != undefined && toState.data.roles != undefined && toState.data.roles.length > 0) {
                if (toState.data.roles.indexOf($rootScope.userdata.role) < 0) {
                    console.log('unauthorized');
                    $scope.showLoading = false;
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                    event.preventDefault();
                }
            }
        }    
        
    });
    
    
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        $scope.showLoading = false;
    });
    
    $rootScope.$on('after.login', function (event, args) {
        $rootScope.showNotifications = true;
    });
    
    
    $scope.$on(AUTH_EVENTS.notAuthorized, function (event) {
        var alertPopup = $ionicPopup.alert({
            title: 'Unauthorized',
            template: 'You are not allowed to access this resource.',
            okType: APP_PARAMS.button_dialog
        });
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function (event) {
        
        if(!$state.is('login')){            
            AuthService.logout();
            $scope.showNotifications = false;
            $state.go('login');
            var alertPopup = $ionicPopup.alert({
                title: 'Session Lost',
                template: 'Sorry, You have to login again.',
                okType: APP_PARAMS.button_dialog
            });
        }
    });

    $scope.$on(AUTH_EVENTS.notFound, function (event) {
        var alertPopup = $ionicPopup.alert({
            title: 'Not found',
            template: 'Resource not found.',
            okType: APP_PARAMS.button_dialog
        });
    });
    
    
    $scope.$on(AUTH_EVENTS.noConnection, function (event) {
        
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: 'An error occurred, please check your network connection.',
            okType: APP_PARAMS.button_dialog
        });
        
    });   
    
    $scope.$on(AUTH_EVENTS.serverError, function (event, args) {
        
        var msg = 'Internal server error, please contact your System Administrator.'
        
        if(args.data.message!=undefined && args.data.message!=null){
            msg = msg + ' ('+ args.data.message + ')';
        }
        
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: msg,
            okType: APP_PARAMS.button_dialog
        });
        
    }); 
    
    
    $scope.$on(AUTH_EVENTS.definedError, function (event, args) {
        
        var alertPopup = $ionicPopup.alert({
            title: 'Error',
            template: args.data.message,
            okType: APP_PARAMS.button_dialog
        });        
        
    });
        

    $scope.isOnline = function () {
        var online = true;
        /*var networkState = window.navigator.connection.type;
        if (networkState == Connection.NONE) {
            online = false;
        } */
        online = window.navigator.onLine;
        //online = false;
        console.log('OnLine->' + online);
        return online;
        //return $cordovaNetwork.isOnline();
    };
});