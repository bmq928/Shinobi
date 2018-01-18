(function(){
    angular
        .module('app')
        .controller('liveCtrl', liveCtrl);

    liveCtrl.$inject = ['$rootScope']
    function liveCtrl($rootScope){
        var vm = this;

        vm.changeSelectedCam = function(cam){
            $rootScope.$emit($rootScope.events.changeSelectedCam, cam);
        }
    }
})()