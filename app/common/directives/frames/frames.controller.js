(function(){
    angular
        .module('app')
        .controller('framesCtrl', framesCtrl)

    framesCtrl.$inject = ['$rootScope', '$uibModal', 'mapSrc']
    function framesCtrl($rootScope, $uibModal, mapSrc){
        var vm = this;

        vm.changeSelectedCam = function(cam){
            $rootScope.$emit($rootScope.events.changeSelectedCam, cam);
        }

        vm.showMapAllCam = function(){
            $uibModal.open({
                template: '<img src="' + mapSrc.getAll() +  '" alt="Map">'
            })
        }
    }
})()