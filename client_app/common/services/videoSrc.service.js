(function () {
    angular
        .module('app')
        .factory('videoSrc', videoSrc)

    videoSrc.$inject = ['$resource']
    function videoSrc($resource) {
        return {
            getByGroupKey: function (groupKey) {
                var params = groupKey || 'uet';
                return $resource('/api/video/list/' + params).get().$promise;
            },
            getByMonitorId: function (monitorId) {
                var params = monitorId || 'p404';
                return $resource('api/video/list/' + params).get().$promise;
            }
            // getByName: function(name){
            //     var params = name
            // }
        }
    }
})()