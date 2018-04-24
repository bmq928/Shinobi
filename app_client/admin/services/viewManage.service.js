(function () {
    angular
        .module('appAdmin')
        .factory('viewManage', viewManage)

    viewManage.$inject = ['$rootScope']
    function viewManage($rootScope) {
        var views = window.constants.VIEWS;
        var events = window.constants.EVENTS;

        return {
            getCurView: function () {
                return $rootScope.CUR_VIEW;
            },
            setCurView: function (view) {
                // 1 live
                // 2 playback
                // 3 setting
                switch (view) {
                    case 1: $rootScope.CUR_VIEW = views.live; break;
                    case 2: $rootScope.CUR_VIEW = views.playback; break;
                    case 3: $rootScope.CUR_VIEW = views.setting; break;
                    default: throw new Error('invalid number')
                }

                if(1 <= view && view <= 3) $rootScope.$emit(events.CHANGE_VIEW, $rootScope.CUR_VIEW);                
            },
            shouldChangeView: function(callback){
                $rootScope.$on(events.CHANGE_VIEW, function(e, curView){
                    callback(curView)
                })
            }
        }
    }
})()
