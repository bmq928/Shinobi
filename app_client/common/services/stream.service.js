(function () {
    angular
        .module('app')
        .factory('stream', stream)

    stream.$inject = ['$resource']
    function stream($resource) {
        var rootUrl = 'http://10.0.9.252:252'
        var apiKey = 'FcuQHjPyqXOQtVSDXuFH5kFzeSEydE';

        return {
            createLink: createLink,
            getAll: getAll,
            byMonitorId: byMonitorId
        }

        function byMonitorId (mid, groupKey) {
            mid = mid || 'p404'
            groupKey = groupKey || 'uet'
            return rootUrl + '/' + apiKey + '/embed/' + groupKey + '/' + mid + '/jquery|fullscreen';
            // return rootUrl + '/dd96563a40ace53657f75b44197a0649/mjpeg/uet/p404/full'

            // var url = rootUrl + '/' + apiKey +  '/embed/' + groupKey + '/' + mid + '/jquery|fullscreen';
            // var promise = $resource(url).get().$promise;
            // console.log(promise);

            // return promise;
        }

        function createLink (url) {
            return rootUrl + url;
        }

        function getAll (monitorId, callback) {
            monitorId = monitorId || 'p404'
            var url = createLink('/'+apiKey + '/monitor/' + monitorId)
            console.log(url)
            $resource(url)
                .get()
                .$promise
                .then(function(dat) {
                    
                    //get the stream of that monitor
                    if(Array.isArray(dat)) {
                        callback(dat.map(function(i){
                            return byMonitorId(i.mid, monitorId)
                        }))
                    } else {
                        //is a single object
                        //just to make an array with one element
                        //for the right structure
                        callback([byMonitorId(dat.id)])
                    }
                }).catch(function(err){
                    console.log(err)
                })
        }
    }
})()