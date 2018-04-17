(function () {
    angular
        .module('appAdmin')
        .factory('monitorService', monitorService)

    monitorService.$inject = ['$http']
    function monitorService($http) {

        var token = localStorage.getItem('jwt-token');

        return {
            alMonitor: function (mid, uid, callback) {

                var url = '/api/allocate-monitor';
                

                return $http({

                    method: 'PUT',
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + token },
                    data: {
                        uid: uid,
                        mid: mid
                    }
                })
                .then(function(resp){
                    console.log(resp);
                    callback(null, resp.data.message);
                })
                .catch(function(err){
                    callback(err.data.message);
                    console.log(err);
                })
            },
            unalMonitor: function (mid, uid, callback) {
                var url = '/api/unallocate-monitor';
                

                return $http({

                    method: 'PUT',
                    url: url,
                    headers: { 'Authorization': 'Bearer ' + token },
                    data: {
                        uid: uid,
                        mid: mid
                    }
                })
                .then(function(resp){
                    console.log(resp);
                    callback(null, resp.data.message);
                })
                .catch(function(err){
                    callback(err.data.message);
                    console.log(err);
                })
            }
        }
    }
})()