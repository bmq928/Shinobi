(function(){
    angular
        .module('appAdmin')
        .component('configForm', {
            templateUrl: '../admin/components/configForm/configForm.template.html',
            bindings: {
                handleSubmit: '&',
                options: '@'
            },
            controller: configFormCtrl,
            controllerAs: 'vm'
        })

    function configFormCtrl(){
        var vm = this;
        var formType = {
            text: 'text',
            selection: 'selection'
        }

        vm.$onInit = function(){
            preProcess();
            init();
        }

        function init(){

        }

        function preProcess(){

        }

    }
})()