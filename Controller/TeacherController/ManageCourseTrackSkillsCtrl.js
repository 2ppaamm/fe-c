﻿(function () {
    'use strict';

    angular
        .module('AllGifted.Teacher')
        .controller('ManageCourseTrackSkillsCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', 'auth', 'store', 'TeacherService','$location', function ($scope, $state, $window, $http, aaNotify, $rootScope, auth, store, TeacherService,$location) {
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
            $scope.sk = [];

            var url = $location.url().split('/');
            var lid = url[7].split('?');
            var hid = lid[1].split('@');
            var cid = hid[0];
            var tid = hid[1];
            
            $scope.coursename = "";
            $scope.trackname = "";

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
					//get course and tracks name
					var course = response.courses;
					var tracks = [];
					var coursename="";
					for (var c = 0; c < course.length; c++) {
						if (course[c].id == cid) {
							coursename = course[c].course;
						}
					}
					$scope.coursename = coursename;
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
					
					var coursess = response.courses;
					var trackname="";
					var skillss=[];
					for(var cou =0; cou<coursess.length; cou++){
						if(cid == coursess[cou].id){
							for(var t=0;t<coursess[cou].tracks.length;t++){
								if(tid == coursess[cou].tracks[t].id){
									trackname = coursess[cou].tracks[t].track;
									skillss.push(coursess[cou].tracks[t].skills);
								}
								
							}
						}
					}
					$scope.trackname = trackname;
					var sk = [];
					var num = 0;
					for(var s=0; s<skillss.length; s++){
						for(var ss=0; ss<skillss[s].length; ss++){
							sk.push({
								number: num += 1,
								sname: skillss[s][ss].skill,
								sdescription: skillss[s][ss].description,
								id: skillss[s][ss].id
							});
						}
					}
					$scope.sk = sk;
					loading_screen.finish();
				});
			}
			else{
				//get dashboard all data
				var response = store.get('GetDashboard');
				console.log(response);
				var teacher = response.user;
				//get course and tracks name
				var course = response.courses;
				var tracks = [];
				var coursename="";
				for (var c = 0; c < course.length; c++) {
					if (course[c].id == cid) {
						coursename = course[c].course;
					}
				}
				$scope.coursename = coursename;
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
				var coursess = response.courses;
				var trackname="";
				var skillss=[];
				for(var cou =0; cou<coursess.length; cou++){
					if(cid == coursess[cou].id){
						for(var t=0;t<coursess[cou].tracks.length;t++){
							if(tid == coursess[cou].tracks[t].id){
								trackname = coursess[cou].tracks[t].track;
								skillss.push(coursess[cou].tracks[t].skills);
							}			
						}
					}
				}
				console.log(skillss);
				$scope.trackname = trackname;
				var sk = [];
				var num = 0;
				for(var s=0; s<skillss.length; s++){
					for(var ss=0; ss<skillss[s].length; ss++){
						sk.push({
							number: num += 1,
							sname: skillss[s][ss].skill,
							sdescription: skillss[s][ss].description,
							id: skillss[s][ss].id
						});
					}
				}
				$scope.sk = sk;
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

            $scope.courseongo = function () {
                $window.location.href = $scope.tmcot + "?" + cid;
            }

            $scope.questionongo = function (sid) {
                console.log("stupid");
                console.log(sid);
                $window.location.href = $scope.tmcotsq + "?" + cid + "@" + tid + "-" + sid;
            }

            $scope.movetomyclass = function (classid) {
                $window.location.href = $scope.tcl + "?" + classid;
            }

            $scope.addskillongo = function () {
                $window.location.href = $scope.tacots + "?" + cid + "@" + tid; 
            }

            $scope.editcoursetrackskillongo = function(sid){
                $window.location.href = $scope.tecots + "?" + cid + "@" + tid + "-" + sid;
            }

            $scope.deletecoursetrackskill = function (sid) {
                TeacherService.DeleteTrackSkill(tid, sid).then(function () {
                    alert('Successfully delete a skill for track !');
					store.remove('GetDashboard');
					TeacherService.GetDashboard().then(function(response){
						store.set('GetDashboard',response.data);
					});
                    $window.location.href = $scope.tmcots + "?" + cid + "@" + tid;
                }, function (err) {
                    alert('Unsuccessfully delete the skill, please contact admin !');
                });
            }
        }]);
})();