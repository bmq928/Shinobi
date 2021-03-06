(function () {
    angular
        .module('appAdmin')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider']
    function config($stateProvider, $urlRouterProvider) {

        var views = window.constants.VIEWS;

        // $stateProvider
        //     .state(views.monitor.title, {
        //         url: '/monitor',
        //         templateUrl: '../admin/components/views/monitor/monitor.view.html',
        //         controller: 'monitorCtrl',
        //         controllerAs: 'vm'
        //     })
        //     .state(views.user.title, {
        //         url: '/user',
        //         templateUrl: '../admin/components/views/user/user.view.html',
        //         controller: 'userCtrl',
        //         controllerAs: 'vm'
        //     })

        $stateProvider
            // .state(views.monitor.title, {
            //     url: '/monitor',
            //     template: '<monitor-view>< /monitor-view>'
            // })
            .state(views.user.title, {
                url: '/user',
                template : '<user-view></user-view>'
            })
            .state(views.live.title, {
                url: '/live',
                template : '<live-view></live-view>'
            })
            .state(views.playback.title, {
                url: '/playback',
                template : '<playback-view></playback-view>'
            })
            .state(views.setting.title, {
                url: '/setting',
                template : '<setting-view></setting-view>'
            })
        $urlRouterProvider.otherwise('/user');
    }
})()