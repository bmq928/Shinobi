(function () {
    angular
        .module('appAdmin')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider']
    function config($stateProvider, $urlRouterProvider) {

        var views = window.constants.VIEWS;

        $stateProvider
            .state(views.live, {
                url: '/monitor',
                templateUrl: '../components/views/monitor/monitor.view.html',
                controller: 'monitorCtrl',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/monitor');
    }
})()