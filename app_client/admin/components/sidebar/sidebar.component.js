(function () {
    angular
        .module('appAdmin')
        .component('sidebar', {
            templateUrl: '../admin/components/sidebar/sidebar.template.html',
            bindings: {
                options: '@'
            },
            controller: sidebarCtrl,
            controllerAs: 'vm'
        })


    function sidebarCtrl() {
        var vm = this;


        vm.$onInit = function () {
            preprocess();
            init();

        }

        //handle tab click
        //make active-tab click (ui)
        vm.tabClick = function (tab) {
            vm.curTab = tab.title;
        }

        function preprocess() {
            vm.curTab = '';
        }

        function init() {
            vm.tabs = JSON.parse(vm.options);
            vm.curTab = vm.tabs[0].title;
        }
    }
})()