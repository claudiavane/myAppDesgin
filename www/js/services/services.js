angular.module('ServiceMan')


/********************************************
DBA
*********************************************/
.factory('DBA', function ($cordovaSQLite, $q, $ionicPlatform) {
    var self = this;

    // Handle query's and potential errors
    self.query = function (query, parameters) {
        parameters = parameters || [];
        var q = $q.defer();

        $ionicPlatform.ready(function () {
            $cordovaSQLite.execute(db, query, parameters)
                .then(function (result) {
                    q.resolve(result);
                }, function (error) {
                    console.warn('I found an error');
                    console.warn(error);
                    q.reject(error);
                });
        });
        return q.promise;
    }

    // Proces a result set
    self.getAll = function (result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }
        return output;
    }

    // Proces a single result
    self.getById = function (result) {
        var output = null;
        output = angular.copy(result.rows.item(0));
        return output;
    }

    return self;
})

/********************************************
Process
*********************************************/
.factory('Process', function ($cordovaSQLite, DBA) {
    var self = this;

    self.all = function () {
        return DBA.query("SELECT id, process_id, created, query, request, type, status, updated, user, sync FROM process")
            .then(function (result) {
                return DBA.getAll(result);
            });
    }

    self.get = function (memberId) {
        var parameters = [memberId];
        return DBA.query("SELECT id, process_id, created, query, request, type, status, updated, user, sync FROM process WHERE id = (?)", parameters)
            .then(function (result) {
                return DBA.getById(result);
            });
    }

    self.add = function (member) {
        var parameters = [member.process_id, member.created, member.query, member.request, member.type, member.status, member.updated, member.user, member.sync];
        return DBA.query("INSERT INTO process (process_id, created, query, request, type, status, updated, user, sync) VALUES (?,?,?,?,?,?,?,?,?)", parameters);
    }

    self.remove = function (member) {
        var parameters = [member.id];
        return DBA.query("DELETE FROM process WHERE id = (?)", parameters);
    }

    self.updateSync = function (memberId, sync) {
        var parameters = [sync, memberId];
        return DBA.query("UPDATE process SET sync = (?) WHERE id = (?)", parameters);
    }

    self.getLastId = function () {
        var query = "SELECT MAX(id) as res process form";
        $cordovaSQLite.execute(db, query).then(function (res) {
            if (res.rows.length > 0) {
                return res.rows.item(0).res;
            } else {
                return 0;
            }
        }, function (err) {
            console.error(err);
        });

    }

    self.removeAll = function () {
        var parameters = [];
        return DBA.query("DELETE FROM process", parameters);
    }

    return self;
})

/********************************************
ProcessOut
*********************************************/
.factory('ProcessOut', function ($cordovaSQLite, DBA) {
    var self = this;

    self.all = function () {
        return DBA.query("SELECT id, user_id, token, type, issue, po, paperwork, extra, sync FROM process_out")
            .then(function (result) {
                return DBA.getAll(result);
            });
    }

    self.getUnsync = function () {
        return DBA.query("SELECT id, user_id, token, type, issue, po, paperwork, extra, sync FROM process_out WHERE sync=0")
            .then(function (result) {
                return DBA.getAll(result);
            });
    }

    self.get = function (memberId) {
        var parameters = [memberId];
        return DBA.query("SELECT SELECT id, user_id, token, type, issue, po, paperwork, extra, sync FROM process_out WHERE id = (?)", parameters)
            .then(function (result) {
                return DBA.getById(result);
            });
    }

    self.add = function (member) {
        var parameters = [member.user_id, member.token, member.type, member.issue, member.po, member.paperwork, member.extra, member.sync];
        return DBA.query("INSERT INTO process_out (user_id, token, type, issue, po, paperwork, extra, sync) VALUES (?,?,?,?,?,?,?,?)", parameters);
    }

    self.remove = function (member) {
        var parameters = [member.id];
        return DBA.query("DELETE FROM process_out WHERE id = (?)", parameters);
    }

    self.updateSync = function (memberId, sync) {
        var parameters = [sync, memberId];
        return DBA.query("UPDATE process_out SET sync = (?) WHERE id = (?)", parameters);
    }

    self.getLastId = function () {
        var query = "SELECT MAX(id) as res process_out form";
        $cordovaSQLite.execute(db, query).then(function (res) {
            if (res.rows.length > 0) {
                return res.rows.item(0).res;
            } else {
                return 0;
            }
        }, function (err) {
            console.error(err);
        });

    }

    self.removeAll = function () {
        var parameters = [];
        return DBA.query("DELETE FROM process_out", parameters);
    }

    return self;
})

/********************************************
Property
*********************************************/
.factory('Property', function ($http) {
    var result;

    var properties = [{
        id: '1',
        name: 'Service call out 1',
        endTime: '08:00'
      }, {
        id: '2',
        name: 'Service call out 2',
        endTime: '15:00'
      }, {
        id: '3',
        name: 'Service call out 3',
        endTime: '17:00'
      }];

    return {
        all: function () {
            /*return $http.get(PATH_WS.org + "/operation/search/").then(function(resp){
                 return resp.data;
            }, function(error){
                 console.log("Request Failed: " + error.data);
            });*/
            return properties;

        }
    }
})

/********************************************
Requests
*********************************************/
.factory('Request', function ($http) {
    var resultPendings = [];

    var resultPrepared = [];

    var requests = [{
            id: '10012',
            callOutVisit: '3213',
            date: '20/01/2016',
            status: 'Pending',
            received: false,
            materials: [{
                code: 'MAT0001',
                category: 'Doors Accessory',
                product: 'Screw 1',
                price: '10.00',
                image: 'img/screw1.jpg',
                qttyRequest: 10
        }, {
                code: 'MAT0003',
                category: 'Doors Accessory',
                product: 'Screw 1',
                price: '0.10',
                image: 'img/screw3.jpg',
                qttyRequest: 6
        }]
      }, {
            id: '10013',
            callOutVisit: '3214',
            date: '23/01/2016',
            status: 'Pending',
            received: false,
            materials: [{
                code: 'MAT0001',
                category: 'Doors Accessory',
                product: 'Screw 2',
                price: '10.00',
                image: 'img/screw2.jpg',
                qttyRequest: 18
        }, {
                code: 'MAT0003',
                category: 'Doors Accessory',
                product: 'Screw 4',
                price: '0.10',
                image: 'img/screw4.jpg',
                qttyRequest: 2
        }]
      }, {
            id: '10014',
            callOutVisit: '3215',
            date: '01/02/2016',
            status: 'Pending',
            received: false,
            materials: [{
                code: 'MAT0001',
                category: 'Doors Accessory',
                product: 'Screw 1',
                price: '10.00',
                image: 'img/screw1.jpg',
                qttyRequest: 32
        }]
      }, {
            id: '10015',
            callOutVisit: '3215',
            date: '01/02/2016',
            status: 'Prepared',
            received: false,
            materials: [{
                code: 'MAT0001',
                category: 'Doors Accessory',
                product: 'Screw 5',
                price: '10.00',
                image: 'img/screw5.jpg',
                qttyRequest: 32
        }]
      }, {
            id: '10016',
            callOutVisit: '3215',
            date: '01/02/2016',
            status: 'Prepared',
            received: false,
            materials: [{
                code: 'MAT0001',
                category: 'Doors Accessory',
                product: 'Screw 7',
                price: '10.00',
                image: 'img/screw7.jpg',
                qttyRequest: 32
        }]
      }

      ];

    return {
        all: function () {
            /*return $http.get(PATH_WS.org + "/operation/search/").then(function(resp){
                 return resp.data;
            }, function(error){
                 console.log("Request Failed: " + error.data);
            });*/
            return requests;

        },
        pushRequest: function (request) {
            console.log('%%%%%% request.id ' + request.id);
            requests.push(request);
        },
        getPedings: function () {
            resultPendings = [];
            for (var i = 0; i < requests.length; i++) {
                console.log('%%%%%% request.length ' + requests.length);
                if (requests[i].status == 'Pending') {
                    resultPendings.push(requests[i]);
                };
            };
            return resultPendings;
        },
        getPrepared: function () {
            for (var i = 0; i < requests.length; i++) {
                if (requests[i].status == 'Prepared') {
                    resultPrepared.push(requests[i]);
                };
            };
            return resultPrepared;
        }
    }
})

/********************************************
Product type
*********************************************/
.factory('ProductTypeRange', function ($http) {
    var ranges = [];

    var items = [{
            type: 'type 1',
            ranges: [{
                name: 'range 1'
            }, {
                name: 'range 2'
            }]
      }, {
            type: 'type 2',
            ranges: [{
                name: 'range 3'
            }, {
                name: 'range 4'
            }]
      }
      ];

    return {
        all: function () {
            return items;
        },
        getRanges: function (type) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].type == type) {
                    console.log("%%%%%%%%% type " + type);
                    ranges = items[i].ranges;
                    break;
                };
            };
            return ranges;
        }
    }
})


/********************************************
Reasons
*********************************************/
.factory('Reasons', function ($http) {
    var reasons = [];

    var items = [{
            mainCode: 'main reason 001',
            subCode: 'sub reason 011',
            range: 'range 1'
      }, {
            mainCode: 'main reason 002',
            subCode: 'sub reason 012',
            range: 'range 1'
      }, {
            mainCode: 'main reason 003',
            subCode: 'sub reason 012',
            range: 'range 1'
      }, {
            mainCode: 'main reason 004',
            subCode: 'sub reason 014',
            range: 'range 2'
      }, {
            mainCode: 'main reason 005',
            subCode: 'sub reason 015',
            range: 'range 2'
      }, {
            mainCode: 'main reason 006',
            subCode: 'sub reason 016',
            range: 'range 1'
      }
      ];

    return {
        all: function () {
            return items;
        },
        getReasons: function (range) {
            var reasons = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].range == range) {
                    reasons.push(items[i]);
                };
            };
            return reasons;
        }
    }
})

/********************************************
Status
*********************************************/
.factory('Status', function ($http) {

    var statusEnd = {
        statusFinalize: 'Pending',
        statusSignature: 'Pending',
        statusSignatureDoc: 'Pending',
        statusPayment: 'Pending',
        statusSendSms: ''
    };

    return {

        getStatus: function () {
            return statusEnd;
        },
        setStatusFinalize: function (status) {

            statusEnd.statusFinalize = status;
            return statusEnd;
        },
        setStatusSignature: function (status) {
            statusEnd.statusSignature = status;
            return statusEnd;
        },
        setStatusSignatureDoc: function (status) {

            statusEnd.statusSignatureDoc = status;
            return statusEnd;
        },
        setStatusPayment: function (status) {

            statusEnd.statusPayment = status;
            return statusEnd;
        },
        setStatusSendSms: function (status) {

            statusEnd.statusSendSms = status;
            return statusEnd;
        }
    }
})

/********************************************
Payment
*********************************************/
.factory('Payment', function ($http) {

    var payment = [{
            type: 'Cash'
        },
        {
            type: 'Cheque'
        }
        ];

    return {

        all: function () {
            return payment;
        }
    }
})


/********************************************
StockItems
*********************************************/
.factory('StockItems', function ($http) {
    var materialByServiceId = [];

    var materialByRange = [];

    var materials = [{
            code: 'ITEM0001',
            type: 'type 1',
            range: 'range 1',
            width: '',
            height: '',
            category: 'Doors Accessory',
            product: 'Screw 1',
            price: '10.00',
            image: 'img/screw1.jpg',
            qttyRequest: '',
            status: 'Available'
      }, {
            code: 'ITEM0002',
            type: 'type 1',
            range: 'range 1',
            width: '',
            height: '',
            category: 'Doors Accessory',
            product: 'Screw 2',
            price: '1.20',
            image: 'img/screw2.jpg',
            qttyRequest: '',
            status: 'Available'
      }, {
            code: 'ITEM0003',
            type: 'type 1',
            range: 'range 2',
            width: '',
            height: '',
            category: 'Doors Accessory',
            product: 'Screw 3',
            price: '0.10',
            image: 'img/screw3.jpg',
            qttyRequest: '',
            status: 'Available'
      }, {
            code: 'ITEM0004',
            type: 'type 1',
            range: 'range 2',
            width: '',
            height: '',
            category: 'Doors Accessory',
            product: 'Screw 4',
            price: '0.10',
            image: 'img/screw4.jpg',
            qttyRequest: '',
            status: 'Available'
      }, {
            code: 'ITEM0005',
            type: 'type 1',
            range: 'range 2',
            width: '',
            height: '',
            category: 'Doors Accessory',
            product: 'Screw 5',
            price: '0.10',
            image: 'img/screw5.jpg',
            qttyRequest: '',
            status: 'Available'
      }, {
            code: 'ITEM0006',
            type: 'type 2',
            range: 'range 3',
            width: '',
            height: '',
            category: 'Doors Accessory',
            product: 'Screw 6',
            price: '0.10',
            image: 'img/screw6.jpg',
            qttyRequest: '',
            status: 'Available'
      }, {
            code: 'ITEM0007',
            type: 'type 2',
            range: 'range 4',
            width: '',
            height: '',
            category: 'Doors Accessory',
            product: 'Screw 7',
            price: '0.10',
            image: 'img/screw7.jpg',
            qttyRequest: '',
            status: 'Available'
      }, {
            code: 'ITEM0008',
            type: 'type 2',
            range: 'range 4',
            width: '',
            height: '',
            category: 'Doors Accessory',
            product: 'Screw 8',
            price: '0.10',
            image: 'img/screw8.jpg',
            qttyRequest: '',
            status: 'Available'
      }, {
            code: 'ITEM0009',
            type: 'type 2',
            range: 'range 4',
            width: '',
            height: '',
            category: 'Doors Accessory',
            product: 'Screw 9',
            price: '0.10',
            image: 'img/screw9.jpg',
            qttyRequest: '',
            status: 'Available'
      }

      ];

    return {

        all: function () {
            /*return $http.get(PATH_WS.org + "/operation/search/").then(function(resp){
                 return resp.data;
            }, function(error){
                 console.log("Request Failed: " + error.data);
            });*/
            return materials;

        },
        getMaterialByRange: function (type, range) {
            materialByRange = [];
            for (var i = 0; i < materials.length; i++) {
                if (materials[i].type == type && materials[i].range == range) {
                    materialByRange.push(materials[i]);

                };
            };
            return materialByRange;
        },

        pushRequestedMaterial: function (material) {
            if (materials.indexOf(material) == -1) { // dont push repeated item
                materials.push(material);
            }

        }
    }
})

/********************************************
StockItems
*********************************************/
.factory('Material', function ($http) {
    var itemsByServiceId = [];

    var materialByRange = [];

    var items = [{
            code: 'MAT0001',
            type: 'type 1',
            range: 'range 1',
            category: 'Doors',
            product: 'Door1001',
            price: '10.00',
            image: 'img/door1.jpg',
            qttyRequest: '',
            checked: false
      }, {
            code: 'MAT0002',
            type: 'type 1',
            range: 'range 1',
            category: 'Doors',
            product: 'Door1002',
            price: '1.20',
            image: 'img/door2.jpg',
            qttyRequest: '',
            checked: false
      }, {
            code: 'MAT0003',
            type: 'type 1',
            range: 'range 2',
            category: 'Doors',
            product: 'Door1003',
            price: '0.10',
            image: 'img/door3.jpg',
            qttyRequest: '',
            checked: false
      }, {
            code: 'MAT0004',
            type: 'type 1',
            range: 'range 2',
            category: 'Doors',
            product: 'Door1004',
            price: '0.10',
            image: 'img/door4.jpg',
            qttyRequest: '',
            checked: false
      },
        {
            code: 'MAT0005',
            category: 'Doors',
            type: 'type 2',
            range: 'range 3',
            product: 'Door1001',
            price: '10.00',
            image: 'img/door1.jpg',
            qttyRequest: '',
            checked: false
      },
        {
            code: 'MAT0006',
            category: 'Doors',
            type: 'type 2',
            range: 'range 4',
            product: 'Door1001',
            price: '10.00',
            image: 'img/door1.jpg',
            qttyRequest: '',
            checked: false
      }];

    return {
        all: function () {
            /*return $http.get(PATH_WS.org + "/operation/search/").then(function(resp){
                 return resp.data;
            }, function(error){
                 console.log("Request Failed: " + error.data);
            });*/
            return items;

        },
        getMaterialByRange: function (type, range) {
            materialByRange = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].type == type && items[i].range == range) {
                    materialByRange.push(items[i]);

                };
            };
            return materialByRange;
        },
        getItemByServiceId: function (id) {
            itemsByServiceId = [];
            for (var i = 0; i < items.length; i++) {
                if (items[i].serviceCallOutId == id) {
                    itemsByServiceId.push(items[i]);

                };
            };
            return itemsByServiceId;

        },

    }
})

/********************************************
Adjustments
*********************************************/
.factory('Adjustments', function ($http) {

    var items = [{
            name: 'ADJ001',
            amount: '150'
      }, {
            name: 'ADJ002',
            amount: '120'
      }, {
            name: 'ADJ003',
            amount: '105'
      }, {
            name: 'ADJ004',
            amount: '75'
      },
        {
            name: 'ADJ005',
            amount: '115'
      },
        {
            name: 'ADJ006',
            amount: '55'
      }];

    return {
        all: function () {
            return items;
        }
    }
})

/********************************************
Comments
*********************************************/
.factory('Comments', function ($http) {
    var commentsByServiceId = [];

    var comments = [{
            comment: 'Current phone number of the contact is..',
            created_by: 'John Smith',
            created_date: new Date(),
      }
      ];

    return {
        all: function () {
            /*return $http.get(PATH_WS.org + "/operation/search/").then(function(resp){
                 return resp.data;
            }, function(error){
                 console.log("Request Failed: " + error.data);
            });*/
            return comments;

        },
        getItemByServiceId: function (id) {
            commentsByServiceId = [];
            for (var i = 0; i < comments.length; i++) {
                if (comments[i].serviceCallOutId == id) {
                    commentsByServiceId.push(comments[i]);

                };
            };
            return commentsByServiceId;

        }
    }
})

/********************************************
Requests
*********************************************/
.factory('ServicemanData', function ($http) {

    var servicemanAddress;

    var serviceMan = {
        servicemanId: '1',
        firstName: 'Serviceman 1',
        lastName: '',
        mobile: '028 123 4567',
		lat: 53.347913,
        lng: -6.263172,
        address: {
            addressId: '1001',
            addressLine1: 'Collage Green, Dublin 2',
            addressLine2: '67-68 Ballybough Rd, Dublin',
            addressLine3: '2 Iona Park, Dublin 9',
            addressLine4: '51 Railway St, Dublin',
            country: 'Ireland',
            lat: 53.347913,
            lng: -6.263172,
        }
    };

    return {
        get: function () {
            return serviceMan;

        },
        getServicemanDataByAddressId: function (addressId) {

            if (serviceMan.address.addressId == addressId) {
                //servicemanAddress = serviceMan.address[i];
                console.log("&&&&&& addressId " + addressId)
                return serviceMan;
            };

            return serviceMan;

        }

    }
})



/********************************************
OvernightLocations
*********************************************/
.factory('OvernightLocations', function ($http) {

    var location = {};

    var locations = [{
        addressId: '1001',
        address: '67-68 Ballybough Rd, Dublin',
        lat: 53.359849,
        lng: -6.244934,
        dateFrom: new Date("2016-03-25"),
        dateTo: new Date("2016-03-29"),
        createdDate: new Date("2016-03-01"),
        updatedDate: ''
        }, {
        addressId: '1002',
        address: 'Greek St, Dublin',
        lat: 53.347913,
        lng: -6.273172,
        dateFrom: new Date("2016-03-02"),
        dateTo: new Date("2016-03-19"),
        createdDate: new Date("2016-02-01"),
        updatedDate: ''
        }, {
        addressId: '1003',
        address: '17 St Jarlath Rd, Dublin 7',
        lat: 53.365074,
        lng: -6.284373,
        dateFrom: new Date("2016-04-02"),
        dateTo: new Date("2016-04-20"),
        createdDate: new Date("2016-03-01"),
        updatedDate: ''
        }];

    return {
        get: function () {
            return locations;

        },
        getAddressById: function (addressId) {

            for (var i = 0; i < locations.length; i++) {
                if (locations[i].addressId == addressId) {
                    location = locations[i];
                    return location;
                };
            };
            return location;

        }

    }
})

/********************************************
Countries
*********************************************/
.factory('Countries', function ($http, APP_PARAMS) {

    return {
        getData: function () {

            return $http.get("http://services.groupkt.com/country/get/all/").then(function (resp) {
                console.log("%%%%% data ");
                return resp.data;
            }, function (error) {
                console.log("%%%%% error " + error.data);
                return error;
            });

        }
    }


})

.factory('Actions', function () {

    //service call out visit...  
    var serviceCall = [
        {
            desc: 'Open Service Call Out Visit',
            type: 'Service Call-Out Visit',
            roles: [
                , 'Accounts Rep'
                , 'QA Manager'
                , 'Logistics Rep'
                , 'Dispatch Rep'
                , 'Stockroom Rep'
                , 'Other MJ Department User'
                , 'Services Manager'
                , 'System Administrator'
                , 'Serviceman'
            ],
            status: ['Re-opened'
                    ,'Re-Open Request Rejected'
                    ,'Closed'
                    ,'Service Call-Out Visit Scheduled'
                    ,'Service Call-Out Visit Re-scheduled'
                    ]
        },
    ];

    //Extra
    var extra = [
        {
            desc: 'Given to Serviceman',
            type: 'Extra',
            roles: ['Logistics Rep', 'Dispatch Rep', 'Serviceman'],
            status: ['Ready for Pickup at Depot',
                      'Return to Depot']
        }

    ];

    //Material
    var material = [

        {
            desc: 'Given to Serviceman',
            type: 'Material',
            roles: ['Logistics Rep'
                    , 'Dispatch Rep'
                    , 'Serviceman'],
            status: ['Ready for Pickup at Depot',
                     'Return to Depot']
        }

    ];

    var emergency = [

        {
            desc: 'Emergency',
            type: 'Alerts',
            roles: ['Serviceman'],
            status: ['You have been assigned an Emergency Visit',
                    'Visit has been Cancelled. Please return Materials/Extras to Depot']
        },
        {
            desc: 'Emergency',
            type: ' Return Materials/Extras to Depot',
            roles: ['Serviceman'],
            status: ['Visit has been Cancelled. Please return Materials']
        }
    ];


    return {
        getServiceCall: function () {
            return serviceCall;

        },
        getExtra: function () {
            return extra;

        },
        getMaterial: function () {
            return material;

        },
        getEmergency: function () {
            return emergency;

        }
    }
})


/********************************************
ServicemanActivities
*********************************************/
.factory('ServicemanActivities', function ($http) {

    var activity;
    var materials = [];
    var stockItems = [];
    var comments = [];

    var scheduleActivities = [];

    var calendarActivities = [{
            hr: '08:00',
            colorItem: '#9fc377',
            activity: {
                serviceCallOutId: '10001',
                type: 'SERCALL',
                desc: 'Service Call Out Visit',
                details: '8 Well Lane - PATHHEAD - EH37 2XA',
                address: '67-68 Ballybough Rd, Dublin',
                builder: '67-68 Ballybough Rd',
                builderAddress: '67-68 Ballybough Rd',
                houseType: 'Semi - Detached',
                inWarranty: true,
                contactName: 'Jhon Smith',
                lat: 53.339849,
                lng: -6.244934,
                iconclass: '1',
                scheduledDate: new Date('01/01/2016 07:00:00'),
                createdDate: new Date('01/01/2016 07:00:00'),
                updatedDate: new Date('01/01/2016 13:30:00'),
                status: 'Closed',
                startDate: '',
                startTime: '',
                endTime: '',
                paymentStatus: 'Not Blocked',
                servicemanContactedCustomer: 'Y',
                scheduleConfirmedByCustomer: 'Y',
                emergency: 'N',
                materials: [{
                    code: 'MAT0006',
                    category: 'Doors',
                    product: 'Door1001',
                    price: '10.00',
                    image: 'img/door1.jpg',
                    qttyRequest: 2,
                    checked: false,
                    extraStockItem: false,
                    status: 'Service Rep to Amend Material',
                    serviceRepComments: 'This a comment',
                    problemCode: 'This is a problem',
                    servicemanComments: 'This a serviceman comment',
                    servicemanDrawing: 'This a serviceman drawing',
                    servicemanImages: 'This a serviceman images',
                    reasonCode: 'main reason 001',
                    createdBy: 'John Smith',
                    createdDate: new Date('01/01/2016 08:00:00'),
                    updatedDate: new Date('01/01/2016 08:00:00')                                        
                }],
                stockItems: [{
                        code: 'ITEM0001',
                        type: 'type 1',
                        range: 'range 1',
                        width: '12',
                        height: '10',
                        category: 'Doors Accessory',
                        product: 'Screw 1',
                        price: '10.00',
                        image: 'img/screw1.jpg',
                        qttyRequest: 3,
                        status: 'Service Rep to Amend Extra',
                        serviceRepComments: 'This a comment',
                        problemCode: 'This is a problem',
                        servicemanComments: 'This a serviceman comment',
                        servicemanDrawing: 'This a serviceman drawing',
                        servicemanImages: 'This a serviceman images',
                        reasonCode: 'main reason 001',
                        createdBy: 'John Smith',
                        createdDate: new Date('01/01/2016 08:00:00'),
                        updatedDate: new Date('01/01/2016 08:00:00')
                    },
                    {
                        code: 'ITEM0009',
                        type: 'type 2',
                        range: 'range 4',
                        width: '5',
                        height: '8',
                        category: 'Doors Accessory',
                        product: 'Screw 9',
                        price: '0.10',
                        image: 'img/screw9.jpg',
                        qttyRequest: 1,
                        status: 'Service Rep to Amend Extra',
                        serviceRepComments: 'This a comment',
                        problemCode: 'This is a problem',
                        servicemanComments: 'This a serviceman comment',
                        servicemanDrawing: 'This a serviceman drawing',
                        servicemanImages: 'This a serviceman images',
                        reasonCode: 'main reason 001',
                        createdBy: 'John Smith',
                        createdDate: new Date('01/01/2016 08:00:00'),
                        updatedDate: new Date('01/01/2016 08:00:00')
                }],
                comments: [{
                    comment: 'Current phone number of the contact is..',
                    created_byId: '10001',
                    created_by: 'Services Rep - John Smith',
                    created_byPic: 'http://ionicframework.com/img/docs/venkman.jpg',
                    created_date: new Date(),
                }],
                materialComment: 'This a test of materials',
                materialDraw: '',
                materialImage: '',
                stockComment: 'This a test of stock',
                stockDraw: '',
                stockImage: ''
            }
        },
        {
            hr: '08:30',
            colorItem: '#9fc377',
            activity: {
                serviceCallOutId: '10002',
                type: 'SERCALL',
                desc: 'Service Call Out Visit',
                details: '17 Thompsons Lane - MELROSE - AB45 9NB',
                address: '67-68 Ballybough Rd, Dublin',
                builder: '67-68 Ballybough Rd',
                builderAddress: '67-68 Ballybough Rd',
                houseType: 'Semi - Detached',
                inWarranty: true,
                contactName: 'Jhon Smith',
                lat: 53.349849,
                lng: -6.244934,
                iconclass: '1',
                scheduledDate: new Date('01/01/2016 08:00:00'),
                createdDate: new Date('01/01/2016 08:00:00'),
                updatedDate: new Date('01/01/2016 13:30:00'),
                status: 'Service Call-Out Visit Re-scheduled',
                startDate: '',
                startTime: '',
                endTime: '',
                paymentStatus: 'Not Blocked',
                servicemanContactedCustomer: 'Y',
                scheduleConfirmedByCustomer: 'Y',
                emergency: 'N',
                materials: [{
                    code: 'ITEM0006',
                    category: 'Doors',
                    product: 'Door1001',
                    price: '10.00',
                    image: 'img/door1.jpg',
                    qttyRequest: 2,
                    checked: false,
                    status: 'Ready for Pickup at Depot',
                    serviceRepComments: 'This a comment',
                    problemCode: 'This is a problem',
                    servicemanComments: 'This a serviceman comment',
                    servicemanDrawing: 'This a serviceman drawing',
                    servicemanImages: 'This a serviceman images',
                    reasonCode: 'main reason 001',
                    createdBy: 'John Smith',
                    createdDate: new Date('01/01/2016 08:00:00'),
                    updatedDate: new Date('01/01/2016 08:00:00') 
                },
                {
                    code: 'ITEM0010',
                    category: 'Doors',
                    product: 'Door1001',
                    price: '10.00',
                    image: 'img/door1.jpg',
                    qttyRequest: 2,
                    checked: false,
                    status: 'Return to Depot',
                    serviceRepComments: 'This a comment',
                    problemCode: 'This is a problem',
                    servicemanComments: 'This a serviceman comment',
                    servicemanDrawing: 'This a serviceman drawing',
                    servicemanImages: 'This a serviceman images',
                    reasonCode: 'main reason 001',
                    createdBy: 'John Smith',
                    createdDate: new Date('01/01/2016 08:00:00'),
                    updatedDate: new Date('01/01/2016 08:00:00') 
                }                           
                           ],
                stockItems: [{
                        code: 'ITEM0001',
                        type: 'type 1',
                        range: 'range 1',
                        width: '1',
                        height: '2',
                        category: 'Doors Accessory',
                        product: 'Screw 1',
                        price: '10.00',
                        image: 'img/screw1.jpg',
                        qttyRequest: 3,
                        status: 'Return to Depot',
                        serviceRepComments: 'This a comment',
                        problemCode: 'This is a problem',
                        servicemanComments: 'This a serviceman comment',
                        servicemanDrawing: 'This a serviceman drawing',
                        servicemanImages: 'This a serviceman images',
                        reasonCode: 'main reason 001',
                        createdBy: 'John Smith',
                        createdDate: new Date('01/01/2016 08:00:00'),
                        updatedDate: new Date('01/01/2016 08:00:00')
                    },
                    {
                        code: 'ITEM0009',
                        type: 'type 2',
                        range: 'range 4',
                        width: '4',
                        height: '5',
                        category: 'Doors Accessory',
                        product: 'Screw 9',
                        price: '0.10',
                        image: 'img/screw9.jpg',
                        qttyRequest: 1,
                        status: 'Ready for Pickup at Depot',
                        serviceRepComments: 'This a comment',
                        problemCode: 'This is a problem',
                        servicemanComments: 'This a serviceman comment',
                        servicemanDrawing: 'This a serviceman drawing',
                        servicemanImages: 'This a serviceman images',
                        reasonCode: 'main reason 001',
                        createdBy: 'John Smith',
                        createdDate: new Date('01/01/2016 08:00:00'),
                        updatedDate: new Date('01/01/2016 08:00:00')
                }],
                comments: [{
                    comment: 'Current phone number of the contact is..',
                    created_byId: '10001',
                    created_by: 'Services Rep - John Smith',
                    created_byPic: 'http://ionicframework.com/img/docs/venkman.jpg',
                    created_date: new Date(),
                }],
                materialComment: 'This a test of materials',
                materialDraw: '',
                materialImage: '',
                stockComment: 'This a test of stock',
                stockDraw: '',
                stockImage: ''
            }
        },
        {
            hr: '09:00',
            colorItem: '#d7c703',
            activity: {
                serviceCallOutId: '10003',
                type: 'SERCALL',
                desc: 'Service Call Out Visit',
                details: '45 Grenoble Road - BREOCH - DG7 2PF',
                address: '17 St Jarlath Rd, Dublin 7',
                builder: '17 St Jarlath Rd',
                builderAddress: '17 St Jarlath Rd',
                houseType: 'Semi - Detached',
                inWarranty: true,
                contactName: 'Jhon Smith',
                lat: 53.369849,
                lng: -6.244934,
                iconclass: '2',
                scheduledDate: new Date('01/01/2016 09:00:00'),
                createdDate: new Date('01/01/2016 09:00:00'),
                updatedDate: new Date('01/01/2016 13:30:00'),
                status: 'Service Call-Out Visit Scheduled',
                startDate: '',
                startTime: '',
                endTime: '',
                paymentStatus: 'Blocked - Until released by Accounts',
                servicemanContactedCustomer: 'Y',
                scheduleConfirmedByCustomer: 'N',
                emergency: 'N',
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
        },
        {
            hr: '09:30',
            colorItem: '#d7c703',
            activity: {
                serviceCallOutId: '10004',
                type: 'SERCALL',
                desc: 'Service Call Out Visit',
                details: '45 Grenoble Road - BREOCH - DG7 2PF',
                address: '17 St Jarlath Rd, Dublin 7',
                builder: '17 St Jarlath Rd',
                builderAddress: '17 St Jarlath Rd',
                houseType: 'Semi - Detached',
                inWarranty: true,
                contactName: 'Jhon Smith',
                lat: 53.3812308,
                lng: -6.2632706,
                iconclass: '2',
                scheduledDate: new Date('01/01/2016 10:30:00'),
                createdDate: new Date('01/01/2016 09:30:00'),
                updatedDate: new Date('01/01/2016 13:30:00'),
                status: 'Re-Open Request Rejected',
                startDate: '',
                startTime: '',
                endTime: '',
                paymentStatus: 'Blocked - Until released by Accounts',
                servicemanContactedCustomer: 'Y',
                scheduleConfirmedByCustomer: 'N',
                emergency: 'N',
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
        },      
        {
            hr: '13:30',
            colorItem: '#88cada',
            activity: {
                serviceCallOutId: '10005',
                type: 'SERCALL',
                desc: 'Service Call Out Visit',
                details: '45 Grenoble Road - BREOCH - DG7 2PF',
                address: 'Greek St, Dublin',
                builder: 'Greek St',
                builderAddress: 'Greek St',
                houseType: 'Semi - Detached',
                inWarranty: true,
                contactName: 'Jhon Smith',
                lat: 53.377913,
                lng: -6.233172,
                iconclass: '3',
                scheduledDate: new Date('01/01/2016 10:00:00'),
                createdDate: new Date('01/01/2016 13:30:00'),
                updatedDate: new Date('01/01/2016 13:30:00'),
                status: 'Re-opened',
                startDate: '',
                startTime: '',
                endTime: '',
                paymentStatus: 'Not Blocked',
                servicemanContactedCustomer: 'N',
                scheduleConfirmedByCustomer: 'N',
                emergency: 'N',
                materials: [{
                    code: 'MAT0006',
                    category: 'Doors',
                    width: '2',
                    height: '2',
                    product: 'Door1001',
                    price: '10.00',
                    image: 'img/door1.jpg',
                    qttyRequest: 2,
                    checked: false,
                    status: 'Service Rep to Amend Material',
                    serviceRepComments: 'This a comment',
                    problemCode: 'This is a problem',
                    servicemanComments: 'This a serviceman comment',
                    servicemanDrawing: 'This a serviceman drawing',
                    servicemanImages: 'This a serviceman images',
                    reasonCode: 'main reason 001',
                    createdBy: 'John Smith',
                    createdDate: new Date('01/01/2016 08:00:00'),
                    updatedDate: new Date('01/01/2016 08:00:00') 
                }],
                stockItems: [{
                        code: 'ITEM0001',
                        type: 'type 1',
                        range: 'range 1',
                        width: '2',
                        height: '2',
                        category: 'Doors Accessory',
                        product: 'Screw 1',
                        price: '10.00',
                        image: 'img/screw1.jpg',
                        qttyRequest: 3,
                        status: 'Service Rep to Amend Extra',
                        serviceRepComments: 'This a comment',
                        problemCode: 'This is a problem',
                        servicemanComments: 'This a serviceman comment',
                        servicemanDrawing: 'This a serviceman drawing',
                        servicemanImages: 'This a serviceman images',
                        reasonCode: 'main reason 001',
                        createdBy: 'John Smith',
                        createdDate: new Date('01/01/2016 08:00:00'),
                        updatedDate: new Date('01/01/2016 08:00:00')
                    },
                    {
                        code: 'ITEM0009',
                        type: 'type 2',
                        range: 'range 4',
                        width: '1',
                        height: '2',
                        category: 'Doors Accessory',
                        product: 'Screw 9',
                        price: '0.10',
                        image: 'img/screw9.jpg',
                        qttyRequest: 0,
                        status: 'Service Rep to Amend Extra',
                        serviceRepComments: 'This a comment',
                        problemCode: 'This is a problem',
                        servicemanComments: 'This a serviceman comment',
                        servicemanDrawing: 'This a serviceman drawing',
                        servicemanImages: 'This a serviceman images',
                        reasonCode: 'main reason 001',
                        createdBy: 'John Smith',
                        createdDate: new Date('01/01/2016 08:00:00'),
                        updatedDate: new Date('01/01/2016 08:00:00')
                }],
                comments: [{
                    comment: 'Current phone number of the contact is..',
                    created_byId: '10001',
                    created_by: 'Services Rep - John Smith',
                    created_byPic: 'http://ionicframework.com/img/docs/venkman.jpg',
                    created_date: new Date(),
                }],
                materialComment: '',
                materialDraw: '',
                materialImage: '',
                stockComment: '',
                stockDraw: '',
                stockImage: ''
            }
        },
        {
            hr: '14:00',
            colorItem: '#88cada',
            activity: {
                serviceCallOutId: '10006',
                type: 'SERCALL',
                desc: 'Service Call Out Visit',
                details: '45 Grenoble Road - BREOCH - DG7 2PF',
                address: 'Greek St, Dublin',
                builder: 'Greek St',
                builderAddress: 'Greek St',
                houseType: 'Semi - Detached',
                inWarranty: true,
                contactName: 'Jhon Smith',
                lat: 53.377913,
                lng: -6.283172,
                iconclass: '3',
                scheduledDate: new Date('01/01/2016 14:00:00'),
                createdDate: new Date('01/01/2016 14:00:00'),
                updatedDate: new Date('01/01/2016 14:00:00'),
                status: 'Materials/Extra Pending',
                startDate: '',
                startTime: '',
                endTime: '',
                paymentStatus: 'Not Blocked',
                servicemanContactedCustomer: 'Y',
                scheduleConfirmedByCustomer: 'N',
                emergency: 'N',
                materials: [{
                    code: 'MAT0006',
                    category: 'Doors',
                    product: 'Door1001',
                    price: '10.00',
                    image: 'img/door1.jpg',
                    qttyRequest: 2,
                    checked: false,
                    status: 'Service Rep to Amend Material',
                    serviceRepComments: 'This a comment',
                    problemCode: 'This is a problem',
                    servicemanComments: 'This a serviceman comment',
                    servicemanDrawing: 'This a serviceman drawing',
                    servicemanImages: 'This a serviceman images',
                    reasonCode: 'main reason 001',
                    createdBy: 'John Smith',
                    createdDate: new Date('01/01/2016 08:00:00'),
                    updatedDate: new Date('01/01/2016 08:00:00')
                }],
                stockItems: [{
                        code: 'ITEM0001',
                        type: 'type 1',
                        range: 'range 1',
                        width: '2',
                        height: '4',
                        category: 'Doors Accessory',
                        product: 'Screw 1',
                        price: '10.00',
                        image: 'img/screw1.jpg',
                        qttyRequest: 3,
                        status: 'Service Rep to Amend Extra',
                        serviceRepComments: 'This a comment',
                        problemCode: 'This is a problem',
                        servicemanComments: 'This a serviceman comment',
                        servicemanDrawing: 'This a serviceman drawing',
                        servicemanImages: 'This a serviceman images',
                        reasonCode: 'main reason 001',
                        createdBy: 'John Smith',
                        createdDate: new Date('01/01/2016 08:00:00'),
                        updatedDate: new Date('01/01/2016 08:00:00')                     
                    },
                    {
                        code: 'ITEM0009',
                        type: 'type 2',
                        range: 'range 4',
                        width: '5',
                        height: '2',
                        category: 'Doors Accessory',
                        product: 'Screw 9',
                        price: '0.10',
                        image: 'img/screw9.jpg',
                        qttyRequest: 0,
                        status: 'Service Rep to Amend Extra',
                         serviceRepComments: 'This a comment',
                        problemCode: 'This is a problem',
                        servicemanComments: 'This a serviceman comment',
                        servicemanDrawing: 'This a serviceman drawing',
                        servicemanImages: 'This a serviceman images',
                        reasonCode: 'main reason 001',
                        createdBy: 'John Smith',
                        createdDate: new Date('01/01/2016 08:00:00'),
                        updatedDate: new Date('01/01/2016 08:00:00')
                }],
                comments: [{
                    comment: 'Current phone number of the contact is..',
                    created_byId: '10001',
                    created_by: 'Services Rep - John Smith',
                    created_byPic: 'http://ionicframework.com/img/docs/venkman.jpg',
                    created_date: new Date(),
                }],
                materialComment: '',
                materialDraw: '',
                materialImage: '',
                stockComment: '',
                stockDraw: '',
                stockImage: ''
            }
        },
        {
            hr: '09:30',
            colorItem: '#d7c703',
            activity: {
                serviceCallOutId: '20001',
                type: 'SERCALL',
                desc: 'Service Call Out Visit',
                details: '45 Grenoble Road - BREOCH - DG7 2PF',
                address: '45 Grenoble Road',
                builder: '',
                builderAddress: '',
                houseType: '',
                inWarranty: true,
                contactName: 'Jhon Smith',
                lat: 53.357913,
                lng: -6.233172,
                iconclass: '2',
                scheduledDate: '',
                createdDate: new Date('01/01/2016 09:30:00'),
                updatedDate: '',
                status: 'Unschedule',
                startDate: '',
                startTime: '',
                endTime: '',
                paymentStatus: '',
                servicemanContactedCustomer: 'N',
                scheduleConfirmedByCustomer: 'N',
                emergency: 'N',
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
        }
     ];

    return {
        getScheduledActivities: function () {
            var schedules = [];
            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity.status != 'Unschedule' ) {
                    schedules.push(calendarActivities[i]);
                };                
            };   

            schedules.sort(function (a, b) {
                return new Date(a.activity.scheduledDate) - new Date(b.activity.scheduledDate);
            });         
            return schedules;

        },
        getCalendarActivities: function () {
            calendarActivities.sort(function (a, b) {
                return new Date(a.activity.scheduledDate) - new Date(b.activity.scheduledDate);
            });
            return calendarActivities;

        },
        getScheduleActivities: function () {
            scheduleActivities = [];
            scheduleActivities = calendarActivities;
            return scheduleActivities;

        },
        getActivity: function (activityId) {
            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {

                    activity = calendarActivities[i];
                    return activity;
                };
            };

        },
        setStatusActivity: function (status, activityId) {

            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {

                    calendarActivities[i].activity.status = status;
                    break;
                };
            };
        },
        scheduleActivity: function (status, activityId) {

            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {

                    calendarActivities[i].activity.status = status;
                    calendarActivities[i].activity.scheduledDate = new Date();
                    break;
                };
            };
        },
        unscheduleActivity: function (status, activityId) {

            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {

                    calendarActivities[i].activity.status = status;
                    calendarActivities[i].activity.scheduledDate = undefined;
                    break;
                };
            };
        },
        getActivityMaterials: function (activityId) {
            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {
                    materials = calendarActivities[i].activity.materials;
                    return materials;
                };
            };

        },

        getActivityStockItems: function (activityId) {
            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {
                    stockItems = calendarActivities[i].activity.stockItems;
                    return stockItems;
                };
            };

        },
        getActivityComments: function (activityId) {
            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {
                    comments = calendarActivities[i].activity.comments;
                    return comments;
                };
            };

        },

        addActivityMaterial: function (material, activityId, comment, draw) {

            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {
                    calendarActivities[i].activity.materials.push(material);
                    calendarActivities[i].activity.materialComment = comment;
                    calendarActivities[i].activity.materialDraw = draw;
                };
            };
        },
        addActivityStockItem: function (stockItem, activityId, comment, draw) {

            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {
                    calendarActivities[i].activity.stockItems.push(stockItem);
                    calendarActivities[i].activity.stockComment = comment;
                    calendarActivities[i].activity.stockDraw = draw;
                };
            };
        },

        addActivityComments: function (comment, activityId) {

            for (var i = 0; i < calendarActivities.length; i++) {
                if (calendarActivities[i].activity && calendarActivities[i].activity.serviceCallOutId == activityId) {
                    console.log("comment ", comment);
                    calendarActivities[i].activity.comments.push(comment);
                };
            };
        },

        clearData: function () {
            calendarActivities = false;
        },
        getProducts: function () {
            var products = [];
            //for (var i = 0; i < calendarActivities.length; i++) {
                //if (i == 0) {
                    //products = calendarActivities[0].activity.materials;
                    for (var i = 0; i < calendarActivities[1].activity.materials.length; i++) {
                        products.push(calendarActivities[1].activity.materials[i]);
                    };
                    for (var i = 0; i < calendarActivities[1].activity.stockItems.length; i++) {
                        products.push(calendarActivities[1].activity.stockItems[i]);
                    };

                    //products = calendarActivities[0].activity.stockItems);
                    
                //};
            //};
            return products;

        }
        
    }
})


/********************************************
OvernightLocations
*********************************************/
.factory('Hours', function ($http) {

    var hours = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00',
            '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'
            ];

    return {
        getHours: function () {
            return hours;

        }
    }
})

/********************************************
Department
*********************************************/
.factory('Department', function ($http) {

    var items = [{
            code: '1001',
            description: 'Department'
      }, {
            code: '1002',
            description: 'Builder'
      }, {
            code: '1003',
            description: 'IT Department'
      }, {
            code: '1004',
            description: 'Logistics Department'
      }, {
            code: '1005',
            description: 'Production Dispatch Department'
      }, {
            code: '1006',
            description: 'QA Department'
      }, {
            code: '1007',
            description: 'Service Department'
      }, {
            code: '1008',
            description: 'Stock Department'
      }
      ];

    return {
        all: function () {
            return items;
        }
    }
})

/********************************************
Depots
*********************************************/
.factory('Depots', function ($http) {

    var items = [{
        id: 'dep1',
        desc: 'Depot 1',
        address: '7513 Canal Street, Menomonee Falls, WI 53051',
        lat: 53.347144,
        lng: -6.282442
      }, {
        id: 'dep2',
        desc: 'Depot 2',
        address: '7513 Canal Street, Menomonee Falls, WI 53051',
        lat: 53.341303,
        lng: -6.272056
      }, {
        id: 'dep3',
        desc: 'Depot 3',
        address: '7513 Canal Street, Menomonee Falls, WI 53051',
        lat: 53.343660,
        lng: -6.285360
      }, {
        id: 'dep4',
        desc: 'Depot 4',
        address: '7513 Canal Street, Menomonee Falls, WI 53051',
        lat: 53.343954,
        lng: -6.249375
      }, {
        id: 'dep5',
        desc: 'Depot 5',
        address: '7513 Canal Street, Menomonee Falls, WI 53051',
        lat: 53.343954,
        lng: -6.249375
      }];

    return {
        all: function () {
            return items;
        }
    }
})

/********************************************
ServicemanTask
*********************************************/
.factory('ServicemanTask', function ($http) {

    var task = {};
    var workQueue = [];

    task = {
        id: '1001',
        type: 'SERCALL',
        desc: 'Service Call-Out Visit',
        created: '01/01/2016',
        updated: '01/01/2016',
        status: 'Builder Portal User has added a Comment',
        products: true,
        servicemanAssigned: 'Serviceman1',
        servicemanContactedCustomerDate: '01/01/2016',
        scheduledDate: '01/01/2016 08:00:00',
        propertyAddress: '154 Powell Street, Skyland',
        homeowner: 'Homeowner1',
        builderNameAndAddress: 'Builder1 463 Oceanview Avenue, Gerber',
        createdBy: 'Gwen Strong',
        lastUpdatedBy: 'Kim Bates',
        associatedContact: 'Jhon Sow',
        chargeWarranty: 'Charge',
        paymentStatus: 'Not Blocked',
        outstandingPaymentAmountToCollect: '100',
        paymentCollected: 'YES',
        estimatedDuration: '2',
        dayPeriod: 'Morning',
        servicemanContactedCustomer: 'Y',
        scheduleConfirmedByCustomer: 'Y',
        emergency: 'Y'
    };
    workQueue.push(task);

    task = {
        id: '1002',
        type: 'SERCALL',
        desc: 'Service Call-Out Visit',
        created: '01/01/2016',
        updated: '01/01/2016',
        status: 'Quote Awaiting Approval',
        products: true,
        servicemanAssigned: 'Serviceman1',
        servicemanContactedCustomerDate: '01/01/2016',
        scheduledDate: '01/01/2016 11:00:00',
        propertyAddress: '154 Powell Street, Skyland',
        homeowner: 'Homeowner1',
        builderNameAndAddress: 'Builder1 463 Oceanview Avenue, Gerber',
        createdBy: 'Gwen Strong',
        lastUpdatedBy: 'Kim Bates',
        chargeWarranty: 'Charge',
        paymentStatus: 'Not Blocked - Outstanding Payment to be Collected by Service',
        outstandingPaymentAmountToCollect: '100',
        paymentCollected: 'YES',
        estimatedDuration: '1',
        dayPeriod: 'Morning',
        servicemanContactedCustomer: 'Y',
        scheduleConfirmedByCustomer: 'Y',
        emergency: 'Y'
    };
    workQueue.push(task);

    task = {
        id: '1003',
        type: 'SERCALL',
        desc: 'Service Call-Out Visit',
        created: '01/01/2016',
        updated: '01/01/2016',
        status: 'Materials/Extra Pending, Requires Service Rep to Amend Materials',
        products: true,
        servicemanAssigned: 'Serviceman1',
        servicemanContactedCustomerDate: '01/01/2016',
        scheduledDate: '01/01/2016',
        scheduleConfirmedByCustomer: 'NO',
        propertyAddress: '154 Powell Street, Skyland',
        homeowner: 'Homeowner1',
        builderNameAndAddress: 'Builder1 463 Oceanview Avenue, Gerber',
        createdBy: 'Gwen Strong',
        lastUpdatedBy: 'Kim Bates',
        chargeWarranty: 'Charge',
        paymentStatus: 'Blocked - Unless Outstanding Payment Received by Service',
        outstandingPaymentAmountToCollect: undefined,
        paymentCollected: 'NO'
    };
    workQueue.push(task);

    task = {
        type: 'SERCALL',
        desc: 'Service Call-Out Visit',
        created: '01/01/2016',
        updated: '01/01/2016',
        status: 'All Materials/Extras Ready for Pickup at Depot/Serviceman has received all Materials/Extras, Scheduled, Confirmed, Not Contacted',
        products: true,
        servicemanAssigned: 'Serviceman1',
        servicemanContactedCustomerDate: '01/01/2016',
        scheduledDate: '01/01/2016',
        scheduleConfirmedByCustomer: 'YES',
        propertyAddress: '154 Powell Street, Skyland',
        homeowner: 'Homeowner1',
        builderNameAndAddress: 'Builder1 463 Oceanview Avenue, Gerber',
        createdBy: 'Gwen Strong',
        lastUpdatedBy: 'Kim Bates',
        department: 'Department 2',
        chargeWarranty: 'Charge',
        paymentStatus: 'Not Blocked - Outstanding Payment to be Collected by Service',
        outstandingPaymentAmountToCollect: '100',
        paymentCollected: 'YES'
    };
    workQueue.push(task);

    task = {
        type: 'SERCALL',
        desc: 'Service Call-Out Visit',
        created: '01/01/2016',
        updated: '01/01/2016',
        status: 'Quote Approved, Payment Outstanding',
        products: true,
        servicemanAssigned: 'Serviceman1',
        servicemanContactedCustomerDate: '01/01/2016',
        scheduledDate: '01/01/2016',
        scheduleConfirmedByCustomer: 'YES',
        propertyAddress: '154 Powell Street, Skyland',
        homeowner: 'Homeowner1',
        builderNameAndAddress: 'Builder1 463 Oceanview Avenue, Gerber',
        createdBy: 'Gwen Strong',
        lastUpdatedBy: 'Kim Bates',
        chargeWarranty: 'Charge',
        paymentStatus: 'Not Blocked - Outstanding Payment to be Collected by Service',
        outstandingPaymentAmountToCollect: '100',
        paymentCollected: 'YES'
    };
    workQueue.push(task);

    task = {
        type: 'SERCALL',
        desc: 'Service Call-Out Visit',
        created: '01/01/2016',
        updated: '01/01/2016',
        status: 'Re-Open Request Rejected',
        products: true,
        servicemanAssigned: 'Serviceman1',
        servicemanContactedCustomerDate: '01/01/2016',
        scheduledDate: '01/01/2016',
        scheduleConfirmedByCustomer: 'YES',
        propertyAddress: '154 Powell Street, Skyland',
        homeowner: 'Homeowner1',
        builderNameAndAddress: 'Builder1 463 Oceanview Avenue, Gerber',
        createdBy: 'Gwen Strong',
        lastUpdatedBy: 'Kim Bates',
        chargeWarranty: 'Warranty',
        paymentStatus: undefined,
        outstandingPaymentAmountToCollect: undefined,
        paymentCollected: undefined
    };
    workQueue.push(task);


    return {
        getList: function () {
            return workQueue;

        },


    }
})

/********************************************
AddServiceRequest
*********************************************/
.factory('AddServiceRequest', function ($http, APP_PARAMS) {

    var getData = function (parameter, basic) {

        $http.defaults.headers.common['Authorization'] = 'Basic ' + basic;

        return $http.post(APP_PARAMS.url_ws_api + "/dashboard/addServicerequest",
            parameter, {
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            }
        ).then(function (data) {
            return data;
        }, function (err) {
            return err;
        });

    };
    return {
        getData: getData
    };
});