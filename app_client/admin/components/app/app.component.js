(function () {
    angular
        .module('appAdmin')
        .component('app', {
            templateUrl: '../admin/components/app/app.template.html',
            controller: appCtrl,
            controllerAs: 'vm'
        })


    function appCtrl() {
        var vm = this;

        vm.$onInit = function () {
            preProcess();
            init();
        }


        function preProcess() {
            vm.options = [];
        }

        function init() {
            var views = window.constants.VIEWS;
            for (key in views) vm.options.push({
                title: views[key]
            });
        }

    }
})()
