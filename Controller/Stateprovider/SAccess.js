(function () {
    'use strict';
    angular
        .module('AllGifted.Access', [])
        .config(['$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
            $stateProvider
                .state('Login', {
                    url: '/Login',
                    templateUrl: '/View/Access/Login.html',
                    controller: 'LoginCtrl'
                })
                .state('ForgotPassword', {
                    url: '/ForgotPassword',
                    templateUrl: '/View/Access/ForgotPassword.html',
                    controller: 'ForgotPasswordCtrl'
                })
                .state('Register', {
                    url: '/Register',
                    templateUrl: '/View/Access/Register.html',
                    controller: 'RegisterCtrl'
                });


        }]);
})();