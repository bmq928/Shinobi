(function () {
    angular
        .module('app')
        .controller('optionBarCtrl', optionBarCtrl)

    optionBarCtrl.$inject = ['$scope']
    function optionBarCtrl($scope) {
        var vm = this;

        vm.curFlash = 'flash-auto'
        var i =0;

        vm.live = {
            flashChange : function(){
                var states = ['flash-auto', 'flash-on', 'flash-off'];
                vm.curFlash = states[++i];
            }
        }
    }
})()