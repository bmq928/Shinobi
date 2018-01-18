(function(){
    angular
        .module('app')
        .controller('mainCtrl', mainCtrl)

    mainCtrl.$inject = ['$rootScope']
    function mainCtrl($rootScope){
        $rootScope.tab = "Live"

        
    }
})()