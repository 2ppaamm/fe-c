(function () {
    'use strict';

    angular
        .module('AllGifted.Teacher')
        .controller('ManageClassTrackSkillQuestionsCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', 'auth', 'store', 'TeacherService','$location', function ($scope, $state, $window, $http, aaNotify, $rootScope, auth, store, TeacherService,$location) {
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

            var url = $location.url().split('/');
            var url2 = url[8].split('?');
            var url3 = url2[1].split('@');
            var classid = url3[0];
            var url4 = url3[1].split('-');
            var trackid = url4[0];
            var skillid = url4[1];
            
            $scope.question = [];

            $scope.classname = "";
            $scope.trackname = "";
            $scope.skillname = "";

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
					//get class name and track name
					var main = response.houses;
					var cname = "";
					var tname = "";
					var sname = "";
					for (var m = 0; m < main.length; m++) {
						if (main[m].id == classid) {
							cname = main[m].house;
						}
						for (var c = 0; c < main[m].tracks.length; c++) {
							if (main[m].tracks[c].id == trackid) {
								tname = main[m].tracks[c].track;
							}
							for (var t = 0; t < main[m].tracks[c].skills.length; t++) {
								if (main[m].tracks[c].skills[t] != undefined || main[m].tracks[c].skills[t] != null) {
									if (main[m].tracks[c].skills[t].id == skillid) {
										sname = main[m].tracks[c].skills[t].skill;
									}
								} 
							}
						}
					}
					$scope.classname = cname;
					$scope.trackname = tname;
					$scope.skillname = sname;
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
				//get class name and track name
				var main = response.houses;
				var cname = "";
				var tname = "";
				var sname = "";
				for (var m = 0; m < main.length; m++) {
					if (main[m].id == classid) {
						cname = main[m].house;
					}
					for (var c = 0; c < main[m].tracks.length; c++) {
						if (main[m].tracks[c].id == trackid) {
							tname = main[m].tracks[c].track;
						}
						for (var t = 0; t < main[m].tracks[c].skills.length; t++) {
							if (main[m].tracks[c].skills[t] != undefined || main[m].tracks[c].skills[t] != null) {
								if (main[m].tracks[c].skills[t].id == skillid) {
									sname = main[m].tracks[c].skills[t].skill;
								}
							} 
						}
					}
				}
				$scope.classname = cname;
				$scope.trackname = tname;
				$scope.skillname = sname;
			}			
            // load all data once reeady for the page
            TeacherService.GetAllSkillQuestion(skillid).then(function (response) {
                var quest = response.data.questions;
                var question = [];
                var number = 0;
                for (var q = 0; q < quest.length; q++) {
                    if (quest[q].difficulty_id == 1) {
                        question.push({
                            num: number += 1,
                            qid: quest[q].id,
                            qname: quest[q].question,
                            selection1: quest[q].answer0,
                            selection2: quest[q].answer0_image,
                            selection3: quest[q].answer1,
                            selection4: quest[q].answer1_image,
                            selection5: quest[q].answer2,
                            selection6: quest[q].answer2_image,
                            selection7: quest[q].answer3,
                            selection8: quest[q].answer3_image,
                            answer: quest[q].correct_answer,
                            difficult: "Low"
                        });
                    }
                    else {
                        if (quest[q].difficulty_id == 2) {
                            question.push({
                                num: number += 1,
                                qid: quest[q].id,
                                qname: quest[q].question,
                                selection1: quest[q].answer0,
                                selection2: quest[q].answer0_image,
                                selection3: quest[q].answer1,
                                selection4: quest[q].answer1_image,
                                selection5: quest[q].answer2,
                                selection6: quest[q].answer2_image,
                                selection7: quest[q].answer3,
                                selection8: quest[q].answer3_image,
                                answer: quest[q].correct_answer,
                                difficult: "Medium"
                            });
                        }
                        else {
                            if (quest[q].difficulty_id == 3) {
                                question.push({
                                    num: number += 1,
                                    qid: quest[q].id,
                                    qname: quest[q].question,
                                    selection1: quest[q].answer0,
                                    selection2: quest[q].answer0_image,
                                    selection3: quest[q].answer1,
                                    selection4: quest[q].answer1_image,
                                    selection5: quest[q].answer2,
                                    selection6: quest[q].answer2_image,
                                    selection7: quest[q].answer3,
                                    selection8: quest[q].answer3_image,
                                    answer: quest[q].correct_answer,
                                    difficult: "High"
                                });
                            }
                        }
                    }

                }
                $scope.question = question;
                loading_screen.finish();
            }, function (err) {
                $scope.question = [];
                loading_screen.finish();
            });

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

            $scope.classongo = function () {
                $window.location.href = $scope.tmclt + "?" + classid;
            }

            $scope.trackongo = function () {
                $window.location.href = $scope.tmclts + "?" + classid + "@" + trackid;
            }

            $scope.movetomyclass = function (classid) {
                $window.location.href = $scope.tcl + "?" + classid;
            }
        }]);
})();