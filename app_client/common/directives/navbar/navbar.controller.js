(function () {
    angular
        .module('app')
        .controller('navbarCtrl', navbarCtrl)

    navbarCtrl.$inject = ['viewManage', 'authentication']
    function navbarCtrl(viewManage, authentication) {
        var vm = this;

        //initial 
        vm.navErr = '';
        vm.curView = viewManage.getCurView();
        vm.isLogin = authentication.isLogin;
        vm.curUser = null;
        console.log(vm.curView);

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
        //tool for each view


        // $timeout(function(){
        //     viewManage.setCurView(2);
        //     console.log(vm.curView)
        // }, 1000)
    }
})()