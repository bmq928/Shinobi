(function(){
    angular
        .module('app')
        .directive('slidebar', slidebar);

    function slidebar(){
        return {
            restrict : 'AE',
            templateUrl : '/app/common/directives/slidebar/slidebar.template.html',
            controller: 'slidebarCtrl as vm'
        }
    }
})()