﻿(function () {
    'use strict';

    angular
        .module('AllGifted.Teacher')
        .controller('TGameLeaderCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', 'auth', 'store', 'TeacherService', function ($scope, $state, $window, $http, aaNotify, $rootScope, auth, store, TeacherService) {
            $scope.username = $rootScope.unm;
            $scope.alg = $rootScope.AccessLogin;
            $scope.tdb = $rootScope.TeacherDashboard;
            $scope.tma = $rootScope.TeacherManageAssignments;
            $scope.taa = $rootScope.TeacherAddAssignment;
            $scope.tea = $rootScope.TeacherEditAssignment;
            $scope.tmcl = $rootScope.TeacherManageClasses;
            $scope.tacl = $rootScope.TeacherAddClass;
            $scope.tecl = $rootScope.TeacherEditClass;
            $scope.tmclt = $rootScope.TeacherManageClassTracks;
            $scope.taclt = $rootScope.TeacherAddClassTrack;
            $scope.teclt = $rootScope.TeacherEditClassTrack;
            $scope.tmclts = $rootScope.TeacherManageClassTrackSkills;
            $scope.taclts = $rootScope.TeacherAddClassTrackSkill;
            $scope.teclts = $rootScope.TeacherEditClassTrackSkill;
            $scope.tmcltsq = $rootScope.TeacherManagceClassTrackSkillQuestions;
            $scope.tacltsq = $rootScope.TeacherAddClassTrackSkillQuestion;
            $scope.tecltsq = $rootScope.TeacherEditClassTrackSkillQuestion;
            $scope.tmco = $rootScope.TeacherManageCourses;
            $scope.taco = $rootScope.TeacherAddCourse;
            $scope.teco = $rootScope.TeacherEditCourse;
            $scope.tmcot = $rootScope.TeacherManageCourseTracks;
            $scope.tacot = $rootScope.TeacherAddCourseTrack;
            $scope.tecot = $rootScope.TeacherEditCourseTrack;
            $scope.tmcots = $rootScope.TeacherManageCourseTrackSkills;
            $scope.tacots = $rootScope.TeacherAddCourseTrackSkill;
            $scope.tecots = $rootScope.TeacherEditCourseTrackSkill;
            $scope.tmcotsq = $rootScope.TeacherManageCourseTrackSkillQuestions;
            $scope.tacotsq = $rootScope.TeacherAddCourseTrackSkillQuestion;
            $scope.tecotsq = $rootScope.TeacherEditCourseTrackSkillQuestion;
            $scope.tmg = $rootScope.TeacherManageGames;
            $scope.tag = $rootScope.TeacherAddGame;
            $scope.teg = $rootScope.TeacherEditGame;
            $scope.tmu = $rootScope.TeacherManageUsers;
            $scope.tau = $rootScope.TeacherAddUser;
            $scope.teu = $rootScope.TeacherEditUser;
            $scope.tas = $rootScope.TeacherAssignment;
            $scope.tcl = $rootScope.TeacherClass;
            $scope.tpf = $rootScope.TeacherProfile;
            $scope.top = $rootScope.TeacherOverallPerformance;
            $scope.trb = $rootScope.TeacherResultsBreakdown;
            $scope.tsr = $rootScope.TeacherStudentRadar;
            $scope.trp = $rootScope.TeacherReports;
            $scope.taa = $rootScope.TeacherAcademicAchievers;
            $scope.tgl = $rootScope.TeacherGameLeader;
            $scope.tal = $rootScope.TeacherAuditLogs;
            $scope.tpm = $rootScope.TeacherPayments;
            $scope.tss = $rootScope.TeacherSystemSettings;
            $scope.tac = $rootScope.TeacherAllClasses;

            $scope.notification = [];
            $scope.currentclass = [];
            $scope.cclasses = 0;
            $scope.cassignments = 0;
            $scope.namount = 0;
            $scope.gchamp = "";
            $scope.gcscore = 0;
            $scope.gcsince = "";
            $scope.gfirst = "";
            $scope.gfscore = 0;
            $scope.gfsince = "";
            $scope.gsec = "";
            $scope.gsscore = 0;
            $scope.gssince = "";
            $scope.gld = [];

            /*var loading_screen = pleaseWait({
                logo: "../../../Assets/images/logo.png",
                backgroundColor: '#ffffff',
                //backgroundColor: '#66fee3',
                loadingHtml: "<div class='sk-cube-grid'><div class='sk-cube sk-cube1'></div><div class='sk-cube sk-cube2'></div><div class='sk-cube sk-cube3'></div><div class='sk-cube sk-cube4'></div><div class='sk-cube sk-cube5'></div><div class='sk-cube sk-cube6'></div><div class='sk-cube sk-cube7'></div><div class='sk-cube sk-cube8'></div><div class='sk-cube sk-cube9'></div></div></div><p style='color:#000000;'>Please wait for awhile for data loading</p>"
            });*/

            $scope.logout = function () {
                store.remove('profile');
                store.remove('token');
				if(store.get('GetDashboard') != undefined){
					store.remove('GetDashboard');
				};
				if(store.get('GetAllUsers') != undefined){
					store.remove('GetAllUsers');
				};
                auth.signout();
                $window.location.href = $scope.alg;
            };

			if(store.get('GetDashboard') == undefined){
				TeacherService.GetDashboard().then(function(response){
					store.set('GetDashboard',response.data);
				}).then(function(){
					//get dashboard all data
					var response = store.get('GetDashboard');
					console.log(response);
					var teacher = response.user;
					//get the current enrol class
					var ce = teacher.enrolled_classes;
					if (ce.length > 0) {
						for (var i = 0; i < ce.length; i++) {
							$scope.currentclass.push(ce[i]);
						}
					}
					//get current class number
					var cca = response.user.enrolled_classes;
					$scope.cclasses = cca.length;
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
							var balancetime = dt - odd;
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
							var hr = hours.toString();
							var hrs = hr.split('.');
							var dy = days.toString();
							var dys = dy.split('.');
							var opt = { name: notif[n].name, minutes: mins[0], hours: hrs[0], days: dys[0] };
							notifs.push(opt);
						}
						$scope.notification = notifs;
					}
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
								leader_since: day + " " + " " + monthNames[month] + " " + year
							});
						}
					}
					$scope.gcscore = game_leader[0].game_level;
					$scope.gchamp = game_leader[0].name;
					$scope.gcsince = game_leader[0].leader_since;
					$scope.gfscore = game_leader[1].game_level;
					$scope.gfirst = game_leader[1].name;
					$scope.gfsince = game_leader[1].leader_since;
					$scope.gsscore = game_leader[2].game_level;
					$scope.gsec = game_leader[2].name;
					$scope.gssince = game_leader[2].leader_since;
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
					$scope.gld = game_without_fthree;
					loading_screen.finish();
				});
			}
			else{
				//get dashboard all data
				var response = store.get('GetDashboard');
				console.log(response);
				var teacher = response.user;
				//get the current enrol class
				var ce = teacher.enrolled_classes;
				if (ce.length > 0) {
					for (var i = 0; i < ce.length; i++) {
						$scope.currentclass.push(ce[i]);
					}
				}
				//get current class number
				var cca = response.user.enrolled_classes;
				$scope.cclasses = cca.length;
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
						var balancetime = dt - odd;
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
						var hr = hours.toString();
						var hrs = hr.split('.');
						var dy = days.toString();
						var dys = dy.split('.');
						var opt = { name: notif[n].name, minutes: mins[0], hours: hrs[0], days: dys[0] };
						notifs.push(opt);
					}
					$scope.notification = notifs;
				}
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
							leader_since: day + " " + " " + monthNames[month] + " " + year
						});
					}
				}
				$scope.gcscore = game_leader[0].game_level;
				$scope.gchamp = game_leader[0].name;
				$scope.gcsince = game_leader[0].leader_since;
				$scope.gfscore = game_leader[1].game_level;
				$scope.gfirst = game_leader[1].name;
				$scope.gfsince = game_leader[1].leader_since;
				$scope.gsscore = game_leader[2].game_level;
				$scope.gsec = game_leader[2].name;
				$scope.gssince = game_leader[2].leader_since;
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
				$scope.gld = game_without_fthree;
				loading_screen.finish();
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

            $scope.movetomyclass = function (classid) {
                $window.location.href = $scope.tcl + "?" + classid;
            }
        }]);
})();