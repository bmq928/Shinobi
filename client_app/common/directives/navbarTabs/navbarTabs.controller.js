(function () {
    angular
        .module('app')
        .controller('navbarTabsCtrl', navbarTabsCtrl)

    navbarTabsCtrl.$inject = ['$rootScope']
    function navbarTabsCtrl($rootScope) {
        var vm = this;

        vm.handleClick = function (view) {
            var CHANGE_VIEW = $rootScope.actions.CHANGE_VIEW;
            $rootScope.$emit(CHANGE_VIEW, view);
        }
    }
})()