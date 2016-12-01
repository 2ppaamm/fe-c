(function () {
    'use strict';

    angular
        .module('AllGifted.Student')
        .controller('ResultsCtrl', ['$scope', '$state', '$window', '$http', 'aaNotify', '$rootScope', 'auth', 'store', 'StudentService', function ($scope, $state, $window, $http, aaNotify, $rootScope, auth, store, StudentService) {

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
            $scope.rdyear = "";
            $scope.total = 0;
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
					//get maxile field
					var mf = response.user.getfieldmaxile;
					var radarlabel = [];
					var radardata = [];
					var rdyear = [];
					var rdry = [];
					var totalmax = [];
					if (mf != undefined || mf != null) {
						for (var rl = 0; rl < mf.length; rl++) {
							var rdy = new Date(mf[rl].field_test_date);
							var rdfy = rdy.getFullYear();
							var total = parseInt(mf[rl].field_maxile);
							radarlabel.push(mf[rl].field);
							radardata.push(mf[rl].field_maxile);
							rdyear.push(rdfy);
							totalmax.push(total);
						}
						
						for (var t = 0; t < totalmax.length; t++) {
							$scope.total += totalmax[t];
						}
						
						$scope.average = $scope.total / totalmax.length;
						
						for (var l = 0; l < rdyear.length; l++) {
							if (rdry.length < 1) {
								rdry.push(rdyear[l]);
							}
							else {
								for (var a = 0; a < rdry.length; a++) {
									if (rdyear[l] != rdry[a]) {
										rdry.push(rdyear[l]);
									}
								}
							}
						}
						$scope.rdyear = rdry[0];                    
					}

					var radarChartData = {
						labels: radarlabel,
						pointLabelFontSize: 19,
						datasets: [{
							fillColor: "rgba(98,168,234,0.35)",
							strokeColor: "rgba(0,0,0,0)",
							pointColor: $.colors("blue", 600),
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: $.colors("blue", 600),
							data: radardata
						}/*, {
							fillColor: "rgba(125,211,174,0.7)",
							strokeColor: "rgba(0,0,0,0)",
							pointColor: $.colors("green", 600),
							pointStrokeColor: "#fff",
							pointHighlightFill: "#fff",
							pointHighlightStroke: $.colors("blue-grey", 300),
							data: [65, 59, 90, 81]
						}*/]
					};
					console.log(radardata);

					var myRadar = new Chart(document.getElementById("exampleChartjsRadar").getContext("2d")).Radar(radarChartData, {
						scaleShowLabels: false,
						pointLabelFontSize: 15
					});

					new Chartist.Bar("#widgetOverallViews .line-chart", {
						labels: radarlabel,
						series: [
						  radardata
						]
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
				//get maxile field
				var mf = response.user.getfieldmaxile;
				var radarlabel = [];
				var radardata = [];
				var rdyear = [];
				var rdry = [];
				var totalmax = [];
				if (mf != undefined || mf != null) {
					for (var rl = 0; rl < mf.length; rl++) {
						var rdy = new Date(mf[rl].field_test_date);
						var rdfy = rdy.getFullYear();
						var total = parseInt(mf[rl].field_maxile);
						radarlabel.push(mf[rl].field);
						radardata.push(mf[rl].field_maxile);
						rdyear.push(rdfy);
						totalmax.push(total);
					}
					for (var t = 0; t < totalmax.length; t++) {
						$scope.total += totalmax[t];
					}
					$scope.average = $scope.total / totalmax.length;
					for (var l = 0; l < rdyear.length; l++) {
						if (rdry.length < 1) {
							rdry.push(rdyear[l]);
						}
						else {
							for (var a = 0; a < rdry.length; a++) {
								if (rdyear[l] != rdry[a]) {
									rdry.push(rdyear[l]);
								}
							}
						}
					}
					$scope.rdyear = rdry[0];                    
				}
				var radarChartData = {
					labels: radarlabel,
					pointLabelFontSize: 19,
					datasets: [{
						fillColor: "rgba(98,168,234,0.35)",
						strokeColor: "rgba(0,0,0,0)",
						pointColor: $.colors("blue", 600),
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: $.colors("blue", 600),
						data: radardata
					}/*, {
						fillColor: "rgba(125,211,174,0.7)",
						strokeColor: "rgba(0,0,0,0)",
						pointColor: $.colors("green", 600),
						pointStrokeColor: "#fff",
						pointHighlightFill: "#fff",
						pointHighlightStroke: $.colors("blue-grey", 300),
						data: [65, 59, 90, 81]
					}*/]
				};
				console.log(radardata);
				var myRadar = new Chart(document.getElementById("exampleChartjsRadar").getContext("2d")).Radar(radarChartData, {
					scaleShowLabels: false,
					pointLabelFontSize: 15
				});
				new Chartist.Bar("#widgetOverallViews .line-chart", {
					labels: radarlabel,
					series: [
					  radardata
					]
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

