(function () {
    angular
        .module('app')
        .controller('navbarCtrl', navbarCtrl)

    navbarCtrl.$inject = ['viewManage' ]
    function navbarCtrl(viewManage) {
        var vm = this;

        //initial 
        vm.curView = viewManage.getCurView();
        console.log(vm.curView);

        //update view on title
        viewManage.shouldChangeView(function(view){
            vm.curView = view;
        });

        //tool for each view


        // $timeout(function(){
        //     viewManage.setCurView(2);
        //     console.log(vm.curView)
        // }, 1000)
    }
})()