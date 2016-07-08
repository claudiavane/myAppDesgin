angular.module('ServiceMan')
/********************************************
WorkqueueCtrl
*********************************************/
.controller('WorkqueueCtrl', function ($scope, $state, $http, $ionicPopup, $ionicSideMenuDelegate, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut) {

    console.log("WorkqueueCtrl...");

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    } 
})

/********************************************
WorkqueueMainCtrl
*********************************************/
.controller('WorkqueueMainCtrl', function ($scope, $state, $http, $ionicPopup, $ionicActionSheet, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, ServicemanActivities, Property, Department) {

    console.log("WorkqueueMainCtrl...");

    var items = ServicemanActivities.getCalendarActivities();
    $scope.activities = [];
    for (var i = 1; i < items.length; i++) {
       $scope.activities.push(items[i]);
    };

    if ($rootScope.userdata.role == 'ROLE_Logistics_Rep') {
        var activity = {
            hr: '09:30',
            colorItem: '#d7c703',
            activity: {
                serviceCallOutId: '30001',
                type: 'Non Service Calls Logged & Transferred',
                desc: 'Non Service Calls Logged & Transferred',
                details: 'Requeriment to contact Service Manager regarding..',
                address: '',
                builder: '',
                builderAddress: '',
                houseType: '',
                inWarranty: true,
                contactName: 'Jhon Smith',
                lat: 53.3812308,
                lng: -6.2632706,
                iconclass: '2',
                scheduledDate: new Date('01/01/2016 09:30:00'),
                createdDate: new Date('01/01/2016 09:30:00'),
                updatedDate: '',
                status: 'N/A',
                startDate: '',
                startTime: '',
                endTime: '',
                paymentStatus: '',
                servicemanContactedCustomer: '',
                scheduleConfirmedByCustomer: '',
                emergency: '',
                materials: [],
                stockItems: [],
                comments: [],
                materialComment: '',
                materialDraw: '',
                materialImage: '',
                stockComment: '',
                stockDraw: '',
                stockImage: ''
            }
        };
        $scope.activities.push(activity);
    };


    $ionicModal.fromTemplateUrl('templates/workqueue_filters.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalFilter = modal;
    });

    var loadData = function() {
        
        var items = [];
        var items1 = [];
        var items2 = [];
        $scope.types = [];
        $scope.details = [];
        $scope.states = [];
        for (var i = 0; i < $scope.activities.length; i++) {
            if(items.indexOf($scope.activities[i].activity.type) == -1) {
               items.push($scope.activities[i].activity.type);
               $scope.types.push({"text": $scope.activities[i].activity.desc, "checked": true});
            }
            if(items1.indexOf($scope.activities[i].activity.details) == -1) {
               items1.push($scope.activities[i].activity.details);
               $scope.details.push({"text": $scope.activities[i].activity.details, "checked": true});
            }
            if(items2.indexOf($scope.activities[i].activity.status) == -1) {
               items2.push($scope.activities[i].activity.status);
               $scope.states.push({"text": $scope.activities[i].activity.status, "checked": true});
            }
        }
    };

    $scope.isAllSelectTypes=true;    
    $scope.selectAllTypes = function(){
        
        if ($scope.isAllSelectTypes) $scope.isAllSelectTypes=false
        else $scope.isAllSelectTypes=true;            
        
        for (var i = 0; i < $scope.types.length; i++) {                    
            $scope.types[i].checked = $scope.isAllSelectTypes;                
        };       
    }

    $scope.isAllSelectDetails=true;    
    $scope.selectAllDetails = function(){
        if ($scope.isAllSelectDetails) $scope.isAllSelectDetails=false
        else $scope.isAllSelectDetails=true;            
        
        for (var i = 0; i < $scope.details.length; i++) {                    
            $scope.details[i].checked = $scope.isAllSelectDetails;                
        };    
    }

    $scope.isAllSelectStates=true;    
    $scope.selectAllStates = function(){

        if ($scope.isAllSelectStates) $scope.isAllSelectStates=false
        else $scope.isAllSelectStates=true;            
        
        for (var i = 0; i < $scope.states.length; i++) {                    
            $scope.states[i].checked = $scope.isAllSelectStates;                
        };         
    }

    $scope.openFilter = function () {
        loadData();
        $scope.modalFilter.show();        
    };

    $scope.closeFilter = function() {             
        $scope.modalFilter.hide();
    }

    $scope.filter = function () {        
        $scope.modalFilter.hide();
    };


    $ionicModal.fromTemplateUrl('templates/workqueue_statusDetail.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalStatus = modal;
    });

    var loadStatus = function(){
        $scope.status = [{text: 'Service Query', status: 'Open'},
                {text: 'Item Status', status: 'Open'},
                {text: 'Quote Status', status: 'Awaiting Approval'},
                {text: 'Payment Status', status: '-'},
                {text: 'Material/Stock Status', status: 'No'},
                {text: 'Invoiced', status: 'No'},
                {text: 'Assigned', status: 'Yes'},
                {text: 'Scheduled', status: '-'},
                {text: 'Emergency?', status: '-'},
                {text: 'Completed/Cancelled', status: '-'},
                {text: 'Re-Assigned/Re-Scheduled/Re-Opened', status: '-'},
                {text: 'Customer Confirmed Scheduled?', status: 'No'},
                {text: 'Customer Contacted?', status: 'No'}];
    }

    $scope.openStatus = function () {
        loadStatus();
        $scope.modalStatus.show();        
    };
    $scope.closeStatus = function() {             
        $scope.modalStatus.hide();
    };

    $ionicModal.fromTemplateUrl('templates/workqueue_logNonService.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalLog = modal;
    });
    var loadDataNonService = function(){
        $scope.departments = Department.all();
        $scope.dataNonServ = {callDetail: 'Requirement to contat Service Manager for issue 2345', 
                            contactName: 'Eoin',
                            contactLastName: 'McAleer',
                            contactPhoneNumber: '',
                            contactEmail: 'EoinMcAleer@email.com',
                            department: '',
                            departmentSpec: 'Service Department Details'};
    };

    $scope.openLogNonService = function () {
        loadDataNonService();
        $scope.modalLog.show();        
    };

    $scope.closeLogNonService = function() {             
        $scope.modalLog.hide();
    };

    $scope.showActionsheet = function(item) {
        var options = [{ text: '<i class="icon ion-forward balanced"></i> Go to Product' },
                       { text: '<i class="icon ion-information-circled dark"></i> View Status Detail' }];
        
        if (item.activity.type == 'Non Service Calls Logged & Transferred') {
            options.push({ text: '<i class="icon ion-compose dark"></i> Take Ownership' });
            options.push({ text: '<i class="icon ion-compose dark"></i> Open Non Service Call Logged' });
                              
        }else if (item.activity.type == 'SERCALL' && (item.activity.status=='Re-Open Request Rejected' || item.activity.status=='Re-opened') ) {
            options.push({ text: '<i class="icon ion-compose dark"></i> Open Service Call Out Visit' });        
        };


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
                        $state.go('workqueue.workqueueProduct');
                        return true;
                    case 1 :
                        $scope.openStatus();
                        return true;                    
                }

                if (item.activity.type == 'Non Service Calls Logged & Transferred'){
                    switch (index){
                        case 2 :                            
                            return true;
                        
                        case 3 :
                            $scope.openLogNonService();
                            return true;
                    }

                }else if (item.activity.type == 'SERCALL'){
                    switch (index){
                        case 2 :
                        console.log("item: ", item.activity.serviceCallOutId);
                        $state.go('dash_activity', {activityId: item.activity.serviceCallOutId});
                        return true;
                    }
                }
            }
        });  
    }

})

/********************************************
WorkqueueProductCtrl
*********************************************/
.controller('WorkqueueProductCtrl', function ($scope, $state, $http, $ionicPopup, APP_PARAMS, $ionicHistory, $ionicActionSheet, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, ServicemanActivities) {

    console.log("WorkqueueProductCtrl...");

    $scope.activities = ServicemanActivities.getCalendarActivities();
    $scope.products = ServicemanActivities.getProducts();
    
    $ionicModal.fromTemplateUrl('templates/workqueue_filters.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modalFilter = modal;
    });

    var loadData = function() {
        
        var items = [];
        var items1 = [];
        var items2 = [];
        $scope.types = [];
        $scope.details = [];
        $scope.states = [];
        for (var i = 0; i < $scope.activities.length; i++) {
            if(items.indexOf($scope.activities[i].activity.type) == -1) {
               items.push($scope.activities[i].activity.type);
               $scope.types.push({"text": $scope.activities[i].activity.desc, "checked": true});
            }
            if(items1.indexOf($scope.activities[i].activity.details) == -1) {
               items1.push($scope.activities[i].activity.details);
               $scope.details.push({"text": $scope.activities[i].activity.details, "checked": true});
            }
            if(items2.indexOf($scope.activities[i].activity.status) == -1) {
               items2.push($scope.activities[i].activity.status);
               $scope.states.push({"text": $scope.activities[i].activity.status, "checked": true});
            }
        }
    };

    $scope.isAllSelectTypes=true;    
    $scope.selectAllTypes = function(){
        
        if ($scope.isAllSelectTypes) $scope.isAllSelectTypes=false
        else $scope.isAllSelectTypes=true;            
        
        for (var i = 0; i < $scope.types.length; i++) {                    
            $scope.types[i].checked = $scope.isAllSelectTypes;                
        };       
    }

    $scope.isAllSelectDetails=true;    
    $scope.selectAllDetails = function(){
        if ($scope.isAllSelectDetails) $scope.isAllSelectDetails=false
        else $scope.isAllSelectDetails=true;            
        
        for (var i = 0; i < $scope.details.length; i++) {                    
            $scope.details[i].checked = $scope.isAllSelectDetails;                
        };    
    }

    $scope.isAllSelectStates=true;    
    $scope.selectAllStates = function(){

        if ($scope.isAllSelectStates) $scope.isAllSelectStates=false
        else $scope.isAllSelectStates=true;            
        
        for (var i = 0; i < $scope.states.length; i++) {                    
            $scope.states[i].checked = $scope.isAllSelectStates;                
        };         
    }

    $scope.openFilter = function () {
        loadData();
        $scope.modalFilter.show();        
    };

    $scope.closeFilter = function() {             
        $scope.modalFilter.hide();
    }

    $scope.filter = function () {        
        $scope.modalFilter.hide();
    };


    $scope.showActionsheet = function(item) {
        var options = [];
        if ($rootScope.userdata.role == 'ROLE_Serviceman') {
            options = [{ text: '<i class="icon ion-ios-redo dark"></i> Received' }, // index 0
                        { text: '<i class="icon ion-ios-undo dark"></i> Return to Depot' },
                        { text: '<i class="icon ion-reply-all dark"></i> Given to Logistics Rep' }];
        }else if($rootScope.userdata.role == 'ROLE_Logistics_Rep'){
            options = [{ text: '<i class="icon ion-ios-redo dark"></i> Received from Serviceman' }, // index 0
                        { text: '<i class="icon ion-ios-undo dark"></i> Given to Serviceman' },
                        { text: '<i class="icon ion-reply-all dark"></i> Given to Dispatch Rep' }];
        };
    
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
                        return true;
                    case 1 :
                        return true;
                    case 2 :
                        return true;
                }
            }

        });        
    }

    
});