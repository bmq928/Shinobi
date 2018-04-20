(function () {
    angular
        .module('app')
        .config(config)
        .run(run)

    
    config.$inject = ['$stateProvider', '$urlRouterProvider']
    function config($stateProvider, $urlRouterProvider) {

        var views = window.constants.VIEWS;

        $stateProvider
            .state(views.live, {
                url: '/live',
                template: '<live-view></live-view>'
            })
            .state(views.playback, {
                url: '/playback',
                template: '<playback-view></playback-view>'
            })
            .state(views.setting, {
                url: '/setting',
                template: '<setting-view></setting-view>'
            })

        $urlRouterProvider.otherwise('/live');
    }

    run.$inject = ['$rootScope', '$location']
    function run($rootScope, $location){

        //set current rootScope.view
        //decide view via url
        $rootScope.CUR_VIEW = decideView();

        function decideView(){
            var makePath = function(view) {return '/' + view};
            var curUrl = $location.$$path;
            var views = window.constants.VIEWS;

            if($location.$$path === makePath(views.playback)) return views.playback;
            if($location.$$path === makePath(views.setting)) return views.setting;
            
            return views.live;
        }
    }
})()