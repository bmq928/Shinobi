(function(){
    angular
        .module('app')
        .controller('configCtrl', configCtrl)

    configCtrl.$inject = ['$anchorScroll', '$location', '$rootScope', '$scope']
    function configCtrl($anchorScroll, $location, $rootScope, $scope){

        var vm = this; 
        vm.optionTabs = $rootScope.constant.CONFIG.OPTION_TAB_DATA     

        $rootScope.$on($rootScope.constant.CONFIG.GO_TO_OPTION, function(e, id){
            goToOption(id)
        })


        function goToOption (id) {
            if(id !== $location.hash()){
                $location.hash(id);
            } else {
                $anchorScroll();
            }
        }

    }
})()