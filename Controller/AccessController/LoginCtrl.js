(function () {
    'use strict';

    angular
        .module('AllGifted.Access')
        .controller('LoginCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify','$rootScope', 'auth','store',function ($scope, $state, $window, $http, aaNotify,$rootScope,auth,store) {

            $scope.email = "";
            $scope.password = "";
            
            $scope.afp = $rootScope.AccessForgotPassword;
            $scope.arg = $rootScope.AccessRegister;
            $scope.sdb = $rootScope.StudentDashboard;
            $scope.tdb = $rootScope.TeacherDashboard;
            

            $scope.login = function () {
                var pffff = store.get('profile');
                var tkkkk = store.get('token');
                if (pffff != undefined || pffff != null) {
                    if (tkkkk != undefined || tkkkk != null) {
                        store.remove('profile');
                        store.remove('token');
                    }
                }
                auth.signin({
                    popup: true,
                    title: "Login me in",
                    gravatar: false,
                    icon: "http://school.all-gifted.com/pluginfile.php/1/theme_lambda/logo/1472088488/newlogo.png",
                    authParams: {
                        scope: 'openid email name app_metadata user_metadata roles'
                    }
                }, function (profile, token) {
                    store.set('profile', profile);
                    store.set('token', token);
                    var pf = store.get('profile');
                    var adminon = $http({
                        url: 'http://quizapi.pamelalim.me/api/protected',
                        method: "GET",
                        headers: {
                            'Authorization': 'Bearer ' + token
                        }
                    }).then(function (response) {
						store.set('GetDashboard',response.data);
                        var iadmin = response.data.user.is_admin;
                        if (iadmin == 1) {
                            $window.location.href = $scope.tdb;
                        }
                        else {
                            $window.location.href = $scope.sdb;
                        }
                    });                        
                }, function (err) {
                    alert('unable to signin');
                })    
            }

            var aaNotifyCreateFail = function (error) {
                aaNotify.danger('Login failed. Please try again later.<br>' +
                    'Error Code:' + error.status + '<br>' +
                    'Error Text:' + error.statusText,
                {
                    showClose: true, //close button
                    iconClass: 'glyphicon glyphicon-exclamation-sign', //iconClass for a <i></i> style icon to use
                    allowHtml: true, //allows HTML in the message to render as HTML
                    ttl: 0 //time to live in ms
                });
            };
            console.log("loginctrl");
            //LoginService.ClearCredentials();

            //$scope.credentials = { Email: '', Password: '' };
            //$scope.clearform = function () {
            //    $scope.Loginform.$setPristine();
            //    $scope.credentials = { Email: '', Password: '' };
            //}

            //$scope.Login = function () {
            //    LoginService.AuthenticateUser($scope.credentials)
            //        .then(function (authResponse) {
            //            if (authResponse.data.UserDto != undefined) {
            //                LoginService.SetCredentials($scope.credentials, authResponse.data.UserDto.Name, authResponse.data.UserDto.Role, authResponse.data.UserDto.Id, authResponse.data.UserDto.LastLoginOn);
            //                $state.go('Home');
            //            }
            //            else {
            //                aaNotify.warning('Failed to login! Please try again.', {
            //                    showClose: true,
            //                    iconClass: 'glyphicon glyphicon-info-sign',
            //                    allowHtml: true,
            //                    ttl: 3000
            //                });
            //            }

            //            $scope.clearform();
            //        }, function (authResponse) {
            //            aaNotifyCreateFail(authResponse);

            //            $scope.clearform();
            //        });
            //};
        }]);
    
})();
