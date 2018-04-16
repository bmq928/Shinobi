(function(){
    angular
        .module('app')
        .factory('video', video)

    video.$inject = ['$resource']
    function video($resource){

        return {
            getAllByMid: function(mid, callback){
                var url = 'api/getAllVideoByMid?mid='+mid;
                var token = localStorage.getItem('jwt-token');

                return $resource(url, {}, {
                    get: {
                        method: 'GET',
                        headers: { 'Authorization': 'Bearer ' + token }
                    }
                })
                    .get()
                    .$promise
                    .then(function(resp){
                        callback(resp.videos)
                    })
                    .catch(function(err){
                        console.error(err);
                    })
            }
        }
    }
})()