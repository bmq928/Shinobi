(function(){
    angular
        .module('app')
        .directive('addMonitorModal', function(){
            return {
                restrict: 'E',
                templateUrl: 'common/directives/auth/addMonitorModal/addMonitorModal.template.html',
                link: function(scope, el, attr){
                    $('#add-monitor-modal').modal();
                }
            }
        })
})()