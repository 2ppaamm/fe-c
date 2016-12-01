(function () {
    'use strict';

    angular
        .module('AllGifted.Teacher')
        .controller('EditCourseTrackCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', 'auth', 'store', 'TeacherService','$location', function ($scope, $state, $window, $http, aaNotify, $rootScope, auth, store, TeacherService,$location) {
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
            var url2 = url[6].split('?');
            var url3 = url2[1].split('@');
            var courseid = url3[0];
            var trackid = url3[1];
            $scope.trackname2 = "";
            $scope.description2 = "";
            $scope.levelid2 = "";
            $scope.fieldid2 = "";

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
					//get courses information
					var courses = response.courses;
					var coursename = "";
					var trackname = "";
					var description = "";
					var levelid = "";
					var fieldid = "";
					for (var c = 0; c < courses.length; c++) {
						if (courseid == courses[c].id) {
							coursename = courses[c].course;
							for (var t = 0; t < courses[c].tracks.length; t++) {
								if (trackid == courses[c].tracks[t].id) {
									trackname = courses[c].tracks[t].track;
									description = courses[c].tracks[t].description;
									levelid = courses[c].tracks[t].level_id;
									fieldid = courses[c].tracks[t].field_id;
								}
							}
						}
					}
					$scope.coursename = coursename;
					$scope.trackname = trackname;
					$scope.description = description;
					$scope.levelid = levelid;
					$scope.fieldid = fieldid;
					$scope.trackname2 = trackname;
					$scope.description2 = description;
					$scope.levelid2 = levelid;
					$scope.fieldid2 = fieldid;
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
				//get courses information
				var courses = response.courses;
				var coursename = "";
				var trackname = "";
				var description = "";
				var levelid = "";
				var fieldid = "";
				for (var c = 0; c < courses.length; c++) {
					if (courseid == courses[c].id) {
						coursename = courses[c].course;
						for (var t = 0; t < courses[c].tracks.length; t++) {
							if (trackid == courses[c].tracks[t].id) {
								trackname = courses[c].tracks[t].track;
								description = courses[c].tracks[t].description;
								levelid = courses[c].tracks[t].level_id;
								fieldid = courses[c].tracks[t].field_id;
							}
						}
					}
				}
				$scope.coursename = coursename;
				$scope.trackname = trackname;
				$scope.description = description;
				$scope.levelid = levelid;
				$scope.fieldid = fieldid;
				$scope.trackname2 = trackname;
				$scope.description2 = description;
				$scope.levelid2 = levelid;
				$scope.fieldid2 = fieldid;
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

            $scope.courseongo = function () {
                $window.location.href = $scope.tmcot + "?" + courseid;
            }

            $scope.reset = function () {
                var trackname2 = $scope.trackname2;
                var description2 = $scope.description2;
                var levelid2 = $scope.levelid2;
                var fieldid2 = $scope.fieldid2;

                $scope.trackname = trackname2;
                $scope.description = description2;
                $scope.levelid = levelid2;
                $scope.fieldid = fieldid2;

            }

            $scope.empty = function () {
                $scope.trackname = undefined;
                $scope.description = undefined;
                $scope.levelid = undefined;
                $scope.fieldid = undefined;
            }

            $scope.editcoursetrack = function () {
                var tn = $scope.trackname;
                var dp = $scope.description;
                var lid = $scope.levelid;
                var fid = $scope.fieldid;

                if ($scope.trackname == undefined) {
                    alert('Track name field is required !');
                }
                else {
                    if ($scope.description == undefined) {
                        alert('Description field is required !');
                    }
                    else {
                        if ($scope.levelid == undefined) {
                            alert('Level id is required !');
                        }
                        else {
                            if ($scope.fieldid == undefined) {
                                alert('Field id is required!');
                            }
                            else {
                                TeacherService.UpdateCourseTrack(courseid, trackid, tn, dp, lid, fid).then(function () {
                                    alert('Successfully update course track !');
                                });
                            }
                        }
                    }
                }
            }
        }]);
})();