(function () {
    angular
        .module('app')
        .directive('navbar', navbar)

    function navbar() {
        return {
            restrict: 'EA',
            scope: {},
            templateUrl: '/common/directives/navbar/navbar.template.html',
            controller: 'navbarCtrl as vm',
            link: function (scope, el, attr) {
                var $ = window.jQuery;

                // side-nav eff
                $("#tool-cam").sideNav();
                $(".button-collapse").sideNav();

                //route button(tab) eff

            }
        }
    }
})()