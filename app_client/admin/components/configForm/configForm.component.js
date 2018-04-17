(function () {
    angular
        .module('appAdmin')
        .component('configForm', {
            templateUrl: '../admin/components/configForm/configForm.template.html',
            bindings: {
                handleSubmit: '&',
                options: '@',
                formTitle: '@'
            },
            controller: configFormCtrl,
            controllerAs: 'vm'
        })

    function configFormCtrl() {
        var vm = this;
        var formType = {
            text: 'text',
            password: 'password',
            email: 'email',
            selection: 'select'
        }

        vm.$onInit = function () {
            preProcess();
            init();

            console.log(vm.options);
            console.log(vm.formTitle)
        }

        vm.isTextInput = function (input) {
            return input.type === formType.text || input.type === formType.password;
        }

        function init() {
            if (vm.options) vm.inputs = JSON.parse(vm.options);
        }

        function preProcess() {
            vm.inputs = [];
        }

    }
})()