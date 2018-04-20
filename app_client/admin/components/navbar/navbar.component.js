(function () {
    angular
        .module('appAdmin')
        .component('navbar', {
            templateUrl: '../admin/components/navbar/navbar.template.html',
            bindings: {

            },
            controller: navbarCtrl,
            controllerAs: 'vm'
        })


    navbarCtrl.$inject = ['$scope', 'authentication']
    function navbarCtrl($scope, authentication) {
        var vm = this;


        preProcess();
        init();

        vm.$onInit = function () {

            //init ui
            authentication
                .onLoginSuccess(function () {
                    $('#login-modal-close').click();
                })
        }

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





        function preProcess() {

            vm.curView = getView(location.hash);
            vm.isLogin = authentication.isLogin;
            vm.navErr = '';
            vm.curUser = null;
        }

        function init() {

            decideView()


            function decideView() {
                $scope.$watch(function () {
                    return location.hash;
                }, function (val) {
                    vm.curView = getView(val);
                })
            }
        }






        function getView(locationHash) {
            var curView = locationHash.substr(3);
            //capitalize the first charecter to match the style of view
            return (curView) ? curView[0].toUpperCase() + curView.substr(1) : '';
        }
    }
})()