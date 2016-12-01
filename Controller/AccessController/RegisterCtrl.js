(function () {
    'use strict';

    angular
        .module('AllGifted.Access')
        .controller('RegisterCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', function ($scope, $state, $window, $http, aaNotify, $rootScope) {

            $scope.alg = $rootScope.AccessLogin;
            

            
        }]);
})();