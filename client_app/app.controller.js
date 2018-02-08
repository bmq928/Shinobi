(function(){
    angular
        .module('app')
        .controller('appCtrl', appCtrl)

    appCtrl.$inject = ['$rootScope', '$state']
    function appCtrl($rootScope, $state){


        //handle action call
        $rootScope.$on($rootScope.actions.CHANGE_VIEW, function(event, view){
            $rootScope.curView = view;
            console.log($state);
        })
    }
})()