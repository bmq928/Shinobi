(function () {
    angular
        .module('appAdmin')
        .factory('userService', userService)

    userService.$inject = ['$http']
    function userService($http) {

        var token = localStorage.getItem('jwt-token');

        return {
            getAll: function (callback) {
                var url = '/api/allUser';


                $http({
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'GET'
                })
                    .then(function (resp) {
                        callback(null, resp.data.users);
                    })
                    .catch(function (resp) {
                        callback(resp.data.message);
                    })
            },
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
            removeUserByMail: function (mail, callback) {
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
            },
            removeGroupUser: function(listUser, callback){
                var url = '/api/removeGroupUser';

                console.log(url);

                return $http({
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + token },
                    method: 'POST',
                    data: {
                        listUser: JSON.stringify(listUser)
                    }
                })
                    .then(function (resp) {
                        callback(null, resp.data.message);
                    })
                    .catch(function (resp) {
                        callback(resp.data.message);
                    })
            }
        }
    }
})()