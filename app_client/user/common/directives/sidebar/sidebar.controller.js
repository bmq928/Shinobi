(function () {
    angular
        .module('app')
        .controller('sidebarCtrl', sidebarCtrl)

    sidebarCtrl.$inject = ['viewManage']
    function sidebarCtrl(viewManage) {
        var vm = this;

        vm.setCurView = viewManage.setCurView;
    }
})()