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

    navbarCtrl.$inject = ['viewManage', 'authentication']
    function navbarCtrl(viewManage, authentication) {
        var vm = this;

        //initial 
        vm.navErr = '';
        vm.curView = viewManage.getCurView();
        vm.isLogin = authentication.isLogin;
        vm.curUser = null;
        console.log(vm.curView);

        vm.$onInit = function () {

            //init ui
            authentication
                .onLoginSuccess(function () {
                    $('#login-modal-close').click();
                })
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

        vm.search = function () {

        }



    }
})()