(function () {
    angular
        .module('app')
        .factory('authentication', authentication)

    authentication.$inject = ['$http']
    function authentication($http) {

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
            }
        }
    }
})()