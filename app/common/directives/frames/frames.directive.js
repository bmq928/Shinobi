(function(){
    angular
        .module('app')
        .directive('frames', frames)

    function frames(){
        return {
            restrict: 'AE',
            scope : {},
            templateUrl: '/app/common/directives/frames/frames.template.html',
            controller: 'framesCtrl as vm'
        }
    }
})()