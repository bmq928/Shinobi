(function(){
    angular
        .module('app')
        .controller('headerCtrl', headerCtrl)

    headerCtrl.$inject = ['$rootScope', '$interval']
    function headerCtrl($rootScope, $interval){
        var vm = this;

        vm.divideScreens = [1, 2, 3, 4, 5];

        vm.changeDivideScreen = function(num){
            $rootScope.$emit($rootScope.events.changeDivideScreen, num);
        }

        //tick clock
        vm.clock = Date.now();
        $interval(function(){
            vm.clock = Date.now();
        }, 1000)
    }
})()