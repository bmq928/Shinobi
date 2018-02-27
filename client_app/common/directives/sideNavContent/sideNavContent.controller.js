(function(){
    angular
        .module('app')
        .controller('sideNavContentCtrl', sideNavContentCtrl)

    sideNavContentCtrl.$inject = ['$rootScope']
    function sideNavContentCtrl($rootScope){
        var vm = this;

        vm.getUrl = function(){
            var urlRoot = 'common/directives/sideNavContent/sideNavContent'
            var postfix = '.template.html'
            return urlRoot + $rootScope.curView + postfix
        }

        
    }
})()