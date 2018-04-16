(function () {
    angular
        .module('appAdmin')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider']
    function config($stateProvider, $urlRouterProvider) {

        var views = window.constants.VIEWS;

        $stateProvider
            .state(views.monitor, {
                url: '/monitor',
                templateUrl: '../admin/components/views/monitor/monitor.view.html',
                controller: 'monitorCtrl',
                controllerAs: 'vm'
            })
            .state(views.user, {
                url: '/user',
                templateUrl: '../admin/components/views/user/user.view.html',
                controller: 'userCtrl',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/monitor');
    }
})()