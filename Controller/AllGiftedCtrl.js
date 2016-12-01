(function () {
    console.log("abcdefg");
    'use strict';
    //Inject every dependancies here to BigHolidayApp
    angular.module('AllGifted', [
            //Core
            'AllGifted.Core',
            

            //All the modules
            'AllGifted.Access',
            'AllGifted.Student',
            'AllGifted.Teacher'            
    ])
        .config([
            '$stateProvider', '$locationProvider', '$httpProvider', '$urlRouterProvider', 'authProvider', 'jwtInterceptorProvider', 'jwtOptionsProvider', function ($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider, authProvider, jwtInterceptorProvider, jwtOptionsProvider) {

                authProvider.init({
                    domain: 'pamelalim.auth0.com',
                    clientID: 'eVJv6UFM9GVdukBWiURczRCxmb6iaUYG'
                });

                jwtInterceptorProvider.tokenGetter = function (store) {
                    return store.get('token');
                }

                jwtOptionsProvider.config({
                    whiteListedDomains: ['math.all-gifted.com', 'localhost', 'quizapi.pamelalim.me', 'quiz.all-gifted.com', 'quizdev.pamelalim.me','api.japher.org']
                });

                $httpProvider.interceptors.push('jwtInterceptor');

                //Redirections
                $urlRouterProvider.when("/test", '/View/Access/Login.html');
                $locationProvider.html5Mode(true);
                //$locationProvider.when("/test-c", '/test-c/View/Access/Login.html')
                //set header

                
            }
            
            
        ])
        //.constant("apiendpoints", 'http://api.japher.org/')
        .constant("apiendpoints", 'http://quizapi.pamelalim.me/')
        .run(['$rootScope', 'auth', 'store', 'jwtHelper','$location','$window','$http', function ($rootScope,  auth, store, jwtHelper,$location,$window,$http) {
           
            
            //var domain_name = 'http://localhost:49730';
            var domain_name = 'http://math.pamelalim.me/test-c';
            //var domain_name = 'http://128.199.109.181/test';
            
            
            $rootScope.AccessLogin = domain_name + '/View/Access/Login.html';
            $rootScope.AccessForgotPassword = domain_name + '/View/Access/ForgotPassword.html';
            $rootScope.AccessRegister = domain_name + '/View/Access/Register.html'
            $rootScope.StudentDashboard = domain_name + '/View/Student/Dashboard/Dashboard.html'
            $rootScope.StudentAssignment = domain_name + '/View/Student/MyAssignments/Assignment.html'
            $rootScope.StudentClass = domain_name + '/View/Student/MyClasses/Class.html'
            $rootScope.StudentProfile = domain_name + '/View/Student/MyProfile/Profile.html'
            $rootScope.StudentResults = domain_name + '/View/Student/MyResults/Results.html'
            $rootScope.StudentAcademicAchievers = domain_name + '/View/Student/ScoreBoard/AcademicAchievers.html'
            $rootScope.StudentGameLeader = domain_name + '/View/Student/ScoreBoard/GameLeader.html'
            $rootScope.StudentAllClasses = domain_name + '/View/Student/ViewAllCourses/AllClasses.html'
            $rootScope.TeacherDashboard = domain_name + '/View/Teacher/Dashboard/Dashboard.html'
            $rootScope.TeacherManageAssignments = domain_name + '/View/Teacher/ManageAssignments/ManageAssignments.html'
            $rootScope.TeacherAddAssignment = domain_name + '/View/Teacher/ManageAssignments/AddAssignment.html'
            $rootScope.TeacherEditAssignment = domain_name + '/View/Teacher/ManageAssignments/EditAssignment.html'
            $rootScope.TeacherManageClasses = domain_name + '/View/Teacher/ManageClasses/ManageClasses.html'
            $rootScope.TeacherAddClass = domain_name + '/View/Teacher/ManageClasses/AddClass.html'
            $rootScope.TeacherEditClass = domain_name + '/View/Teacher/ManageClasses/EditClass.html'
            $rootScope.TeacherManageClassTracks = domain_name + '/View/Teacher/ManageClasses/ManageTracks/ManageClassTracks.html'
            $rootScope.TeacherAddClassTrack = domain_name + '/View/Teacher/ManageClasses/ManageTracks/AddClassTrack.html'
            $rootScope.TeacherEditClassTrack = domain_name + '/View/Teacher/ManageClasses/ManageTracks/EditClassTrack.html'
            $rootScope.TeacherManageClassTrackSkills = domain_name + '/View/Teacher/ManageClasses/ManageTracks/ManageSkills/ManageClassTrackSkills.html'
            $rootScope.TeacherAddClassTrackSkill = domain_name + '/View/Teacher/ManageClasses/ManageTracks/ManageSkills/AddClassTrackSkill.html'
            $rootScope.TeacherEditClassTrackSkill = domain_name + '/View/Teacher/ManageClasses/ManageTracks/ManageSkills/EditClassTrackSkill.html'
            $rootScope.TeacherManagceClassTrackSkillQuestions = domain_name + '/View/Teacher/ManageClasses/ManageTracks/ManageSkills/ManageQuestions/ManageClassTrackSkillQuestions.html'
            $rootScope.TeacherAddClassTrackSkillQuestion = domain_name + '/View/Teacher/ManageClasses/ManageTracks/ManageSkills/ManageQuestions/AddClassTrackSkillQuestion.html'
            $rootScope.TeacherEditClassTrackSkillQuestion = domain_name + '/View/Teacher/ManageClasses/ManageTracks/ManageSkills/ManageQuestions/EditClassTrackSkillQuestion.html'
            $rootScope.TeacherManageCourses = domain_name + '/View/Teacher/ManageCourses/ManageCourses.html'
            $rootScope.TeacherAddCourse = domain_name + '/View/Teacher/ManageCourses/AddCourse.html'
            $rootScope.TeacherEditCourse = domain_name + '/View/Teacher/ManageCourses/EditCourse.html'
            $rootScope.TeacherManageCourseTracks = domain_name + '/View/Teacher/ManageCourses/ManageTracks/ManageCourseTracks.html'
            $rootScope.TeacherAddCourseTrack = domain_name + '/View/Teacher/ManageCourses/ManageTracks/AddCourseTrack.html'
            $rootScope.TeacherEditCourseTrack = domain_name + '/View/Teacher/ManageCourses/ManageTracks/EditCourseTrack.html'
            $rootScope.TeacherManageCourseTrackSkills = domain_name + '/View/Teacher/ManageCourses/ManageTracks/ManageSkills/ManageCourseTrackSkills.html'
            $rootScope.TeacherAddCourseTrackSkill = domain_name + '/View/Teacher/ManageCourses/ManageTracks/ManageSkills/AddCourseTrackSkill.html'
            $rootScope.TeacherEditCourseTrackSkill = domain_name + '/View/Teacher/ManageCourses/ManageTracks/ManageSkills/EditCourseTrackSkill.html'
            $rootScope.TeacherManageCourseTrackSkillQuestions = domain_name + '/View/Teacher/ManageCourses/ManageTracks/ManageSkills/ManageQuestions/ManageCourseTrackSkillQuestions.html'
            $rootScope.TeacherAddCourseTrackSkillQuestion = domain_name + '/View/Teacher/ManageCourses/ManageTracks/ManageSkills/ManageQuestions/AddCourseTrackSkillQuestion.html'
            $rootScope.TeacherEditCourseTrackSkillQuestion = domain_name + '/View/Teacher/ManageCourses/ManageTracks/ManageSkills/ManageQuestions/EditCourseTrackSkillQuestion.html'
            $rootScope.TeacherManageGames = domain_name + '/View/Teacher/ManageGames/ManageGames.html'
            $rootScope.TeacherAddGame = domain_name + '/View/Teacher/ManageGames/AddGame.html'
            $rootScope.TeacherEditGame = domain_name + '/View/Teacher/ManageGames/EditGame.html'
            $rootScope.TeacherManageUsers = domain_name + '/View/Teacher/ManageUsers/ManageUsers.html'
            $rootScope.TeacherAddUser = domain_name + '/View/Teacher/ManageUsers/AddUser.html'
            $rootScope.TeacherEditUser = domain_name + '/View/Teacher/ManageUsers/EditUser.html'
            $rootScope.TeacherAssignment = domain_name + '/View/Teacher/MyAssignments/Assignment.html'
            $rootScope.TeacherClass = domain_name + '/View/Teacher/MyClasses/Class.html'
            $rootScope.TeacherProfile = domain_name + '/View/Teacher/MyProfile/Profile.html'
            $rootScope.TeacherOverallPerformance = domain_name + '/View/Teacher/Performance/OverallPerformance.html'
            $rootScope.TeacherResultsBreakdown = domain_name + '/View/Teacher/Performance/ResultsBreakdown.html'
            $rootScope.TeacherStudentRadar = domain_name + '/View/Teacher/Performance/StudentRadar.html'
            $rootScope.TeacherReports = domain_name + '/View/Teacher/Reports/Reports.html'
            $rootScope.TeacherAcademicAchievers = domain_name + '/View/Teacher/ScoreBoards/AcademicAchievers.html'
            $rootScope.TeacherGameLeader = domain_name + '/View/Teacher/ScoreBoards/GameLeader.html'
            $rootScope.TeacherAuditLogs = domain_name + '/View/Teacher/Settings/AuditLogs.html'
            $rootScope.TeacherPayments = domain_name + '/View/Teacher/Settings/Payments.html'
            $rootScope.TeacherSystemSettings = domain_name + '/View/Teacher/Settings/SystemSettings.html'
            $rootScope.TeacherAllClasses = domain_name + '/View/Teacher/ViewAllCourses/AllClasses.html'
            

            // Listen to a location change event
            $rootScope.$on('$locationChangeStart', function () {
                // Grab the user's token
                var token = store.get('token');
                var a = store.get('profile');
                // Check if token was actually stored
                if (token) {
                    // Check if token is yet to expire
                    if (!jwtHelper.isTokenExpired(token)) {
                        // Check if the user is not authenticated
                        if (!auth.isAuthenticated) {
                            auth.authenticate(store.get('profile'), token);
                        }
                    } else {
                        auth.refreshIdToken(token);
                    }
                }
               
                
                
                
                
                var path = $location.path().split('/');
                console.log(path[4]);
                if (auth.isAuthenticated) {
                    if (path[4] == 'Login.html') {
                        var adminon = $http({
                            url: 'http://quizapi.pamelalim.me/api/protected',
                            method: "GET",
                            headers: {
                                'Authorization': 'Bearer ' + token
                            }
                        }).then(function (response) {
                            var iadmin = response.data.user.is_admin;
                            console.log(iadmin);
                            if (iadmin == 1) {
                                console.log("admin");
                                $window.location.href = $rootScope.TeacherDashboard;
                            }
                            else {
                                console.log("non admin");
                                $window.location.href = $rootScope.StudentDashboard;
                            }
                        });
                    }
                    else {
                        if (path[3] == 'Student') {
                            var adminon = $http({
                                url: 'http://quizapi.pamelalim.me/api/protected',
                                method: "GET",
                                headers: {
                                    'Authorization': 'Bearer ' + token
                                }
                            }).then(function (response) {
                                var iadmin = response.data.user.is_admin;
                                console.log(iadmin);
                                if (iadmin == 1) {
                                    console.log("admin");
                                    $window.location.href = $rootScope.TeacherDashboard;
                                }
                            });
                        }
                        else {
                            if (path[3] == 'Teacher') {
                                var adminon = $http({
                                    url: 'http://quizapi.pamelalim.me/api/protected',
                                    method: "GET",
                                    headers: {
                                        'Authorization': 'Bearer ' + token
                                    }
                                }).then(function (response) {
                                    var iadmin = response.data.user.is_admin;
                                    console.log(iadmin);
                                    if (iadmin == 0) {
                                        console.log("non-admin");
                                        $window.location.href = $rootScope.StudentDashboard;
                                    }
                                });
                            }
                        }
                    }
                }
                else {
                    if (!auth.isAuthenticated) {
                        if (path[4] != 'Login.html') {
                            $window.location.href = $rootScope.AccessLogin;
                        }
                    }
                };

                //if (path[4] !== 'Login.html'&& (!auth.isAuthenticated)) {
                //    $window.location.href = $rootScope.AccessLogin;
                //}
                //else
                //{
                //    if (path[4] == 'Login.html' && (auth.isAuthenticated)) {
                //        //
                //        var adminon = $http({
                //            url: 'http://quizapi.pamelalim.me/api/protected',
                //            method: "GET",
                //            headers: {
                //                'Authorization': 'Bearer ' + token
                //            }
                //        }).then(function (response) {
                //            var iadmin = response.data.user.is_admin;
                //            console.log(iadmin);
                //            if (iadmin == 1) {
                //                console.log("admin");
                //                $window.location.href = $rootScope.TeacherDashboard;
                //            }
                //            else {
                //                console.log("non admin");
                //                $window.location.href = $rootScope.StudentDashboard;
                //            }
                //        });
                //    }
                //}
            });
            var pfl = store.get('profile');
            if (pfl != undefined)
            {
                $rootScope.unm = pfl.name;
            }
            
            
            var tkn = store.get('token');
            if (tkn != undefined)
            {
                $rootScope.tok = tkn;
            }
            
            
            
            
            

            

        }]);


})();