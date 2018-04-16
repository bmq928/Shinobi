(function(){
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

    
    function sidebarCtrl(){
        var vm = this;
        vm.$onInit = function(){
            vm.tabs = JSON.parse(vm.options);

            console.log(vm.tabs);
        }

        
    }
})()