(function () {
    angular
        .module('app')
        .service('monitor', monitor)

    monitor.$inject = ['$resource']
    function monitor($resource) {

        return {
            getInfo: getInfo
        }

        function getInfo(mid, callback) {
            var url = '/api/getMonitorById?mid=' + mid;
            var token = localStorage.getItem('jwt-token')
            return $resource(url, {}, {
                get: {
                    method: 'GET',
                    headers: { 'Authorization': 'Bearer ' + token }
                }
            })
                .get()
                .$promise
                .then(function (data) {
                    callback(null, data.monitor);
                })
                .catch(function (err) {
                    callback(err);
                })
        }
    }
})()