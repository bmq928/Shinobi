(function(){
    angular
        .module('app')
        .controller('appCtrl', appCtrl)

    appCtrl.$inject = ['$rootScope']
    function appCtrl($rootScope){
        $rootScope.views = ['live', 'playback', 'config'];
        $rootScope.curView = 'live'
    }
})()