(function () {
    'use strict';

    angular
        .module('AllGifted.Student')
        .factory('StudentService', ['$http', 'apiendpoints', '$rootScope', function ($http, apiendpoints, $rootScope) {
            var tokening = $rootScope.tok;
            var Student = {
                GetDashboard: getdashboard,
                GetAllCourses:getallcourses,
                GetCoursesHouse: getcourseshouse,
                GetCoursesTrack: getcoursestrack,
                PostEnrolment: postenrolment,
                PutUnenrol: putunenrol,
                PostUnanswerQ: postunanswerq,
                PostGAnswer: postganswer,
                PostGScore: postgscore,
                PutUpdatePassw: putupdatepassw
            };

            return Student;

            function getdashboard() {
                return $http({
                    url: apiendpoints + 'api/protected',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer '+tokening
                    }
                });
            }
            function getallcourses() {
                return $http({
                    url: apiendpoints + 'courses',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getcourseshouse(cid) {
                return $http({
                    url: apiendpoints + 'courses/'+cid+'/houses',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getcoursestrack(cid) {
                return $http({
                    url: apiendpoints + 'courses/' + cid + '/tracks',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postenrolment(houses, role, uid) {
                
                return $http({
                    url: apiendpoints + 'houses/'+houses+'/users',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    data:$.param({"role":role, "user_id": uid})
                    
                });
            }
            function putunenrol(houses, users, role) {
                
                return $http({
                    url: apiendpoints + 'houses/'+houses+'/users/'+users,
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: {"role":role,"user_id":users}
                });
            }
            function postunanswerq() {
                return $http({
                    url: apiendpoints + 'test/protected',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postganswer() {
                return $http({
                    url: apiendpoints + 'answers',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postgscore(ogl,ngl) {
                return $http({
                    url: apiendpoints + 'game_score',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data:$.param({"old_game_level":olg,"new_game_level":ngl})
                });
            }
            function putupdatepassw(users,fname,lname,contact) {

                return $http({
                    url: apiendpoints + '/users/' + users,
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        "firstname": fname,
                        "lastname": lname,
                        "contact": contact
                    })
                });
            }
        }]);

})();