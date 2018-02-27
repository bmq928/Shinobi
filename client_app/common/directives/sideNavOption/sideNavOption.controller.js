(function(){
    angular
        .module('app')
        .controller('sideNavOptionCtrl', sideNavOptionCtrl)

    sideNavOptionCtrl.$inject = ['$rootScope']
    function sideNavOptionCtrl($rootScope){
        var vm = this;
        
        vm.getUrl = function(){
            var urlRoot = 'common/directives/sideNavOption/sideNavOption'
            var postfix = '.template.html'
            return urlRoot + $rootScope.curView + postfix
        }   
    }
})()