// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
angular.module('ServiceMan', ['ionic', 'ngCordova', 'ionMdInput', 'ngDraggable']) //ngMockE2E
    // bower install angular-mocks --save
    // <script src="lib/angular-mocks/angular-mocks.js"></script>
    // https://docs.angularjs.org/api/ngMockE2E
    .run(function ($ionicPlatform, $cordovaSQLite, $cordovaSplashscreen, $timeout) {

        console.log("app.js...")
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            $timeout(function () {
                $cordovaSplashscreen.hide();
            }, 5000, false);

            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            /*if (window.cordova) {
              db = $cordovaSQLite.openDB("my.db"); //device
            }else{
              db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
            }
              
            //$cordovaSQLite.execute(db,"DROP TABLE process_out");
            //$cordovaSQLite.execute(db,"DROP TABLE process");            
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS process_out (id integer primary key, user_id text, token text, type text, issue text, po text, paperwork text, extra text, sync integer)");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS process (id integer primary key, process_id number, created text, query text, request text, type text, status text, updated text, user text, sync integer)");    */
        });


    })

.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('top');
    $ionicConfigProvider.backButton.text('').icon('ion-chevron-left').previousTitleText(false);
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })

    .state('account', {
        url: '/account',
        templateUrl: 'templates/account_detail.html',
        controller: 'AccountCtrl'
    })

    /* .state('main', {
      url: "/",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'MenuCtrl'
    }) */

    .state('dash', {
        url: '/dash',
        templateUrl: 'templates/dashboard.html',
        controller: 'DashCtrl'
    })

    /*.state('dash_activitiesList', {
        url: '/dash_activitiesList',
        templateUrl: 'templates/dash_activitiesList.html',
        controller: 'DashListCtrl'
    })*/
    
    .state('dash_calendar', {
        url: '/dash_calendar',
        templateUrl: 'templates/calendar_schedule.html',
        controller: 'CalendarCtrl'
    })

    /*.state('main.dash_activity', {
      url: 'main/dash_activity/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity.html',
            controller: 'DashActvityCtrl'
          }
      }
    })   

    .state('main.dash_activity_end', {
      url: 'main/dash_activity_end/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity_end.html',
            controller: 'DashActvityEndCtrl'
          }
      }
    })

    .state('main.dash_activity_end_items', {
      url: 'main/dash_activity_end_items/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity_end_items.html',
            controller: 'DashActvityEndItemsCtrl'
          }
      }
    })    
      
    .state('main.dash_activity_end_sign', {
      url: 'main/dash_activity_end_sign/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity_end_sign.html',
            controller: 'DashActivityEndSignCtrl'
          }
      }
    })  

    .state('main.dash_activity_end_payment', {
      url: 'main/dash_activity_end_payment/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity_end_payment.html',
            controller: 'DashActivityEndPaymentCtrl'
          }
      }
    })  

    .state('main.dash_activity_send_sms', {
      url: 'main/dash_activity_send_sms/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity_send_sms.html',
            controller: 'DashActivitySendSmsCtrl'
          }
      }
    }) 

    .state('main.dash_activity_material', {
      url: 'main/dash_activity_material/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity_material.html',
            controller: 'DashActvityMaterialCtrl'
          }
      }
    })   

    .state('main.dash_activity_product', {
      url: 'main/dash_activity_product/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity_product.html',
            controller: 'DashActvityProductCtrl'
          }
      }
    })   

    .state('main.dash_activity_material_stock', {
      url: 'main/dash_activity_material_stock/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity_material_stock.html',
            controller: 'DashActvityMaterialStockCtrl'
          }
      }
    })   

    .state('main.dash_activity_comment', {
      url: 'main/dash_activity_comment/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_activity_comment.html',
            controller: 'DashActvityCommentCtrl'
          }
      }
    })   
      
    .state('main.dash_material_add', {
      url: 'main/dash_material_add/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_material_add.html',
            controller: 'DashMaterialAddCtrl'
          }
      }
    })   

    .state('main.dash_material_edit', {
      url: 'main/dash_material_edit/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_material_add.html',
            controller: 'DashMaterialEditCtrl'
          }
      }
    })   

    .state('main.dash_product_add', {
      url: 'main/dash_product_add/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_product_add.html',
            controller: 'DashProductAddCtrl'
          }
      }
    }) 

    .state('main.dash_product_edit', {
      url: 'main/dash_product_edit/:activityId',
      views: {
          'menuContent': {
            templateUrl: 'templates/dash_product_add.html',
            controller: 'DashProductEditCtrl'
          }
      }
    })  

    .state('startday', {
      url: '/startday',
      templateUrl: 'templates/dash_startday.html',
      controller: 'StartdayCtrl'    
    }) */

    .state('requestStock', {
        url: '/requestStock',
        templateUrl: 'templates/requestStock.html',
        controller: 'StockManageCtrl'
    })

    .state('requestStockNew', {
        url: '/requestStockNew',
        templateUrl: 'templates/requestStockNew.html',
        controller: 'RequestStockNewCtrl'
    })

    .state('requestStockEdit', {
        url: '/requestStockEdit/:requestId',
        templateUrl: 'templates/requestStockEdit.html',
        controller: 'RequestStockEditCtrl'
    })


    .state('settings', {
        url: '/settings',
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl'
    })

    .state('settings.settingsAddress', {
        url: '/settingsAddress',
        views: {
            'settingsAddress': {
                templateUrl: 'templates/settingsAddress.html',
                controller: 'SettingsAddressCtrl'
            }
        }
    })

    .state('settingsAddressEdit', {
        url: '/settingsAddressEdit/:addressId',
        templateUrl: 'templates/settingsAddressEdit.html',
        controller: 'SettingsAddressEditCtrl'
    })

    .state('settings.settingsLocations', {
        url: '/settingsLocations',
        views: {
            'settingsLocations': {
                templateUrl: 'templates/settingsLocations.html',
                controller: 'SettingsLocationsCtrl'
            }
        }
    })

    .state('settingsLocationEdit', {
        url: '/settingsLocationEdit/:addressId',
        templateUrl: 'templates/settingsLocationEdit.html',
        controller: 'SettingsLocationEditCtrl'
    })

    .state('workqueue', {
        url: '/workqueue',
        templateUrl: 'templates/workqueue.html',
        controller: 'WorkqueueCtrl'
    })

    .state('workqueue.workqueueMain', {
        url: '/workqueueMain',
        views: {
            'workqueueMain': {
                templateUrl: 'templates/workqueueMain.html',
                controller: 'WorkqueueMainCtrl'
            }
        }
    })

    .state('workqueue.workqueueProduct', {
        url: '/workqueueProduct',
        views: {
            'workqueueProduct': {
                templateUrl: 'templates/workqueueProduct.html',
                controller: 'WorkqueueProductCtrl'
            }
        }
    })

    .state('dash_activity', {
        url: '/dash_activity/:activityId',
        templateUrl: 'templates/dash_activity.html',
        controller: 'DashActvityCtrl'
    })

    .state('dash_activity_end', {
        url: '/dash_activity_end/:activityId',
        templateUrl: 'templates/dash_activity_end.html',
        controller: 'DashActvityEndCtrl'
    })

    .state('dash_activity_material_stock', {
        url: '/dash_activity_material_stock/:activityId',
        templateUrl: 'templates/dash_activity_material_stock.html',
        controller: 'DashActvityMaterialStockCtrl'
    })

    .state('dash_material_add', {
        url: '/dash_material_add/:activityId',
        templateUrl: 'templates/dash_material_add.html',
        controller: 'DashMaterialAddCtrl'
    })

    .state('dash_material_edit', {
        url: '/dash_material_edit/:activityId',
        templateUrl: 'templates/dash_material_add.html',
        controller: 'DashMaterialEditCtrl'
    })

    .state('dash_product_add', {
        url: '/dash_product_add/:activityId',
        templateUrl: 'templates/dash_product_add.html',
        controller: 'DashProductAddCtrl'
    })

    .state('dash_product_edit', {
        url: '/dash_product_edit/:activityId',
        templateUrl: 'templates/dash_product_add.html',
        controller: 'DashProductEditCtrl'
    })


    .state('dash_activity_comment', {
        url: '/dash_activity_comment/:activityId',
        templateUrl: 'templates/dash_activity_comment.html',
        controller: 'DashActvityCommentCtrl'
    })

    .state('dash_activity_end_items', {
        url: '/dash_activity_end_items/:activityId',
        templateUrl: 'templates/dash_activity_end_items.html',
        controller: 'DashActvityEndItemsCtrl'
    })

    .state('dash_activity_end_sign', {
        url: '/dash_activity_end_sign/:activityId',
        templateUrl: 'templates/dash_activity_end_sign.html',
        controller: 'DashActivityEndSignCtrl'
    })

    .state('dash_activity_end_payment', {
        url: '/dash_activity_end_payment/:activityId',
        templateUrl: 'templates/dash_activity_end_payment.html',
        controller: 'DashActivityEndPaymentCtrl'
    })

    .state('dash_activity_send_sms', {
        url: '/dash_activity_send_sms/:activityId',
        templateUrl: 'templates/dash_activity_send_sms.html',
        controller: 'DashActivitySendSmsCtrl'
    })

    .state('dash_activity_material_stock_split', {
        url: '/dash_activity_material_stock_split/:activityId',
        templateUrl: 'templates/dash_activity_material_stock.html',
        controller: 'DashActvityMaterialStockSplitCtrl'
    })

    /*.state('main.admin', {
      url: 'main/admin',
      views: {
          'menuContent': {
            templateUrl: 'templates/admin.html'
          }
      },
      data: {
        authorizedRoles: [USER_ROLES.admin]
      }
    })*/

    ;

    //$urlRouterProvider.otherwise('/main/dash');
    $urlRouterProvider.otherwise('/dash');
})

// .run(function($httpBackend){
//  $httpBackend.whenGET('http://localhost:8100/valid')
//        .respond({message: 'This is my valid response!'});
//  $httpBackend.whenGET('http://localhost:8100/notauthenticated')
//        .respond(401, {message: "Not Authenticated"});
//  $httpBackend.whenGET('http://localhost:8100/notauthorized')
//        .respond(403, {message: "Not Authorized"});
//
//  $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
// }) 

/*.run(function ($rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {reload: true});
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });
})*/

.filter("customOrderBy", function () {
    return function (input) {
        input.sort(function (a, b) {
            return new Date(a.dateFrom) < new Date(b.dateFrom);
        });
        return input;
    }
})


/*.directive('ionMdInput', function(){
  return {
    restrict: 'E',
    transclude: false,
    template:
      '<input type="text" required>'+
      '<span class="md-highlight"></span>'+
      '<span class="md-bar"></span>'+
      '<label>{{label}}</label>',
    scope: {
      'label': '@'
    }
  }
})*/

;