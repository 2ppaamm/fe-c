(function () {
    'use strict';

    angular
        .module('AllGifted.Access')
        .controller('ForgotPasswordCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', function ($scope, $state, $window, $http, aaNotify, $rootScope) {

            $scope.alg = $rootScope.AccessLogin;
            

            var aaNotifyCreateFail = function (error) {
                aaNotify.danger('Reset password request failed. Please try again later.<br>' +
                    'Error Code:' + error.status + '<br>' +
                    'Error Text:' + error.statusText,
                {
                    showClose: true, //close button
                    iconClass: 'glyphicon glyphicon-exclamation-sign', //iconClass for a <i></i> style icon to use
                    allowHtml: true, //allows HTML in the message to render as HTML
                    ttl: 0 //time to live in ms
                });
            };

            $scope.credentials = { Email: '' };
            $scope.clearform = function () {
                $scope.ForgetPasswordform.$setPristine();
                $scope.credentials = { Email: '' };
            }

            $scope.ResetPassword = function () {

                LoginService.ResetPassword($scope.credentials)
                    .then(function (authResponse) {
                        if (authResponse.data.result == true) {
                            aaNotify.info('An email will send to ' + $scope.credentials.Email + '. Please follow the instructions to reset your password.', {
                                showClose: true,
                                iconClass: 'glyphicon glyphicon-info-sign',
                                allowHtml: true,
                                ttl: 3000
                            });
                        }
                        else {
                            aaNotify.warning('Failed to request password reset! Please try again.', {
                                showClose: true,
                                iconClass: 'glyphicon glyphicon-info-sign',
                                allowHtml: true,
                                ttl: 3000
                            });
                        }

                        $scope.clearform();
                    }, function (authResponse) {
                        aaNotifyCreateFail(authResponse);

                        $scope.clearform();
                    });
            };
        }]);
})();