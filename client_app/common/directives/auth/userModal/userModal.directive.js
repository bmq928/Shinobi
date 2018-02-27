(function(){
    angular
        .module('app')
        .directive('userModal', function(){
            return {
                restrict: 'E',
                templateUrl: '/common/directives/auth/userModal/userModal.template.html',
                link: function(scope, el, attr){
                    var $ = window.jQuery;
                    $('#user-modal').modal();
                }
            }
        })
})()