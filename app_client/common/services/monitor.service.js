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
            return $resource(url)
                .get()
                .$promise
                .then(function (data) {
                    callback(null, data);
                })
                .catch(function (err) {
                    callback(err);
                })
        }
    }
})()