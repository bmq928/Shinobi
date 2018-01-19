(function(){
    angular
        .module('app')
        .controller('camInfoCtrl', camInfoCtrl)

    camInfoCtrl.$inject = ['$rootScope']
    function camInfoCtrl($rootScope){
        var vm = this;

        console.log('camInfoCtrl');
    }
})()