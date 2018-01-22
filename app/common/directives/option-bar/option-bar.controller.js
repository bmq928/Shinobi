(function () {
    angular
        .module('app')
        .controller('optionBarCtrl', optionBarCtrl)

    optionBarCtrl.$inject = ['$rootScope', '$uibModal']
    function optionBarCtrl($rootScope, $uibModal) {
        var vm = this;

        vm.curFlash = 'flash-auto'
        var i = 0;

        vm.live = {
            flashChange: flashChange,
            showInfo: showInfoCam,
            searchCam: {
                visible: false,
                showInput: showInput,
                closeInput: closeInput,
                typing: typing,
                text: ""
            }
        }

        vm.playback = {

        }

        function flashChange() {
            var states = ['flash-auto', 'flash-on', 'flash-off'];
            vm.curFlash = states[(++i) % states.length];
        }

        function showInfoCam() {
            var modalInstance = $uibModal.open({
                templateUrl: '/app/camera-info/camera-info.view.html',
                bindToController: true,
                controller: 'camInfoCtrl as vm',
                backdrop: true
            })
        }

        function showInput() {
            vm.live.searchCam.visible = true;
        }

        function closeInput() {
            vm.live.searchCam.visible = false;
            vm.live.searchCam.text = "";
            $rootScope.$emit($rootScope.events.searchCam, vm.live.searchCam.text);
        }

        function typing() {
            $rootScope.$emit($rootScope.events.searchCam, vm.live.searchCam.text)
        }
    }
})()