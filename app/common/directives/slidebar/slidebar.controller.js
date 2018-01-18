(function(){
    angular
        .module('app')
        .controller('slidebarCtrl', slidebarCtrl)

    slidebarCtrl.$inject = ['$rootScope']
    function slidebarCtrl($rootScope){
        var vm = this;
        
        vm.changeTab = function(newTab){
            $rootScope.$emit($rootScope.events.changeTab, newTab);
        }

        vm.live = {
            
        }

        vm.playback = {

        }

        vm.config = {

        }
    }
})()