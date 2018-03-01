(function () {
    angular
        .module('app')
        .factory('stream', stream)

    stream.$inject = ['$resource']
    function stream($resource) {
        var rootUrl = 'http://10.0.9.252:252'
        var apiKey = 'FcuQHjPyqXOQtVSDXuFH5kFzeSEydE';
        
        
        return {
            byMonitorId: function (mid, groupKey) {
                mid = mid || 'p404'
                groupKey = groupKey || 'uet'
                // return rootUrl + '/' + apiKey +  '/embed/' + groupKey + '/' + mid + '/full';
                return rootUrl + '/dd96563a40ace53657f75b44197a0649/mjpeg/uet/p404/full'

                // var url = rootUrl + '/' + apiKey +  '/embed/' + groupKey + '/' + mid + '/jquery|fullscreen';
                // var promise = $resource(url).get().$promise;
                // console.log(promise);

                // return promise;
            }
        }
    }
})()