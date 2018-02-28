(function () {
    angular
        .module('app')
        .factory('mediaSrc', mediaSrc)

    mediaSrc.$inject = ['$resource']
    function mediaSrc($resource) {
        var rootUrl = 'http://10.0.9.252:252'
        return {
            createLink: function(url){
                return rootUrl + url;
            },
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