(function () {
    'use strict';

    angular
        .module('AllGifted.Teacher')
        .controller('TDashboardCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope','auth','store','TeacherService', function ($scope, $state, $window, $http, aaNotify, $rootScope,auth,store,TeacherService) {
			/*var loading_screen = pleaseWait({
                logo: "../../../Assets/images/logo.png",
                backgroundColor:'#ffffff',
                //backgroundColor: '#66fee3',
                loadingHtml: "<div class='sk-cube-grid'><div class='sk-cube sk-cube1'></div><div class='sk-cube sk-cube2'></div><div class='sk-cube sk-cube3'></div><div class='sk-cube sk-cube4'></div><div class='sk-cube sk-cube5'></div><div class='sk-cube sk-cube6'></div><div class='sk-cube sk-cube7'></div><div class='sk-cube sk-cube8'></div><div class='sk-cube sk-cube9'></div></div></div><p style='color:#000000;'>Please wait for awhile for data loading</p>"
            });*/
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
            $scope.data = [];
            $scope.ac = [];
            $scope.cclasses = 0;
            $scope.cassignments = 0;
            $scope.namount = 0;
            $scope.aml = 0;
            $scope.agl = 0;
            $scope.cname = "";
            $scope.cby = "";
            $scope.ctrack = [];
            
            $scope.course_name = "";
            $scope.instructor = "";
            $scope.courses = [];
            $scope.currenthouse = [];
            
            var cidd;

            var pagesShown = 1;

            var pageSize = 3;

            

            $scope.datasLimit = function () {
                return pageSize * pagesShown;
            };

            $scope.hasMoreItemsToShow = function () {
                return pagesShown < ($scope.data.length / pageSize);
            };

            $scope.showMoreItems = function () {
                pagesShown = pagesShown + 1;
            };

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
					$scope.instructor = response.user.firstname;
					//current teaching course
					var ctc = response.teach_info;
					var currenthouse = [];
					for (var ct = 0; ct < ctc.length; ct++) {
						currenthouse.push(ctc[ct]);
					}
					$scope.currenthouse = currenthouse;
					var courses = response.courses;
					var course = [];
					for (var c = 0; c < courses.length; c++) {
						course.push(courses[c]);
					}
					$scope.courses = course;
					//get the current enrol class
					var ce = teacher.enrolled_classes;
					if (ce.length>0) {
						for (var i = 0; i < ce.length; i++) {
							$scope.currentclass.push(ce[i]);
						}
					}
					//get current class number
					var cca = response.user.enrolled_classes;
					$scope.cclasses = cca.length;
					//get activities
					var rdtl = response.logs;
					var datas = [];
					if (rdtl.length > 0) {
						for (var i = 0; i < rdtl.length; i++) {
							var d = new Date();
							var dt = d.getTime();
							var od = rdtl[i].updated_at
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
							var opt = { name: rdtl[i].name, minutes: mins[0], hours: hrs[0], days: dys[0] };
							datas.push(opt);
						}
						$scope.data = datas;
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
					//get the maxile level and the average of maxile level
					var maxilead = response.maxile_leaders;
					var maxilelvl = 0;
					for (var m = 0; m < maxilead.length; m++) {
						var mlvl = parseInt(maxilead[m].maxile_level)
						maxilelvl += mlvl;
					}
					$scope.aml = maxilelvl / maxilead.length;
					//get the game level and the average of game level
					var gamelead = response.game_leaders;
					var gamelvl = 0;
					for (var g = 0; g < gamelead.length; g++) {
						var glvl = parseInt(gamelead[g].game_level)
						gamelvl += glvl;
					}
					$scope.agl = gamelvl / gamelead.length;
					//get all course
					var allcourse = response.courses;
					var ac = [];
					for (var a = 0; a < 4; a++) {
						ac.push(allcourse[a]);
					}
					$scope.ac = ac;
					//get average course progress and total student complete courses
					var tif = response.teach_info;
					var tscc = 0;
					var tsoc = 0;
					var ptscc = 0;
					var avcp = 0;
					for (var t = 0; t < tif.length; t++) {
						var avcp = avcp + parseInt(tif[t].average_progress);
						var tscc = tscc + tif[t].students_completed_course;
						var tsoc = tsoc + tif[t].total_students;
					}
					ptscc = tscc * 100 / tsoc;
					$scope.tscc = tscc;
					$scope.tsoc = tsoc;
					$scope.ptscc = ptscc;
					$scope.avcp = avcp;
					loading_screen.finish();
				});
			}
			else{
				//get dashboard all data
				var response = store.get('GetDashboard');
				console.log(response);
				var teacher = response.user;
				$scope.instructor = response.user.firstname;
				//current teaching course
				var ctc = response.teach_info;
				var currenthouse = [];
				for (var ct = 0; ct < ctc.length; ct++) {
					currenthouse.push(ctc[ct]);
				}
				$scope.currenthouse = currenthouse;
				var courses = response.courses;
				var course = [];
				for (var c = 0; c < courses.length; c++) {
					course.push(courses[c]);
				}
				$scope.courses = course;
				//get the current enrol class
				var ce = teacher.enrolled_classes;
				if (ce.length>0) {
					for (var i = 0; i < ce.length; i++) {
						$scope.currentclass.push(ce[i]);
					}
				}
				//get current class number
				var cca = response.user.enrolled_classes;
				$scope.cclasses = cca.length;
				//get activities
				var rdtl = response.logs;
				var datas = [];
				if (rdtl.length > 0) {
					for (var i = 0; i < rdtl.length; i++) {
						var d = new Date();
						var dt = d.getTime();
						var od = rdtl[i].updated_at
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
						var opt = { name: rdtl[i].name, minutes: mins[0], hours: hrs[0], days: dys[0] };
						datas.push(opt);
					}
					$scope.data = datas;
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
				//get the maxile level and the average of maxile level
				var maxilead = response.maxile_leaders;
				var maxilelvl = 0;
				for (var m = 0; m < maxilead.length; m++) {
					var mlvl = parseInt(maxilead[m].maxile_level)
					maxilelvl += mlvl;
				}
				$scope.aml = maxilelvl / maxilead.length;
				//get the game level and the average of game level
				var gamelead = response.game_leaders;
				var gamelvl = 0;
				for (var g = 0; g < gamelead.length; g++) {
					var glvl = parseInt(gamelead[g].game_level)
					gamelvl += glvl;
				}
				$scope.agl = gamelvl / gamelead.length;
				//get all course
				var allcourse = response.courses;
				var ac = [];
				for (var a = 0; a < 4; a++) {
					ac.push(allcourse[a]);
				}
				$scope.ac = ac;
				//get average course progress and total student complete courses
				var tif = response.teach_info;
				var tscc = 0;
				var tsoc = 0;
				var ptscc = 0;
				var avcp = 0;
				for (var t = 0; t < tif.length; t++) {
					var avcp = avcp + parseInt(tif[t].average_progress);
					var tscc = tscc + tif[t].students_completed_course;
					var tsoc = tsoc + tif[t].total_students;
				}
				ptscc = tscc * 100 / tsoc;
				$scope.tscc = tscc;
				$scope.tsoc = tsoc;
				$scope.ptscc = ptscc;
				$scope.avcp = avcp;
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

            $scope.poptrack = function (cid, cname, cby) {
                $scope.cname = cname;
                $scope.cby = cby;
                var response = store.get('GetDashboard');
				var courses = response.courses;
				var ctrack = [];
				//get course name and creater + track
				for(var c = 0; c < courses.length; c++){
					if(cid == courses[c].id){
						for(var ct = 0; ct < courses[c].tracks.length; ct++){
							ctrack.push(courses[c].tracks[ct]);
						}
					}
				}
				$scope.ctrack = ctrack;
            }

            $scope.popteach = function (cid) {
                cidd = cid;
                var co = $scope.courses;
                var cn = "";
                for (var i = 0; i < co.length; i++) {
                    if (co[i].id == cid) {
                        cn = co[i].course;
                    }
                }
                $scope.course_name = cn;
            }

            $scope.createenrol = function () {
                var cid = cidd;
                var cname = $scope.course_name;
                var classname = $scope.class_name;
                var cdescription = $scope.class_description;
                var sdate = $scope.start_date;
                var edate = $scope.end_date;
                TeacherService.PostCreateClass(cid, classname, cdescription, sdate, edate).then(function () {
                    alert('Successfully create a new class !');
					store.remove('GetDashboard');
					TeacherService.GetDashboard().then(function(response){
						store.set('GetDashboard',response);
					});
                    $window.location.href = $scope.tdb;
                }, function (err) {
                    if ($scope.class_name == undefined) {
                        alert('Class name field is required!');
                    }
                    else {
                        if ($scope.class_description == undefined) {
                            alert('Class description field is required!');
                        }
                        else {
                            if ($scope.start_date == undefined) {
                                alert('Start date is required!');
                            }
                            else {
                                if ($scope.end_date == undefined) {
                                    alert('End date is required!');
                                }
                                else {
                                    alert('Error occur when creating a new class, please contact admin');
                                }
                            }
                        }
                    }
                });
            }

            $scope.tcongo = function (hid) {
                $window.location.href = $scope.tcl + "?" + hid;
            }
        }]);
})();