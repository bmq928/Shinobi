(function(){
    angular
        .module('app')
        .directive('sideNav', sideNav)

    function sideNav(){
        return {
            restrict: 'EA',
            scope: {},
            templateUrl: '/common/directives/sideNav/sideNav.template.html',
            controller: 'sideNavCtrl as vm',
            link: function(scope, el, attrs){
                var $ = window.jQuery;

                // side-nav eff
                $("#tool-cam").sideNav();
                $(".button-collapse").sideNav();
            }
        }
    }
})()