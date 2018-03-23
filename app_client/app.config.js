(function () {
    angular
        .module('app')
        .config(config)

    
    config.$inject = ['$stateProvider', '$urlRouterProvider']
    function config($stateProvider, $urlRouterProvider) {

        var views = window.constants.VIEWS;

        console.log(views.live)

        $stateProvider
            .state(views.live, {
                url: '/live',
                templateUrl: './live/live.view.html',
                controller: 'liveCtrl',
                controllerAs: 'vm'
            })
            .state(views.playback, {
                url: '/playback',
                templateUrl: './playback/playback.view.html',
                controller: 'playbackCtrl',
                controllerAs: 'vm'
            })
            .state(views.setting, {
                url: '/setting',
                templateUrl: './setting/setting.view.html',
                controller: 'settingCtrl',
                controllerAs: 'vm'
            })

        $urlRouterProvider.otherwise('/live');
    }
})()