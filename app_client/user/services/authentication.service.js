(function () {
    angular
        .module('app')
        .factory('authentication', authentication)

    authentication.$inject = ['$http', '$rootScope']
    function authentication($http, $rootScope) {

        var LOGIN_SUCCESS = 'LOGIN_SUCCESS';
        var LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

        return {
            login: function (mail, password, success, fail) {
                var url = '/api/login';

                return $http
                    .post(url, {
                        mail: mail,
                        password: password
                    })
                    .then(function (res) {
                        var token = res.data.token;
                        success(token)
                        $rootScope.$emit(LOGIN_SUCCESS);
                        gotoAdmin();
                        
                    })
                    .catch(function (err) {
                        fail(err.data.message)
                    })


                //if the user is root user
                // goto admin page
                function gotoAdmin() {

                    if (isRoot()) {
                        var hash = location.hash;
                        var url = '/admin/' + hash;

                        location.replace(url);
                    }

                    function isRoot() {
                        if (localStorage.getItem('jwt-token')) {
                            var info = localStorage.getItem('jwt-token').split('.')[1];
                            return JSON.parse(atob(info)).isRoot;
                        }

                        return false;
                    }
                }
            },
            isLogin: function () {
                if (localStorage.getItem('jwt-token')) return true;

                return false;
            },
            logout: function () {
                localStorage.removeItem('jwt-token');
                $rootScope.$emit(LOGOUT_SUCCESS);
            },
            onLoginSuccess: function (callback) {
                $rootScope.$on(LOGIN_SUCCESS, function (e, data) {
                    callback(data);
                })
            },
            onLogoutSuccess: function (callback) {
                $rootScope.$on(LOGOUT_SUCCESS, function (e, data) {
                    callback(data);
                })
            },
            // getEmail: function(){
            //     var token = localStorage.getItem('jwt-token');
            //     // console.log(token.split('.')[1])
            //     var data = JSON.parse(atob(token.split('.')[1]));

            //     return data.mail;
            // }

            getUserData: function () {
                var token = localStorage.getItem('jwt-token');
                var data = JSON.parse(atob(token.split('.')[1]));
                console.log(data);
                return data;
            }
        }
    }
})()