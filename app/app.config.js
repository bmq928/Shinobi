(function () {
    angular
        .module('app')
        .config(config)


    function config($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('live', {
                url: '/live',
                templateUrl: './app/live/live.view.html',
                controller: 'liveCtrl',
                controllerAs: 'vm',
                views: {
                    "main": {
                        templateUrl: './app/live/live-main/live-main.view.html',
                        controller: 'liveMainCtrl',
                        controllerAs: 'm_vm'
                    },
                    "slidebar": {
                        templateUrl: './app/live/live-slidebar/live-slidebar.view.html',
                        controller: 'liveSlideBarCtrl',
                        controllerAs: 's_vm'
                    }
                }
            })
        $urlRouterProvider.otherwise('/live');
    }


})()