(function(){
    angular
        .module('app')
        .controller('mainCtrl', mainCtrl)

    mainCtrl.$inject = ['$rootScope']

    // Store the state of app
    // to be the bus for all component communicating
    function mainCtrl($rootScope){
        $rootScope.tab = "Playback";

        //now it only stores name but when it has api, it stores data of all of aspect of a cam selected
        $rootScope.selectedCam = [{
            name: 'Camera1'
        },{
            name: 'Camera2'
        },{
            name: 'Camera3'
        },{
            name: 'Camera4'
        }];  
        
    }
})()