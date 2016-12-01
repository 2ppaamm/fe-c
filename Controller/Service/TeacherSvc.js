(function () {
    'use strict';

    angular
        .module('AllGifted.Teacher')
        .factory('TeacherService', ['$http', 'apiendpoints', '$rootScope', function ($http, apiendpoints, $rootScope) {
            var tokening = $rootScope.tok;
            var Teacher = {
                GetDashboard: getdashboard,
                PostEnrolment: postenrolment,
                PutUnenrol: putunenrol,
                DeleteCUser: deletecuser,
                GetCUserRole: getcuserrole,
                GetClasses: getclasses,
                PostCreateClass: postcreateclass,
                GetOneClass: getoneclass,
                PatchUpdateClass: patchupdateclass,
                DeleteClass: deleteclass,
                GetHousesTrack: gethousestrack,
                PostCreateHousesTrack: postcreatehousestrack,
                GetAllHousesTrackContent: getalltrackcontent,
                UpdateHousesTrack: updatehousestrack,
                DeleteHousesTrack: deletehousestrack,
                GetCourseTrack: getcoursetrack,
                PostCreateCourseTrack: postcreatecoursetrack,
                GetAllCourseTrackContent: getallcoursetrackcontent,
                UpdateCourseTrack: updatecoursetrack,
                DeleteCourseTrack: deletecoursetrack,
                GetTrack: gettrack,
                PostCreateTrack: postcreatetrack,
                PutUpdateTrack: putupdatetrack,
                GetTrackContent: gettrackcontent,
                DeleteTrack: deletetrack,
                PostCreateSkills: postcreateskills,
                GetSkills: getskills,
                PutUpdateSkills: putupdateskills,
                DeleteSkills: deleteskills,
                GetReadSkills: getreadskills,
                PostCreateTrackSkill: postcreatetrackskill,
                GetReadAllTrackSkill: getreadalltrackskill,
                GetReadSingleTrackSkill: getreadsingletrackskill,
                PatchUpdateTrackSkill: patchupdatetrackskill,
                DeleteTrackSkill: deletetrackskill,
                PostCreateSkillQuestion: postcreateskillquestion,
                GetAllSkillQuestion: getallskillquestion,
                GetSingleSkillQuestion: getsingleskillquestion,
                PatchUpdateSkillQuestion: patchupdateskillquestion,
                DeleteSkillQuestion: deleteskillquestion,
                GetQuestions: getquestions,
                PostCreateQuestions: postcreatequestions,
                PutUpdateQuestions: putupdatequestions,
                DeleteQuestions: deletequestions,
                GetSingleQuestions: getsinglequestions,
                PostUnanswerQ: postunanswerq,
                PostGAnswer: postganswer,
                PostGScore: postgscore,
                GetAllUsers: getallusers,
                GetOneCourseTrack: getonecoursetrack,
                PostCreateCourse: postcreatecourse,
                DeleteCourse: deletecourse,
                GetCourses: getcourses,
                GetOneUser: getoneuser,
                PutUpdateProfile: putupdateprofile,
                DeleteUser: deleteuser,
                AddUser: adduser,
                UpdateUser: updateuser,
                PublishCourse: publishcourse,
                UpdateCourse: updatecourse,
                PublishClass: publishclass,



            };

            return Teacher;

            function getdashboard() {
                return $http({
                    url: apiendpoints + 'api/protected',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postenrolment(houses, role, uid) {

                return $http({
                    url: apiendpoints + 'houses/' + houses + '/users',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({"role":role, "user_id":uid})
                });
            }
            function putunenrol(houses, users, rid) {

                return $http({
                    url: apiendpoints + 'houses/' + houses + '/users/' + users,
                    method: "POST",
                    data: { "Role_id": rid },
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function deletecuser(houses,users) {
                return $http({
                    url: apiendpoints + 'houses/'+houses+'/users/'+users,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getcuserrole(houses, users) {
                return $http({
                    url: apiendpoints + 'houses/' + houses + '/users/' + users,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getclasses(){
                return $http({
                    url: apiendpoints + 'houses',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postcreateclass(cid,cname,cdes,sdate,edate) {
                return $http({
                    url: apiendpoints + 'houses',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        "course_id": cid,
                        "house": cname,
                        "image": "http://quizapi.pamelalim.me/images/courses/1.png",
                        "description": cdes,
                        "start_date": sdate,
                        "end_date": edate
                    })
                });
            }
            function getoneclass(houses){
                return $http({
                    url: apiendpoints + 'houses/'+houses,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function patchupdateclass(data, houses) {
                angular.extend(data);
                return $http({
                    url: apiendpoints + 'houses/'+houses,
                    method: "PATCH",
                    data:data,
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function deleteclass(houses){
                return $http({
                    url: apiendpoints + 'houses/'+houses,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function gethousestrack(houses){
                return $http({
                    url: apiendpoints + 'houses/'+houses+'/tracks',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postcreatehousestrack(houses,tr,td,li,fi){
                return $http({
                    url: apiendpoints + 'houses/' + houses + '/tracks',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        "track": tr,
                        "description": td,
                        "level_id": li,
                        "field_id": fi
                    })
                });
            }
            function getalltrackcontent(houses,tracks){
                return $http({
                    url: apiendpoints + 'houses/'+houses+'/tracks/'+tracks,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function updatehousestrack(data, houses, tracks) {
                angular.extend(data);
                return $http({
                    url: apiendpoints + 'houses/' + houses + '/tracks/' + tracks,
                    method: "UPDATE",
                    data:data,
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function deletehousestrack(houses,tracks){
                return $http({
                    url: apiendpoints + 'houses/' + houses + '/tracks/' + tracks,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getcoursetrack(courses){
                return $http({
                    url: apiendpoints + 'courses/'+courses+'/tracks',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postcreatecoursetrack(courses,tr,td,li,fi) {
                
                return $http({
                    url: apiendpoints + 'courses/' + courses + '/tracks',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        "track": tr,
                        "description": td,
                        "level_id": li,
                        "field_id": fi
                    })
                });
            }
            function getallcoursetrackcontent(course,tracks){
                return $http({
                    url: apiendpoints + 'courses/'+courses+'/tracks/'+tracks,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function updatecoursetrack(courses, tracks, tn, dp, lid,fid) {
                return $http({
                    url: apiendpoints + 'courses/' + courses + '/tracks/' + tracks,
                    method: "PATCH",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        "track": tn,
                        "description": dp,
                        "level_id": lid,
                        "field_id": fid
                    })
                });
            }
            function deletecoursetrack(courses,tracks){
                return $http({
                    url: apiendpoints + 'courses/' + courses + '/tracks/' + tracks,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                });
            }
            function gettrack(){
                return $http({
                    url: apiendpoints + 'tracks',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postcreatetrack(data) {
                angular.extend(data);
                return $http({
                    url: apiendpoints + 'tracks',
                    method: "POST",
                    data:data,
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function putupdatetrack(data, tracks) {
                angular.extend(data);
                return $http({
                    url: apiendpoints + 'tracks/'+tracks,
                    method: "PUT",
                    data:data,
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function gettrackcontent(tracks){
                return $http({
                    url: apiendpoints + 'tracks/' + tracks,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function deletetrack(tracks){
                return $http({
                    url: apiendpoints + 'tracks/' + tracks,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postcreateskills(skills){
                return $http({
                    url: apiendpoints + 'skills/'+skills,
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getskills(){
                return $http({
                    url: apiendpoints + 'skills',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function putupdateskills(data, skills) {
                angular.extend(data);
                return $http({
                    url: apiendpoints + 'skills/' + skills,
                    method: "PUT",
                    data:data,
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function deleteskills(skills){
                return $http({
                    url: apiendpoints + 'skills/' + skills,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getreadskills(skills){
                return $http({
                    url: apiendpoints + 'skills/' + skills,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postcreatetrackskill(tracks,sk,sd) {
                return $http({
                    url: apiendpoints + 'tracks/'+tracks+'/skills',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        "skill": sk,
                        "description": sd
                    })
                });
            }
            function getreadalltrackskill(tracks){
                return $http({
                    url: apiendpoints + 'tracks/' + tracks + '/skills',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getreadsingletrackskill(tracks,skills){
                return $http({
                    url: apiendpoints + 'tracks/'+tracks+'/skills/'+skills,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function patchupdatetrackskill(data, tracks, skills) {
                angular.extend(data);
                return $http({
                    url: apiendpoints + 'tracks/' + tracks + '/skills/' + skills,
                    method: "PATCH",
                    data:data,
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function deletetrackskill(tracks,skills){
                return $http({
                    url: apiendpoints + 'tracks/' + tracks + '/skills/' + skills,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postcreateskillquestion(data,skills) {
                angular.extend(data);
                return $http({
                    url: apiendpoints + 'skills/'+skills+'/questions',
                    method: "POST",
                    data:data,
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getallskillquestion(skills){
                return $http({
                    url: apiendpoints + 'skills/' + skills + '/questions',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getsingleskillquestion(skills,questions){
                return $http({
                    url: apiendpoints + 'skills/' + skills + '/questions'+questions,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function patchupdateskillquestion(skills,questions){
                return $http({
                    url: apiendpoints + 'skills/' + skills + '/questions' + questions,
                    method: "PATCH",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function deleteskillquestion(skills,questions){
                return $http({
                    url: apiendpoints + 'skills/' + skills + '/questions' + questions,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getquestions(){
                return $http({
                    url: apiendpoints + 'questions',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postcreatequestions(){
                return $http({
                    url: apiendpoints + 'questions',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function putupdatequestions(questions){
                return $http({
                    url: apiendpoints + 'questions/'+questions,
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function deletequestions(questions){
                return $http({
                    url: apiendpoints + 'questions/' + questions,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getsinglequestions(questions) {
                return $http({
                    url: apiendpoints + 'questions/' + questions,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
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
            function postgscore() {
                return $http({
                    url: apiendpoints + 'game_score',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getallusers() {
                return $http({
                    url: apiendpoints + 'users',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getonecoursetrack(courses, tracks) {
                return $http({
                    url: apiendpoints + 'courses/' + courses + '/tracks/'+ tracks,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function postcreatecourse(cn,dc) {
                return $http({
                    url: apiendpoints + 'courses',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({ "course": cn, "description": dc })
                });
            }
            function deletecourse(cid) {
                return $http({
                    url: apiendpoints + 'courses/' + cid,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getcourses() {
                return $http({
                    url: apiendpoints + 'courses',
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function getoneuser(uid) {
                return $http({
                    url: apiendpoints + 'users/'+uid,
                    method: "GET",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function putupdateprofile(users, fname, lname, contact) {

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
            function deleteuser(users) {
                return $http({
                    url: apiendpoints +'/users/' + users,
                    method: "DELETE",
                    headers: {
                        'Authorization': 'Bearer ' + tokening
                    }
                });
            }
            function adduser(email,password) {

                return $http({
                    url: apiendpoints + '/users',
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({ "email": email, "password": password })
                });
            }
            function updateuser(users, fname, lname, contact,dob) {

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
                        "contact": contact,
                        "date_of_birth":dob
                    })
                });
            }
            function publishcourse(courses) {

                return $http({
                    url: apiendpoints + '/courses/' + courses,
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        "status_id": 3
                    })
                });
            }

            function updatecourse(courses, cn, dp) {

                return $http({
                    url: apiendpoints + '/courses/' + courses,
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        "course": cn,
                        "description":dp
                    })
                });
            }

            function publishclass(houses) {

                return $http({
                    url: apiendpoints + '/houses/' + houses,
                    method: "PUT",
                    headers: {
                        'Authorization': 'Bearer ' + tokening,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $.param({
                        "status_id": 3
                    })
                });
            }
        }]);

})();