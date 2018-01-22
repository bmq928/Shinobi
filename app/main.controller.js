(function () {
    angular
        .module('app')
        .controller('mainCtrl', mainCtrl)

    mainCtrl.$inject = ['$rootScope']

    // Store the state of app
    // to be the bus for all component communicating
    function mainCtrl($rootScope) {
        $rootScope.tab = "Live";

        //now it only stores name but when it has api, it stores data of all of aspect of a cam selected
        $rootScope.selectedCam = [{
            _id : 'Camera1',
            name: 'Camera1'
        }, {
            _id : 'Camera2',
            name: 'Camera2'
        }, {
            _id : 'Camera3',
            name: 'Camera3'
        }, {
            _id : 'Camera4',
            name: 'Camera4'
        }];

        //divide screen in rate
        $rootScope.divideScreen = 3;

        //current camera
        $rootScope.curCam = $rootScope.selectedCam[0];

        //event bus
        $rootScope.events = {
            changeSelectedCam: 'CHANGE_SELECTED',
            changeDivideScreen: 'CHANGE_DIVIDE_SCREEN',
            changeTab: 'CHANGE_TAB',
            searchCam: 'SEARCH_CAMERA'
        }

        $rootScope.$on($rootScope.events.changeSelectedCam, function (e, cam) {
            $rootScope.curCam = cam;
        });

        $rootScope.$on($rootScope.events.changeDivideScreen, function(e, num){
            $rootScope.divideScreen = num;
        });

        $rootScope.$on($rootScope.events.changeTab, function(e, newTab){
            $rootScope.tab = newTab;
        })
    }
})()