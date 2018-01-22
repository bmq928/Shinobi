(function(){
    angular
        .module('app')
        .controller('framesCtrl', framesCtrl)

    framesCtrl.$inject = ['$rootScope', '$uibModal']
    function framesCtrl($rootScope, $uibModal){
        var vm = this;
        vm.searchText = {
            name: ""
        }

        vm.changeSelectedCam = function(cam){
            $rootScope.$emit($rootScope.events.changeSelectedCam, cam);
        }

        $rootScope.$on($rootScope.events.searchCam, function(e, text){
            vm.searchText.name = text;
        })
    }
})()