(function(){
    angular
        .module('app')
        .controller('headerCtrl', headerCtrl)

    headerCtrl.$inject = ['$rootScope']
    function headerCtrl($rootScope){
        var vm = this;

        vm.divideScreens = [1, 2, 3, 4, 5];
        vm.changeDivideScreen = function(num){
            $rootScope.$emit($rootScope.events.changeDivideScreen, num);
        }
    }
})()