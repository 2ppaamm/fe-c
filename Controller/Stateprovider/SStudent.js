(function () {
    'use strict';
    angular
        .module('AllGifted.Student', [])
        .config(['$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
            $stateProvider
                .state('SDashboard', {
                    url: '/SDashboard',
                    templateUrl: '/View/Student/Dashboard/Dashboard.html',
                    controller: 'SDashboardCtrl'
                });
                


        }]);
})();