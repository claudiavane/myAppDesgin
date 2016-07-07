angular.module('ServiceMan')


/********************************************
DashCtrl
*********************************************/
.controller('DashCtrl', function ($scope, $state, $http, $ionicPopup, $ionicPopover, $ionicSideMenuDelegate, AuthService, $ionicModal, APP_PARAMS, $ionicHistory, $ionicPopup, $rootScope, $ionicLoading, $compile, Process, ProcessOut, AddServiceRequest, $q, ServicemanActivities, Property, Depots, $ionicPopover, ServicemanData, $window) {

    console.log('DashCtrl');

    $scope.title = "All Service Call-Out Visit";
    $scope.data = {};
    $scope.data.editMode = false;

    $scope.toggleEditMode = function () {
        $ionicSideMenuDelegate.canDragContent(!$scope.data.editMode);
    }

    $scope.openMenu = function () {
        $ionicSideMenuDelegate.toggleLeft();
    } 
    
    $scope.date = new Date();

    $scope.setToday = function () {
        $scope.date = new Date();
        console.log("hoy ", $scope.date);
    }   

    $ionicPopover.fromTemplateUrl('popover_schedule.html', {
    scope: $scope,
      }).then(function(popover) {
        $scope.popover = popover;
      });
    
    var servicemanData = ServicemanData.get();

    var firstActivity = {
            hr: '08:00',
            colorItem: '#9fc377',
            activity: {
                serviceCallOutId: 'Home',
                type:'HOME',
                address: servicemanData.address.addressLine1,
                //builder: '67-68 Ballybough Rd',
                //builderAddress: '67-68 Ballybough Rd',
                //houseType: 'Semi - Detached',
                //inWarranty: true,
                //contactName: 'Jhon Smith',
                lat: servicemanData.lat,
                lng: servicemanData.lng,
                //iconclass: '1',
                scheduledDate: new Date('01/01/2016 06:00:00'),
                createdDate: new Date('01/01/2016 06:00:00'),
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

    $scope.schedules = ServicemanActivities.getScheduledActivities();
    $scope.schedules.splice(0, 0, firstActivity);

    $scope.activities = ServicemanActivities.getCalendarActivities();
    $scope.activities.splice(0, 0, firstActivity);
 
    $scope.showAllItems = function () {
        $scope.title = "All Service Call-Out Visit";
        $scope.activities = ServicemanActivities.getCalendarActivities();
        console.log ( $scope.activities );
        
        $scope.popover.hide();
        $scope.traceRoutes();
    };

    $scope.showScheduledtems = function () {
        $scope.title = "Scheduled Service Call-Out Visit";
        $scope.activities = ServicemanActivities.getScheduledActivities();
        console.log ( $scope.activities );
        $scope.popover.hide();
        $scope.traceRoutes();
    };
    
    $scope.showUnscheduledtems = function () {
        $scope.title = "Unscheduled Service Call-Out Visit";
        $scope.activities = ServicemanActivities.getScheduledActivities();
        $scope.popover.hide();
    };

    var map = L.map('mapl', {
        center: [53.3479, -6.2631],
        zoom: 13,
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
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            id: 'mapbox.streets'
        }).addTo(map);
    }
  
    var markers = [];
    
    $scope.removeMarkers = function(){        
        for(var j=0; j<markers.length; j++){
            map.removeLayer(markers[j]);
        }        
    }
    
    var routingControl;
    
    $scope.traceRoutes = function(){                
                                    
        if(map!=undefined){        
            $scope.removeMarkers();
            /*if($scope.routingControl!=undefined){ 
                map.removeControl(routingControl);
            }*/
            
            var visits = [];
            for (var i = 0; i < $scope.activities.length; i++) {
                var item = $scope.activities[i].activity;  
                var latlng = L.latLng([item.lat, item.lng]);
                     
                var popup = '';
                var title = '';
                
                if(item.type=='SERCALL'){
                    title = ' - Service Call-Out Visit';
                }
                
                if(item.type=='DEPOT'){
                    title = ' - Depot';
                }
                
                popup = popup + '<div class="col popupmap">'+
                                '<h4 style="margin:0;">'+ item.serviceCallOutId + title +'</h4>'+
                                '<h5>'+item.address+'</h5>'  +
                                 '<div class="spacer"></div>';
                
                if(item.type=='SERCALL'){
                    if(item.status != 'Unschedule'){
                        popup = popup + '<ion-list >'+
                            '  <ion-radio ng-model="confirmation" value="unconfirmed">Schedule Unconfirmed by Customer</ion-radio>'+
                            '  <ion-radio ng-model="confirmation" value="confirmed">Schedule Confirmed by Customer </ion-radio>'+
                            '</ion-list>'+
                            '<div class="spacer"></div>'+
                            '<div class="spacer"></div>'+
                            '<ion-checkbox class="checkbox-balanced" ng-model="contacted" aria-label="Contacted Customer">Contacted Customer</ion-checkbox>';

                    }
                    
                    if(item.status=='Unschedule'){ 
                        popup = popup +  '<div class="spacer">'+
                                 '</div><div class="row">'+
                                    '<button class="button icon-left ion-android-alarm-clock button-balanced" ng-click="scheduleServiceCallOut(' + item.serviceCallOutId + ')" style="margin-right:10px">Schedule</button>'+
                                '</div>';
                    }else{
                        popup = popup +  '<div class="spacer">'+
                                 '</div><div class="row">'+
                                    //'<button class="button icon-left ion-android-sync button-dark" ng-click="rescheduleOpenModal();" style="margin-right:10px">Re-Schedule</button>'+
                                    '<button class="button icon-left ion-android-delete button-dark" ng-click="unscheduleServiceCallOut(' + item.serviceCallOutId + ')">Unschedule</button>'+
                                '</div>';    
                    }   
                    
                }
                
                popup = popup + '</div>';
                
                var newScope = $scope.$new();
                newScope.confirmation = item.scheduleConfirmedByCustomer=='Y'?'confirmed':'unconfirmed';
                newScope.contacted = item.servicemanContactedCustomer=='Y'?true:false;
                
                var popupContent = popup,
                            linkFunction = $compile(angular.element(popupContent)),
                            newScope;
                
                var color ='';
                var icon ='';
                var prefix = '';                  
            
            
                if(item.servicemanContactedCustomer=='Y' && item.scheduleConfirmedByCustomer=='N'){
                    icon = 'x zmdi zmdi-calendar-alt';
                    color = 'darkgreen';
                }
                
                if(item.servicemanContactedCustomer=='Y' && item.scheduleConfirmedByCustomer=='Y'){
                    icon = 'x zmdi zmdi-calendar-alt';
                    color = 'green';
                } 
                
                if(item.servicemanContactedCustomer=='N' && item.scheduleConfirmedByCustomer=='N'){
                    icon = 'x zmdi zmdi-calendar-alt';
                    color = 'red';
                }
                
                if(item.servicemanContactedCustomer=='N' && item.scheduleConfirmedByCustomer=='Y'){
                    icon = 'x zmdi zmdi-calendar-alt';
                    color = 'green';
                }
                
                if(item.status=='Closed'){
                    icon = 'x zmdi zmdi-calendar-check';
                    color = 'blue';
                }
                
                if(item.status=='Unschedule'){
                    icon = 'x zmdi zmdi-calendar-close';
                    color = 'purple';
                }  
                
                if(item.type=='DEPOT'){
                    icon = 'x zmdi zmdi-store-24';
                    color = 'cadetblue';
                    prefix = '';
                }
                
                if(item.type=='HOME'){
                    icon = 'x zmdi zmdi-home';
                    color = 'orange';
                    prefix = ''; 
                }
                
                var number = i + 1;

                if(item.status != 'Unschedule'){ 
                    visits.push(latlng);

                    markers[i] = new L.Marker(latlng, {
                    icon: L.AwesomeMarkers.icon({
                            icon: icon,
                            prefix: prefix,
                            markerColor: color,
                            spin: true
                        }),
                        draggable: false
                    }).bindLabel(number+'', { noHide: true });
                }else{
                    markers[i] = new L.Marker(latlng, {
                    icon: L.AwesomeMarkers.icon({
                            icon: icon,
                            prefix: prefix,
                            markerColor: color,
                            spin: true
                        }),
                        draggable: false
                    }).bindLabel("Not Scheduled", { noHide: true });
                } 
                
                map.addLayer(markers[i]);
                markers[i].bindPopup(linkFunction(newScope)[0]);

                               
            } 

            if(routingControl!=undefined){
                routingControl.getPlan().setWaypoints(visits);                    
            } else {
                routingControl = new L.Routing.control({
                      waypoints: visits,
                      showAlternatives: true,
                      show: false,

                      createMarker: function() { return null; },
                      collapsible: true,
                    }).addTo(map);                    
            }
            
            //map.setView(visits[0], 13);        
            map.fitBounds(visits);            
        }
    }
    
    $scope.traceRoutes();
    
    $scope.viewPosition = function (lat, lng) { 
        console.log(lat, lng);
        var latlng = L.latLng([lat, lng]);
        map.setView(latlng, 14);        
    }
    
    function onMarkerClick(e) {
        console.log("onMarketClick " + this.getLatLng());
        this.openPopup();
    }

    $scope.loadMore = function () {
        if ($scope.dataList.length > $scope.numberOfItemsToDisplay) {
            $scope.numberOfItemsToDisplay += 10;
        }
        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

    /*$scope.data = {
          showReorder: false
    };*/
    
    var activity;
    $scope.moveItem = function(item, fromIndex, toIndex) {
        
        if(fromIndex!=0 && toIndex!=0){
        
            //console.log($scope.schedules, $scope.activities, item, fromIndex, toIndex);            
            //console.log($scope.activities.indexOf(item));
            
            //$scope.activities.splice(fromIndex, 1);            
            $scope.activities.splice($scope.activities.indexOf(item), 1);            
            $scope.activities.splice(toIndex, 0, item);

            $scope.schedules.splice(fromIndex, 1);
            $scope.schedules.splice(toIndex, 0, item);

            $scope.rescheduleHours();
            $scope.traceRoutes();
        }
    };  
    
    
    $scope.rescheduleHours = function () {
                
        var h = 8;
        var m = 0;        
        for (var i = 0; i < $scope.schedules.length; i++) { 

            //console.log( $scope.schedules[i].activity );

            var newDate = new Date($scope.schedules[i].activity.scheduledDate);
            newDate.setHours(h, m, 0);            
            $scope.schedules[i].activity.scheduledDate = newDate;            
            if(m>0){
                h++;
                m=0;
            } else {
                m = m+30;                
            }            
        }    
    }
    
    $ionicModal.fromTemplateUrl('templates/dash_activity_reschedule.html', {
            scope: $scope,
            animation: 'slide-in-up'
            }).then(function(modal) {
                $scope.modal = modal;
    });

    
    $scope.goToActivity = function (item) {  
        if(item.activity.type=='SERCALL'){
            console.log("item.activity.serviceCallOutId", item.activity.serviceCallOutId);
            $state.go('dash_activity', {activityId: item.activity.serviceCallOutId});
        }
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
        $scope.popover.hide();
    };

    $scope.addDepot = function () {        
         
        //console.log($scope.addDepot.depotSelected);
        $scope.modal2.hide();
        
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
        $scope.schedules.push(depotActivity);
        
        $scope.rescheduleHours();
        $scope.traceRoutes();

    };

    $scope.depotCloseModal = function() {             
        $scope.modal2.hide();
    }

    $scope.scheduleServiceCallOut = function (itemId) { 
        //$scope.schedules.push(item);
        ServicemanActivities.scheduleActivity('Scheduled', itemId);

        var  activity = ServicemanActivities.getActivity(itemId);
        
        console.log ( activity );
        $scope.schedules.push(activity);

        $scope.rescheduleHours();
        $scope.traceRoutes();
        $scope.data.editMode = true;
    }
    
    $scope.unscheduleServiceCallOut = function (itemId) { 
            
        for (var i = 0; i < $scope.activities.length; i++) {            
            if($scope.activities[i].activity.serviceCallOutId == itemId){
                $scope.activities[i].activity.status = 'Unschedule';
            }            
        }
        
        for (var i = 0; i < $scope.schedules.length; i++) {            
            if($scope.schedules[i].activity.serviceCallOutId == itemId){
                $scope.schedules.splice(i, 1);
            }            
        }
        
        $scope.rescheduleHours();
        $scope.traceRoutes();
        $scope.data.editMode = true;
    }

    $scope.cancelEdition = function () {
        $scope.data.editMode=false;
        //$state.go($state.current, {}, {reload: true});
        $window.location.reload(true);
    }
    
});

