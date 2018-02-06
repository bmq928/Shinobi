(function () {
    angular
        .module('app')
        .directive('navbar', navbar)

    function navbar() {
        return {
            restrict: 'EA',
            scope: {},
            templateUrl: '/common/directives/navbar/navbar.template.html',
            controller: 'navbarCtrl as vm'
        }
    }
})()