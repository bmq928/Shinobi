(function () {
    angular
        .module('app')
        .controller('navbarCtrl', navbarCtrl)

    navbarCtrl.$inject = ['viewManage' ]
    function navbarCtrl(viewManage) {
        var vm = this;

        vm.curView = viewManage.getCurView();
        console.log(vm.curView);

        viewManage.shouldChangeView(function(view){
            vm.curView = view;
        });


        // $timeout(function(){
        //     viewManage.setCurView(2);
        //     console.log(vm.curView)
        // }, 1000)
    }
})()