angular.module('ServiceMan')


/********************************************
DashActvityMaterialCtrl
*********************************************/
.controller('DashActvityMaterialCtrl', function ($scope, $state, $stateParams, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Material, ServicemanActivities) {

    console.log("DashActvityMaterialCtrl..");

    $scope.materials = [];
    $scope.materials = ServicemanActivities.getActivityMaterials($stateParams.activityId);

    $scope.activityId = $stateParams.activityId;
  
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }    

    $scope.removeItems = function () {

        var confirmPopup = $ionicPopup.confirm({
         title: 'Remove Items',
         template: 'Are you sure you want to remove?',
         okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
             if(res) {
                for (var i = 0; i < $scope.materials.length; i++) {
                    if ($scope.materials[i].checked) {

                        $scope.materials.splice($scope.materials.item, 1);
                    };
                };
             } 
        });
        
    }
})

/********************************************
DashActvityProductCtrl
*********************************************/
.controller('DashActvityProductCtrl', function ($scope, $state, $stateParams, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Material, ServicemanActivities) {

    console.log("DashActvityProductCtrl..");

    $scope.materials = [];
    $scope.materials = ServicemanActivities.getActivityStockItems($stateParams.activityId);

    $scope.activityId = $stateParams.activityId;
   
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }    

    $scope.removeItems = function () {

        var confirmPopup = $ionicPopup.confirm({
         title: 'Remove Items',
         template: 'Are you sure you want to remove?',
         okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
             if(res) {
                for (var i = 0; i < $scope.materials.length; i++) {
                    if ($scope.materials[i].checked) {

                        $scope.materials.splice($scope.materials.item, 1);
                    };
                };
             } 
        });        
    }
})


/********************************************
DashActvityMaterialStockCtrl
*********************************************/
.controller('DashActvityMaterialStockCtrl', function ($scope, $state, $stateParams, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, $ionicActionSheet, $ionicTabsDelegate, ProcessOut, Process, Material, ServicemanActivities) {

    console.log("DashActvityMaterialStockCtrl ");

    $scope.materials = [];
    $scope.materials = ServicemanActivities.getActivityMaterials($stateParams.activityId);
    $scope.stockItems = ServicemanActivities.getActivityStockItems($stateParams.activityId);

    $scope.activityId = $stateParams.activityId;
    $scope.isSplit = false;
  
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }     
    
    $scope.addProduct = function(){        
        var tab = $ionicTabsDelegate.selectedIndex();        
        if(tab==0){
            $state.go('dash_material_add', {activityId:$scope.activityId});
        } else {
            $state.go('dash_product_add', {activityId:$scope.activityId});
        }        
    }  

    $scope.removeItems = function () {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Remove Items',
       template: 'Are you sure you want to remove?',
       okType: APP_PARAMS.button_dialog
      });

      confirmPopup.then(function(res) {
        if(res) {
          for (var i = 0; i < $scope.stockItems.length; i++) {
            if ($scope.stockItems[i].checked) {
                $scope.stockItems.splice($scope.stockItems.item, 1);
            };
          };
        } 
      });        
    }

    $scope.removeMaterials = function () {
      var confirmPopup = $ionicPopup.confirm({
       title: 'Remove Items',
       template: 'Are you sure you want to remove?',
       okType: APP_PARAMS.button_dialog
      });

      confirmPopup.then(function(res) {
        if(res) {
          for (var i = 0; i < $scope.materials.length; i++) {
            if ($scope.materials[i].checked) {
                $scope.materials.splice($scope.materials.item, 1);
            };
          };
        } 
      });        
    }

    $scope.data = {
        showDelete: false,
        showDeleteItem: false
    };

    $scope.onItemDelete = function(item) {
        $scope.materials.splice($scope.materials.indexOf(item), 1);        
    };

    $scope.onItemDeleteItem = function(item) {
        $scope.stockItems.splice($scope.stockItems.indexOf(item), 1);        
    };

    $ionicModal.fromTemplateUrl('templates/dash_activity_products_detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalDetail = modal;
    });

    var loadDetail = function(item){
        $scope.item =  item;
        $scope.detail = [{text: 'Description', value: 'This is a description of the MAT0006'},
                {text: 'Adjustments', value: 'A, B'},
                {text: 'Price', value: 'Awaiting Approval'},
                {text: 'Status', value: 'Active'},
                {text: 'Service Rep Comment', value: 'Comment'},
                {text: 'Problem Code', value: 'Problem'},
                {text: 'Serviceman Comment', value: 'Comments'},
                {text: 'Serviceman Drawings', value: 'Drawings'},
                {text: 'Serviceman Images', value: 'Images'},
                {text: 'Reason Code', value: 'Reason'},
                {text: 'Created By', value: 'John'},
                {text: 'Created Date', value: new Date('01/01/2016 07:00:00')},
                {text: 'Updated By', value: ''},
                {text: 'Updated Date', value: null}];
    }
    $scope.openDetail = function (item) {
        loadDetail(item);
        $scope.modalDetail.show();        
    };
    $scope.closeDetail = function() {             
        $scope.modalDetail.hide();
    };
    $scope.showActionsheet = function(item) {      
        var options = [{ text: '<i class="icon ion-edit dark"></i> Edit' },
                       { text: '<i class="icon ion-information-circled dark"></i> View Detail' }];
        
        $ionicActionSheet.show({
            titleText: 'Options',
            cancelText: 'Cancel',
            cancel: function() {
                console.log('CANCELLED');
            },
            buttons: options,
            buttonClicked: function(index) {
                switch (index){
                    case 0 :
                        $state.go('dash_material_edit', {activityId: $scope.activityId});
                        return true;
                    case 1 :
                        $scope.openDetail(item);
                        return true;                    
                }                
            }
        });  
    }

})

/********************************************
DashActvityMaterialStockSplitCtrl
*********************************************/
.controller('DashActvityMaterialStockSplitCtrl', function ($scope, $state, $stateParams, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Material, ServicemanActivities) {

    console.log("DashActvityMaterialStockSplitCtrl..");

    $scope.isSplit = true;
    $scope.materials = [];
    $scope.stockItems = [];
    $scope.activityId = $stateParams.activityId;

    var mat = ServicemanActivities.getActivityMaterials($stateParams.activityId);
    var stock = ServicemanActivities.getActivityStockItems($stateParams.activityId);

    for (var i = 0; i < stock.length; i++) {
        if (stock[i].reasonCode == '') {
            $scope.stockItems.push(stock[i]);
        };
    };
    
    for (var i = 0; i < mat.length; i++) {
        if (mat[i].reasonCode == '') {
            $scope.materials.push(mat[i]);
        };
    };
    
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }    

    $scope.removeItems = function () {

        var confirmPopup = $ionicPopup.confirm({
         title: 'Remove Items',
         template: 'Are you sure you want to remove?',
         okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
             if(res) {
                for (var i = 0; i < $scope.stockItems.length; i++) {
                    if ($scope.stockItems[i].checked) {

                        $scope.stockItems.splice($scope.stockItems.item, 1);
                    };
                };
             } 
        });        
    }

    $scope.removeMaterials = function () {

        var confirmPopup = $ionicPopup.confirm({
         title: 'Remove Items',
         template: 'Are you sure you want to remove?',
         okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
             if(res) {
                for (var i = 0; i < $scope.materials.length; i++) {
                    if ($scope.materials[i].checked) {

                        $scope.materials.splice($scope.materials.item, 1);
                    };
                };
             } 
        });        
    }


    $scope.split = function () {

        var confirmPopup = $ionicPopup.confirm({
         title: 'Split Service Call out',
         template: 'Are you sure you want to split this Service Call Out?',
         okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
             if(res) {
                
                $state.go('dash_activity', {activityId: $scope.activityId});
             } 
        });
        
    }
})

/********************************************
DashActvityCommentCtrl
*********************************************/
.controller('DashActvityCommentCtrl', function ($scope, $state, $stateParams, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicScrollDelegate, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, ServicemanActivities, Comments) {

    console.log("DashActvityCommentCtrl..");

    $scope.materials = [];
    $scope.materials = ServicemanActivities.getActivityComments($stateParams.activityId);

    $scope.activityId = $stateParams.activityId;

    $scope.data = {};

    /*$scope.addComment = function (activityId) {
        
        $scope.data = {};

        var textComment = {
                comment: '',
                created_by: 'John Smith',
                created_date: new Date(),        
            };
       
        var myPopup = $ionicPopup.show({
        template: '<textarea name="comment" rows="6" placeholder="Please write a comment" ng-model="data.comment">',
        title: 'Add Comment',
        //subTitle: 'Please write a comment',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>OK</b>',
            type: 'button-dark',
            onTap: function(e) {
              if (!$scope.data.comment) {
                //don't allow the user to close unless he enters wifi password
                console.log("Save");
                e.preventDefault();
                
              } else {
                console.log("%%%% $scope.data.comment " + $scope.data.comment);
                textComment.comment = $scope.data.comment;
                ServicemanActivities.addActivityComments(textComment, $stateParams.activityId);
                //$state.go('main.dash_activity_material', {activityId: $stateParams.activityId});
              }
            }
          }
        ]
      });
   };*/

   $scope.user = {
      created_byId: '10002',
      created_byPic: 'http://ionicframework.com/img/docs/mcfly.jpg',
      created_by: 'Serviceman - Marty'
    };

   $scope.addComment = function() {
   //alternate = !alternate;

        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

        /*$scope.materials.push({
          userId: alternate ? '12345' : '54321',
          text: $scope.data.comment,
          time: d
        });*/

        //ServicemanActivities.addActivityComments($scope.data.comment, $stateParams.activityId);

        //$scope.data.comment = 'TEST..',
        /*$scope.data.created_byId = $scope.user.created_byId,
        $scope.data.created_by = $scope.user.created_by,
        $scope.data.created_byPic =   $scope.user.created_byPic,
        $scope.data.created_date = new Date(),*/
       
        var newComment = {};
        newComment.created_byId = $scope.user.created_byId;
        newComment.created_by = $scope.user.created_by;
        newComment.created_byPic =   $scope.user.created_byPic;
        newComment.created_date = new Date();
        newComment.comment = $scope.data.comment;
            
        $scope.materials.push(newComment);
        $scope.data.comment = '';
      
       
       console.log($scope.materials);
        
        

        //delete $scope.data.comment;
        $ionicScrollDelegate.scrollBottom(true);

    };
  
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }    

    function onProfilePicError(ele) {
      this.ele.src = ''; // set a fallback
    }
})





/********************************************
DashActivityEndSignCtrl
*********************************************/
.controller('DashActivityEndSignCtrl', function ($scope, $state, $stateParams, $ionicPopup, $ionicHistory, Status) {

    console.log("DashActivityEndSignCtrl..");

    var canvas = document.getElementById('signatureCanvas');
    var signaturePad = new SignaturePad(canvas);

    $scope.clearCanvas = function () {
        $scope.signature = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
        signaturePad.clear();
    }

    $scope.saveCanvas = function () {
        var confirmPopup = $ionicPopup.confirm({
         title: 'Customer Sign',
         template: 'Are you sure you want to save the change?',
         okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
             if(res) {
               console.log('You are sure');
               var changeStatus = Status.setStatusSignature("Finalized");
               $state.go('dash_activity_end', {activityId: $stateParams.activityId});
             } 
           });
    }

    $scope.upEvent = function(event){
        var sigImg = signaturePad.toDataURL();
        $scope.signature = sigImg;
    }

    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }

})



/********************************************
StartdayCtrl
*********************************************/
.controller('StartdayCtrl', function ($scope, $state, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Property) {

    console.log("StartdayCtrl..");

    $scope.isStarted = false;
    $scope.startButton = 'Start';
    $scope.finishButton = 'Finish';
     var currentDate =  new Date();
     var hour = currentDate.getHours();
     var min = currentDate.getMinutes();

    $scope.startDay = function () {
        
        var confirmPopup = $ionicPopup.confirm({
         title: 'Start Day',
         template: 'Are you sure you want to start day?',
         okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
             if(res) {
                $scope.isStarted = true;
                $scope.startButton  = 'Started at ' + hour + ":" + min;
                $scope.finishButton  = 'Finish';
               console.log('You are sure');
             } 
           });
    };

    $ionicModal.fromTemplateUrl('templates/dash_finishday.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
    });

    var loadData = function() {
        $scope.properties = [];
        var items = Property.all();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            $scope.properties.push({"id": item.id, "name": item.name, "endTime":item.endTime, "checked": true});
        }; 
        
        /*Property.all().then(function(result){
            utilMessages.validityResponse(result);
            var ops = result.response;
            $scope.properties = [];            
            for (var i = 0; i < ops.length; i++) {
                var item = ops[i];
                $scope.operators.push({"id": item.id, "name": item.name, "checked": true});
            };      
        });*/
    };

    $scope.endDayOpenModal = function () {
        loadData();
        $scope.modal.show();        
    };

    $scope.endDay = function () {
        
        var confirmPopup = $ionicPopup.confirm({
            title: 'End Day',
            template: 'Are you sure you want to end day?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
         if(res) {
            $scope.isStarted = false;
            $scope.finishButton  = 'Finished';
            $scope.startButton  = 'Start';
            $scope.modal.hide();
           
         } else {
           console.log('You are not sure');
         }
       });

    };

    $scope.closeModal = function() {             
        $scope.modal.hide();
    }

    $scope.noWorkToday = function(){
        var myPopup = $ionicPopup.show({
        template: '<textarea name="comment" rows="6" ng-model="data.comment">',
        title: 'Not Working Today',
        subTitle: 'Please write a comment',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>OK</b>',
            type: 'button-dark',
            onTap: function(e) {
              if (!$scope.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.wifi;
              }
            }
          }
        ]
      });
    }
})

/********************************************
RequestStockCtrl
*********************************************/
.controller('RequestStockCtrl', function ($scope, $state, $http, $ionicPopup, $ionicSideMenuDelegate, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Request) {

    console.log("RequestStockCtrl...");

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
})

/********************************************
RequestStockNewCtrl
*********************************************/
.controller('RequestStockNewCtrl', function ($scope, $state, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Material, Request, StockItems) {

    console.log("RequestStockNewCtrl...");

    var items = StockItems.all(); //Material.all();
    $scope.materials = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        $scope.materials.push({"code": item.code, "product": item.product, "category":item.category, "price": item.price, "image": item.image, "qttyRequest": item.qttyRequest, "checked": false});
    };

    
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }

    $scope.save = function() {   
        var confirmPopup = $ionicPopup.confirm({
            title: 'Save Request Stock',
            template: 'Are you sure you want to save the request?',
            okType: APP_PARAMS.button_dialog
        });

        var request = {
            id: '10018',
            callOutVisit: '3213',
            date: "28/30/2016",
            status: 'Pending',
            received : false,
            materials: []
        };

        //request.materials = $scope.materials;
        confirmPopup.then(function(res) {
            if(res) {
                for (var i = 0; i < $scope.materials.length; i++) {            
                    if ($scope.materials[i].checked) {
                        request.materials.push($scope.materials[i]);
                    };
                };
                Request.pushRequest(request);

                $state.go('requestStock');
            } else {
                console.log('You are not sure');
            }
        });
    }
      
})

/********************************************
RequestStockEditCtrl
*********************************************/
.controller('RequestStockEditCtrl', function ($scope, $state, $stateParams, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Material, Request) {

    console.log("RequestStockEditCtrl..");
    $scope.isEdit = true;

    var items = Request.all();
    for (var i = 0; i < items.length; i++) {
        if (items[i].id == $stateParams.requestId) {            
            $scope.requested = items[i];
            break;
        };
    };

    
    $scope.save = function() {   
        var confirmPopup = $ionicPopup.confirm({
            title: 'Save Request Stock',
            template: 'Are you sure you want to save the changes?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
            if(res) {
                $state.go('requestStock');
            } else {
                console.log('You are not sure');
            }
        });
    }

    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }

})


/********************************************
DashMaterialAddCtrl
*********************************************/
.controller('DashMaterialAddCtrl', function ($scope, $state, $http, $ionicPopup, $stateParams, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Material, ServicemanActivities, ProductTypeRange, Adjustments) {

    console.log("DashMaterialAddCtrl");
    $scope.isEdit = false;

    var items = ProductTypeRange.all();

    $scope.types = items;
    $scope.typeSelected = {"type": '', "ranges": []};
    $scope.rangeSelected = {"name": ''};

    $scope.materials = [];
    
    $scope.changeProductType = function(){
        $scope.materials = [];
        $scope.ranges = ProductTypeRange.getRanges($scope.typeSelected.type);
    }

    $scope.changeProductRange = function(){
        $scope.materials = [];
        if ($scope.rangeSelected.name) {

            var items = Material.getMaterialByRange($scope.typeSelected.type, $scope.rangeSelected.name);
            $scope.materials = [];
            for (var i = 0; i < items.length; i++) {
                $scope.materials.push(items[i]);
            };
        };
    }

    $scope.data = {};

    $scope.setSize = function(){
        var myPopup = $ionicPopup.show({
        template: '<div ><label class="item-input"><input type="number" placeholder="Height (m2)" ng-model="data.height"></label><label class="item-input"><input type="number" placeholder="Width (m2)" ng-model="data.width"></label></div>',
        title: 'Priced per m2',
        subTitle: 'Please enter Height and Width',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>OK</b>',
            type: 'button-dark',
            onTap: function(e) {
              if (!$scope.data.height) {
                //don't allow the user to close unless he enters wifi password
                console.log("%% ok");
                e.preventDefault();
              } else {
                console.log("%% cancel");
              }
            }
          }
        ]
      });

    }

    $ionicModal.fromTemplateUrl('templates/dash_activity_adjustment.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
    });

    var loadData = function() {
        $scope.adjustments = [];
        var items = Adjustments.all();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            $scope.adjustments.push({"name": item.name, "amount":item.amount, "checked": false});
        };             
    };

    var material;

    $scope.openAddMaterial = function(item){    
        loadData();
        material = item;
        
        $scope.modal.show();         
    }

    $scope.closeModal = function() {             
        $scope.modal.hide();
    }
    $scope.addMaterial = function() {  
        ServicemanActivities.addActivityMaterial(material, $stateParams.activityId, $scope.comment, $scope.draw); 

        for (var i = 0; i < $scope.materials.length; i++) {            
            if ($scope.materials[i].code == material.code) {
                $scope.materials[i].checked = true;                
            };
        };

        $scope.modal.hide();
    }


    $scope.save = function () {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Save Materials',
            template: 'Are you sure you want to save the changes?',
            okType: APP_PARAMS.button_dialog
        });
        
        confirmPopup.then(function(res) {
            if(res) {
                for (var i = 0; i < $scope.materials.length; i++) {            
                    if ($scope.materials[i].checked) {
                        $scope.materials[i].checked = false;
                        ServicemanActivities.addActivityMaterial($scope.materials[i], $stateParams.activityId, $scope.comment, $scope.draw);
                    };
                };
                $state.go('dash_activity_material_stock', {activityId: $stateParams.activityId});
            } else {
                console.log('You are not sure');
            }
        });
   };
  
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }

    $scope.$on('$ionicView.afterEnter', function (viewInfo, state) {
        var canvas = document.getElementById('signatureCanvas');
        var signaturePad = new SignaturePad(canvas);

        $scope.clearCanvas = function () {
            $scope.draw = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
            signaturePad.clear();
        }

        $scope.saveCanvas = function () {
            var sigImg = signaturePad.toDataURL();
            $scope.draw = sigImg;
        }
    });
    
})


/********************************************
DashMaterialEditCtrl
*********************************************/
.controller('DashMaterialEditCtrl', function ($scope, $state, $http, $stateParams, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Adjustments, StockItems, ServicemanActivities) {

    console.log("DashMaterialEditCtrl..");
    $scope.isEdit = true;

    var items = ServicemanActivities.getActivityMaterials($stateParams.activityId);
    $scope.materials = [];
    for (var i = 0; i < items.length; i++) {
        $scope.materials.push(items[i]);
    };

    var activityCalendar = ServicemanActivities.getActivity($stateParams.activityId);
    
    $scope.comment = activityCalendar.activity.materialComment;

    $scope.save = function () {
        
        var confirmPopup = $ionicPopup.confirm({
            title: 'Save Materials',
            template: 'Are you sure you want to save the changes?',
            okType: APP_PARAMS.button_dialog
        });
        
        confirmPopup.then(function(res) {
            if(res) {
                $state.go('dash_activity_material_stock', {activityId: $stateParams.activityId});
            } else {
                console.log('You are not sure');
            }
        });
   };
  
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }

    $scope.$on('$ionicView.afterEnter', function (viewInfo, state) {
        //$scope.loadPhotoToCanvas();
        var canvas = document.getElementById('signatureCanvas');
        var signaturePad = new SignaturePad(canvas);

        $scope.clearCanvas = function () {
            $scope.draw = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
            signaturePad.clear();
        }

        $scope.saveCanvas = function () {
            var sigImg = signaturePad.toDataURL();
            $scope.draw = sigImg;
        }
    });

    $scope.data = {};
    $scope.setSize = function(){
        var myPopup = $ionicPopup.show({
        template: '<div ><label class="item-input"><input type="number" placeholder="Height (m2)" ng-model="data.height"></label><label class="item-input"><input type="number" placeholder="Width (m2)" ng-model="data.width"></label></div>',
        title: 'Priced per m2',
        subTitle: 'Please enter Height and Width',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>OK</b>',
            type: 'button-dark',
            onTap: function(e) {
              if (!$scope.data.height) {
                //don't allow the user to close unless he enters wifi password
                console.log("%% ok");
                e.preventDefault();
              } else {
                console.log("%% cancel");
              }
            }
          }
        ]
      });

    }

    $ionicModal.fromTemplateUrl('templates/dash_activity_adjustment.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
    });

    var loadData = function() {
        $scope.adjustments = [];
        var items = Adjustments.all();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            $scope.adjustments.push({"name": item.name, "amount":item.amount, "checked": false});
        };             
    };

    $scope.listAdjustments = function(){    
        loadData();
        $scope.modal.show();         
    }

    $scope.closeModal = function() {             
        $scope.modal.hide();
    }
    $scope.selectAdjustment = function() {             
        $scope.modal.hide();
    }

})

/********************************************
DashProductAddCtrl
*********************************************/
.controller('DashProductAddCtrl', function ($scope, $state, $http, $stateParams, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, StockItems, ServicemanActivities) {

    console.log("DashProductAddCtrl");
    $scope.isEdit = false;

    var items = StockItems.all();
    $scope.materials = [];
    for (var i = 0; i < items.length; i++) {
        $scope.materials.push(items[i]);
    };

    $scope.comment = '';

    $ionicModal.fromTemplateUrl('templates/dash_activity_stock_item.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal = modal;
    });


    var material;

    $scope.openAddMaterial = function(item){    
        
        material = item;
        
        $scope.modal.show();         
    }

    $scope.closeModal = function() {             
        $scope.modal.hide();
    }

    $scope.addMaterial = function() {  
        ServicemanActivities.addActivityStockItem(material, $stateParams.activityId, $scope.comment, $scope.draw); 

        for (var i = 0; i < $scope.materials.length; i++) {            
            if ($scope.materials[i].code == material.code) {
                $scope.materials[i].checked = true;                
            };
        };

        $scope.modal.hide();
    }


    $scope.save = function () {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Save Stock Items',
            template: 'Are you sure you want to save the changes?',
            okType: APP_PARAMS.button_dialog
        });
        
        confirmPopup.then(function(res) {
            if(res) {
                for (var i = 0; i < $scope.materials.length; i++) {            
                    if ($scope.materials[i].checked) {
                        $scope.materials[i].checked = false;
                        ServicemanActivities.addActivityStockItem($scope.materials[i], $stateParams.activityId, $scope.comment, $scope.draw);
                    };
                };
                $state.go('dash_activity_material_stock', {activityId: $stateParams.activityId});
            } else {
                console.log('You are not sure');
            }
        });
   };
  
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }

    $scope.$on('$ionicView.afterEnter', function (viewInfo, state) {
        //$scope.loadPhotoToCanvas();
        var canvas = document.getElementById('signatureCanvas');
        var signaturePad = new SignaturePad(canvas);

        $scope.clearCanvas = function () {
            $scope.draw = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
            signaturePad.clear();
        }

        $scope.saveCanvas = function () {
            var sigImg = signaturePad.toDataURL();
            $scope.draw = sigImg;
        }
    });

})


/********************************************
DashProductEditCtrl
*********************************************/
.controller('DashProductEditCtrl', function ($scope, $state, $http, $stateParams, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, StockItems, ServicemanActivities) {

    console.log("DashProductEditCtrl");
    $rootScope.viewMsg = false;
    $rootScope.message = '';

    $scope.isEdit = true;

    $scope.titleView = 'Edit Stock Item';

    var items = ServicemanActivities.getActivityStockItems($stateParams.activityId);
    $scope.materials = [];
    for (var i = 0; i < items.length; i++) {
        $scope.materials.push(items[i]);
    };

    var activityCalendar = ServicemanActivities.getActivity($stateParams.activityId);
    
    $scope.comment = activityCalendar.activity.stockComment;

    $scope.save = function () {
        
        var confirmPopup = $ionicPopup.confirm({
            title: 'Save Stock Items',
            template: 'Are you sure you want to save the changes?',
            okType: APP_PARAMS.button_dialog
        });
        
        confirmPopup.then(function(res) {
            if(res) {
                $state.go('dash_activity_material_stock', {activityId: $stateParams.activityId});
            } else {
                console.log('You are not sure');
            }
        });
   };
  
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }

    $scope.$on('$ionicView.afterEnter', function (viewInfo, state) {
        //$scope.loadPhotoToCanvas();
        var canvas = document.getElementById('signatureCanvas');
        var signaturePad = new SignaturePad(canvas);

        $scope.clearCanvas = function () {
            $scope.draw = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D";
            signaturePad.clear();
        }

        $scope.saveCanvas = function () {
            var sigImg = signaturePad.toDataURL();
            $scope.draw = sigImg;
        }
    });

})




/********************************************
DashListCtrl
*********************************************/
.controller('DashListCtrl', function ($scope, $state, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, Request, ServicemanActivities, Property, $ionicSideMenuDelegate, $ionicPopover, Depots) {

    console.log("DashListCtrl...");
    $scope.activities = [];
    $scope.activities = ServicemanActivities.getCalendarActivities();

    $scope.isStarted = false;
    $scope.subtitle = 'Pending';
    //$scope.finishButton = '';
     var currentDate =  new Date();
     var hour = currentDate.getHours();
     var min = currentDate.getMinutes();

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }
    
    
    $ionicPopover.fromTemplateUrl('popover_schedule.html', {
    scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
      });
    
    $scope.startDay = function () {
        
        var confirmPopup = $ionicPopup.confirm({
         title: 'Start Day',
         template: 'Are you sure you want to start day?',
         okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
             if(res) {
                $scope.isStarted = true;
                $scope.subtitle  = 'Day started at ' + hour + ":" + min;
                //$scope.finishButton  = 'Finish';
                console.log('You are sure');
             } 
           });

    };

    $ionicModal.fromTemplateUrl('templates/dash_finishday.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
    });

    var loadData = function() {
        $scope.properties = [];
        var items = Property.all();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            $scope.properties.push({"id": item.id, "name": item.name, "endTime":item.endTime, "checked": true});
        }; 
        
    };

    $scope.endDayOpenModal = function () {
        loadData();
        $scope.modal.show();        
    };

    $scope.endDay = function () {
        
        var confirmPopup = $ionicPopup.confirm({
            title: 'End Day',
            template: 'Are you sure you want to end day?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
         if(res) {
            $scope.isStarted = false;
            //$scope.finishButton  = 'Finished';
            //$scope.startButton  = 'Start';
            $scope.subtitle = 'Day finished at ' + hour + ":" + min;
            $scope.modal.hide();
           
         } else {
           console.log('You are not sure');
         }
       });
    };

    $scope.closeModal = function() {             
        $scope.modal.hide();
    }

    $scope.goActivity = function(item){
        if (item.activity) $state.go('dash_activity', {activityId: item.activity.serviceCallOutId});
    }    
    
    
    
    
    $scope.duration = 30;
    $ionicModal.fromTemplateUrl('templates/dash_depot.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal2 = modal;
    });

    $scope.addDepot={};
    
    var loadDepot = function() {
        $scope.depots = [];
        var items = Depots.all();
        for (var i = 0; i < items.length; i++) {
            $scope.depots.push({
                                id: items[i].id,
                                desc: items[i].desc,
                                address: items[i].address,
                                lat: items[i].lat,
                                lng: items[i].lng,
                                checked: false
                            });
        };         
    };

    $scope.depotOpenModal = function () {
        loadDepot();
        $scope.modal2.show();        
    };

    $scope.addDepot = function () {        
         
        //console.log($scope.addDepot.depotSelected);
        $scope.modal2.hide();
        $scope.popover.hide();
        
        var depotActivity = {
            hr: '19:00',
            colorItem: '#fff',
            activity: {
                serviceCallOutId: $scope.addDepot.depotSelected.id,
                type:'DEPOT',
                address: $scope.addDepot.depotSelected.address,
                //builder: '67-68 Ballybough Rd',
                //builderAddress: '67-68 Ballybough Rd',
                //houseType: 'Semi - Detached',
                //inWarranty: true,
                //contactName: 'Jhon Smith',
                lat: $scope.addDepot.depotSelected.lat,
                lng: $scope.addDepot.depotSelected.lng,
                //iconclass: '1',
                scheduledDate: new Date('01/01/2016 19:00:00'),
                createdDate: new Date('01/01/2016 19:00:00'),
                //updatedDate: '',
                //status: 'Pending',
                //startDate: '',
                //startTime: '',
                //endTime: '',
                //paymentStatus: 'Not Blocked',
                //servicemanContactedCustomer: 'Y',
                //scheduleConfirmedByCustomer: 'Y',
                //emergency: 'N',                
            }};
    
    
        $scope.activities.push(depotActivity);
        
        $scope.rescheduleHours();            

    };

    $scope.depotCloseModal = function() {             
        $scope.modal2.hide();
    }
    
    $scope.rescheduleHours = function () {
                
        var h = 8;
        var m = 0;        
        for (var i = 0; i < $scope.activities.length; i++) {        
            var newDate = new Date($scope.activities[i].activity.scheduledDate);
            newDate.setHours(h, m, 0);            
            $scope.activities[i].activity.scheduledDate = newDate;            
            if(m>0){
                h++;
                m=0;
            } else {
                m = m+30;                
            }
            
        }                
    
    }
    
    
    
})


/********************************************
DashActvityCtrl
*********************************************/
.controller('DashActvityCtrl', function ($scope, $state, $http, $ionicPopup, $stateParams, $ionicPopover, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, $timeout, ProcessOut, Process, ServicemanData, Countries, ServicemanActivities, Hours) {

    console.log("DashActvityCtrl...");

    $scope.$on('$ionicView.beforeEnter', function (event, viewData) { // after tab view allows view back button
        viewData.enableBack = true;
    });

    $ionicPopover.fromTemplateUrl('options_activity.html', {
          scope: $scope
       }).then(function(popover) {
          $scope.popover_options = popover;
    });

    $scope.openOptions = function($event) {
        $scope.popover_options.show($event);
    };

    $scope.closeOptions = function() {
        $scope.popover_options.hide();
    };

    $scope.callVisit={};

    if ($stateParams.activityId) { 
        $scope.callVisit = ServicemanActivities.getActivity($stateParams.activityId);        
    }
    
    /*var map = L.map('mapVisit', {
        center: [53.359849, -6.244934],
        zoom: 14,
        tap: false,
        attributionControl: false
    });

    var icon1 = L.icon({
        iconUrl: 'img/marker2.png',
        iconSize: [22, 40], // size of the icon
        iconAnchor: [11, 35], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
    });


    if ($scope.isOnline() || !window.cordova) {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);
    } else {
        L.tileLayer(cordova.file.applicationDirectory + 'www/maps/Mapquest/{z}/{x}/{y}.png', {
            maxZoom: 16,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);
    }

    var latlng = L.latLng([$scope.callVisit.activity.lat, $scope.callVisit.activity.lng]);
    
    L.marker(latlng).addTo(map)
        .bindPopup($scope.callVisit.activity.address);
    
    map.setView(latlng, 13);*/

    $scope.isStarted = false;

    $scope.startActivity = function(){
        
        var confirmPopup = $ionicPopup.confirm({
            title: 'Start Service Call Out Visit',
            template: 'Are you sure you want to start the visit?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
            if(res) {
                $scope.isStarted = true; 
                console.log('You are sure');               
                //$state.go('dash_activity', {}, {reload: true}); //                
            } else {
                console.log('You are not sure');
            }
            $scope.closeOptions();            
        });
    }

    $scope.endActivity = function(){
        if($scope.isStarted) {
                console.log("$scope.isStarted ", $scope.isStarted);
                $scope.closeOptions();
                $state.go('dash_activity_end', {activityId: $scope.callVisit.activity.serviceCallOutId});
        }else{
                console.log("$scope.isStarted ", $scope.isStarted);
            
               var alertPopup = $ionicPopup.alert({
                 title: 'The Call Out Visit has not been started yet',
                 template: 'Start the Call Out Visit before completing',
                 okType: APP_PARAMS.button_dialog
               });

               alertPopup.then(function(res) {
                 console.log('Thank you');
               });

        }
    }

    $scope.data={};

    $scope.addComment = function(){
        var myPopup = $ionicPopup.show({
        template: '<textarea name="comment" rows="6" placeholder="Please write a comment" ng-model="data.comment">',
        title: 'Rescheduling of this Visit for another day',
        //subTitle: 'Please write a comment',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>OK</b>',
            type: 'button-dark',
            onTap: function(e) {
              if (!$scope.data.comment) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.comment;
              }
            }
          }
        ]
      });
    }

    $scope.data1={};

    $scope.addComment1 = function(){
        var myPopup = $ionicPopup.show({
        template: '<textarea name="comment" rows="6" placeholder="Please write a comment" ng-model="data1.comment">',
        title: 'Cannot attend this Visit',
        //subTitle: 'Please write a comment',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>OK</b>',
            type: 'button-dark',
            onTap: function(e) {
              if (!$scope.data1.comment) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data1.comment;
              }
            }
          }
        ]
      });
    }


    $ionicModal.fromTemplateUrl('templates/dash_activity_reschedule.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
    });


    $scope.rescheduleToday = function () {
        
        /*$scope.data = {
          showReorder: false
        };

        $scope.activities = ServicemanActivities.getScheduleActivities();

        var activity;

        $scope.moveItem = function(item, fromIndex, toIndex) {

            activity = {
                        hr: item.hr,
                        colorItem: ''       
                       };

            $scope.activities.splice(fromIndex, 1);
            $scope.activities.splice(fromIndex, 0, activity);

            var hours = Hours.getHours();
            for (var i = 0; i < hours.length; i++) {
                if (i ==  toIndex) {
                    //console.log("%%%% hours[i]  " + hours[i]);
                    item.hr = hours[i];
                    break;
                };
            };

            $scope.activities.splice(toIndex, 1);
            $scope.activities.splice(toIndex, 0, item);

        };  
        $scope.modal.show(); */ 
        $state.go('dash', {}, {reload: true});

        $scope.closeOptions();
    };

    $scope.closeModal = function(){
        $scope.modal.hide();
    }


    $scope.saveReschedule = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Reschedule Service Call Out Visit',
            template: 'Are you sure you want to save the changes?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
            if(res) {
                $scope.modal.hide();                
            } else {
                console.log('You are not sure');
            }
        });
    }
  

})

/********************************************
DashActvityEndCtrl
*********************************************/
.controller('DashActvityEndCtrl', function ($scope, $state, $http, $ionicPopup, $stateParams, $ionicPopover, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, ServicemanData, Countries, ServicemanActivities, Status) {

    console.log("DashActvityEndCtrl...");

    $scope.activityId = $stateParams.activityId;

    $scope.startActivity = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Start Service Call Out Visit',
            template: 'Are you sure you want to start the visit?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
            if(res) {
                $scope.callVisit.activity.status = 'Started';
                
            } else {
                console.log('You are not sure');
            }
        });
    }

    $scope.addComment = function(){
        var myPopup = $ionicPopup.show({
        template: '<textarea name="comment" rows="4" placeholder="" ng-model="data.comment">',
        title: 'Comment',
        subTitle: 'Please write a comment',
        scope: $scope,
        buttons: [
          { text: 'Cancel' },
          {
            text: '<b>OK</b>',
            type: 'button-dark',
            onTap: function(e) {
              if (!$scope.data.wifi) {
                //don't allow the user to close unless he enters wifi password
                e.preventDefault();
              } else {
                return $scope.data.wifi;
              }
            }
          }
        ]
      });
    }

    $ionicPopover.fromTemplateUrl('popover1.html', {
          scope: $scope
       }).then(function(popover) {
          $scope.popover1 = popover;
       });

    $scope.openPopover1 = function($event) {
      $scope.popover1.show($event);
    };

    $scope.rescheduleToday = function(){
        //$state.go('main.dash_activitiesList');
    }

    var varStatus = Status.getStatus();
    
    $scope.statusFinalize = varStatus.statusFinalize;
    $scope.statusSignature = varStatus.statusSignature;
    $scope.statusSignatureDoc = varStatus.statusSignatureDoc;
    $scope.statusPayment = varStatus.statusPayment;
    $scope.statusSendSms = varStatus.statusSendSms;

    $scope.endCallVisit = function(){

        var confirmPopup = $ionicPopup.confirm({
            title: 'End Service Call out Visit',
            template: 'Are you sure you want to terminate the visit?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
                
                var changeStatus = ServicemanActivities.setStatusActivity('Finalized', $scope.activityId);

                $state.go('dash_activity', {activityId: $scope.activityId});
            } else {
                console.log('You are not sure');
            }
        });
    }
})

/********************************************
DashActivitySendSmsCtrl
*********************************************/
.controller('DashActivitySendSmsCtrl', function ($scope, $state, $http, $ionicPopup, $stateParams, $ionicPopover, AuthService, $ionicModal, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, Process, ProcessOut, AddServiceRequest, $q, ServicemanActivities, Property, Status) {

    console.log('DashActivitySendSmsCtrl');

    $scope.activityId = $stateParams.activityId;

    var map = L.map('map4', {
        center: [53.359849, -6.244934],
        zoom: 13,
        tap: false,
        attributionControl: false
    });


    if ($scope.isOnline() || !window.cordova) {
        L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);
    } else {
        L.tileLayer(cordova.file.applicationDirectory + 'www/maps/Mapquest/{z}/{x}/{y}.png', {
            maxZoom: 16,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);
    }

    
    /*L.Routing.control({
                  waypoints: [
                    L.latLng(53.359849, -6.244934),
                    L.latLng(53.365074, -6.284373)
                  ],
                  showAlternatives: true
                }).addTo(map);*/ 

    var latlng = L.latLng([53.359849, -6.244934], [53.365074, -6.284373]);

    L.Routing.control({
                  waypoints: [
                    L.latLng(53.359849, -6.244934),
                    L.latLng(53.365074, -6.284373)
                  ],
                  showAlternatives: true
                }).addTo(map);

    var greenIcon = L.icon({
        iconUrl: 'img/marker1.png',
        //shadowUrl: 'leaf-shadow.png',

        iconSize:     [25, 45], // size of the icon
        //shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    L.marker([53.359849, -6.244934]).addTo(map);
    L.marker([53.365074, -6.284373]).addTo(map);

    
    $scope.save = function () {
        
        var confirmPopup = $ionicPopup.confirm({
            title: 'Send Sms',
            template: 'Are you sure you want to send the sms?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
         if(res) {
            console.log('You are sure');
             var changeStatus = Status.setStatusSendSms("Message sent");
             $state.go('dash_activity_end', {activityId: $stateParams.activityId});
           
         } else {
           console.log('You are not sure');
         }
       });
    };
    
    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }    


})

/********************************************
DashActvityEndItemsCtrl
*********************************************/
.controller('DashActvityEndItemsCtrl', function ($scope, $state, $http, $ionicPopup, $stateParams, $ionicPopover, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, ServicemanData, ServicemanActivities, Reasons, ProductTypeRange, Status) {

    console.log("DashActvityEndItemsCtrl...");

    $scope.activityId = $stateParams.activityId;

    $scope.materials = [];
    $scope.materials = ServicemanActivities.getActivityMaterials($scope.activityId);

    $scope.stockItems = [];
    $scope.stockItems = ServicemanActivities.getActivityStockItems($scope.activityId);

    $scope.types = ProductTypeRange.all();
    $scope.typeSelected = {"type": '', "ranges": []};
    $scope.rangeSelected = {"name": ''};

    $scope.reasons = [];

    $scope.changeProductType = function(){
        $scope.reasons = [];
        $scope.ranges = ProductTypeRange.getRanges($scope.typeSelected.type);
    }

    $scope.changeProductRange = function(){
        
        $scope.reasons = [];
        if ($scope.rangeSelected.name) {
            var items = Reasons.getReasons($scope.rangeSelected.name);
            
            for (var i = 0; i < items.length; i++) {
                $scope.reasons.push({
                                "mainCode": items[i].mainCode,
                                "subCode": items[i].subCode,
                                "checked" : false      
                              });
            };
            var other = {"mainCode": "Other",
                         "subCode": '',
                         "checked" : false      
                         };

            $scope.reasons.push(other);

        };
    }

    $scope.data = {};

    $scope.selectOther = function(item){
        if (item.mainCode == "Other") {
            var myPopup = $ionicPopup.show({
                template: '<textarea name="comment" rows="4" placeholder="Please write a Reason" ng-model="data.other">',
                title: 'Other Reason',
                //subTitle: '',
                scope: $scope,
                buttons: [
                  { text: 'Cancel',
                    onTap: function(e) {
                      if ($scope.data.other) {
                        $scope.data.other = '';
                      } 
                    }
                  },          
                  {
                    text: '<b>OK</b>',
                    type: 'button-dark',
                    onTap: function(e) {
                      if (!$scope.data.other) {
                        
                        for (var i = 0; i < $scope.reasons.length; i++) {
                            if ($scope.reasons[i].mainCode == item.mainCode) {
                                $scope.reasons[i].subCode = $scope.data.other;
                                break;
                            };
                        };
                      } else {
                        console.log("%%% else $scope.data.other " + $scope.data.other);
                       
                      }
                    }
                  }
                ]
            });
        };
        
    }

    $scope.selectItem = function(item){
        
        for (var i = 0; i < $scope.materials.length; i++) {
            if ($scope.materials[i].code == item.code) {
                if ($scope.materials[i].checked) $scope.materials[i].checked = false;
                else $scope.materials[i].checked = true;                
            };
        };

        for (var i = 0; i < $scope.stockItems.length; i++) {
            if ($scope.stockItems[i].code == item.code) {
                if ($scope.stockItems[i].checked) $scope.stockItems[i].checked = false;
                else $scope.stockItems[i].checked = true;                
            };
        };
    }


    


    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }
    $scope.save = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Finalize Service out Visit',
            template: 'Are you sure you want to finalize the visit?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
                var changeStatus = Status.setStatusFinalize("Finalized");

                $state.go('dash_activity_end', {activityId: $stateParams.activityId});
            } else {
                console.log('You are not sure');
            }
        });
        
        
    }

})

/********************************************
DashActivityEndPaymentCtrl
*********************************************/
.controller('DashActivityEndPaymentCtrl', function ($scope, $state, $http, $ionicPopup, $stateParams, $ionicPopover, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, ServicemanData, ServicemanActivities, Reasons, Payment, Status) {

    console.log("DashActivityEndPaymentCtrl...");

    $scope.types = Payment.all();
    $scope.typeSelected = {"type": ''};

    
    $scope.changeProductRange = function(){
        
        $scope.reasons = [];
        if ($scope.rangeSelected.name) {
            var items = Reasons.getReasons($scope.rangeSelected.name);
            
            for (var i = 0; i < items.length; i++) {
                $scope.reasons.push({
                                "mainCode": items[i].mainCode,
                                "subCode": items[i].subCode,
                                "checked" : false      
                              });
            };
        };
    }



    $scope.cancel = function() {   
        $ionicHistory.goBack();
    }
    $scope.save = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Payment',
            template: 'Are you sure you want to collect the payment?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are sure');
                var changeStatus = Status.setStatusPayment("Finalized");

                $state.go('dash_activity_end', {activityId: $stateParams.activityId});
            } else {
                console.log('You are not sure');
            }
        });
        
        
    }

})

/********************************************
SettingsCtrl
*********************************************/
.controller('SettingsCtrl', function ($scope, $state, $http, $ionicPopup, $ionicSideMenuDelegate, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, OvernightLocations, ServicemanData) {

    console.log("SettingsCtrl...");

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }   

    /*setTimeout(function () {
        
        var map = L.map('mapHomeAddress', {
        center: [53.359849, -6.244934],
        zoom: 14,
        tap: false,
        attributionControl: false
        });
    
        if ($scope.isOnline() || !window.cordova) {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        } else {
            L.tileLayer(cordova.file.applicationDirectory + 'www/maps/Mapquest/{z}/{x}/{y}.png', {
                maxZoom: 16,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        }

        var latlng = L.latLng([53.359849, -6.244934]);

        marker = new L.Marker(latlng, {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'home',
                        prefix: 'ion',
                        markerColor: 'orange',
                        spin: true
                    }),
                    draggable: false
                });
                map.addLayer(marker);
          
        map.setView(latlng, 13);
    }, 200);*/

        /******* Overnight locations********/
    
    //setTimeout(function () {
    /*$scope.$on('$ionicView.loaded', function (viewInfo, state) {
        console.log("map1111...");
        var mapOvernight = L.map('mapOvernight', {
        center: [53.359849, -6.244934],
        zoom: 14,
        tap: false,
        attributionControl: false
        });

        console.log("map22...");
    
        if ($scope.isOnline() || !window.cordova) {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(mapOvernight);
        } else {
            L.tileLayer(cordova.file.applicationDirectory + 'www/maps/Mapquest/{z}/{x}/{y}.png', {
                maxZoom: 16,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(mapOvernight);
        }

        var latlng = L.latLng([53.359849, -6.244934]);

        marker = new L.Marker(latlng, {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'home',
                        prefix: 'ion',
                        markerColor: 'orange',
                        spin: true
                    }),
                    draggable: false
                });
                mapOvernight.addLayer(marker);
                        
        mapOvernight.setView(latlng, 13);

    }, 500);*/
    //});
    
    //$scope.servicemanData = ServicemanData.get();

    //$scope.overnightLocations = OvernightLocations.get();
})



/********************************************
SettingsAddressCtrl
*********************************************/
.controller('SettingsAddressCtrl', function ($scope, $state, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, ServicemanData, OvernightLocations) {

    console.log("SettingsAddressCtrl...");

    setTimeout(function () {

    var map = L.map('mapHomeAddress', {
        center: [53.359849, -6.244934],
        zoom: 14,
        tap: false,
        attributionControl: false
        });
    
        if ($scope.isOnline() || !window.cordova) {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        } else {
            L.tileLayer(cordova.file.applicationDirectory + 'www/maps/Mapquest/{z}/{x}/{y}.png', {
                maxZoom: 16,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        }

        var latlng = L.latLng([53.359849, -6.244934]);

        marker = new L.Marker(latlng, {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'home',
                        prefix: 'ion',
                        markerColor: 'orange',
                        spin: true
                    }),
                    draggable: false
                });
                map.addLayer(marker);
          
        map.setView(latlng, 13);
    }, 200);

    $scope.servicemanData = ServicemanData.get();

})

/********************************************
SettingsAddressEditCtrl
*********************************************/
.controller('SettingsAddressEditCtrl', function ($scope, $state, $http, $ionicPopup, $stateParams, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, ServicemanData, Countries) {

    console.log("SettingsAddressEditCtrl...");

    
    setTimeout(function () {

        var map = L.map('mapEdit', {
            center: [53.359849, -6.244934],
            zoom: 14,
            tap: false,
            attributionControl:false
        });

        var icon1 = L.icon({
            iconUrl: 'img/marker2.png',
            iconSize: [22, 40], // size of the icon
            iconAnchor: [11, 35], // point of the icon which will correspond to marker's location
            popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
        });


        if ($scope.isOnline() || !window.cordova) {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        } else {
            L.tileLayer(cordova.file.applicationDirectory + 'www/maps/Mapquest/{z}/{x}/{y}.png', {
                maxZoom: 16,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        }

        var latlng = L.latLng([53.359849, -6.244934]);
       
        /*L.marker(latlng, {draggable : true}).addTo(map)
            .bindPopup("67-68 Ballybough Rd, Dublin");*/
        
        marker = new L.Marker(latlng, {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'home',
                        prefix: 'ion',
                        markerColor: 'orange',
                        spin: true
                    }),
                    draggable: true
                });
                map.addLayer(marker);

        map.setView(latlng, 13);

    //});
    }, 200);
    

    $scope.serviceman;
    if ($stateParams.addressId) { // edicion
        $scope.serviceman = ServicemanData.getServicemanDataByAddressId($stateParams.addressId);
    }


    $scope.save = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Save Home Address',
            template: 'Are you sure you want to save the changes?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are not sure');
                $state.go('settings');
            } else {
                console.log('You are not sure');
            }
        });
    }

    /*$scope.cancel = function() {   
        //$ionicHistory.goBack();
        $state.go('settings.settingsAddress');
    }*/
})

/********************************************
SettingsLocationsCtrl
*********************************************/
.controller('SettingsLocationsCtrl', function ($scope, $state, $http, $ionicPopup, $compile, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, ServicemanData, OvernightLocations) {

    console.log("SettingsLocationsCtrl...");

    $scope.overnightLocations = OvernightLocations.get();

    setTimeout(function () {

        var mapOvernight = L.map('mapOvernight', {
        center: [53.349849, -6.254934],
        zoom: 13,
        tap: false,
        attributionControl: false
        });

        if ($scope.isOnline() || !window.cordova) {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(mapOvernight);
        } else {
            L.tileLayer(cordova.file.applicationDirectory + 'www/maps/Mapquest/{z}/{x}/{y}.png', {
                maxZoom: 16,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(mapOvernight);
        }

        var markers = [];
        
        $scope.removeMarkers = function(){        
            for(var j=0; j<markers.length; j++){
                mapOvernight.removeLayer(markers[j]);
            }        
        }

        $scope.loadMarkers = function(){
            console.log("loadMarkers");
            $scope.removeMarkers();

            for (var i = 0; i < $scope.overnightLocations.length; i++) {
                var item = $scope.overnightLocations[i];  
                var latlng = L.latLng([item.lat, item.lng]);
                
                var popup = '';
                
                popup = popup + '<div class="col">'+
                                '<h4 style="margin:0;">'+item.address+'</h4>'+
                                
                                '</div></div>';
                
                var newScope = $scope.$new();
               
                var popupContent = popup,
                            linkFunction = $compile(angular.element(popupContent)),
                            newScope
                            ;
                
                markers[i] = new L.Marker(latlng, {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'home',
                        prefix: 'ion',
                        markerColor: 'green',
                        spin: true
                    }),
                    draggable: false
                });

                mapOvernight.addLayer(markers[i]);
                markers[i].bindPopup(linkFunction(newScope)[0]);
            };
        }

    $scope.loadMarkers();

    }, 200);

    


    $scope.data = {
        showDelete: false
    };

    $scope.onItemDelete = function(item) {
        $scope.overnightLocations.splice($scope.overnightLocations.indexOf(item), 1);
        $scope.loadMarkers();
    };
    
    $scope.addLocation = function() {
        $state.go('settingsLocationEdit');
    };

    $scope.editLocation = function(item) {
        $state.go('settingsLocationEdit', {addressId: item.addressId});
    };
    
})

/********************************************
SettingsLocationEditCtrl
*********************************************/
.controller('SettingsLocationEditCtrl', function ($scope, $state, $http, $ionicPopup, $stateParams, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, Process, OvernightLocations, Countries) {

    console.log("SettingsLocationEditCtrl...");

    //setTimeout(function () {
        var map;
                
         map = L.map('mapOvernightEdit', {
            center: [53.359849, -6.244934],
            zoom: 14,
            tap: false,
            attributionControl:false
        });

        if ($scope.isOnline() || !window.cordova) {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        } else {
            L.tileLayer(cordova.file.applicationDirectory + 'www/maps/Mapquest/{z}/{x}/{y}.png', {
                maxZoom: 16,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(map);
        }

        //var latlng = L.latLng([53.359849, -6.244934]);
       
    //});
    //}, 200);

    $scope.overnightLocation;
    $scope.isEdit = false;
    
    if ($stateParams.addressId) { // edicion

         $scope.isEdit = true;
         $scope.overnightLocation = OvernightLocations.getAddressById($stateParams.addressId);
         

    }else{
        $scope.isEdit = false;
        $scope.overnightLocation = OvernightLocations.getAddressById(1001);
    }

    var latlng = L.latLng([$scope.overnightLocation.lat, $scope.overnightLocation.lng]);
    var marker = new L.Marker(latlng, {
                    icon: L.AwesomeMarkers.icon({
                        icon: 'home',
                        prefix: 'ion',
                        markerColor: 'green',
                        spin: true
                    }),
                    draggable: true
                });
    map.addLayer(marker);
    map.setView(latlng, 13);
    
    $scope.save = function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Save Overnight Location',
            template: 'Are you sure you want to save the changes?',
            okType: APP_PARAMS.button_dialog
        });

        confirmPopup.then(function(res) {
            if(res) {
                console.log('You are not sure');
                $state.go('settings');
            } else {
                console.log('You are not sure');
            }
        });
    }

    $scope.cancel = function() {   
        $ionicHistory.goBack();
        //$state.go('main.settings.settingsLocations');
    }

    /*$scope.$on('$ionicView.leave', function (viewInfo, state) {
        console.log("afterLeave: ");
        map.remove();
    }); */
})



;