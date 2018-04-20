(function () {
    angular
        .module('app')
        .component('navbar', {
            templateUrl: './user/components/navbar/navbar.template.html',
            bindings: {

            },
            controller: navbarCtrl,
            controllerAs: 'vm'
        })

    navbarCtrl.$inject = ['viewManage', 'authentication', 'filterText']
    function navbarCtrl(viewManage, authentication, filterText) {
        var vm = this;

        //initial 
        vm.navErr = '';
        vm.curView = viewManage.getCurView();
        vm.isLogin = authentication.isLogin;
        vm.curUser = null;
        vm.filterText = '';

        filterText.onResetFilter(function () {
            vm.filterText = '';
            textTyping();
        })

        vm.$onInit = function () {

            //init ui
            authentication
                .onLoginSuccess(function () {
                    $('#login-modal-close').click();
                })
        }

        
        vm.textTyping = function(){
            textTyping();
        }

        //update view on title
        viewManage.shouldChangeView(function (view) {
            vm.curView = view;
        });

        vm.prepareLogin = function () {
            vm.navErr = ''
        }




        vm.login = function () {
            authentication
                .login(vm.mail, vm.password
                    , function (token) {
                        localStorage.setItem('jwt-token', token);
                        vm.navErr = '';
                    }, function (err) {
                        vm.navErr = err;
                        console.log(vm.navErr)
                    })
        }

        vm.logout = function () {
            authentication.logout();
        }

        vm.showUserInfo = function () {
            // var { mail, isRoot, ke, detail, alMonitors } = authentication.getUserData();
            //es5 only
            var data = authentication.getUserData();

            vm.curUser = data;
        }

        function textTyping() {
            filterText.typing(vm.filterText);
        }



    }
})()