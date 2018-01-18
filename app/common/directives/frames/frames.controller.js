(function(){
    angular
        .module('app')
        .controller('framesCtrl', framesCtrl)

    framesCtrl.$inject = ['$rootScope']
    function framesCtrl($rootScope){
        var vm = this;

        vm.changeSelectedCam = function(cam){
            $rootScope.$emit($rootScope.events.changeSelectedCam, cam);
        }

    }
})()