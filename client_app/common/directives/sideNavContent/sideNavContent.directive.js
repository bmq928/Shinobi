(function () {
    angular
        .module('app')
        .directive('sideNavContent', sideNavContent)

    function sideNavContent() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/common/directives/sideNavContent/sideNavContent.template.html',
            controller: 'sideNavContentCtrl as vm',
            link: function (scope, el, attr) {
                

            }
        }
    }
})()