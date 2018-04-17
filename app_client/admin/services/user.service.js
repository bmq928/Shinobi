(function () {
    angular
        .module('appAdmin')
        .factory('userService', userService)

    userService.$inject = ['$http']
    function userService($http) {

        var token = localStorage.getItem('jwt-token');

        return {
            addUser: function (mail, ke, password, detail, callback) {
                var url = '/api/addUser';

                return $http({
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'POST',
                    data: {
                        mail: mail,
                        ke: ke,
                        password: password,
                        detail: detail
                    }
                })
                    .then(function (resp) {
                        callback(null, resp.data.message);
                        console.log(resp);
                    })
                    .catch(function (resp) {
                        callback(resp.data.message);
                        console.log(resp);
                    })
            },
            removeUser: function (mail, callback) {
                var url = '/api/removeUserByMail';
                console.log(mail);

                return $http({
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'POST',
                    data: {
                        mail: mail
                    }
                })
                    .then(function (resp) {
                        callback(null, resp.data.message);
                        console.log(resp);
                    })
                    .catch(function (resp) {
                        callback(resp.data.message);
                        console.log(resp);
                    })
            }
        }
    }
})()