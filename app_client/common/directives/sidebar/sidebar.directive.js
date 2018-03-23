(function(){
    angular
        .module('app')
        .directive('sidebar', function(){
            return {
                restrict: 'E',
                templateUrl: '/common/directives/sidebar/sidebar.template.html'
            }
        })
})()