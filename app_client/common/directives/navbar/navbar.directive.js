(function () {
    angular
        .module('app')
        .directive('navbar', navbar)

    navbar.$inject = ['authentication']
    function navbar(authentication) {
        return {
            restrict: 'E',
            templateUrl: '/common/directives/navbar/navbar.template.html',
            controller: 'navbarCtrl as vm',
            scope: {},
            link: function (scope, el, attr) {
                //make the modal disapear when login success
                // $('#login-modal').close();
                authentication
                    .onLoginSuccess(function () {
                        $('#login-modal-close').click()
                        // console.log('close')
                        // console.log(authentication.getEmail());
                    })
            }
        }
    }
})()