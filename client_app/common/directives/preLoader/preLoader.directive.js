(function(){
    angular
        .module('app')
        .directive('preLoader', function(){
            return {
                restrict : 'E',
                templateUrl: 'common/directives/preLoader/preLoader.template.html'
            }
        })
})()