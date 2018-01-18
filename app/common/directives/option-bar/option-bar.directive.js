(function(){
    angular
        .module('app')
        .directive('optionBar', optionBarCtrl);

    function optionBarCtrl(){
        return {
            restrict : 'AE',
            scope:{},
            templateUrl : '/app/common/directives/option-bar/option-bar.template.html',
            controller: 'optionBarCtrl as vm'
        }
    }
})()