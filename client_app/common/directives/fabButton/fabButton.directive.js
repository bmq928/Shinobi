(function(){
    angular
        .module('app')
        .directive('fabButton', fabButton)
    
    function fabButton(){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/common/directives/fabButton/fabButton.template.html'
        }
    }
})()