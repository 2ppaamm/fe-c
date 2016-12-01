(function () {
    'use strict';

    angular
        .module('AllGifted.Student')
        .controller('SAssignmentCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', 'auth', 'store', 'StudentService', function ($scope, $state, $window, $http, aaNotify, $rootScope, auth, store, StudentService) {

            $scope.alg = $rootScope.AccessLogin;
            $scope.sdb = $rootScope.StudentDashboard;
            $scope.sas = $rootScope.StudentAssignment;
            $scope.scl = $rootScope.StudentClass;
            $scope.spf = $rootScope.StudentProfile;
            $scope.srs = $rootScope.StudentResults;
            $scope.saa = $rootScope.StudentAcademicAchievers;
            $scope.sgl = $rootScope.StudentGameLeader;
            $scope.sac = $rootScope.StudentAllClasses;
            $scope.username = $rootScope.unm;
            $scope.notification = [];
            $scope.namount = 0;
            $scope.cclasses = 0;
            $scope.cassignments = 0;
            $scope.currentclass = [];
            $scope.logout = function () {
                store.remove('profile');
                store.remove('token');
				store.remove('GetDashboard');
                auth.signout();
                $window.location.href = $scope.alg;
            };
            /*var loading_screen = pleaseWait({
                logo: "../../../Assets/images/logo.png",
                backgroundColor: '#ffffff',
                //backgroundColor: '#66fee3',
                loadingHtml: "<div class='sk-cube-grid'><div class='sk-cube sk-cube1'></div><div class='sk-cube sk-cube2'></div><div class='sk-cube sk-cube3'></div><div class='sk-cube sk-cube4'></div><div class='sk-cube sk-cube5'></div><div class='sk-cube sk-cube6'></div><div class='sk-cube sk-cube7'></div><div class='sk-cube sk-cube8'></div><div class='sk-cube sk-cube9'></div></div></div><p style='color:#000000;'>Please wait for awhile for data loading</p>"
            });*/
            //load function
            var onStudentLoadComplete = function (response) {
                //get current enrol calss
                var cec = response.data.user.enrolled_classes;
                if (cec.length > 0) {
                    for (var c = 0; c < cec.length; c++) {
                        $scope.currentclass.push(cec[c]);
                    }
                }

                //get notification
                var notif = response.data.logs;
                var notifs = [];
                if (notif.length > 0) {
                    $scope.namount = notif.length;
                    for (var n = 0; n < notif.length; n++) {
                        var d = new Date();
                        var dt = d.getTime();
                        var od = notif[n].updated_at;
                        var odate = new Date(od);
                        var odd = odate.getTime();
                        var balancetime = dt - (odd + 28800000);
                        var x = balancetime / 1000
                        var seconds = x % 60
                        x /= 60
                        var minutes = x % 60
                        x /= 60
                        var hours = x % 24
                        x /= 24
                        var days = x
                        var min = minutes.toString();
                        var mins = min.split('.');
                        var hr8 = hours;
                        var hr = hr8.toString();
                        var hrs = hr.split('.');
                        var dy = days.toString();
                        var dys = dy.split('.');

                        var opt = { name: notif[n].name, minutes: mins[0], hours: hrs[0], days: dys[0] };

                        notifs.push(opt);

                    }
                    $scope.notification = notifs;
                }

                //get current class number
                var cca = response.data.user.enrolled_classes;
                $scope.cclasses = cca.length;
                loading_screen.finish();
            };

            //data load when start page
            StudentService.GetDashboard().then(onStudentLoadComplete);

            //sitebar go to particular class
            $scope.movetomyclass = function (hid) {
                console.log(hid);
                $window.location.href = $scope.scl + "?" + hid;
            }

            $scope.notifyshow = function () {
                if ($scope.namount > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }

            $scope.classshow = function () {
                if ($scope.cclasses > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }

            $scope.assignmentshow = function () {
                if ($scope.cassignments > 0) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }]);
})();