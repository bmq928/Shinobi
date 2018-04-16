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
            vm.curTab = null;

            //decide curTab via location hash
            var curTab = location.hash.substr(3);
            //capitalize the first charecter to match the style of view
            if(curTab) vm.curTab = curTab[0].toUpperCase()+curTab.substr(1);

            console.log(vm.curTab);
        }

        function init() {
            vm.tabs = JSON.parse(vm.options);
            vm.curTab = vm.curTab || vm.tabs[0].title;
        }
    }
})()