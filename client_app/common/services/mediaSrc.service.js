(function () {
    angular
        .module('app')
        .factory('mediaSrc', mediaSrc)

    mediaSrc.$inject = ['$resource']
    function mediaSrc($resource) {
        return {
            getByGroupKey: function (type, groupKey) {
                var params = groupKey || 'uet';
                type = type || 'video';
                var url = '/api/' + type + '/list/' + params
                return $resource(url).get().$promise;
            },
            getByMonitorId: function (type, monitorId) {
                var params = monitorId || 'p404';
                type = type || 'video';
                var url = 'api/' + type + '/list/' + params
                return $resource(url).get().$promise;
            }
            // getByName: function(name){
            //     var params = name
            // }
        }
    }
})()