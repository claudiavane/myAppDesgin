(function () {
    'use strict';
    /**
     * @ngdoc service
     * @name mjapp.AuthService
     * @description
     * Service that manages user authentication and session management.
     */
    /********************************************
    AuthService
    *********************************************/
    angular
        .module('ServiceMan')
        .service('AuthService', AuthService);

    function AuthService($q, $http, APP_PARAMS, $window, CommonsService) {

        var isAuthenticated = false;
        var userdata = {};

        function loadUserCredentials() {
            var xtoken = $window.sessionStorage.getItem('XTOKEN');
            if (xtoken) {
                useCredentials(xtoken);
            }
        }

        function storeUserCredentials(data, xtoken) {

            $window.sessionStorage.setItem('USERDATA', JSON.stringify(data));
            $window.sessionStorage.setItem('XTOKEN', xtoken);
            useCredentials(xtoken);
        }

        function useCredentials(xtoken) {
            isAuthenticated = true;
            $http.defaults.headers.common['xtoken'] = xtoken;
        }

        function destroyUserCredentials() {
            userdata = {};
            isAuthenticated = false;
            $http.defaults.headers.common['xtoken'] = undefined;
            $window.sessionStorage.removeItem('USERDATA');
            $window.sessionStorage.removeItem('XTOKEN');


            $window.sessionStorage.removeItem('currentPropertyId');
            $window.sessionStorage.removeItem('currentServiceQuery');
            $window.sessionStorage.removeItem('temporaryServiceQuery');
        }


        /**
         * @ngdoc function
         * @name login
         * @methodOf mjapp.AuthService
         * @description 
         * Function for user authentication and get user data from server.
         * @param {string} username - User name
         * @param {string} password - User password
         * @returns {promise} Return User Data or Login Error.
         * @example
             AuthService.login(username, password).then(function (userdata) {
                     //some code ok
                }, function (err) {
                    //some code nok
                });
         */
        var login = function (username, password) {
            return $q(function (resolve, reject) {

                if (APP_PARAMS.demo_mode) {
                    if (username == "serviceman@munsterjoinery.ie") {
                        var userdata = {
                            "role": "ROLE_Serviceman",
                            "roleDesc": "Serviceman.",
                            "country": {
                                "code": "UK",
                                "name": "United Kingdom"
                            },
                            "name": "Serviceman",
                            "username": "serviceman@munsterjoinery.ie",
                            "roleId": null,
                            "userId": 18,
                            "filterType": "popup",
                            "userCountries": []
                        };
                        storeUserCredentials(userdata, 'xtoken');
                        resolve(userdata);
                    } else if (username == "logistics.rep@munsterjoinery.ie") {
                        var userdata = {
                            "role": "ROLE_Logistics_Rep",
                            "roleDesc": "Logistics Rep",
                            "country": {
                                "code": "UK",
                                "name": "United Kingdom"
                            },
                            "name": "Logistics Rep",
                            "username": "logistics.rep@munsterjoinery.ie",
                            "roleId": null,
                            "userId": 18,
                            "filterType": "popup",
                            "userCountries": []
                        };
                        storeUserCredentials(userdata, 'xtoken');
                        resolve(userdata);
                    } else {
                        reject('error');
                    }

                } else {

                    var sa = sha256(APP_PARAMS.client_key);
                    var enc = sha256(password + sa);
                    $http.post(APP_PARAMS.url_mj + '/token', {
                        user: username,
                        pass: enc
                    }).then(function (res) {

                        console.log(res);
                        var data = res.data;

                        userdata.role = data.roleName;
                        userdata.roleDesc = data.roleDesc;
                        userdata.country = CommonsService.getCountry(data.defaultCountryCode);
                        userdata.name = data.fullName;
                        userdata.username = username;
                        userdata.roleId = data.roleId;
                        userdata.userId = data.mJUserId;
                        userdata.personId = data.personId;
                        userdata.filterType = data.filterType == 'I' ? 'inside' : 'popup';
                        //userdata.sessionId = window.btoa(enc+'a1b2c3');                

                        var userCountries = [];
                        for (var l = 0; l < data.countryCodes.length; l++) {
                            userCountries.push(CommonsService.getCountry(data.countryCodes[l]));
                        }

                        userdata.userCountries = userCountries;

                        var xtoken = data.xtoken;
                        storeUserCredentials(userdata, xtoken);
                        resolve(userdata);

                    }, function (res) {
                        console.log(res);
                        reject('Login Failed');
                    });

                }

            });
        };

        /**
         * @ngdoc function
         * @name logout
         * @methodOf mjapp.AuthService
         * @description 
         * Function for destroy user credentials.
         */
        var logout = function () {
            destroyUserCredentials();
        };


        loadUserCredentials();

        return {
            login: login,
            logout: logout,
            isAuthenticated: function () {
                return isAuthenticated;
            },
            userdata: function () {
                return userdata;
            },
        };
    }

})();

(function () {
    'use strict';
    /********************************************
    AuthInterceptor
    *********************************************/
    angular.module('ServiceMan').factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
        return {
            responseError: function (response) {
                $rootScope.$broadcast({
                    401: AUTH_EVENTS.notAuthenticated,
                    403: AUTH_EVENTS.notAuthorized,
                    404: AUTH_EVENTS.notFound,
                    500: AUTH_EVENTS.serverError,
                    "-1": AUTH_EVENTS.noConnection,
                    409: AUTH_EVENTS.definedError,
                    412: AUTH_EVENTS.definedError,
                    428: AUTH_EVENTS.definedError
                }[response.status], response);
                return $q.reject(response);
            }
        };
    })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    });

})();