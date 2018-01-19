(function(){
    angular
        .module('app')
        .factory('$', jQuery)

    jQuery.$inject = ['$window']
    function jQuery($window){
        return $window.jQuery;
    }
})()