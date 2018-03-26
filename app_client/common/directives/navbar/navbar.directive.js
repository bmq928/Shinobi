(function(){
    angular
        .module('app')
        .directive('navbar', function(){
            return {
                restrict: 'E',
                templateUrl: '/common/directives/navbar/navbar.template.html',
                controller: 'navbarCtrl as vm',
                scope: {},
                link: function(scope, el, attr){
                    
                }
            }
        })
})()