(function () {
    'use strict';

    angular
        .module('AllGifted.Student')
        .controller('SAllClassesCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope','auth','store','StudentService', function ($scope, $state, $window, $http, aaNotify, $rootScope,auth,store,StudentService) {

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
            $scope.uid = "";
            $scope.allcourses = [];
            $scope.currentclass = [];
            $scope.coursest = [];
            $scope.coursesh = [];
            $scope.notification = [];
            $scope.namount = 0;
            $scope.cclasses = 0;
            $scope.cassignments = 0;
            $scope.couid = "";
            $scope.con = "";
            $scope.crb = "";

            //logout function
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
					//get all courses
					var rdtc = response.courses;
					if(rdtc.length > 0){
						for(var i = 0; i < rdtc.length; i++){
							$scope.allcourses.push(rdtc[i]);
						}
					}
					//get all current enroll class
					var cec = response.user.enrolled_classes;
					if(cec.length > 0){
						for(var c = 0; c < cec.length; c++){
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
					loading_screen.finish();
				});
			}
			else{
				//get dashboard all data
				var response = store.get('GetDashboard');
				console.log(response);
				//get user id
				$scope.uid = response.user.id;
				//get all courses
				var rdtc = response.courses;
				if(rdtc.length > 0){
					for(var i = 0; i < rdtc.length; i++){
						$scope.allcourses.push(rdtc[i]);
					}
				}
				//get all current enroll class
				var cec = response.user.enrolled_classes;
				if(cec.length > 0){
					for(var c = 0; c < cec.length; c++){
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
				loading_screen.finish();
			}
            
			//class list function
            $scope.popclass = function (cid) {
                //StudentService.GetCoursesHouse(cid).then(onClassLoadComplete);
				//get class information 
				$scope.coursesh = [];
				var response = store.get('GetDashboard');
				var courses = response.courses;
				var classes = response.user.enrolled_classes;
				var classess=[];
				for(var ccc =0; ccc<classes.length; ccc++){
					classess.push(classes[ccc].id);
				}
				for(var c = 0; c < courses.length; c++){
					if(cid == courses[c].id){
						for(var cl = 0; cl < courses[c].houses.length; cl++){
							if(classess.indexOf(courses[c].houses[cl].id) > -1){
								$scope.coursesh.push({
									id: courses[c].houses[cl].id,
									house: courses[c].houses[cl].house,
									createdby: courses[c].houses[cl].user_id,
									start_date: courses[c].houses[cl].start_date,
									enroll: '1'
								});
							}
							else{
								$scope.coursesh.push({
									id: courses[c].houses[cl].id,
									house: courses[c].houses[cl].house,
									createdby: courses[c].houses[cl].user_id,
									start_date: courses[c].houses[cl].start_date,
									enroll: '0'
								});
							}
						}
					}
				}
            }

            //track list function
            $scope.poptrack = function (cid) {
                var response = store.get('GetDashboard');
				var courses = response.courses;
				var ctrack = [];
				//get course name and creater + track
				for(var c = 0; c < courses.length; c++){
					if(cid == courses[c].id){
						$scope.con = courses[c].course;
						$scope.crb = courses[c].created_by.name;
						for(var ct = 0; ct < courses[c].tracks.length; ct++){
							ctrack.push(courses[c].tracks[ct]);
						}
					}
				}
				$scope.coursest = ctrack;
            }

            //enroll class function
            $scope.enroll = function (house) {
                console.log(house);
                var uid = $scope.uid;
                var role = "Student";
                StudentService.PostEnrolment(house, role, uid).then(function () {
                    alert('Enrolment successful.');
					store.remove('GetDashboard');
					StudentService.GetDashboard().then(function(response){
						store.set('GetDashboard',response);
					});
                    $window.location.href = $scope.sdb;
                }, function (err) {
                    alert('Error occur, enrolment unsuccessful!')
                });
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