(function(){
    angular
        .module('app')
        .directive('sideNavOption', sideNavOption)

    function sideNavOption(){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/common/directives/sideNavOption/sideNavOption.template.html'  ,
            controller: 'sideNavOptionCtrl as vm'          
        }
    }
})()