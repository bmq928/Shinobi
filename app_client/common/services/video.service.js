(function(){
    angular
        .module('app')
        .factory('video', video)

    video.$inject = ['$resource']
    function video($resource){

        

        return {

        }
    }
})()