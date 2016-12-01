(function () {
    'use strict';
    
    angular.module('AllGifted.Core', [
        // Angular modules
        'ngAnimate', 'ngRoute', 'ngCookies',
//        'ngSanitize',

        //AngularUI modules
        'ui.router',
        'ui.bootstrap',
        'ui.utils',

        //ThirdParty Vendors here
        'aa.notify',
        'xeditable',
        'angular-loading-bar',
        'jcs-autoValidate',
        'ngCsv',
        'autocomplete',
        'auth0',
        'angular-storage',
        'angular-jwt'
    ]);
    
})();