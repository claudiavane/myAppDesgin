angular.module('ServiceMan')

.controller('CalendarCtrl', function ($scope, $state, $http, $ionicPopup, $ionicActionSheet, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $ionicModal, $cordovaNetwork, ProcessOut, ServicemanActivities, Property, Department, $ionicPopover, Depots, $ionicSideMenuDelegate, $window) {

    console.log("CalendarCtrl...");

    $scope.data = {};
    $scope.data.editMode = false;
    
    $scope.date = new Date();

    var items = ServicemanActivities.getCalendarActivities();


    $scope.toggleEditMode = function () {
        $ionicSideMenuDelegate.canDragContent(!$scope.data.editMode);
    }


    $scope.onDropComplete = function ($data, $event, task) {
        console.log($data, $event, task);        
                
        if($data.hour!=undefined){
            console.log('move');
            
            var temp = $data.item;
            var temp1 = task.item;
            
            task.item = temp;
            $data.item = temp1;
            
        } else {
            
            if(task.item.activity==undefined){
                console.log('new');
                task.item = $data;
            }          
            
        }                                
        
    }

    
    $scope.onDropCompleteDelete = function ($data, $event) {
        console.log($data, $event); 
        if($data!=undefined){
            $data.item = {};
        }                    
    }

    $scope.tasks = [];
    for (var i = 7; i < 21; i++) {
        var busy = false;
        for (var j = 0; j < items.length; j++) {
                    
            if (items[j].activity.scheduledDate!=undefined && items[j].activity.scheduledDate!='' && items[j].activity.scheduledDate.getHours() == i) {
                $scope.tasks.push({
                    hour: i + ':00',
                    item: items[j]
                });
                busy = true;
            }
        };

        if (!busy) {
            $scope.tasks.push({
                hour: i + ':00',
                item: {}
            });
        }
    };


    $scope.activities = [];
    for (var i = 1; i < items.length; i++) {
        $scope.activities.push(items[i]);
    };

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    }



    $scope.moveItem = function (item, fromIndex, toIndex) {
        //Move the item in the array
        $scope.tasks.splice(fromIndex, 1);
        $scope.tasks.splice(toIndex, 0, item);

        var newDate = new Date();
        var hr = $scope.tasks[fromIndex].hour.substring(0, $scope.tasks[fromIndex].hour.indexOf(':'));
        newDate.setHours(hr);

        var oldDate = new Date();
        var hr1 = $scope.tasks[toIndex].hour.substring(0, $scope.tasks[toIndex].hour.indexOf(':'));
        oldDate.setHours(hr1);

        $scope.tasks[fromIndex].hour = oldDate.getHours() + ':00';
        $scope.tasks[toIndex].hour = newDate.getHours() + ':00';

    };


    $scope.onItemDelete = function (task, $index) {
        
        console.log(task, $index);
        $scope.tasks[$index].item = {};

    }

    
    $scope.goToActivity = function (item) {  
        if(item.activity.type=='SERCALL'){
            console.log("item.activity.serviceCallOutId", item.activity.serviceCallOutId);
            $state.go('dash_activity', {activityId: item.activity.serviceCallOutId});
        }
    }

    $ionicPopover.fromTemplateUrl('popover_schedule.html', {
        scope: $scope,
    }).then(function (popover) {
        $scope.popover = popover;
    });


    $ionicModal.fromTemplateUrl('templates/workqueue_filters.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalFilter = modal;
    });

    var loadData = function () {

        var items = [];
        var items1 = [];
        var items2 = [];
        $scope.types = [];
        $scope.details = [];
        $scope.states = [];
        for (var i = 0; i < $scope.activities.length; i++) {
            if (items.indexOf($scope.activities[i].activity.type) == -1) {
                items.push($scope.activities[i].activity.type);
                $scope.types.push({
                    "text": $scope.activities[i].activity.desc,
                    "checked": true
                });
            }
            if (items1.indexOf($scope.activities[i].activity.details) == -1) {
                items1.push($scope.activities[i].activity.details);
                $scope.details.push({
                    "text": $scope.activities[i].activity.details,
                    "checked": true
                });
            }
            if (items2.indexOf($scope.activities[i].activity.status) == -1) {
                items2.push($scope.activities[i].activity.status);
                $scope.states.push({
                    "text": $scope.activities[i].activity.status,
                    "checked": true
                });
            }
        }
    };

    $scope.isAllSelectTypes = true;
    $scope.selectAllTypes = function () {

        if ($scope.isAllSelectTypes) $scope.isAllSelectTypes = false
        else $scope.isAllSelectTypes = true;

        for (var i = 0; i < $scope.types.length; i++) {
            $scope.types[i].checked = $scope.isAllSelectTypes;
        };
    }

    $scope.isAllSelectDetails = true;
    $scope.selectAllDetails = function () {
        if ($scope.isAllSelectDetails) $scope.isAllSelectDetails = false
        else $scope.isAllSelectDetails = true;

        for (var i = 0; i < $scope.details.length; i++) {
            $scope.details[i].checked = $scope.isAllSelectDetails;
        };
    }

    $scope.isAllSelectStates = true;
    $scope.selectAllStates = function () {

        if ($scope.isAllSelectStates) $scope.isAllSelectStates = false
        else $scope.isAllSelectStates = true;

        for (var i = 0; i < $scope.states.length; i++) {
            $scope.states[i].checked = $scope.isAllSelectStates;
        };
    }

    $scope.openFilter = function () {
        loadData();
        $scope.modalFilter.show();
    };

    $scope.closeFilter = function () {
        $scope.modalFilter.hide();
    }

    $scope.filter = function () {
        $scope.modalFilter.hide();
    };


    $ionicModal.fromTemplateUrl('templates/workqueue_statusDetail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalStatus = modal;
    });

    var loadStatus = function () {
        $scope.status = [{
                text: 'Service Query',
                status: 'Open'
            },
            {
                text: 'Item Status',
                status: 'Open'
            },
            {
                text: 'Quote Status',
                status: 'Awaiting Approval'
            },
            {
                text: 'Payment Status',
                status: '-'
            },
            {
                text: 'Material/Stock Status',
                status: 'No'
            },
            {
                text: 'Invoiced',
                status: 'No'
            },
            {
                text: 'Assigned',
                status: 'Yes'
            },
            {
                text: 'Scheduled',
                status: '-'
            },
            {
                text: 'Emergency?',
                status: '-'
            },
            {
                text: 'Completed/Cancelled',
                status: '-'
            },
            {
                text: 'Re-Assigned/Re-Scheduled/Re-Opened',
                status: '-'
            },
            {
                text: 'Customer Confirmed Scheduled?',
                status: 'No'
            },
            {
                text: 'Customer Contacted?',
                status: 'No'
            }];
    }

    $scope.openStatus = function () {
        loadStatus();
        $scope.modalStatus.show();
    };
    $scope.closeStatus = function () {
        $scope.modalStatus.hide();
    };

    $ionicModal.fromTemplateUrl('templates/workqueue_logNonService.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalLog = modal;
    });
    var loadDataNonService = function () {
        $scope.departments = Department.all();
        $scope.dataNonServ = {
            callDetail: 'Requirement to contat Service Manager for issue 2345',
            contactName: 'Eoin',
            contactLastName: 'McAleer',
            contactPhoneNumber: '',
            contactEmail: 'EoinMcAleer@email.com',
            department: '',
            departmentSpec: 'Service Department Details'
        };
    };

    $scope.openLogNonService = function () {
        loadDataNonService();
        $scope.modalLog.show();
    };

    $scope.closeLogNonService = function () {
        $scope.modalLog.hide();
    };

    $scope.showActionsheet = function (item) {
        var options = [
            /*{
                text: '<i class="icon ion-forward balanced"></i> Go to Product'
            },*/
            {
                text: '<i class="icon ion-information-circled dark"></i> View Status Detail'
            }];

        if (item.activity.type == 'Non Service Calls Logged & Transferred') {
            options.push({
                text: '<i class="icon ion-compose dark"></i> Take Ownership'
            });
            options.push({
                text: '<i class="icon ion-compose dark"></i> Open Non Service Call Logged'
            });

        } else if (item.activity.type == 'SERCALL' && (item.activity.status == 'Re-Open Request Rejected' || item.activity.status == 'Re-opened')) {
            options.push({
                text: '<i class="icon ion-compose dark"></i> Open Service Call Out Visit'
            });
        };


        $ionicActionSheet.show({
            titleText: 'Options',
            cancelText: 'Cancel',
            cancel: function () {
                console.log('CANCELLED');
            },
            buttons: options,


            buttonClicked: function (index) {

                switch (index) {
                /*case 0:
                    $state.go('workqueue.workqueueProduct');
                    return true;*/
                case 0:
                    $scope.openStatus();
                    return true;
                }

                if (item.activity.type == 'Non Service Calls Logged & Transferred') {
                    switch (index) {
                    case 2:
                        return true;

                    case 3:
                        $scope.openLogNonService();
                        return true;
                    }

                } else if (item.activity.type == 'SERCALL') {
                    switch (index) {
                    case 1:
                        console.log("item: ", item.activity.serviceCallOutId);
                        $state.go('dash_activity', {
                            activityId: item.activity.serviceCallOutId
                        });
                        return true;
                    }

                }
            }

        });


    }


    $scope.duration = 30;
    $ionicModal.fromTemplateUrl('templates/dash_depot.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal2 = modal;
    });

    $scope.addDepot = {};

    var loadDepot = function () {
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
                type: 'DEPOT',
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
            }
        };


        $scope.activities.push(depotActivity);

        $scope.tasks[$scope.tasks.length - 1] = {
            hour: '20:00',
            item: depotActivity
        };

        $scope.rescheduleHours();

    };

    $scope.depotCloseModal = function () {
        $scope.modal2.hide();
    }

    $scope.rescheduleHours = function () {

        var h = 8;
        var m = 0;
        for (var i = 0; i < $scope.activities.length; i++) {
            var newDate = new Date($scope.activities[i].activity.scheduledDate);
            newDate.setHours(h, m, 0);
            $scope.activities[i].activity.scheduledDate = newDate;
            if (m > 0) {
                h++;
                m = 0;
            } else {
                m = m + 30;
            }

        }

    }
    
    $scope.cancelEdition = function () {
        $scope.data.editMode=false;
        //$state.go($state.current, {}, {reload: true});
        $window.location.reload(true);
    }




});