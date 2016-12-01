(function () {
    'use strict';
    angular
        .module('AllGifted.Teacher', [])
        .config(['$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider', function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
            $stateProvider
                .state('TDashboard', {
                    url: '/TDashboard',
                    templateUrl: '/View/Teacher/Dashboard/Dashboard.html',
                    controller: 'TDashboardCtrl'
                });



        }]);
})();