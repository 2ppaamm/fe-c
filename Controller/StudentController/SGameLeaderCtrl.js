(function () {
    'use strict';

    angular
        .module('AllGifted.Student')
        .controller('SGameLeaderCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', 'auth', 'store', 'StudentService', function ($scope, $state, $window, $http, aaNotify, $rootScope, auth, store, StudentService) {

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
            $scope.gameleader = [];
            $scope.namount = 0;
            $scope.cclasses = 0;
            $scope.cassignments = 0;
            $scope.currentclass = [];
            $scope.chamscore = 0;
            $scope.chamname = "";
            $scope.chamdate = "";
            $scope.frunnerscore = 0;
            $scope.frunnername = "";
            $scope.frunnerdate = "";
            $scope.srunnerscore = 0;
            $scope.srunnername = "";
            $scope.srunnerdate = "";
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
			
			if(store.get('GetDashboard') == undefined){
				StudentService.GetDashboard().then(function(response){
					store.set('GetDashboard',response.data);
				}).then(function(){
					//get dashboard all data
					var response = store.get('GetDashboard');
					console.log(response);
					//get user id
					$scope.uid = response.user.id;
					//get current enrol calss
					var cec = response.user.enrolled_classes;
					if (cec.length > 0) {
						for (var c = 0; c < cec.length; c++) {
							$scope.currentclass.push(cec[c]);
						}
					}
					//get notification
					var notif = response.logs;
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
					var cca = response.user.enrolled_classes;
					$scope.cclasses = cca.length;
					//get game leader
					var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Descember"];
					var game_leader = [];
					var gld = response.game_leaders;
					for (var i = 0; i < gld.length; i++) {
						if (gld != undefined || gld.length > 0) {
							var cd = gld[i].leader_since;
							var cdate = new Date(cd);
							var day = cdate.getDate();
							var month = cdate.getMonth();
							var year = cdate.getFullYear();
							game_leader.push({
								name: gld[i].name,
								game_level: gld[i].game_level,
								leader_since: day+" "+" "+monthNames[month]+" "+year
							});
						}
					}
					
					$scope.chamscore = game_leader[0].game_level;
					$scope.chamname = game_leader[0].name;
					$scope.chamdate = game_leader[0].leader_since;
					$scope.frunnerscore = game_leader[1].game_level;
					$scope.frunnername = game_leader[1].name;
					$scope.frunnerdate = game_leader[1].leader_since;
					$scope.srunnerscore = game_leader[2].game_level;
					$scope.srunnername = game_leader[2].name;
					$scope.srunnerdate = game_leader[2].leader_since;
					var num = 3
					var game_without_fthree = [];
					for (var n = 3; n < 10; n++) {
						game_without_fthree.push({
							number: num += 1,
							name: game_leader[n].name,
							score: game_leader[n].game_level,
							date: game_leader[n].leader_since
						});
					}
					console.log(game_without_fthree);
					$scope.gameleader = game_without_fthree;
					loading_screen.finish();
				});
			}
			else{
				//get dashboard all data
				var response = store.get('GetDashboard');
				console.log(response);
				//get user id
				$scope.uid = response.user.id;
				//get current enrol calss
				var cec = response.user.enrolled_classes;
				if (cec.length > 0) {
					for (var c = 0; c < cec.length; c++) {
						$scope.currentclass.push(cec[c]);
					}
				}
				//get notification
				var notif = response.logs;
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
				var cca = response.user.enrolled_classes;
				$scope.cclasses = cca.length;
				//get game leader
				var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Descember"];
				var game_leader = [];
				var gld = response.game_leaders;
				for (var i = 0; i < gld.length; i++) {
					if (gld != undefined || gld.length > 0) {
						var cd = gld[i].leader_since;
						var cdate = new Date(cd);
						var day = cdate.getDate();
						var month = cdate.getMonth();
						var year = cdate.getFullYear();
						game_leader.push({
							name: gld[i].name,
							game_level: gld[i].game_level,
							leader_since: day+" "+" "+monthNames[month]+" "+year
						});
					}
				}
				$scope.chamscore = game_leader[0].game_level;
				$scope.chamname = game_leader[0].name;
				$scope.chamdate = game_leader[0].leader_since;
				$scope.frunnerscore = game_leader[1].game_level;
				$scope.frunnername = game_leader[1].name;
				$scope.frunnerdate = game_leader[1].leader_since;
				$scope.srunnerscore = game_leader[2].game_level;
				$scope.srunnername = game_leader[2].name;
				$scope.srunnerdate = game_leader[2].leader_since;
				var num = 3
				var game_without_fthree = [];
				for (var n = 3; n < 10; n++) {
					game_without_fthree.push({
						number: num += 1,
						name: game_leader[n].name,
						score: game_leader[n].game_level,
						date: game_leader[n].leader_since
					});
				}
				console.log(game_without_fthree);
				$scope.gameleader = game_without_fthree;
				loading_screen.finish();
			}
			
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