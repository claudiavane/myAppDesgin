(function () {
    'use strict';
    /**
 * @ngdoc service
 * @name mjapp.CommonsService
 * @description
 * Service that manages common data and operations.
 */
    /********************************************
CommonsService
*********************************************/
    angular.module('ServiceMan').service('CommonsService', CommonsService);

    function CommonsService($q, $http, APP_PARAMS) {

        var countriesAll = [];
        var countries = {};
        countries['IE'] = {code:'IE', name:'Ireland'};
        countries['UK'] = {code:'UK', name:'United Kingdom'};

        /**
     * @ngdoc function
     * @name getCountry
     * @methodOf mjapp.CommonsService
     * @description 
     * Function for get country data.
     * @param {string} countryCode - Country Code e.g. "UK"
     * @returns {object} Return Country object e.g. {"code":"UK","name":"United Kingdom"}
     * @example
         var country = CommonsService.getCountry(countryCode);     
     */
        var getCountry = function (countryCode) {
            return countries[countryCode];
        };

        /**
     * @ngdoc function
     * @name getCountriesAll
     * @methodOf mjapp.CommonsService
     * @description 
     * Function to get all countries.
     * @returns {object} Return response Data List.
     */
        var getCountriesAll = function(){
            countriesAll = [];
            countriesAll.push(countries['IE']);
            countriesAll.push(countries['UK']);

            console.log( countriesAll );
            return countriesAll;
        }

        var getPDF = function () {
            return $q(function (resolve, reject) {

                $http.get(APP_PARAMS.url_mj + '/getPDF').then(function (res) {
                    console.log(res);
                    resolve(res);
                }, function (res) {
                    console.log(res);
                    reject('error');
                });

            });
        };

        /**
     * @ngdoc function
     * @name getCatalogByEntity
     * @methodOf mjapp.CommonsService
     * @description 
     * Function to get PgCatalogue Summary info.
     * @param {string} entityCode - Param of the PgCatalogue 
     * @returns {promise} Return response Data or Error.
     */
        var getCatalogByEntity = function(entityCode){
            return $q(function (resolve, reject) {
                console.log("entityCode ", entityCode);
                $http.get(APP_PARAMS.url_mj + '/rest/catalogues/'+entityCode+'/').then(function (res) {
                    console.log(res);
                    resolve(res);
                }, function (res) {
                    console.log(res);
                    reject('error');
                });
            });
        }


        /**
     * @ngdoc function
     * @name uploadFile
     * @methodOf mjapp.CommonsService
     * @description 
     * Function to upload file.
     * @param {File} file - File to upload 
     * @param {number} sqId - Service Query ID 
     * @param {number} propertyId - Property ID 
     * @param {string} DocumentType - File type ('do' or 'im')
     * @param {string} requestType - Property, Service Query, Service Call Out Visit ('pr', 'sq', scv)
     * @returns {promise} Return response Data or Error.
     */
        var uploadFile = function (file, sqId, propertyId, documentType, scopeOfDoc) {
            console.log('UploadFile() sqId:' + sqId + ', propertyId:' + propertyId + ', documentType:' + documentType + ', scopeOfDoc:' + scopeOfDoc);
            return $q(function (resolve, reject) {
                var urlRelative = '';
                
                if( scopeOfDoc == 'pr'){
                    urlRelative = '/rest/propertyModule/property/'+propertyId+'/document/'+documentType+'/upload';
                }else if( scopeOfDoc == 'sq'){
                    urlRelative = '/rest/sqModule/'+sqId+'/property/'+propertyId+'/extraDocument/'+documentType+'/upload';
                }else if( scopeOfDoc == 'scv'){
                    urlRelative = '/notDefined/';
                }
                console.log('Upload to ' + APP_PARAMS.url_mj + urlRelative);


                var fd = new FormData();
                fd.append('file', file);
                $http.post(APP_PARAMS.url_mj + urlRelative, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).then(function (res) {
                    //console.log(res);
                    resolve(res);
                }, function (res) {
                    //console.log(res);
                    reject('error');
                });
            });
        }

        return {
            getCountry: getCountry,
            getCountriesAll: getCountriesAll,
            getPDF: getPDF,
            getCatalogByEntity: getCatalogByEntity,
            uploadFile: uploadFile
        }
    }

})();  