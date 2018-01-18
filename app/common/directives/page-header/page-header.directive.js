(function () {
    angular
        .module('app')
        .directive('pageHeader', header)

    function header() {
        return {
            restrict: 'AE',
            scope: {},
            templateUrl: '/app/common/directives/page-header/page-header.template.html',
            controller: 'headerCtrl as vm'
        }
    }
})()