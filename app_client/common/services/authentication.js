(function () {
    angular
        .module('app')
        .factory('authentication', authentication)

    authentication.$inject = ['$http', '$rootScope']
    function authentication($http, $rootScope) {

        var LOGIN_SUCCESS = 'LOGIN_SUCCESS';

        return {
            login: function (mail, password, success, fail) {
                var url = '/api/login';

                return $http
                    .post(url, {
                        mail: mail,
                        password: password
                    })
                    .then(function(res){
                        var token = res.data.token;
                        success(token)
                        $rootScope.$emit(LOGIN_SUCCESS);
                    })
                    .catch(function(err){
                        fail(err.data.message)
                    })
            },
            isLogin: function(){
                if(localStorage.getItem('jwt-token')) return true;

                return false;
            },
            logout: function(){
                localStorage.removeItem('jwt-token');
            },
            onLoginSuccess: function(callback){
                $rootScope.$on(LOGIN_SUCCESS, function(e, data){
                    callback(data);
                })
            },
            // getEmail: function(){
            //     var token = localStorage.getItem('jwt-token');
            //     // console.log(token.split('.')[1])
            //     var data = JSON.parse(atob(token.split('.')[1]));

            //     return data.mail;
            // }

            getUserData: function(){
                var token = localStorage.getItem('jwt-token');
                var data = JSON.parse(atob(token.split('.')[1]));
                console.log(data);
                return data;
            }
        }
    }
})()