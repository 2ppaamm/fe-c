(function () {
    'use strict';

    angular
        .module('AllGifted.Student')
        .controller('SClassCtrl', ['$scope','$location', '$state', '$window', '$http', 'aaNotify', '$rootScope','auth','store', 'StudentService',function ($scope,$location, $state, $window, $http, aaNotify, $rootScope,auth,store,StudentService) {

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
            $scope.classname = "";
            $scope.notification = [];
            $scope.namount = 0;
            $scope.cclasses = 0;
            $scope.cassignments = 0;
            $scope.coursecomplete = 0;
            $scope.averagescore = 0;
            //$scope.rowspanft = 0;
            $scope.currentclass = [];
            $scope.trackandskill = [];
            console.log($location.url());
            var url = $location.url().split('/');
            console.log(url);
            var lid = url[5].split('?');
            var hid = lid[1];
            console.log(hid);
            $scope.particularclass = [];
			
			/*var loading_screen = pleaseWait({
                logo: "../../../Assets/images/logo.png",
                backgroundColor: '#ffffff',
                //backgroundColor: '#66fee3',
                loadingHtml: "<div class='sk-cube-grid'><div class='sk-cube sk-cube1'></div><div class='sk-cube sk-cube2'></div><div class='sk-cube sk-cube3'></div><div class='sk-cube sk-cube4'></div><div class='sk-cube sk-cube5'></div><div class='sk-cube sk-cube6'></div><div class='sk-cube sk-cube7'></div><div class='sk-cube sk-cube8'></div><div class='sk-cube sk-cube9'></div></div></div><p style='color:#000000;'>Please wait for awhile for data loading</p>"
            });*/
            $scope.logout = function () {
                store.remove('profile');
                store.remove('token');
				store.remove('GetDashboard');
                auth.signout();
                $window.location.href = $scope.alg;
            };
			
			if(store.get('GetDashboard') == undefined){
				StudentService.GetDashboard().then(function(response){
					store.set('GetDashboard',response.data);
				}).then(function(){
					//get dashboard all data
					var response = store.get('GetDashboard');
					console.log(response);
					//get user id
					$scope.uid = response.user.id;
					//get particular class information
					var ec = response.user.enrolled_classes
					if (ec != undefined) {
						for (var i = 0; i < ec.length; i++) {
							if (ec.id == hid) {
								$scope.particularclass.push(ec[i]);
							}
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
					console.log($scope.cclasses);
					//get particular class information track and skill
					var particularclass = [];
					var particularinformation = [];
					var pclass = response.user.enrolled_classes;
					for (var i = 0; i < pclass.length; i++) {
						if (pclass[i].id == hid) {
							particularclass.push(pclass[i]);
							particularinformation.push(pclass[i].tracks);
						}
					}
					$scope.classname = particularclass[0].house;
					var trackandskill = [];
					var num =0;
					for (var p = 0; p < particularinformation.length; p++) {
						for (var m = 0; m < particularinformation[p].length; m++) {
							trackandskill.push({
								number: num += 1,
								track: particularinformation[p][m].track,
								skills: particularinformation[p][m].skills,
								rowspanft:particularinformation[p][m].skills.length
							})
						}
					}
					var skillandtrack = [];
					for (var q = 0; q < trackandskill.length; q++) {
						for (var w = 0; w < trackandskill[q].skills.length; w++) {
							skillandtrack.push({
								number: trackandskill[q].number,
								track: trackandskill[q].track,
								skill: trackandskill[q].skills[w],
								rowspanft: trackandskill[q].skills.length
							})
						}
					}
					var tsfinal = [];
					for (var e = 0; e < skillandtrack.length; e++) {
						if (tsfinal.length < 1) {
							tsfinal.push({
								number: skillandtrack[e].number,
								track: skillandtrack[e].track,
								skill: skillandtrack[e].skill,
								rowspanft: skillandtrack[e].rowspanft,
								first: "1"
							})
						}
						else {
							if (skillandtrack[e].number == skillandtrack[e - 1].number) {
								tsfinal.push({
									number: skillandtrack[e].number,
									track: skillandtrack[e].track,
									skill: skillandtrack[e].skill,
									rowspanft: skillandtrack[e].rowspanft,
									first: "2"
								})
							}
							else {
								tsfinal.push({
									number: skillandtrack[e].number,
									track: skillandtrack[e].track,
									skill: skillandtrack[e].skill,
									rowspanft: skillandtrack[e].rowspanft,
									first: "1"
								})
							}
						}
					}
					$scope.trackandskill = tsfinal;
					//get average score
					var skp = [];
					for (var skpp = 0; skpp < trackandskill.length; skpp++) {
						for (var skppp = 0; skppp < trackandskill[skpp].skills.length; skppp++) {
							skp.push(trackandskill[skpp].skills[skppp].skill_passed[0]);
						}
					}
					var totalscore = 0;
					var totalsk = 0;
					var totalskill = 0;
					for (var op = 0; op < skp.length; op++) {
						if (skp[op] != undefined) {
							totalsk += 1;
							totalskill += 1;
							var interger = parseInt(skp[op].pivot.skill_maxile)
							totalscore = totalscore += interger;
						}
						else {
							totalskill += 1;
							totalscore = totalscore += 0;
						}
					}
					if (totalsk == 0 && totalskill == 0) {
						$scope.coursecomplete = 0;
					}
					else {
						$scope.coursecomplete = totalsk * 100 / totalskill;
					}
					if (totalsk == 0 && totalscore == 0) {
						$scope.averagescore = 0;
					}
					else {
						$scope.averagescore = totalscore / totalsk;
					}
					//get current enrol calss
					var cec = response.user.enrolled_classes;
					if (cec.length > 0) {
						for (var c = 0; c < cec.length; c++) {
							$scope.currentclass.push(cec[c]);
						}
					}
					loading_screen.finish();
				});
			}
			else{
				//get dashboard all data
				var response = store.get('GetDashboard');
				console.log(response);
				//get user id
				$scope.uid = response.user.id;
				//get particular class information
				var ec = response.user.enrolled_classes
				if (ec != undefined) {
					for (var i = 0; i < ec.length; i++) {
						if (ec.id == hid) {
							$scope.particularclass.push(ec[i]);
						}
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
				console.log($scope.cclasses);
				//get particular class information track and skill
				var particularclass = [];
				var particularinformation = [];
				var pclass = response.user.enrolled_classes;
				for (var i = 0; i < pclass.length; i++) {
					if (pclass[i].id == hid) {
						particularclass.push(pclass[i]);
						particularinformation.push(pclass[i].tracks);
					}
				}
				$scope.classname = particularclass[0].house;
				var trackandskill = [];
				var num =0;
				for (var p = 0; p < particularinformation.length; p++) {
					for (var m = 0; m < particularinformation[p].length; m++) {
						trackandskill.push({
							number: num += 1,
							track: particularinformation[p][m].track,
							skills: particularinformation[p][m].skills,
							rowspanft:particularinformation[p][m].skills.length
						})
					}
				}
				var skillandtrack = [];
				for (var q = 0; q < trackandskill.length; q++) {
					for (var w = 0; w < trackandskill[q].skills.length; w++) {
						skillandtrack.push({
							number: trackandskill[q].number,
							track: trackandskill[q].track,
							skill: trackandskill[q].skills[w],
							rowspanft: trackandskill[q].skills.length
						})
					}
				}
				var tsfinal = [];
				for (var e = 0; e < skillandtrack.length; e++) {
					if (tsfinal.length < 1) {
						tsfinal.push({
							number: skillandtrack[e].number,
							track: skillandtrack[e].track,
							skill: skillandtrack[e].skill,
							rowspanft: skillandtrack[e].rowspanft,
							first: "1"
						})
					}
					else {
						if (skillandtrack[e].number == skillandtrack[e - 1].number) {
							tsfinal.push({
								number: skillandtrack[e].number,
								track: skillandtrack[e].track,
								skill: skillandtrack[e].skill,
								rowspanft: skillandtrack[e].rowspanft,
								first: "2"
							})
						}
						else {
							tsfinal.push({
								number: skillandtrack[e].number,
								track: skillandtrack[e].track,
								skill: skillandtrack[e].skill,
								rowspanft: skillandtrack[e].rowspanft,
								first: "1"
							})
						}
					}
				}
				$scope.trackandskill = tsfinal;
				//get average score
				var skp = [];
				for (var skpp = 0; skpp < trackandskill.length; skpp++) {
					for (var skppp = 0; skppp < trackandskill[skpp].skills.length; skppp++) {
						skp.push(trackandskill[skpp].skills[skppp].skill_passed[0]);
					}
				}
				var totalscore = 0;
				var totalsk = 0;
				var totalskill = 0;
				for (var op = 0; op < skp.length; op++) {
					if (skp[op] != undefined) {
						totalsk += 1;
						totalskill += 1;
						var interger = parseInt(skp[op].pivot.skill_maxile)
						totalscore = totalscore += interger;
					}
					else {
						totalskill += 1;
						totalscore = totalscore += 0;
					}
				}
				if (totalsk == 0 && totalskill == 0) {
					$scope.coursecomplete = 0;
				}
				else {
					$scope.coursecomplete = totalsk * 100 / totalskill;
				}
				if (totalsk == 0 && totalscore == 0) {
					$scope.averagescore = 0;
				}
				else {
					$scope.averagescore = totalscore / totalsk;
				}
				//get current enrol calss
				var cec = response.user.enrolled_classes;
				if (cec.length > 0) {
					for (var c = 0; c < cec.length; c++) {
						$scope.currentclass.push(cec[c]);
					}
				}
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