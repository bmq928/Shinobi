(function(){
    angular
        .module('app')
        .controller('sideNavContentCtrl', sideNavContentCtrl)

    sideNavContentCtrl.$inject = ['$rootScope']
    function sideNavContentCtrl($rootScope){
        var vm = this;
        vm.optionTabs = $rootScope.constant.CONFIG.OPTION_TAB_DATA.map(function(o) {return o.title})

        vm.getUrl = function(){
            var urlRoot = 'common/directives/sideNavContent/sideNavContent'
            var postfix = '.template.html'
            return urlRoot + $rootScope.curView + postfix
        }

        //when click option
        //view will scroll to that option
        vm.goToOption = function(id){
            var eventName = $rootScope.constant.CONFIG.GO_TO_OPTION
            console.log(id)
            $rootScope.$emit(eventName, id)
        }

        
    }
})()