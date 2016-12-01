(function () {
    'use strict';

    angular
        .module('AllGifted.Teacher')
        .controller('ResultsBreakdownCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', 'auth', 'store', 'TeacherService', function ($scope, $state, $window, $http, aaNotify, $rootScope, auth, store, TeacherService) {
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
            $scope.map = 0;

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
					//get class name //get courses name
					var teachinfo = response.teach_info;
					var classes = [];
					for (var cl = 0; cl < teachinfo.length; cl++) {
						classes.push({
							n: teachinfo[cl].id,
							v: teachinfo[cl].house
						})
					}
					$scope.Classes = classes;
					//get courses name
					var cos = response.courses;
					var courses = [];
					var bak = [];
					for (var ti = 0; ti < teachinfo.length; ti++) {
						if (bak.indexOf(teachinfo[ti].course_id) <= -1) {
							bak.push(teachinfo[ti].course_id);
						}
					}
					for (var b = 0; b < bak.length; b++) {
						for (var c = 0; c < cos.length; c++) {
							if (bak[b] == cos[c].id) {
								courses.push({
									n: bak[b],
									v: cos[c].course
								});
							}
						}
					}
					$scope.Courses = courses;
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
				//get class name //get courses name
				var teachinfo = response.teach_info;
				var classes = [];
				for (var cl = 0; cl < teachinfo.length; cl++) {
					classes.push({
						n: teachinfo[cl].id,
						v: teachinfo[cl].house
					})
				}
				$scope.Classes = classes;
				//get courses name
				var cos = response.courses;
				var courses = [];
				var bak = [];
				for (var ti = 0; ti < teachinfo.length; ti++) {
					if (bak.indexOf(teachinfo[ti].course_id) <= -1) {
						bak.push(teachinfo[ti].course_id);
					}
				}
				for (var b = 0; b < bak.length; b++) {
					for (var c = 0; c < cos.length; c++) {
						if (bak[b] == cos[c].id) {
							courses.push({
								n: bak[b],
								v: cos[c].course
							});
						}
					}
				}
				$scope.Courses = courses;
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

            $scope.search = function () {
                var cl = $scope.classes;
                var cs = $scope.courses;
                var resultlabel = [];
                var resultdata = [];
                var total = 0;
                var average = 0;
                var currentdate = new Date();
                $scope.rdyear = currentdate.getFullYear();
				var response = store.get('GetDashboard');
				var ti = response.teach_info;
				if (cs != undefined && cl != undefined) {
					$scope.map = 1;
                    for (var t = 0; t < ti.length; t++) {
                        if (cs == ti[t].course_id && cl == ti[t].id) {
                            for (var st = 0; st < ti[t].student_enrolment.length; st++) {
                                resultlabel.push(ti[t].student_enrolment[st].users.firstname);
                                resultdata.push(parseInt(ti[t].student_enrolment[st].users.maxile_level));
                                total = total + (parseInt(ti[t].student_enrolment[st].users.maxile_level));
                            }
                            average = total / resultlabel.length;
                        }
                    }       
                    $scope.average = average;
                    new Chartist.Bar("#widgetOverallViews .line-chart", {
                        labels: resultlabel,
                        series: [resultdata]
                    }, {
                        low: 0,
                        showArea: false,
                        showPoint: false,
                        showLine: true,
                        lineSmooth: false,
                        fullWidth: true,
                        chartPadding: {
                            top: 0,
                            right: 10,
                            bottom: 0,
                            left: 10
                        },
                        axisX: {
                            showLabel: true,
							showGrid: false,
                            offset: 30
                        },
                        axisY: {
                            showLabel: true,
                            showGrid: true,
                            offset: 30
                        },
                        plugins: [
                          Chartist.plugins.tooltip()
                        ]
                    });
                }
				else {
                    if (cs != undefined && cl == undefined) {
                        $scope.map = 1;
                        for (var t = 0; t < ti.length; t++) {
                            if (cs == ti[t].course_id) {
                                for (var st = 0; st < ti[t].student_enrolment.length; st++) {
                                    resultlabel.push(ti[t].student_enrolment[st].users.firstname);
                                    resultdata.push(parseInt(ti[t].student_enrolment[st].users.maxile_level));
                                    total = total + (parseInt(ti[t].student_enrolment[st].users.maxile_level));
                                }
                                average = total / resultlabel.length;
                            }
                        }
                        $scope.average = average;
                        new Chartist.Bar("#widgetOverallViews .line-chart", {
                            labels: resultlabel,
                            series: [resultdata]
                        }, {
                            low: 0,
                            showArea: false,
                            showPoint: false,
                            showLine: true,
                            lineSmooth: false,
                            fullWidth: true,
							chartPadding: {
                                top: 0,
                                right: 10,
                                bottom: 0,
                                left: 10
                            },
                            axisX: {
                                showLabel: true,
                                showGrid: false,
                                offset: 30
                            },
                            axisY: {
                                showLabel: true,
                                showGrid: true,
                                offset: 30
                            },
                            plugins: [
							    Chartist.plugins.tooltip()
                            ]
                        });
                    }
                    else {
                        if (cs == undefined && cl != undefined) {
                            $scope.map = 1;
                            for (t = 0; t < ti.length; t++) {
                                if (cl == ti[t].id) {
                                    for (var st = 0; st < ti[t].student_enrolment.length; st++) {
                                        resultlabel.push(ti[t].student_enrolment[st].users.firstname);
                                        resultdata.push(parseInt(ti[t].student_enrolment[st].users.maxile_level));
                                        total = total + (parseInt(ti[t].student_enrolment[st].users.maxile_level));
                                    }
                                    average = total / resultlabel.length;
                                }
                            }
                            $scope.average = average;
                            new Chartist.Bar("#widgetOverallViews .line-chart", {
                                labels: resultlabel,
                                series: [resultdata]
                            }, {
                                low: 0,
                                showArea: false,
                                showPoint: false,
								showLine: true,
                                lineSmooth: false,
                                fullWidth: true,
                                chartPadding: {
                                    top: 0,
                                    right: 10,
                                    bottom: 0,
                                    left: 10
                                },
                                axisX: {
                                    showLabel: true,
                                    showGrid: false,
                                    offset: 30
                                },
                                axisY: {
                                    showLabel: true,
                                    showGrid: true,
                                    offset: 30
                                },
                                plugins: [
									Chartist.plugins.tooltip()
                                ]
                            });
                        }
                        else {
                            if (cs == undefined && cl == undefined) {
                                $scope.map = 0;
                                alert('Please select a course or class to search for the result!');
                            }
                        }
                    }
                }                
            }

            $scope.coursechange = function (cid) {
				var response = store.get('GetDashboard');
				var ti = response.teach_info;
                var classes = [];
                for (var c = 0; c < ti.length; c++) {
                    if (cid == ti[c].course_id) {
                        classes.push({
                            n: ti[c].id,
                            v: ti[c].house
                        });
                    }
                    else {
                        if (cid == undefined) {
                            classes.push({
                                n: ti[c].id,
                                v: ti[c].house
                            })
                        }
                    }
                }
                $scope.Classes = classes;
            }

            $scope.reset = function () {
                $scope.map = 0;
                $scope.courses = undefined;
                $scope.classes = undefined;
				var response = store.get('GetDashboard');
				var ti = response.teach_info;
                var classes = [];
                for (var c = 0; c < ti.length; c++) {
                    classes.push({
                        n: ti[c].id,
                        v: ti[c].house
                    })
                }
                $scope.Classes = classes;
            }
        }]);
})();