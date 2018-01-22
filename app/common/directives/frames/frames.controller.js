(function(){
    angular
        .module('app')
        .controller('framesCtrl', framesCtrl)

    framesCtrl.$inject = ['$rootScope', '$uibModal', '$window']
    function framesCtrl($rootScope, $uibModal, $window){
        var vm = this;
        vm.searchText = {
            name: ""
        }

        vm.changeSelectedCam = function(cam){
            $rootScope.$emit($rootScope.events.changeSelectedCam, cam);
            //go to bookmark of current camera
            //every camera has when store in mongodb
            //just now, use camera hard-code 's name is id
            if($rootScope.tab === 'Live') $window.scroll(0, document.getElementById(cam._id).offsetTop);
        }

        $rootScope.$on($rootScope.events.searchCam, function(e, text){
            vm.searchText.name = text;
        })
    }
})()