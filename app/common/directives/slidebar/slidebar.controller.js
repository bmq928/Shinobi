(function(){
    angular
        .module('app')
        .controller('slidebarCtrl', slidebarCtrl)

    slidebarCtrl.$inject = ['$scope']
    function slidebarCtrl($scope){
        var vm = this;
        var flashState = 0;

        vm.changeTab = function(newTab){
            $scope.tab = newTab;
        }

        vm.live = {
            
        }

        vm.playback = {

        }

        vm.config = {

        }
    }
})()