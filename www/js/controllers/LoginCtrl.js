angular.module('ServiceMan')
    /********************************************
    LoginCtrl
    *********************************************/

.controller('LoginCtrl', function ($scope, $rootScope, $state, $ionicPopup, AuthService, APP_PARAMS) {

    console.log("LoginCtrl..");



    $scope.login = function (data) {
        
        
        if(data!=undefined && data.username!=undefined && data.password!=undefined && data.username!='' && data.password!=''){
            
            AuthService.login(data.username, data.password).then(function (userdata) {

                $rootScope.userdata = userdata;

                if (userdata.role == "ROLE_Serviceman") {
                    $rootScope.openStartDay();
                    $state.go('dash', {}, {
                        reload: true
                    });

                    $rootScope.$broadcast('after.login');

                } else if (userdata.role == "ROLE_Logistics_Rep") {

                    $state.go('workqueue', {}, {
                        reload: true
                    });

                    $rootScope.$broadcast('after.login');

                } else {
                    var alertPopup = $ionicPopup.alert({
                        title: 'Login failed',
                        template: 'Please check your credentials',
                        okType: APP_PARAMS.button_dialog
                    });
                }


            }, function (err) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed',
                    template: 'Please check your credentials',
                    okType: APP_PARAMS.button_dialog
                });
            });
            
        } else {
            var alertPopup = $ionicPopup.alert({
                    title: 'Login failed',
                    template: 'Please check your credentials',
                    okType: APP_PARAMS.button_dialog
                });
        }

    };

    $scope.account = function (data) {
        $state.go('account', {}, {
            reload: true
        });
    }
})

/********************************************
AccountCtrl
*********************************************/
.controller('AccountCtrl', function ($scope, $state, $ionicPopup, AuthService, APP_PARAMS, Department) {

    console.log("AccountCtrl..");

    $scope.departments = Department.all();

    $scope.back = function () {
        //$state.go('login');
        $state.go('login', {}, {
            reload: true
        });
    };

    /*AuthService.login(data.username, data.password).then(function (authenticated) {
        $state.go('main.dash', {}, {
            reload: true
        });
        $scope.setCurrentUsername(AuthService.username());
    }, function (err) {
        var alertPopup = $ionicPopup.alert({
            title: 'Login failed',
            template: 'Please check your credentials!',
            okType: APP_PARAMS.button_dialog
        });
    });*/

});