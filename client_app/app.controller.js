(function(){
    angular
        .module('app')
        .controller('appCtrl', appCtrl)

    appCtrl.$inject = ['$rootScope']
    function appCtrl($rootScope){

        $rootScope.actions = {
            CHANGE_VIEW: "CHANGE_VIEW"
        }
        $rootScope.views = {
            LIVE: "LIVE",
            PLAYBACK: "PLAYBACK",
            CONFIG: "CONFIG"
        }

        //state of app
        // current view of app
        $rootScope.curView = $rootScope.views.LIVE;
        $rootScope.$watch($rootScope.curView);

        //handle action call
        $rootScope.$on($rootScope.actions.CHANGE_VIEW, function(event, view){
            $rootScope.curView = view;
        })
    }
})()